# Source code: samples/snippets/fsharp/lang-ref-3/snippet108.fs

Complete source file; linked examples may select a region or line range.

```
//let emptyset = Set.empty
// Adding a type parameter and type annotation lets you write a generic value.
let emptyset<'a when 'a : comparison> : Set<'a> = Set.empty
```
