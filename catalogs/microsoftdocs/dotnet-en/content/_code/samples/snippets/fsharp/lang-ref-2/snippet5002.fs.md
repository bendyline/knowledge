# Source code: samples/snippets/fsharp/lang-ref-2/snippet5002.fs

Complete source file; linked examples may select a region or line range.

```
let TestNumber input =
   match input with
   | Even -> printfn "%d is even" input
   | Odd -> printfn "%d is odd" input

TestNumber 7
TestNumber 11
TestNumber 32
```
