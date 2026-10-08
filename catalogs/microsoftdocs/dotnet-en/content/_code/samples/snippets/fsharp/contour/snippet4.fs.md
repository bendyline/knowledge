# Source code: samples/snippets/fsharp/contour/snippet4.fs

Complete source file; linked examples may select a region or line range.

```
let rec factorial n =
    if n = 0
    then 1
    else n * factorial (n - 1)
System.Console.WriteLine(factorial anInt)
```
