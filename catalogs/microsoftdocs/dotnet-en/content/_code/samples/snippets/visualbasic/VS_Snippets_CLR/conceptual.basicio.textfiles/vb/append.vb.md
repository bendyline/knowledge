# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/append.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.IO

Class AppendText

    Public Shared Sub Main()

        ' Set a variable to the Documents path.
        Dim docPath As String =
            Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)

        ' Append text to an existing file named "WriteLines.txt".
        Using outputFile As New StreamWriter(Path.Combine(docPath, Convert.ToString("WriteLines.txt")), True)
            outputFile.WriteLine("Fourth Line")
        End Using

    End Sub

End Class

' The example adds the following line to the contents of "WriteLines.txt":
' Fourth Line

```
