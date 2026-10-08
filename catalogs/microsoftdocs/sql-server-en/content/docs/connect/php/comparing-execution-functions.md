---
title: "Comparing execution functions"
description: "This topic lists the different query execution functions when using the Microsoft Drivers for PHP for SQL Server"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: "08/10/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
helpviewer_keywords:
  - "executing queries"
---
# Comparing Execution Functions



The Microsoft Drivers for PHP for SQL Server
 provides several options for executing functions.  

## SQLSRV Execution Functions  
If you are using the SQLSRV driver, use [sqlsrv_query](sqlsrv-query.md) to execute a single query and [sqlsrv_prepare](sqlsrv-prepare.md) with [sqlsrv_execute](sqlsrv-execute.md) to execute a prepared statement multiple times with different parameter values for each execution.  

## PDO_SQLSRV Execution Functions 
If you are using the PDO_SQLSRV driver, you can execute a query with one of the following:  
  
-   [PDO::exec](pdo-exec.md)  
  
-   [PDO::query](pdo-query.md)  
  
-   [PDO::prepare](pdo-prepare.md) and [PDOStatement::execute](pdostatement-execute.md).  
  
## Related content

- [SQLSRV Driver API Reference](sqlsrv-driver-api-reference.md)
- [PDO_SQLSRV Driver Reference](pdo-sqlsrv-driver-reference.md)
- [Programming Guide for the Microsoft Drivers for PHP for SQL Server](programming-guide-for-php-sql-driver.md)
