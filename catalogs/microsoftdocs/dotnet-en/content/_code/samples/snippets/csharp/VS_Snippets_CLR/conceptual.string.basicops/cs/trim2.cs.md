# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/trim2.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet22>
using System;

public class Example
{
   public static void Main()
   {
      String header = "* A Short String. *";
      Console.WriteLine(header);
      Console.WriteLine(header.Trim( new Char[] { ' ', '*', '.' } ));
   }
}
// The example displays the following output:
//       * A Short String. *
//       A Short String
// </Snippet22>

```
