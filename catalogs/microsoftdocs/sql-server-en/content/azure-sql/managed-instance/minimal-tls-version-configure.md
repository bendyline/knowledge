---
title: Configure Minimal TLS Version - SQL Managed Instance
description: "Learn how to configure minimal TLS version for a managed instance"
author: zoran-rilak-msft
ms.author: zoranrilak
ms.reviewer: mathoma, vanto
ms.date: 07/17/2025
ms.service: azure-sql-managed-instance
ms.subservice: security
ms.topic: how-to
ms.custom:
  - devx-track-azurecli
ms.devlang: azurecli
---
# Configure minimal TLS version in Azure SQL Managed Instance

> **Important:**  
> **Retirement changes**
>
> Azure has announced that support for older TLS versions (TLS 1.0, and 1.1) ends August 31, 2025. For more information, see [TLS 1.0 and 1.1 deprecation](https://azure.microsoft.com/updates/azure-support-tls-will-end-by-31-october-2024-2/).
> Starting November 2024, you'll no longer be able to set the minimal TLS version for Azure SQL Managed Instance client connections below TLS 1.2.

The minimum [Transport Layer Security (TLS)](https://learn.microsoft.com/troubleshoot/sql/database-engine/connect/tls-1-2-support-microsoft-sql-server) version setting allows customers to control the version of TLS used by their Azure SQL Managed Instance.

Setting **Minimum TLS version** to 1.2 is currently enforced for SQL Managed Instance. Setting a minimum TLS version ensures that subsequent, newer TLS versions are supported. Only connections using TLS 1.2 or above are accepted.

For more information, see [TLS considerations for SQL Database connectivity](../database/connect-query-content-reference-guide.md#tls-considerations-for-database-connectivity).

After setting the Minimum TLS version, login attempts from clients that are using a TLS version lower than the minimum TLS version of the server will fail with following error:

```output
Error 47072
Login failed with invalid TLS version
```

> **Note:**
> - When you configure a minimum TLS version, that minimum version is enforced at the application layer. Tools that attempt to determine TLS support at the protocol layer might return TLS versions in addition to the minimum required version when run directly against the managed instance endpoint.
> - TLS 1.0 and 1.1 is [retired](#upcoming-tls-10-and-11-retirement-changes-faq) and no longer available. 

## Set minimal TLS version via PowerShell

> **Note:**
> This article uses the Azure Az PowerShell module, which is the recommended PowerShell module for interacting with Azure. To get started with the Az PowerShell module, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps). To learn how to migrate to the Az PowerShell module, see [Migrate Azure PowerShell from AzureRM to Az](https://learn.microsoft.com/powershell/azure/migrate-from-azurerm-to-az).

> **Important:**
> The PowerShell Azure Resource Manager (AzureRM) module was deprecated on February 29, 2024. All future development should use the Az.Sql module. Users are advised to migrate from AzureRM to the Az PowerShell module to ensure continued support and updates. The AzureRM module is no longer maintained or supported. The arguments for the commands in the Az PowerShell module and in the AzureRM modules are substantially identical. For more about their compatibility, see [Introducing the new Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az).

The following script requires the [Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps).

The following PowerShell script shows how to `Get` and `Set` the **Minimal TLS Version** property at the instance level:

```powershell
#Get the Minimal TLS Version property
(Get-AzSqlInstance -Name sql-instance-name -ResourceGroupName resource-group).MinimalTlsVersion

# Update Minimal TLS Version Property
Set-AzSqlInstance -Name sql-instance-name -ResourceGroupName resource-group -MinimalTlsVersion "1.2"
```

## Set Minimal TLS Version via Azure CLI

> **Important:**
> All scripts in this section require [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

### Azure CLI in a bash shell

The following CLI script shows how to change the **Minimal TLS Version** setting in a bash shell:

```azurecli-interactive
# Get current setting for Minimal TLS Version
az sql mi show -n sql-instance-name -g resource-group --query "minimalTlsVersion"

# Update setting for Minimal TLS Version
az sql mi update -n sql-instance-name -g resource-group --set minimalTlsVersion="1.2"
```

## Upcoming TLS 1.0 and 1.1 retirement changes FAQ

Azure has announced that support for older TLS versions (TLS 1.0, and 1.1) ends August 31, 2025. For more information, see [TLS 1.0 and 1.1 deprecation](https://azure.microsoft.com/updates/azure-support-tls-will-end-by-31-october-2024-2/).

Starting November 2024, you'll no longer be able to set the minimal TLS version for Azure SQL Database and Azure SQL Managed Instance client connections below TLS 1.2.

#### Why is TLS 1.0 and 1.1 being retired?

TLS versions 1.0 and 1.1 are outdated and no longer meet modern security standards. They're being retired to:

- Reduce exposure to known vulnerabilities.
- Align with industry best practices and compliance requirements.
- Ensure clients are using stronger encryption protocols like TLS 1.2 or TLS 1.3.

#### What happens if TLS 1.0 and 1.1 are used after August 31, 2025?

After August 31, 2025, TLS 1.0 and 1.1 will no longer be supported, and connections using TLS 1.0 and 1.1 will likely fail. It's critical to transition to a minimum of TLS 1.2 or higher before the deadline.

#### How can I check if my SQL Database, SQL Managed Instance, Cosmos DB, or MySQL instances are using TLS 1.0/1.1?

- To identify clients that are connecting to your Azure SQL Database using TLS 1.0 and 1.1, [SQL audit logs](https://learn.microsoft.com/azure/azure-sql/database/auditing-setup) must be enabled. With auditing enabled, you can view client connections.

- To identify clients that are connecting to your Azure SQL Managed Instance using TLS 1.0 and 1.1, [auditing](https://learn.microsoft.com/azure/azure-sql/managed-instance/auditing-configure) must be enabled. With auditing enabled, you can [consume audit logs](https://learn.microsoft.com/azure/azure-sql/managed-instance/auditing-configure#consume-audit-logs) with Azure Storage, Event Hubs, or Azure Monitor Logs to view client connections.

- To verify the minimum TLS version of your Azure Cosmos DB, [get the current value of the `minimalTlsVersion` property](https://learn.microsoft.com/azure/cosmos-db/self-serve-minimum-tls-enforcement#how-to-verify-minimum-tls-version-enforcement) using Azure CLI or Azure PowerShell.

- To verify the minimum TLS version configured for your Azure Database for MySQL Server, check the value of the `tls_version` server parameter using the MySQL command-line interface to understand what protocols are configured.

#### Why was my service flagged if I've already configured TLS 1.2?

Services might be incorrectly flagged due to:

- Intermittent fallback to older TLS versions by legacy clients.
- Misconfigured client libraries or connection strings that don't enforce TLS 1.2.
- Telemetry lag or false positives in detection logic.

#### What should I do if I received a retirement notice in error?

If your server or database is already configured with minimum TLS 1.2, or configured with no minimum TLS (the default setting in SQL Database and SQL Managed Instance `minimalTLSVersion` that maps to `0`) and connecting with 1.2, no action is required.

#### What happens if my application or client library doesn't support TLS 1.2?

Connections will fail once TLS 1.0/1.1 are disabled. You must upgrade your client libraries, drivers, or frameworks to versions that support TLS 1.2.

#### What if my server is configured with no minimum TLS version?

Servers configured with no minimum TLS version and connecting with TLS 1.0/1.1 should be upgraded to minimum TLS version 1.2. For servers configured with no minimum TLS version and connecting with 1.2, no action is required. For servers configured with no minimum TLS version and using encrypted connections, no action is required.

#### How will I be notified about TLS retirement for my resources?

Email reminders will continue leading up to the retirement of TLS 1.0 and 1.1 in August.

#### Who can I contact if I need help with validating or with updating my TLS settings?

If you need help with validating or with updating your TLS settings, contact [Microsoft Q\&A](https://learn.microsoft.com/answers/questions/) or open a support ticket using the Azure portal if you have a support plan.


## Related content

- [Connectivity architecture for Azure SQL Managed Instance](connectivity-architecture-overview.md)
- [Modifiable configuration reference for Azure SQL Managed Instance](modifiable-configuration-reference.md)
