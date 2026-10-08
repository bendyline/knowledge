---
title: "SQL Server Login Password Strength"
description: "SQL Server Login Password Strength"
author: VanMSFT
ms.author: vanto
ms.date: 12/15/2023
ms.service: sql
ms.subservice: security
ms.topic: reference
helpviewer_keywords:
  - "Best Practices [Database Engine]"
---
# Sql server login password strength


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This rule checks whether "Enforce password policy" of each  SQL Server 
 login is enabled. If  SQL Server 
 Authentication is enabled and if the operating system version is earlier than  Windows Server 2003 
, an attacker could repeatedly exploit a known  SQL Server 
 login password.

## Best practices recommendations

We recommend that you upgrade the operating system to  Windows Server 2003 
.

If  SQL Server 
 Authentication isn't required in your environment, use Windows Authentication.

Enable "Enforce password policy" for all the  SQL Server 
 logins. Use [ALTER LOGIN](../../t-sql/statements/alter-login-transact-sql.md) to configure the password policy for the  SQL Server 
 login.

## For more information

[Password Policy](../security/password-policy.md)

## Related content

- [Monitor and Enforce Best Practices by Using Policy-Based Management](monitor-and-enforce-best-practices-by-using-policy-based-management.md)
