---
title: "refreshRow Method (SQLServerResultSet)"
description: "refreshRow Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.refreshRow"
apitype: "Assembly"
---
# refreshRow Method (SQLServerResultSet)


  Refreshes the current row with its most recent value in the database.  
  
## Syntax  
  
```  
  
public void refreshRow()  
```  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This refreshRow method is specified by the refreshRow method in the java.sql.ResultSet interface.  
  
 This method cannot be called when the cursor is on the insert row.  
  
 This method provides a way for an application to explicitly tell the JDBC driver to refetch rows from the database. An application might need to call this method when the  Microsoft JDBC Driver for SQL Server 
 is caching or prefetching to fetch the latest value of a row from the database. The JDBC driver might actually refresh multiple rows at the same time if the fetch size is greater than one.  
  
 All values are refetched subject to the transaction isolation level and cursor sensitivity. If this method is called after calling an updater method, but before calling the [updateRow](updaterow-method-sqlserverresultset.md) method, the updates made to the row are lost. Calling this method frequently will probably slow performance.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
