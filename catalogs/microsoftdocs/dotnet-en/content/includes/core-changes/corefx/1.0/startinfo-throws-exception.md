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
