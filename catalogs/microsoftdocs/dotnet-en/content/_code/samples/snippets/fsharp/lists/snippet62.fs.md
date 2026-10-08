# Source code: samples/snippets/fsharp/lists/snippet62.fs

Complete source file; linked examples may select a region or line range.

```
open System

let list1 = [ "<>"; "&"; "&&"; "&&&"; "<"; ">"; "|"; "||"; "|||" ]
printfn "Before sorting: "
list1 |> printfn "%A"
let sortFunction (string1:string) (string2:string) =
    if (string1.Length > string2.Length) then
        1
    else if (string1.Length < string2.Length) then
        -1
    else
        String.Compare(string1, string2)
List.sortWith sortFunction list1
|> printfn "After sorting:\n%A"
```
