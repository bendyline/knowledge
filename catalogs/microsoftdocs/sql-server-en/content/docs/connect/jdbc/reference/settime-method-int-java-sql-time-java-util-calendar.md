---
title: "setTime Method (int, java.sql.Time, java.util.Calendar)"
description: "setTime Method (int, java.sql.Time, java.util.Calendar)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerPreparedStatement.setTime (int, java.sql.Time, java.lang.Calendar)"
apitype: "Assembly"
---
# setTime Method (int, java.sql.Time, java.util.Calendar)


  Sets the designated parameter to the given time and calendar values.  
  
## Syntax  
  
```  
  
public final void setTime(int n,  
                          java.sql.Time x,  
                          java.util.Calendar cal)  
```  
  
#### Parameters  
 *n*  
  
 An **int** that indicates the parameter number.  
  
 *x*  
  
 A Time object.  
  
 *cal*  
  
 A Calendar object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setTime method is specified by the setTime method in the java.sql.PreparedStatement interface.  
  
 Beginning with  SQL Server 
 JDBC Driver 3.0, the behavior of this method is modified by the **sendTimeAsDatetime** connection property ([Setting the Connection Properties](../setting-the-connection-properties.md)) and [SQLServerDataSource.setSendTimeAsDatetime](setsendtimeasdatetime-method-sqlserverdatasource.md).  
  
 For more information, see [Configuring How java.sql.Time Values are Sent to the Server](../configuring-how-java-sql-time-values-are-sent-to-the-server.md).  
  
## Related content

- [setTime Method (SQLServerPreparedStatement)](settime-method-sqlserverpreparedstatement.md)
- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
