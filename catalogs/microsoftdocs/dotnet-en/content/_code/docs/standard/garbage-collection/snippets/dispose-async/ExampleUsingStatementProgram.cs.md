# Source code: docs/standard/garbage-collection/snippets/dispose-async/ExampleUsingStatementProgram.cs

Complete source file; linked examples may select a region or line range.

```
class ExampleUsingStatementProgram
{
    static async Task Main()
    {
        await using (var exampleAsyncDisposable = new ExampleAsyncDisposable())
        {
            // Interact with the exampleAsyncDisposable instance.
        }

        Console.ReadLine();
    }
}

```
