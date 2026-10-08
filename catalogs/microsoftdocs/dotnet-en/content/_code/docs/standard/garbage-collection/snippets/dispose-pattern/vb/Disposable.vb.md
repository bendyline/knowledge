# Source code: docs/standard/garbage-collection/snippets/dispose-pattern/vb/Disposable.vb

Complete source file; linked examples may select a region or line range.

```
Public Class Disposable : Implements IDisposable

    Dim disposed As Boolean
    ' <SnippetDispose>
    Public Sub Dispose() _
        Implements IDisposable.Dispose
        ' Dispose of unmanaged resources.
        Dispose(True)
        ' Suppress finalization.
        GC.SuppressFinalize(Me)
    End Sub
    ' </SnippetDispose>

    ' <SnippetDisposeBool>
   Protected Overridable Sub Dispose(disposing As Boolean)
		If disposed Then Exit Sub

		If disposing Then

            ' Free managed resources.
            ' ...

        End If

        ' Free unmanaged resources.
        ' ...

        disposed = True
   End Sub
    ' </SnippetDisposeBool>

End Class

```
