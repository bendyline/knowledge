# Source code: samples/snippets/fsharp/tuples/interop.fsx

Complete source file; linked examples may select a region or line range.

```
//
// Will not compile!
//

// Will not compile!
let (a, b) = struct (1, 2)

// Will not compile!
let struct (c, d) = (1, 2)

// Won't compile!
let f(t: struct(int*int)): int*int = t

//
// Will compile!
//

// Pattern match on the result.
let (a, b) = (1, 2)

// Construct a new tuple from the parts you pattern matched on.
let struct (c, d) = struct (a, b)

```
