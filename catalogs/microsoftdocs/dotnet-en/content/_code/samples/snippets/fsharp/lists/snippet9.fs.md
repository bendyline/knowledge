# Source code: samples/snippets/fsharp/lists/snippet9.fs

Complete source file; linked examples may select a region or line range.

```
let valuesList = [ ("a", 1); ("b", 2); ("c", 3) ]

let resultPick = List.pick (fun elem ->
                    match elem with
                    | (value, 2) -> Some value
                    | _ -> None) valuesList
printfn "%A" resultPick
```
