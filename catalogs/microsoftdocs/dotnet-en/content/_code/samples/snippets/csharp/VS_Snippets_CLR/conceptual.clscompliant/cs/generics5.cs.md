# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.clscompliant/cs/generics5.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet34>
using System;

[assembly:CLSCompliant(true)]

[CLSCompliant(false)] public class BaseClass
{}

public class BaseCollection<T> where T : BaseClass
{}
// Attempting to compile the example displays the following output:
//    warning CS3024: Constraint type 'BaseClass' is not CLS-compliant
// </Snippet34>

public class Example
{
   public static void Main()
   {
   }
}

```
