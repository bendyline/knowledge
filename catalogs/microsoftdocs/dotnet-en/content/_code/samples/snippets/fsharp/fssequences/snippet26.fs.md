# Source code: samples/snippets/fsharp/fssequences/snippet26.fs

Complete source file; linked examples may select a region or line range.

```
// You can use Seq.average to average elements of a list, array, or sequence.
let average1 = Seq.average [ 1.0 .. 10.0 ]
printfn "Average: %f" average1
// To average a sequence of integers, use Seq.averageBy to convert to float.
let average2 = Seq.averageBy (fun elem -> float elem) (seq { 1 .. 10 })
printfn "Average: %f" average2
```
