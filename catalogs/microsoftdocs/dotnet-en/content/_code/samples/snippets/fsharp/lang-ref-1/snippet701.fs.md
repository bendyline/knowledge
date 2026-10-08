# Source code: samples/snippets/fsharp/lang-ref-1/snippet701.fs

Complete source file; linked examples may select a region or line range.

```
open System

// Pass a null value to a .NET method.
let ParseDateTime (str: string) =
    let (success, res) =
        DateTime.TryParse(str, null, System.Globalization.DateTimeStyles.AssumeUniversal)

    if success then Some(res) else None

```
