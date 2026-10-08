# Source code: uwp/dotnet-native/code/compat1.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet8>
using System;

struct N<T> {}
struct X { N<X> x; }

public class Example
{
   public static void Main()
   {
      N<int> n = new N<int>();
      X x = new X();
   }
}
// </Snippet8>

```
