# Source code: samples/snippets/fsharp/lang-ref-2/snippet3702.fs

Complete source file; linked examples may select a region or line range.

```
// Define a new member method FromString on the type Int32.
type System.Int32 with
    member this.FromString( s : string ) =
       System.Int32.Parse(s)

let testFromString str =
    let mutable i = 0
    // Use the extension method.
    i <- i.FromString(str)
    printfn "%d" i

testFromString "500"
```
