---
title: "bcp_getcolfmt"
description: "bcp_getcolfmt"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "bcp_getcolfmt function"
apilocation: "sqlncli11.dll"
apiname: "bcp_getcolfmt"
apitype: "DLLExport"
---
# bcp_getcolfmt

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  Used to find the column format property value.  
  
## Syntax  
  
```  
  
RETCODE bcp_getcolfmt (  
        HDBC hdbc,  
        INT field,  
        INT property,  
        void* pValue,  
        INT cbvalue,  
        INT* pcbLen);  
```  
  
## Arguments  
 *hdbc*  
 Is the bulk copy-enabled ODBC connection handle.  
  
 *field*  
 Is the column number for which the property is retrieved.  
  
 *property*  
 Is one of the property constants.  
  
 *pValue*  
 Is the pointer to the buffer from which to retrieve the property value.  
  
 *cbValue*  
 Is the length of the property buffer in bytes.  
  
 *pcbLen*  
 Pointer to length of the data that is being returned in the property buffer.  
  
## Returns  
 SUCCEED or FAIL.  
  
## Remarks  
 Column format property values are listed in the [bcp_setcolfmt](bcp-setcolfmt.md) topic. The column format property values are set by calling the **bcp_setcolfmt** function, and the **bcp_getcolfmt** function is used to find the column format property value.  
  
 Behavior changes may be observed when connecting to a  SQL Server 2012 (11.x) 
 (or later) server computer, compared to earlier  SQL Server 
 versions. For more information, see [Metadata Discovery](../native-client/features/metadata-discovery.md).  
  
## bcp_getcolfmt Support for Enhanced Date and Time Features  
 The types used with the **BCP_FMT_TYPE** property for date/time types are as specified in [Bulk Copy Changes for Enhanced Date and Time Types (OLE DB and ODBC)](../native-client-odbc-date-time/bulk-copy-changes-for-enhanced-date-and-time-types-ole-db-and-odbc.md).  
  
 For more information, see [Date and Time Improvements (ODBC)](../native-client-odbc-date-time/date-and-time-improvements-odbc.md).  
  
## Related content

- [SQL Server Driver Extensions - Bulk Copy Functions](sql-server-driver-extensions-bulk-copy-functions.md)
