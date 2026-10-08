---
title: "Database Engine: Breaking Changes"
titleSuffix: "SQL Server 2017"
description: "Learn about changes that might break applications, scripts, or functionalities that are based on earlier versions of SQL Server."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 09/08/2025
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
helpviewer_keywords:
  - "breaking changes 2017 [SQL Server]"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017"
---
# Breaking changes to Database Engine features in SQL Server 2017


**Applies to:**
 



 and later versions


This article describes breaking changes in the  SQL Server 2017 (14.x) 
  Database Engine 
. These changes might break applications, scripts, or functionalities that are based on earlier versions of  SQL Server 
. You might encounter these issues when you upgrade.

## Breaking changes in SQL Server 2017 Database Engine

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](configure-windows/clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../relational-databases/system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


The MD2, MD4, MD5, SHA, and SHA1 algorithms are deprecated in  SQL Server 2016 (13.x) 
. Up to  SQL Server 2016 (13.x) 
, a self-signed certificate is created using SHA1. Starting with  SQL Server 2017 (14.x) 
, a self-signed certificate is created using SHA2_256.

## Previous versions

- [Breaking changes to Database Engine features in SQL Server 2016](https://learn.microsoft.com/previous-versions/sql/database-engine/breaking-changes-to-database-engine-features-in-sql-server-2016)
- [Breaking Changes to Database Engine Features in SQL Server 2014](https://learn.microsoft.com/previous-versions/sql/2014/database-engine/breaking-changes-to-database-engine-features-in-sql-server-2016?view=sql-server-2014\&preserve-view=true#SQL14)

#### Archived documentation for old versions of SQL Server

We accumulate and retain documentation for very old versions of Microsoft SQL Server, in sets of archived webpages. The archived webpages aren't processed by search engines, such as *bing.com* and *google.com*. Yet you can see these archives at our Docs *previous-versions/sql/* address:

- [SQL Server previous versions documentation](https://learn.microsoft.com/previous-versions/sql/)

These archives include the documentation for at least the following older versions:

-  SQL Server 2014 (12.x)

-  SQL Server 2012 (11.x) 

-  SQL Server 2008 R2 (10.50.x) 

-  SQL Server 2008 (10.0.x) 

-  SQL Server 2005 (9.x) 


[SQL Server 2014 documentation](https://learn.microsoft.com/previous-versions/sql/2014/index?view=sql-server-2014\&preserve-view=true) is still available on our main Docs address.

[SQL Server 2025 documentation](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/index.yml?view=sql-server-ver17\&preserve-view=true) is available on our main Docs address. Then, you can use the versioning dropdown list near the top of the page, to select another version of interest.

For more information about the documentation for previous versions of SQL Server, see [Previous versions of SQL Server documentation](https://learn.microsoft.com/previous-versions/sql/).


## Related content

- [Deprecated Database Engine features in SQL Server 2017 (14.x)](deprecated-database-engine-features-in-sql-server-2017.md)
- [Discontinued Database Engine functionality in SQL Server](discontinued-database-engine-functionality-in-sql-server.md)
- [ALTER DATABASE (Transact-SQL) compatibility level](../t-sql/statements/alter-database-transact-sql-compatibility-level.md)
