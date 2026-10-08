# Source code: samples/snippets/visualbasic/programming-guide/language-features/strings/interpolated-strings3.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Globalization

Public Module Example
   Public Sub Main()
      Dim name = "Bartholomew"
      Dim s3 As FormattableString = $"Hello, {name}!"  
      Console.WriteLine($"String: '{s3.Format}'")
      Console.WriteLine($"Arguments: {s3.ArgumentCount}")
      Console.WriteLine($"Result string: {s3}")
   End Sub
End Module
' The example displays the following output:
'       String: 'Hello, {0}!'
'       Arguments: 1
'       Result string: Hello, Bartholomew!


```
