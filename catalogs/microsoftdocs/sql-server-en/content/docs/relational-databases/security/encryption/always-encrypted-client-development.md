---
title: "Develop applications using Always Encrypted"
description: Learn about Always Encrypted client-side technology that ensures sensitive data are never revealed to the SQL Server or Azure SQL Database.
author: jaszymas
ms.author: jaszymas
ms.reviewer: vanto
ms.date: "10/30/2019"
ms.service: sql
ms.subservice: security
ms.topic: concept-article
dev_langs:
  - "CSharp"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Develop applications using Always Encrypted

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





[Always Encrypted](always-encrypted-database-engine.md) is a client-side encryption technology that ensures sensitive data (and related encryption keys) are never revealed to the SQL Server or Azure SQL Database. With Always Encrypted, a client driver transparently encrypts sensitive data before passing the data to the Database Engine, and it transparently decrypts data retrieved from encrypted database columns.

For details about developing applications that use Always Encrypted protected databases, and which client drivers and which driver versions support Always Encrypted, see:

- [Using Always Encrypted with the .NET Framework Data Provider for SQL Server](develop-using-always-encrypted-with-net-framework-data-provider.md)
- [Using Always Encrypted with the JDBC Driver](../../../connect/jdbc/using-always-encrypted-with-the-jdbc-driver.md)
- [Using Always Encrypted with the ODBC Driver](../../../connect/odbc/using-always-encrypted-with-the-odbc-driver.md)
- [Using Always Encrypted with the PHP Drivers](../../../connect/php/using-always-encrypted-php-drivers.md)
- [Using Always Encrypted the Microsoft .NET Data Provider for SQL Server in .NET Core and .NET Framework Applications](../../../connect/ado-net/sql/sqlclient-support-always-encrypted.md)
- [Always Encrypted](always-encrypted-database-engine.md)
