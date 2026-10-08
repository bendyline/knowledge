---
title: "unwrap Method (SQLServerStatement)"
description: "unwrap Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# unwrap Method (SQLServerStatement)


  Returns an object that implements the specified interface to allow access to the  Microsoft JDBC Driver for SQL Server 
-specific methods.  
  
## Syntax  
  
```  
  
public <T> T unwrap(Class<T> iface)  
```  
  
#### Parameters  
 *iface*  
  
 A class of type **T** defining an interface.  
  
## Return Value  
 An object that implements the specified interface.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 The [unwrap](#unwrap-method-sqlserverstatement) method is defined by the java.sql.Wrapper interface, which is introduced in the JDBC 4.0 Spec.  
  
 Applications might need to access extensions to the JDBC API that are specific to the  Microsoft JDBC Driver for SQL Server 
. The unwrap method supports unwrapping to public classes that this object extends, if the classes expose vendor extensions.  
  
 When this method is called, the object unwraps to the [SQLServerStatement](sqlserverstatement-class.md) class.  
  
 For example code, see [Updating Large Data Sample](../updating-large-data-sample.md), or [unwrap Method (SQLServerCallableStatement)](unwrap-method-sqlservercallablestatement.md).  
  
 For more information, see [Wrappers and Interfaces](../wrappers-and-interfaces.md).  
  
## Related content

- [isWrapperFor Method (SQLServerStatement)](iswrapperfor-method-sqlserverstatement.md)
- [SQLServerStatement Members](sqlserverstatement-members.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
