---
title: "executeUpdate Method (SQLServerStatement)"
description: "executeUpdate Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerStatement.executeUpdate"
apitype: "Assembly"
---
# executeUpdate Method (SQLServerStatement)


  Runs the given SQL statement, which can be an INSERT, UPDATE, or DELETE statement; or a SQL statement that returns nothing, such as a SQL DDL statement. Beginning in  Microsoft 
  SQL Server 
 JDBC Driver 3.0, executeUpdate will return the correct number of rows updated in a MERGE operation.  
  
## Overload List  
  
| Name | Description |
| --- | --- |
| [executeUpdate (java.lang.String)](executeupdate-method-java-lang-string-sqlserverstatement.md) | Runs the given SQL statement, which can be an INSERT, UPDATE, DELETE, or MERGE statement; or a SQL statement that returns nothing, such as a SQL DDL statement. |
| [executeUpdate (java.lang.String, int)](executeupdate-method-java-lang-string-int.md) | Runs the given SQL statement and signals the  Microsoft JDBC Driver for SQL Server |
 | with the given flag about whether the auto-generated keys produced by this [SQLServerStatement](sqlserverstatement-class.md) object should be made available for retrieval. |
| [executeUpdate (java.lang.String, int\[\])](executeupdate-method-java-lang-string.md) | Runs the given SQL statement and signals the JDBC driver that the auto-generated keys that are indicated in the given array should be made available for retrieval. |
| [executeUpdate (java.lang.String, java.lang.String\[\])](executeupdate-method-java-lang-string-java-lang-string.md) | Runs the given SQL statement and signals the JDBC driver that the auto-generated keys that are indicated in the given array should be made available for retrieval. |
  
## Related content

- [SQLServerStatement Members](sqlserverstatement-members.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
