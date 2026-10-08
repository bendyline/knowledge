# Source code: docs/standard/io/snippets/how-to-read-text-from-a-file/vb/Program.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.IO

Module Program

    Sub Main(args As String())
        SyncRead()
        AsyncRead().Wait()
    End Sub

    Sub SyncRead()
        '<sync>
        Try
            ' Open the text file using a stream reader.
            Using reader As New StreamReader("TestFile.txt")

                ' Read the stream as a string.
                Dim text As String = reader.ReadToEnd()

                ' Write the text to the console.
                Console.WriteLine(text)

            End Using
        Catch ex As IOException
            Console.WriteLine("The file could not be read:")
            Console.WriteLine(ex.Message)
        End Try
        '</sync>
    End Sub

    Async Function AsyncRead() As Task
        '<async>
        Try
            ' Open the text file using a stream reader.
            Using reader As New StreamReader("TestFile.txt")

                ' Read the stream as a string.
                Dim text As String = Await reader.ReadToEndAsync()

                ' Write the text to the console.
                Console.WriteLine(text)

            End Using
        Catch ex As IOException
            Console.WriteLine("The file could not be read:")
            Console.WriteLine(ex.Message)
        End Try
        '</async>
    End Function

End Module

```
