---
title: Configurable Retry Logic in SqlClient
description: Learn when and how to configure Microsoft.Data.SqlClient to retry transient connection and command failures with bounded backoff.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra, randolphwest
ms.date: 08/14/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
ai-usage: ai-assisted
---
# Configurable retry logic in SqlClient

 **Applies to**:  .NET Framework  .NET  .NET Standard 




Configurable retry logic (CRL) lets Microsoft.Data.SqlClient retry selected [Microsoft.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection) and [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) operations after transient failures. You pick which errors qualify, how many attempts to make, how delays grow between attempts, and which commands are safe to repeat.

CRL is off by default. You enable it by assigning a provider to a connection, a command, or both. The two providers are independent: assigning a provider to a connection doesn't apply it to commands created from that connection.

> **Note:**  
> CRL is available in Microsoft.Data.SqlClient 3.0 and later. The default is [Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateNoneRetryProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConfigurableRetryFactory.CreateNoneRetryProvider%252A), which doesn't retry.

## What CRL retries

| Scenario | Assign the provider to | Typical failures |
| --- | --- | --- |
| Open a connection | [Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%252A) | Failover, throttling, brief database unavailability, and transport failures during connection establishment. |
| Execute a command | [Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%252A) | Selected statement failures that are safe to repeat outside a transaction. |

For the shared catalog of connection errors that are eligible for retry across SQL Server, Azure SQL Database, Azure SQL Managed Instance, SQL database in Microsoft Fabric, and dedicated SQL pools in Azure Synapse Analytics, see [Built-in transient error list](internal-retry-logic-providers-sqlclient.md#built-in-transient-error-list).

## Pick a configuration path

| Task | Article |
| --- | --- |
| Create and assign a provider in code | [Configure retry logic in SqlClient](configurable-retry-logic-sqlclient-introduction.md) |
| Compare fixed, incremental, exponential, and no-retry providers | [Built-in retry logic providers in SqlClient](internal-retry-logic-providers-sqlclient.md) |
| Set application-wide defaults in a configuration file | [Configure SqlClient retry logic with a configuration file](configurable-retry-logic-config-file-sqlclient.md) |
| Implement a custom interval, error predicate, or provider | [Create a custom retry provider for SqlClient](configurable-retry-logic-core-apis-sqlclient.md) |

## Design a safe retry policy

- Retry only failures that are likely to clear without changing application input.
- Bound retries by both attempt count and maximum delay. An unbounded retry loop can turn an outage into sustained load.
- Treat `NumberOfTries` as the total number of attempts, including the initial operation.
- Add jitter so many clients don't retry simultaneously. The built-in providers add jitter automatically.
- Retry an entire transaction, not one statement inside it. The built-in command providers don't retry commands on a connection with an active transaction.
- Restrict command retries to idempotent operations, or to operations protected by an application-level idempotency mechanism.
- Log the [Microsoft.Data.SqlClient.SqlRetryLogicBaseProvider.Retrying](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlRetryLogicBaseProvider.Retrying) event so you can distinguish recovered transient failures from persistent incidents.

For general architecture guidance, see [Retry pattern](https://learn.microsoft.com/azure/architecture/patterns/retry). For Azure SQL error guidance, see [Transient errors](https://learn.microsoft.com/azure/azure-sql/database/troubleshoot-common-connectivity-issues#transient-errors-transient-faults).

## Client-side timeouts and serverless resume

CRL retries only errors the driver actually receives. A client-side timeout surfaces as error `-2`, which isn't in the [built-in transient error list](internal-retry-logic-providers-sqlclient.md#built-in-transient-error-list), so the built-in providers don't retry an `Open()` or a command that hits the client timeout. `ConnectTimeout` and `CommandTimeout` must be long enough to cover the operation on their own.

This condition matters most for the [Serverless compute tier for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/serverless-tier-overview) with auto-pause enabled. An auto-paused database resumes on the first `Open()`, and the resume can take 30 to 60 seconds or more. Raise `ConnectTimeout` to at least 60 seconds when the target can auto-pause. Retry logic then handles the remaining transient failures (for example `40613`, `40197`, and `40501`) while the database comes online.

## Related content

- [Retry Pattern](https://learn.microsoft.com/azure/architecture/patterns/retry)
- [Transient faults](https://learn.microsoft.com/azure/azure-sql/database/troubleshoot-common-connectivity-issues#transient-errors-transient-faults)
- [Troubleshoot connectivity issues and other errors](https://learn.microsoft.com/azure/azure-sql/database/troubleshoot-common-errors-issues)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
