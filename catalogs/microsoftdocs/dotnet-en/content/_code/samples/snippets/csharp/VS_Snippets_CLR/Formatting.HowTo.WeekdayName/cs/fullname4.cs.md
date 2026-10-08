# Source code: samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/fullname4.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet4>
using System;

public class Example
{
   public static void Main()
   {
      DateTime dateValue = new DateTime(2008, 6, 11);
      Console.WriteLine(dateValue.ToString("dddd"));
   }
}
// The example displays the following output:
//       Wednesday
// </Snippet4>

```
