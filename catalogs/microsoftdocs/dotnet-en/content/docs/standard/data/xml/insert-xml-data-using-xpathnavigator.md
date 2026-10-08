---
description: "Learn more about: Insert XML Data using XPathNavigator"
title: "Insert XML Data using XPathNavigator"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Insert XML data using XPathNavigator

The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides a set of methods used to insert sibling, child, and attribute nodes in an XML document. In order to use these methods, the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object must be editable, that is, its [System.Xml.XPath.XPathNavigator.CanEdit](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CanEdit) property must be `true`.

 [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects that can edit an XML document are created by the [System.Xml.XmlDocument.CreateNavigator*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateNavigator*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class. [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects created by the [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class are read-only and any attempt to use the editing methods of an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object created by an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object results in a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException).

 For more information about creating editable [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects, see [Reading XML Data using XPathDocument and XmlDocument](reading-xml-data-using-xpathdocument-and-xmldocument.md).

## Inserting Nodes

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides methods to insert sibling, child, and attribute nodes in an XML document. These methods allow you to insert nodes and attributes in different locations in relation to the current position of an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object and are described in the following sections.

### Inserting Sibling Nodes

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the following methods to insert sibling nodes.

- [System.Xml.XPath.XPathNavigator.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertAfter*)

- [System.Xml.XPath.XPathNavigator.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertBefore*)

- [System.Xml.XPath.XPathNavigator.InsertElementAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertElementAfter*)

- [System.Xml.XPath.XPathNavigator.InsertElementBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertElementBefore*)

 These methods insert sibling nodes before and after the node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on.

 The [System.Xml.XPath.XPathNavigator.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertAfter*) and [System.Xml.XPath.XPathNavigator.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertBefore*) methods are overloaded and accept a `string`, [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, or [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object containing the sibling node to add as parameters. Both methods also return an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object used to insert sibling nodes.

 The [System.Xml.XPath.XPathNavigator.InsertElementAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertElementAfter*) and [System.Xml.XPath.XPathNavigator.InsertElementBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertElementBefore*) methods insert a single sibling node before and after the node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on using the namespace prefix, local name, namespace URI, and value specified as parameters.

 In the following example a new `pages` element is inserted before the `price` child element of the first `book` element in the `contosoBooks.xml` file.
 [XPathNavigatorMethods#19 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs#19)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs.md)
 [XPathNavigatorMethods#19 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb#19)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb.md)

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

 For more information about the [System.Xml.XPath.XPathNavigator.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertAfter*), [System.Xml.XPath.XPathNavigator.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertBefore*), [System.Xml.XPath.XPathNavigator.InsertElementAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertElementAfter*) and [System.Xml.XPath.XPathNavigator.InsertElementBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertElementBefore*) methods, see the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class reference documentation.

### Inserting Child Nodes

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the following methods to insert child nodes.

- [System.Xml.XPath.XPathNavigator.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChild*)

- [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*)

- [System.Xml.XPath.XPathNavigator.AppendChildElement*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChildElement*)

- [System.Xml.XPath.XPathNavigator.PrependChildElement*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChildElement*)

 These methods append and prepend child nodes to the end of and the beginning of the list of child nodes of the node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on.

 Like the methods in the "Inserting Sibling Nodes" section, the [System.Xml.XPath.XPathNavigator.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChild*) and [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*) methods accept a `string`, [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, or [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object containing the child node to add as parameters. Both methods also return an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object used to insert child nodes.

 Also like the methods in the "Inserting Sibling Nodes" section, the [System.Xml.XPath.XPathNavigator.AppendChildElement*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChildElement*) and [System.Xml.XPath.XPathNavigator.PrependChildElement*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChildElement*) methods insert a single child node to the end of and the beginning of the list of child nodes of the node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on using the namespace prefix, local name, namespace URI, and value specified as parameters.

 In the following example, a new `pages` child element is appended to the list of child elements of the first `book` element in the `contosoBooks.xml` file.
 [XPathNavigatorMethods#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs.md)
 [XPathNavigatorMethods#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb.md)

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

 For more information about the [System.Xml.XPath.XPathNavigator.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChild*), [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*), [System.Xml.XPath.XPathNavigator.AppendChildElement*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChildElement*) and [System.Xml.XPath.XPathNavigator.PrependChildElement*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChildElement*) methods, see the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class reference documentation.

### Inserting Attribute Nodes

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the following methods to insert attribute nodes.

- [System.Xml.XPath.XPathNavigator.CreateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttribute*)

- [System.Xml.XPath.XPathNavigator.CreateAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttributes*)

 These methods insert attribute nodes on the element node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on. The [System.Xml.XPath.XPathNavigator.CreateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttribute*) method creates an attribute node on the element node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on using the namespace prefix, local name, namespace URI, and value specified as parameters. The [System.Xml.XPath.XPathNavigator.CreateAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttributes*) method returns an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object used to insert attribute nodes.

 In the following example, new `discount` and `currency` attributes are created on the `price` child element of the first `book` element in the `contosoBooks.xml` file using the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object returned from the [System.Xml.XPath.XPathNavigator.CreateAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttributes*) method.
 [XPathNavigatorMethods#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs.md)
 [XPathNavigatorMethods#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb.md)

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

 For more information about the [System.Xml.XPath.XPathNavigator.CreateAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttribute*) and [System.Xml.XPath.XPathNavigator.CreateAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttributes*) methods, see the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class reference documentation.

## Copying Nodes

 In certain cases you may want to populate an XML document with the contents from another XML document. Both the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class and the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class can copy nodes to an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object from an existing [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object or [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object.

 The [System.Xml.XPath.XPathNavigator.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChild*), [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*), [System.Xml.XPath.XPathNavigator.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertBefore*) and [System.Xml.XPath.XPathNavigator.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertAfter*) methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class all have overloads that can accept an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object or an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object as a parameter.

 The [System.Xml.XmlWriter.WriteNode*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteNode*) method of the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class has overloads that can accept an [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode), [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), or [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object.

 The following example copies all the `book` elements from one document to another.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", String.Empty)

Dim newBooks As XPathDocument = New XPathDocument("newBooks.xml")
Dim newBooksNavigator As XPathNavigator = newBooks.CreateNavigator()

Dim nav As XPathNavigator
For Each nav in newBooksNavigator.SelectDescendants("book", "", false)
    navigator.AppendChild(nav)
Next

document.Save("newBooks.xml");
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("books.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", String.Empty);

XPathDocument newBooks = new XPathDocument("newBooks.xml");
XPathNavigator newBooksNavigator = newBooks.CreateNavigator();

foreach (XPathNavigator nav in newBooksNavigator.SelectDescendants("book", "", false))
{
    navigator.AppendChild(nav);
}

document.Save("newBooks.xml");
```

## Inserting Values

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) and [System.Xml.XPath.XPathNavigator.SetTypedValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetTypedValue*) methods to insert values for a node into an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

### Inserting Untyped Values

 The [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) method simply inserts the untyped `string` value passed as a parameter as the value of the node the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on. The value is inserted without any type or without verifying that the new value is valid according to the type of the node if schema information is available.

 In the following example, the [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) method is used to update all `price` elements in the `contosoBooks.xml` file.
 [XPathNavigatorMethods#47 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs#47)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XPathNavigatorMethods/CS/xpathnavigatormethods.cs.md)
 [XPathNavigatorMethods#47 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb#47)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XPathNavigatorMethods/VB/xpathnavigatormethods.vb.md)

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

### Inserting Typed Values

 When the type of a node is a W3C XML Schema simple type, the new value inserted by the [System.Xml.XPath.XPathNavigator.SetTypedValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetTypedValue*) method is checked against the facets of the simple type before the value is set. If the new value is not valid according to the type of the node (for example, setting a value of `-1` on an element whose type is `xs:positiveInteger`), it results in an exception.

 The following example attempts to change the value of the `price` element of the first `book` element in the `contosoBooks.xml` file to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value. Because the XML Schema type of the `price` element is defined as `xs:decimal` in the `contosoBooks.xsd` files, this results in an exception.

```vb
Dim settings As XmlReaderSettings = New XmlReaderSettings()
settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd")
settings.ValidationType = ValidationType.Schema

Dim reader As XmlReader = XmlReader.Create("contosoBooks.xml", settings)

Dim document As XmlDocument = New XmlDocument()
document.Load(reader)
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", "http://www.contoso.com/books")
navigator.MoveToChild("book", "http://www.contoso.com/books")
navigator.MoveToChild("price", "http://www.contoso.com/books")

navigator.SetTypedValue(DateTime.Now)
```

```csharp
XmlReaderSettings settings = new XmlReaderSettings();
settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");
settings.ValidationType = ValidationType.Schema;

XmlReader reader = XmlReader.Create("contosoBooks.xml", settings);

XmlDocument document = new XmlDocument();
document.Load(reader);
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
navigator.MoveToChild("book", "http://www.contoso.com/books");
navigator.MoveToChild("price", "http://www.contoso.com/books");

navigator.SetTypedValue(DateTime.Now);
```

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

 The example also takes the `contosoBooks.xsd` as an input.

 [Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd#3](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md)

## The InnerXml and OuterXml Properties

 The [System.Xml.XPath.XPathNavigator.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml*) and [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) properties of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class change the XML markup of the nodes an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on.

 The [System.Xml.XPath.XPathNavigator.InnerXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml) property changes the XML markup of the child nodes an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on with the parsed contents of the given XML `string`. Similarly, the [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) property changes the XML markup of the child nodes an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on as well as the current node itself.

 In addition to the methods described in this topic, the [System.Xml.XPath.XPathNavigator.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml*) and [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) properties can be used to insert nodes and values in an XML document. For more information about using the [System.Xml.XPath.XPathNavigator.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml*) and [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) properties to insert nodes and values, see the [Modify XML Data using XPathNavigator](modify-xml-data-using-xpathnavigator.md) topic.

## Namespace and xml:lang Conflicts

 Certain conflicts related to the scope of namespace and `xml:lang` declarations can occur when inserting XML data using the [System.Xml.XPath.XPathNavigator.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertBefore*), [System.Xml.XPath.XPathNavigator.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertAfter*), [System.Xml.XPath.XPathNavigator.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChild*) and [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*) methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class that take [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) objects as parameters.

 The following are the possible namespace conflicts.

- If there is a namespace in-scope within the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context, where the prefix to namespace URI mapping is not in the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, a new namespace declaration is added to the newly inserted node.

- If the same namespace URI is in-scope within both the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context and the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, but has a different prefix mapped to it in both contexts, a new namespace declaration is added to the newly inserted node, with the prefix and namespace URI taken from the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object.

- If the same namespace prefix is in-scope within both the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context and the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, but has a different namespace URI mapped to it in both contexts, a new namespace declaration is added to the newly inserted node which re-declares that prefix with the namespace URI taken from [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object.

- If the prefix as well as the namespace URI in both the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context and the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context is the same, no new namespace declaration is added to the newly inserted node.

> **Note:**
> The description above also applies to namespace declarations with the empty `string` as a prefix (for example, the default namespace declaration).

 The following are the possible `xml:lang` conflicts.

- If there is an `xml:lang` attribute in-scope within the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context but not in the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, an `xml:lang` attribute whose value is taken from the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object is added to the newly inserted node.

- If there is an `xml:lang` attribute in-scope within both the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context and the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, but each has a different value, an `xml:lang` attribute whose value is taken from the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object is added to the newly inserted node.

- If there is an `xml:lang` attribute in-scope within both the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context and the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, but each with the same value, no new `xml:lang` attribute is added on the newly inserted node.

- If there is an `xml:lang` attribute in-scope within the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object's context, but none existing in the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object's context, no `xml:lang` attribute is added to the newly inserted node.

## Inserting Nodes with XmlWriter

 The methods used to insert sibling, child and attribute nodes described in the "Inserting Nodes and Values" section are overloaded. The [System.Xml.XPath.XPathNavigator.InsertAfter*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertAfter*), [System.Xml.XPath.XPathNavigator.InsertBefore*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InsertBefore*), [System.Xml.XPath.XPathNavigator.AppendChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.AppendChild*), [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*) and [System.Xml.XPath.XPathNavigator.CreateAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateAttributes*) methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class return an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object used to insert nodes.

### Unsupported XmlWriter Methods

 Not all of the methods used for writing information to an XML document using the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class are supported by the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class due to difference between the XPath data model and the Document Object Model (DOM).

 The following table describes the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class methods not supported by the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class.

| Method | Description |
| --- | --- |
| [System.Xml.XmlWriter.WriteEntityRef*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteEntityRef*) | Throws a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) exception. |
| [System.Xml.XmlWriter.WriteDocType*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteDocType*) | Ignored at the root level and throws a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) exception if called at any other level in the XML document. |
| [System.Xml.XmlWriter.WriteCData*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteCData*) | Treated as a call to the [System.Xml.XmlWriter.WriteString*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteString*) method for the equivalent character or characters. |
| [System.Xml.XmlWriter.WriteCharEntity*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteCharEntity*) | Treated as a call to the [System.Xml.XmlWriter.WriteString*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteString*) method for the equivalent character or characters. |
| [System.Xml.XmlWriter.WriteSurrogateCharEntity*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteSurrogateCharEntity*) | Treated as a call to the [System.Xml.XmlWriter.WriteString*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteString*) method for the equivalent character or characters. |

 For more information about the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class, see the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) class reference documentation.

### Multiple XmlWriter Objects

 It is possible to have multiple [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects pointing to different parts of an XML document with one or more open [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) objects. Multiple [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) objects are allowed and supported in single-threaded scenarios.

 The following are important notes to consider when using multiple [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) objects.

- XML fragments written by [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) objects are added to the XML document when the [System.Xml.XmlWriter.Close*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.Close*) method of each [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object is called. Until that point, the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object is writing a disconnected fragment. If an operation is performed on the XML document, any fragments being written by an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object, before the [System.Xml.XmlWriter.Close*](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.Close*) has been called, are not affected.

- If there is an open [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object on a particular XML subtree and that subtree is deleted, the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object may still add to the sub-tree. The subtree simply becomes a deleted fragment.

- If multiple [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) objects are opened at the same point in the XML document, they are added to the XML document in the order in which the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) objects are closed, not in the order in which they were opened.

 The following example creates an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object, creates an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object, and then uses the [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object returned by the [System.Xml.XPath.XPathNavigator.PrependChild*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.PrependChild*) method to create the structure of the first book in the `books.xml` file. The example then saves it as the `book.xml` file.

```vb
Dim document As XmlDocument = New XmlDocument()
Dim navigator As XPathNavigator = document.CreateNavigator()

Using writer As XmlWriter = navigator.PrependChild()

    writer.WriteStartElement("bookstore")
    writer.WriteStartElement("book")
    writer.WriteAttributeString("genre", "autobiography")
    writer.WriteAttributeString("publicationdate", "1981-03-22")
    writer.WriteAttributeString("ISBN", "1-861003-11-0")
    writer.WriteElementString("title", "The Autobiography of Benjamin Franklin")
    writer.WriteStartElement("author")
    writer.WriteElementString("first-name", "Benjamin")
    writer.WriteElementString("last-name", "Franklin")
    writer.WriteElementString("price", "8.99")
    writer.WriteEndElement()
    writer.WriteEndElement()
    writer.WriteEndElement()

End Using

document.Save("book.xml")
```

```csharp
XmlDocument document = new XmlDocument();
XPathNavigator navigator = document.CreateNavigator();

using (XmlWriter writer = navigator.PrependChild())
{
    writer.WriteStartElement("bookstore");
    writer.WriteStartElement("book");
    writer.WriteAttributeString("genre", "autobiography");
    writer.WriteAttributeString("publicationdate", "1981-03-22");
    writer.WriteAttributeString("ISBN", "1-861003-11-0");
    writer.WriteElementString("title", "The Autobiography of Benjamin Franklin");
    writer.WriteStartElement("author");
    writer.WriteElementString("first-name", "Benjamin");
    writer.WriteElementString("last-name", "Franklin");
    writer.WriteElementString("price", "8.99");
    writer.WriteEndElement();
    writer.WriteEndElement();
    writer.WriteEndElement();
}
document.Save("book.xml");
```

## Saving an XML Document

 Saving changes made to an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object as the result of the methods described in this topic is performed using the methods of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class. For more information about saving changes made to an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object, see [Saving and Writing a Document](saving-and-writing-a-document.md).

## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)
- [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator)
- [Process XML Data Using the XPath Data Model](process-xml-data-using-the-xpath-data-model.md)
- [Modify XML Data using XPathNavigator](modify-xml-data-using-xpathnavigator.md)
- [Remove XML Data using XPathNavigator](remove-xml-data-using-xpathnavigator.md)
