# Source code: samples/snippets/csharp/VS_Snippets_CLR/regularexpressions.language.grouping/cs/noncapture1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet5>
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"(?:\b(?:\w+)\W*)+\.";
      string input = "This is a short sentence.";
      Match match = Regex.Match(input, pattern);
      Console.WriteLine($"Match: {match.Value}");
      for (int ctr = 1; ctr < match.Groups.Count; ctr++)
         Console.WriteLine($"   Group {ctr}: {match.Groups[ctr].Value}");
   }
}
// The example displays the following output:
//       Match: This is a short sentence.
// </Snippet5>

```
