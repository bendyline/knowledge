# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/standard1.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example16
{
   public static void Main()
   {
      // <Snippet4>
      DayOfWeek thisDay = DayOfWeek.Monday;
      string[] formatStrings = {"G", "F", "D", "X"};

      foreach (string formatString in formatStrings)
         Console.WriteLine(thisDay.ToString(formatString));
      // The example displays the following output:
      //       Monday
      //       Monday
      //       1
      //       00000001
      // </Snippet4>
   }
}

```
