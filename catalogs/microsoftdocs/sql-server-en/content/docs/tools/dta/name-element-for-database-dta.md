---
title: "Name Element for Database (DTA)"
description: In the dta utility, the Name element for Database specifies the name of a database that you want to tune.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/01/2017
ms.service: sql
ms.subservice: tools-other
ms.topic: reference
ms.collection:
  - data-tools
helpviewer_keywords:
  - "Name element"
dev_langs:
  - "XML"
---

# Name Element for Database (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies the name of a database that you want to tune.  
  
## Syntax  
  
```  
  
<Server>  
    <Database>  
        <Name>...</Name>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| **Data type and length** | **string**, unlimited length. |
| **Default value** | None. |
| **Occurrence** | Required once per **Database** element. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| **Parent element** | [Database Element for Server (DTA)](database-element-for-server-dta.md) |
| **Child elements** | None. |
  
## Example  
 For a usage example of this element, see [Server Element (DTA)](server-element-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
