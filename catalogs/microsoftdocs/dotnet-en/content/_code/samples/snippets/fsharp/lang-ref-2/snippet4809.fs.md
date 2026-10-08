# Source code: samples/snippets/fsharp/lang-ref-2/snippet4809.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [ 1; 2; 3; 4 ]

// This example uses a cons pattern and a list pattern.
let rec printList l =
    match l with
    | head :: tail -> printf "%d " head; printList tail
    | [] -> printfn ""

printList list1
```
