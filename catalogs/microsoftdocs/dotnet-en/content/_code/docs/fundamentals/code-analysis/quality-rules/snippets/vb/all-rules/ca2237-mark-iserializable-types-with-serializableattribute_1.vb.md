# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca2237-mark-iserializable-types-with-serializableattribute_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Runtime.Serialization

Namespace ca2237

    ' <SerializableAttribute> _ 
    Public Class BaseType
        Implements ISerializable

        Dim baseValue As Integer

        Sub New()
            baseValue = 3
        End Sub

        Protected Sub New(
         info As SerializationInfo, context As StreamingContext)

            baseValue = info.GetInt32("baseValue")

        End Sub

        Overridable Sub GetObjectData(
         info As SerializationInfo, context As StreamingContext) Implements ISerializable.GetObjectData

            info.AddValue("baseValue", baseValue)

        End Sub
    End Class

End Namespace

```
