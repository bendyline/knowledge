# Source code: samples/snippets/fsharp/lang-ref-1/snippet2602.fs

Complete source file; linked examples may select a region or line range.

```
type MyClassBase2(x: int) =
    let mutable z = x * x

    do
        for i in 1..z do
            printf "%d " i


type MyClassDerived2(y: int) =
    inherit MyClassBase2(y * 2)

    do
        for i in 1..y do
            printf "%d " i

```
