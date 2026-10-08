# Source code: samples/snippets/fsharp/fssequences/snippet203.fs

Complete source file; linked examples may select a region or line range.

```
let secondItem = seq { "foo"; "bar"; "baz" } |> Seq.item 1
printfn "%s" secondItem
```
