---
title: "getBytes Method (int)"
description: "getBytes Method (int)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerCallableStatement.getBytes (int)"
apitype: "Assembly"
---
# getBytes Method (int)


  Retrieves the value of the designated parameter as an array of bytes value given the parameter index.  
  
## Syntax  
  
```  
  
public byte[] getBytes(int index)  
```  
  
#### Parameters  
 *index*  
  
 An **int** that indicates the parameter index.  
  
## Return Value  
 An array of **byte** values.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 In a previous version of  Microsoft JDBC Driver for SQL Server 
, you could use SQLServerCallableStatement.getBytes to convert values between byte arrays and  SQL Server 
 data type **date**, **time**, **datetime2**, or **datetimeoffset**. Now, using this method with those data types will cause an exception indicating that the conversion is not supported.  
  
 This getBytes method is specified by the getBytes method in the java.sql.CallableStatement interface.  
  
## Related content

- [getBytes Method (SQLServerCallableStatement)](getbytes-method-sqlservercallablestatement.md)
- [SQLServerCallableStatement Class](sqlservercallablestatement-class.md)
