# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1041-provide-obsoleteattribute-message_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1041

    Public Class ObsoleteAttributeOnMember

        <ObsoleteAttribute("This property is obsolete and will " &
             "be removed in a future version. Use the FirstName " &
             "and LastName properties instead.", False)>
        ReadOnly Property Name As String
            Get
                Return "Name"
            End Get
        End Property

        ReadOnly Property FirstName As String
            Get
                Return "FirstName"
            End Get
        End Property

        ReadOnly Property LastName As String
            Get
                Return "LastName"
            End Get
        End Property

    End Class

End Namespace

```
