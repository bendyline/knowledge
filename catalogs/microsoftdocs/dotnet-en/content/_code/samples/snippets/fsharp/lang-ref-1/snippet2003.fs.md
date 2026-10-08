# Source code: samples/snippets/fsharp/lang-ref-1/snippet2003.fs

Complete source file; linked examples may select a region or line range.

```
type Shape =
    // The value here is the radius.
    | Circle of float
    // The value here is the side length.
    | EquilateralTriangle of double
    // The value here is the side length.
    | Square of double
    // The values here are the height and width.
    | Rectangle of double * double

```
