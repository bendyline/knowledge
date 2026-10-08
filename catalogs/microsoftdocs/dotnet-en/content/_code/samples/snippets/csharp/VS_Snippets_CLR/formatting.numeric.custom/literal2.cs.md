# Source code: samples/snippets/csharp/VS_Snippets_CLR/formatting.numeric.custom/literal2.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example
{
   public static void Main()
   {
      // <Snippet1>
      double n = 123.8;
      Console.WriteLine($"{n:#,##0.0K}");
      // The example displays the following output:
      //      123.8K
      // </Snippet1>
   }
}

```
