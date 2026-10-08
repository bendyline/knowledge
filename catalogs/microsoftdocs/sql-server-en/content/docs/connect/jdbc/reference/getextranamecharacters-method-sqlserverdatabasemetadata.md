---
title: "getExtraNameCharacters Method (SQLServerDatabaseMetaData)"
description: "getExtraNameCharacters Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.getExtraNameCharacters"
apitype: "Assembly"
---
# getExtraNameCharacters Method (SQLServerDatabaseMetaData)


  Retrieves all the extra characters that can be used in unquoted identifier names, such as those beyond a-z, A-Z, 0-9, and _.  
  
## Syntax  
  
```  
  
public java.lang.String getExtraNameCharacters()  
```  
  
## Return Value  
 A **String** that contains the extra characters.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getExtraNameCharacters method is specified by the getExtraNameCharacters method in the java.sql.DatabaseMetaData interface.  
  
 When using the  Microsoft JDBC Driver for SQL Server 
 with a  SQL Server 
 database, this method returns the $, #, and \@ extra characters.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
