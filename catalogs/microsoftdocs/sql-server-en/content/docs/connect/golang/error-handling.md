---
title: "go-mssqldb Error Handling and Retry Patterns"
description: "Handle errors, classify transient faults, and implement retry logic in Go applications using the go-mssqldb driver for SQL Server."
author: dlevy-msft
ms.author: dlevy
ms.date: 07/08/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
ai-usage: ai-assisted
---
# Error handling and retry patterns with go-mssqldb

Production Go applications need structured error handling to distinguish between transient failures that you can retry and permanent errors that require human intervention. This article covers error classification, retry patterns, and resilience strategies for the `go-mssqldb` driver.

## SQL Server error structure

When SQL Server returns an error, the `go-mssqldb` driver wraps it in a `mssql.Error` struct. Use a type assertion to access the structured error fields:

```go
import (
    "database/sql"
    "errors"
    "fmt"

    mssql "github.com/microsoft/go-mssqldb"
)

func handleError(err error) {
    var mssqlErr mssql.Error
    if errors.As(err, &mssqlErr) {
        fmt.Printf("Number:  %d\n", mssqlErr.Number)
        fmt.Printf("State:   %d\n", mssqlErr.State)
        fmt.Printf("Class:   %d\n", mssqlErr.Class)
        fmt.Printf("Message: %s\n", mssqlErr.Message)
        fmt.Printf("Server:  %s\n", mssqlErr.ServerName)
        fmt.Printf("Proc:    %s\n", mssqlErr.ProcName)
        fmt.Printf("Line:    %d\n", mssqlErr.LineNo)
    }
}
```

### Error fields

| Field | Type | Description |
| --- | --- | --- |
| `Number` | `int32` | SQL Server error number. Maps to `sys.messages`. |
| `State` | `uint8` | Error state. Provides additional context for the same error number. |
| `Class` | `uint8` | Severity level (0-25). Severity 11-16 are user-correctable. Severity 17+ indicate resource or system problems. |
| `Message` | `string` | Human-readable error text from the server. |
| `ServerName` | `string` | Name of the SQL Server instance that raised the error. |
| `ProcName` | `string` | Stored procedure or function name where the error occurred. Empty for ad hoc queries. |
| `LineNo` | `int32` | Line number in the Transact-SQL (T-SQL) batch or stored procedure. |

### Severity levels

| Severity range | Meaning | Action |
| --- | --- | --- |
| 0-10 | Informational messages | No error. Log if useful. |
| 11-16 | User-correctable errors | Fix the query, parameters, or permissions. |
| 17-19 | Resource errors | Retry. The server might be under load or out of resources. |
| 20-25 | Fatal errors | The connection is broken. Reconnect and retry. |

## Classify errors as transient or permanent

Transient errors are temporary conditions that resolve on their own, such as network blips, connection throttling, or brief resource contention. Permanent errors require code or configuration changes.

### Common transient error numbers

Use the following shared catalog as the canonical list of transient connection-establishment and request-path transport errors:


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


The following `isTransient` function shows one Go implementation pattern for retry classification. Treat the shared catalog above as the source of truth, and keep your code lookup aligned with it.

```go
// isTransient returns true if the error is a transient SQL Server error
// that is likely to succeed on retry.
func isTransient(err error) bool {
    var mssqlErr mssql.Error
    if !errors.As(err, &mssqlErr) {
        // Network errors, context deadlines, and connection resets
        // are also transient.
        return isNetworkError(err)
    }

    if isTransientSQLNumber(mssqlErr.Number) {
        return true
    }

    // Severity 17-19 indicates resource issues that are typically transient.
    return mssqlErr.Class >= 17 && mssqlErr.Class <= 19
}

// Keep this lookup synchronized with the shared transient catalog above.
var transientSQLNumbers = map[int32]struct{}{
    64:    {}, // Transport/connection error.
    1205:  {}, // Deadlock victim.
    40197: {}, // Service error processing request.
    40501: {}, // Service is currently busy.
    40613: {}, // Database is currently unavailable.
    49918: {}, // Cannot process request: not enough resources.
    49919: {}, // Cannot process create/update request.
    49920: {}, // Cannot process request: too many operations.
}

func isTransientSQLNumber(number int32) bool {
    _, ok := transientSQLNumbers[number]
    return ok
}
```

If you experience configuration and quota errors, fix the underlying capacity, database, or network configuration before retrying. Examples include:

- `40544` (database size quota)
- `4060` (cannot open database)
- `40615` (firewall rule)

