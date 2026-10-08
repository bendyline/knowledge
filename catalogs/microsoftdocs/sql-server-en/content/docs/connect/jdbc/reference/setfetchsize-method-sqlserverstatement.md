---
title: "setFetchSize Method (SQLServerStatement)"
description: "setFetchSize Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerStatement.setFetchSize"
apitype: "Assembly"
---
# setFetchSize Method (SQLServerStatement)


  Gives the  Microsoft JDBC Driver for SQL Server 
 a hint as to the number of rows that should be fetched from the database when more rows are needed.  
  
## Syntax  
  
```  
  
public final void setFetchSize(int rows)  
```  
  
#### Parameters  
 *rows*  
  
 An **int** that indicates the number of rows to fetch.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setFetchSize method is specified by the setFetchSize method in the java.sql.Statement interface.  
  
## Related content

- [SQLServerStatement Members](sqlserverstatement-members.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
