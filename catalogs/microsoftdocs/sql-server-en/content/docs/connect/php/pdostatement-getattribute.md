---
title: "PDOStatement::getAttribute"
description: "API reference for the PDOStatement::getAttribute function in the Microsoft PDO_SQLSRV Driver for PHP for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: 07/23/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# PDOStatement::getAttribute



Retrieves the value of a predefined PDOStatement attribute or custom driver attribute.  
  
## Syntax  
  
```php  
  
mixed PDOStatement::getAttribute( $attribute );  
```  
  
#### Parameters  
$*attribute*: An integer, one of the PDO::ATTR_* or PDO::SQLSRV_ATTR_\* constants. Supported attributes are the attributes you can set with [PDOStatement::setAttribute](pdostatement-setattribute.md), PDO::SQLSRV_ATTR_DIRECT_QUERY (for more information, see [Direct Statement Execution and Prepared Statement Execution in the PDO_SQLSRV Driver](direct-statement-execution-prepared-statement-execution-pdo-sqlsrv-driver.md)), PDO::ATTR_CURSOR and PDO::SQLSRV_ATTR_CURSOR_SCROLL_TYPE (for more information, see [Cursor Types (PDO_SQLSRV Driver)](cursor-types-pdo-sqlsrv-driver.md)).  
  
## Return Value  
On success, returns a (mixed) value for a predefined PDO attribute or custom driver attribute. Returns null on failure.  
  
## Remarks  
See [PDOStatement::setAttribute](pdostatement-setattribute.md) for a sample.  
  
Support for PDO was added in version 2.0 of the Microsoft Drivers for PHP for SQL Server
.  
  
## Related content

- [PDOStatement Class](pdostatement-class.md)
- [PDO](https://php.net/manual/book.pdo.php)
