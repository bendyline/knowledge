---
title: "getMetaData Method (SQLServerPreparedStatement)"
description: "getMetaData Method (SQLServerPreparedStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerPreparedStatement.getMetaData"
apitype: "Assembly"
---
# getMetaData Method (SQLServerPreparedStatement)


  Retrieves a [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md) object that contains information about the columns of the [SQLServerResultSet](sqlserverresultset-class.md) object that will be returned when this [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) object is run.  
  
## Syntax  
  
```  
  
public final java.sql.ResultSetMetaData getMetaData()  
```  
  
## Return Value  
 A ResultSetMetaData object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getMetaData method is specified by the getMetaData method in the java.sql.PreparedStatement interface.  
  
## Related content

- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
