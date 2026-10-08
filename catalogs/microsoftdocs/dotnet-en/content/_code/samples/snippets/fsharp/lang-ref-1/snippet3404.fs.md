# Source code: samples/snippets/fsharp/lang-ref-1/snippet3404.fs

Complete source file; linked examples may select a region or line range.

```
type Circle(radius: float) =
    inherit Ellipse(radius, radius, 0.0)
    // Circles are invariant to rotation, so do nothing.
    override this.Rotate(_) = ()

```
