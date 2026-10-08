# Source code: docs/core/tutorials/snippets/create-class-library/vb/StringLibrary/Class1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Runtime.CompilerServices

Namespace UtilityLibraries
    Public Module StringLibrary
        <Extension>
        Public Function StartsWithUpper(str As String) As Boolean
            If String.IsNullOrWhiteSpace(str) Then
                Return False
            End If

            Dim ch As Char = str(0)
            Return Char.IsUpper(ch)
        End Function
    End Module
End Namespace

```
