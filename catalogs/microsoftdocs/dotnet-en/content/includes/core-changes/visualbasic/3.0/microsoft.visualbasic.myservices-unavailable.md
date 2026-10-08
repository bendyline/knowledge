### Types in Microsoft.VisualBasic.MyServices namespace not available

The types in the [Microsoft.VisualBasic.MyServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices) namespace are not available.

#### Version introduced

.NET Core 3.0

#### Change description

The types in the [Microsoft.VisualBasic.MyServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices) namespace were available in .NET Framework. They're not available in .NET Core 3.0 - 3.1.

The types were removed to avoid unnecessary assembly dependencies or breaking changes in subsequent releases.

#### Recommended action

This namespace was added in .NET 5, upgrade your project to .NET 5 or later.

-or-

If your code depends on the use of **Microsoft.VisualBasic.MyServices** types and their members, there are corresponding types and members in the .NET class library. The following is a mapping of  **Microsoft.VisualBasic.MyServices** types to their equivalent .NET class library types:

| Microsoft.VisualBasic.MyServices type | .NET class library type |
| --- | --- |
| [Microsoft.VisualBasic.MyServices.ClipboardProxy](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy) | [System.Windows.Clipboard](https://learn.microsoft.com/search/?terms=System.Windows.Clipboard) for WPF applications, [System.Windows.Forms.Clipboard](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Clipboard) for Windows Forms applications |
| [Microsoft.VisualBasic.MyServices.FileSystemProxy](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.FileSystemProxy) | Types in the [System.IO](https://learn.microsoft.com/search/?terms=System.IO) namespace |
| [Microsoft.VisualBasic.MyServices.RegistryProxy](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.RegistryProxy) | Registry-related types in the [Microsoft.Win32](https://learn.microsoft.com/search/?terms=Microsoft.Win32) namespace |
| [Microsoft.VisualBasic.MyServices.SpecialDirectoriesProxy](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.SpecialDirectoriesProxy) | [System.Environment.GetFolderPath%2A](https://learn.microsoft.com/search/?terms=System.Environment.GetFolderPath%252A) |

#### Category

Visual Basic

#### Affected APIs

- [Microsoft.VisualBasic.MyServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices)

<!--

#### Affected APIs

- `N:Microsoft.VisualBasic.MyServices`

-->
