---
title: "executeUpdate Method ()"
description: "executeUpdate Method ()"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerPreparedStatement.executeUpdate ()"
apitype: "Assembly"
---
# executeUpdate Method ()


  Runs the SQL statement in this [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) object, which must be a SQL INSERT, UPDATE, MERGE, or DELETE statement; or a SQL statement that returns nothing, such as a DDL statement.  
  
## Syntax  
  
```  
  
public int executeUpdate()  
```  
  
## Return Value  
 An **int** that indicates the number of rows affected, or 0 if using a DDL statement.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This executeUpdate method is specified by the executeUpdate method in the java.sql.PreparedStatement interface.  
  
## Related content

- [executeUpdate Method (SQLServerPreparedStatement)](executeupdate-method-sqlserverpreparedstatement.md)
- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
