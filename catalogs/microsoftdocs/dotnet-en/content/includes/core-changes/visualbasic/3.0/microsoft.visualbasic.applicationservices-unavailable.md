### Types in Microsoft.VisualBasic.ApplicationServices namespace not available

The types in the [Microsoft.VisualBasic.ApplicationServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices) namespace are not available.

#### Version introduced

.NET Core 3.0

#### Change description

The types in the [Microsoft.VisualBasic.ApplicationServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices) namespace were available in .NET Framework. They're not available in .NET Core 3.0 - 3.1.

The types were removed to avoid unnecessary assembly dependencies or breaking changes in subsequent releases.

#### Recommended action

This namespace was added in .NET 5, upgrade your project to .NET 5 or later.

-or-

If your code depends on the use of [Microsoft.VisualBasic.ApplicationServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices) types and their members, you may be able to use a corresponding type or member in the .NET class library. For example, some [System.Environment](https://learn.microsoft.com/search/?terms=System.Environment) and [System.Security.Principal.WindowsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.WindowsIdentity) members provide equivalent functionality to the properties of the [Microsoft.VisualBasic.ApplicationServices.User](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.User) class.

#### Category

Visual Basic

#### Affected APIs

- [Microsoft.VisualBasic.ApplicationServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices)

<!--

#### Affected APIs

- `N:Microsoft.VisualBasic.ApplicationServices`

-->
