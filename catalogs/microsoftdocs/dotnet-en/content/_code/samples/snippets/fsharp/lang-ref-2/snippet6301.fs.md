# Source code: samples/snippets/fsharp/lang-ref-2/snippet6301.fs

Complete source file; linked examples may select a region or line range.

```
open System.IO

let writetofile filename obj =
   use file1 = File.CreateText(filename)
   file1.WriteLine("{0}", obj.ToString() )
   // file1.Dispose() is called implicitly here.

writetofile "abc.txt" "Humpty Dumpty sat on a wall."
```
