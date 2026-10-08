# Source code: samples/snippets/fsharp/arrays/snippet45.fs

Complete source file; linked examples may select a region or line range.

```
// Use Array.fold2 to perform computations over two arrays (of equal size)
// at the same time.
// Example: Add the greater element at each array position.
let sumGreatest array1 array2 =
    Array.fold2 (fun acc elem1 elem2 ->
        acc + max elem1 elem2) 0 array1 array2

let sum = sumGreatest [| 1; 2; 3 |] [| 3; 2; 1 |]
printfn "The sum of the greater of each pair of elements in the two arrays is %d." sum
```
