# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1018-mark-attributes-with-attributeusageattribute_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1018

    ' Violates rule: MarkAttributesWithAttributeUsage.
    Public NotInheritable Class BadCodeMaintainerAttribute
        Inherits Attribute

        Public Sub New(developerName As String)
            Me.DeveloperName = developerName
        End Sub 'New

        Public ReadOnly Property DeveloperName() As String
    End Class

    ' Satisfies rule: Attributes specify AttributeUsage.
    ' The attribute is valid for type-level targets.
    <AttributeUsage(AttributeTargets.Class Or AttributeTargets.Enum Or
   AttributeTargets.Interface Or AttributeTargets.Delegate)>
    Public NotInheritable Class GoodCodeMaintainerAttribute
        Inherits Attribute

        Public Sub New(developerName As String)
            Me.DeveloperName = developerName
        End Sub 'New

        Public ReadOnly Property DeveloperName() As String
    End Class

End Namespace

```
