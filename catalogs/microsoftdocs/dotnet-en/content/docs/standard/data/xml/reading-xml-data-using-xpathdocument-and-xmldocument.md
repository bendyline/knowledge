---
description: "Learn more about: Reading XML Data using XPathDocument and XmlDocument"
title: "Reading XML Data using XPathDocument and XmlDocument"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 5711b225-6aa2-4e4f-9898-19f2d518ad1a
---
# Reading XML Data using XPathDocument and XmlDocument

There are two ways to read an XML document in the [System.Xml.XPath](https://learn.microsoft.com/search/?terms=System.Xml.XPath) namespace. One is to read an XML document using the read-only [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class and the other is to read an XML document using the editable [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class in the [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml) namespace.

## Reading XML Documents using the XPathDocument Class

 The [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class provides a fast, read-only, in-memory representation of an XML document using the XPath data model. Instances of the [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class are created using one of its six constructors. These constructors allow you to read an XML document using a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader), or [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, as well as the `string` path to an XML file.

 The following example illustrates using the [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class's `string` constructor to read an XML document.

```vb
Dim document As XPathDocument = New XPathDocument("books.xml")
```

```csharp
XPathDocument document = new XPathDocument("books.xml");
```

## Reading XML Documents using the XmlDocument Class

 The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class is an editable in-memory representation of an XML document implementing W3C Document Object Model (DOM) Level 1 Core and Core DOM Level 2. Instances of the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class are created using one of its three constructors. You can create a new, empty [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object by calling the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class constructor with no parameters. After calling the constructor, use the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) method to load XML data into the new [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object from a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader), or [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object, as well as the `string` path to an XML file.

 The following example illustrates using the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class constructor with no parameters and the [System.Xml.XmlDocument.Load*](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument.Load*) method to read an XML document.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("books.xml")
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("books.xml");
```

## Determining the Encoding of an XML Document

 An [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object can be used to read an XML document and to create [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) and [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) objects as shown in the previous sections. However, an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object may read data that is not encoded and as a result does not provide any encoding information.

 The [System.Xml.XmlTextReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader) class inherits from the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) class, provides encoding information using its [System.Xml.XmlTextReader.Encoding](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.Encoding) property, and can be used to create an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

 For more information about the encoding information provided by the [System.Xml.XmlTextReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader) class, see the [System.Xml.XmlTextReader.Encoding](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.Encoding) property in the [System.Xml.XmlTextReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader) class reference documentation.

## Creating XPathNavigator Objects

 After you have read an XML document into either an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object, you can create an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object to select, evaluate, navigate, and in some cases, edit the underlying XML data.

 Both the [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) and [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) classes, in addition to the [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode) class, implement the [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) interface of the [System.Xml.XPath](https://learn.microsoft.com/search/?terms=System.Xml.XPath) namespace. As a result, all three classes provide a [System.Xml.XPath.IXPathNavigable.CreateNavigator*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable.CreateNavigator*) method that returns an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object.

### Editing XML Documents using the XPathNavigator Class

 In addition to selecting, evaluating, and navigating XML data, the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class can be used to edit an XML document in some cases, based on the object that created it.

 The [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class is read-only while the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class is editable and as a result, [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) objects created from an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) object cannot be used to edit an XML document while those created from an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object can. The [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class should be used to read an XML document only. In cases where you need to edit an XML document, or require access to the additional functionality provided by the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class, like event handling, the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class should be used.

 The [System.Xml.XPath.XPathNavigator.CanEdit](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CanEdit) property of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class specifies if an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object may edit XML data.

 The following table describes the value of the [System.Xml.XPath.XPathNavigator.CanEdit](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CanEdit) property for each class.

| [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) Implementation | [System.Xml.XPath.XPathNavigator.CanEdit](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CanEdit) Value |
| --- | --- |
| [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) | `false` |
| [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) | `true` |

## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)
- [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator)
- [Process XML Data Using the XPath Data Model](process-xml-data-using-the-xpath-data-model.md)
- [Accessing XML Data using XPathNavigator](accessing-xml-data-using-xpathnavigator.md)
- [Editing XML Data using XPathNavigator](editing-xml-data-using-xpathnavigator.md)
- [Schema Validation using XPathNavigator](schema-validation-using-xpathnavigator.md)
