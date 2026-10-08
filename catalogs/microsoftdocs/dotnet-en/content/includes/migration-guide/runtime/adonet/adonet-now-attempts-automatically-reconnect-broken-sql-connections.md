### ADO.NET now attempts to automatically reconnect broken SQL connections

#### Details

Beginning in .NET Framework 4.5.1, .NET Framework will attempt to automatically reconnect broken SQL connections. Although this will typically make apps more reliable, there are edge cases in which an app needs to know that the connection was lost so that it can take some action upon reconnection.

#### Suggestion

If this feature is undesirable due to compatibility concerns, it can be disabled by setting the [System.Data.SqlClient.SqlConnectionStringBuilder.ConnectRetryCount](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder.ConnectRetryCount) property of a connection string (or [System.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder)) to 0.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5.1 |
| Type | Runtime |

#### Affected APIs

- [System.Data.IDbConnection.ConnectionString](https://learn.microsoft.com/search/?terms=System.Data.IDbConnection.ConnectionString)
- [System.Data.SqlClient.SqlConnection.ConnectionString](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnection.ConnectionString)
- [System.Configuration.ConnectionStringSettings.ConnectionString](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ConnectionString)
- [System.Data.Common.DbConnection.ConnectionString](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection.ConnectionString)
- [System.Data.Common.DbConnectionStringBuilder.ConnectionString](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnectionStringBuilder.ConnectionString)
- [System.Data.SqlClient.SqlConnectionStringBuilder.%23ctor](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder.%2523ctor)
- [System.Data.SqlClient.SqlConnectionStringBuilder.%23ctor(System.String)](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder.%2523ctor(System.String))
- [System.Data.Common.DbConnectionStringBuilder.%23ctor](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnectionStringBuilder.%2523ctor)
- [System.Data.Common.DbConnectionStringBuilder.%23ctor(System.Boolean)](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnectionStringBuilder.%2523ctor(System.Boolean))
