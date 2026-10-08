# Source code: docs/csharp/asynchronous-programming/snippets/async-return-types/Program.cs

Complete source file; linked examples may select a region or line range.

```
namespace AsyncExamples
{
    public static class Program
    {
        static async Task Main()
        {
            await FirstExample.ShowTodaysInfoAsync();
            await SecondExample.ShowTodaysInfoAsync();
            await ExampleTask.DisplayCurrentInfoAsync();
            await AwaitTaskExample.DisplayCurrentInfoAsync();
            await AsyncVoidExample.MultipleEventHandlersAsync();
            await AsyncStreamExample.ReadWordsAsync();
        }
    }
}

```
