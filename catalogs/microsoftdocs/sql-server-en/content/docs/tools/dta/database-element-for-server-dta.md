---
title: "Database Element for Server (DTA)"
description: In the dta utility, the Database element for Server specifies the database you want to tune on a specific server.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/01/2017
ms.service: sql
ms.subservice: tools-other
ms.topic: reference
ms.collection:
  - data-tools
helpviewer_keywords:
  - "Database element"
dev_langs:
  - "XML"
---

# Database Element for Server (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies the database you want to tune on a specific server.  
  
## Syntax  
  
```  
  
<Server>  
...code removed here...  
    <Database>...</Database>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| Data type and length | None. |
| Default value | None. |
| Occurrence | Required one or more times per **Server** element. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| Parent element | [Server Element (DTA)](server-element-dta.md) |
| Child elements | [Name Element for Database (DTA)](name-element-for-database-dta.md)<br /><br /> [Schema Element for Database (DTA)](schema-element-for-database-dta.md) |
  
## Remarks  
 This element is of the **DatabaseDetailsTypecomplexType** name in the Database Engine Tuning Advisor XML schema. Do not confuse this **Database** element with the one whose root parent is the **Configuration** element. For more information, see [Database Element for Configuration (DTA)](database-element-for-configuration-dta.md).  
  
## Example  
 For a usage example of the **Database** element, see [Server Element (DTA)](server-element-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
