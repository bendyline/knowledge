---
title: Annotations - LINQ to XML
description: Learn how to use annotations in LINQ to XML to associate any arbitrary object of any arbitrary type with any XML component in an XML tree.
ms.date: 07/20/2015
ms.assetid: 54e7b9d0-07f5-488f-9065-b6e6b870f810
---
# LINQ to XML annotations (LINQ to XML)

Annotations in LINQ to XML enable you to associate any arbitrary object of any arbitrary type with any XML component in an XML tree.

To add an annotation to an XML component, such as an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute), you call the [System.Xml.Linq.XObject.AddAnnotation*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject.AddAnnotation*) method. You retrieve annotations by type.

Note that annotations aren't part of the XML infoset; they're not serialized or deserialized.

## Methods

You can use the following methods when working with annotations:

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XObject.AddAnnotation*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject.AddAnnotation*) | Adds an object to the annotation list of an [System.Xml.Linq.XObject](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject). |
| [System.Xml.Linq.XObject.Annotation*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject.Annotation*) | Gets the first annotation object of the specified type from an [System.Xml.Linq.XObject](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject). |
| [System.Xml.Linq.XObject.Annotations*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject.Annotations*) | Gets a collection of annotations of the specified type for an [System.Xml.Linq.XObject](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject). |
| [System.Xml.Linq.XObject.RemoveAnnotations*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject.RemoveAnnotations*) | Removes the annotations of the specified type from an [System.Xml.Linq.XObject](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XObject). |