### Detect network errors

Network-level errors don't produce `mssql.Error` values. Check for common Go network error types:

```go
import (
    "context"
    "errors"
    "net"
    "io"
)

func isNetworkError(err error) bool {
    if err == nil {
        return false
    }

    // Context deadline exceeded or canceled
    if errors.Is(err, context.DeadlineExceeded) {
        return true
    }

    // Connection reset or broken pipe
    var netErr *net.OpError
    if errors.As(err, &netErr) {
        return true
    }

    // Unexpected EOF (server dropped the connection)
    if errors.Is(err, io.ErrUnexpectedEOF) || errors.Is(err, io.EOF) {
        return true
    }

    return false
}
```

## Implement retry with exponential backoff

Retry transient errors with increasing delays between attempts. This approach gives the server time to recover and avoids overwhelming it with rapid retries.

```go
import (
    "context"
    "database/sql"
    "errors"
    "fmt"
    "log"
    "math"
    "math/rand"
    "time"

    mssql "github.com/microsoft/go-mssqldb"
)

// RetryConfig controls retry behavior.
type RetryConfig struct {
    MaxAttempts int           // Maximum number of attempts (including the first).
    BaseDelay   time.Duration // Initial delay before the first retry.
    MaxDelay    time.Duration // Upper bound on delay between retries.
}

// DefaultRetryConfig provides sensible defaults for SQL Server workloads.
var DefaultRetryConfig = RetryConfig{
    MaxAttempts: 5,
    BaseDelay:   100 * time.Millisecond,
    MaxDelay:    10 * time.Second,
}

// RetryFunc executes fn with retries for transient errors.
func RetryFunc(ctx context.Context, cfg RetryConfig, fn func(ctx context.Context) error) error {
    var lastErr error
    for attempt := 0; attempt < cfg.MaxAttempts; attempt++ {
        lastErr = fn(ctx)
        if lastErr == nil {
            return nil
        }

        if !isTransient(lastErr) {
            return lastErr // Permanent error, don't retry.
        }

        if attempt == cfg.MaxAttempts-1 {
            break // Last attempt, don't sleep.
        }

        delay := calculateDelay(attempt, cfg.BaseDelay, cfg.MaxDelay)

        select {
        case <-ctx.Done():
            return ctx.Err()
        case <-time.After(delay):
        }
    }
    return lastErr
}

func calculateDelay(attempt int, baseDelay, maxDelay time.Duration) time.Duration {
    // Exponential backoff: base * 2^attempt
    delay := time.Duration(float64(baseDelay) * math.Pow(2, float64(attempt)))
    if delay > maxDelay {
        delay = maxDelay
    }
    // Add jitter: +/- 25% to avoid thundering herd
    jitter := time.Duration(rand.Int63n(int64(delay) / 2))
    return delay/2 + jitter
}

// isTransient classifies retryable SQL Server errors.
// For a fuller example, see "Classify errors as transient or permanent" earlier in this article.
func isTransient(err error) bool {
    var mssqlErr mssql.Error
    if !errors.As(err, &mssqlErr) {
        return errors.Is(err, context.DeadlineExceeded)
    }

    switch mssqlErr.Number {
    case 1205, 40197, 40501, 40613, 49918, 49919, 49920:
        return true
    }

    return mssqlErr.Class >= 17 && mssqlErr.Class <= 19
}

// getEmployeeCount wraps a query with automatic retry.
func getEmployeeCount(ctx context.Context, db *sql.DB) (int, error) {
    var count int
    err := RetryFunc(ctx, DefaultRetryConfig, func(ctx context.Context) error {
        // This query executes on every retry attempt until success or exhaustion.
        return db.QueryRowContext(ctx, "SELECT COUNT(*) FROM HumanResources.Employee").Scan(&count)
    })
    return count, err
}

// Example call site (assumes db is already initialized).
func example(ctx context.Context, db *sql.DB) {
    queryCtx, cancel := context.WithTimeout(ctx, 15*time.Second)
    defer cancel()

    count, err := getEmployeeCount(queryCtx, db)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Employee count: %d\n", count)
}
```

## Handle deadlocks

Deadlocks (error 1205) are the most common transient error in multi-user applications. SQL Server automatically terminates one of the competing sessions and returns error 1205 to the victim.

### Detect a deadlock

Check whether a SQL Server error is a deadlock (error 1205).

