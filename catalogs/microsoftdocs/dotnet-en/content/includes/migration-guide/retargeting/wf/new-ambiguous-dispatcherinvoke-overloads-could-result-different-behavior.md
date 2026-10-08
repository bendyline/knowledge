### New (ambiguous) Dispatcher.Invoke overloads could result in different behavior

#### Details

The .NET Framework 4.5 adds new overloads to [System.Windows.Threading.Dispatcher.Invoke%2A](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.Invoke%252A) that include a parameter of type [System.Action](https://learn.microsoft.com/search/?terms=System.Action). When existing code is recompiled, compilers may resolve calls to Dispatcher.Invoke methods that have a [System.Delegate](https://learn.microsoft.com/search/?terms=System.Delegate) parameter as calls to Dispatcher.Invoke methods with an [System.Action](https://learn.microsoft.com/search/?terms=System.Action) parameter. If a call to a Dispatcher.Invoke overload with a  [System.Delegate](https://learn.microsoft.com/search/?terms=System.Delegate) parameter is resolved as a call to a Dispatcher.Invoke overload with an [System.Action](https://learn.microsoft.com/search/?terms=System.Action) parameter, the following differences in behavior may occur:

- If an exception occurs, the [System.Windows.Threading.Dispatcher.UnhandledExceptionFilter](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.UnhandledExceptionFilter) and [System.Windows.Threading.Dispatcher.UnhandledException](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.UnhandledException) events are not raised. Instead, exceptions are handled by the [System.Threading.Tasks.TaskScheduler.UnobservedTaskException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.UnobservedTaskException) event.
- Calls to some members, such as [System.Windows.Threading.DispatcherOperation.Result](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherOperation.Result), block until the operation has completed.

#### Suggestion

To avoid ambiguity (and potential differences in exception handling or blocking behaviors), code calling Dispatcher.Invoke can pass an empty object[] as a second parameter to the Invoke call to be sure of resolving to the .NET Framework 4.0 method overload.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Threading.Dispatcher.Invoke(System.Delegate,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.Invoke(System.Delegate%2CSystem.Object%5B%5D))
- [System.Windows.Threading.Dispatcher.Invoke(System.Delegate,System.TimeSpan,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.Invoke(System.Delegate%2CSystem.TimeSpan%2CSystem.Object%5B%5D))
- [System.Windows.Threading.Dispatcher.Invoke(System.Delegate,System.TimeSpan,System.Windows.Threading.DispatcherPriority,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.Invoke(System.Delegate%2CSystem.TimeSpan%2CSystem.Windows.Threading.DispatcherPriority%2CSystem.Object%5B%5D))
- [System.Windows.Threading.Dispatcher.Invoke(System.Delegate,System.Windows.Threading.DispatcherPriority,System.Object\[\])](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher.Invoke(System.Delegate%2CSystem.Windows.Threading.DispatcherPriority%2CSystem.Object%5B%5D))
