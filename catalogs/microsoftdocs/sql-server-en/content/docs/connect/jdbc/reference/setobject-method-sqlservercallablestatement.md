---
title: "setObject Method (SQLServerCallableStatement)"
description: "setObject Method (SQLServerCallableStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerCallableStatement.setObject"
apitype: "Assembly"
---
# setObject Method (SQLServerCallableStatement)


  Sets the value of the designated parameter using the given object.  
  
 Beginning with  SQL Server 
 JDBC Driver 3.0, the behavior of this method is modified by the **sendTimeAsDatetime** connection property ([Setting the Connection Properties](../setting-the-connection-properties.md)) and [SQLServerDataSource.setSendTimeAsDatetime](setsendtimeasdatetime-method-sqlserverdatasource.md).  
  
 For more information, see [Configuring How java.sql.Time Values are Sent to the Server](../configuring-how-java-sql-time-values-are-sent-to-the-server.md).  
  
## Overload List  
  
| Name | Description |
| --- | --- |
| [setObject (java.lang.String, java.lang.Object)](setobject-method-java-lang-string-java-lang-object.md) | Sets the value of the designated parameter using the given object. |
| [setObject (java.lang.String, java.lang.Object, int)](setobject-method-java-lang-string-java-lang-object-int.md) | Sets the value of the designated parameter using the given object and target type. |
| [setObject (java.lang.String, java.lang.Object, int, int)](setobject-method-java-lang-string-java-lang-object-int-int.md) | Sets the value of the designated parameter using the given object, target type, and scale. |
  
## Related content

- [SQLServerCallableStatement Members](sqlservercallablestatement-members.md)
- [SQLServerCallableStatement Class](sqlservercallablestatement-class.md)
