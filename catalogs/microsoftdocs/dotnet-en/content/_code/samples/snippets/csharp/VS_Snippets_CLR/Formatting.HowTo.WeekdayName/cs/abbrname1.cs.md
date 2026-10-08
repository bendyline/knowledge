# Source code: samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/abbrname1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine(dateValue.ToString("ddd"));
   }
}
// The example displays the following output:
 //       Wed
// </Snippet1>

```
