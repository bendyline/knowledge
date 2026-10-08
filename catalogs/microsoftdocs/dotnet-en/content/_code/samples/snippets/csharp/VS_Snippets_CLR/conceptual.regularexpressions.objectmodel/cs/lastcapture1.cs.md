# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/lastcapture1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet12>
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string pattern = @"\b((\w+)\s?)+\.";
      string input = "This is a sentence. This is another sentence.";
      Match match = Regex.Match(input, pattern);
      if (match.Success)
      {
         Console.WriteLine("Match: " + match.Value);
         Console.WriteLine("Group 2: " + match.Groups[2].Value);
      }
   }
}
// The example displays the following output:
//       Match: This is a sentence.
//       Group 2: sentence
// </Snippet12>

```
