# Source code: samples/snippets/visualbasic/programming-guide/language-features/arrays/iterate1d.vb

Complete source file; linked examples may select a region or line range.

```

Module IterateArray
   Public Sub Main()
      Dim numbers = {10, 20, 30}

      For index = 0 To numbers.GetUpperBound(0)
         Console.WriteLine(numbers(index))
      Next
   End Sub
End Module
' The example displays the following output:
'  10
'  20
'  30


```
