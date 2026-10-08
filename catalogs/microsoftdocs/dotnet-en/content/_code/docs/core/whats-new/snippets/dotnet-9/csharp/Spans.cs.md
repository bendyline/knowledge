# Source code: docs/core/whats-new/snippets/dotnet-9/csharp/Spans.cs

Complete source file; linked examples may select a region or line range.

```
using System;

internal class Spans
{
    public static bool RunIt()
    {
        // <StartsWith>
        ReadOnlySpan<char> text = "some arbitrary text";
        return text.StartsWith('"') && text.EndsWith('"'); // false
        // </StartsWith>
    }
}

```
