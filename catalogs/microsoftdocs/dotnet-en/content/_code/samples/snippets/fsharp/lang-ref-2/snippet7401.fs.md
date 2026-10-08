# Source code: samples/snippets/fsharp/lang-ref-2/snippet7401.fs

Complete source file; linked examples may select a region or line range.

```
let printSourceLocation() =
    printfn "Line: %s" __LINE__
    printfn "Source Directory: %s" __SOURCE_DIRECTORY__
    printfn "Source File: %s" __SOURCE_FILE__
printSourceLocation()
```