```go
func isDeadlock(err error) bool {
    var mssqlErr mssql.Error
    if errors.As(err, &mssqlErr) {
        return mssqlErr.Number == 1205
    }
    return false
}
```

### Retry transactions after deadlocks

When a deadlock occurs inside a transaction, the server rolls back the entire transaction. You must retry the complete transaction, not just the failed statement:

```go
func transferInventory(ctx context.Context, db *sql.DB, productID, fromLocationID, toLocationID int, qty int) error {
    return RetryFunc(ctx, DefaultRetryConfig, func(ctx context.Context) error {
        tx, err := db.BeginTx(ctx, &sql.TxOptions{
            Isolation: sql.LevelReadCommitted,
        })
        if err != nil {
            return err
        }
        defer tx.Rollback()

        _, err = tx.ExecContext(ctx,
            "UPDATE Production.ProductInventory SET Quantity = Quantity - @qty WHERE ProductID = @pid AND LocationID = @lid",
            sql.Named("qty", qty),
            sql.Named("pid", productID),
            sql.Named("lid", fromLocationID))
        if err != nil {
            return err
        }

        _, err = tx.ExecContext(ctx,
            "UPDATE Production.ProductInventory SET Quantity = Quantity + @qty WHERE ProductID = @pid AND LocationID = @lid",
            sql.Named("qty", qty),
            sql.Named("pid", productID),
            sql.Named("lid", toLocationID))
        if err != nil {
            return err
        }

        return tx.Commit()
    })
}
```

> **Tip:**
> Reduce deadlocks by accessing tables in a consistent order across all transactions and keeping transactions short.

