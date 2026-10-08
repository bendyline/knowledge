---
title: "srv_setutype (Extended Stored Procedure API)"
description: Learn about srv_setutype. srv_setutype sets the user-defined data type for a column in a row.
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: stored-procedures
ms.topic: "reference"
helpviewer_keywords:
  - "srv_setutype"
dev_langs:
  - "C++"
apilocation: opends60.dll
apiname: srv_setutype
apitype: "DLLExport"
---
# srv_setutype (Extended Stored Procedure API)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
    
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use CLR integration instead.  
  
 Sets the user-defined data type for a column in a row.  
  
## Syntax  
  
```  
  
int srv_setutype (  
SRV_PROC *  
srvproc  
,  
int   
column  
,   
DBINT  
user_type   
);  
```  
  
## Arguments  
 *srvproc*  
 Is a pointer to the SRV_PROC structure that is the handle for a particular client connection. The structure contains information the Extended Stored Procedure API library uses to manage communication and data between the application and the client.  
  
 *column*  
 Indicates which column to set. Columns are numbered beginning with 1.  
  
 *user_type*  
 Specifies the user-defined data type code.  
  
## Returns  
 SUCCEED or FAIL. Returns FAIL if the column does not exist.  
  
## Remarks  
 A column has two data types: its actual data type and its user-defined data type. The user-defined data type is used by  Microsoft 
  SQL Server 
 to store the actual user-defined data type of the column, if any, and column description information, such as nullability and updatability, for the column.  
  
 The **srv_setutype** function can be called any time that *column* has been defined with **srv_describe** and before the last row has been sent.  
  
> **Important:**  
>  You should thoroughly review the source code of extended stored procedures, and you should test the compiled DLLs before you install them on a production server. For information about security review and testing, see this [Microsoft Web site](https://www.microsoft.com/msrc?rtc=1).  
  
## Related content

- [srv_describe (Extended Stored Procedure API)](srv-describe-extended-stored-procedure-api.md)
