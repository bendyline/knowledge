---
title: "srv_alloc (Extended Stored Procedure API)"
description: Learn about srv_alloc in the Extended Stored Procedure API and how it allocates memory dynamically.
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: stored-procedures
ms.topic: "reference"
helpviewer_keywords:
  - "srv_alloc"
dev_langs:
  - "C++"
apilocation: opends60.dll
apiname: srv_alloc
apitype: "DLLExport"
---
# srv_alloc (Extended Stored Procedure API)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
    
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use CLR integration instead.  
  
 Allocates memory dynamically.  
  
## Syntax  
  
```  
  
void * srv_alloc ( DBINT  
size  
);  
```  
  
## Arguments  
 *size*  
 Specifies the number of bytes to allocate.  
  
## Returns  
 A pointer to the newly allocated space. If *size* bytes cannot be allocated, a null pointer is returned.  
  
## Remarks  
 The **srv_alloc** function is equivalent to the  Microsoft 
 Windows API  **GlobalAlloc** function. Normal Windows API C run-time memory management functions can be used in an Extended Stored Procedure API application.  
  
> **Important:**  
>  You should thoroughly review the source code of extended stored procedures, and you should test the compiled DLLs before you install them on a production server. For information about security review and testing, see this [Microsoft Web site](https://go.microsoft.com/fwlink/?LinkID=54761&amp;clcid=0x409https://msdn.microsoft.com/security/).
