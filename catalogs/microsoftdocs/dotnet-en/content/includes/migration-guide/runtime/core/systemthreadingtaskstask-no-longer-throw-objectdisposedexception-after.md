### System.Threading.Tasks.Task no longer throw ObjectDisposedException after object is disposed

#### Details

Except for [System.Threading.Tasks.Task.System%23IAsyncResult%23AsyncWaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.System%2523IAsyncResult%2523AsyncWaitHandle), [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) methods no longer throw an [System.ObjectDisposedException](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException) exception after the object is disposed.This change supports the use of cached tasks. For example, a method can return a cached task to represent an already completed operation instead of allocating a new task. This was impossible in previous .NET Framework versions, because any consumer of the task could dispose of it, which rendered it unusable.

#### Suggestion

Be aware that Task methods may no longer throw [System.ObjectDisposedException](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException) in cases when the object is disposed. If an app was depending on this exception to know that a task was disposed, it should be updated to explicitly check the task's status using [System.Threading.Tasks.Task.Status](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Status).

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
