### Support special relative URI notation when Unicode is present

#### Details

[System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) will no longer throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) when calling [System.Uri.TryCreate%2A](https://learn.microsoft.com/search/?terms=System.Uri.TryCreate%252A) on certain relative URIs containing Unicode. The simplest reproduction of the [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) is below, with the two statements being equivalent:

```csharp
bool success = Uri.TryCreate("http:%C3%A8", UriKind.RelativeOrAbsolute, out Uri href);
bool success = Uri.TryCreate("http:è", UriKind.RelativeOrAbsolute, out Uri href);
```

To reproduce the [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), the following items must be true:

- The URI must be specified as relative by prepending it with 'http:' and not following it with '//'.
- The URI must contain percent-encoded Unicode or unreserved symbols.

#### Suggestion

Users depending on this behavior to disallow relative URIs should instead specify [System.UriKind.Absolute](https://learn.microsoft.com/search/?terms=System.UriKind.Absolute) when creating a URI.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.7.2 |
| Type | Runtime |

#### Affected APIs

- [System.Uri.TryCreate(System.Uri,System.Uri,System.Uri@)](https://learn.microsoft.com/search/?terms=System.Uri.TryCreate(System.Uri%2CSystem.Uri%2CSystem.Uri%40))
- [System.Uri.TryCreate(System.String,System.UriKind,System.Uri@)](https://learn.microsoft.com/search/?terms=System.Uri.TryCreate(System.String%2CSystem.UriKind%2CSystem.Uri%40))
- [System.Uri.TryCreate(System.Uri,System.String,System.Uri@)](https://learn.microsoft.com/search/?terms=System.Uri.TryCreate(System.Uri%2CSystem.String%2CSystem.Uri%40))

<!--

#### Affected APIs

- `M:System.Uri.TryCreate(System.Uri,System.Uri,System.Uri@)`
- `M:System.Uri.TryCreate(System.String,System.UriKind,System.Uri@)`
- `M:System.Uri.TryCreate(System.Uri,System.String,System.Uri@)`

-->
