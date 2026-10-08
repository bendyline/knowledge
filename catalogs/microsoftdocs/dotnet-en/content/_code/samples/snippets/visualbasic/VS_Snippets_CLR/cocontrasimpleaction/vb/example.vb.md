# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/cocontrasimpleaction/vb/example.vb

Complete source file; linked examples may select a region or line range.

```
Class Base
End Class

Class Derived
    Inherits Base
End Class

Class Example
    Shared Sub Main()
        '<Snippet1>
        Dim b As Action(Of Base) = Sub(target As Base)
                                       Console.WriteLine(target.GetType().Name)
                                   End Sub
        Dim d As Action(Of Derived) = b
        d(New Derived())
        '</Snippet1>
    End Sub
End Class

```
