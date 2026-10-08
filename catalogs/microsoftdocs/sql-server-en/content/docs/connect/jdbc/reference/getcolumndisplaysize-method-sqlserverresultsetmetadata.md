---
title: "getColumnDisplaySize Method (SQLServerResultSetMetaData)"
description: "getColumnDisplaySize Method (SQLServerResultSetMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSetMetaData.getColumnDisplaySize"
apitype: "Assembly"
---
# getColumnDisplaySize Method (SQLServerResultSetMetaData)


  Returns the normal maximum width, in characters, for the designated column.  
  
## Syntax  
  
```  
  
public int getColumnDisplaySize(int column)  
```  
  
#### Parameters  
 *column*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 An **int** that indicates the maximum width. If the width is not known, returns 0.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getColumnDisplaySize method is specified by the getColumnDisplaySize method in the java.sql.ResultSetMetaData interface.  
  
  Microsoft 
  SQL Server 
 JDBC Driver 3.0 has behavior changes in the COLUMN_SIZE column. See [SQLServerDatabaseMetaData.getColumns](getcolumns-method-sqlserverdatabasemetadata.md) for more information.  
  
## Related content

- [SQLServerResultSetMetaData Members](sqlserverresultsetmetadata-members.md)
- [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md)
