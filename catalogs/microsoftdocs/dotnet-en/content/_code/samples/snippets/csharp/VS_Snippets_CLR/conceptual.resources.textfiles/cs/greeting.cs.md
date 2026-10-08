# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.textfiles/cs/greeting.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Reflection;
using System.Resources;

public class Example
{
   public static void Main()
   {
      ResourceManager rm = new ResourceManager("GreetingResources",
                               typeof(Example).Assembly);
      Console.Write(rm.GetString("prompt"));
      string name = Console.ReadLine();
      Console.WriteLine(rm.GetString("greeting"), name);
   }
}
// The example displays output like the following:
//       Enter your name: Wilberforce
//       Hello, Wilberforce!
// </Snippet1>

```
