# Source code: samples/snippets/fsharp/lang-ref-1/snippet1901.fs

Complete source file; linked examples may select a region or line range.

```
// Labels are separated by semicolons when defined on the same line.
type Point = { X: float; Y: float; Z: float }

// You can define labels on their own line with or without a semicolon.
type Customer =
    { First: string
      Last: string
      SSN: uint32
      AccountNumber: uint32 }

// A struct record.
[<Struct>]
type StructPoint = { X: float; Y: float; Z: float }

```
