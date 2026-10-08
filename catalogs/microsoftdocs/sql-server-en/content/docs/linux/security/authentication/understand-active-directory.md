---
title: Understanding Active Directory Authentication for SQL Server on Linux and Containers
description: Understand Active Directory authentication with SQL Server on Linux and containers. Includes LDAP, Kerberos, keytabs and DNS.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: concept-article
ms.custom:
  - linux-related-content
monikerRange: ">=sql-server-linux-2017 || >=sql-server-2017 || =sqlallproducts-allversions"
---
# Understand Active Directory authentication for SQL Server on Linux and containers


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article provides details about how Active Directory authentication works for  SQL Server 
 deployed on Linux or containers.

## Concepts

<a id="ldap"></a>

### Lightweight Directory Access Protocol (LDAP)

LDAP is an application protocol for working with various directory services, including Active Directory. Directory services store user and account information, and security information such as passwords. That information is encrypted and then shared with other devices on the network.

To find out more about securing LDAP, see [How to enable LDAP signing in Windows Server](https://learn.microsoft.com/troubleshoot/windows-server/identity/enable-ldap-signing-in-windows-server).

### Kerberos

Kerberos is an authentication protocol used to verify the identity of a user or host computer. You can think of it as a way to verify the client and server.

When you work in a heterogeneous (mixed) environment where you have Windows and non-Windows servers and clients, there are two kinds of files you need to work with Active Directory-based directory services:

- Keytab files (short for "key tables")
- Kerberos configuration files (`krb5.conf` or `krb5.ini`)

## What is a keytab file?

Server processes on Linux or Unix systems can't be configured to run processes with a Windows service account. When you want a Linux or Unix system to automatically log into Active Directory on startup, you must use a *keytab* file.

A keytab is a cryptographic file containing a representation of a Kerberos-protected service and the long-term *key* of its associated service principal name in the Key Distribution Center (KDC). The key isn't the password itself.

Keytabs are used to either:

- authenticate the service itself to another service on the network, or
- decrypt the Kerberos service ticket of an inbound directory user to the service.

## What is a `krb5.conf` file?

The `/etc/krb5.conf` file (also called `krb5.ini`) provides configuration inputs for the Kerberos v5 (KRB5) and GNU Simple Authentication and Security Layer API (GSSAPI) libraries.

This information includes the default domain, properties of each domain (such as Key Distribution Centers), and default Kerberos ticket lifetime.

This file is necessary for Active Directory authentication to work. `krb5.conf` is an INI file, but each value in the key-value pair can be a subgroup enclosed by `{` and `}`.

For more information on the `krb5.conf` file, refer to the [MIT Kerberos Consortium documentation](https://web.mit.edu/kerberos/krb5-1.16/doc/admin/conf_files/krb5_conf.html).

## Configure Kerberos for SQL Server on Linux

These are the values you need on the host server running  SQL Server 
 on Linux. If you have other (non- SQL Server 
) services running on the same host, your `krb5.conf` file might need several more entries.

Here is a sample `krb5.conf` file for reference:

```ini
[libdefaults]
default_realm = CONTOSO.COM

[realms]
CONTOSO.COM = {
  kdc = adVM.contoso.com
  admin_server = adVM.contoso.com
  default_domain = contoso.com
}

[domain_realm]
.contoso.com = CONTOSO.COM
contoso.com = CONTOSO.COM
```

- `libdefaults` - the `default_realm` value must be present. This value specifies the domain to which the host machine belongs.

- `realms` (optional) - For each realm, the `kdc` value might be set to specify which Key Distribution Centers the machine should contact when looking up Active Directory accounts. If you have set more than one KDC, the KDC for each connection will be selected by round-robin.

- `domain_realm` (optional) - Mappings for each realm might be provided. If not,  SQL Server 
 on Linux assumes that the domain `contoso.com` maps to the realm `CONTOSO.COM`.

### The Kerberos authentication process

As with Kerberos authentication on Windows, the first two steps to obtain a ticket-granting ticket (TGT) are the same:

- A client begins the login process by sending their username and password (encrypted) to the domain controller (DC).

- After checking the username and password against its internal storage, the DC returns a TGT for the user to the client.

 SQL Server 
 on Linux uses the keytab file to read the password for the Service Principal Name (SPN) and then decrypts the encrypted blob, which it uses to authorize the connection. The next steps outline this process.

- Once the user has the TGT, the client starts a connection to  SQL Server 
 by specifying the hostname and port of the  SQL Server 
 instance.

- The SQL client internally creates a Service Principal Name in the format `MSSQLSvc/<host>:<port>`. This is a hardcoded format in most  SQL Server 
 clients.

- The client starts the Kerberos handshake by requesting a session key from the DC for that SPN. Both the TGT and the SPN are sent to the DC.

Diagram showing Active Directory authentication for SQL Server on Linux - Ticket-Granting Ticket and Service Principal Name sent to Domain Controller.

- After the DC validates the TGT and SPN, it sends the session key to the client, for connecting to the  SQL Server 
 SPN.

Diagram showing Active Directory authentication for SQL Server on Linux - session key returned to client by DC.

- The encrypted blob from the session key is sent to the server.

Diagram showing Active Directory authentication for SQL Server on Linux - session key sent to server.

-  SQL Server 
 reads the password for the SPN from its keytab (`mssql.keytab`), which is a file on disk containing encrypted (SPN, password) tuples.

-  SQL Server 
 decrypts the encrypted blob from the client with the password it just looked up, to get the client's username.

-  SQL Server 
 looks up the client in the `sys.syslogins` table to check if the client is authorized to connect.

- The connection is either accepted or denied.

Diagram showing Active Directory authentication for SQL Server on Linux - connection accepted or denied.

## Configure Kerberos for SQL Server containers

Active Directory authentication for  SQL Server 
 in containers is essentially the same as  SQL Server 
 on Linux. The only difference is the  SQL Server 
 host SPN. In the previous scenario, the SPN was `MSSQLSvc/<host>:<port>` because we were connecting via the name of the  SQL Server 
 host. Now you must connect to the container.

For  SQL Server 
 containers, you can create the `krb5.conf` file inside the container. The host node running the container doesn't need to be part of the domain, but should be able to reach the domain controller to which the container will try to connect.

Because you are connecting to a container, the server name in the client connection might be different than just the hostname. It could be the hostname, the container name, or another alias. In addition, there's a good chance that the exposed port for  SQL Server 
 won't be the default `1433`.

You must use the SPN that is stored in `mssql.keytab` to connect to the  SQL Server 
 container. For example, if the SPN in `mssql.keytab` is `MSSQLSvc/sqlcontainer.domain.com:8000`, you would use `sqlcontainer.domain.com,8000` as your connection string in the client.

> **Note:**  
> You can connect to an instance of  SQL Server 
 using any familiar  SQL Server 
 client tool, such as **[sqlcmd](../../../tools/sqlcmd/sqlcmd-utility.md)**, [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/), or the [MSSQL extension for Visual Studio Code](../../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

Diagram showing Active Directory authentication for SQL Server Containers.

## SQL Server group refresh

You might be wondering why there's a user account in the keytab if you only need a Service Principal Name to authenticate.

Imagine you have a user *adUser*, which is a member of a group *adGroup*. If *adGroup* is added as a login to  SQL Server 
, that means *adUser* has permission to sign in to the  SQL Server 
 instance as well. While *adUser* is still connected to  SQL Server 
, a domain admin might remove *adUser* from *adGroup*. Now *adUser* should no longer have permission to sign in to  SQL Server 
, but they have already passed the Kerberos authentication process and are connected.

A background process called *group refresh* runs periodically to protect against a scenario where a connected user is no longer allowed to perform a privileged action (such as creating a login or altering a database).

 SQL Server 
 has a privileged Active Directory account that it uses for group refresh. This account is either configured using **`mssql-conf`** with the **network.privilegedadaccount** setting, or defaults to the machine account of the host machine (`<hostname>$`).

The credentials for the privileged account in `mssql.keytab` are used to impersonate the client (*adUser* in this example).  SQL Server 
 does a Kerberos handshake with itself to identify the group membership information, and compares it with `sys.syslogins` to check if *adUser* still has the permissions necessary to connect and execute the requested Transact-SQL commands. If *adUser* has been removed from *adGroup*, the connection is terminated by  SQL Server 
.

Group refresh requires the following two conditions:

- Network connectivity between the  SQL Server 
 instance and the on-premises Active Directory domain.
- Two-way trust between the domain that  SQL Server 
 is connected to, and the on-premises Active Directory domain. For more information, see [Understanding Active Directory](https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/Active-Directory-Domain-Services-Overview#understanding-active-directory).

## Related content

- [Troubleshoot Active Directory authentication for SQL Server on Linux and containers](troubleshoot-active-directory.md)
- [Rotate keytabs for SQL Server on Linux](rotate-keytabs.md)
- [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](adutil-tutorial.md)
