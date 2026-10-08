# Source code: samples/snippets/csharp/VS_Snippets_CLR/unmanaged.debugging.mrv/cs/mrv1.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example
{
   public static void Main()
   {
      String s = "0001";
      ConvertNumericString(s);
   }

   // <Snippet1>
   private static int ConvertNumericString(string s)
   {
      int number;
      if (s.Trim().Length == 8)
         Int32.TryParse(s, System.Globalization.NumberStyles.HexNumber,
                        null, out number);
      else
         Int32.TryParse(s, out number);

      return number;
   }
   // </Snippet1>
}

```
