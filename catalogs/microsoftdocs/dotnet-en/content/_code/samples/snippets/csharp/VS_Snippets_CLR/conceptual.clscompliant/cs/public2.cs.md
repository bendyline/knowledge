# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.clscompliant/cs/public2.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet2>
using System;

[assembly: CLSCompliant(true)]

public class Person
{
   private UInt16 personAge = 0;

   public Int16 Age => (Int16)personAge; 
}
// </Snippet2>

```
