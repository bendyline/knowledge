---
title: Security Considerations for SQL Server on Linux
description: Learn about SQL Server on Linux security overview, security best practices, restrictions, including how using keys stored in Azure Key Vault and extensible Key Management aren't supported.
author: rwestMSFT
ms.author: randolphwest
ms.date: 01/02/2026
ms.service: sql
ms.subservice: linux
ms.topic: best-practice
ms.custom:
  - linux-related-content
---
# Security considerations for SQL Server on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


Securing  SQL Server 
 on Linux is an ongoing process because Linux is a heterogeneous and continuously evolving operating system. Our goal is to help our customers improve security incrementally, building on what they already have and refining over time. This page serves as an index of key practices and resources for securing  SQL Server 
 on Linux.

## Begin with a secure Linux system

This article assumes that you deployed  SQL Server 
 on a hardened and secured Linux system. Security measures vary by Linux distribution. For more information, see [Get started with SQL Server on SELinux](selinux.md).

Security practices vary based on the Linux distribution you're using. For detailed guidance, contact your distribution provider and review their recommended best practices. You can also refer to documentation such as:

- [Red Hat Enterprise Linux security hardening](https://docs.redhat.com/documentation/red_hat_enterprise_linux/9/html/security_hardening/index)
- [Ubuntu: Security suggestions](https://ubuntu.com/server/docs/explanation/security/security_suggestions)

Always validate your chosen platform and configuration in a controlled test environment before deploying to production.

## Apply SQL Server security guidance

 SQL Server 
 on Linux provides multiple layers of security.

- Create accounts and database users under the principle of least privilege.

- Use features such as row-level security and dynamic data masking for granular access control.

- File system security is enforced through strict ownership and permissions under `/var/opt/mssql`, ensuring only the `mssql` user and group have appropriate access.

- [Active Directory authentication](authentication/active-directory-overview.md) enables Kerberos-based single sign-on (SSO), centralized password policies, and group-based access management.

- Encrypted connections safeguard data in transit using TLS, with options for server or client-initiated encryption, and support for certificates that meet industry standards.

Review and implement recommendations from these key resources:

- [Walkthrough for the security features of SQL Server on Linux](get-started.md)
- [Security and permissions guide for SQL Server on Linux](permissions-guide.md)
- [Active Directory authentication for SQL Server on Linux](authentication/active-directory-overview.md)
- [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](authentication/adutil-tutorial.md)
- [Encrypt connections to SQL Server on Linux](encrypted-connections.md)

## SQL Server auditing on Linux

 SQL Server 
 on Linux supports the built-in  SQL Server 
 Audit feature, enabling you to track and log server-level and database-level events for compliance and security monitoring.

- [Create a Server Audit and Server Audit Specification](../../relational-databases/security/auditing/create-a-server-audit-and-server-audit-specification.md)

## Common best practices

- Regularly update the Linux operating system and  SQL Server 
.
- Dedicate production servers exclusively to  SQL Server 
 workloads.
- Apply the [principle of least privilege](https://techcommunity.microsoft.com/blog/azuresqlblog/security-the-principle-of-least-privilege-polp/2067390) for accounts and services.
- [Disable the `sa` account as a best practice](#disable-the-sa-account-as-a-best-practice).

For common security best practices on Windows and Linux, refer to [SQL Server security best practices](../../relational-databases/security/sql-server-security-best-practices.md).

## Disable the `sa` account as a best practice

When you connect to your  SQL Server 
 instance using the system administrator (`sa`) account for the first time after installation, it's important for you to follow these steps, and then immediately disable the `sa` account as a security best practice.

1. Create a new login, and make it a member of the **sysadmin** server role.

   - Depending on whether you have a container or non-container deployment, enable Windows authentication, and create a new Windows-based login and add it to the **sysadmin** server role.

     - [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](authentication/adutil-tutorial.md)

     - [Tutorial: Configure Active Directory authentication with SQL Server on Linux containers](../containers/tutorial-adutil.md)

   - Otherwise, create a login using  SQL Server 
 authentication, and add it to the **sysadmin** server role.

1. Connect to the  SQL Server 
 instance using the new login you created.

1. Disable the `sa` account, as recommended for security best practice.


## Security limitations for SQL Server on Linux

 SQL Server 
 on Linux currently has the following limitations:

- Starting with  SQL Server 2025 (17.x) 
 on Linux, you can enforce custom password policy. For more information, see [Set custom password policy for SQL logins in SQL Server on Linux](authentication/custom-password-policy.md).

  In  SQL Server 2022 (16.x) 
 on Linux and earlier versions, we provide a standard password policy:

  - `MUST_CHANGE` is the only option you can configure.

  - With the `CHECK_POLICY` option enabled, only the default policy provided by  SQL Server 
 is enforced, and doesn't apply the Windows password policies defined in the Active Directory group policies.

  - Password expiration is hard-coded to 90 days if you use  SQL Server 
 authentication. To work around this issue, consider using [ALTER LOGIN](../../t-sql/statements/alter-login-transact-sql.md).

- Extensible Key Management (EKM) is only supported through Azure Key Vault (AKV) in  SQL Server 2022 (16.x) 
 CU12 onward, and isn't available in earlier versions. Third-party EKM providers aren't supported for  SQL Server 
 on Linux operating systems.

-  SQL Server 
 authentication mode can't be disabled.

-  SQL Server 
 generates its own self-signed certificate for encrypting connections. You can configure  SQL Server 
 to use a user-provided certificate for TLS.

-  SQL Server 
 on Linux deployments aren't FIPS compliant.

## Secure SQL Server on Linux container deployments

For information about securing  SQL Server 
 containers, see [Secure SQL Server Linux containers](../containers/security.md).

## Related content

- [Walkthrough for the security features of SQL Server on Linux](get-started.md)
- [Security and permissions guide for SQL Server on Linux](permissions-guide.md)
- [Configure SQL Server on Linux with the mssql-conf tool](../configure/mssql-conf.md)
- [Editions and supported features of SQL Server 2022 on Linux](../sql-server-linux-editions-and-components-2022.md)
- [Security for SQL Server Database Engine and Azure SQL Database](../../relational-databases/security/security-center-for-sql-server-database-engine-and-azure-sql-database.md)
