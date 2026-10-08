# Source code: samples/snippets/visualbasic/programming-guide/language-features/arrays/array-class.vb

Complete source file; linked examples may select a region or line range.

```

Module Example
   Public Sub Main()
      Dim arr As Array = Array.CreateInstance(GetType(Object), 19)
      Console.WriteLine(arr.Length)
      Console.WriteLine(arr.GetType().Name)
   End Sub
End Module
' The example displays the following output:
'     19
'     Object[]

```
