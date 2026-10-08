# Source code: samples/snippets/fsharp/fssequences/snippet45.fs

Complete source file; linked examples may select a region or line range.

```
let data = [(1,1,2001); (2,2,2004); (6,17,2009)]
let seq1 =
    data |> Seq.map (fun (a,b,c) ->
        let date = new System.DateTime(c, a, b)
        date.ToString("F"))

for i in seq1 do printfn "%A" i
```
