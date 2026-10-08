# Source code: docs/standard/events/snippets/shared/how-to-provider-observer/vb/data.vb

Complete source file; linked examples may select a region or line range.

```
' <Temperature>
Namespace Global.TemperatureSample

    Public Structure Temperature
        Public ReadOnly Property Degrees As Decimal
        Public ReadOnly Property [Date] As Date

        Public Sub New(degrees As Decimal, [date] As Date)
            Me.Degrees = degrees
            Me.Date = [date]
        End Sub
    End Structure

End Namespace
' </Temperature>

```
