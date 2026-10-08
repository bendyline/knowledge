---
title: "XSL Caching (SQLXML)"
description: Learn how to cache XSL style sheets and set the XSL cache size to improve query performance in SQLXML 4.0.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "registry keys [SQLXML]"
  - "cache [SQLXML]"
  - "XSL caching [SQLXML]"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# XSL Caching (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Caching XSL style sheets improves performance. Upon its first execution, an XSL style sheet remains in memory if XSL caching is set to ON; this improves performance for subsequent processing. The default setting is ON.  
  
 You can set the XSL cache size by adding the following key in the registry:  
  
```  
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSSQLServer\Client\SQLXML4\XSLCacheSize  
```  
  
> **Caution:**  
>   Incorrectly editing the registry can severely damage your system. Before making changes to the registry, we recommend that you back up any valued data on the computer. 
  
  
 The XSL cache size should be set on the basis of the available memory and the number of XSL style sheets you are using. The default of **XSLCacheSize** size is 31. You can increase the cache size if XSL access seems slow, or decrease the cache size if memory is low.  
  
 For better performance, it is recommended that you set **XSLCacheSize** higher than the number of XSL style sheets you usually use. If **XSLCacheSize** is less than the number of XSL style sheets you have, the performance degrades as the number of XSL style sheets increases. The **XSLCacheSize** can be set to a maximum of 128.  
  
 Every time the cached XSL style sheet is used, the modification time of the XSL file is checked to determine whether it needs to be refreshed. This is because the disk copy is newer than the cache copy.  
  
## Related content

- [Template Caching (SQLXML 4.0)](template-caching-sqlxml-4-0.md)
- [Schema Caching (SQLXML 4.0)](schema-caching-sqlxml-4-0.md)
