# Source code: samples/snippets/visualbasic/getting-started/ref-return-helper.vb

Complete source file; linked examples may select a region or line range.

```
' <Snippet1> 
Module Example
   Public Sub Main()
      Dim sentence As New Sentence("A time to see the world is now.")
      Dim found = False
      Dim returns = RefHelper(sentence.FindNext("A", found), "A good", found) 
      Console.WriteLine(sentence.GetSentence()) 
   End Sub
   
   Private Function RefHelper(ByRef stringFound As String, replacement As String, success As Boolean) _ 
                    As (originalString As String, found As Boolean) 
      Dim originalString = stringFound
      If found Then stringFound = replacement
      Return (originalString, found)   
   End Function
End Module
' The example displays the following output:
'      A good time to see the world is now.
' </Snippet1>


```
