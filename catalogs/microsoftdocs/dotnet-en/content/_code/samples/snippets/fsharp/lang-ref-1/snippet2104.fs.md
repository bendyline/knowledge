# Source code: samples/snippets/fsharp/lang-ref-1/snippet2104.fs

Complete source file; linked examples may select a region or line range.

```
type uColor =
    | Red = 0u
    | Green = 1u
    | Blue = 2u

let col3 = Microsoft.FSharp.Core.LanguagePrimitives.EnumOfValue<uint32, uColor>(2u)
```
