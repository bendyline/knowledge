# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.disposable/vb/Foo.vb

Complete source file; linked examples may select a region or line range.

```
Public NotInheritable Class Foo
    Implements IDisposable

    Private ReadOnly _bar As IDisposable

    Public Sub New()
        _bar = New Bar()
    End Sub

    Public Sub Dispose() Implements IDisposable.Dispose
        _bar.Dispose()
    End Sub
End Class

```
