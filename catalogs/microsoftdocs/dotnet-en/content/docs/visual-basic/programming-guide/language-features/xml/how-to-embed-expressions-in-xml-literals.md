---
description: "Learn more about: How to: Embed Expressions in XML Literals (Visual Basic)"
title: "How to: Embed Expressions in XML Literals"
ms.date: 07/20/2015
helpviewer_keywords:
  - "embedded expressions [Visual Basic]"
  - "XML literals [Visual Basic], embedded expressions"
ms.assetid: 75016fad-0141-42de-8564-5051be29487e
---
# How to: Embed Expressions in XML Literals (Visual Basic)

You can combine XML literals with embedded expressions to create an XML document, fragment, or element that contains content created at run time. The following examples demonstrate how to use embedded expressions to populate element content, attributes, and element names at run time.

 The syntax for an embedded expression is `<%=` `exp` `%>`, which is the same syntax that ASP.NET uses. For more information, see [Embedded Expressions in XML](embedded-expressions-in-xml.md).

 You can also use the LINQ to XML APIs to create LINQ to XML objects. For more information, see [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement).

## Procedures

#### To insert text as element content

- The following example shows how to insert the text that is contained in the `contactName` variable between the opening and closing name elements.

     [VbXMLSamples#39 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples14.vb#39)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples14.vb.md)

     This example produces the following output:

    ```xml
    <contact>
      <name>Patrick Hines</name>
    </contact>
    ```

#### To insert text as an attribute value

- The following example shows how to insert the text that is contained in the `phoneType` variable as the value of the `type` attribute.

     [VbXMLSamples#40 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples14.vb#40)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples14.vb.md)

     This example produces the following output:

    ```xml
    <contact>
      <phone type="home">206-555-0144</phone>
    </contact>
    ```

#### To insert text for an element name

- The following example shows how to insert the text that is contained in the `elementName` variable as the name of an element.

     When creating elements by using this technique, you must close them with the \</> tag.

     [VbXMLSamples#41 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples14.vb#41)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbXMLSamples/VB/XMLSamples14.vb.md)

     This example produces the following output:

    ```xml
    <contact>
      <name>Patrick Hines</name>
    </contact>
    ```

## See also

- [How to: Create XML Literals](how-to-create-xml-literals.md)
- [Embedded Expressions in XML](embedded-expressions-in-xml.md)
- [Creating XML in Visual Basic](creating-xml.md)
- [XML](index.md)
