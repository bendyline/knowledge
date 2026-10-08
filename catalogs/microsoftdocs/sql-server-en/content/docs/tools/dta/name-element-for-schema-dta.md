---
title: "Name Element for Schema (DTA)"
description: In the dta utility, the Name element for schema the contains name of the schema. This article describes that element.
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

# Name Element for Schema (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Contains name of the schema.  
  
## Syntax  
  
```  
  
<Database>  
...code removed here  
    <Schema>  
        <Name>...</Name>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| **Data type and length** | **string**, between 1 and 255 characters |
| **Default value** | None. |
| **Occurrence** | Required once per **Schema** element. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| **Parent element** | [Schema Element for Database (DTA)](schema-element-for-database-dta.md) |
| **Child elements** | None. |
  
## Example  
 For a usage example of this element, see [Server Element (DTA)](server-element-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
