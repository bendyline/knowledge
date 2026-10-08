# Source code: docs/core/extensions/snippets/configuration/console-json/ScopedService.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

public sealed class ScopedService(IOptionsSnapshot<TransientFaultHandlingOptions> options)
{
    private readonly TransientFaultHandlingOptions _options = options.Value;

    public void DisplayValues()
    {
        Console.WriteLine($"TransientFaultHandlingOptions.Enabled={_options.Enabled}");
        Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={_options.AutoRetryDelay}");
    }
}

```
