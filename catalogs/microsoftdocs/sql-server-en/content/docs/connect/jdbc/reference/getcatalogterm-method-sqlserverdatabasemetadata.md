---
title: "getCatalogTerm Method (SQLServerDatabaseMetaData)"
description: "getCatalogTerm Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.getCatalogTerm"
apitype: "Assembly"
---
# getCatalogTerm Method (SQLServerDatabaseMetaData)


  Retrieves the database vendor's preferred term for "catalog".  
  
## Syntax  
  
```  
  
public java.lang.String getCatalogTerm()  
```  
  
## Return Value  
 A **String** that contains the catalog term.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getCatalogTerm method is specified by the getCatalogTerm method in the java.sql.DatabaseMetaData interface.  
  
 When using the  Microsoft JDBC Driver for SQL Server 
 with a  SQL Server 
 database, this method will return the term "database".  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
