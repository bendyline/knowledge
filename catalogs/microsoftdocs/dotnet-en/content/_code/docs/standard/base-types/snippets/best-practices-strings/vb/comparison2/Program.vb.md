# Source code: docs/standard/base-types/snippets/best-practices-strings/vb/comparison2/Program.vb

Complete source file; linked examples may select a region or line range.

```
Module Program
    Sub Main()
        Dim strA As String = "Владимир"
        Dim strB As String = "ВЛАДИМИР"

        ' <OrdinalIgnoreCase>
        String.Compare(strA, strB, StringComparison.OrdinalIgnoreCase)
        ' </OrdinalIgnoreCase> 
        Console.WriteLine(String.Compare(strA, strB, StringComparison.OrdinalIgnoreCase))

        ' <Ordinal>
        String.Compare(strA.ToUpperInvariant(), strB.ToUpperInvariant(), StringComparison.Ordinal)
        ' </Ordinal>
        Console.WriteLine(String.Compare(strA.ToUpperInvariant(), strB.ToUpperInvariant(), StringComparison.Ordinal))
    End Sub
End Module

```
