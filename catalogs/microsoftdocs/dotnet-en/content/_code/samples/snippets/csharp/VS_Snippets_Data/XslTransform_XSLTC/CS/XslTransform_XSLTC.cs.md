# Source code: samples/snippets/csharp/VS_Snippets_Data/XslTransform_XSLTC/CS/XslTransform_XSLTC.cs

Complete source file; linked examples may select a region or line range.

```
//<snippet1>
using System;
using System.Xml.Xsl;

class Example
{
    static void Main()
    {
        //Create a new XslCompiledTransform and load the compiled transformation.
        XslCompiledTransform xslt = new XslCompiledTransform();
        xslt.Load(typeof(Transform));

        // Execute the transformation and output the results to a file.
        xslt.Transform("books.xml", "discount_books.html");
    }
}
//</snippet1>

```
