# Source code: samples/snippets/fsharp/lang-ref-2/snippet3601.fs

Complete source file; linked examples may select a region or line range.

```
open System.Windows.Forms

let form = new Form(Text="F# Windows Form",
                    Visible = true,
                    TopMost = true)

form.Click.Add(fun evArgs -> System.Console.Beep())
Application.Run(form)
```
