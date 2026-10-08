# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1031-do-not-catch-general-exception-types_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System
Imports System.IO

Namespace ca1031

    ' Creates two violations of the rule.
    Public Class GenericExceptionsCaught

        Dim inStream As FileStream
        Dim outStream As FileStream

        Sub New(inFile As String, outFile As String)

            Try
                inStream = File.Open(inFile, FileMode.Open)
            Catch ex As SystemException
                Console.WriteLine("Unable to open {0}.", inFile)
            End Try

            Try
                outStream = File.Open(outFile, FileMode.Open)
            Catch
                Console.WriteLine("Unable to open {0}.", outFile)
            End Try

        End Sub

    End Class

    Public Class GenericExceptionsCaughtFixed

        Dim inStream As FileStream
        Dim outStream As FileStream

        Sub New(inFile As String, outFile As String)

            Try
                inStream = File.Open(inFile, FileMode.Open)

                ' Fix the first violation by catching a specific exception.
            Catch ex As FileNotFoundException
                Console.WriteLine("Unable to open {0}.", inFile)
                ' For functionally equivalent code, also catch the
                ' remaining exceptions that may be thrown by File.Open
            End Try

            Try
                outStream = File.Open(outFile, FileMode.Open)

                ' Fix the second violation by re-throwing the generic 
                ' exception at the end of the catch block.
            Catch
                Console.WriteLine("Unable to open {0}.", outFile)
                Throw
            End Try

        End Sub

    End Class

End Namespace

```
