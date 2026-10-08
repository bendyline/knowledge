---
title: Service Principal Name (SPN) Support in Client Connections
description: Learn about how SQL Server supports Service Principal Name in client connections. See the most common usage scenarios.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: 04/20/2021
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
helpviewer_keywords:
  - "OLE DB Driver for SQL Server, SPNs"
  - "OLE DB, SPNs"
  - "SPNs [SQL Server]"
---
# Service Principal Name (SPN) Support in Client Connections


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




Beginning with  SQL Server 2008 (10.0.x) 
, support for service principal names (SPNs) has been extended to enable mutual authentication across all protocols. In previous versions of  SQL Server 
, SPNs were only supported for Kerberos over TCP when the default SPN for the  SQL Server 
 instance was registered with Active Directory.

SPNs are used by the authentication protocol to determine the account in which a  SQL Server 
 instance runs. If the instance account is known, Kerberos authentication can be used to provide mutual authentication by the client and server. If the instance account isn't known, NTLM authentication, which only provides authentication of the client by the server, is used. Currently, OLE DB Driver for SQL Server does the authentication lookup, deriving the SPN from the instance name and network connection properties.  SQL Server 
 instances will attempt to register SPNs on startup, or they can be registered manually. However, registration will fail if there are insufficient access rights for the account that attempts to register the SPNs.

Domain and computer accounts are registered automatically in Active Directory. These accounts can be used as SPNs, or administrators can define their own SPNs.  SQL Server 
 makes secure authentication more manageable and reliable by allowing clients to directly specify the SPN to use.

> **Note:**
> An SPN specified by a client application is only used when a connection is made with Windows integrated security.

> **Tip:**
> ** Microsoft 
 Kerberos Configuration Manager for  SQL Server 
