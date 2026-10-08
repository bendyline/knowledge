---
title: "Choose an Authentication Mode"
description: Choose between Windows Authentication mode and mixed mode authentication for the SQL Server Database Engine at setup time.
author: VanMSFT
ms.author: vanto
ms.date: 06/30/2025
ms.service: sql
ms.subservice: security
ms.topic: how-to
f1_keywords:
  - "sql13.ins.instwizard.authenticationmode.f1"
  - "sql13.swb.passwordexpired.f1"
helpviewer_keywords:
  - "sa account"
  - "authentication modes"
  - "trusted connection"
  - "SQL Server Installation Wizard, Authentication Mode page"
  - "choose authentication mode"
  - "authentication [SQL Server], choosing a mode"
  - "Windows authentication [SQL Server]"
  - "mixed mode authentication"
  - "mixed authentication mode"
  - "SQL authentication mode"
  - "Password Expired dialog box"
---
# Choose an authentication mode


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

During setup, you must select an authentication mode for the  Database Engine 
. There are two possible modes: Windows Authentication mode and mixed mode. Windows Authentication mode enables Windows Authentication and disables  SQL Server 
 Authentication. Mixed mode enables both Windows Authentication and  SQL Server 
 Authentication. Windows Authentication is always available and can't be disabled.

## Configuring the authentication mode

If you select Mixed Mode Authentication (SQL Server and Windows Authentication mode) during setup, you must provide and then confirm a strong password for the built-in  SQL Server 
 system administrator account named `sa`. The `sa` account connects by using  SQL Server 
 Authentication.

If you select Windows Authentication during setup, the setup creates the `sa` account for  SQL Server 
 authentication but it's disabled. If you later change to Mixed Mode Authentication and you want to use the `sa` account, you must enable the account. Any Windows or  SQL Server 
 account can be configured as a system administrator. Because the `sa` account is well known and often targeted by malicious users, don't enable the `sa` account unless your application requires it. Never set a blank or weak password for the `sa` account. To change from Windows Authentication mode to Mixed Mode Authentication and use  SQL Server 
 Authentication, see [Change server authentication mode](../../database-engine/configure-windows/change-server-authentication-mode.md).

## Connecting through Windows Authentication

When a user connects through a Windows user account,  SQL Server 
 validates the account name and password using the Windows principal token in the operating system. This means that the user identity is confirmed by Windows.  SQL Server 
 doesn't ask for the password, and doesn't perform the identity validation. Windows Authentication is the default authentication mode, and is much more secure than  SQL Server 
 Authentication. Windows Authentication uses New Technology LAN Manager (NTLM) or Kerberos security protocol, provides password policy enforcement with regard to complexity validation for strong passwords, provides support for account lockout, and supports password expiration. A connection made using Windows Authentication is sometimes called a trusted connection, because  SQL Server 
 trusts the credentials provided by Windows.

For information on configuring Kerberos, see [Register a Service Principal Name for Kerberos connections](../../database-engine/configure-windows/register-a-service-principal-name-for-kerberos-connections.md).

By using Windows Authentication, Windows groups can be created at the domain level, and a login can be created on  SQL Server 
 for the entire group. Managing access at the domain level can simplify account administration.

> **Important:**  
>  When possible, use Windows authentication. 


## Connecting through SQL Server Authentication

When using  SQL Server 
 Authentication, logins are created in  SQL Server 
 that aren't based on Windows user accounts. Both the user name and the password are created by using  SQL Server 
 and stored in  SQL Server 
. Users connecting using  SQL Server 
 Authentication must provide their credentials (login and password) every time that they connect. When using  SQL Server 
 Authentication, you must set strong passwords for all  SQL Server 
 accounts. For strong password guidelines, see [Strong Passwords](strong-passwords.md).

Three optional password policies are available for  SQL Server 
 logins.

- User must change password at next login

  Requires the user to change the password the next time that the user connects. The ability to change the password is provided by  SQL Server Management Studio 
. Other company software developers should provide this feature if this option is used.

- Enforce password expiration

  The maximum password age policy of the computer is enforced for  SQL Server 
 logins.

- Enforce password policy

  The Windows password policies of the computer are enforced for  SQL Server 
 logins. This includes password length and complexity. This functionality depends on the `NetValidatePasswordPolicy` API, which is only available in  Windows Server 2003 
 and later versions.

### To determine the password policies of the local computer

1. On the **Start** menu, select **Run**.

1. In the **Run** dialog box, type **secpol.msc**, and then select **OK**.

1. In the **Local Security Settings** application, expand **Security Settings**, expand **Account Policies**, and then select **Password Policy**.

   The password policies are described in the results pane.

### Disadvantages of SQL Server Authentication

- If a user is a Windows domain user who has a login and password for Windows, they must still provide another ( SQL Server 
) login and password to connect. Keeping track of multiple names and passwords is difficult for many users. Having to provide  SQL Server 
 credentials every time the user connects to the database can be annoying.

-  SQL Server 
 Authentication can't use Kerberos security protocol.

- Windows offers additional password policies that aren't available for  SQL Server 
 logins.

- The encrypted  SQL Server 
 Authentication login password must be passed over the network at the time of the connection. Some applications that connect automatically will store the password at the client. These are additional attack points.

### Advantages of SQL Server Authentication

- Allows  SQL Server 
 to support older applications and applications provided by third parties that require  SQL Server 
 Authentication.

- Allows  SQL Server 
 to support environments with mixed operating systems, where all users aren't authenticated by a Windows domain.

- Allows users to connect from unknown or untrusted domains. For instance, an application where established customers connect with assigned  SQL Server 
 logins to receive the status of their orders.

- Allows  SQL Server 
 to support web-based applications where users create their own identities.

- Allows software developers to distribute their applications by using a complex permission hierarchy based on known, preset  SQL Server 
 logins.

  > **Note:**  
  > Using  SQL Server 
 Authentication doesn't limit the permissions of local administrators on the computer where  SQL Server 
 is installed.

## Related content

- [Security considerations for a SQL Server installation](../../sql-server/install/security-considerations-for-a-sql-server-installation.md)
