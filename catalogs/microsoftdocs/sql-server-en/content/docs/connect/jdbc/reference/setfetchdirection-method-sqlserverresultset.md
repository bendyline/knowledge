---
title: "setFetchDirection Method (SQLServerResultSet)"
description: "setFetchDirection Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.setFetchDirection"
apitype: "Assembly"
---
# setFetchDirection Method (SQLServerResultSet)


  Gives a hint as to the direction in which the rows in this [SQLServerResultSet](sqlserverresultset-class.md) object will be processed.  
  
> **Note:**  
>  This method is not currently supported by the  Microsoft JDBC Driver for SQL Server 
. If you use this method, the JDBC driver remembers the setting, but currently does not act on it.  
  
## Syntax  
  
```  
  
public void setFetchDirection(int direction)  
```  
  
#### Parameters  
 *direction*  
  
 An **int** that indicates the suggested fetch direction. Can be one of the following values:  
  
 ResultSet.FETCH_FORWARD  
  
 ResultSet.FETCH_REVERSE  
  
 ResultSet.FETCH_UNKNOWN  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setFetchDirection method is specified by the setFetchDirection method in the java.sql.ResultSet interface.  
  
 The initial value of this method is determined by the [SQLServerStatement](sqlserverstatement-class.md) object that produced this SQLServerResultSet object. The fetch direction can be changed at any time.  
  
> **Note:**  
>  Using this method when the cursor type is forward-only has no effect.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
