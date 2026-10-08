# Source code: samples/snippets/fsharp/lang-ref-1/snippet302.fs

Complete source file; linked examples may select a region or line range.

```
let fullNotation = [ "a"; "ab"; "abc" ] |> List.find ( fun text -> text.EndsWith("c") )
printfn "%A" fullNotation         // Output: "abc"

let shorthandNotation = [ "a"; "ab"; "abc" ] |> List.find ( _.EndsWith("b") )
printfn "%A" shorthandNotation    // Output: "ab"

```
