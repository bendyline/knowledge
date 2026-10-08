# Source code: samples/snippets/visualbasic/programming-guide/language-features/procedures/use-ref-returns1.vb

Complete source file; linked examples may select a region or line range.

```
Module Example
   Public Sub Main()
      Dim n As New NumericValue(15)
      n.IncrementValue() += 12
      Console.WriteLine(n.GetValue) 
   End Sub
End Module
' Output:   28


```
