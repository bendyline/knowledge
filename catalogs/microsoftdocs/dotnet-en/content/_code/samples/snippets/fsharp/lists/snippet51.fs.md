# Source code: samples/snippets/fsharp/lists/snippet51.fs

Complete source file; linked examples may select a region or line range.

```
let printPermutation n list1 =
    let length = List.length list1
    if (n > 0 && n < length) then
        List.permute (fun index -> (index + n) % length) list1
    else
        list1
    |> printfn "%A"
let list1 = [ 1 .. 5 ]
// There are 5 valid permutations of list1, with n from 0 to 4.
for n in 0 .. 4 do
    printPermutation n list1
```
