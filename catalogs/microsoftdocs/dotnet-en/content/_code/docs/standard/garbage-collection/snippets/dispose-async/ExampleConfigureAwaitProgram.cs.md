# Source code: docs/standard/garbage-collection/snippets/dispose-async/ExampleConfigureAwaitProgram.cs

Complete source file; linked examples may select a region or line range.

```
class ExampleConfigureAwaitProgram
{
    static async Task Main()
    {
        var exampleAsyncDisposable = new ExampleAsyncDisposable();
        await using (exampleAsyncDisposable.ConfigureAwait(false))
        {
            // Interact with the exampleAsyncDisposable instance.
        }

        Console.ReadLine();
    }
}

```
