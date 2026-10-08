# Source code: docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Buffers.cs

Complete source file; linked examples may select a region or line range.

```
using System.Buffers;

namespace ExampleCode;

internal partial class DemoCode
{
    private static readonly SearchValues<string> Commands =
        SearchValues.Create(
            ["start", "run", "go", "begin", "commence"],
            StringComparison.OrdinalIgnoreCase);

    void ProcessCommand(string command)
    {
        if (Commands.Contains(command))
        {
            // ...
        }
    }
}

```
