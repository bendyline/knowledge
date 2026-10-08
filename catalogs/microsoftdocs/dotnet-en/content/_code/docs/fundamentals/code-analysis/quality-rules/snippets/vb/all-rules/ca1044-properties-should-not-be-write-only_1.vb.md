# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1044-properties-should-not-be-write-only_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1044

    Public Class BadClassWithWriteOnlyProperty

        Dim someName As String

        ' Violates rule PropertiesShouldNotBeWriteOnly.
        WriteOnly Property Name As String
            Set
                someName = Value
            End Set
        End Property

    End Class

    Public Class GoodClassWithReadWriteProperty

        Property Name As String

    End Class

End Namespace

```
