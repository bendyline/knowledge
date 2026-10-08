# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/regularexpressions.language.backreferences/vb/backreference7.vb

Complete source file; linked examples may select a region or line range.

```

Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Console.WriteLine(Regex.IsMatch("aa", "(?<2>\w)\k<1>"))
        ' Throws an ArgumentException.
    End Sub
End Module


```
