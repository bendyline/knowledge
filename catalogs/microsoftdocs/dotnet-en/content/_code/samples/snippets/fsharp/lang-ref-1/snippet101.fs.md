# Source code: samples/snippets/fsharp/lang-ref-1/snippet101.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [ 1; 2; 3 ]
// Error: duplicate definition.
let list1 = []

let function1 () =
    let list1 = [ 1; 2; 3 ]
    let list1 = []
    list1

```
