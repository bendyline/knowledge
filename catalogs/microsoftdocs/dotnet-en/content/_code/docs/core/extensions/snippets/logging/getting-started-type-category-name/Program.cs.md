# Source code: docs/core/extensions/snippets/logging/getting-started-type-category-name/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

internal class Program
{
    static void Main(string[] args)
    {
        using ILoggerFactory factory = LoggerFactory.Create(builder => builder.AddConsole());
        ILogger logger = factory.CreateLogger<Program>();
        logger.LogInformation("Hello World! Logging is {Description}.", "fun");
    }
}

```
