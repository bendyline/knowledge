---
title: xml Data Type Methods
description: "xml Data Type Methods"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "xml data type [SQL Server], methods"
  - "methods [XML in SQL Server]"
dev_langs:
  - "TSQL"
---
# xml Data Type Methods

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  You can use the **xml** data type methods to query an XML instance stored in a variable or column of **xml** type. The topics in this section describe how to use the **xml** data type methods.  
  
## In This Section  
  
| Topic | Description |
| --- | --- |
| [query() Method (xml Data Type)](query-method-xml-data-type.md) | Describes how to use the query() method to query over an XML instance. |
| [value() Method (xml Data Type)](value-method-xml-data-type.md) | Describes how to use the value() method to retrieve a value of SQL type from an XML instance. |
| [exist() Method (xml Data Type)](exist-method-xml-data-type.md) | Describes how to use the exist() method to determine whether a query returns a nonempty result. |
| [modify() Method (xml Data Type)](modify-method-xml-data-type.md) | Describes how to use the modify() method to specify [XML Data Modification Language (XML DML)](xml-data-modification-language-xml-dml.md) statements to perform updates. |
| [nodes() Method (xml Data Type)](nodes-method-xml-data-type.md) | Describes how to use the nodes() method to shred XML into multiple rows, which propagates parts of XML documents into rowsets. |
| [Binding Relational Data Inside XML Data](binding-relational-data-inside-xml-data.md) | Describes how to bind non-XML data inside XML. |
| [Guidelines for Using xml Data Type Methods](guidelines-for-using-xml-data-type-methods.md) | Describes guidelines for using the **xml** data type methods. |
  
 You call these methods by using the user-defined type method invocation syntax. For example:  
  
```sql
SELECT XmlCol.query(' ... ')  
FROM Table  
```  
  
> **Note:**  
>  The **xml** data type methods **query()**, **value()**, and **exist()** return NULL if executed against a NULL XML instance. Also, **modify()** does not return anything, but **nodes()** returns rowsets and an empty rowset with a NULL input.  
  
## Related content

- [Compare typed XML to untyped XML](../../relational-databases/xml/compare-typed-xml-to-untyped-xml.md)
- [Create instances of XML data](../../relational-databases/xml/create-instances-of-xml-data.md)
