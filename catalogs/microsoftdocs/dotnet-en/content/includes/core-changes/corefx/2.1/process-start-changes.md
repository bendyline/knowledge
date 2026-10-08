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
