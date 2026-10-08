# Source code: samples/snippets/visualbasic/VS_Snippets_Data/XslTransform_XSLTC/VB/XslTransform_XSLTC.vb

Complete source file; linked examples may select a region or line range.

```
'<snippet1>
Imports System.Xml.Xsl

Module Module1

    Sub Main()
        'Create a new XslCompiledTransform and load the compiled transformation.
        Dim xslt As New XslCompiledTransform()
        xslt.Load(GetType(Transform))

        'Execute the transform and output the results to a file.
        xslt.Transform("books.xml", "discount_books.html")
    End Sub

End Module
'</snippet1>

```
