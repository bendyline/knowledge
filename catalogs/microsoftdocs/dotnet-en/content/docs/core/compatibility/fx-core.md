---
title: Breaking changes - .NET Framework to .NET Core
titleSuffix: ""
description: Lists the breaking changes from .NET Framework to .NET Core 1.0 - 3.1.
ms.date: 05/01/2024
---
# Breaking changes for migration from .NET Framework to .NET Core

If you're migrating an app from .NET Framework to .NET Core versions 1.0 through 3.1, the breaking changes listed in this article might affect you. Breaking changes are grouped by category, and within those categories, by the version of .NET Core in which they were introduced.

> **Note:**
> This article is not a complete list of breaking changes between .NET Framework and .NET Core. The most important breaking changes are added here as we become aware of them.

## Core .NET libraries

- [Change in default value of UseShellExecute](#change-in-default-value-of-useshellexecute)
- [IDispatchImplAttribute API is removed](#net-8)
- [UnauthorizedAccessException thrown by FileSystemInfo.Attributes](#unauthorizedaccessexception-thrown-by-filesysteminfoattributes)
- [Handling corrupted-process-state exceptions is not supported](#handling-corrupted-state-exceptions-is-not-supported)
- [UriBuilder properties no longer prepend leading characters](#uribuilder-properties-no-longer-prepend-leading-characters)
- [Process.StartInfo throws InvalidOperationException for processes you didn't start](#processstartinfo-throws-invalidoperationexception-for-processes-you-didnt-start)

### .NET 8

[IDispatchImplAttribute API is removed](interop/8.0/idispatchimplattribute-removed.md)

### .NET Core 2.1

### Change in default value of UseShellExecute

[System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) has a default value of `false` on .NET Core. On .NET Framework, its default value is `true`.

#### Change description

[System.Diagnostics.Process.Start%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start%252A) lets you launch an application directly, for example, with code such as `Process.Start("mspaint.exe")` that launches Paint. It also lets you indirectly launch an associated application if [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) is set to `true`. On .NET Framework, the default value for [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) is `true`, meaning that code such as `Process.Start("mytextfile.txt")` would launch Notepad, if you've associated *.txt* files with that editor. To prevent indirectly launching an app on .NET Framework, you must explicitly set [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) to `false`. On .NET Core, the default value for [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) is `false`. This means that, by default, associated applications are not launched when you call `Process.Start`.

The following properties on [System.Diagnostics.ProcessStartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo) are only functional when [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) is `true`:

- [System.Diagnostics.ProcessStartInfo.CreateNoWindow](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.CreateNoWindow)
- [System.Diagnostics.ProcessStartInfo.ErrorDialog](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.ErrorDialog)
- [System.Diagnostics.ProcessStartInfo.Verb](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.Verb)
- [System.Diagnostics.ProcessStartInfo.WindowStyle](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.WindowStyle).

This change was introduced in .NET Core for performance reasons. Typically, [System.Diagnostics.Process.Start%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start%252A) is used to launch an application directly. Launching an app directly does not need to involve the Windows shell and incur the associated performance cost. To make this default case faster, .NET Core changes the default value of [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) to `false`. You can opt in to the slower path if you need it.

#### Version introduced

2.1

> **Note:**
> In earlier versions of .NET Core, `UseShellExecute` was not implemented for Windows.

#### Recommended action

If your app relies on the old behavior, call [System.Diagnostics.Process.Start(System.Diagnostics.ProcessStartInfo)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start(System.Diagnostics.ProcessStartInfo)) with [System.Diagnostics.ProcessStartInfo.UseShellExecute](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UseShellExecute) set to `true` on the [System.Diagnostics.ProcessStartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo) object.

#### Category

Core .NET libraries

#### Affected APIs

- [System.Diagnostics.Process.Start%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start%252A)
- [System.Diagnostics.ProcessStartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo)

<!--

#### Affected APIs

- `Overload:System.Diagnostics.Process.Start`
- `M:System.Diagnostics.ProcessStartInfo`

-->


***

### .NET Core 1.0

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


***

### Handling corrupted state exceptions is not supported

Handling corrupted-process-state exceptions in .NET Core is not supported.

#### Change description

Previously, corrupted-process-state exceptions could be caught and handled by managed code exception handlers, for example, by using a [try-catch](../../csharp/language-reference/statements/exception-handling-statements.md#the-try-catch-statement) statement in C#.

Starting in .NET Core 1.0, corrupted-process-state exceptions cannot be handled by managed code. The common language runtime doesn't deliver corrupted-process-state exceptions to managed code.

#### Version introduced

1.0

#### Recommended action

Avoid the need to handle corrupted-process-state exceptions by addressing the situations that lead to them instead. If it's absolutely necessary to handle corrupted-process-state exceptions, write the exception handler in C or C++ code.

#### Category

Core .NET libraries

#### Affected APIs

- [System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute)
- [legacyCorruptedStateExceptionsPolicy element](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/core-changes/corefx/1.0/~/docs/framework/configure-apps/file-schema/runtime/legacycorruptedstateexceptionspolicy-element.md)

<!--

#### Affected APIs

- `T:System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute`

-->


***

### UriBuilder properties no longer prepend leading characters

[System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment) no longer prepends a leading `#` character and [System.UriBuilder.Query](https://learn.microsoft.com/search/?terms=System.UriBuilder.Query) no longer prepends a leading `?` character when one is already present.

#### Change description

In .NET Framework, the [System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment) and [System.UriBuilder.Query](https://learn.microsoft.com/search/?terms=System.UriBuilder.Query) properties always prepend a `#` or `?` character, respectively, to the value being stored. This behavior can result in multiple `#` or `?` characters in the stored value if the string already contains one of these leading characters. For example, the value of [System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment) might become `##main`.

Starting in .NET Core 1.0, these properties no longer prepend the `#` or `?` characters to the stored value if one is already present at the beginning of the string.

#### Version introduced

1.0

#### Recommended action

You no longer need to explicitly remove any of these leading characters when setting the property values. This is especially useful when you're appending values, because you no longer have to remove the leading `#` or `?` each time you append.

For example, the following code snippet shows the behavior difference between .NET Framework and .NET Core.

```csharp
var builder = new UriBuilder();
builder.Query = "one=1";
builder.Query += "&two=2";
builder.Query += "&three=3";
builder.Query += "&four=4";

Console.WriteLine(builder.Query);
```

- In .NET Framework, the output is `????one=1&two=2&three=3&four=4`.
- In .NET Core, the output is `?one=1&two=2&three=3&four=4`.

#### Category

Core .NET libraries

#### Affected APIs

- [System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment)
- [System.UriBuilder.Query](https://learn.microsoft.com/search/?terms=System.UriBuilder.Query)

<!--

#### Affected APIs

- `T:System.UriBuilder.Fragment`
- `T:System.UriBuilder.Query`

-->


***

### Process.StartInfo throws InvalidOperationException for processes you didn't start

Reading the [System.Diagnostics.Process.StartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.StartInfo) property for processes that your code didn't start throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException).

#### Change description

In .NET Framework, accessing the [System.Diagnostics.Process.StartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.StartInfo) property for processes that your code didn't start returns a dummy [System.Diagnostics.ProcessStartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo) object. The dummy object contains default values for all of its properties except [System.Diagnostics.ProcessStartInfo.EnvironmentVariables](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.EnvironmentVariables).

Starting in .NET Core 1.0, if you read the [System.Diagnostics.Process.StartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.StartInfo) property for a process that you didn't start (that is, by calling [System.Diagnostics.Process.Start%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start%252A)), an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) is thrown.

#### Version introduced

1.0

#### Recommended action

Do not access the [System.Diagnostics.Process.StartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.StartInfo) property for processes that your code didn't start. For example, don't read this property for processes returned by [System.Diagnostics.Process.GetProcesses%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.GetProcesses%252A).

#### Category

Core .NET libraries

#### Affected APIs

- [System.Diagnostics.Process.StartInfo](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.StartInfo)

<!--

#### Affected APIs

- `P:System.Diagnostics.Process.StartInfo`

-->


***

## Cryptography

- [Boolean parameter of SignedCms.ComputeSignature is respected](#boolean-parameter-of-signedcmscomputesignature-is-respected)

### .NET Core 2.1

### Boolean parameter of SignedCms.ComputeSignature is respected

In .NET Core, the Boolean `silent` parameter of the [System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner%2CSystem.Boolean)) method is respected. A PIN prompt is not shown if this parameter is set to `true`.

#### Change description

In .NET Framework, the `silent` parameter of the [System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner%2CSystem.Boolean)) method is ignored, and a PIN prompt is always shown if required by the provider. In .NET Core, the `silent` parameter is respected, and if set to `true`, a PIN prompt is never shown, even if it's required by the provider.

Support for CMS/PKCS #7 messages was introduced into .NET Core in version 2.1.

#### Version introduced

2.1

#### Recommended action

To ensure a PIN prompt appears if required, desktop applications should call [System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner%2CSystem.Boolean)) and set the Boolean parameter to `false`. The resulting behavior is the same as on .NET Framework regardless of whether the silent context is disabled there.

#### Category

Cryptography

#### Affected APIs

- [System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner%2CSystem.Boolean))

<!--

#### Affected APIs

- `M:System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)`

-->


***

## MSBuild

- [Resource manifest file name change](#resource-manifest-file-name-change)

### .NET Core 3.0

### Resource manifest file name change

Starting in .NET Core 3.0, in the default case, MSBuild generates a different manifest file name for resource files.

#### Version introduced

3.0

#### Change description

Prior to .NET Core 3.0, if no `LogicalName`, `ManifestResourceName`, or `DependentUpon` metadata was specified for an `EmbeddedResource` item in the project file, MSBuild generated a manifest file name in the pattern `<RootNamespace>.<ResourceFilePathFromProjectRoot>.resources`. If `RootNamespace` is not defined in the project file, it defaults to the project name. For example, the generated manifest name for a resource file named *Form1.resx* in the root project directory was *MyProject.Form1.resources*.

Starting in .NET Core 3.0, if a resource file is colocated with a source file of the same name (for example, *Form1.resx* and *Form1.cs*), MSBuild uses type information from the source file to generate the manifest file name in the pattern `<Namespace>.<ClassName>.resources`. The namespace and class name are extracted from the first type in the colocated source file. For example, the generated manifest name for a resource file named *Form1.resx* that's colocated with a source file named *Form1.cs* is *MyNamespace.Form1.resources*. The key thing to note is that the first part of the file name is different to prior versions of .NET Core (*MyNamespace* instead of *MyProject*).

> **Note:**
> If you have `LogicalName`, `ManifestResourceName`, or `DependentUpon` metadata specified on an `EmbeddedResource` item in the project file, then this change does not affect that resource file.

This breaking change was introduced with the addition of the `EmbeddedResourceUseDependentUponConvention` property to .NET Core projects. By default, resource files aren't explicitly listed in a .NET Core project file, so they have no `DependentUpon` metadata to specify how to name the generated *.resources* file. When `EmbeddedResourceUseDependentUponConvention` is set to `true`, which is the default, MSBuild looks for a colocated source file and extracts a namespace and class name from that file. If you set `EmbeddedResourceUseDependentUponConvention` to `false`, MSBuild generates the manifest name according to the previous behavior, which combines `RootNamespace` and the relative file path.

#### Recommended action

In most cases, no action is required on the part of the developer, and your app should continue to work. However, if this change breaks your app, you can either:

- Change your code to expect the new manifest name.

- Opt out of the new naming convention by setting `EmbeddedResourceUseDependentUponConvention` to `false` in your project file.

  ```xml
  <PropertyGroup>
    <EmbeddedResourceUseDependentUponConvention>false</EmbeddedResourceUseDependentUponConvention>
  </PropertyGroup>
  ```

#### Category

MSBuild

#### Affected APIs

N/A


***

## Networking

- [WebClient.CancelAsync doesn't always cancel immediately](#webclientcancelasync-doesnt-always-cancel-immediately)

### .NET Core 2.0

### WebClient.CancelAsync doesn't always cancel immediately

Starting in .NET Core 2.0, calling [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync) doesn't cancel the request immediately if the response has started to fetch.

#### Change description

Previously, calling [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync) canceled the request immediately. Starting in .NET Core 2.0, calling [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync) cancels the request immediately only if the response hasn't started fetching. If the response has started to fetch, the request is cancelled only after a complete response is read.

This change was implemented because the [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) API is deprecated in favor of [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).

#### Version introduced

2.0

#### Recommended action

Use the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) class instead of [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), which is deprecated.

#### Category

Networking

#### Affected APIs

- [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync)

<!--

#### Affected APIs

- `M:System.Net.WebClient.CancelAsync`

-->


***

## Windows Forms

Windows Forms support was added to .NET Core in version 3.0. If you're migrating a Windows Forms app from .NET Framework to .NET Core, the breaking changes listed here might affect your app.

- [Removed controls](#removed-controls)
- [CellFormatting event not raised if tooltip is shown](#cellformatting-event-not-raised-if-tooltip-is-shown)
- [Control.DefaultFont changed to Segoe UI 9 pt](#default-control-font-changed-to-segoe-ui-9-pt)
- [Modernization of the FolderBrowserDialog](#modernization-of-the-folderbrowserdialog)
- [SerializableAttribute removed from some Windows Forms types](#serializableattribute-removed-from-some-windows-forms-types)
- [AllowUpdateChildControlIndexForTabControls compatibility switch not supported](#allowupdatechildcontrolindexfortabcontrols-compatibility-switch-not-supported)
- [DomainUpDown.UseLegacyScrolling compatibility switch not supported](#domainupdownuselegacyscrolling-compatibility-switch-not-supported)
- [DoNotLoadLatestRichEditControl compatibility switch not supported](#donotloadlatestricheditcontrol-compatibility-switch-not-supported)
- [DoNotSupportSelectAllShortcutInMultilineTextBox compatibility switch not supported](#donotsupportselectallshortcutinmultilinetextbox-compatibility-switch-not-supported)
- [DontSupportReentrantFilterMessage compatibility switch not supported](#dontsupportreentrantfiltermessage-compatibility-switch-not-supported)
- [EnableVisualStyleValidation compatibility switch not supported](#enablevisualstylevalidation-compatibility-switch-not-supported)
- [UseLegacyContextMenuStripSourceControlValue compatibility switch not supported](#uselegacycontextmenustripsourcecontrolvalue-compatibility-switch-not-supported)
- [UseLegacyImages compatibility switch not supported](#uselegacyimages-compatibility-switch-not-supported)
- [About and SplashScreen templates are broken for Visual Basic](#about-and-splashscreen-templates-are-broken)
- [Types in Microsoft.VisualBasic.ApplicationServices namespace not available](#types-in-microsoftvisualbasicapplicationservices-namespace-not-available)
- [Types in Microsoft.VisualBasic.Devices namespace not available](#types-in-microsoftvisualbasicdevices-namespace-not-available)
- [Types in Microsoft.VisualBasic.MyServices namespace not available](#types-in-microsoftvisualbasicmyservices-namespace-not-available)

### .NET Core 3.1

### Removed controls

Starting in .NET Core 3.1, some Windows Forms controls are no longer available.

#### Change description

Starting with .NET Core 3.1, various Windows Forms controls are no longer available. Replacement controls that have better design and support were introduced in .NET Framework 2.0. The deprecated controls were previously removed from designer toolboxes but were still available to be used.

The following types are no longer available:

- [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu)
- [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid)
- [System.Windows.Forms.DataGrid.HitTestType](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid.HitTestType)
- [System.Windows.Forms.DataGrid.HitTestInfo](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid.HitTestInfo)
- [System.Windows.Forms.DataGridBoolColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridBoolColumn)
- [System.Windows.Forms.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridCell)
- [System.Windows.Forms.DataGridColumnStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle)
- [System.Windows.Forms.DataGridColumnStyle.DataGridColumnHeaderAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle.DataGridColumnHeaderAccessibleObject)
- [System.Windows.Forms.DataGridColumnStyle.CompModSwitches](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle.CompModSwitches)
- [System.Windows.Forms.DataGridLineStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridLineStyle)
- [System.Windows.Forms.DataGridParentRowsLabelStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridParentRowsLabelStyle)
- [System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter)
- [System.Windows.Forms.DataGridTableStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTableStyle)
- [System.Windows.Forms.DataGridTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBox)
- [System.Windows.Forms.DataGridTextBoxColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBoxColumn)
- [System.Windows.Forms.GridColumnStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridColumnStylesCollection)
- [System.Windows.Forms.GridTablesFactory](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTablesFactory)
- [System.Windows.Forms.GridTableStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTableStylesCollection)
- [System.Windows.Forms.IDataGridEditingService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IDataGridEditingService)
- [System.Windows.Forms.Design.IMenuEditorService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Design.IMenuEditorService)
- [System.Windows.Forms.MainMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MainMenu)
- [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu)
- [System.Windows.Forms.Menu.MenuItemCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu.MenuItemCollection)
- [System.Windows.Forms.MenuItem](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MenuItem)
- [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar)
- [System.Windows.Forms.ToolBarAppearance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarAppearance)
- [System.Windows.Forms.ToolBarButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButton)
- [System.Windows.Forms.ToolBar.ToolBarButtonCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar.ToolBarButtonCollection)
- [System.Windows.Forms.ToolBarButtonClickEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonClickEventArgs)
- [System.Windows.Forms.ToolBarButtonStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonStyle)
- [System.Windows.Forms.ToolBarTextAlign](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarTextAlign)

#### Version introduced

3.1

#### Recommended action

Each removed control has a recommended replacement control. Refer to the following table:

| Removed control (API) | Recommended replacement | Associated APIs that are removed |
| --- | --- | --- |
| ContextMenu | ContextMenuStrip |  |
| DataGrid | DataGridView | DataGridCell, DataGridRow, DataGridTableCollection, DataGridColumnCollection, DataGridTableStyle, DataGridColumnStyle, DataGridLineStyle, DataGridParentRowsLabel, DataGridParentRowsLabelStyle, DataGridBoolColumn, DataGridTextBox, GridColumnStylesCollection, GridTableStylesCollection, HitTestType |
| MainMenu | MenuStrip |  |
| Menu | ToolStripDropDown, ToolStripDropDownMenu | MenuItemCollection |
| MenuItem | ToolStripMenuItem |  |
| ToolBar | ToolStrip | ToolBarAppearance |
| ToolBarButton | ToolStripButton | ToolBarButtonClickEventArgs, ToolBarButtonClickEventHandler, ToolBarButtonStyle, ToolBarTextAlign |

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu)
- [System.Windows.Forms.GridColumnStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridColumnStylesCollection)
- [System.Windows.Forms.GridTablesFactory](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTablesFactory)
- [System.Windows.Forms.GridTableStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTableStylesCollection)
- [System.Windows.Forms.IDataGridEditingService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IDataGridEditingService)
- [System.Windows.Forms.MainMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MainMenu)
- [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu)
- [System.Windows.Forms.Menu.MenuItemCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu.MenuItemCollection)
- [System.Windows.Forms.MenuItem](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MenuItem)
- [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar)
- [System.Windows.Forms.ToolBar.ToolBarButtonCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar.ToolBarButtonCollection)
- [System.Windows.Forms.ToolBarAppearance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarAppearance)
- [System.Windows.Forms.ToolBarButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButton)
- [System.Windows.Forms.ToolBarButtonClickEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonClickEventArgs)
- [System.Windows.Forms.ToolBarButtonStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonStyle)
- [System.Windows.Forms.ToolBarTextAlign](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarTextAlign)
- [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid)
- [System.Windows.Forms.DataGrid.HitTestType](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid.HitTestType)
- [System.Windows.Forms.DataGridBoolColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridBoolColumn)
- [System.Windows.Forms.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridCell)
- [System.Windows.Forms.DataGridColumnStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle)
- [System.Windows.Forms.DataGridLineStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridLineStyle)
- [System.Windows.Forms.DataGridParentRowsLabelStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridParentRowsLabelStyle)
- [System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter)
- [System.Windows.Forms.DataGridTableStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTableStyle)
- [System.Windows.Forms.DataGridTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBox)
- [System.Windows.Forms.DataGridTextBoxColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBoxColumn)
- [System.Windows.Forms.Design.IMenuEditorService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Design.IMenuEditorService)

<!-- 

#### Affected APIs

- `T:System.Windows.Forms.Menu`
- `T:System.Windows.Forms.Menu.MenuItemCollection`
- `T:System.Windows.Forms.MainMenu`
- `T:System.Windows.Forms.ContextMenu`
- `T:System.Windows.Forms.MenuItem`
- `T:System.Windows.Forms.ToolBar`
- `T:System.Windows.Forms.ToolBarAppearance`
- `T:System.Windows.Forms.ToolBarButton`
- `T:System.Windows.Forms.ToolBar.ToolBarButtonCollection`
- `T:System.Windows.Forms.ToolBarButtonClickEventArgs`
- `T:System.Windows.Forms.ToolBarButtonStyle`
- `T:System.Windows.Forms.ToolBarTextAlign`
- `T:System.Windows.Forms.DataGrid`
- `T:System.Windows.Forms.DataGridBoolColumn`
- `T:System.Windows.Forms.DataGridCell`
- `T:System.Windows.Forms.DataGridColumnStyle`
- `T:System.Windows.Forms.DataGridLineStyle`
- `T:System.Windows.Forms.DataGridParentRowsLabelStyle`
- `T:System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter`
- `T:System.Windows.Forms.DataGridTableStyle`
- `T:System.Windows.Forms.DataGridTextBox`
- `T:System.Windows.Forms.DataGridTextBoxColumn`
- `T:System.Windows.Forms.GridColumnStylesCollection`
- `T:System.Windows.Forms.GridTablesFactory`
- `T:System.Windows.Forms.GridTableStylesCollection`
- `T:System.Windows.Forms.IDataGridEditingService`
- `T:System.Windows.Forms.DataGrid.HitTestType`
- `T:System.Windows.Forms.Design.IMenuEditorService`

-->


***

### CellFormatting event not raised if tooltip is shown

A [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) now shows a cell's text and error tooltips when hovered by a mouse and when selected via the keyboard. If a tooltip is shown, the [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event is not raised.

#### Change description

Prior to .NET Core 3.1, a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) that had the [System.Windows.Forms.DataGridView.ShowCellToolTips%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.ShowCellToolTips%252A) property set to `true` showed a tooltip for a cell's text and errors when the cell was hovered by a mouse. Tooltips were not shown when a cell was selected via the keyboard (for example, by using the Tab key, shortcut keys, or arrow navigation). If the user edited a cell, and then, while the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) was still in edit mode, hovered over a cell that did not have the [System.Windows.Forms.DataGridViewCell.ToolTipText](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.ToolTipText) property set, a [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event was raised to format the cell's text for display in the cell.

To meet accessibility standards, starting in .NET Core 3.1, a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) that has the [System.Windows.Forms.DataGridView.ShowCellToolTips%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.ShowCellToolTips%252A) property set to `true` shows tooltips for a cell's text and errors not only when the cell is hovered, but also when it's selected via the keyboard. As a consequence of this change, the [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event is *not* raised when cells that don't have the [System.Windows.Forms.DataGridViewCell.ToolTipText](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.ToolTipText) property set are hovered while the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) is in edit mode. The event is not raised because the content of the hovered cell is shown as a tooltip instead of being displayed in the cell.

#### Version introduced

3.1

#### Recommended action

Refactor any code that depends on the [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event while the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) is in edit mode.

#### Category

Windows Forms

#### Affected APIs

None

<!-- 

#### Affected APIs

Not detectable via API analysis.

-->


***

### .NET Core 3.0

### Default control font changed to Segoe UI 9 pt

#### Change description

In .NET Framework, the [System.Windows.Forms.Control.DefaultFont](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.DefaultFont) property was set to `Microsoft Sans Serif 8.25 pt`. The following image shows a window that uses the default font.

Default control font in .NET Framework

Starting in .NET Core 3.0, the default font is set to `Segoe UI 9 pt` (the same font as [System.Drawing.SystemFonts.MessageBoxFont](https://learn.microsoft.com/search/?terms=System.Drawing.SystemFonts.MessageBoxFont)). As a result of this change, forms and controls are sized about 27% larger to account for the larger size of the new default font. For example:

Default control font in .NET Core

This change was made to align with [Windows user experience (UX) guidelines](https://learn.microsoft.com/windows/win32/uxguide/vis-fonts#fonts-and-colors).

#### Version introduced

3.0

#### Recommended action

Because of the change in the size of forms and controls, ensure that your application renders correctly.

To retain the original font for a single form, set its default font to `Microsoft Sans Serif 8.25 pt`. For example:

```csharp
public MyForm()
{
    InitializeComponent();
    Font = new Font(new FontFamily("Microsoft Sans Serif"), 8.25f);
}
```

Or, you can change the default font for an entire application in either of the following ways:

- By setting the `ApplicationDefaultFont` MSBuild property to "Microsoft Sans Serif, 8.25pt". This is the preferred technique because it allows Visual Studio to use the new settings in the designer.

  ```xml
  <PropertyGroup>
    <ApplicationDefaultFont>Microsoft Sans Serif, 8.25pt</ApplicationDefaultFont>
  </PropertyGroup>
  ```

- By calling [System.Windows.Forms.Application.SetDefaultFont(System.Drawing.Font)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.SetDefaultFont(System.Drawing.Font)).

  ```csharp
  class Program
  {
      [STAThread]
      static void Main()
      {
          Application.EnableVisualStyles();
          Application.SetCompatibleTextRenderingDefault(false);
          Application.SetHighDpiMode(HighDpiMode.SystemAware);
          Application.SetDefaultFont(new Font(new FontFamily("Microsoft Sans Serif"), 8.25f));
          Application.Run(new Form1());
      }
  }
  ```

#### Category

- Windows Forms

#### Affected APIs

None.

<!--

#### Affected APIs

- Not detectable via API analysis

-->


***

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


***

### SerializableAttribute removed from some Windows Forms types

The [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) has been removed from some Windows Forms classes that have no known binary serialization scenarios.

#### Change description

The following types are decorated with the [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) in .NET Framework, but the attribute has been removed in .NET Core:

- `System.InvariantComparer`
- [System.ComponentModel.Design.ExceptionCollection](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ExceptionCollection)
- [System.ComponentModel.Design.Serialization.CodeDomSerializerException](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.Serialization.CodeDomSerializerException)
- `System.ComponentModel.Design.Serialization.CodeDomComponentSerializationService.CodeDomSerializationStore`
- [System.Drawing.Design.ToolboxItem](https://learn.microsoft.com/search/?terms=System.Drawing.Design.ToolboxItem)
- `System.Resources.ResXNullRef`
- `System.Resources.ResXDataNode`
- `System.Resources.ResXFileRef`
- [System.Windows.Forms.Cursor](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Cursor)
- `System.Windows.Forms.NativeMethods.MSOCRINFOSTRUCT`
- `System.Windows.Forms.NativeMethods.MSG`

Historically, this serialization mechanism has had serious maintenance and security concerns. Maintaining `SerializableAttribute` on types means those types must be tested for version-to-version serialization changes and potentially framework-to-framework serialization changes. This makes it harder to evolve those types and can be costly to maintain. These types have no known binary serialization scenarios, which minimizes the impact of removing the attribute.

For more information, see [Binary serialization](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/core-changes/windowsforms/3.0/~/docs/standard/serialization/binary-serialization.md).

#### Version introduced

3.0

#### Recommended action

Update any code that may depend on these types being marked as serializable.

#### Category

Windows Forms

#### Affected APIs

- None

<!--

#### Affected APIs

- Not detectable via API analysis

-->


***

### AllowUpdateChildControlIndexForTabControls compatibility switch not supported

The `Switch.System.Windows.Forms.AllowUpdateChildControlIndexForTabControls` compatibility switch is supported in Windows Forms on .NET Framework 4.6 and later versions but is not supported on .NET Core or .NET 5.0 and later.

#### Change description

In .NET Framework 4.6 and later versions, selecting a tab reorders its control collection. The `Switch.System.Windows.Forms.AllowUpdateChildControlIndexForTabControls` compatibility switch allows an application to skip this reordering when this behavior is undesirable.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.AllowUpdateChildControlIndexForTabControls` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

<!-- 

#### Affected APIs

- Not detectable via API analysis

-->


***

### DomainUpDown.UseLegacyScrolling compatibility switch not supported

The `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` compatibility switch, which was introduced in .NET Framework 4.7.1, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.7.1, the `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` compatibility switch allowed developers to opt-out of independent [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton) and [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) actions. The switch restored the legacy behavior, in which the [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) is ignored if context text is present, and the developer is required to use [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton) action on the control before the [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) action. For more information, see [\<AppContextSwitchOverrides> element](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/core-changes/windowsforms/3.0/~/docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md).

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton)
- [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton)

<!-- 

#### Affected APIs

- `M:System.Windows.Forms.DomainUpDown.DownButton`
- `M:System.Windows.Forms.DomainUpDown.UpButton`

-->


***

### DoNotLoadLatestRichEditControl compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyImages` compatibility switch, which was introduced in .NET Framework 4.7.1, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

In .NET Framework 4.6.2 and previous versions, the [System.Windows.Forms.RichTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.RichTextBox) control instantiates the Win32 RichEdit control v3.0, and for applications that target .NET Framework 4.7.1, the  [System.Windows.Forms.RichTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.RichTextBox) control instantiates RichEdit v4.1 (in *msftedit.dll*). The `Switch.System.Windows.Forms.DoNotLoadLatestRichEditControl` compatibility switch was introduced to allow applications that target .NET Framework 4.7.1 and later versions to opt out of the new RichEdit v4.1 control and use the old RichEdit v3 control instead.

In .NET Core and .NET 5.0 and later versions, the `Switch.System.Windows.Forms.DoNotLoadLatestRichEditControl` switch is not supported. Only new versions of the [System.Windows.Forms.RichTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.RichTextBox) control are supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.RichTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.RichTextBox)

<!-- 

#### Affected APIs

-  `T:System.Windows.Forms.RichTextBox` 

-->


***

### DoNotSupportSelectAllShortcutInMultilineTextBox compatibility switch not supported

The `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` compatibility switch, which was introduced in .NET Framework 4.6.1, is not supported in Windows Forms on .NET Core and .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.6.1, selecting the <kbd>Ctrl</kbd> + <kbd>A</kbd> shortcut key in a [System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox) control selected all text. In .NET Framework 4.6 and previous versions, selecting the <kbd>Ctrl</kbd> + <kbd>A</kbd> shortcut key failed to select all text if the [Textbox.ShortcutsEnabled](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBoxBase.ShortcutsEnabled) and [System.Windows.Forms.TextBox.Multiline](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox.Multiline) properties were both set to `true`. The `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` compatibility switch was introduced in .NET Framework 4.6.1 to retain the original behavior. For more information see [System.Windows.Forms.TextBox.ProcessCmdKey%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox.ProcessCmdKey%252A).

In .NET Core and .NET 5.0 and later versions, the `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

<!-- 

#### Affected APIs

- Not detectable via API analysis

-->


***

### DontSupportReentrantFilterMessage compatibility switch not supported

The `Switch.System.Windows.Forms.DontSupportReentrantFilterMessage` compatibility switch, which was introduced in .NET Framework 4.6.1, is not supported in Windows Forms on .NET Core and .NET 5.0 and later.

#### Change description

Starting with the .NET Framework 4.6.1, the `Switch.System.Windows.Forms.DontSupportReentrantFilterMessage` compatibility switch addresses possible [System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException) exceptions when the [System.Windows.Forms.Application.FilterMessage%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.FilterMessage%252A) message is called with a custom [System.Windows.Forms.IMessageFilter.PreFilterMessage%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IMessageFilter.PreFilterMessage%252A) implementation. For more information, see [Mitigation: Custom IMessageFilter.PreFilterMessage Implementations](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/core-changes/windowsforms/3.0/~/docs/framework/migration-guide/mitigation-custom-imessagefilter-prefiltermessage-implementations.md).

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.DontSupportReentrantFilterMessage` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.Application.FilterMessage%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.FilterMessage%252A)

<!-- 

#### Affected APIs

- `M:System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message)`

-->


***

### EnableVisualStyleValidation compatibility switch not supported

The `Switch.System.Windows.Forms.EnableVisualStyleValidation` compatibility switch is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

In .NET Framework, the `Switch.System.Windows.Forms.EnableVisualStyleValidation` compatibility switch allowed an application to opt out of validation of visual styles supplied in a numeric form.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.EnableVisualStyleValidation` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

<!-- 

#### Affected APIs

- Not detectable via API analysis

-->


***

### UseLegacyContextMenuStripSourceControlValue compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` compatibility switch, which was introduced in .NET Framework 4.7.2, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.7.2, the `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` compatibility switch allows the developer to opt out of the new behavior of the [System.Windows.Forms.ContextMenuStrip.SourceControl](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenuStrip.SourceControl) property, which now returns a reference to the source control. The previous behavior of the property was to return `null`. For more information, see [\<AppContextSwitchOverrides> element](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/core-changes/windowsforms/3.0/~/docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md).

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.ContextMenuStrip.SourceControl](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenuStrip.SourceControl)

<!-- 

#### Affected APIs

- `P:System.Windows.Forms.ContextMenuStrip.SourceControl`

-->


***

### UseLegacyImages compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyImages` compatibility switch, which was introduced in .NET Framework 4.8, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.8, the `Switch.System.Windows.Forms.UseLegacyImages` compatibility switch addressed possible image scaling issues in ClickOnce scenarios in high DPI environments. When set to `true`, the switch allows the user to restore legacy image scaling on high DPI displays whose scale is set to greater than 100%. For more information, see [.NET Framework 4.8 Release Notes](https://github.com/microsoft/dotnet/blob/main/releases/net48/dotnet48-changes.md#clickonce) on GitHub.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.UseLegacyImages` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

<!-- 

#### Affected APIs

- Not detectable via API analysis

-->


***

﻿### About and SplashScreen templates are broken

The `About.vb` and `SplashScreen.vb` files generated by Visual Studio contain references to types in the `My` namespace that aren't available .NET Core 3.0 and 3.1.

#### Version introduced

3.0

#### Change description

.NET Core 3.0 and 3.1 don't contain full Visual Basic `My` support. The **About** and **SplashScreen** form templates in Visual Studio for Visual Basic Windows Forms apps reference properties in the `My.Application.Info` type that aren't available.

#### Recommended action

Visual Basic `My` support was improved in .NET 5, upgrade your project to .NET 5 or later.

-or-

Fix the compiler errors in the **About** and **SplashScreen** types in your app. Use the `System.Reflection.Assembly` class to get the information provided by the `My.Application.Info` type. A straight port of both forms is available here.

> **Tip:**
> This is sample code and unoptimized. The list of attributes should be cached to reduce form load time.

**About**

```vb
Imports System.Reflection

Public NotInheritable Class About

    Private Sub about_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' Set the title of the form.
        Dim applicationTitle As String = Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyTitleAttribute)()?.Title

        If String.IsNullOrEmpty(applicationTitle) Then
            applicationTitle = System.IO.Path.GetFileNameWithoutExtension(Assembly.GetExecutingAssembly().GetName().Name)
        End If

        Me.Text = String.Format("About {0}", applicationTitle)
        ' Initialize all of the text displayed on the About Box.
        ' TODO: Customize the application's assembly information in the "Application" pane of the project
        '    properties dialog (under the "Project" menu).
        Me.LabelProductName.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyProductAttribute)()?.Product, "")
        Me.LabelVersion.Text = String.Format("Version {0}", Assembly.GetExecutingAssembly().GetName().Version)
        Me.LabelCopyright.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyCopyrightAttribute)()?.Copyright, "")
        Me.LabelCompanyName.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyCompanyAttribute)()?.Company, "")
        Me.TextBoxDescription.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyDescriptionAttribute)()?.Description, "")
    End Sub

    Private Sub OKButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles OKButton.Click
        Me.Close()
    End Sub

End Class
```

**SplashScreen**

```vb
Imports System.Reflection

Public NotInheritable Class SplashScreen

    Private Sub SplashScreen1_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Set up the dialog text at runtime according to the application's assembly information.  

        'TODO: Customize the application's assembly information in the "Application" pane of the project
        '  properties dialog (under the "Project" menu).

        'Application title
        Dim appTitle As String = Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyTitleAttribute)()?.Title

        If String.IsNullOrEmpty(appTitle) Then
            appTitle = System.IO.Path.GetFileNameWithoutExtension(Assembly.GetExecutingAssembly().GetName().Name)
        End If

        ApplicationTitle.Text = appTitle

        Dim versionValue = Assembly.GetExecutingAssembly().GetName().Version

        'Format the version information using the text set into the Version control at design time as the
        '  formatting string.  This allows for effective localization if desired.
        '  Build and revision information could be included by using the following code and changing the
        '  Version control's designtime text to "Version {0}.{1:00}.{2}.{3}" or something similar.  See
        '  String.Format() in Help for more information.
        '
        '    Version.Text = System.String.Format(Version.Text, versionValue.Major, versionValue.Minor, versionValue.Build, versionValue.Revision)

        Version.Text = System.String.Format(Version.Text, versionValue.Major, versionValue.Minor)

        'Copyright info
        Copyright.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyCopyrightAttribute)()?.Copyright, "")
    End Sub

End Class
```

#### Category

Visual Basic
Windows Forms

#### Affected APIs

None


***

﻿### Types in Microsoft.VisualBasic.ApplicationServices namespace not available

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


***
﻿### Types in Microsoft.VisualBasic.Devices namespace not available

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


***

﻿### Types in Microsoft.VisualBasic.MyServices namespace not available

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


***

## See also

- [APIs that always throw exceptions on .NET Core](unsupported-apis.md)
- [.NET Framework technologies unavailable on .NET Core](../porting/net-framework-tech-unavailable.md)
