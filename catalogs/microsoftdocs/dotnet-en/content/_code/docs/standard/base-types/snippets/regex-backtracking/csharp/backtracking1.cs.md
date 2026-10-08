# Source code: docs/standard/base-types/snippets/regex-backtracking/csharp/backtracking1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Text.RegularExpressions;

public class Example1
{
    public static void Run()
    {
        string input = "needing a reed";
        string pattern = @"e{2}\w\b";
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine($"{match.Value} found at position {match.Index}");
    }
}
// The example displays the following output:
//       eed found at position 11
// </Snippet1>

```
