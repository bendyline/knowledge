---
title: "getFetchDirection Method (SQLServerStatement)"
description: "getFetchDirection Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerStatement.getFetchDirection"
apitype: "Assembly"
---
# getFetchDirection Method (SQLServerStatement)


  Retrieves the direction for fetching rows from database tables that is the default for result sets that are generated from this [SQLServerStatement](sqlserverstatement-class.md) object.  
  
> **Note:**  
>  This method is not currently implemented by the  Microsoft JDBC Driver for SQL Server 
. Therefore, it will always return FETCH_UNKNOWN.  
  
## Syntax  
  
```  
  
public final int getFetchDirection()  
```  
  
## Return Value  
 An **int** that indicates the fetch direction that is specified by the [setFetchDirection](setfetchdirection-method-sqlserverstatement.md) method.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getFetchDirection method is specified by the getFetchDirection method in the java.sql.Statement interface.  
  
## Related content

- [SQLServerStatement Members](sqlserverstatement-members.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
