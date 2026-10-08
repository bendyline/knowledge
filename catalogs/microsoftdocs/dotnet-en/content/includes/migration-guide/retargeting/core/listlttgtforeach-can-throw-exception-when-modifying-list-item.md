### List&lt;T&gt;.ForEach can throw exception when modifying list item

#### Details

Beginning in .NET Framework 4.5, a [System.Collections.Generic.List%601.ForEach(System.Action{%600})](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%25601.ForEach(System.Action%7B%25600%7D)) enumerator will throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception if an element in the calling collection is modified. Previously, this would not throw an exception but could lead to race conditions.

#### Suggestion

Ideally, code should be fixed to not modify lists while enumerating their elements because that is never a safe operation. To revert to the previous behavior, though, an app may target .NET Framework 4.0.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Collections.Generic.List%601.ForEach(System.Action{%600})](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%25601.ForEach(System.Action%7B%25600%7D))
