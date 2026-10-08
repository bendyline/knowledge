# Source code: samples/snippets/visualbasic/programming-guide/language-features/strings/interpolated-strings1.vb

Complete source file; linked examples may select a region or line range.

```
Public Module Example
   Public Sub Main()
      Dim name = "Bartholomew"
      Dim s1 = $"Hello, {name}!"  
      Console.WriteLine(s1)
   End Sub
End Module
' The example displays the following output:
'      Hello, Bartholomew!
' </Snippet1>

```
