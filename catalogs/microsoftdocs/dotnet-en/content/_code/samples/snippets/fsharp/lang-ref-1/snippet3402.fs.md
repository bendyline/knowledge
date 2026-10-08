# Source code: samples/snippets/fsharp/lang-ref-1/snippet3402.fs

Complete source file; linked examples may select a region or line range.

```
static member SomeStaticMethod(a, b, c) =
   (a + b + c)

static member SomeOtherStaticMethod(a, b, c) =
   SomeType.SomeStaticMethod(a, b, c) * 100
```
