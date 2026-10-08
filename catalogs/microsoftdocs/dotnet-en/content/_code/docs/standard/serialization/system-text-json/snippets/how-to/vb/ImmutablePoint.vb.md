# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/ImmutablePoint.vb

Complete source file; linked examples may select a region or line range.

```
Namespace SystemTextJsonSamples

    ' <ImmutablePoint>
    Public Structure ImmutablePoint

        Public Sub New(x As Integer, y As Integer)
            Me.X = x
            Me.Y = y
        End Sub

        Public ReadOnly Property X As Integer
        Public ReadOnly Property Y As Integer
    End Structure

    ' </ImmutablePoint>
End Namespace

```
