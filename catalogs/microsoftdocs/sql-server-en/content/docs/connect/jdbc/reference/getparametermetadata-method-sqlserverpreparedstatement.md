---
title: "getParameterMetaData Method (SQLServerPreparedStatement)"
description: "getParameterMetaData Method (SQLServerPreparedStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerPreparedStatement.getParameterMetaData"
apitype: "Assembly"
---
# getParameterMetaData Method (SQLServerPreparedStatement)


  Retrieves the number, types, and properties of the parameters of this [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) object.  
  
## Syntax  
  
```  
  
public final java.sql.ParameterMetaData getParameterMetaData()  
```  
  
## Return Value  
 A [SQLServerParameterMetaData](sqlserverparametermetadata-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getParameterMetaData method is specified by the getParameterMetaData method in the java.sql.PreparedStatement interface.  
  
## Related content

- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
