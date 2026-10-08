# Source code: samples/snippets/fsharp/lists/snippet70.fs

Complete source file; linked examples may select a region or line range.

```
let binary n =
    let rec generateBinary n =
        if (n / 2 = 0) then [n]
        else (n % 2) :: generateBinary (n / 2)
    generateBinary n |> List.rev

printfn "%A" (binary 1024)

let resultList = List.distinct (binary 1024)
printfn "%A" resultList
```
