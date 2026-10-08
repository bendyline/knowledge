---
title: Securing SQL Server
description: Use these articles to create and implement an effective security plan in SQL Server. Learn about the platform, authentication, objects, and applications.
author: VanMSFT
ms.author: vanto
ms.date: 09/12/2025
ms.service: sql
ms.subservice: security
ms.topic: concept-article
f1_keywords:
  - "Security [SQL Server]"
helpviewer_keywords:
  - "database objects [SQL Server], security"
  - "SQL Server, security"
  - "operating systems [SQL Server], security"
  - "security [SQL Server], planning"
  - "applications [SQL Server], security"
---

# Securing SQL Server


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Securing  SQL Server 
 can be viewed as a series of steps, involving four areas: the platform, authentication, objects (including data), and applications that access the system. This article guides you through creating and implementing an effective security plan.

You can find more information about  SQL Server 
 security at [SQL Server security best practices](sql-server-security-best-practices.md). This includes a best practice guide and a security checklist. Be sure to install the [latest service pack or cumulative update](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates).

## Platform and network security

The platform for  SQL Server 
 includes the physical hardware and networking systems connecting clients to the database servers, and the binary files that are used to process database requests.

### Physical security

Best practices for physical security strictly limit access to the physical server and hardware components. For example, use locked rooms with restricted access for the database server hardware and networking devices. In addition, limit access to back up media by storing it at a secure offsite location.

