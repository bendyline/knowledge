# Source code: samples/snippets/fsharp/arrays/snippet14.fs

Complete source file; linked examples may select a region or line range.

```
printfn "%A" (Array.choose (fun elem -> if elem % 2 = 0 then
                                            Some(float (elem*elem - 1))
                                        else
                                            None) [| 1 .. 10 |])
```
