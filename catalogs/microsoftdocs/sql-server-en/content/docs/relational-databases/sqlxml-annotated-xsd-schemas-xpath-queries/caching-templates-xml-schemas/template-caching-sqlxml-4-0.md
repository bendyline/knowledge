---
title: "Template Caching (SQLXML)"
description: Learn how to significantly improve performance when executing templates by using template caching in SQLXML 4.0.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "registry keys [SQLXML]"
  - "cache [SQLXML]"
  - "templates [SQLXML], caching"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Template Caching (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Template caching significantly improves performance. If template caching is set, the template remains in memory upon its first execution. This improves the performance for the subsequent execution of the template.  
  
 You can set the template cache size by adding the following key in the registry:  
  
```  
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSSQLServer\Client\SQLXML4\TemplateCacheSize  
```  
  
> **Caution:**  
>   Incorrectly editing the registry can severely damage your system. Before making changes to the registry, we recommend that you back up any valued data on the computer. 
  
  
 The template size should be set on the basis of the available memory and the number of templates you are using. The default of **TemplateCacheSize** size is 31. You can increase the cache size if template access seems slow, or decrease the cache size if memory is low.  
  
 For better performance, it is recommended that you set **TemplateCacheSize** higher than the number of templates you usually use. If **TemplateCacheSize** is less than the number of templates you have, performance degrades as the number of templates increase. The **TemplateCacheSize** can be set to a maximum of 128.  
  
 Every time a cached template is used, the modification time of the template file is checked to see whether it needs to be refreshed. This is because the disk copy is newer than the cache copy.  
  
> **Note:**  
>  Template parameters and command properties are not cached.  
  
## Related content

- [Schema Caching (SQLXML 4.0)](schema-caching-sqlxml-4-0.md)
- [XSL Caching (SQLXML 4.0)](xsl-caching-sqlxml-4-0.md)
