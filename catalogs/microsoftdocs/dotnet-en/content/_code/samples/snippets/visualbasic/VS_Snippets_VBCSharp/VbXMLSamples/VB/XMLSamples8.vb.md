# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples8.vb

Complete source file; linked examples may select a region or line range.

```
' Topic: XML Value Property

'<Snippet19>  
Imports <xmlns:ns = "http://SomeNamespace"> 
 
Class TestClass4

    Shared Sub TestPrefix()
        Dim contact = <ns:contact>
                        <ns:name>Patrick Hines</ns:name>
                      </ns:contact>
        Console.WriteLine(contact.<ns:name>.Value)
    End Sub

End Class
'</Snippet19>
```
