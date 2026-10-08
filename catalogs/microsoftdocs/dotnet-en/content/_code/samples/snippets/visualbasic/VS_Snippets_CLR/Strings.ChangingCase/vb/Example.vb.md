# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/Strings.ChangingCase/vb/Example.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

<Assembly: CLSCompliant(True)>
Module Example
    Public Sub Main()
        ConvertToUpperCase()
        Console.WriteLine()
        ConvertToLowerCase()
    End Sub

    Private Sub ConvertToUpperCase()
        ' <Snippet1>
        Dim MyString As String = "Hello World!"
        Console.WriteLine(MyString.ToUpper())
        ' This example displays the following output:
        '       HELLO WORLD!
        ' </Snippet1>
    End Sub

    Private Sub ConvertToLowerCase()
        ' <Snippet2>
        Dim MyString As String = "Hello World!"
        Console.WriteLine(MyString.ToLower())
        ' This example displays the following output:
        '       hello world!
        ' </Snippet2>   
    End Sub
End Module


```
