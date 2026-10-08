# Source code: samples/snippets/fsharp/arrays/snippet18.fs

Complete source file; linked examples may select a region or line range.

```
let stringReverse (s: string) =
    System.String(Array.rev (s.ToCharArray()))

printfn "%A" (stringReverse("!dlrow olleH"))
```
