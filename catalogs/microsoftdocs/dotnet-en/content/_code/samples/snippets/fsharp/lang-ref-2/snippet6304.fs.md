# Source code: samples/snippets/fsharp/lang-ref-2/snippet6304.fs

Complete source file; linked examples may select a region or line range.

```
let printToFile2 obj (file1 : System.IO.StreamWriter) =
    file1.WriteLine(obj.ToString())

using (System.IO.File.CreateText("test.txt")) (printToFile2 "XYZ")
```
