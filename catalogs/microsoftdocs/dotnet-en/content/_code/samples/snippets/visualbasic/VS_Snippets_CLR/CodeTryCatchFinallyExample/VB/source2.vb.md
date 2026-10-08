# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/CodeTryCatchFinallyExample/VB/source2.vb

Complete source file; linked examples may select a region or line range.

```
'<snippet3>
Class ArgumentOutOfRangeExample
    Public Shared Sub Main()
        Dim array1() As Integer = {0, 0}
        Dim array2() As Integer = {0, 0}

        Try
            Array.Copy(array1, array2, -1)
        Catch e As ArgumentOutOfRangeException
            Console.WriteLine("Error: {0}", e)
            Throw
        Finally
            Console.WriteLine("This statement is always executed.")
        End Try
    End Sub
End Class
'</snippet3>

```
