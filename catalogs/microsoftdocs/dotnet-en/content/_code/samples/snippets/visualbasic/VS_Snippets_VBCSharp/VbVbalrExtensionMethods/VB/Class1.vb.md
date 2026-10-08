# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrExtensionMethods/VB/Class1.vb

Complete source file; linked examples may select a region or line range.

```
' *********************************************************************
'<Snippet2>
Module Class1

    Sub Main()

        Dim example As String = "Hello"
        ' Call to extension method Print.
        example.Print()

        ' Call to instance method ToUpper.
        example.ToUpper()
        example.ToUpper.Print()

    End Sub

End Module
'</Snippet2>

```
