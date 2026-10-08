# Source code: samples/snippets/csharp/VS_Snippets_CLR/cocontrasimpleaction/cs/example.cs

Complete source file; linked examples may select a region or line range.

```
using System;

class Base {}
class Derived : Base {}

class Example
{
    static void Main()
    {
        //<Snippet1>
        Action<Base> b = (target) => { Console.WriteLine(target.GetType().Name); };
        Action<Derived> d = b;
        d(new Derived());
        //</Snippet1>
    }
}

```
