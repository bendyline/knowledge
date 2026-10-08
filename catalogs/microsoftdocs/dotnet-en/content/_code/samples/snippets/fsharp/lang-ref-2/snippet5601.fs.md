# Source code: samples/snippets/fsharp/lang-ref-2/snippet5601.fs

Complete source file; linked examples may select a region or line range.

```
let divide1 x y =
   try
      Some (x / y)
   with
      | :? System.DivideByZeroException -> printfn "Division by zero!"; None

let result1 = divide1 100 0
```
