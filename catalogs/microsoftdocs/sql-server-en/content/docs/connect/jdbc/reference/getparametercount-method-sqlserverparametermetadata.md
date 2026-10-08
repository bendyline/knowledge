---
title: "getParameterCount Method (SQLServerParameterMetaData)"
description: "getParameterCount Method (SQLServerParameterMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerParameterMetaData.getParameterCount"
apitype: "Assembly"
---
# getParameterCount Method (SQLServerParameterMetaData)


  Retrieves the number of parameters in the [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) object for which this [SQLServerParameterMetaData](sqlserverparametermetadata-class.md) object contains information.  
  
## Syntax  
  
```  
  
public int getParameterCount()  
```  
  
## Return Value  
 An **int** that indicates the number of parameters.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getParameterCount method is specified by the getParameterCount method in the java.sql.ParameterMetaData interface.  
  
## Related content

- [SQLServerParameterMetaData Methods](sqlserverparametermetadata-methods.md)
- [SQLServerParameterMetaData Members](sqlserverparametermetadata-members.md)
- [SQLServerParameterMetaData Class](sqlserverparametermetadata-class.md)
