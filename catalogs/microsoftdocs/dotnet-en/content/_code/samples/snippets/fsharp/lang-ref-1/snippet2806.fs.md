# Source code: samples/snippets/fsharp/lang-ref-1/snippet2806.fs

Complete source file; linked examples may select a region or line range.

```
// Define an empty interface (also known as a marker interface)
type IMarker = 
    interface end

// Implement the empty interface in a record type
type MyRecord = 
    { Name: string }
    interface IMarker

// Implement the empty interface in a class type
type MyClass(value: int) =
    member _.Value = value
    interface IMarker

```
