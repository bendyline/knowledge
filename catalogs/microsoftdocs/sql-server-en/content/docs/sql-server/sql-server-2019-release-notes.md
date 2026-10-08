---
title: SQL Server 2019 Release Notes
description: Find information about SQL Server 2019 (15.x) limitations, known issues, help resources, and other release notes.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/23/2026
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
monikerRange: ">=sql-server-2017"
---

# SQL Server 2019 release notes


**Applies to:**
 






This article describes limitations and known issues for the  SQL Server 2019 (15.x) 
. For related information, see:

> [What's New in  SQL Server 2019 (15.x)
](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/what-s-new-in-sql-server-ver15.md)

## SQL Server 2019 (15.x)

 SQL Server 2019 (15.x) 
 is the latest public release of  SQL Server 
.

Complete details about licensing are in `License Terms` folder on the installation media.

## Documentation

- **Issue and customer impact**:  SQL Server 
 documentation can be filtered by version. Use the control at the top left of each documentation page to filter for your requirements.

## Build number

The RTM build number for SQL Server 2019 is `15.0.2000.5`.

## SQL Server 2019 servicing updates

For current information about SQL Server servicing updates, see [SQL Server 2019 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/build-versions).


## Known issues

This section identifies known issues you might experience with this product.

### SQL Server installation might fail if SSMS 18.x is installed

- **Issue and customer impact**:  SQL Server 2019 (15.x) 
 installation fails when the following installations happen in this order:
  1. SQL Server Management Studio (SSMS) version 18.0, 18.1, 18.2, or 18.3 is installed on the server.
  1.  SQL Server 2019 (15.x) 
 installation is attempted from removable media. For example, the installation media is a DVD.

- **Workaround**:
  1. Uninstall any version of SSMS older than SSMS 18.3.1.
  1. Install the latest version of [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/install/install).
  1. Install  SQL Server 2019 (15.x) 
 normally.

- **Applies to**:  SQL Server 2019 (15.x) 


### UTF-8 collations can't be used with certain features

- **Issue and customer impact**: UTF-8 enabled collations can't be used with the following features:
  - [Introduction to Memory-Optimized Tables](../relational-databases/in-memory-oltp/introduction-to-memory-optimized-tables.md)
  - [Always Encrypted with secure enclaves](../relational-databases/security/encryption/always-encrypted-enclaves.md) (When not using Secure Enclaves, [Always Encrypted](../relational-databases/security/encryption/always-encrypted-database-engine.md) can use UTF-8)

  > **Warning:**  
  > Creating a [bacpac](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/data-tier-applications/data-tier-applications.md#bacpac) of a database containing table columns defined as [char and varchar](../t-sql/data-types/char-and-varchar-transact-sql.md) that use more than 4000 bytes will fail.

  > **Note:**  
  > There's currently no UI support to choose UTF-8 enabled collations in Visual Studio Code or SQL Server Data Tools (SSDT). The latest  SQL Server Management Studio 
 (SSMS) supports choice of UTF-8 enabled collations in the UI.

- **Applies to**:  SQL Server 2019 (15.x) 
 RTM

### Master Data Service notification email contains broken link

- **Issue and customer impact**: The notification email from Master Data Services (MDS) contains a broken link. The link navigates to a page that returns an error like the following message:

  `The view 'Index' or its master was not found or no view engine supports the searched locations.`

- **Workaround**: Open the MDS portal and go to the resource manually.

- **Applies to**:  SQL Server 2019 (15.x) 
 RTM

### Access violations in Windows Server 2025 with LPIM enabled


**Issue**: Under certain configurations on Windows Server 2025,  SQL Server 
 could trigger access violation (AV) dumps if the **Lock pages in memory** (LPIM) Windows policy is enabled.

If you see this text in your error log during system startup, and you can't reproduce these conditions on earlier versions of Windows Server, you might be affected.

```output
Using locked pages in the memory manager.
```

**Workaround**: Disable the **Lock pages in memory** policy for the  SQL Server 
 service account on Windows Server 2025.

For more information and product updates, see [Windows Server 2025 update history](https://support.microsoft.com/servicing/os/windows-server/2024/10/windows-server-2025-update-history).

For more information about LPIM, see [Server memory configuration options](../database-engine/configure-windows/server-memory-server-configuration-options.md).


## Related content

- [Hardware and software requirements for SQL Server 2019](install/hardware-and-software-requirements-for-installing-sql-server-2019.md)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](sql-server-docs-contribute.md).
