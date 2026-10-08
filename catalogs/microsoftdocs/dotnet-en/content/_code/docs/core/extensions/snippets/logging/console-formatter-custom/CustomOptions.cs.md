# Source code: docs/core/extensions/snippets/logging/console-formatter-custom/CustomOptions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging.Console;

namespace Console.ExampleFormatters.Custom;

public sealed class CustomOptions : ConsoleFormatterOptions
{
    public string? CustomPrefix { get; set; }
}

```