** is a diagnostic tool that helps troubleshoot Kerberos related connectivity issues with  SQL Server 
. For more information, see [Microsoft Kerberos Configuration Manager for SQL Server](https://www.microsoft.com/download/details.aspx?id=39046).

For more information about Kerberos, see the following articles:

- [Kerberos Technical Supplement for Windows](https://learn.microsoft.com/previous-versions/msp-n-p/ff649429\(v=pandp.10\))

- [Microsoft Kerberos](https://learn.microsoft.com/windows/win32/secauthn/microsoft-kerberos)

## Usage

The following table describes the most common scenarios in which client applications can enable secure authentication.

| Scenario | Description |
| --- | --- |
| A legacy application doesn't specify an SPN. | This compatibility scenario guarantees that there will be no behavior change for applications developed for previous versions of  SQL Server |
| . If no SPN is specified, the application relies on generated SPNs and has no knowledge of which authentication method is used. |
| A client application using the current version of OLE DB Driver for SQL Server specifies an SPN in the connection string as a domain user or computer account, as an instance-specific SPN, or as a user-defined string. | The **ServerSPN** keyword can be used in a provider, initialization, or connection string to specify the following values:<br /><br /> -Specify the account used by the  SQL Server |
 | instance for a connection. This setting simplifies access to Kerberos authentication. If a Kerberos Key Distribution Center (KDC) is present and the correct account is specified, Kerberos authentication is more likely to be used than NTLM. The KDC usually is on the same computer as the domain controller.<br /><br /> -Specify an SPN to look up the service account for the  SQL Server |
 | instance. For every  SQL Server |
 | instance, two default SPNs are generated that can be used for this purpose. These keys aren't guaranteed to be present in Active Directory, however, so in this situation Kerberos authentication isn't guaranteed.<br /><br /> -Specify an SPN that will be used to look up the service account for the  SQL Server |
 | instance. This value can be any user-defined string that maps to the service account. In this case, the key must be registered manually in the KDC and must satisfy the rules for a user-defined SPN.<br /><br /> The **FailoverPartnerSPN** keyword can be used to specify the SPN for the failover partner server. The range of account and Active Directory key values is the same as the values you can specify for the principal server. |
| An OLE DB application specifies an SPN as a data source initialization property for the principal server or for a failover partner server. | The connection property **SSPROP_INIT_SERVER_SPN** in the **DBPROPSET_SQLSERVERDBINIT** property set can be used to specify the SPN for a connection.<br /><br /> The connection property **SSPROP_INIT_FAILOVER_PARTNER_SPN** in the **DBPROPSET_SQLSERVERDBINIT** can be used to specify the SPN for the failover partner server. |
| The user specifies an SPN for a server or failover partner server in an OLE DB **Data Link** or **Login** dialog box. | The SPN can be specified in a **Data Link** or **Login** dialog box. |
| An OLE DB application determines the authentication method used to establish a connection. | When a connection has been opened successfully, an application can query the connection property **SSPROP_AUTHENTICATION_METHOD** in the **DBPROPSET_SQLSERVERDATASOURCEINFO** property set to determine which authentication method was used. The values will include, but aren't limited to, **NTLM** and **Kerberos**. |

## Failover

SPNs aren't stored in the failover cache and as such cannot be passed between connections. SPNs will be used on all connection attempts to the principal and partner when specified in the connection string or connection attributes.

## Connection Pooling

Applications should be aware that specifying SPNs in some but not all connection strings can contribute to pool fragmentation.

Applications can programmatically specify SPNs as connection attributes, instead of specifying connection string keywords. This method can help manage connection pool fragmentation.

Applications should be aware that SPNs in connection strings can be overridden by setting the corresponding connection attributes, but connection strings used by connection pooling will use the connection string values for pooling purposes.

## Down-Level Server Behavior

The new connection behavior is implemented by the client; therefore, it isn't specific to a version of  SQL Server 
.

## Linked Servers and Delegation

When linked servers are created, the **\@provstr** parameter of [sp_addlinkedserver](../../../relational-databases/system-stored-procedures/sp-addlinkedserver-transact-sql.md) can be used to specify the server and failover partner SPNs. The benefits of this method are the same as specifying SPNs in client connection strings: It's simpler and more reliable to establish connections that use Kerberos authentication.

Delegation with linked servers requires Kerberos authentication.

## Management Aspects of SPNs Specified by Applications

When choosing whether to specify SPNs in an application (through connection strings) or programmatically through connection properties (rather than relying on the default provider-generated SPNs), consider the following factors:

- Security: Does the specified SPN reveal information that is protected?

- Reliability: To enable the use of default SPNs, the service account in which the  SQL Server 
 instance runs must have sufficient privileges to update the Active Directory on the KDC.

- Convenience and location transparency: How will an application's SPNs be affected if its database moves to a different  SQL Server 
 instance? This concept applies to both the principal server and its failover partner if you use database mirroring. If a server change means that SPNs must be changed, how will this affect applications? Will any changes be managed?

## Specifying the SPN

You can specify an SPN in dialog boxes and in code. This section discusses how you can specify an SPN.

The maximum length for an SPN is 260 characters.

The syntax that SPNs use in connection string or connection attributes is as follows:

| Syntax | Description |
| --- | --- |
| MSSQLSvc/*fqdn* | The provider-generated, default SPN for a default instance when a protocol other than TCP is used.<br /><br /> *fqdn* is a fully qualified domain name. |
| MSSQLSvc/*fqdn*:*port* | The provider-generated, default SPN when TCP is used.<br /><br /> *port* is a TCP port number. |
| MSSQLSvc/*fqdn*:*InstanceName* | The provider-generated, default SPN for a named instance when a protocol other than TCP is used.<br /><br /> *InstanceName* is a  SQL Server |
 | instance name. |
| HOST/*fqdn*<br /><br /> HOST/*MachineName* | The SPN that maps to built-in computer accounts that are automatically registered by Windows. |
| *Username*@*Domain* | Direct specification of a domain account.<br /><br /> *Username* is a Windows user account name.<br /><br /> *Domain* is a Windows domain name or fully qualified domain name. |
| *MachineName*$@*Domain* | Direct specification of a computer account.<br /><br /> (If the server you're connecting to is running under LOCAL SYSTEM or NETWORK SERVICE accounts, to get Kerberos authentication, **ServerSPN** can be in the *MachineName*$@*Domain* format.) |
| *KDCKey*/*MachineName* | A user-specified SPN.<br /><br /> *KDCKey* is an alphanumeric string that conforms to the rules for a KDC key. |

## OLE DB Syntax Supporting SPNs

For syntax-specific information, see the following articles:

- [Service Principal Names &#40;SPNs&#41; in Client Connections &#40;OLE DB&#41;](../ole-db/service-principal-names-spns-in-client-connections-ole-db.md)

## Related content

- [OLE DB Driver for SQL Server Features](oledb-driver-for-sql-server-features.md)
- [Register a Service Principal Name for Kerberos connections](../../../database-engine/configure-windows/register-a-service-principal-name-for-kerberos-connections.md)
