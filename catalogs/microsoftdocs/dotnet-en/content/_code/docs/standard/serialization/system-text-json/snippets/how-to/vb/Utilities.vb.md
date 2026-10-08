# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/Utilities.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Reflection

Namespace SystemTextJsonSamples

    Public NotInheritable Class Utilities

        Public Shared Sub DisplayPropertyValues(obj As Object)
            Dim objectType As Type = obj.[GetType]()
            Console.WriteLine($"{objectType.Name} object")
            For Each [property] As PropertyInfo In objectType.GetProperties()
                If Not [property].PropertyType.FullName.Contains("Collections") AndAlso
        Not [property].PropertyType.FullName.Contains("[]") Then
                    Console.WriteLine($"{[property].Name}: {[property].GetGetMethod().Invoke(obj, Nothing)}")
                End If
            Next
        End Sub

    End Class

End Namespace

```
