---
title: Built-In Retry Logic Providers in SqlClient
description: Learn how the built-in Microsoft.Data.SqlClient retry providers schedule retries, select transient errors, and handle commands and transactions.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra, randolphwest
ms.date: 08/14/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
ai-usage: ai-assisted
---
# Built-in retry logic providers in SqlClient

 **Applies to**:  .NET Framework  .NET  .NET Standard 




[Microsoft.Data.SqlClient.SqlConfigurableRetryFactory](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory) creates providers for common retry schedules. Configurable retry logic is off by default. Assign a provider to [Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%252A) or [Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%252A) to enable it for that object.

## Choose a retry provider

| Factory method | Delay pattern |
| --- | --- |
| [Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateFixedRetryProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateFixedRetryProvider%252A) | Approximately the same delay before each retry. |
| [Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateIncrementalRetryProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateIncrementalRetryProvider%252A) | Adds `DeltaTime` to the delay after each retry. |
| [Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateExponentialRetryProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateExponentialRetryProvider%252A) | Increases the delay exponentially after each retry. |
| [Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateNoneRetryProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateNoneRetryProvider%252A) | Doesn't retry. This provider is the default. |

The fixed, incremental, and exponential providers add random jitter to each interval. Jitter reduces synchronized retry bursts when many clients encounter the same outage.

`NumberOfTries` is the total number of attempts, including the initial operation. For example, `NumberOfTries = 3` allows the initial attempt and up to two retries. Its valid range is 1 through 60.

## Built-in transient error list

When [Microsoft.Data.SqlClient.SqlRetryLogicOption.TransientErrors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlRetryLogicOption.TransientErrors%252A) is `null`, the built-in providers retry the 20 error numbers in `SqlConfigurableRetryFactory.BaselineTransientErrors`, grouped by where the failure originates:

| Failure area | Error numbers |
| --- | --- |
| Login-process transport | `233`, `997`, `10060` |
| Database availability during login | `4060`, `4221` |
| Statement-level | `1204`, `1205`, `1222` |
| Resource limit or throttling | `10928`, `10929`, `40501`, `49918`, `49919`, `49920` |
| Azure SQL service failover | `40143`, `40197`, `40540`, `40613` |
| Dedicated SQL pool state | `42108`, `42109` |

Each error is described in the sections that follow.

> **Important:**  
> Setting `TransientErrors` replaces the built-in list. It doesn't append to the list. Include every error that the provider should retry.

In Microsoft.Data.SqlClient 7.0, [Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.BaselineTransientErrors%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.BaselineTransientErrors%252A) exposes the built-in list as a read-only collection. Use it to extend the baseline without copying error numbers from the driver source:

```csharp
var transientErrors = SqlConfigurableRetryFactory.BaselineTransientErrors
    .Append(12345)
    .ToArray();

var options = new SqlRetryLogicOption
{
    NumberOfTries = 5,
    DeltaTime = TimeSpan.FromSeconds(2),
    MaxTimeInterval = TimeSpan.FromSeconds(30),
    TransientErrors = transientErrors,
};
```

