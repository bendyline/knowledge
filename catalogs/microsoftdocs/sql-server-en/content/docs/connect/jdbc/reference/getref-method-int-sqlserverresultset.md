---
title: "getRef Method (int) (SQLServerResultSet)"
description: "getRef Method (int) (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getRef (int)"
apitype: "Assembly"
---
# getRef Method (int) (SQLServerResultSet)


  Retrieves the value of the designated column index in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a Ref object in the Java programming language.  
  
## Syntax  
  
```  
  
public java.sql.Ref getRef(int i)  
```  
  
#### Parameters  
 *i*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 A Ref object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getRef method is specified by the getRef method in the java.sql.ResultSet interface.  
  
## Related content

- [getRef Method (SQLServerResultSet)](getref-method-sqlserverresultset.md)
- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
