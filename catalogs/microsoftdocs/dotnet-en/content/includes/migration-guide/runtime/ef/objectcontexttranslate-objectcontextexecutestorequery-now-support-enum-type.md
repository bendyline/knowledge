### ObjectContext.Translate and ObjectContext.ExecuteStoreQuery now support enum type

#### Details

In .NET Framework 4.0, the generic parameter `T` of `ObjectContext.Translate` and `ObjectContext.ExecuteStoreQuery` methods could not be an enum. That scenario is now supported.

#### Suggestion

If Translate or ExecuteStoreQuery was called on an enum type in .NET Framework 4.0, '0' was returned. If that behavior was desirable, the calls should be replaced with a constant 0 (or the enum equivalent of it).

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Data.Objects.ObjectContext.Translate%60%601(System.Data.Common.DbDataReader)](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.Translate%2560%25601(System.Data.Common.DbDataReader))
- [System.Data.Objects.ObjectContext.Translate%60%601(System.Data.Common.DbDataReader,System.String,System.Data.Objects.MergeOption)](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.Translate%2560%25601(System.Data.Common.DbDataReader%2CSystem.String%2CSystem.Data.Objects.MergeOption))
- [System.Data.Objects.ObjectContext.ExecuteStoreQuery%60%601(System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.ExecuteStoreQuery%2560%25601(System.String%2CSystem.Object%5B%5D))
- [System.Data.Objects.ObjectContext.ExecuteStoreQuery%60%601(System.String,System.String,System.Data.Objects.MergeOption,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectContext.ExecuteStoreQuery%2560%25601(System.String%2CSystem.String%2CSystem.Data.Objects.MergeOption%2CSystem.Object%5B%5D))

<!--

#### Affected APIs

- ``M:System.Data.Objects.ObjectContext.Translate``1(System.Data.Common.DbDataReader)``
- ``M:System.Data.Objects.ObjectContext.Translate``1(System.Data.Common.DbDataReader,System.String,System.Data.Objects.MergeOption)``
- ``M:System.Data.Objects.ObjectContext.ExecuteStoreQuery``1(System.String,System.Object[])``
- ``M:System.Data.Objects.ObjectContext.ExecuteStoreQuery``1(System.String,System.String,System.Data.Objects.MergeOption,System.Object[])``

-->
