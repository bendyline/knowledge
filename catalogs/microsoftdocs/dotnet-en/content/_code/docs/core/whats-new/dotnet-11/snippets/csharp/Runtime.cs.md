# Source code: docs/core/whats-new/dotnet-11/snippets/csharp/Runtime.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics;

public class RuntimeExamples
{
    public static async Task Run()
    {
        // <RuntimeAsyncStackTrace>
        // To enable runtime async, add the following to your .csproj:
        //   <Features>runtime-async=on</Features>

        await OuterAsync();

        static async Task OuterAsync()
        {
            await Task.CompletedTask;
            await MiddleAsync();
        }

        static async Task MiddleAsync()
        {
            await Task.CompletedTask;
            await InnerAsync();
        }

        static async Task InnerAsync()
        {
            await Task.CompletedTask;
            Console.WriteLine(new StackTrace(fNeedFileInfo: true));
        }
        // </RuntimeAsyncStackTrace>
    }
}

```
