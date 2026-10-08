# Source code: samples/snippets/fsharp/access-control/snippet2.fs

Complete source file; linked examples may select a region or line range.

```
// Module2.fs
module Module2

open Module1

// The following line is an error because private means
// that it cannot be accessed from another file or module
// let private myPrivateObj = new MyPrivateType()
let internal myInternalObj = new MyInternalType()

let result = myInternalObj.Z
```
