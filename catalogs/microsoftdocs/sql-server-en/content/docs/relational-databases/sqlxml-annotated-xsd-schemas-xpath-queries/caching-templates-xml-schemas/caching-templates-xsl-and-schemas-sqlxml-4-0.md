---
title: "Caching Templates, XSL, and Schemas (SQLXML)"
description: View information about caching templates, XSL, and schemas in SQLXML 4.0.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "SQLXML, caching"
  - "cache [SQLXML]"
  - "memory [SQLXML]"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Caching Templates, XSL, and Schemas (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  To improve performance,  Microsoft 
 SQLXML 4.0 supports caching templates, XSL, and schemas.  
  
 All schemas, templates, and XSL files (except the files from an https:// or ftp:// location) are cached. The cached files remain in memory while the process is running. As the process exits, all the cache is lost. Therefore, if you run one process per query, the caching benefit may not be noticeable.  
  
 The topics in this section provide more information about caching.  
  
## In This Section  
 [Template Caching (SQLXML 4.0)](template-caching-sqlxml-4-0.md)  
 Describes and provides a registry key for template caching.  
  
 [XSL Caching (SQLXML 4.0)](xsl-caching-sqlxml-4-0.md)  
 Describes and provides a registry key for XSL caching.  
  
 [Schema Caching (SQLXML 4.0)](schema-caching-sqlxml-4-0.md)  
 Discusses SQLXML side-by-side installation issues related to schema caching, and provides registry keys for schema caching.
