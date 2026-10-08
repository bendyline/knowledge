### Types in Microsoft.VisualBasic.Devices namespace not available

The types in the [Microsoft.VisualBasic.Devices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices) namespace are not available.

#### Version introduced

.NET Core 3.0

#### Change description

The types in the [Microsoft.VisualBasic.Devices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices) namespace were available in .NET Framework. They're not available in .NET Core 3.0 - 3.1.

The types were removed to avoid unnecessary assembly dependencies or breaking changes in subsequent releases.

#### Recommended action

This namespace was added in .NET 5, upgrade your project to .NET 5 or later.

-or-

If your code depends on the use of [Microsoft.VisualBasic.Devices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices) types and their members, you may be able to use a corresponding type or member in the .NET class library. For example, equivalent functionality to the [Microsoft.VisualBasic.Devices.Clock](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Clock) class is provided by the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.Environment](https://learn.microsoft.com/search/?terms=System.Environment) types, and equivalent functionality to the [Microsoft.VisualBasic.Devices.Ports](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Ports) class is provided by types in the [System.IO.Ports](https://learn.microsoft.com/search/?terms=System.IO.Ports) namespace.

#### Category

Visual Basic

#### Affected APIs

- [Microsoft.VisualBasic.Devices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices)

<!--

#### Affected APIs

- `N:Microsoft.VisualBasic.Devices`

-->
