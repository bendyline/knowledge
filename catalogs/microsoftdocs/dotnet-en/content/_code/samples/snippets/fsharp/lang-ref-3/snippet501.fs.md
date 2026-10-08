# Source code: samples/snippets/fsharp/lang-ref-3/snippet501.fs

Complete source file; linked examples may select a region or line range.

```
open Microsoft.FSharp.Quotations
// A typed code quotation.
let expr : Expr<int> = <@ 1 + 1 @>
// An untyped code quotation.
let expr2 : Expr = <@@ 1 + 1 @@>
```
