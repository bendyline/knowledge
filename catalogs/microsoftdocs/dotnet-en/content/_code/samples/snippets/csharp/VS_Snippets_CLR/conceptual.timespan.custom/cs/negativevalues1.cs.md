# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/negativevalues1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet29>
using System;

public class Example
{
   public static void Main()
   {
      TimeSpan result = new DateTime(2010, 01, 01) - DateTime.Now;
      String fmt = (result < TimeSpan.Zero ?  "\\-" : "") + "dd\\.hh\\:mm";

      Console.WriteLine(result.ToString(fmt));
      Console.WriteLine($"Interval: {result.ToString(fmt)}");
   }
}
// The example displays output like the following:
//       -5582.12:21
//       Interval: -5582.12:21
// </Snippet29>

```
