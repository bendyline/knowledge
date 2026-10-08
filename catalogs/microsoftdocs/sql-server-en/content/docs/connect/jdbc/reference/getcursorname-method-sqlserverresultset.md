---
title: "getCursorName Method (SQLServerResultSet)"
description: "getCursorName Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getCursorName"
apitype: "Assembly"
---
# getCursorName Method (SQLServerResultSet)


  Retrieves the name of the SQL cursor that is used by this [SQLServerResultSet](sqlserverresultset-class.md) object.  
  
> **Note:**  
>  This method is not currently supported by the  Microsoft JDBC Driver for SQL Server 
. If called, an exception will be thrown.  
  
## Syntax  
  
```  
  
public java.lang.String getCursorName()  
```  
  
## Return Value  
 A **String** that contains the cursor name.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getCursorName method is specified by the getCursorName method in the java.sql.ResultSet interface.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
