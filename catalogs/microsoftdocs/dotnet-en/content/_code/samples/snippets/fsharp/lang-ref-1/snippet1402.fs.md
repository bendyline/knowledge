# Source code: samples/snippets/fsharp/lang-ref-1/snippet1402.fs

Complete source file; linked examples may select a region or line range.

```
open System.IO

let openFile filename =
    try
        let file = File.Open(filename, FileMode.Create)
        Some(file)
    with ex ->
        eprintf "An exception occurred with message %s" ex.Message
        None

```
