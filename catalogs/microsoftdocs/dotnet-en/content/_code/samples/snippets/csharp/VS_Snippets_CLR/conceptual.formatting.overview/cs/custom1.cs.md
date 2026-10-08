# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/custom1.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example8
{
   public static void Main()
   {
      // <Snippet9>
      string customFormat = "MMMM dd, yyyy (dddd)";
      DateTime date1 = new DateTime(2009, 8, 28);
      Console.WriteLine(date1.ToString(customFormat));
      // The example displays the following output if run on a system
      // whose language is English:
      //       August 28, 2009 (Friday)
      // </Snippet9>
   }
}

```
