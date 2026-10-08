### Enumerable.Empty&lt;TResult&gt; always returns cached instance

#### Details

Beginning in .NET Framework 4.5, [System.Linq.Enumerable.Empty%60%601](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty%2560%25601) always returns a cached internal instance [System.Collections.Generic.IEnumerable%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%25601).Previously, [System.Linq.Enumerable.Empty%60%601](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty%2560%25601) would cache an empty [System.Collections.Generic.IEnumerable%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%25601) at the time the API was called, meaning that in some conditions in which [System.Linq.Enumerable.Empty%60%601](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty%2560%25601) was called rapidly and concurrently, different instances of the type could be returned for different calls to the API.

#### Suggestion

Because the previous behavior was non-deterministic, code is unlikely to depend on it. However, in the unlikely case that empty enumerables are being compared and expected to sometimes be unequal, explicit empty arrays should be created (`new T[0]`) instead of using [System.Linq.Enumerable.Empty%60%601](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty%2560%25601).

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Linq.Enumerable.Empty%60%601](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty%2560%25601)

<!--

#### Affected APIs

- ``M:System.Linq.Enumerable.Empty``1``

-->
