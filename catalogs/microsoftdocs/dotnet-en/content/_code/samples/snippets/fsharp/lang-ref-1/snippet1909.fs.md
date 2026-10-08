# Source code: samples/snippets/fsharp/lang-ref-1/snippet1909.fs

Complete source file; linked examples may select a region or line range.

```
type Car =
    { Make: string
      Model: string
      mutable Odometer: int }

let myCar =
    { Make = "Fabrikam"
      Model = "Coupe"
      Odometer = 108112 }

myCar.Odometer <- myCar.Odometer + 21

```
