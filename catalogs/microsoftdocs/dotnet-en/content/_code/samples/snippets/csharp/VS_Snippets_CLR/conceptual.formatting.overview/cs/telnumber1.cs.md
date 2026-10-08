# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/telnumber1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet21>
using System;

public class Example17
{
   public static void Main()
   {
      long number = 8009999999;
      string fmt = "000-000-0000";
      Console.WriteLine(number.ToString(fmt));
   }
}
// The example displays the following output:
//        800-999-9999
// </Snippet21>

```
