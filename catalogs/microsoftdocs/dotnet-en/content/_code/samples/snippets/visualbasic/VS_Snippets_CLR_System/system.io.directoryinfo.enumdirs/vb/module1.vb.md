# Source code: samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directoryinfo.enumdirs/vb/module1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.IO

Module Module1

    Sub Main()

        Dim dirPath As String = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
        Dim dirPrograms As New DirectoryInfo(dirPath)
        Dim StartOf2009 As New DateTime(2009, 1, 1)

        Dim dirs = From dir In dirPrograms.EnumerateDirectories()
                   Where dir.CreationTimeUtc > StartOf2009

        For Each di As DirectoryInfo In dirs
            Console.WriteLine("{0}", di.Name)
        Next

    End Sub

End Module

```
