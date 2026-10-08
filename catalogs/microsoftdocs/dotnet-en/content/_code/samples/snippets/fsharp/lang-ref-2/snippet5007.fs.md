# Source code: samples/snippets/fsharp/lang-ref-2/snippet5007.fs

Complete source file; linked examples may select a region or line range.

```
let (|Default|) onNone value =
    match value with
    | None -> onNone
    | Some e -> e

let greet (Default "random citizen" name) =
    printfn "Hello, %s!" name

greet None
greet (Some "George")

```
