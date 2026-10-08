# Source code: samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.enumdirs1/vb/program.vb

Complete source file; linked examples may select a region or line range.

```
' <Snippet1>
Imports System.Collections.Generic
Imports System.IO

Module Module1

    Sub Main()
        Try
            Dim dirPath As String = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)

            Dim dirs As List(Of String) = New List(Of String)(Directory.EnumerateDirectories(dirPath))

            For Each folder In dirs
                Console.WriteLine($"{dir.Substring(dir.LastIndexOf(Path.DirectorySeparatorChar) + 1)}")
            Next
            Console.WriteLine($"{dirs.Count} directories found.")
        Catch ex As UnauthorizedAccessException
            Console.WriteLine(ex.Message)
        Catch ex As PathTooLongException
            Console.WriteLine(ex.Message)
        End Try

    End Sub
End Module
' </Snippet1>

```
