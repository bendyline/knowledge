---
title: "setUnicodeStream Method (SQLServerPreparedStatement)"
description: "setUnicodeStream Method (SQLServerPreparedStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerPreparedStatement.setUnicodeStream"
apitype: "Assembly"
---
# setUnicodeStream Method (SQLServerPreparedStatement)


  Sets the designated parameter number to the given input stream, which will have the specified number of bytes.  
  
> **Note:**  
>  This method has been deprecated from the JDBC specification, and calling it will cause a "not implemented" exception to be thrown.  
  
## Syntax  
  
```  
  
public final void setUnicodeStream(int n,  
                                   java.io.InputStream x,  
                                   int length)  
```  
  
#### Parameters  
 *n*  
  
 An **int** that indicates the parameter number.  
  
 *x*  
  
 An InputStream object.  
  
 *length*  
  
 The number of bytes.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setUnicodeStream method is specified by the setUnicodeStream method in the java.sql.PreparedStatement interface.  
  
## Related content

- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