Implementing physical network security starts with keeping unauthorized users off the network. For more information, see [SQL Server security best practices - Infrastructure threats](sql-server-security-best-practices.md#infrastructure-threats).

### Operating system security

Operating system service packs and upgrades include important security enhancements. Apply all updates and upgrades to the operating system after you test them with the database applications.

Firewalls also provide effective ways to implement security. Logically, a firewall is a separator or restrictor of network traffic, which can be configured to enforce your organization's data security policy. If you use a firewall, you increase security at the operating system level by providing a chokepoint where your security measures can be focused. The following table contains more information about how to use a firewall with  SQL Server 
.

| For information about | See |
| --- | --- |
| Configuring a firewall to work with  SQL Server |
| [Configure a Windows Firewall for Database Engine Access](../../database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access.md) |
| Configuring a firewall to work with  Integration Services |
| [Integration Services Service (SSIS Service)](../../integration-services/service/integration-services-service-ssis-service.md) |
| Configuring a firewall to work with  Analysis Services |
| [Configure the Windows Firewall to Allow Analysis Services Access](https://learn.microsoft.com/analysis-services/instances/configure-the-windows-firewall-to-allow-analysis-services-access) |
| Opening specific ports on a firewall to enable access to  SQL Server |
| [Configure the Windows Firewall to Allow SQL Server Access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md) |
| Configuring support for Extended Protection for Authentication by using channel binding and service binding | [Connect to the Database Engine Using Extended Protection](../../database-engine/configure-windows/connect-to-the-database-engine-using-extended-protection.md) |

Surface area reduction is a security measure that involves stopping or disabling unused components. Surface area reduction helps improve security by providing fewer avenues for potential attacks on a system. The key to limiting the surface area of  SQL Server 
 includes running required services that have "least privilege" by granting services and users only the appropriate rights. The following table contains more information about services and system access.

| For information about | See |
| --- | --- |
| Services required for  SQL Server |
| [Configure Windows Service Accounts and Permissions](../../database-engine/configure-windows/configure-windows-service-accounts-and-permissions.md) |

If your  SQL Server 
 system uses Internet Information Services (IIS), additional steps are required to help secure the surface of the platform. The following table contains information about  SQL Server 
 and Internet Information Services.

| For information about | See |
| --- | --- |
| IIS security with  SQL Server Compact |
| [Securing SQL Server - Operating system security](securing-sql-server.md#operating-system-security) |
| Reporting Services |
 | Authentication | [Authentication in Reporting Services](../../reporting-services/extensions/security-extension/authentication-in-reporting-services.md) |
| SQL Server Compact |
 | and IIS access | [Internet Information Services Security Flowchart](https://learn.microsoft.com/iis/get-started/introduction-to-iis/introduction-to-iis-architecture#http-request-processing-in-iis) |

### SQL Server operating system files security

 SQL Server 
 uses operating system files for operation and data storage. Best practices for file security require that you restrict access to these files. The following table contains information about these files.

| For information about | See |
| --- | --- |
| SQL Server |
 | program files | [File Locations for Default and Named Instances of SQL Server](../../sql-server/install/file-locations-for-default-and-named-instances-of-sql-server.md) |

 SQL Server 
 service packs and upgrades provide enhanced security. To determine the latest available service pack available for  SQL Server 
, see the [SQL Server](https://go.microsoft.com/fwlink/?LinkID=31629) Web site.

You can use the following script to determine the service pack installed on the system.

```sql
SELECT CONVERT(char(20), SERVERPROPERTY('productlevel'));
```

## Principals and database object security

Principals are the individuals, groups, and processes granted access to  SQL Server 
. "Securables" are the server, database, and objects the database contains. Each has a set of permissions that can be configured to help reduce the  SQL Server 
 surface area. The following table contains information about principals and securables.

| For information about | See |
| --- | --- |
| Server and database users, roles, and processes | [Principals (Database Engine)](authentication-access/principals-database-engine.md) |
| Server and database objects security | [Securables](securables.md) |
| The  SQL Server |
 | security hierarchy | [Permissions Hierarchy (Database Engine)](permissions-hierarchy-database-engine.md) |

### Encryption and certificates

Encryption doesn't solve access control problems. However, it enhances security by limiting data loss even in the rare occurrence that access controls are bypassed. For example, if the database host computer is misconfigured and a malicious user obtains sensitive data, such as credit card numbers, that stolen information might be useless if it's encrypted. The following table contains more information about encryption in  SQL Server 
.

| For information about | See |
| --- | --- |
| The encryption hierarchy in  SQL Server |
| [Encryption Hierarchy](encryption/encryption-hierarchy.md) |
| Implementing secure connections | [Enable Encrypted Connections to the Database Engine (SQL Server Configuration Manager)](../../database-engine/configure-windows/configure-sql-server-encryption.md) |
| Encryption functions | [Cryptographic Functions (Transact-SQL)](../../t-sql/functions/cryptographic-functions-transact-sql.md) |

Certificates are software "keys" shared between two servers that enable secure communications by way of strong authentication. You can create and use certificates in  SQL Server 
 to enhance object and connection security. The following table contains information about how to use certificates with  SQL Server 
.

| For information about | See |
| --- | --- |
| Creating a certificate for use by  SQL Server |
| [CREATE CERTIFICATE (Transact-SQL)](../../t-sql/statements/create-certificate-transact-sql.md) |
| Using a certificate with database mirroring | [Use Certificates for a Database Mirroring Endpoint (Transact-SQL)](../../database-engine/database-mirroring/use-certificates-for-a-database-mirroring-endpoint-transact-sql.md) |

## Application security

### Client programs

 SQL Server 
 security best practices include writing secure client applications. For more information about how to help secure client applications at the networking layer, see [Client Network Configuration](../../database-engine/configure-windows/client-network-configuration.md).

### Windows Defender Application Control (WDAC)

<!--
This next live paragraph, about Windows Defender Application Control (WDAC), was requested by Bella Brahm, 2019/06/20. (GeneMi)

WDAC can also prevent the kind of highly sophisticated 'Nansh0u' attacks described in 'https://www.guardicore.com/2019/05/nansh0u-campaign-hackers-arsenal-grows-stronger/'. That webpage recommends this present article.
-->

Windows Defender Application Control (WDAC) prevents unauthorized code execution. WDAC is effective way to mitigate the threat of executable file-based malware. For more information, see to [Windows Defender Application Control](https://learn.microsoft.com/windows/security/threat-protection/windows-defender-application-control/windows-defender-application-control) documentation.

## SQL Server security tools, utilities, views, and functions

 SQL Server 
 provides tools, utilities, views, and functions that can be used to configure and administer security.

### SQL Server security tools and utilities

The following table contains information about  SQL Server 
 tools and utilities that you can use to configure and administer security.

| For information about | See |
| --- | --- |
| Connecting to, configuring, and controlling  SQL Server |
| [Use SQL Server Management Studio](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms) |
| Connecting to  SQL Server |
 | and running queries at the command prompt | [Sqlcmd Utility](../../tools/sqlcmd/sqlcmd-utility.md) |
| Network configuration and control for  SQL Server |
| [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md) |
| Enabling and disabling features by using Policy-Based Management | [Administer Servers by Using Policy-Based Management](../policy-based-management/administer-servers-by-using-policy-based-management.md) |
| Manipulating symmetric keys for a report server | [Rskeymgmt Utility (SSRS)](../../reporting-services/tools/rskeymgmt-utility-ssrs.md) |

### SQL Server security catalog views and functions

The  Database Engine 
 exposes security information in several views and functions that are optimized for performance and utility. The following table contains information about security views and functions.

| For information about | See |
| --- | --- |
| SQL Server |
 | security catalog views, which return information about database-level and server-level permissions, principals, roles, and so on. In addition, there are catalog views that provide information about encryption keys, certificates, and credentials. | [Security Catalog Views (Transact-SQL)](../system-catalog-views/security-catalog-views-transact-sql.md) |
| SQL Server |
 | security functions, which return information about the current user, permissions and schemas. | [Security Functions (Transact-SQL)](../../t-sql/functions/security-functions-transact-sql.md) |
| SQL Server |
 | security dynamic management views. | [Security-Related Dynamic Management Views and Functions (Transact-SQL)](../system-dynamic-management-objects/security-related-dynamic-management-views-and-functions-transact-sql.md) |

## Related content

- [Security considerations for a SQL Server installation](../../sql-server/install/security-considerations-for-a-sql-server-installation.md)
- [Security for SQL Server Database Engine and Azure SQL Database](security-center-for-sql-server-database-engine-and-azure-sql-database.md)
- [SQL Server 2012 Security Best Practices - Operational and Administrative Tasks](https://download.microsoft.com/download/8/F/A/8FABACD7-803E-40FC-ADF8-355E7D218F4C/SQL_Server_2012_Security_Best_Practice_Whitepaper_Apr2012.docx)
- [Playbook for addressing common security requirements with Azure SQL Database and Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/database/security-best-practice)
- [SQL Server Security Blog](https://learn.microsoft.com/archive/blogs/sqlsecurity/)
- [Security Best Practice and Label Security Whitepapers](https://learn.microsoft.com/archive/blogs/sqlsecurity/security-best-practice-and-label-security-whitepapers)
- [Row-level security](row-level-security.md)
- [Protecting your SQL Server intellectual property](protecting-your-sql-server-intellectual-property.md)
