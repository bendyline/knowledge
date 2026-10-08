# Source code: samples/snippets/visualbasic/programming-guide/language-features/procedures/ref-returns1.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class NumericValue
{
   private int value = 0;

   public NumericValue(int value)
   {
      this.value = value;
   }

   public ref int IncrementValue()
   {
      value++;
      return ref value;
   }

   public int GetValue()
   {
      return value;
   }
}

```
