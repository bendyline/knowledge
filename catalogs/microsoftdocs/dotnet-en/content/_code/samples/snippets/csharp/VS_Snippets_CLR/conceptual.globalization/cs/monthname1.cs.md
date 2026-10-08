# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/monthname1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet19>
using System;

public class Example12
{
   public static void Main12()
   {
      DateTime midYear = new DateTime(2013, 7, 1);
      Console.WriteLine($"{midYear:d} is a {GetDayName(midYear)}.");
   }

   private static string GetDayName(DateTime date)
   {
      return date.DayOfWeek.ToString("G");
   }
}

// The example displays the following output:
//        7/1/2013 is a Monday.
// </Snippet19>

```
