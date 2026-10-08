---
title: "getURL Method (SQLServerDatabaseMetaData)"
description: "getURL Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.getURL"
apitype: "Assembly"
---
# getURL Method (SQLServerDatabaseMetaData)


  Retrieves the URL for this database.  
  
## Syntax  
  
```  
  
public java.lang.String getURL()  
```  
  
## Return Value  
 A **String** that contains the URL.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getURL method is specified by the getURL method in the java.sql.DatabaseMetaData interface.  
  
 When using the  Microsoft JDBC Driver for SQL Server 
 with a  SQL Server 
 database, this method returns a **String** value that contains the following information:  
  
-   A URL value of "jdbc:sqlserver://"  
  
-   Optional connection properties, such as **serverName**, **instanceName**, and **portNumber**  
  
-   Other connection properties set by the user and all connection properties with non-empty or non-null driver default values except **userName**, **password**, and **integratedSecurity**.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
