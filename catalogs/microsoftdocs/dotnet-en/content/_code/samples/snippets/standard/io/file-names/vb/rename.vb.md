# Source code: samples/snippets/standard/io/file-names/vb/rename.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.IO

Module Example3
    Public Sub Main()
        Dim fi As New FileInfo(".\test.txt")
        fi.MoveTo(".\Test.txt")
    End Sub
End Module

```
