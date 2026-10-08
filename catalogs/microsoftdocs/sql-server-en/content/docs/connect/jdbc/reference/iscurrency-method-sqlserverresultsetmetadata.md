---
title: "isCurrency Method (SQLServerResultSetMetaData)"
description: "isCurrency Method (SQLServerResultSetMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSetMetaData.isCurrency"
apitype: "Assembly"
---
# isCurrency Method (SQLServerResultSetMetaData)


  Indicates whether the designated column is a cash value.  
  
## Syntax  
  
```  
  
public boolean isCurrency(int column)  
```  
  
#### Parameters  
 *column*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 **true** if the column is a cash value. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This isCurrency method is specified by the isCurrency method in the java.sql.ResultSetMetaData interface.  
  
 This method will return **true** only with  SQL Server 
 money and smallmoney data types.  
  
## Related content

- [SQLServerResultSetMetaData Methods](sqlserverresultsetmetadata-methods.md)
- [SQLServerResultSetMetaData Members](sqlserverresultsetmetadata-members.md)
- [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md)
