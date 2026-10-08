# Source code: samples/snippets/fsharp/lang-ref-2/snippet6001.fs

Complete source file; linked examples may select a region or line range.

```
let divideFailwith x y =
  if (y = 0) then failwith "Divisor cannot be zero."
  else
    x / y

let testDivideFailwith x y =
  try
     divideFailwith x y
  with
     | Failure(msg) -> printfn "%s" msg; 0

let result1 = testDivideFailwith 100 0
```
