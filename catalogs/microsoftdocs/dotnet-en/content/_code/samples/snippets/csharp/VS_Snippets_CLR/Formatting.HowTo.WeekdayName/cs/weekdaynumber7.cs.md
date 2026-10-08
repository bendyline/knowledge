# Source code: samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/weekdaynumber7.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet7>
using System;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine((int) dateValue.DayOfWeek);
   }
}
// The example displays the following output:
//       3
// </Snippet7>

```
