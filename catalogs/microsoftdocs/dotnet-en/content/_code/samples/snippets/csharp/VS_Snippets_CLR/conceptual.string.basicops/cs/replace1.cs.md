# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/replace1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet23>
using System;

public class Example
{
   public static void Main()
   {
      String phrase = "a cold, dark night";
      Console.WriteLine($"Before: {phrase}");
      phrase = phrase.Replace(",", "");
      Console.WriteLine($"After: {phrase}");
   }
}
// The example displays the following output:
//       Before: a cold, dark night
//       After: a cold dark night
// </Snippet23>
```
