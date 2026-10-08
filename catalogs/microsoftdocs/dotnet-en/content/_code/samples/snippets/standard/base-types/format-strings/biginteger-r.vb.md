# Source code: samples/snippets/standard/base-types/format-strings/biginteger-r.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Numerics

Module Example
    Public Sub Main()
        Dim value = BigInteger.Pow(Int64.MaxValue, 2)
        Console.WriteLine(value.ToString("R"))
    End Sub
End Module
' The example displays the following output:
'      85070591730234615847396907784232501249  

```
