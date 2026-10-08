# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrExtensionMethods/VB/StringExtensions.vb

Complete source file; linked examples may select a region or line range.

```
' ************************************************
'<Snippet1>
Imports System.Runtime.CompilerServices

Module StringExtensions

    <Extension()> 
    Public Sub Print(ByVal aString As String)
        Console.WriteLine(aString)
    End Sub

End Module
'</Snippet1>

```
