# Source code: samples/snippets/csharp/VS_Snippets_CLR/HowToGeneric/CS/source.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet21>
using System;

// <snippet22>
class B<T, U> {}
class D<V, W> : B<int, V> {}
// </snippet22>

class GenTypes
{
    public static void Main()
    {
    }
}
// </snippet21>

```
