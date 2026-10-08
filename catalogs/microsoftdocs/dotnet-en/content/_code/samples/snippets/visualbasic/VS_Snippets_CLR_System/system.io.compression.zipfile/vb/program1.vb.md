# Source code: samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.zipfile/vb/program1.vb

Complete source file; linked examples may select a region or line range.

```
' <snippet1>
Imports System.IO.Compression

Module Module1

    Sub Main()
        Dim startPath As String = ".\start"
        Dim zipPath As String = ".\result.zip"
        Dim extractPath As String = ".\extract"

        ZipFile.CreateFromDirectory(startPath, zipPath)

        ZipFile.ExtractToDirectory(zipPath, extractPath)
    End Sub

End Module
' </snippet1>

```
