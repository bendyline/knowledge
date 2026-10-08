# Source code: docs/core/extensions/snippets/fileglobbing/example/Example.MarkdownFiles.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.FileSystemGlobbing;

static partial class Example
{
    internal static void MatchAllMarkdownFiles()
    {
        Console.WriteLine("MatchAllMarkdownFiles:");

        // <MarkdownFiles>
        Matcher matcher = new();
        matcher.AddIncludePatterns(new[] { "**/*.md", "**/*.mtext" });

        foreach (string file in matcher.GetResultsInFullPath("parent"))
        {
            Console.WriteLine(file);
        }
        // </MarkdownFiles>

        Console.WriteLine();
    }
}

```
