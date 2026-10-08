# Source code: samples/snippets/fsharp/lang-ref-1/snippet19061.fs

Complete source file; linked examples may select a region or line range.

```
type SteeringWheel = { Type: string }
type CarInterior = { Steering: SteeringWheel; Seats: int }
type Car = { Interior: CarInterior; ExteriorColor: string option }

let beforeThisFeature x =
    { x with Interior = { x.Interior with
                            Steering = {x.Interior.Steering with Type = "yoke"}
                            Seats = 5
                        }
    }

```
