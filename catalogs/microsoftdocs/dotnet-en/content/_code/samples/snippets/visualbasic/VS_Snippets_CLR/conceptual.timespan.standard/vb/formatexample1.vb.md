# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.standard/vb/formatexample1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet2>
Module Example
    Public Sub Main()
        Dim duration As New TimeSpan(1, 12, 23, 62)
        Dim output As String = "Time of Travel: " + duration.ToString("c")
        Console.WriteLine(output)

        Console.WriteLine("Time of Travel: {0:c}", duration)
    End Sub
End Module
' The example displays the following output:
'       Time of Travel: 1.12:24:02
'       Time of Travel: 1.12:24:02
' </Snippet2>

```
