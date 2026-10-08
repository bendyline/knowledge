# Source code: docs/core/extensions/dependency-injection/snippets/basics/DefaultGreetingService.cs

Complete source file; linked examples may select a region or line range.

```
internal sealed class DefaultGreetingService(
    IConsole console) : IGreetingService
{
    public string Greet(string name)
    {
        var greeting = $"Hello, {name}!";

        console.WriteLine(greeting);

        return greeting;
    }
}

```
