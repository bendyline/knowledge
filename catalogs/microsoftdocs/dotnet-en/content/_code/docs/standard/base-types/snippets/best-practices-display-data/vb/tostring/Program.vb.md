# Source code: docs/standard/base-types/snippets/best-practices-display-data/vb/tostring/Program.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Globalization

Module Program
    Sub Main(args As String())
        ' <Snippet1>
        Dim concat1 As String = "The amount is " & 126.03 & "."
        Console.WriteLine(concat1)
        ' </Snippet1>

        ' <Snippet2>
        Dim concat2 As String = "The amount is " & 126.03.ToString(CultureInfo.InvariantCulture) & "."
        Console.WriteLine(concat2)
        ' </Snippet2>
    End Sub
End Module

```
