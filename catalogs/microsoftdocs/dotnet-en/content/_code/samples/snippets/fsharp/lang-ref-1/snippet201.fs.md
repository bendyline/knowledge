# Source code: samples/snippets/fsharp/lang-ref-1/snippet201.fs

Complete source file; linked examples may select a region or line range.

```
open System
open System.Windows.Forms

let form1 = new Form()
form1.Text <- "XYZ"

[<STAThread>]
do Application.Run(form1)

```
