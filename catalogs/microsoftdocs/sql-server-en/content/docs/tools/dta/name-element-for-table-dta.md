---
title: "Name Element for Table (DTA)"
description: In the dta utility, the Name element for Table specifies a table name for tuning. This article describes that element.
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

# Name Element for Table (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies a table name for tuning.  
  
## Syntax  
  
```  
  
<Schema>  
    <Table>  
        <Name>...</Name>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| **Data type and length** | **string**, between 1 and 255 characters. |
| **Default value** | None. |
| **Occurrence** | Required. Once for each **Table** element. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| **Parent element** | [Table Element for Schema (DTA)](table-element-for-schema-dta.md) |
| **Child elements** | None. |
  
## Example  
 For a usage example, see [Server Element (DTA)](server-element-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
