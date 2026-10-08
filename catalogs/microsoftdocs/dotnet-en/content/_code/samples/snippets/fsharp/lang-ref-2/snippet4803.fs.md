# Source code: samples/snippets/fsharp/lang-ref-2/snippet4803.fs

Complete source file; linked examples may select a region or line range.

```
let printOption (data : int option) =
    match data with
    | Some var1  -> printfn "%d" var1
    | None -> ()
```
