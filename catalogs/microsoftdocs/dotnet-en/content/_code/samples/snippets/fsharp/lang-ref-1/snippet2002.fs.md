# Source code: samples/snippets/fsharp/lang-ref-1/snippet2002.fs

Complete source file; linked examples may select a region or line range.

```
let printValue opt =
    match opt with
    | Some x -> printfn "%A" x
    | None -> printfn "No value."
```
