# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1814-prefer-jagged-arrays-over-multidimensional_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Public Class ArrayHolder
    Private jaggedArray As Integer()() =  {New Integer() {1, 2, 3, 4}, _
                                           New Integer() {5, 6, 7}, _
                                           New Integer() {8}, _
                                           New Integer() {9}}
    
    Private multiDimArray As Integer(,) =  {{1, 2, 3, 4}, _
                                            {5, 6, 7, 0}, _
                                            {8, 0, 0, 0}, _
                                            {9, 0, 0, 0}}
End Class
```
