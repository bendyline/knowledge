# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrExtensionMethods/VB/Class2.vb

Complete source file; linked examples may select a region or line range.

```
' *************************************************************
Imports System.Runtime.CompilerServices

Module Class2
    '<Snippet3>
    <Extension()> 
    Public Sub PrintAndPunctuate(ByVal aString As String, 
                                 ByVal punc As String)
        Console.WriteLine(aString & punc)
    End Sub
    '</Snippet3>
End Module

```
