### Change in behavior in Data Definition Language (DDL) APIs

#### Details

The behavior of DDL APIs when AttachDBFilename is specified has changed as follows:

- Connection strings need not specify an Initial Catalog value. Previously, both AttachDBFilename and Initial Catalog were required.
- If both AttachDBFilename and Initial Catalog are specified and the given MDF file exists, the [System.Data.Objects.ObjectContext.DatabaseExists%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.DatabaseExists%252A) method returns `true`. Previously, it returned `false`.
- If both AttachDBFilename and Initial Catalog are specified and the given MDF file exists, calling the [System.Data.Objects.ObjectContext.DeleteDatabase%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.DeleteDatabase%252A) method deletes the files.
- If [System.Data.Objects.ObjectContext.DeleteDatabase%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.DeleteDatabase%252A) is called when the connection string specifies an AttachDBFilename value with an MDF that doesn't exist and an Initial Catalog that doesn't exist, the method throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception. Previously, it threw a [System.Data.SqlClient.SqlException](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlException) exception.

#### Suggestion

These changes make it easier to build tools and applications that use the DDL APIs. These changes can affect application compatibility in the following scenarios:

- The user writes code that executes a `DROP DATABASE` command directly instead of calling [System.Data.Objects.ObjectContext.DeleteDatabase%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.DeleteDatabase%252A) if [System.Data.Objects.ObjectContext.DatabaseExists%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.DatabaseExists%252A) returns `true`. This breaks existing code If the database is not attached but the MDF file exists.
- The user writes code that expects the [System.Data.Objects.ObjectContext.DeleteDatabase%2A](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.DeleteDatabase%252A) method to throw a [System.Data.SqlClient.SqlException](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlException) rather than an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) when the Initial Catalog and MDF file don't exist.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
