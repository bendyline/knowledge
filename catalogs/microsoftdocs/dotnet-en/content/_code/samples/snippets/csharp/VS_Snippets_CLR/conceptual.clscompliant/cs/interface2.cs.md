# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.clscompliant/cs/interface2.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet6>
using System;

[assembly:CLSCompliant(true)]

public interface INumber
{
   int Length();
   [CLSCompliant(false)] ulong GetUnsigned();
}
// Attempting to compile the example displays output like the following:
//    Interface2.cs(8,32): warning CS3010: 'INumber.GetUnsigned()': CLS-compliant interfaces
//            must have only CLS-compliant members
// </Snippet6>

public class Example
{
   public static void Main()
   {
   }
}

```
