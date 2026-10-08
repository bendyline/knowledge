# Source code: samples/snippets/fsharp/lang-ref-2/snippet4602.fs

Complete source file; linked examples may select a region or line range.

```
let rangeTest testValue mid size =
    match testValue with
    | var1 when var1 >= mid - size/2 && var1 <= mid + size/2 -> printfn "The test value is in range."
    | _ -> printfn "The test value is out of range."

rangeTest 10 20 5
rangeTest 10 20 10
rangeTest 10 20 40
```
