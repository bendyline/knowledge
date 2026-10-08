---
description: "Learn more about: Mapping XML Data Types to CLR Types"
title: "Mapping XML Data Types to CLR Types"
ms.date: "03/30/2017"
ms.assetid: cabdfcad-f359-479b-b71c-8b2fad42ca49
---

# Mapping XML Data Types to CLR Types

The following table describes the default mapping between the XML data types and the common language runtime (CLR) types.

> **Note:**
> The `xs` and the `xdt` prefixes are mapped to the <https://www.w3.org/2001/XMLSchema> and the <https://www.w3.org/2003/05/xpath-datatypes> namespace URIs respectively.

| XML Type | CLR Type |
| --- | --- |
| `xs:anyURI` | [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) |
| `xs:base64Binary` | `Byte[]` |
| `xs:boolean` | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) |
| `xs:byte` | [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) |
| `xs:date` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:dateTime` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:decimal` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `xs:double` | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) |
| `xs:duration` | [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) |
| `xs:ENTITIES` | `String[]` |
| `xs:ENTITY` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:float` | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) |
| `xs:gDay` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:gMonthDay` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:gYear` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:gYearMonth` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:hexBinary` | `Byte[]` |
| `xs:ID` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:IDREF` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:IDREFS` | `String[]` |
| `xs:int` | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) |
| `xs:integer` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `xs:language` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:long` | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) |
| `xs:gMonth` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:Name` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:NCName` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:negativeInteger` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `xs:NMTOKEN` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:NMTOKENS` | `String[]` |
| `xs:nonNegativeInteger` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `xs:nonPositiveInteger` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `xs:normalizedString` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:NOTATION` | [System.Xml.XmlQualifiedName](https://learn.microsoft.com/search/?terms=System.Xml.XmlQualifiedName) |
| `xs:positiveInteger` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `xs:QName` | [System.Xml.XmlQualifiedName](https://learn.microsoft.com/search/?terms=System.Xml.XmlQualifiedName) |
| `xs:short` | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) |
| `xs:string` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:time` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `xs:token` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xs:unsignedByte` | [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) |
| `xs:unsignedInt` | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) |
| `xs:unsignedLong` | [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) |
| `xs:unsignedShort` | [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) |
| `xdt:dayTimeDuration` | [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) |
| `xdt:yearMonthDuration` | [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) |
| `xdt:untypedAtomic` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `xdt:anyAtomicType` | [System.Object](https://learn.microsoft.com/search/?terms=System.Object) |
| `xs:anySimpleType` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| Document node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |
| Element node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |
| Attribute node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |
| Namespace node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |
| Text node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |
| Comment node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |
| Processing instruction node | [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) |

## See also

- [Type Support in the System.Xml Classes](type-support-in-the-system-xml-classes.md)
