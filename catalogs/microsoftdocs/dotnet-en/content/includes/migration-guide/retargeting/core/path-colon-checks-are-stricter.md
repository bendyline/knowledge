### Path colon checks are stricter

#### Details

In .NET Framework 4.6.2, a number of changes were made to support previously unsupported paths (both in length and format). Checks for proper drive separator (colon) syntax were made more correct, which had the side effect of blocking some URI paths in a few select Path APIs where they were previously tolerated.

#### Suggestion

If passing a URI to affected APIs, modify the string to be a legal path first.

- Remove the scheme from URLs manually (for example, remove `file://` from URLs).

- Pass the URI to the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class and use [System.Uri.LocalPath](https://learn.microsoft.com/search/?terms=System.Uri.LocalPath).

Alternatively, you can opt out of the new path normalization by setting the `Switch.System.IO.UseLegacyPathHandling` AppContext switch to `true`.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.IO.Path.GetDirectoryName(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.GetDirectoryName(System.String))
- [System.IO.Path.GetPathRoot(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.GetPathRoot(System.String))
