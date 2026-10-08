# Source code: uwp/dotnet-native/code/compat2.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class Example
{
   public static void Main()
   {
   }
}

// <Snippet9>
class A<T> {}

class B<T> : A<B<A<T>>>
{}
// </Snippet9>

```
