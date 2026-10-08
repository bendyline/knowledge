---
title: "getColumnTypeName Method (SQLServerResultSetMetaData)"
description: "getColumnTypeName Method (SQLServerResultSetMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSetMetaData.getColumnTypeName"
apitype: "Assembly"
---
# getColumnTypeName Method (SQLServerResultSetMetaData)


  Retrieves the database-specific type name for the designated column.  
  
## Syntax  
  
```  
  
public java.lang.String getColumnTypeName(int column)  
```  
  
#### Parameters  
 *column*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 A **String** that contains the server name for the column.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getColumnTypeName method is specified by the getColumnTypeName method in the java.sql.ResultSetMetaData interface.  
  
  Microsoft 
  SQL Server 
 JDBC Driver 3.0 has behavior changes in the TYPE_NAME column. See [SQLServerDatabaseMetaData.getColumns](getcolumns-method-sqlserverdatabasemetadata.md) for more information.  
  
## Related content

- [SQLServerResultSetMetaData Members](sqlserverresultsetmetadata-members.md)
- [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md)
