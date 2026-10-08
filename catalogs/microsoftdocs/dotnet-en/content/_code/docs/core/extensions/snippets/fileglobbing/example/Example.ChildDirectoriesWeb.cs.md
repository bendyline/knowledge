# Source code: docs/core/extensions/snippets/fileglobbing/example/Example.ChildDirectoriesWeb.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.FileSystemGlobbing;

static partial class Example
{
    internal static void ChildDirectoriesWeb()
    {
        Console.WriteLine("ChildDirectoriesWeb:");

        // <ChildDirectoriesWeb>
        Matcher matcher = new();
        matcher.AddInclude("**/*child/**/*");
        matcher.AddExcludePatterns(
            new[]
            {
                "**/*.md", "**/*.text", "**/*.mtext"
            });

        foreach (string file in matcher.GetResultsInFullPath("parent"))
        {
            Console.WriteLine(file);
        }
        // </ChildDirectoriesWeb>

        Console.WriteLine();
    }
}

```
