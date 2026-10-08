# Source code: samples/snippets/visualbasic/language-reference/error-messages/bc30451/Program1.vb

Complete source file; linked examples may select a region or line range.

```
Imports Microsoft.VisualBasic.CompilerServices

Public Module Example
    Sub Main(args As String())
        Dim originalValue As String = args(0)
        Dim t As Type = GetType(Int32)
        Dim i As Int32 = Conversions.ChangeType(originalValue, t)
        Console.WriteLine($"'{originalValue}' --> {i}")
    End Sub
End Module

```
