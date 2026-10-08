# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1056-uri-properties-should-not-be-strings_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1056

    Public Class ErrorProne

        ' Violates rule UriPropertiesShouldNotBeStrings.
        Property SomeUri As String

        ' Violates rule UriParametersShouldNotBeStrings.
        Sub AddToHistory(uriString As String)
        End Sub

        ' Violates rule UriReturnValuesShouldNotBeStrings.
        Function GetRefererUri(httpHeader As String) As String
            Return "http://www.adventure-works.com"
        End Function

    End Class

    Public Class SaferWay

        ' To retrieve a string, call SomeUri.ToString().
        ' To set using a string, call SomeUri = New Uri(string).
        Property SomeUri As Uri

        Sub AddToHistory(uriString As String)
            ' Check for UriFormatException.
            AddToHistory(New Uri(uriString))
        End Sub

        Sub AddToHistory(uriString As Uri)
        End Sub

        Function GetRefererUri(httpHeader As String) As Uri
            Return New Uri("http://www.adventure-works.com")
        End Function

    End Class

End Namespace

```
