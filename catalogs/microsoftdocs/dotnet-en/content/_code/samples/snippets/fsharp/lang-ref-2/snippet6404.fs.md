# Source code: samples/snippets/fsharp/lang-ref-2/snippet6404.fs

Complete source file; linked examples may select a region or line range.

```
namespace Outer

    // Full name: Outer.MyClass
    type MyClass() =
       member this.X(x) = x + 1

// Fully qualify any nested namespaces.
namespace Outer.Inner

    // Full name: Outer.Inner.MyClass
    type MyClass() =
       member this.Prop1 = "X"
```