Retrying is the correct response in application code, but repeated deadlocks on the same query indicate a design problem. Use the SQL Server deadlock graph (captured through Extended Events or the system health session) to identify the competing statements and lock types. For a full walkthrough of deadlock analysis and prevention, see the [Deadlocks guide](../../relational-databases/sql-server-deadlocks-guide.md). For deadlock handling strategies specific to transactions, see [Deadlock handling](transactions.md#deadlock-handling).

## Handle connection pool exhaustion

When all connections in the pool are in use and `MaxOpenConns` is reached, new callers block until a connection becomes available or the context deadline expires. This situation manifests as slow requests or context deadline errors, not as explicit pool exhaustion errors.

### Detect pool pressure

Monitor pool statistics and alert when wait counts increase.

```go
func monitorPool(ctx context.Context, db *sql.DB) {
    ticker := time.NewTicker(10 * time.Second)
    defer ticker.Stop()

    var lastWaitCount int64
    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            stats := db.Stats()
            newWaits := stats.WaitCount - lastWaitCount
            lastWaitCount = stats.WaitCount

            if newWaits > 0 {
                log.Printf("Pool pressure: open=%d inUse=%d idle=%d newWaits=%d waitDuration=%v",
                    stats.OpenConnections, stats.InUse, stats.Idle,
                    newWaits, stats.WaitDuration)
            }
        }
    }
}
```

### Common causes and solutions

| Symptom | Cause | Solution |
| --- | --- | --- |
| `WaitCount` increases steadily | `MaxOpenConns` is too low | Increase `MaxOpenConns` to match your concurrency. |
| `InUse` equals `MaxOpenConns` for extended periods | Connections aren't returned to the pool | Close `*sql.Rows`, commit or rollback `*sql.Tx`, and close `*sql.Conn` promptly. |
| `OpenConnections` keeps growing | Connections leak faster than `MaxIdleConns` can recycle | Set `ConnMaxLifetime` and `ConnMaxIdleTime` to bound connection age. |
| Context deadline exceeded during queries | Pool is saturated and callers wait too long | Increase pool size, reduce query execution time, or add query timeouts. |

## Handle specific SQL Server errors

### Constraint violations

Unique key and foreign key violations are permanent errors that indicate a logic problem in the application:

```go
func isUniqueViolation(err error) bool {
    var mssqlErr mssql.Error
    if errors.As(err, &mssqlErr) {
        return mssqlErr.Number == 2627 || // Unique constraint violation
            mssqlErr.Number == 2601       // Unique index violation
    }
    return false
}

func isForeignKeyViolation(err error) bool {
    var mssqlErr mssql.Error
    if errors.As(err, &mssqlErr) {
        return mssqlErr.Number == 547 // FK constraint violation
    }
    return false
}
```

### Upsert pattern with conflict detection

Use a `MERGE` statement to insert or update a row atomically:

```go
func upsertDepartment(ctx context.Context, db *sql.DB, id int, name, groupName string) error {
    _, err := db.ExecContext(ctx, `
        MERGE INTO HumanResources.Department AS target
        USING (SELECT @id AS DepartmentID, @name AS Name, @grp AS GroupName) AS source
        ON target.DepartmentID = source.DepartmentID
        WHEN MATCHED THEN
            UPDATE SET Name = source.Name, GroupName = source.GroupName
        WHEN NOT MATCHED THEN
            INSERT (Name, GroupName) VALUES (source.Name, source.GroupName);`,
        sql.Named("id", id),
        sql.Named("name", name),
        sql.Named("grp", groupName))
    return err
}
```

### Permission errors

Detect common permission-denied error numbers to provide a clear message to callers:

```go
func isPermissionError(err error) bool {
    var mssqlErr mssql.Error
    if errors.As(err, &mssqlErr) {
        return mssqlErr.Number == 229 ||   // SELECT permission denied
            mssqlErr.Number == 230 ||       // Column permission denied
            mssqlErr.Number == 262 ||       // CREATE permission denied
            mssqlErr.Number == 300 ||       // VIEW permission denied
            mssqlErr.Number == 15247        // User doesn't have permission
    }
    return false
}
```

## Handle sql.ErrNoRows

`sql.ErrNoRows` isn't a SQL Server error. The `QueryRowContext.Scan` method returns it when the query returns no rows. Handle it explicitly to distinguish "not found" from actual errors:

```go
func getEmployee(ctx context.Context, db *sql.DB, id int) (*Employee, error) {
    var emp Employee
    err := db.QueryRowContext(ctx,
        "SELECT TOP (1) BusinessEntityID, FirstName + ' ' + LastName AS Name, CountryRegionName AS Location FROM Sales.vSalesPerson WHERE BusinessEntityID = @p1",
        sql.Named("p1", id)).Scan(&emp.Id, &emp.Name, &emp.Location)

    if errors.Is(err, sql.ErrNoRows) {
        return nil, nil // Not found, not an error.
    }
    if err != nil {
        return nil, fmt.Errorf("query employee %d: %w", id, err)
    }
    return &emp, nil
}
```

## Wrap errors with context

Add context to errors so callers can understand where the failure occurred:

```go
func getEmployeesByLocation(ctx context.Context, db *sql.DB, location string) ([]Employee, error) {
    rows, err := db.QueryContext(ctx,
        "SELECT BusinessEntityID, FirstName + ' ' + LastName AS Name, CountryRegionName AS Location FROM Sales.vSalesPerson WHERE CountryRegionName = @p1",
        sql.Named("p1", location))
    if err != nil {
        return nil, fmt.Errorf("query employees by location %q: %w", location, err)
    }
    defer rows.Close()

    var employees []Employee
    for rows.Next() {
        var emp Employee
        if err := rows.Scan(&emp.Id, &emp.Name, &emp.Location); err != nil {
            return nil, fmt.Errorf("scan employee row: %w", err)
        }
        employees = append(employees, emp)
    }
    if err := rows.Err(); err != nil {
        return nil, fmt.Errorf("iterate employee rows: %w", err)
    }
    return employees, nil
}
```

Using `%w` preserves the error chain so callers can still use `errors.As` and `errors.Is` to inspect the underlying error.

## Error handling checklist

| Area | Recommendation |
| --- | --- |
| Type assertion | Declare `var mssqlErr mssql.Error`, then use `errors.As(err, &mssqlErr)` to access SQL Server error fields. |
| Transient detection | Classify errors by number and severity before deciding whether to retry. |
| Retry logic | Use exponential backoff with jitter. Set a maximum attempt count and an overall timeout via context. |
| Deadlocks | Retry the entire transaction, not individual statements. Reduce deadlocks by accessing tables consistently. |
| Pool exhaustion | Monitor `db.Stats()` and set context deadlines on all database calls. |
| ErrNoRows | Handle `sql.ErrNoRows` explicitly for `QueryRowContext`. It's not a server error. |
| Error wrapping | Use `fmt.Errorf` with `%w` to add context while preserving the error chain. |
| Constraint violations | Check for error numbers 2627, 2601 (unique), and 547 (foreign key) to handle conflicts gracefully. |

## Related content

- [Transactions with go-mssqldb](transactions.md)
- [Connection pooling with go-mssqldb](connection-pooling.md)
- [Troubleshoot the go-mssqldb driver](troubleshooting.md)
- [Performance tuning with go-mssqldb](performance-tuning.md)
