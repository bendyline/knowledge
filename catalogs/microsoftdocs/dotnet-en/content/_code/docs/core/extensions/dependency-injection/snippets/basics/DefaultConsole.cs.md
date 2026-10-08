# Source code: docs/core/extensions/dependency-injection/snippets/basics/DefaultConsole.cs

Complete source file; linked examples may select a region or line range.

```
internal sealed class DefaultConsole : IConsole
{
    public bool IsEnabled { get; set; } = true;

    void IConsole.WriteLine(string message)
    {
        if (IsEnabled is false)
        {
            return;
        }

        Console.WriteLine(message);
    }
}
```
