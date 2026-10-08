# Source code: samples/snippets/fsharp/lang-ref-1/snippet3206.fs

Complete source file; linked examples may select a region or line range.

```
// Assume that the constructor argument sets the initial value of the
// internal backing store.
let mutable myObject = new MyType(10)
myObject.MyProperty <- 20
printfn "%d" (myObject.MyProperty)
```
