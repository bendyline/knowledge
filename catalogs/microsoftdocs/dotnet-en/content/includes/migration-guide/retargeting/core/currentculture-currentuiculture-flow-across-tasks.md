### CurrentCulture and CurrentUICulture flow across tasks

#### Details

Beginning in the .NET Framework 4.6, [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) and [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) are stored in the thread's [System.Threading.ExecutionContext](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext), which flows across asynchronous operations.This means that changes to [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) or [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) will be reflected in tasks which are later run asynchronously. This is different from the behavior of previous .NET Framework versions (which would reset [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) and [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) in all asynchronous tasks).

#### Suggestion

Apps affected by this change may work around it by explicitly setting the desired [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) or [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture) as the first operation in an async Task. Alternatively, the old behavior (of not flowing [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture)/[System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture)) may be opted into by setting the following compatibility switch:

```csharp
AppContext.SetSwitch("Switch.System.Globalization.NoAsyncCurrentCulture", true);
```

This issue has been fixed by WPF in .NET Framework 4.6.2. It has also been fixed in .NET Frameworks 4.6, 4.6.1 through [KB 3139549](https://support.microsoft.com/kb/3139549). Applications targeting .NET Framework 4.6 or later will automatically get the right behavior in WPF applications - [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture)/[System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture)) would be preserved across Dispatcher operations.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture)
- [System.Threading.Thread.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentCulture)
- [System.Globalization.CultureInfo.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentUICulture)
- [System.Threading.Thread.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentUICulture)
