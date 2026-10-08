---
title: "isFirst Method (SQLServerResultSet)"
description: "isFirst Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.isFirst"
apitype: "Assembly"
---
# isFirst Method (SQLServerResultSet)


  Retrieves whether the cursor is on the first row of this [SQLServerResultSet](sqlserverresultset-class.md) object.  
  
## Syntax  
  
```  
  
public boolean isFirst()  
```  
  
## Return Value  
 **true** if the cursor is on the first row. **false** if the cursor is at any other position or if the result set contains no rows.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This isFirst method is specified by the isFirst method in the java.sql.ResultSet interface.  
  
 If this method is used with forward and dynamic cursors, an exception is thrown.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
