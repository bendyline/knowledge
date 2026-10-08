# Source code: docs/core/whats-new/snippets/dotnet-9/csharp/SearchValues.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Buffers;

internal class SearchValuesExamples
{
    // <SnippetSV>
    private static readonly SearchValues<string> s_animals =
        SearchValues.Create(["cat", "mouse", "dog", "dolphin"], StringComparison.OrdinalIgnoreCase);

    public static int IndexOfAnimal(string text) =>
        text.AsSpan().IndexOfAny(s_animals);
    // </SnippetSV>
}

```
