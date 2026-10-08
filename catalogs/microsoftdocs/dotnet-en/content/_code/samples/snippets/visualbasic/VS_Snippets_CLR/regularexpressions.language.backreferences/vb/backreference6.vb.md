# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/regularexpressions.language.backreferences/vb/backreference6.vb

Complete source file; linked examples may select a region or line range.

```

Imports System.Text.RegularExpressions

Module Example
    Public Sub Main()
        Console.WriteLine(Regex.IsMatch("aa", "(?<char>\w)\k<1>"))
        ' Displays "True".
    End Sub
End Module


```
