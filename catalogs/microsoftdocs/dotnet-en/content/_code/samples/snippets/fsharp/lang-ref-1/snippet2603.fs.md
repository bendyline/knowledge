# Source code: samples/snippets/fsharp/lang-ref-1/snippet2603.fs

Complete source file; linked examples may select a region or line range.

```
open System

let object1 =
    { new Object() with
        override this.ToString() = "This overrides object.ToString()" }

printfn "%s" (object1.ToString())
```
