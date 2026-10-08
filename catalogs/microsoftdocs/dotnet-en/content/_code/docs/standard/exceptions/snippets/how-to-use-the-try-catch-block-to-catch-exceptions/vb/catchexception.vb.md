# Source code: docs/standard/exceptions/snippets/how-to-use-the-try-catch-block-to-catch-exceptions/vb/catchexception.vb

Complete source file; linked examples may select a region or line range.

```
'<snippet3>
Imports System.IO

Public Class ProcessFile
    Public Shared Sub Main()
        Try
            Using sr As StreamReader = File.OpenText("data.txt")
                Console.WriteLine($"The first line of this file is {sr.ReadLine()}")
            End Using
        Catch e As FileNotFoundException
            Console.WriteLine($"The file was not found: '{e}'")
        Catch e As DirectoryNotFoundException
            Console.WriteLine($"The directory was not found: '{e}'")
        Catch e As IOException
            Console.WriteLine($"The file could not be opened: '{e}'")
        End Try
    End Sub
End Class
'</snippet3>

```
