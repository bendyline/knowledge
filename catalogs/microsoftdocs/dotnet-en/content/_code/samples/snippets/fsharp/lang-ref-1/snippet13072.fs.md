# Source code: samples/snippets/fsharp/lang-ref-1/snippet13072.fs

Complete source file; linked examples may select a region or line range.

```
let sum list =
    let rec loop list acc =
        match list with
        | head :: tail -> loop tail (acc + head)
        | [] -> acc

    loop list 0

```
