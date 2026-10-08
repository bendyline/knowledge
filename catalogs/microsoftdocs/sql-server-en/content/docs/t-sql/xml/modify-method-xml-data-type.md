---
title: modify() Method (xml Data Type)
description: "modify() Method (xml Data Type)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "07/26/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "modify() method"
  - "modify method"
dev_langs:
  - "TSQL"
---
# modify() Method (xml Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Modifies the contents of an XML document. Use this method to modify the content of an **xml** type variable or column. This method takes an XML DML statement to insert, update, or delete nodes from XML data. The **modify()** method of the **xml** data type can only be used in the SET clause of an UPDATE statement.  
  
## Syntax  
  
```syntaxsql
modify (XML_DML)  
```  
  
## Arguments
 XML_DML  
 Is a string in XML Data Manipulation Language (DML). The XML document is updated according to this expression.  
  
> **Note:**  
>  An error is returned if the **modify()** method is called on a null value or results in a null value.  
  
## Examples  
 Because the **modify()** method requires a string in the XML Data Manipulation Language (DML), the samples for **modify()** are contained in the topics that describe the XML DML statements. For these examples, see [insert (XML DML)](insert-xml-dml.md), [delete (XML DML)](delete-xml-dml.md) and [replace value of (XML DML)](replace-value-of-xml-dml.md).  
  
## Related content

- [Create instances of XML data](../../relational-databases/xml/create-instances-of-xml-data.md)
- [xml Data Type Methods](xml-data-type-methods.md)
- [XML Data Modification Language (XML DML)](xml-data-modification-language-xml-dml.md)
