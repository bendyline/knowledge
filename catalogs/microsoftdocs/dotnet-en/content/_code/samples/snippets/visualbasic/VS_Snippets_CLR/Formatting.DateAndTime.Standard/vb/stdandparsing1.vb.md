# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.DateAndTime.Standard/vb/stdandparsing1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet17>
Imports System.Globalization

Module Example
    Public Sub Main()
        Console.WriteLine("'d' standard format string:")
        For Each customString In DateTimeFormatInfo.CurrentInfo.GetAllDateTimePatterns("d"c)
            Console.WriteLine("   {0}", customString)
        Next
    End Sub
End Module
' The example displays the following output:
'    'd' standard format string:
'       M/d/yyyy
'       M/d/yy
'       MM/dd/yy
'       MM/dd/yyyy
'       yy/MM/dd
'       yyyy-MM-dd
'       dd-MMM-yy
' </Snippet17>

```
