---
description: "Learn more about: Process XML Data Using the XPath Data Model"
title: "Process XML Data Using the XPath Data Model"
ms.date: "03/30/2017"
ms.assetid: 536c6fce-1453-4654-9c72-bca54d47e081
---
# Process XML Data Using the XPath Data Model

The [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml) namespace provides a programmatic representation of XML documents, fragments, nodes, or node-sets in-memory, using the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) or [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) classes.  
  
 The [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class provides a fast, read-only, in-memory representation of an XML document using the XPath data model. The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class provides an editable in-memory representation of an XML document implementing W3C Document Object Model (DOM) Level 1 Core and Core DOM Level 2. Both classes implement the [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) interface and return an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object used to select, evaluate, navigate, and in some cases, edit the underlying XML data.  
  
 The following sections describe the functionality of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class based on the class that returns it.  
  
## In This Section  

 [Reading XML Data using XPathDocument and XmlDocument](reading-xml-data-using-xpathdocument-and-xmldocument.md)  
 Describes how to create a read-only [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) class object to read an XML document and how to create an editable [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) class object to read and edit an XML document. This topic also describes how return an [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) object from each class to navigate and edit an XML document.  
  
 [Selecting, Evaluating and Matching XML Data using XPathNavigator](selecting-evaluating-and-matching-xml-data-using-xpathnavigator.md)  
 Describes the methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class used to select nodes in an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object using an XPath query, evaluate and examine the results of an XPath expression, and determine if a node in an XML document matches a given XPath expression.  
  
 [Accessing XML Data using XPathNavigator](accessing-xml-data-using-xpathnavigator.md)  
 Describes the methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class used to navigate nodes, extract XML data and access strongly typed XML data in an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.  
  
 [Editing XML Data using XPathNavigator](editing-xml-data-using-xpathnavigator.md)  
 Describes the methods of the [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class used to insert, modify and remove nodes and values from an XML document contained in an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.  
  
 [Schema Validation using XPathNavigator](schema-validation-using-xpathnavigator.md)  
 Describes the ways to validate the XML content contained in an [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) or [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.  
  
## See also

- [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument)
- [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)
- [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator)
- [Process XML Data Using the DOM Model](process-xml-data-using-the-dom-model.md)
