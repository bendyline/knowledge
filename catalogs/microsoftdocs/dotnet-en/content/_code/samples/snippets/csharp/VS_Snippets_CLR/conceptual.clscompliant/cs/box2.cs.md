# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.clscompliant/cs/box2.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet26>
using System;

[assembly:CLSCompliant(true)]

public unsafe class TestClass
{
   private int* val;

   public TestClass(int number)
   {
      val = (int*) number;
   }

   public int* Value {
      get { return val; }
   }
}
// The compiler generates the following output when compiling this example:
//        warning CS3003: Type of 'TestClass.Value' is not CLS-compliant
// </Snippet26>

public class Example
{
   public static void Main()
   {
   }
}

```
