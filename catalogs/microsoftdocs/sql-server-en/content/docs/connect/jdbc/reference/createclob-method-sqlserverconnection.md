---
title: "createClob Method (SQLServerConnection)"
description: "createClob Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# createClob Method (SQLServerConnection)


  Creates a Clob object without any data.  
  
## Syntax  
  
```  
  
public java.sql.Clob createClob()  
```  
  
## Return Value  
 A Clob object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This createClob method is specified by the createClob method in the java.sql.Connection interface.  
  
 This method replaces the need for [SQLServerClob Constructor (SQLServerConnection, java.lang.String)](sqlserverclob-constructor-sqlserverconnection-java-lang-string.md).  
  
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
