---
title: "deleteRow Method (SQLServerResultSet)"
description: "deleteRow Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/20/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.deleteRow"
apitype: "Assembly"
---
# deleteRow Method (SQLServerResultSet)



  Deletes the current row from this[SQLServerResultSet](sqlserverresultset-class.md) object and from the underlying database.  
  
## Syntax  
  
```cpp
public void deleteRow()  
```  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This deleteRow method is specified by the deleteRow method in the java.sql.ResultSet interface.  
  
 This method cannot be called when the cursor is on the insert row.  
  
 When using keyset cursors, this method leaves a gap in the result set. You can test for this gap by using the [rowDeleted](rowdeleted-method-sqlserverresultset.md) method. The row numbers of the rows in the result set do not change.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
