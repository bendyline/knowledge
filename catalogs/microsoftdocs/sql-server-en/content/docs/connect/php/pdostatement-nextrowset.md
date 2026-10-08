---
title: "PDOStatement::nextRowset"
description: "API reference for the PDOStatement::nextRowset function in the Microsoft PDO_SQLSRV Driver for PHP for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: 07/23/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# PDOStatement::nextRowset



Moves the cursor to the next result set.  
  
## Syntax  
  
```php  
  
bool PDOStatement::nextRowset();  
```  
  
## Return Value  
true on success, false otherwise.  
  
## Remarks  
Support for PDO was added in version 2.0 of the Microsoft Drivers for PHP for SQL Server
.  
  
## Example  
  
```php  
<?php  
   $server = "(local)";  
   $database = "AdventureWorks";  
   $conn = new PDO( "sqlsrv:server=$server ; Database = $database", "", "");  
  
   $query1 = "select * from Person.Address where City = 'Bothell';";  
   $query2 = "select * from Person.ContactType;";  
  
   $stmt = $conn->query( $query1 . $query2 );  
  
   $rowset1 = $stmt->fetchAll();  
   $stmt->nextRowset();  
   $rowset2 = $stmt->fetchAll();  
   var_dump( $rowset1 );  
   var_dump( $rowset2 );  
?>  
```  
  
## Related content

- [PDOStatement Class](pdostatement-class.md)
- [PDO](https://php.net/manual/book.pdo.php)
