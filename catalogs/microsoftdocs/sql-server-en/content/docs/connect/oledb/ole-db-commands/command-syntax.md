---
title: Command syntax (OLE DB driver)
description: Learn about command syntax that the OLE DB Driver for SQL Server recognizes and how to run a SQL Server stored procedure.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: 04/20/2021
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "OLE DB Driver for SQL Server, commands"
  - "commands [OLE DB]"
  - "OLE DB Driver for SQL Server, stored procedures"
  - "stored procedures [OLE DB], command syntax"
---
# Command Syntax


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






The OLE DB Driver for SQL Server recognizes command syntax specified by the DBGUID_SQL macro. For the OLE DB Driver for SQL Server, the specifier indicates that an amalgam of ODBC SQL, ISO, and  Transact-SQL  is valid syntax. For example, the following SQL statement uses an ODBC SQL escape sequence to specify the LCASE string function:

```sql
SELECT customerid={fn LCASE(CustomerID)} FROM Customers
```

`LCASE` returns a character string, converting all uppercase characters to their lowercase equivalents. The ISO string function LOWER does the same operation, so the following SQL statement is an ISO equivalent to the ODBC statement above:

```sql
SELECT customerid=LOWER(CustomerID) FROM Customers
```

The OLE DB Driver for SQL Server processes either form of the statement successfully when specified as text for a command.

## Stored Procedures

When executing a  SQL Server 
 stored procedure using an OLE DB Driver for SQL Server command, use the ODBC CALL escape sequence in the command text. The OLE DB Driver for SQL Server then uses the remote procedure call mechanism of  SQL Server 
 to optimize command processing. For example, the following ODBC SQL statement is preferred command text over the  Transact-SQL  form:

- ODBC SQL

    ```sql
    {call SalesByCategory('Produce', '1995')}
    ```

- Transact-SQL

    ```sql
    EXECUTE SalesByCategory 'Produce', '1995'
    ```

## Related content

- [Commands](commands.md)
