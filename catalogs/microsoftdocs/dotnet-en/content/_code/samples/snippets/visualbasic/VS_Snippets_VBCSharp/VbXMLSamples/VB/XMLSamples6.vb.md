# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples6.vb

Complete source file; linked examples may select a region or line range.

```
' Topic: How to: Access XML Attributes (Visual Basic)
'<Snippet14>  
Imports <xmlns:ns = "http://SomeNamespace"> 
 
Class TestClass3

    Shared Sub TestPrefix()
        Dim phone = 
            <ns:phone ns:type="home">206-555-0144</ns:phone>

        Console.WriteLine("Phone type: " & phone.@ns:type)
    End Sub

End Class
'</Snippet14>

```
