### DbParameter.Precision and DbParameter.Scale are now public virtual members

#### Details

[System.Data.Common.DbParameter.Precision](https://learn.microsoft.com/search/?terms=System.Data.Common.DbParameter.Precision) and [System.Data.Common.DbParameter.Scale](https://learn.microsoft.com/search/?terms=System.Data.Common.DbParameter.Scale) are implemented as public virtual properties. They replace the corresponding explicit interface implementations, [System.Data.Common.DbParameter.System%23Data%23IDbDataParameter%23Precision](https://learn.microsoft.com/search/?terms=System.Data.Common.DbParameter.System%2523Data%2523IDbDataParameter%2523Precision) and [System.Data.Common.DbParameter.System%23Data%23IDbDataParameter%23Scale](https://learn.microsoft.com/search/?terms=System.Data.Common.DbParameter.System%2523Data%2523IDbDataParameter%2523Scale).

#### Suggestion

When re-building an ADO.NET database provider, these differences will require the 'override' keyword to be applied to the Precision and Scale properties. This is only needed when re-building the components; existing binaries will continue to work.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5.1 |
| Type | Retargeting |

#### Affected APIs

- [System.Data.Common.DbParameter.Precision](https://learn.microsoft.com/search/?terms=System.Data.Common.DbParameter.Precision)
- [System.Data.Common.DbParameter.Scale](https://learn.microsoft.com/search/?terms=System.Data.Common.DbParameter.Scale)
