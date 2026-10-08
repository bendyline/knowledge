# Source code: samples/snippets/fsharp/lang-ref-1/snippet1903.fs

Complete source file; linked examples may select a region or line range.

```
type Point = { X: float; Y: float; Z: float }
type Point3D = { X: float; Y: float; Z: float }
// Ambiguity: Point or Point3D?
let mypoint3D = { X = 1.0; Y = 1.0; Z = 0.0 }

```
