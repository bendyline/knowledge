# Source code: samples/snippets/fsharp/arrays/snippet74.fs

Complete source file; linked examples may select a region or line range.

```
let binary n =
    let rec generateBinary n =
        if (n / 2 = 0) then [n]
        else (n % 2) :: generateBinary (n / 2)
    generateBinary n |> List.rev |> Array.ofList

printfn "%A" (binary 1024)

let resultArray = Array.distinct (binary 1024)
printfn "%A" resultArray
```
