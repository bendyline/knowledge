# Source code: samples/snippets/visualbasic/programming-guide/language-features/arrays/array-size2.vb

Complete source file; linked examples may select a region or line range.

```

Module Example
   Public Sub Main()
      Dim arr(99) As Integer
      Console.WriteLine(arr.Length)
      
      Redim arr(50)
      Console.WriteLine(arr.Length)
   End Sub
End Module
' The example displays the following output:
'     100
'     51

 
```
