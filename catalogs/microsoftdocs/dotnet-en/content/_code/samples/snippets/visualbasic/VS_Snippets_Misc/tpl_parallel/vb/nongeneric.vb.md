# Source code: samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/nongeneric.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Linq
Imports System.Collections
Imports System.Threading.Tasks

Module Module1

    Sub Main()
        Dim nonGenericCollection As New ArrayList()

        '<snippet07>
        Parallel.ForEach(nonGenericCollection.Cast(Of Object), _
                         Sub(currentElement)
                             ' ... work with currentElement
                         End Sub)
        '</snippet07>
    End Sub

End Module

```
