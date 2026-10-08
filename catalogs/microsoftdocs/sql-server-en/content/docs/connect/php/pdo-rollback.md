---
title: "PDO::rollBack"
description: "API reference for the PDO::rollBack function in the Microsoft PDO_SQLSRV Driver for PHP for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: 07/23/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# PDO::rollback



Discards database commands that were issued after calling [PDO::beginTransaction](pdo-begintransaction.md) and returns the connection to auto commit mode.  
  
## Syntax  
  
```php  
  
bool PDO::rollBack ();  
```  
  
## Return Value  
true if the method call succeeded, false otherwise.  
  
## Remarks  
PDO::rollback is not affected by (and does not affect) the value of PDO::ATTR_AUTOCOMMIT.  
  
See [PDO::beginTransaction](pdo-begintransaction.md) for an example that uses PDO::rollback.  
  
Support for PDO was added in version 2.0 of the Microsoft Drivers for PHP for SQL Server
.  
  
## Related content

- [PDO Class](pdo-class.md)
- [PDO](https://php.net/manual/book.pdo.php)
