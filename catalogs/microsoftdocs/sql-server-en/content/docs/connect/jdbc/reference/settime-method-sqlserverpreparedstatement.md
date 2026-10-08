---
title: "setTime Method (SQLServerPreparedStatement)"
description: "setTime Method (SQLServerPreparedStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerPreparedStatement.setTime"
apitype: "Assembly"
---
# setTime Method (SQLServerPreparedStatement)


  Sets the designated parameter to the given time value.  
  
 Beginning with  SQL Server 
 JDBC Driver 3.0, the behavior of this method is modified by the **sendTimeAsDatetime** connection property ([Setting the Connection Properties](../setting-the-connection-properties.md)) and [SQLServerDataSource.setSendTimeAsDatetime](setsendtimeasdatetime-method-sqlserverdatasource.md).  
  
 For more information, see [Configuring How java.sql.Time Values are Sent to the Server](../configuring-how-java-sql-time-values-are-sent-to-the-server.md).  
  
## Overload List  
  
| Name | Description |
| --- | --- |
| [setTime (int, java.sql.Time)](settime-method-int-java-sql-time.md) | Sets the designated parameter to the given time value. |
| [setTime (int, java.sql.Time, java.util.Calendar)](settime-method-int-java-sql-time-java-util-calendar.md) | Sets the designated parameter to the given time and calendar values. |
  
## Related content

- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
