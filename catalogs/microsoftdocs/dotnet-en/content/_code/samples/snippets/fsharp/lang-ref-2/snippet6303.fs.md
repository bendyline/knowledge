# Source code: samples/snippets/fsharp/lang-ref-2/snippet6303.fs

Complete source file; linked examples may select a region or line range.

```
let printToFile (file1 : System.IO.StreamWriter) =
    file1.WriteLine("Test output");

using (System.IO.File.CreateText("test.txt")) printToFile
```
