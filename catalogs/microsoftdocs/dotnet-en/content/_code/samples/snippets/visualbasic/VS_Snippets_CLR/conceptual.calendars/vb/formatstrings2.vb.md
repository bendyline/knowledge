# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.calendars/vb/formatstrings2.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

Module Example
    Public Sub Main()
        ' <Snippet9>
        Dim dat As Date = #05/01/2012#
        Console.WriteLine("{0:MM-dd-yyyy g}", dat)
        ' The example displays the following output:
        '     05-01-2012 A.D.      
        ' </Snippet9>
    End Sub
End Module


```
