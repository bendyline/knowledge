# Source code: docs/core/extensions/snippets/configuration/console-json/TransientFaultHandlingOptions.cs

Complete source file; linked examples may select a region or line range.

```
namespace ConsoleJson.Example;

public sealed class TransientFaultHandlingOptions
{
    public bool Enabled { get; set; }
    public TimeSpan AutoRetryDelay { get; set; }
}

```
