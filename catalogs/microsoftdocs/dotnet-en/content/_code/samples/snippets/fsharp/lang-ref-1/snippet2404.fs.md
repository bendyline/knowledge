# Source code: samples/snippets/fsharp/lang-ref-1/snippet2404.fs

Complete source file; linked examples may select a region or line range.

```
open System.IO

type Folder(pathIn: string) =
    let path = pathIn
    let filenameArray: string array = Directory.GetFiles(path)
    member this.FileArray = Array.map (fun elem -> new File(elem, this)) filenameArray

and File(filename: string, containingFolder: Folder) =
    member this.Name = filename
    member this.ContainingFolder = containingFolder

let folder1 = new Folder(".")

for file in folder1.FileArray do
    printfn "%s" file.Name

```
