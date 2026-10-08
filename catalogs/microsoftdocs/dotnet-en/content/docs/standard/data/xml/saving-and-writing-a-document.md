---
description: "Learn more about: Saving and Writing a Document"
title: "Saving and Writing a Document"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.topic: how-to
---
# Saving and Writing a Document

When you load and save an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument), the saved document may differ from the original in the following ways:

- If the [System.Xml.XmlDocument.PreserveWhitespace](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.PreserveWhitespace) property is set to `true` before the [System.Xml.XmlDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Save*) method is called, white space in the document is preserved in the output; if this property is `false`, [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) auto-indents the output.

- All the white space between attributes is reduced to a single space character.

- The white space between elements is changed. Significant white space is preserved and insignificant white space is not. But when the document is saved, it will use the [System.Xml.XmlTextWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextWriter) **Indenting** mode by default to neatly print the output to make it more readable.

- The quote character used around attribute values is changed to double quote by default. You can use the [System.Xml.XmlTextReader.QuoteChar](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.QuoteChar) property on [System.Xml.XmlTextWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextWriter) to set the quote character to either double quote or single quote.

- By default, numeric character entities like `{` are expanded.

- The byte-order mark found in the input document is not preserved. UCS-2 is saved as UTF-8 unless you explicitly create an XML declaration that specifies a different encoding.

- If you want to write out the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) into a file or stream, the output written out is the same as the content of the document. That is, the [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) is written out only if there is one contained in the document, and the encoding used when writing out the document is the same encoding given in the declaration node.

## Writing an XmlDeclaration

 The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) and [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) members of [System.Xml.XmlNode.OuterXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.OuterXml*), [System.Xml.XmlNode.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InnerXml*), and [System.Xml.XmlNode.WriteTo*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.WriteTo*), in addition to the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) methods of [System.Xml.XmlDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Save*) and [System.Xml.XmlDocument.WriteContentTo*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.WriteContentTo*), create an XML declaration.

 For the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) properties of [System.Xml.XmlNode.OuterXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.OuterXml*), [System.Xml.XmlDocument.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.InnerXml*), and the [System.Xml.XmlDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Save*), [System.Xml.XmlDocument.WriteTo*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.WriteTo*), and [System.Xml.XmlDocument.WriteContentTo*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.WriteContentTo*) methods, the encoding written out in the XML declaration is taken from the [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) node. If there is no [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) node, [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) is not written out. If there is no encoding in the [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) node, encoding is not written out in the XML declaration.

 The [System.Xml.XmlDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Save*) and [System.Xml.XmlDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Save*) methods always write out an [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration). These methods take the encoding from the writer that it is writing to. That is, the encoding value on the writer overrides the encoding on the document and in the [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration). For example, the following code does not write an encoding in the XML declaration found in the output file `out.xml`.

```vb
Dim doc As New XmlDocument()
Dim tw As XmlTextWriter = New XmlTextWriter("out.xml", Nothing)
doc.Load("text.xml")
doc.Save(tw)
```

```csharp
XmlDocument doc = new XmlDocument();
XmlTextWriter tw = new XmlTextWriter("out.xml", null);
doc.Load("text.xml");
doc.Save(tw);
```

 For the [System.Xml.XmlDocument.Save*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Save*) method, the XML declaration is written out using the [System.Xml.XmlWriter.WriteStartDocument*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteStartDocument*) method in the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class. Therefore, overwriting the [System.Xml.XmlWriter.WriteStartDocument*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteStartDocument*) method changes how the start of the document is written.

 For the [System.Xml.XmlDeclaration](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration) members of [System.Xml.XmlNode.OuterXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.OuterXml*), [System.Xml.XmlDeclaration.WriteTo*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration.WriteTo*), and [System.Xml.XmlNode.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InnerXml*), if the [System.Xml.XmlDeclaration.Encoding](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration.Encoding) property is not set, no encoding is written out. Otherwise, the encoding written out in the XML declaration is the same as the encoding found in the [System.Xml.XmlDeclaration.Encoding](https://learn.microsoft.com/search/?terms=System.Xml.XmlDeclaration.Encoding) property.

## Writing Document Content Using the OuterXml Property

 The [System.Xml.XmlNode.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.OuterXml) property is a Microsoft extension to the World Wide Web Consortium (W3C) XML Document Object Model (DOM) standards. The [System.Xml.XmlNode.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.OuterXml) property is used to get the markup of the whole XML document, or just the markup of a single node and its child nodes. [System.Xml.XmlNode.OuterXml*](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.OuterXml*) returns the markup representing the given node and all its child nodes.

 The following code sample shows how to save a document in its entirety as a string.

```vb
Dim mydoc As New XmlDocument()
' Perform application needs here, like mydoc.Load("myfile");
' Now save the entire document to a string variable called "xml".
Dim xml As String = mydoc.OuterXml
```

```csharp
XmlDocument mydoc = new XmlDocument();
// Perform application needs here, like mydoc.Load("myfile");
// Now save the entire document to a string variable called "xml".
string xml = mydoc.OuterXml;
```

 The following code sample shows how to save only the document element.

```vb
' For the content of the Document Element only.
Dim xml As String = mydoc.DocumentElement.OuterXml
```

```csharp
// For the content of the Document Element only.
string xml = mydoc.DocumentElement.OuterXml;
```

 In contrast, you can use the [System.Xml.XmlNode.InnerText](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode.InnerText) property if you want the content of child nodes.

## See also

- [XML Document Object Model (DOM)](xml-document-object-model-dom.md)
