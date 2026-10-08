# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/UpperCaseNamingPolicy.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Text.Json

Namespace SystemTextJsonSamples

    Public Class UpperCaseNamingPolicy
        Inherits JsonNamingPolicy

        Public Overrides Function ConvertName(name As String) As String
            Return name.ToUpper()
        End Function

    End Class

End Namespace

```
