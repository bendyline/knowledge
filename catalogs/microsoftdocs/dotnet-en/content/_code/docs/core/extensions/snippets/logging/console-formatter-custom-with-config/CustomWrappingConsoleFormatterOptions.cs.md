# Source code: docs/core/extensions/snippets/logging/console-formatter-custom-with-config/CustomWrappingConsoleFormatterOptions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging.Console;

namespace Console.ExampleFormatters.CustomWithConfig;

public sealed class CustomWrappingConsoleFormatterOptions : ConsoleFormatterOptions
{
    public string? CustomPrefix { get; set; }

    public string? CustomSuffix { get; set; }
}

```
