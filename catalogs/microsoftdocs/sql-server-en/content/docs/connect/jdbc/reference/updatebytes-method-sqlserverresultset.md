---
title: "updateBytes Method (SQLServerResultSet)"
description: "updateBytes Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.updateBytes"
apitype: "Assembly"
---
# updateBytes Method (SQLServerResultSet)


  Updates the designated column with an array of **byte** values.  
  
## Overload List  
  
| Name | Description |
| --- | --- |
| [updateBytes (int, byte\[\])](updatebytes-method-int-byte.md) | Updates the designated column with an array of **byte** values given the column index. |
| [updateBytes (java.lang.String, byte\[\])](updatebytes-method-java-lang-string-byte.md) | Updates the designated column with an array of **byte** values given the column name. |
  
## Remarks  
 In a previous version of  Microsoft JDBC Driver for SQL Server 
, you could use SQLServerResultSet.updateBytes to convert values between byte arrays and  SQL Server 
 data type **date**, **time**, **datetime2**, or **datetimeoffset**. Now, using this method with those data types will cause an exception indicating that the conversion is not supported.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
