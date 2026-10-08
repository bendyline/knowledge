# Source code: samples/snippets/fsharp/lang-ref-2/snippet4816.fs

Complete source file; linked examples may select a region or line range.

```
open System.Windows.Forms

let RegisterControl(control:Control) =
    match control with
    | :? Button as button -> button.Text <- "Registered."
    | :? CheckBox as checkbox -> checkbox.Text <- "Registered."
    | _ -> ()
```
