---
title: "Database Element for Workload (DTA)"
description: In the dta utility, the Database element for Workload, specifies the database where the workload trace table is located.
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

# Database Element for Workload (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies the database where the workload trace table is located.  
  
## Syntax  
  
```  
  
<Workload>  
  <Database>  
   ...code removed here...  
  </Database>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| **Data type and length** | None. |
| **Default value** | None. |
| **Occurrence** | Required once if no other type of workload is specified. You must specify an **EventString**, a **File**, or a **Database** child element for the **Workload** parent, but only one type can be used. For example, if you specify a workload with the **Database** element, you cannot also specify a workload with the **File** element in the same XML input file. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| **Parent element** | [Workload Element (DTA)](workload-element-dta.md) |
| **Child elements** | [Name Element for Database (DTA)](name-element-for-database-dta.md)<br /><br /> [Schema Element for Database (DTA)](schema-element-for-database-dta.md) |
  
## Remarks  
 This element is of the **DatabaseDetailsTypecomplexType** name in the Database Engine Tuning Advisor XML schema. Do not confuse this **Database** element with the one whose root parent is the **Configuration** element. (See [Database Element for Configuration (DTA)](database-element-for-configuration-dta.md).)  
  
## Example  
 For a usage example of this **Database** element, see the code example in [Workload Element (DTA)](workload-element-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
