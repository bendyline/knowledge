# Source code: samples/snippets/csharp/VS_Snippets_CLR/cocontrasimpleienum/cs/example.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;

class Base {}
class Derived : Base {}

class C
{
    public static void Main()
    {
        //<Snippet1>
        IEnumerable<Derived> d = new List<Derived>();
        IEnumerable<Base> b = d;
        //</Snippet1>
    }
}

```
