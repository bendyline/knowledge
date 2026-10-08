# Source code: samples/snippets/fsharp/lists/snippet71.fs

Complete source file; linked examples may select a region or line range.

```
let inputList = [ -5 .. 10 ]
let printList list1 = List.iter (printf "%A ") list1; printfn ""
printfn "Original list: "
printList inputList
printfn "\nListwith distinct absolute values: "
let listDistinctAbsoluteValue = List.distinctBy (fun elem -> abs elem) inputList
listDistinctAbsoluteValue |> printList

```
