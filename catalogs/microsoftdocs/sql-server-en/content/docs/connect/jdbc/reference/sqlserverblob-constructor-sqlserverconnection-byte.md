---
title: "SQLServerBlob Constructor (SQLServerConnection, byte)"
description: "SQLServerBlob Constructor (SQLServerConnection, byte)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection, byte[].SQLServerBlob"
apitype: "Assembly"
---
# SQLServerBlob Constructor (SQLServerConnection, byte)


  Initializes a new instance of the [SQLServerBlob](sqlserverblob-class.md) class when given a [SQLServerConnection](sqlserverconnection-class.md) object and a **byte** array.  
  
> **Note:**  
>  This method has been deprecated in JDBC Driver version 2.0. Instead, use the [createBlob](createblob-method-sqlserverconnection.md) method of the [SQLServerConnection](sqlserverconnection-class.md) class.  
  
## Syntax  
  
```  
  
public SQLServerBlob(SQLServerConnection connection,  
                     byte[] data)  
```  
  
#### Parameters  
 *connection*  
  
 A SQLServerConnection object.  
  
 *data*  
  
 A **byte** array.  
  
## Related content

- [SQLServerBlob Constructors](sqlserverblob-constructors.md)
- [SQLServerBlob Members](sqlserverblob-members.md)
- [SQLServerBlob Class](sqlserverblob-class.md)
