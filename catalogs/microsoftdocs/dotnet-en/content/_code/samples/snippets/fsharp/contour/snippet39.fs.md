# Source code: samples/snippets/fsharp/contour/snippet39.fs

Complete source file; linked examples may select a region or line range.

```
let compose4curried =
    fun op1 ->
        fun op2 ->
            fun n -> op1 (op2 n)
```
