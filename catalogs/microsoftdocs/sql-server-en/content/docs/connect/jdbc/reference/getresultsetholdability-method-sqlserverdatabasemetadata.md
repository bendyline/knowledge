---
title: "getResultSetHoldability Method (SQLServerDatabaseMetaData)"
description: "getResultSetHoldability Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData,getResultSetHoldability"
apitype: "Assembly"
---
# getResultSetHoldability Method (SQLServerDatabaseMetaData)


  Retrieves the default holdability of result sets for this database.  
  
## Syntax  
  
```  
  
public int getResultSetHoldability()  
```  
  
## Return Value  
 An **int** that indicates the default holdability.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getResultSetHoldability method is specified by the getResultSetHoldability method in the java.sql.DatabaseMetaData interface.  
  
 When using the  Microsoft JDBC Driver for SQL Server 
 with a  SQL Server 
 database, this methods returns 1, which is equivalent to the ResultSet.HOLD_CURSORS_OVER_COMMIT constant.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
