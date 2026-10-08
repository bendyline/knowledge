# Source code: samples/snippets/fsharp/lists/snippet47.fs

Complete source file; linked examples may select a region or line range.

```
let printList list1 =
    if (List.isEmpty list1) then
        printfn "There are no elements in this list."
    else
        printfn "This list contains the following elements:"
        List.iter (fun elem -> printf "%A " elem) list1
        printfn ""
printList [ "test1"; "test2" ]
printList [ ]
```
