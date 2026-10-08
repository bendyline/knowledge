---
title: "getWarnings Method (SQLServerResultSet)"
description: "getWarnings Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getWarnings"
apitype: "Assembly"
---
# getWarnings Method (SQLServerResultSet)


  Retrieves the first warning reported by calls on this [SQLServerResultSet](sqlserverresultset-class.md) object.  
  
> **Note:**  
>  This method is not currently supported by the  Microsoft JDBC Driver for SQL Server 
. If called this method will always return a null value.  
  
## Syntax  
  
```  
  
public java.sql.SQLWarning getWarnings()  
```  
  
## Return Value  
 An SQLWarning object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getWarnings method is specified by the getWarnings method in the java.sql.ResultSet interface.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
