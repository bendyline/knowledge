# Source code: samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/EAP1.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;
using System.Net;

public class Example
{
    // <Snippet11>
    public static Task<string> DownloadStringAsync(Uri url)
    {
        var tcs = new TaskCompletionSource<string>();
        var wc = new WebClient();
        wc.DownloadStringCompleted += (s,e) =>
            {
                if (e.Error != null)
                   tcs.TrySetException(e.Error);
                else if (e.Cancelled)
                   tcs.TrySetCanceled();
                else
                   tcs.TrySetResult(e.Result);
            };
        wc.DownloadStringAsync(url);
        return tcs.Task;
   }
   // </Snippet11>
}

```
