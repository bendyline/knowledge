# Source code: docs/core/extensions/dependency-injection/snippets/basics/FarewellService.cs

Complete source file; linked examples may select a region or line range.

```
public class FarewellService(IConsole console)
{
    public string SayGoodbye(string name)
    {
        var farewell = $"Goodbye, {name}!";

        console.WriteLine(farewell);

        return farewell;
    }
}

```
