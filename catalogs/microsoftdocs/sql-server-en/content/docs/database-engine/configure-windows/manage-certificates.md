---
title: "Certificate Management (SQL Server Configuration Manager)"
description: Learn how to install certificates in various SQL Server configurations. Examples include single instances, failover clusters, and Always On availability groups.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/28/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "connections [SQL Server], encrypted"
  - "SSL [SQL Server]"
  - "Secure Sockets Layer (SSL)"
  - "encryption [SQL Server], connections"
  - "cryptography [SQL Server], connections"
  - "certificates [SQL Server], installing"
  - "requesting encrypted connections"
  - "installing certificates"
  - "security [SQL Server], encryption"
---
# Certificate management (SQL Server Configuration Manager)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


This article describes how to deploy and manage certificates across your  SQL Server 
 Always On failover cluster instance (FCI) or availability group (AG) topology.

Transport Layer Security (TLS) certificates are widely used to secure access to  SQL Server 
. With earlier versions of  SQL Server 
, organizations with large  SQL Server 
 estates had to spend considerable effort to maintain their  SQL Server 
 certificate infrastructure, often through developing scripts and running manual commands.

**Applies to: \>=sql-server-ver15**

With  SQL Server 2019 (15.x) 
 and later versions, certificate management is integrated into the  SQL Server 
 Configuration Manager, which simplifies the following common tasks:

- View and validate certificates installed in a  SQL Server 
 instance.
- Identify which certificates might be close to expiring.
- Deploy certificates across AG machines from the node hosting the primary replica.
- Deploy certificates across FCI machines from the active node.



You can use certificate management in  SQL Server 
 Configuration Manager with earlier versions of  SQL Server 
, starting with  SQL Server 2008 (10.0.x) 
.

**Applies to: \>=sql-server-ver15**

> **Note:**  
> These instructions apply to  SQL Server 
 Configuration Manager for  SQL Server 2019 (15.x) 
 and later versions. For  SQL Server 2017 (14.x) 
 and earlier versions, see [Certificate management (SQL Server 2017 Configuration Manager)](manage-certificates.md?view=sql-server-2017&preserve-view=true).



**Applies to: <= sql-server-2017**

> **Note:**  
> These instructions apply to  SQL Server 
 Configuration Manager for  SQL Server 2017 (14.x) 
 and earlier versions. For  SQL Server 2019 (15.x) 
 and later versions, see [Certificate management (SQL Server 2019 Configuration Manager)](manage-certificates.md?view=sql-server-ver15&preserve-view=true).

<a id="provision-single-server-cert"></a>

## Install a certificate



**Applies to: \>=sql-server-ver15**

<a id="provision-single-server-cert"></a>

## Install a certificate for a single SQL Server instance

1. In  SQL Server 
 Configuration Manager, in the console pane, expand **SQL Server Network Configuration**.

1. Right-click **Protocols for** *&lt;instance Name&gt;*, and then select **Properties**.

1. Choose the **Certificate** tab, and then select **Import**.

1. Select **Browse** and then select the certificate file.

1. Select **Next** to validate the certificate. If there are no errors, select **Next** to import the certificate to the local instance.


**Applies to: <= sql-server-2017**

1. In  SQL Server 
 Configuration Manager, in the console pane, expand **SQL Server Network Configuration**.

1. Right-click **Protocols for** *&lt;instance Name&gt;*, and then select **Properties**.

1. Select a certificate from the **Certificate** dropdown list, and then select **Apply**.

1. Select **OK**.

### Install on failover cluster instance and availability group

For a failover cluster instance (FCI) configuration, complete these steps in the active node of the FCI. You must have administrator permissions on all the cluster nodes.

For an availability group (AG) configuration, complete these steps from the node hosting the AG primary replica. You must have administrator permissions on all the cluster nodes.



**Applies to: \>=sql-server-ver15**

<a id="provision-failover-cluster-cert"></a>

## Install a certificate in a failover cluster instance configuration

1. In  SQL Server 
 Configuration Manager, in the console pane, expand **SQL Server Network Configuration**.

1. Right-click **Protocols for** *&lt;instance Name&gt;*, and then choose **Properties**.

1. Choose the **Certificate** tab, and then select **Import**.

1. Select the certificate type, and whether to import for the current node only, or for each individual cluster node.

1. If installing for a single node, choose **Browse** and select certificate file. Then skip to step 8.

1. If installing a certificate for each node, select **Next** to list possible owner nodes. Possible owners for the current FCI are preselected.

1. Choose **Next** to select the certificate to be imported.

1. Enter the password when prompted. Look for any warnings or errors after validation.

1. Select **Next** to import the selected certificates.

> **Note:**  
> Complete these steps in the active node of the FCI. User must have administrator permissions on all the cluster nodes.

<a id="provision-availability-group-cert"></a>

## Install a certificate in an availability group configuration

1. In  SQL Server 
 Configuration Manager, in the console pane, expand **SQL Server Network Configuration**.

1. Right-click **Protocols for** *&lt;instance Name&gt;*, and then select **Properties**.

1. Choose the **Certificate** tab, and then select **Import**.

1. Choose the certificate type and select **Next** to select from the list of known availability groups.

1. Select **Next** to choose certificates for each replica node. Certificates should have a file name that matches the netbios name of the nodes.

1. Select **Next** to import the certificate on each node.

> **Note:**  
> Complete these steps from the node hosting the AG primary replica. User must have administrator permissions on all the cluster nodes.



## Related content

- [Certificate requirements for SQL Server](certificate-requirements.md)
- [Transport Layer Security and digital certificates](certificate-overview.md)
