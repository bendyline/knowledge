# Source code: samples/snippets/fsharp/fssequences/snippet63.fs

Complete source file; linked examples may select a region or line range.

```
let names = [| "A"; "man"; "landed"; "on"; "the"; "moon" |]
let sentence = names |> Seq.reduce (fun acc item -> acc + " " + item)
printfn "sentence = %s" sentence
```
