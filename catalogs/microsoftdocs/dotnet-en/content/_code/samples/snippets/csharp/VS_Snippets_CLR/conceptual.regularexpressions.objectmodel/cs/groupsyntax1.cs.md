# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.regularexpressions.objectmodel/cs/groupsyntax1.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      int ctr = 1;
      Match match = Regex.Match("aaabbbaaacccaaaddd", "(aaa)");
      if (match.Success)
      {
         // <Snippet13>
         Group group = match.Groups[ctr];
         // </Snippet13>
      }
   }
}

```
