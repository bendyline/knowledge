### UnauthorizedAccessException thrown by FileSystemInfo.Attributes

In .NET Core, an [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) is thrown when the caller attempts to set a file attribute value but doesn't have write permission.

#### Change description

In .NET Framework, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown when the caller attempts to set a file attribute value in [System.IO.FileSystemInfo.Attributes](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.Attributes) but doesn't have write permission. In .NET Core, an [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) is thrown instead. (In .NET Core, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is still thrown if the caller attempts to set an invalid file attribute.)

#### Version introduced

1.0

#### Recommended action

Modify any `catch` statements to catch an [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) instead of, or in addition to, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException), as necessary.

#### Category

Core .NET libraries

#### Affected APIs

- [System.IO.FileSystemInfo.Attributes](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.Attributes)

<!--

#### Affected APIs

- `P:System.IO.FileSystemInfo.Attributes`

-->
