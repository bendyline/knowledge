---
title: "getBytes Method (SQLServerResultSet)"
description: "getBytes Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getBytes"
apitype: "Assembly"
---
# getBytes Method (SQLServerResultSet)


  Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **byte** array in the Java programming language.  
  
## Overload List  
  
| Name | Description |
| --- | --- |
| [getBytes (int)](getbytes-method-int-sqlserverresultset.md) | Retrieves the value of the designated column index in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **byte** array in the Java programming language. |
| [getBytes (java.lang.String)](getbytes-method-java-lang-string-sqlserverresultset.md) | Retrieves the value of the designated column name in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **byte** array in the Java programming language. |
  
## Remarks  
 In a previous version of the  Microsoft JDBC Driver for SQL Server 
, you could use SQLServerResultSet.getBytes to convert values between byte arrays and  SQL Server 
 data type **date**, **time**, **datetime2**, or **datetimeoffset**. Now, using this method with those data types will cause an exception indicating that the conversion is not supported.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
