---
title: "setPortNumber Method (SQLServerDataSource)"
description: "setPortNumber Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.setPortNumber"
apitype: "Assembly"
---
# setPortNumber Method (SQLServerDataSource)


  Sets the port number to be used to communicate with  SQL Server 
.  
  
## Syntax  
  
```  
  
public void setPortNumber(int portNumber)  
```  
  
#### Parameters  
 *portNumber*  
  
 An **int** value that contains the port number.  
  
## Remarks  
 The port number is the TCP/IP port number that is used when opening a socket connection to  SQL Server 
. If the portNumber property is not set, the [getPortNumber](getportnumber-method-sqlserverdatasource.md) method returns the default value of 1433.  
  
> **Note:**  
>  The setPortNumber method does not do any range checking on the port value passed in. You can pass a port number that is not valid, like 99999, without triggering an error.  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
