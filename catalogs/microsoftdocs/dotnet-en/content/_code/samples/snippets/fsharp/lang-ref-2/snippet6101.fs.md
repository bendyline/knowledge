# Source code: samples/snippets/fsharp/lang-ref-2/snippet6101.fs

Complete source file; linked examples may select a region or line range.

```
let months = [| "January"; "February"; "March"; "April";
                "May"; "June"; "July"; "August"; "September";
                "October"; "November"; "December" |]

let lookupMonth month =
   if (month > 12 || month < 1)
     then invalidArg (nameof month) (sprintf "Value passed in was %d." month)
   months[month - 1]

printfn "%s" (lookupMonth 12)
printfn "%s" (lookupMonth 1)
printfn "%s" (lookupMonth 13)

```
