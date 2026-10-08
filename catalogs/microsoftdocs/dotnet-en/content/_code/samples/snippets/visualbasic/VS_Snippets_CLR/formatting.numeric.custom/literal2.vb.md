# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/formatting.numeric.custom/literal2.vb

Complete source file; linked examples may select a region or line range.

```
Public Module Example
    Public Sub Main()
        ' <Snippet1>
        Dim n As Double = 123.8
        Console.WriteLine($"{n:#,##0.0K}")
        ' The example displays the following output:
        '       123.8K
        ' </Snippet1>
    End Sub
End Module


```
