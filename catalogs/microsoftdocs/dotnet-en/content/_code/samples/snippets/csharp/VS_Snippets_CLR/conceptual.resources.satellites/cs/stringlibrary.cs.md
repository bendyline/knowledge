# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.satellites/cs/stringlibrary.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using System;
using System.Globalization;
using System.Reflection;
using System.Resources;
using System.Threading;

// <Snippet2>
[assembly:NeutralResourcesLanguageAttribute("en")]
// </Snippet2>

public class StringLibrary
{
   public string GetGreeting()
   {
      ResourceManager rm = new ResourceManager("Strings",
                           Assembly.GetAssembly(typeof(StringLibrary)));
      string greeting = rm.GetString("Greeting");
      return greeting;
   }
}
// </Snippet1>
```
