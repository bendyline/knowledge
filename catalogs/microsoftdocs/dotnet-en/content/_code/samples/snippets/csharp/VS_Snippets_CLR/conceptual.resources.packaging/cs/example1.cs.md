# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.packaging/cs/example1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Reflection;
using System.Resources;

[assembly:NeutralResourcesLanguage("fr", UltimateResourceFallbackLocation.Satellite)]

public class Example
{
   public static void Main()
   {
      ResourceManager rm = new ResourceManager("resources",
                                               typeof(Example).Assembly);
      string greeting = rm.GetString("Greeting");
      Console.WriteLine(greeting);
   }
}
// </Snippet1>

```