For earlier driver versions, create an application-owned collection that contains the baseline errors you need and your additional errors. Before copying a baseline, select the [SqlClient source tag](https://github.com/dotnet/SqlClient/tags) that matches your installed package version and inspect `SqlConfigurableRetryFactory.cs`. The list on the `main` branch can change after your package is released.

## Errors during connection establishment

The following errors are retryable in the built-in list or worth adding to `TransientErrors` on top of the built-in list.


The following errors can be transient when they occur during connection establishment or while sending a request to the server. Retry on a short, bounded backoff. Errors that persist past a few retries usually indicate a configuration problem, such as a wrong server, missing permissions, incompatible encryption settings, or exhausted quota, that retry won't fix.

| Error | Failure type | Message | Troubleshooting |
| --- | --- | --- | --- |
| `64` | Transport during login | `A connection was successfully established with the server, but then an error occurred during the login process. (provider: TCP Provider, error: 0 - The specified network name is no longer available.)` | The TCP connection drops mid-handshake. Not a credential failure. If it persists, check for client-side network instability or an intermediate device that drops half-established connections. |
| `233` | Pre-login transport or TLS | `The client was unable to establish a connection because of an error during connection initialization process before login.` | The server commonly returns this error when it can't accept the connection because of resource exhaustion, a connection limit, or an unsupported client. Not a credential failure. Verify server health, then check the client login timeout, TLS settings, and client/server TLS version compatibility. |
| `4060` | Database availability or access | `Cannot open database "%.*ls" requested by the login. The login failed.` | The login authenticates but can't open the requested database. Transient causes include the database being in transition (failover, restore, scaling) or auto-paused. Persistent causes (database doesn't exist, login lacks access) won't be fixed by retry; check the database name, login mapping, and database state. |
| `4221` | Readable-secondary transition | `Login to read-secondary failed due to long wait on 'HADR_DATABASE_WAIT_FOR_TRANSITION_TO_VERSIONING'.` | The replica isn't available for login because row versions are missing for transactions that were in flight when the replica was recycled. Roll back or commit the active transactions on the primary to resolve the issue. Mitigate by avoiding long write transactions on the primary. |
| `10053` | Local transport abort | `A transport-level error has occurred when sending the request to the server. (provider: TCP Provider, error: 0 - An established connection was aborted by the software in your host machine.)` | The *local* side aborts the connection. Check client-side network health and any local firewall or VPN client. |
| `10054` | Remote transport reset | `A transport-level error has occurred when sending the request to the server. (provider: TCP Provider, error: 0 - An existing connection was forcibly closed by the remote host.)` | The *remote* side sends a TCP reset. Common causes: the peer process crashed, a firewall injected a reset, or the Azure SQL gateway closed an idle connection. For idle-reset patterns, enable TCP keepalive on the client or shorten the connection-pool idle timeout. |
| `10060` | Connection timeout | `A connection attempt failed because the connected party did not properly respond after a period of time.` | The server or an intermediate network device didn't answer before the TCP connection timeout. Check server health, routing, firewall rules, and whether the configured host and port are reachable. |
| `10928` | Database resource limit | `Resource ID: %d. The %s limit for the database is %d and has been reached.` | The database exceeds an Azure SQL resource governance limit. Resource ID 1 indicates the worker limit; Resource ID 2 indicates the session limit. Identify the limit type from the message, then reduce concurrency, scale up the database, or shorten long-running operations holding the resource. |
| `10929` | Database throttling | `Resource ID: %d. The %s minimum guarantee is %d, maximum limit is %d, and the current usage for the database is %d. However, the server is currently too busy to support requests greater than %d for this database.` | The database is over its minimum guarantee and the underlying server is throttling. Retry typically succeeds when neighbor load drops. Sustained occurrences indicate you need a higher service tier or a less noisy environment. |
| `40020`, `40143`, `40166`, `40540` | Azure SQL failover subcode | Reported in the `Error code %d` slot of error 40197 during failover. | Subcodes embedded in a 40197 failover message that some paths surface as the top-level error number. Treat them the same as 40197. |
| `40197` | Azure SQL failover | `The service has encountered an error processing your request. Please try again. Error code %d.` | A software upgrade, hardware failure, or other failover event in Azure SQL. Reconnecting routes you to a healthy replica. The embedded error code identifies the failover type. If the error persists, capture the session tracing ID and contact support. |
| `40501` | Azure SQL throttling | `The service is currently busy. Retry the request after 10 seconds. Incident ID: %ls. Code: %d.` | Azure SQL engine throttling. The recommended floor is a 10-second backoff. Sustained throttling indicates the workload exceeded the database's resource allocation; scale up the service tier or reduce concurrency. |
| `40613` | Database unavailable | `Database '%.*ls' on server '%.*ls' is not currently available. Please retry the connection later. If the problem persists, contact customer support, and provide them with the session tracing ID of '%.*ls'.` | The database is unavailable, usually mid-failover or briefly during a scale operation. Retry on a backoff; if it persists past a few minutes, capture the session tracing ID and open a support case. |
| `42108` | SQL pool paused | `Can not connect to the SQL pool since it is paused. Please resume the SQL pool and try again.` | The dedicated SQL pool (Synapse) is in a paused state. Retry succeeds only after the pool is resumed. Resume the pool explicitly, or schedule the workload to run after the pool resumes. |
| `42109` | SQL pool resuming | `The SQL pool is warming up. Please try again.` | The dedicated SQL pool is resuming. Retry on a backoff until the pool is online; warmup typically takes a few minutes. |
| `49918` | Service resource shortage | `Cannot process request. Not enough resources to process request. The service is currently busy. Please retry the request later.` | The server can't currently allocate enough resources to satisfy the request. Retry on a backoff. If the error persists, scale up the database or elastic pool. |
| `49919` | Management-operation throttling | `Cannot process create or update request. Too many create or update operations in progress for subscription "%ld".` | Subscription-level concurrency limit on management operations. Reduce parallel create/update calls or stagger them. |
| `49920` | Subscription-operation throttling | `Cannot process request. Too many operations in progress for subscription "%ld".` | Subscription-level concurrency limit on operations in flight. Reduce parallelism or wait for in-flight operations to drain. |

