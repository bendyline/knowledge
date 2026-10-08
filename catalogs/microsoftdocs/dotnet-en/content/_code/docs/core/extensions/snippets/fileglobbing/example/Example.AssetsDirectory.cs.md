# Source code: docs/core/extensions/snippets/fileglobbing/example/Example.AssetsDirectory.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.FileSystemGlobbing;

static partial class Example
{
    internal static void AssetsDirectory()
    {
        Console.WriteLine("AssetsDirectory:");

        // <AssetsDirectory>
        Matcher matcher = new();
        matcher.AddInclude("**/assets/**/*");

        foreach (string file in matcher.GetResultsInFullPath("parent"))
        {
            Console.WriteLine(file);
        }
        // </AssetsDirectory>

        Console.WriteLine();
    }
}

```
