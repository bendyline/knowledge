---
title: "getColumnType Method (SQLServerResultSetMetaData)"
description: "getColumnType Method (SQLServerResultSetMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSetMetaData.getColumnType"
apitype: "Assembly"
---
# getColumnType Method (SQLServerResultSetMetaData)


  Retrieves the SQL type of the designated column.  
  
## Syntax  
  
```  
  
public int getColumnType(int column)  
```  
  
#### Parameters  
 *column*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 An **int** that indicates the JDBC type as defined in java.sql.Types.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getColumnType method is specified by the getColumnType method in the java.sql.ResultSetMetaData interface.  
  
  Microsoft 
  SQL Server 
 JDBC Driver 3.0 has behavior changes in the DATA_TYPE column. See [SQLServerDatabaseMetaData.getColumns](getcolumns-method-sqlserverdatabasemetadata.md) for more information.  
  
## Related content

- [SQLServerResultSetMetaData Members](sqlserverresultsetmetadata-members.md)
- [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md)
