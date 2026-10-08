# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/System.Runtime.BypassNGenAttribute/cs/Optout1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet2>
using System;
using System.Runtime;

public class ExampleClass
{
   [BypassNGen]
   public void ToJITCompile()
   {
   }
}
// </Snippet2>

// <Snippet1>
namespace System.Runtime
{
   [AttributeUsage(AttributeTargets.Method |
                   AttributeTargets.Constructor |
                   AttributeTargets.Property)]
   public class BypassNGenAttribute : Attribute
   {
   }
}
// </Snippet1>

```
