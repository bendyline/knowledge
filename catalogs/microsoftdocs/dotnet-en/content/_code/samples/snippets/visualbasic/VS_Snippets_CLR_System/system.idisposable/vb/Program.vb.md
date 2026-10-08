# Source code: samples/snippets/visualbasic/VS_Snippets_CLR_System/system.idisposable/vb/Program.vb

Complete source file; linked examples may select a region or line range.

```
Module Program
    Sub Main()
        Using a As New DisposableDerived
        End Using

        Using b As New DisposableDerivedWithFinalizer
            b.Dispose()
        End Using

        Using c As New DisposableBaseWithSafeHandle
        End Using
    End Sub
End Module

```
