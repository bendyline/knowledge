# Source code: samples/snippets/fsharp/lang-ref-2/snippet6302.fs

Complete source file; linked examples may select a region or line range.

```
open System.IO

let writetofile2 filename obj =
    using (System.IO.File.CreateText(filename)) ( fun file1 ->
        file1.WriteLine("{0}", obj.ToString() )
    )

writetofile2 "abc2.txt" "The quick sly fox jumps over the lazy brown dog."
```
