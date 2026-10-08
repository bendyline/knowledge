# Source code: samples/snippets/csharp/VS_Snippets_CLR/regularexpressions.language.backreferences/cs/backreference7.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      Console.WriteLine(Regex.IsMatch("aa", @"(?<2>\w)\k<1>"));
      // Throws an ArgumentException.
   }
}

```
