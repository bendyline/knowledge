---
title: "ISQLServerResultSet Interface"
description: "ISQLServerResultSet Interface"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ISQLServerResultSet Interface


  Represents a JDBC result set. This interface was added in  SQL Server 
 JDBC Driver 3.0.  
  
 **Package:** com.microsoft.sqlserver.jdbc  
  
 **Extends:** java.sql.ResultSet  
  
## Syntax  
  
```  
  
public interface ISQLServerResultSet  
```  
  
## Remarks  
 This interface is implemented by [SQLServerResultSet Class](sqlserverresultset-class.md).  
  
 This interface exposes the  Microsoft JDBC Driver for SQL Server 
-specific methods:  
  
| Method | For more information, see |
| --- | --- |
| public microsoft.sql.DateTimeOffset getDateTimeOffset(int) | [getDateTimeOffset](getdatetimeoffset-int-sqlserverresultset.md) |
| public microsoft.sql.DateTimeOffset getDateTimeOffset(String) | [getDateTimeOffset](getdatetimeoffset-java-lang-string-sqlserverresultset.md) |
| public void updateDateTimeOffset(int, microsoft.sql.DateTimeOffset) | [updateDateTimeOffset](updatedatetimeoffset-int-microsoft-sql-datetimeoffset-sqlserverresultset.md) |
| public void updateDateTimeOffset(String, microsoft.sql.DateTimeOffset) | [updateDateTimeOffset](updatedatetimeoffset-string-microsoft-sql-datetimeoffset-sqlserverresultset.md) |
  
 This interface exposes the following  Microsoft JDBC Driver for SQL Server 
-specific fields:  
  
| Field | For more information, see |
| --- | --- |
| public static final int CONCUR_SS_OPTIMISTIC_CC | [CONCUR_SS_OPTIMISTIC_CC](concur-ss-optimistic-cc-field-sqlserverresultset.md) |
| public static final int CONCUR_SS_OPTIMISTIC_CCVAL | [CONCUR_SS_OPTIMISTIC_CCVAL](concur-ss-optimistic-ccval-field-sqlserverresultset.md) |
| public static final int CONCUR_SS_SCROLL_LOCKS | [CONCUR_SS_SCROLL_LOCKS](concur-ss-scroll-locks-field-sqlserverresultset.md) |
| public static final int TYPE_SS_DIRECT_FORWARD_ONLY | [TYPE_SS_DIRECT_FORWARD_ONLY](type-ss-direct-forward-only-field-sqlserverresultset.md) |
| public static final int TYPE_SS_SCROLL_DYNAMIC | [TYPE_SS_SCROLL_DYNAMIC](type-ss-scroll-dynamic-field-sqlserverresultset.md) |
| public static final int TYPE_SS_SCROLL_KEYSET | [TYPE_SS_SCROLL_KEYSET](type-ss-scroll-keyset-field-sqlserverresultset.md) |
| public static final int TYPE_SS_SCROLL_STATIC | [TYPE_SS_SCROLL_STATIC](type-ss-scroll-static-field-sqlserverresultset.md) |
| public static final int TYPE_SS_SERVER_CURSOR_FORWARD_ONLY | [TYPE_SS_SERVER_CURSOR_FORWARD_ONLY](type-ss-server-cursor-forward-only-field-sqlserverresultset.md) |
  
## Related content

- [JDBC driver API reference](jdbc-driver-api-reference.md)
