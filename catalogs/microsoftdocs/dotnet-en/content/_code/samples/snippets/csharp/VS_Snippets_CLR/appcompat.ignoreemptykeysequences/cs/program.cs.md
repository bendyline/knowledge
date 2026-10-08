# Source code: samples/snippets/csharp/VS_Snippets_CLR/appcompat.ignoreemptykeysequences/cs/program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

class Example
{
   static void Main(string[] args)
   {
      // <Snippet1>
      // Ignore empty key sequences in apps that target .NET 4.6
      AppContext.SetSwitch("System.Xml.IgnoreEmptyKeySequences", true);
      // </Snippet1>

      // <Snippet2>
      // Do not ignore empty key sequences in apps that target .NET 4.5.1 and earlier
      AppContext.SetSwitch("System.Xml.IgnoreEmptyKeySequences", false);
      // </Snippet2>
   }
}

```
