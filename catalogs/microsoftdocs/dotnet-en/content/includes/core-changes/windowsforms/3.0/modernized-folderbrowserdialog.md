### Modernization of the FolderBrowserDialog

The [System.Windows.Forms.FolderBrowserDialog](https://learn.microsoft.com/search/?terms=System.Windows.Forms.FolderBrowserDialog) control has changed in Windows Forms applications for .NET Core.

#### Change description

In the .NET Framework, Windows forms uses the following dialog for the [System.Windows.Forms.FolderBrowserDialog](https://learn.microsoft.com/search/?terms=System.Windows.Forms.FolderBrowserDialog) control:

The FolderBrowserDialogControl in the .NET Framework

In .NET Core 3.0, Windows Forms uses a newer COM-based control that was introduced in Windows Vista:

The FolderBrowserDialogControl in the .NET Core

#### Version introduced

3.0

#### Recommended action

The dialog will be upgraded automatically.

If you desire to retain the original dialog, set the [System.Windows.Forms.FolderBrowserDialog.AutoUpgradeEnabled](https://learn.microsoft.com/search/?terms=System.Windows.Forms.FolderBrowserDialog.AutoUpgradeEnabled) property to `false` before showing the dialog, as illustrated by the following code fragment:

```csharp
var dialog = new FolderBrowserDialog();
dialog.AutoUpgradeEnabled = false;
dialog.ShowDialog();
```

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.FolderBrowserDialog](https://learn.microsoft.com/search/?terms=System.Windows.Forms.FolderBrowserDialog)

<!--

#### Affected APIs

- `T:System.Windows.Forms.FolderBrowserDialog`

-->
