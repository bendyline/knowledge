---
description: "Learn more about: Removing Attributes from an Element Node in the DOM"
title: "Removing Attributes from an Element Node in the DOM"
ms.date: "03/30/2017"
ms.topic: how-to
---
# Removing Attributes from an Element Node in the DOM

There are many ways to remove attributes. One technique is to remove them from the attribute collection. To do this, the following steps are performed:

1. Get the attribute collection from the element using `XmlAttributeCollection attrs = elem.Attributes;`.

2. Remove the attribute from the attribute collection using one of three methods:

    - Use [System.Xml.XmlAttributeCollection.Remove*](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection.Remove*) to remove a specific attribute.

    - Use [System.Xml.XmlAttributeCollection.RemoveAll*](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection.RemoveAll*) to remove all attributes from the collection and leave the element with no attributes.

    - Use [System.Xml.XmlAttributeCollection.RemoveAt*](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection.RemoveAt*) to remove an attribute from the attribute collection by using its index number.

 The following methods remove attributes from the element node.

- Use [System.Xml.XmlElement.RemoveAllAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement.RemoveAllAttributes*) to remove the attribute collection.

- Use [System.Xml.XmlElement.RemoveAttribute*](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement.RemoveAttribute*) to remove a single attribute by name from the collection.

- Use [System.Xml.XmlElement.RemoveAttributeAt*](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement.RemoveAttributeAt*) to remove a single attribute by index number from the collection.

 One more alternative is to get the element, get the attribute from the attribute collection, and remove the attribute node directly. To get the attribute from the attribute collection, you can use a name, `XmlAttribute attr = attrs["attr_name"];`, an index `XmlAttribute attr = attrs[0];`, or by fully qualifying the name with the namespace `XmlAttribute attr = attrs["attr_localName", "attr_namespace"]`.

 Regardless of the method used to remove attributes, there are special limitations on removing attributes that are defined as default attributes in the document type definition (DTD). Default attributes cannot be removed unless the element they belong to is removed. Default attributes are always present for elements that have default attributes declared. Removing a default attribute from an [System.Xml.XmlAttributeCollection](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection) or from the [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) results in a replacement attribute inserted into the [System.Xml.XmlAttributeCollection](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection) of the element, initialized to the default value that was declared. If you have an element defined as `<book att1="1" att2="2" att3="3"></book>`, then you have a `book` element with three default attributes declared. The XML Document Object Model (DOM) implementation guarantees that as long as this `book` element exists, it has these three default attributes of `att1`, `att2`, and `att3`.

 When called with an [System.Xml.XmlAttribute](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttribute), the [System.Xml.XmlAttributeCollection.RemoveAll*](https://learn.microsoft.com/search/?terms=System.Xml.XmlAttributeCollection.RemoveAll*) method sets the value of the attribute to String.Empty, as an attribute cannot exist without a value.

## See also

- [XML Document Object Model (DOM)](xml-document-object-model-dom.md)
