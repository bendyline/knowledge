# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/HowToGeneric/VB/source.vb

Complete source file; linked examples may select a region or line range.

```
' <snippet21>
' <snippet22>
Class B(Of T, U)
End Class
Class D(Of V, W)
    Inherits B(Of Integer, V)
End Class
' </snippet22>

Class GenTypes
    Public Shared Sub Main()

    End Sub
End Class
' </snippet21>

```
