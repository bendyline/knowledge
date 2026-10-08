# Source code: samples/snippets/csharp/VS_Snippets_CLR/formatting.numeric.custom/cs/example1.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example
{
   public static void Main()
   {
      // <Snippet10>
      double number1 = 1234567890;
      string value1 = number1.ToString("(###) ###-####");
      Console.WriteLine(value1);

      int number2 = 42;
      string value2 = number2.ToString("My Number = #");
      Console.WriteLine(value2);
      // The example displays the following output:
      //       (123) 456-7890
      //       My Number = 42
      // </Snippet10>
   }
}

```
