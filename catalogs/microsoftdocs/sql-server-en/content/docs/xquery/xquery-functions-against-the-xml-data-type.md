---
title: "XQuery Functions against the xml Data Type"
description: Learn about the XQuery functions that are supported for use against the xml data type.
author: rothja
ms.author: jroth
ms.date: "03/09/2017"
ms.service: sql
ms.subservice: xml
ms.topic: reference
helpviewer_keywords:
  - "XQuery, functions"
  - "xml data type [SQL Server], XQuery"
  - "functions [SQL Server], XQuery"
dev_langs:
  - "XML"
---
# XQuery Functions against the xml Data Type

**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This topic and its subtopics describe the functions you can use when specifying XQuery against the **xml** data type. For the W3C specifications, see [http://www.w3.org/TR/2004/WD-xpath-functions-20040723](https://go.microsoft.com/fwlink/?LinkId=4873).  
  
 The XQuery functions belong to the http://www.w3.org/2004/07/xpath-functions namespace. The W3C specifications use the "fn:" namespace prefix to describe these functions. You do not have to specify the "fn:" namespace prefix explicitly when you are using the functions. Because of this and to improve readability, the namespace prefixes are generally not used in this documentation.  
  
 The following lists the XQuery functions that are supported against the **xml** data type.  
  
| Function Category | Functions |
| --- | --- |
| Functions on Numeric Values | [ceiling](numeric-values-functions-ceiling.md)<br>[floor](numeric-values-functions-floor.md)<br>[round](numeric-values-functions-round.md) |
| XQuery Functions on String Values | [concat](functions-on-string-values-concat.md)<br>[contains](functions-on-string-values-contains.md)<br>[substring](functions-on-string-values-substring.md)<br>[lower-case Function (XQuery)](functions-on-string-values-lower-case.md)<br>[string-length](functions-on-string-values-string-length.md)<br>[upper-case Function (XQuery)](functions-on-string-values-upper-case.md) |
| Functions on Boolean Values | [not](functions-on-boolean-values-not-function.md) |
| Functions on Nodes | [number](functions-on-nodes-number.md)<br>[local-name Function (XQuery)](functions-on-nodes-local-name.md)<br>[namespace-uri Function (XQuery)](functions-on-nodes-namespace-uri.md) |
| Context Functions | [last](context-functions-last-xquery.md)<br>[position](context-functions-position-xquery.md) |
| Functions on Sequences | [empty](functions-on-sequences-empty.md)<br>[distinct-values](functions-on-sequences-distinct-values.md)<br>[id Function (XQuery)](functions-on-sequences-id.md) |
| Aggregate Functions (XQuery) | [count](aggregate-functions-count.md)<br>[avg](aggregate-functions-avg.md)<br>[min](aggregate-functions-min.md)<br>[max](aggregate-functions-max.md)<br>[sum](aggregate-functions-sum.md) |
| Constructor Functions (XQuery) | [Constructor Functions](constructor-functions-xquery.md) |
| Data Accessor Functions | [string](data-accessor-functions-string-xquery.md)<br>[data](data-accessor-functions-data-xquery.md) |
| Boolean Constructor Functions (XQuery) | [true Function (XQuery)](boolean-constructor-functions-true-xquery.md)<br>[false Function (XQuery)](boolean-constructor-functions-false-xquery.md) |
| Functions Related to QNames (XQuery) | [expanded-QName (XQuery)](functions-related-to-qnames-expanded-qname.md)<br>[local-name-from-QName (XQuery)](functions-related-to-qnames-local-name-from-qname.md)<br>[namespace-uri-from-QName (XQuery)](functions-related-to-qnames-namespace-uri-from-qname.md) |
| SQL Server XQuery Extension Functions | [sql:column() function (XQuery)](xquery-extension-functions-sql-column.md)<br>[sql:variable() function (XQuery)](xquery-extension-functions-sql-variable.md) |

## Related content

- [xml Data Type Methods](../t-sql/xml/xml-data-type-methods.md)
- [XQuery Language Reference (SQL Server)](xquery-language-reference-sql-server.md)
- [XML data (SQL Server)](../relational-databases/xml/xml-data-sql-server.md)
