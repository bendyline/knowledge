---
title: "Database Element for Configuration (DTA)"
description: In the dta utility, the Database element for Configuration specifies the database against which you want to evaluate a configuration.
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

# Database Element for Configuration (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Specifies the database against which you want the Database Engine Tuning Advisor to evaluate the hypothetical configuration (specified by the **Configuration** element).  
  
## Syntax  
  
```  
  
<Server>  
...code removed here...  
    <Database>...</Database>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| **Data type and length** | None. |
| **Default value** | None. |
| **Occurrence** | Required one or more times per **Server** element. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| **Parent element** | [Server Element for Configuration (DTA)](server-element-for-configuration-dta.md) |
| **Child elements** | [Name Element for Database (DTA)](name-element-for-database-dta.md)<br /><br /> [Schema Element for Database (DTA)](schema-element-for-database-dta.md)<br /><br /> [Recommendation Element (DTA)](recommendation-element-dta.md) |
  
## Remarks  
 This element is of the **DatabaseTypecomplexType** name in the Database Engine Tuning Advisor XML schema. Do not confuse this **Database** element with the one whose root parent is the **Server** element, which occurs at the top of the XML input file. For more information, see [Database Element for Server (DTA)](database-element-for-server-dta.md).  
  
## Example  
 For a usage example of this **Database** element, see the [XML Input File Sample with User-specified Configuration (DTA)](xml-input-file-sample-with-user-specified-configuration-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
