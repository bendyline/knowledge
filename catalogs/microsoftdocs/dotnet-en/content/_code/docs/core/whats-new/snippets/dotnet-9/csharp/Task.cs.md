# Source code: docs/core/whats-new/snippets/dotnet-9/csharp/Task.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Net.Http;
using System.Threading.Tasks;

internal class TaskExamples
{
    public static async void RunIt()
    {
        // <SnippetTaskWhenEach>
        using HttpClient http = new();

        Task<string> dotnet = http.GetStringAsync("http://dot.net");
        Task<string> bing = http.GetStringAsync("http://www.bing.com");
        Task<string> ms = http.GetStringAsync("http://microsoft.com");

        await foreach (Task<string> t in Task.WhenEach(bing, dotnet, ms))
        {
            Console.WriteLine(t.Result);
        }
        // </SnippetTaskWhenEach>
    }
}

```
