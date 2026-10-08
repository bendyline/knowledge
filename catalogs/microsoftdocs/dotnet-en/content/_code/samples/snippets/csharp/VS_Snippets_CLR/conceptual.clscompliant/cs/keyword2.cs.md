# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.clscompliant/cs/keyword2.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet23>
using System;

public class Example
{
   public static void Main()
   {
      @case c = new @case("John");
      Console.WriteLine(c.ClientName);
   }
}
// </Snippet23>

public class @case
{
   private Guid _id;
   private string name;

   public @case(string name)
   {
      _id = Guid.NewGuid();
      this.name = name;
   }

   public String ClientName
   { get { return name; } }
}
```
