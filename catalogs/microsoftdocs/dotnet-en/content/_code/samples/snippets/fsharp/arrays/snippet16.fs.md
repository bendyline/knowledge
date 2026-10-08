# Source code: samples/snippets/fsharp/arrays/snippet16.fs

Complete source file; linked examples may select a region or line range.

```
Array.concat [ [|0..3|] ; [|4|] ]
//output [|0; 1; 2; 3; 4|]

Array.concat [| [|0..3|] ; [|4|] |]
//output [|0; 1; 2; 3; 4|]

```
