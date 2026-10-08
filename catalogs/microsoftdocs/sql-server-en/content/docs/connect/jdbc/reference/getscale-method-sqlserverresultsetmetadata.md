---
title: "getScale Method (SQLServerResultSetMetaData)"
description: "getScale Method (SQLServerResultSetMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSetMetaData.getScale"
apitype: "Assembly"
---
# getScale Method (SQLServerResultSetMetaData)


  Gets the number of digits to the right of the decimal point for the designated column.  
  
## Syntax  
  
```  
  
public int getScale(int column)  
```  
  
#### Parameters  
 *column*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 An **int** that indicates the scale of the column.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getScale method is specified by the getScale method in the java.sql.ResultSetMetaData interface.  
  
  Microsoft 
  SQL Server 
 JDBC Driver 3.0 has behavior changes in the DECIMAL_DIGITS column. See [SQLServerDatabaseMetaData.getColumns](getcolumns-method-sqlserverdatabasemetadata.md) for more information.  
  
## Related content

- [SQLServerResultSetMetaData Members](sqlserverresultsetmetadata-members.md)
- [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md)
