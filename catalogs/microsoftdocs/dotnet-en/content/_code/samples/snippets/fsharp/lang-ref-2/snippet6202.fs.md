# Source code: samples/snippets/fsharp/lang-ref-2/snippet6202.fs

Complete source file; linked examples may select a region or line range.

```
open System.Runtime.InteropServices

[<DllImport("kernel32", SetLastError=true)>]
extern bool CloseHandle(nativeint handle)
```
