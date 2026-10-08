# Source code: samples/snippets/csharp/VS_Snippets_CLR/formatting.numeric.custom/cs/SpaceOrDigit1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet12>
using System;

public class SpaceOrDigit
{
   public static void Main()
   {
      Double value = .324;
      Console.WriteLine("The value is: '{0,5:#.###}'", value);
   }
}
// The example displays the following output if the current culture
// is en-US:
//      The value is: ' .324'
// </Snippet12>

```
