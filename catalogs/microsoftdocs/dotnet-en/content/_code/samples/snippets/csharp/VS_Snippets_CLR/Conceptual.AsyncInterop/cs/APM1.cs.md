# Source code: samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/APM1.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;

public static class Example
{
    // <Snippet6>
    public static IAsyncResult AsApm<T>(this Task<T> task,
                                        AsyncCallback callback,
                                        object state)
    {
        if (task == null)
            throw new ArgumentNullException("task");

        var tcs = new TaskCompletionSource<T>(state);
        task.ContinueWith(t =>
                          {
                             if (t.IsFaulted)
                                tcs.TrySetException(t.Exception.InnerExceptions);
                             else if (t.IsCanceled)
                                tcs.TrySetCanceled();
                             else
                                tcs.TrySetResult(t.Result);

                             if (callback != null)
                                callback(tcs.Task);
                          }, TaskScheduler.Default);
        return tcs.Task;
    }
    // </Snippet6>
}

```
