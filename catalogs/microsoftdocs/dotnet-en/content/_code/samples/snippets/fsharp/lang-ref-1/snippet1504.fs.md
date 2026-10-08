# Source code: samples/snippets/fsharp/lang-ref-1/snippet1504.fs

Complete source file; linked examples may select a region or line range.

```
seq {
    for i in 1..10 do
        yield i * i
}

// The 'yield' is implicit and doesn't need to be specified in most cases.
seq {
    for i in 1..10 do
        i * i
}

```
