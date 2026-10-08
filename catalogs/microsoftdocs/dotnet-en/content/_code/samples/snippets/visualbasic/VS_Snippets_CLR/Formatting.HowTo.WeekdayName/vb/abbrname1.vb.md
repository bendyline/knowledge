# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/abbrname1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet1>
Module Example
    Public Sub Main()
        Dim dateValue As Date = #6/11/2008#
        Console.WriteLine(dateValue.ToString("ddd"))
    End Sub
End Module
' The example displays the following output:
'       Wed
' </Snippet1>


```
