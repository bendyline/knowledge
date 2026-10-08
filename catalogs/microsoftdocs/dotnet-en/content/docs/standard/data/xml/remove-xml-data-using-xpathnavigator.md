---
description: "Learn more about: Remove XML Data using XPathNavigator"
title: "Remove XML Data using XPathNavigator"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 9f436bca-1b96-494b-a6d2-e102c7551752
---
# Remove XML Data using XPathNavigator

The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides a set of methods used to remove nodes and values from an XML document. In order to use these methods, the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object must be editable, that is, its [System.Xml.XPath.XPathNavigator.CanEdit](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CanEdit) property must be `true`.

 [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects that can edit an XML document are created by the [System.Xml.XmlDocument.CreateNavigator*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.CreateNavigator*) method of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class. [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects created by the [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class are read-only and any attempt to use the editing methods of an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object created by an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object results in a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException).

 For more information about creating editable [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects, see [Reading XML Data using XPathDocument and XmlDocument](reading-xml-data-using-xpathdocument-and-xmldocument.md).

## Removing Nodes

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the [System.Xml.XPath.XPathNavigator.DeleteSelf*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.DeleteSelf*) method to remove nodes from an XML document.

### Removing a Node

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the [System.Xml.XPath.XPathNavigator.DeleteSelf*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.DeleteSelf*) method to delete the current node an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on from an XML document.

 After a node has been deleted using the [System.Xml.XPath.XPathNavigator.DeleteSelf*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.DeleteSelf*) method, it is no longer reachable from the root of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object. After a node has been deleted, the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) is positioned on the parent node of the deleted node.

 A delete operation doesn't affect the position of any [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object positioned on the deleted node. These [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects are valid in the sense that they can move within the deleted subtree, but cannot be moved to the main node tree using the regular node set navigation methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class.

> **Note:**
> The [System.Xml.XPath.XPathNavigator.MoveTo*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.MoveTo*) method of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class can be used to move these [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects back into the main node tree, or from the main node tree to the deleted subtree.

 In the following example, the `price` element of the first `book` element of the `contosoBooks.xml` file is deleted using the [System.Xml.XPath.XPathNavigator.DeleteSelf*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.DeleteSelf*) method. The position of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object after the `price` element is deleted is on the parent `book` element.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("contosoBooks.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", "http://www.contoso.com/books")
navigator.MoveToChild("book", "http://www.contoso.com/books")
navigator.MoveToChild("price", "http://www.contoso.com/books")

navigator.DeleteSelf()

Console.WriteLine("Position after delete: {0}", navigator.Name)
Console.WriteLine(navigator.OuterXml)
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("contosoBooks.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
navigator.MoveToChild("book", "http://www.contoso.com/books");
navigator.MoveToChild("price", "http://www.contoso.com/books");

navigator.DeleteSelf();

Console.WriteLine("Position after delete: {0}", navigator.Name);
Console.WriteLine(navigator.OuterXml);
```

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

### Removing an Attribute Node

 Attribute nodes are removed from an XML document using the [System.Xml.XPath.XPathNavigator.DeleteSelf*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.DeleteSelf*) method.

 After an attribute node has been deleted, it is no longer reachable from the root node of an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object and the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is positioned on the parent element.

#### Default Attributes

 Regardless of the method used to remove attributes, there are special limitations on removing attributes that are defined as default attributes in the DTD or XML Schema for the XML document. Default attributes cannot be removed unless the element they belong to is also removed. Default attributes are always present for elements that have default attributes declared, and as a result, deleting a default attribute results in a replacement attribute being inserted into the element and initialized to the default value that was declared.

## Removing Values

 The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides the [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) and [System.Xml.XPath.XPathNavigator.SetTypedValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetTypedValue*) methods to remove untyped and typed values from an XML document.

### Removing Untyped Values

 The [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) method simply inserts the untyped `string` value passed as a parameter as the value of the node the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on. Passing an empty string to the [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) method removes the value of the current node.

 The following example removes the value of the `price` element of the first `book` element in the `contosoBooks.xml` file using the [System.Xml.XPath.XPathNavigator.SetValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetValue*) method.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("contosoBooks.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", "http://www.contoso.com/books")
navigator.MoveToChild("book", "http://www.contoso.com/books")
navigator.MoveToChild("price", "http://www.contoso.com/books")

navigator.SetValue("")

navigator.MoveToRoot()
Console.WriteLine(navigator.OuterXml)
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("contosoBooks.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
navigator.MoveToChild("book", "http://www.contoso.com/books");
navigator.MoveToChild("price", "http://www.contoso.com/books");

navigator.SetValue("");

navigator.MoveToRoot();
Console.WriteLine(navigator.OuterXml);
```

 The example takes the `contosoBooks.xml` file as an input.

 [XPathXMLExamples#2 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml#2)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml.md)

### Removing Typed Values

 When the type of a node is a W3C XML Schema simple type, the new value inserted by the [System.Xml.XPath.XPathNavigator.SetTypedValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetTypedValue*) method is checked against the facets of the simple type before the value is set. If the new value is not valid according to the type of the node (for example, setting a value of `-1` on an element whose type is `xs:positiveInteger`), it results in an exception. The [System.Xml.XPath.XPathNavigator.SetTypedValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetTypedValue*) method also cannot be passed `null` as a parameter. As a result removing the value of a typed node must comply with the schema type of the node.

 The following example removes the value of the `price` element of the first `book` element in the `contosoBooks.xml` file using the [System.Xml.XPath.XPathNavigator.SetTypedValue*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.SetTypedValue*) method by setting the value to `0`. The value of the node is not removed, but the price of the book has been removed according to its data type of `xs:decimal`.

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

navigator.SetTypedValue(0)

navigator.MoveToRoot()
Console.WriteLine(navigator.OuterXml)
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

navigator.SetTypedValue(0);

navigator.MoveToRoot();
Console.WriteLine(navigator.OuterXml);
```

## Namespace Nodes

 Namespace nodes cannot be deleted from an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object. Attempts to delete namespace nodes using the [System.Xml.XPath.XPathNavigator.DeleteSelf*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.DeleteSelf*) method results in an exception.

## The InnerXml and OuterXml Properties

 The [System.Xml.XPath.XPathNavigator.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml*) and [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) properties of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class change the XML markup of the nodes an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on.

 The [System.Xml.XPath.XPathNavigator.InnerXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml) property changes the XML markup of the child nodes an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on with the parsed contents of the given XML `string`. Similarly, the [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) property changes the XML markup of the child nodes an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object is currently positioned on as well as the current node itself.

 In addition to the methods described in this topic, the [System.Xml.XPath.XPathNavigator.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml*) and [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) properties can be used to remove nodes and values from an XML document. For more information about using the [System.Xml.XPath.XPathNavigator.InnerXml*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.InnerXml*) and [System.Xml.XPath.XPathNavigator.OuterXml](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.OuterXml) properties to modify nodes, see the [Modify XML Data using XPathNavigator](modify-xml-data-using-xpathnavigator.md) topic.

## Saving an XML Document

 Saving changes made to an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object as the result of the methods described in this topic is performed using the methods of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class. For more information about saving changes made to an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object, see [Saving and Writing a Document](saving-and-writing-a-document.md).

## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)
- [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator)
- [Process XML Data Using the XPath Data Model](process-xml-data-using-the-xpath-data-model.md)
- [Insert XML Data using XPathNavigator](insert-xml-data-using-xpathnavigator.md)
- [Modify XML Data using XPathNavigator](modify-xml-data-using-xpathnavigator.md)
