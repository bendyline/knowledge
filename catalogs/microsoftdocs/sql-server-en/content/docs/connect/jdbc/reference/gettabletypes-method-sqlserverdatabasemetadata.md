---
title: "getTableTypes Method (SQLServerDatabaseMetaData)"
description: "getTableTypes Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.getTableTypes"
apitype: "Assembly"
---
# getTableTypes Method (SQLServerDatabaseMetaData)


  Retrieves the table types that are available in the current database.  
  
## Syntax  
  
```  
  
public java.sql.ResultSet getTableTypes()  
```  
  
## Return Value  
 A [SQLServerResultSet](sqlserverresultset-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getTableTypes method is specified by the getTableTypes method in the java.sql.DatabaseMetaData interface.  
  
 The result set returned by the getTableTypes method will contain the following information:  
  
| Name | Type | Description |
| --- | --- | --- |
| TABLE_TYPE | **String** | The table type. |
  
> **Note:**  
>  For more information about the data returned by the getTableTypes method, see "sp_tables (Transact-SQL)" in  SQL Server 
 Books Online.  
  
## Example  
 The following example demonstrates how to use the getTableTypes method to return the table type information in the  AdventureWorks2025  sample database, given that the database is specified in the connection String.  
  
```  
public static void executeGetTableTypes(Connection con) {  
   try {  
      DatabaseMetaData dbmd = con.getMetaData();  
      ResultSet rs = dbmd.getTableTypes();  
      ResultSetMetaData rsmd = rs.getMetaData();  
  
      // Display the result set data.  
      int cols = rsmd.getColumnCount();  
      while(rs.next()) {  
         for (int i = 1; i <= cols; i++) {  
            System.out.println(rs.getString(i));  
         }  
      }  
      rs.close();  
   }   
  
   catch (Exception e) {  
      e.printStackTrace();  
   }  
}  
```  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
