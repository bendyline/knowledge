### Change in behavior for Task.WaitAll methods with time-out arguments

#### Details

[System.Threading.Tasks.Task.WaitAll%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll%252A) behavior was made more consistent in .NET Framework 4.5.In the .NET Framework 4, these methods behaved inconsistently. When the time-out expired, if one or more tasks were completed or canceled before the method call, the method threw an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception. When the time-out expired, if no tasks were completed or canceled before the method call, but one or more tasks entered these states after the method call, the method returned false.<br/><br/>In the .NET Framework 4.5, these method overloads now return false if any tasks are still running when the time-out interval expired, and they throw an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception only if an input task was cancelled (regardless of whether it was before or after the method call) and no other tasks are still running.

#### Suggestion

If an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) was being caught as a means of detecting a task that was cancelled prior to the [System.Threading.Tasks.Task.WaitAll%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll%252A) call being invoked, that code should instead do the same detection via the  [System.Threading.Tasks.Task.IsCanceled%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.IsCanceled%252A) property (for example: `.Any(t => t.IsCanceled)`) since .NET Framework 4.6 will only throw in that case if all awaited tasks are completed prior to the timeout.

|  | Value |
| :--- | :--- |
| **Scope** | Minor |
| **Version** | 4.5 |
| **Type** | Runtime |

#### Affected APIs

- [System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task\[\],System.Int32)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task%5B%5D%2CSystem.Int32))
- [System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task\[\],System.Int32,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task%5B%5D%2CSystem.Int32%2CSystem.Threading.CancellationToken))
- [System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task\[\],System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task%5B%5D%2CSystem.TimeSpan))

<!--

#### Affected APIs

- `M:System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task[],System.Int32)`
- `M:System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task[],System.Int32,System.Threading.CancellationToken)`
- `M:System.Threading.Tasks.Task.WaitAll(System.Threading.Tasks.Task[],System.TimeSpan)`

-->