Statement-level errors aren't in this list because they fire after the connection is established and the failure leaves the session usable. The most common retryable statement errors are 1205 (deadlock victim) and 1222 (lock-request timeout). Retry the entire transaction rather than the single failing statement.

Error message text is from [Azure SQL transient connection errors](https://learn.microsoft.com/azure/azure-sql/database/troubleshoot-common-connectivity-issues). These errors are eligible for retry across SQL Server, Azure SQL Database, Azure SQL Managed Instance, SQL database in Microsoft Fabric, and dedicated SQL pools in Azure Synapse Analytics.


## Errors during command execution


The following errors occur after a connection is established, while a command is executing. Retry the whole transaction, not the individual statement. Retrying one statement inside a transaction can duplicate earlier work or violate the transaction's ordering guarantees.

| Error | Failure type | Message | Troubleshooting |
| --- | --- | --- | --- |
| `1204` | Lock resource exhausted | `The instance of the SQL Server Database Engine cannot obtain a LOCK resource at this time. Rerun your statement when there are fewer active users. Ask the database administrator to check the lock and memory configuration for this instance, or to check for long-running transactions.` | The lock manager can't allocate more lock resources on the server. Roll back the transaction and retry after a short backoff. Sustained occurrences indicate contention or memory pressure that scaling or query tuning must address. |
| `1205` | Deadlock victim | `Transaction (Process ID %d) was deadlocked on %.*ls resources with another process and has been chosen as the deadlock victim. Rerun the transaction.` | The engine picked this session to break a deadlock and rolled its transaction back. Roll back on the client side to release any remaining state, then retry the whole transaction. |
| `1222` | Lock-request timeout | `Lock request time out period exceeded.` | The engine gave up waiting for a lock. Retry the transaction on a short backoff. Recurring occurrences indicate blocking that indexing, query tuning, or `SET LOCK_TIMEOUT` review must address. |
| `3960` | Snapshot isolation update conflict | `Snapshot isolation transaction aborted due to update conflict. You cannot use snapshot isolation to access table '%.*ls' directly or indirectly in database '%.*ls' to update, delete, or insert the row that has been modified or deleted by another transaction. Retry the transaction or change the isolation level for the update/delete statement.` | Two transactions running under snapshot isolation tried to update the same row. The engine aborted this transaction. Retry the whole transaction, or change the isolation level for the conflicting write. Add to a custom transient-error list if your application uses snapshot isolation. |

Statement-level errors that reflect a batch or schema problem (for example, `102` syntax errors, `207` invalid column, `2812` missing stored procedure) aren't transient. Fix the query text or the schema binding; retry doesn't help.

Error message text is from the [sys.messages](../../relational-databases/system-catalog-views/messages-for-errors-catalog-views-sys-messages.md) catalog view. These errors come from the SQL Server engine, so their numbers are the same across SQL Server, Azure SQL Database, Azure SQL Managed Instance, SQL database in Microsoft Fabric, and dedicated SQL pools in Azure Synapse Analytics, regardless of driver.


The driver, not the engine, surfaces client-side representations of statement timeout and cancellation errors (for example, the Microsoft.Data.SqlClient `-2` timeout), so these errors aren't in the built-in list. If your application catches these errors separately, handle them at the same transaction boundary as the engine errors described earlier.

## Command and transaction behavior

The built-in providers skip retry when a command runs inside an ambient [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) or has a [Microsoft.Data.SqlClient.SqlTransaction](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlTransaction) attached. The command runs once without retry logic. Retrying a single statement inside a transaction can duplicate earlier work or violate the transaction's intended ordering.

> **Caution:**  
> For deadlocks and other retryable failures inside a transaction, roll back and retry the entire transaction as one unit. Don't retry only the failing command.

Use [Microsoft.Data.SqlClient.SqlRetryLogicOption.AuthorizedSqlCondition%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlRetryLogicOption.AuthorizedSqlCondition%252A) to limit command retries to operations your application can safely repeat. The predicate receives the command text. If the predicate returns `false`, the command runs once without retry logic.

## Example

For complete connection and command examples, see:

- [Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%252A)
- [Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%252A)

## Related content

- [Create a custom retry provider for SqlClient](configurable-retry-logic-core-apis-sqlclient.md)
- [Configurable retry logic in SqlClient](configurable-retry-logic.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
