# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.calendars/cs/formatstrings2.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example
{
   public static void Main()
   {
      // <Snippet9>
         DateTime dat = new DateTime(2012, 5, 1);
         Console.WriteLine($"{dat:MM-dd-yyyy g}");
      // The example displays the following output:
      //     05-01-2012 A.D.
      // </Snippet9>
   }
}

```
