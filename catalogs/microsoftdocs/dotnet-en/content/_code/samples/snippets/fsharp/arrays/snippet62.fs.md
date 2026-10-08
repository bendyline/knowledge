# Source code: samples/snippets/fsharp/arrays/snippet62.fs

Complete source file; linked examples may select a region or line range.

```
let values = [| ("a", 1); ("b", 2); ("c", 3) |]

let resultPick = Array.pick (fun elem ->
                    match elem with
                    | (value, 2) -> Some value
                    | _ -> None) values
printfn "%A" resultPick
```
