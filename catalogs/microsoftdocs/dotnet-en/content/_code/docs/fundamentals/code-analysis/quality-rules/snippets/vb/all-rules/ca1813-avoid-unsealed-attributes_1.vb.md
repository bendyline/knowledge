# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1813-avoid-unsealed-attributes_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1813

    ' Satisfies rule: AvoidUnsealedAttributes.
    <AttributeUsage(AttributeTargets.Class Or AttributeTargets.Struct)>
    Public NotInheritable Class DeveloperAttribute
        Inherits Attribute

        Public Sub New(name As String)
            Me.Name = name
        End Sub


        Public ReadOnly Property Name() As String
    End Class

End Namespace

```
