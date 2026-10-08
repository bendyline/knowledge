---
title: "setFetchDirection Method (SQLServerStatement)"
description: "setFetchDirection Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerStatement.setFetchDirection"
apitype: "Assembly"
---
# setFetchDirection Method (SQLServerStatement)


  Gives  Microsoft JDBC Driver for SQL Server 
 a hint as to the direction in which result set rows should be processed.  
  
> **Note:**  
>  The JDBC driver currently ignores the hint that is given by this method.  
  
## Syntax  
  
```  
  
public final void setFetchDirection(int nDir)  
```  
  
#### Parameters  
 *nDir*  
  
 An **int** that indicates the row processing direction, which can be one of the following values:  
  
 FETCH_FORWARD  
  
 FETCH_REVERSE  
  
 FETCH_UNKNOWN  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setFetchDirection method is specified by the setFetchDirection method in the java.sql.Statement interface.  
  
## Related content

- [SQLServerStatement Members](sqlserverstatement-members.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
