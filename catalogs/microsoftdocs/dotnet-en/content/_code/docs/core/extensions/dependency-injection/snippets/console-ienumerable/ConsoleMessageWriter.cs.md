# Source code: docs/core/extensions/dependency-injection/snippets/console-ienumerable/ConsoleMessageWriter.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleDI.IEnumerableExample;

public sealed class ConsoleMessageWriter : IMessageWriter
{
    public void Write(string message) =>
        Console.WriteLine(
            $"ConsoleMessageWriter.Write(message: \"{message}\")");
}

```
