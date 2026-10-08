### WPF DispatcherSynchronizationContext.CreateCopy now returns a new copy instead of the current instance

#### Details

In the .NET Framework 4, [System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy) returned a reference to the current instance, primarily as a performance optimization. In the .NET Framework 4.5, it returns a new instance which makes it possible for the first time to conclude that equal references indicate the executing thread is in the correct synchronization context.  It is unlikely that code that checks the identity of these references will be affected, but because of the change, code that calls [System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy) should be tested as part of migration to the .NET Framework 4.5 or newer.

#### Suggestion

Be aware that [System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy) will now return a new [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) object. Previously, code that used equivalence of references generated this way was not actually checking whether it was in the proper context, but does when built against .NET Framework 4.5 or later.  While unlikely to cause issues, exercising the affected code paths should be enough to determine if this poses any problem.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy)

<!--

#### Affected APIs

- `M:System.Windows.Threading.DispatcherSynchronizationContext.CreateCopy`

-->
