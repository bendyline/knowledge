---
title: "getPortNumber Method (SQLServerDataSource)"
description: "getPortNumber Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.getPortNumber"
apitype: "Assembly"
---
# getPortNumber Method (SQLServerDataSource)


  Returns the current port number that is used to communicate with  SQL Server 
.  
  
## Syntax  
  
```  
  
public int getPortNumber()  
```  
  
## Return Value  
 An **int** value that contains the current port number.  
  
## Remarks  
 The port number is the TCP/IP port number that is used when opening a socket connection to  SQL Server 
. If the portNumber property is not set, the getPortNumber method returns the default value of 1433.  
  
> **Note:**  
>  The [setPortNumber](setportnumber-method-sqlserverdatasource.md) method does not do any range checking on the port value passed in. You can pass tort numbers that are not valid, like 99999, without triggering an error.  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
