# Source code: samples/snippets/fsharp/lang-ref-1/snippet301.fs

Complete source file; linked examples may select a region or line range.

```
fun x -> x + 1
fun a b c -> printfn "%A %A %A" a b c
fun (a: int) (b: int) (c: int) -> a + b * c
fun x y -> let swap (a, b) = (b, a) in swap (x, y)
```
