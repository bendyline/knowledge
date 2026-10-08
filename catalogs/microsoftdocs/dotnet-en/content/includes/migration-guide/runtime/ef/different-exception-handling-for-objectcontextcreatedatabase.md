### Different exception handling for ObjectContext.CreateDatabase and DbProviderServices.CreateDatabase methods

#### Details

Beginning in .NET Framework 4.5, if database creation fails, `CreateDatabase` methods will attempt to drop the empty database. If that operation succeeds, the original [System.Data.SqlClient.SqlException](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlException) will be propagated (instead of the [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) that was always thrown in .NET Framework 4.0)

#### Suggestion

When catching an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) while executing [System.Data.Objects.ObjectContext.CreateDatabase](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.CreateDatabase) or [System.Data.Common.DbProviderServices.CreateDatabase(System.Data.Common.DbConnection,System.Nullable{System.Int32},System.Data.Metadata.Edm.StoreItemCollection)](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderServices.CreateDatabase(System.Data.Common.DbConnection%2CSystem.Nullable%7BSystem.Int32%7D%2CSystem.Data.Metadata.Edm.StoreItemCollection)), SQLExceptions should now also be caught.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Data.Objects.ObjectContext.CreateDatabase](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.CreateDatabase)
- [System.Data.Common.DbProviderServices.CreateDatabase(System.Data.Common.DbConnection,System.Nullable{System.Int32},System.Data.Metadata.Edm.StoreItemCollection)](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderServices.CreateDatabase(System.Data.Common.DbConnection%2CSystem.Nullable%7BSystem.Int32%7D%2CSystem.Data.Metadata.Edm.StoreItemCollection))

<!--

#### Affected APIs

- `M:System.Data.Objects.ObjectContext.CreateDatabase`
- `M:System.Data.Common.DbProviderServices.CreateDatabase(System.Data.Common.DbConnection,System.Nullable{System.Int32},System.Data.Metadata.Edm.StoreItemCollection)`

-->
