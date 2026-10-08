# Source code: samples/snippets/fsharp/lang-ref-1/snippet3205.fs

Complete source file; linked examples may select a region or line range.

```
// To apply a type annotation to a property that does not have an explicit
// get or set, apply the type annotation directly to the property.
member this.MyProperty1 : int = myInternalValue
// If there is a get or set, apply the type annotation to the get or set method.
member this.MyProperty2 with get() : int = myInternalValue
```
