---
title: Prerequisites
description: Describes prerequisites required for SQL Server enabled by Azure Arc.
author: pochiraju
ms.author: rajpo
ms.reviewer: randolphwest
ms.date: 04/16/2026
ms.topic: checklist
ms.custom:
  - references_regions
ai-usage: ai-assisted
---

# Prerequisites - SQL Server enabled by Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

An Azure Arc-enabled instance of  SQL Server 
 is an instance on-premises or in a cloud provider that is connected to Azure Arc. This article explains those prerequisites.

If your SQL Server virtual machines run in VMware vSphere-based environments (including environments licensed through VMware vSphere Foundation or VMware Cloud Foundation), review [Support on VMware](#support-on-vmware).

## Before you deploy

Before you can Arc-enable an instance of  SQL Server 
, you need to:

- Create an Azure account with an active subscription. If needed, [create a free Azure Account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Verify [Arc connected machine agent prerequisites](https://learn.microsoft.com/azure/azure-arc/servers/prerequisites). The Arc agent must run in the typical 'full' mode.
- Verify [Arc connected machine agent network requirements](https://learn.microsoft.com/azure/azure-arc/servers/network-requirements).
- Open firewall to [Azure Arc data processing service](#connect-to-azure-arc-data-processing-service).
- Confirm connectivity access to the following two domains:
   - `aka.ms`
   - `*.web.core.windows.net`
- Register resource providers. Specifically:
  - `Microsoft.AzureArcData`
  - `Microsoft.HybridCompute`

  For instructions, see [Register resource providers](#register-resource-providers).

### Installation account permissions

The user or service principal needs:

- Read permission on the subscription
- Local administrator permission on the operating system to install and configure the agent
  - For Linux, use the root account
  - For Windows, use an account that's a member of the Local Administrators group

Before enabling your SQL Server instances with Arc, the installation script checks:

- The region where the Arc-enabled SQL Server is supported
- `Microsoft.AzureArcData` resource provider is registered

These checks require read permission on the subscription for the user.

To complete the task, the user or service principal needs the following permissions in the Azure resource group:

- [`Azure Connected Machine Onboarding`](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#azure-connected-machine-onboarding) role
- `Microsoft.AzureArcData/register/action`
- `Microsoft.HybridCompute/machines/extensions/read`
- `Microsoft.HybridCompute/machines/extensions/write`
- `Microsoft.Resources/deployments/validate/action`

Assign users to built-in roles that have these permissions, such as:

- [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#contributor)
- [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner)

For more information, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

### Verify state of user databases

When a SQL Server instance is enabled by Azure Arc, the connection sets some database permissions so that you can manage databases from Azure. For details about the permissions set at a database level, see [SQL permissions](configure-windows-accounts-agent.md#sql-permissions).

Only databases that are online and updatable are included.

Verify the state of any databases you plan to manage from Azure.

This query lists all databases, their status, and if they're updatable:

```sql
SELECT name AS DatabaseName,
       CASE WHEN state_desc = 'ONLINE' THEN 'Online'
            WHEN state_desc = 'OFFLINE' THEN 'Offline'
            ELSE 'Unknown'
       END AS Status,
       CASE WHEN is_read_only = 0 THEN 'READ_WRITE'
            ELSE 'READ_ONLY'
       END AS UpdateableStatus
FROM sys.databases;
```

Run that query on any instance that you enable.

### Service account permissions

The SQL Server service account must be a member of the **sysadmin** fixed server role on each SQL Server instance. By default, the SQL Server service account is a member of the **sysadmin** fixed server role.

For more information about this requirement, see [SQL Server service account](configure-least-privilege.md#optional-manage-the-sql-server-database-engine-service-account).

### NT AUTHORITY\SYSTEM login requirements

The Azure extension for SQL Server Deployer runs under the `LocalSystem` (`NT AUTHORITY\SYSTEM`) account to perform permission configuration. As part of this process, the deployer connects to each SQL Server instance using Windows integrated authentication.

By default, `NT AUTHORITY\SYSTEM` has a SQL Server login with `CONNECT SQL` permission. In environments where SQL Server security hardening removes or restricts the `NT AUTHORITY\SYSTEM` login (such as by disabling the login or denying `CONNECT SQL`), the Azure extension for SQL Server fails to provision successfully.

Before running this query in a production environment, review and test it in a non-production or test environment to validate the results. To verify that `NT AUTHORITY\SYSTEM` can connect to SQL Server, run the following query on each instance (review and test in a non-production or test environment before running in production):

```sql
SELECT sp.name AS login_name,
       CASE WHEN sp.is_disabled = 1 THEN 'DISABLED' ELSE 'ENABLED' END AS login_status,
       ISNULL(p.state_desc, 'NONE (implicit)') AS connect_sql_permission
FROM sys.server_principals AS sp
     LEFT OUTER JOIN sys.server_permissions AS p
         ON p.grantee_principal_id = sp.principal_id
        AND p.permission_name = N'CONNECT SQL'
        AND p.class_desc = N'SERVER'
WHERE sp.name = N'NT AUTHORITY\SYSTEM';
```

Successful provisioning requires that:

- The login exists (a row is returned)
- The login status is `ENABLED`
- `CONNECT SQL` permission is granted

If your organization determines that re-adding the `NT AUTHORITY\SYSTEM` account or granting extra permissions is acceptable for your environment, restore connectivity by creating the authentication and granting `CONNECT SQL` permission:

```sql
CREATE LOGIN [NT AUTHORITY\SYSTEM] FROM WINDOWS;
GRANT CONNECT SQL TO [NT AUTHORITY\SYSTEM];
```

After making changes, verify that the extension provisions successfully.

### Set proxy exclusions

> **Note:**
> Starting with the April 2024 release (extension version 1.1.2986.256), you don't need to set these exclusions. You can also use `NO_PROXY` to bypass the proxy for specific URLs while routing all other requests through the proxy server. For example, use `NO_PROXY` to route requests to Azure Key Vault through private endpoints.

Set the `NO_PROXY` environment variable to exclude proxy traffic for the following addresses when either condition applies:

- The extension version is earlier than 1.1.2986.256.
- The machine has a system-level `HTTPS_PROXY` environment variable, regardless of the extension version. This condition prevents requests to the local Azure Arc identity endpoint (`https://localhost:40341`) from being routed through the proxy.

Exclude these addresses:

- `localhost`
- `127.0.0.1`

### Connect to Azure Arc data processing service


Arc-enabled  SQL Server 
 requires outbound connection to Azure Arc Data Processing Service.

Each virtual or physical server needs to communicate with Azure. Specifically, they require connectivity to:

- URL: `*.<region>.arcdataservices.com`
  - For US Government Virginia regions, use `*.<region>.arcdataservices.azure.us`.
- Port: 443
- Direction: Outbound
- Authentication provider: Microsoft Entra ID

To get the region segment of a regional endpoint, remove all spaces from the Azure region name. For example, *East US 2* region, the region name is `eastus2`.

For example: `*.<region>.arcdataservices.com` should be `*.eastus2.arcdataservices.com` in the East US 2 region.

For a list of supported regions, review [Supported Azure regions](overview.md#supported-azure-regions).

For a list of all regions, run this command:

```azcli
az account list-locations -o table
```


> **Note:**  
> You can't use Azure Private Link connections to the Azure Arc data processing service. See [Unsupported configurations](#unsupported-configurations).

### Network requirements for enabling Microsoft Entra authentication


Enabling Microsoft Entra authentication for  SQL Server 
 enabled by Azure Arc requires some URLs to be allowed explicitly if a firewall blocks outbound URLs. Add the following URLs to the allowlist:

- `https://login.microsoftonline.com/`
- `https://login.microsoft.com/`
- `https://enterpriseregistration.windows.net/`
- `https://graph.microsoft.com/`
- `https://<azure-keyvault-name>.vault.azure.net/` (Required only if you're using certificates for Microsoft Entra authentication)

Additionally, you might need to allow [Azure portal authentication URLs](https://learn.microsoft.com/azure/azure-portal/azure-portal-safelist-urls#azure-portal-authentication).


## Supported extension versions

Only extensions released within the last 12 months are supported. If you contact support and the extension version is out of support, the support team might ask you to update to the latest version before proceeding with troubleshooting. For version history and release dates, see [Release Notes](release-notes.md).

## Supported SQL Server versions and environments


## Supported configurations

### SQL Server version

 SQL Server 2014 (12.x)
 and later versions.

> **Note:**
> Only 64-bit SQL Server versions are supported.
 
### Operating systems

- Windows 10 and 11
- Windows Server 2016
 and later versions
- Ubuntu 20.04 (x64)
- Red Hat Enterprise Linux (RHEL) 8 (x64)
- SUSE Linux Enterprise Server (SLES) 15 (x64)

### .NET Framework

On Windows, .NET Framework 4.7.2 and later.

This requirement starts with extension version `1.1.2504.99` (November, 14 2023 release). Without this version, the extension might not function as intended.

### Support on VMware

You can deploy SQL Server enabled by Azure Arc in VMware VMs running:

- On-premises
- In VMware solutions, for example:
  - Azure VMware Solution (AVS)

    
VMware vSphere remains the underlying virtualization platform. Following Broadcom's acquisition of VMware, the vSphere product name didn't change; however, VMware updated how vSphere is packaged and licensed (for example, through VMware vSphere Foundation and VMware Cloud Foundation).

> **Warning:**
>
> If you're running SQL Server VMs in Azure VMware Solution (AVS) private cloud, follow the steps in [Deploy Arc-enabled Azure VMware Solution](https://learn.microsoft.com/azure/azure-vmware/deploy-arc-for-azure-vmware-solution) to enable.
>
> This is the only deployment mechanism that provides you with a fully integrated experience with Arc capabilities within the AVS private cloud.


  - VMware Cloud on AWS
  - Google Cloud VMware Engine

#### VMware packaging and support scope

SQL Server enabled by Azure Arc supports SQL Server instances running on virtual machines hosted in VMware vSphere–based environments, including Azure VMware Solution.

Support doesn't depend on specific VMware commercial bundles, editions, or packaging. The following requirements determine support:

- The supported guest operating system
- The supported SQL Server version
- Azure Arc Connected Machine agent requirements

VMware (Broadcom) defines VMware packaging, licensing, and lifecycle policies and may change them independently of Azure Arc.


## Unsupported configurations


Azure Arc-enabled  SQL Server 
 doesn't currently support the following configurations:

- Windows Server versions earlier than Windows Server 2016
. These versions don't have the minimum required versions of TLS to securely authenticate to Azure.
-  SQL Server 
 running in containers.
-  SQL Server 
 editions: Business Intelligence.
- Private Link connections to the Azure Arc data processing service at the `<region>.arcdataservices.com` endpoint used for inventory and usage upload.
-  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
, and older versions.
- Installing the Arc agent and  SQL Server 
 extension can't be done as part of sysprep image creation.
- Multiple instances of  SQL Server 
 installed on the same host operating system with the same instance name.
-  SQL Server 
 in Azure Virtual Machines.
- An Always On availability group where one or more replicas is on a failover cluster instance.
- SQL Server Reporting Services (SharePoint Mode).
- [DBCC CLONEDATABASE (Transact-SQL)](../../t-sql/database-console-commands/dbcc-clonedatabase-transact-sql.md) throws error on the default installation of the Azure extension for SQL Server. To run the `DBCC CLONEDATABASE`, the Azure extension must be run in [least privilege mode](configure-least-privilege.md).
- Database and availability group names with trailing whitespace (for example, `MyDb `) aren't supported on instances using binary collations (`BIN`/`BIN2`). These objects are skipped by the extension with a warning. On non-binary collations (the default), trailing whitespace is automatically trimmed, and the objects are managed normally.
- SQL Server instance names containing a `#` symbol aren't supported. For a complete list of naming rules and restrictions, review [naming rules and restrictions](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules).


## Register resource providers

To register the resource providers, use one of the following methods:

## [Azure portal](#tab/azure)

1. Select **Subscriptions**.
1. Choose your subscription.
1. Under **Settings**, select **Resource providers**.
1. Search for `Microsoft.AzureArcData` and `Microsoft.HybridCompute` and select **Register**.

## [PowerShell](#tab/powershell)

Run:

```powershell
Register-AzResourceProvider -ProviderNamespace Microsoft.HybridCompute
Register-AzResourceProvider -ProviderNamespace Microsoft.AzureArcData
```

## [Azure CLI](#tab/az)

Run:

```azurecli
az provider register --namespace 'Microsoft.HybridCompute'
az provider register --namespace 'Microsoft.AzureArcData'
```

---

## Azure subscription and service limits

Before configuring your  SQL Server 
 instances and machines with Azure Arc, review the Azure Resource Manager [subscription limits](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#subscription-limits) and [resource group limits](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#resource-group-limits) to plan for the number of machines to connect.

## Supported regions


For successful onboarding and functioning, assign the same region to both the Arc-enabled Server and your Arc-enabled SQL Server instance.

SQL Server enabled by Azure Arc is available in the following regions:

#### [Americas](#tab/americas)

- Brazil South
- Canada Central
- Canada East
- Central US
- East US
- East US 2
- North Central US
- South Central US
- US Government Virginia <sup>1</sup>
- West Central US
- West US
- West US 2
- West US 3

> **Important:**
> <sup>1</sup> Feature availability varies in the US Virginia Government cloud. For government-specific supported features, limitations, and regional constraints, review [SQL Server enabled by Azure Arc in US Virginia Government](us-government-region.md).


#### [Asia Pacific](#tab/asia)

- Australia East
- Central India
- Japan East
- Korea Central
- Southeast Asia

#### [Europe, the Middle East, and Africa](#tab/emea)

- France Central
- North Europe
- Norway East
- South Africa North
- Sweden Central
- Switzerland North
- UAE North
- UK South
- UK West
- West Europe

---


## Install Azure extension for SQL Server

The  SQL Server 2022 (16.x) 
 Setup Installation Wizard doesn't support installation of the Azure extension for SQL Server.

You can install this component in two ways:

- [SQL Server enabled by Azure Arc deployment options](deployment-options.md)
- [Install Azure extension for SQL Server from the command line](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md#install-and-connect-to-azure)

For VMware vSphere-based environments, review [Support on VMware](#support-on-vmware).

## Related content

- [SQL Server enabled by Azure Arc](overview.md)
- [Known issues: SQL Server enabled by Azure Arc](known-issues.md)
