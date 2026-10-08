---
title: Manage Automatic Connection
description: In this article, you learn how you can manage the automatic connection of SQL Server instance resources to Azure Arc with SQL Server enabled by Azure Arc.
author: pochiraju
ms.author: rajpo
ms.reviewer: randolphwest, twright
ms.date: 09/24/2025
ms.topic: how-to
---

# Manage automatic connection for SQL Server enabled by Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

SQL Server instances are automatically connected to Azure Arc when they are installed on an Azure Arc-enabled Server and the Arc server resource is in a [supported region](prerequisites.md#supported-regions). All the SQL Server instance resources are automatically created in Azure, providing a centralized management platform for all your SQL Server instances. For more information, visit [SQL Server enabled by Azure Arc](overview.md).

This article details how the streamlined process of connecting SQL Server to Azure works.

> **Note:**  
> 
For existing servers that use `1.1.2859.223` or later versions, when auto-upgrade is enabled, the least-privilege configuration is applied eventually as part of automatic upgrades. To prevent automatic application of the least-privilege configuration, block extension upgrades after `1.1.2859.223`.


## Prerequisites

1. Complete the [Prerequisites - SQL Server enabled by Azure Arc](prerequisites.md).
 1. For Always On availability groups, complete the steps on all nodes. 

<a id="license-type-tag"></a>

## Specify license type

Optionally, specify the license type for each instance of SQL Server.

To specify the desired license type, provide the license type value tag. The automatic connecting workflow requires that tag. For more information, visit [Tag resources, resource groups, and subscriptions for a logical organization](https://learn.microsoft.com/azure/azure-resource-manager/management/tag-resources). 

The automatic connection workflow checks for the tag at the subscription level first, then resource group level, then resource level.

Add one of the following tags and values to your subscription, resource groups, or Arc Server resources.

| Tag | Value |
| --- | --- |
| `ArcSQLServerExtensionDeployment` | `Paid` |
| `ArcSQLServerExtensionDeployment` | `PAYG` |
| `ArcSQLServerExtensionDeployment` | `PAYG-Recurring` |
| `ArcSQLServerExtensionDeployment` | `LicenseOnly` |

> **Important:**  
> - **CSP-managed subscriptions**: Use the `PAYG-Recurring` tag to register consent for recurring pay-as-you-go billing. This is required for CSP subscriptions. For more information, see [Transition from License provided by SPLA vendor](manage-pay-as-you-go-transition.md#transition-from-spla).
> - **Automatic license detection**: If no tag is set and you have Software Assurance or SQL Server subscription with available licenses, Microsoft automatically sets the license type to **Paid** for newly onboarded instances, giving you access to SA customer features.

### License type setting precedence

## Automatically install the Azure Extension for SQL Server on new servers connected to Arc

Microsoft automatically installs Azure extension for SQL Server on each Arc-enabled server connected to Azure Arc if it has any installed SQL Server instances. This automated process involves the following tasks:

1. Register the `Microsoft.AzureArcData` resource provider if not already registered.

1. Set the license type.

1. Install the Azure extension for SQL Server.

    > **Note:**  
    > The license type is set if the `ArcSQLServerExtensionDeployment` tag value is set.

1. Create Arc-enabled SQL Server instance resource in Azure.

To automatically connect 
 SQL Server 
 enabled by Azure Arc, use one of the provided methods that meet your requirements [Deployment options for SQL Server enabled by Azure Arc](deployment-options.md).

Once the connecting is complete, you can benefit from the Azure features for SQL Server. For more information, visit [Configure SQL Server enabled by Azure Arc](manage-configuration.md).

## Verify and correct the license type configuration

To verify the license type configuration created by the onboarding process, run this resource graph query.

```msgraph-interactive
resources
| where type == "microsoft.hybridcompute/machines"
| extend
    joinID = toupper(id)
| join kind = inner (
    resources
    | where type == "microsoft.hybridcompute/machines/extensions"
    | extend machineId = toupper(substring(id, 0, indexof(id, '/extensions')))
    | where properties.type in ("WindowsAgent.SqlServer","LinuxAgent.SqlServer")
    | extend licenseType = iff(properties.settings.LicenseType == '', 'Configuration needed', properties.settings.LicenseType)
    | project  machineId, licenseType
) on $left.joinID == $right.machineId
| project id, licenseType
```

The value `Configuration needed` indicates that the onboarding process didn't have enough information to configure the license type automatically. For details how to set the missing value, or change a value automatically configured, visit [Configure SQL Server enabled by Azure Arc](manage-configuration.md).

> **Note:**  
> When the license type is **Paid** or **PAYG**, additional management features are available for instances covered by Software Assurance or pay-as-you-go licenses.

## Opt out of automatic connecting

To opt out of the automatic installation of Azure extension for SQL Server, add the following tag and value to a subscription, resource group(s), or Arc Server resource(s). If there are already existing Arc-enabled servers in the subscription or resource group, it might take up to 8 hours for any changes to the tag value to take effect, as the tag value is cached.

| Tag | Value |
| --- | --- |
| `ArcSQLServerExtensionDeployment` | `Disabled` |

Alternatively, you can limit which extensions can be installed on your server. You can configure lists of the extensions you wish to allow and block on the server. To learn more, see [Extension allowlists and blocklists](https://learn.microsoft.com/azure/azure-arc/servers/security-overview#extension-allowlists-and-blocklists).

## Learn how Microsoft automatically installs Azure extension for SQL Server

Microsoft can run extension installations on an Arc-enabled server through the Windows service Guest Configuration Extension service (`ExtensionService`). When the server is connected to Arc, the Windows service Guest Configuration Extension service (`ExtensionService`) is installed. This service is responsible for installing, upgrading, and deleting extensions (agents, scripts, or other software) on the machine. The guest configuration and extension services run as Local System on Windows and as root on Linux. For details about the Arc agent services and service accounts, review [Agent security and permissions | Agent security and permissions](https://learn.microsoft.com/azure/azure-arc/servers/security-overview#agent-security-and-permissions)

Microsoft can call APIs to deploy Azure extension for SQL Server and automatically connect to Arc-enabled SQL Server.

You can also install the extensions using the Azure portal, Azure Resource Manager (ARM) APIs, Azure Policy, ARM templates, the Azure CLI, or the Azure PowerShell module. [Deployment options for SQL Server enabled by Azure Arc](deployment-options.md)

## Find SQL Server instances connected to Arc, but missing Azure extension for SQL Server

Use the following Azure graph query to list the machine and subscription IDs that contain Arc Servers with SQL Server installed but missing the Azure extension for SQL Server.

```msgraph-interactive
resources
| where type == "microsoft.hybridcompute/machines" and properties['detectedProperties']['mssqldiscovered'] has "true"
| extend
    joinID = toupper(id)
| join kind= inner  (
    resources
    | where type == "microsoft.hybridcompute/machines/extensions"
    | extend machineId = toupper(substring(id, 0, indexof(id, '/extensions')))
    | project machineId, name
    | summarize allExtensions = make_list(name) by machineId
    | where allExtensions !has ("SqlServer")
) on $left.joinID == $right.machineId
| project id, subscriptionId, tenantId
```

## Upgrade the extension

To determine the version of the current extension release, review the [release notes](release-notes.md).

To check the version of your extension, use the following PowerShell command:

```PowerShell
azcmagent version
```

To simplify extension upgrades, be sure to enable [automatic updates](update.md). You can also manually upgrade the extension by using the Azure portal, PowerShell and the Azure CLI. 

#### [Azure portal](#tab/azure-portal)

To upgrade the extension in the Azure portal, follow these steps:
1. In the Azure portal, go to [Machines - Azure Arc](https://portal.azure.com/#view/Microsoft_Azure_ArcCenterUX/ArcCenterMenuBlade/~/sqlServerInstances).
1. Select the name of the machine where SQL Server is installed to open the **Overview** pane for your server.
1. Under **Settings**, select **Extensions**.
1. Check the box for the `WindowsAgent.SqlServer` extension and then select **Update** from the navigation menu. 

   Screenshot of the Extension pane for the Machine - Azure Arc pane in the Azure portal, with update highlighted.

1. Select **Yes** on the **Update extension** confirmation dialog box to complete the upgrade.


#### [PowerShell](#tab/powershell)

To upgrade the extension by using PowerShell, first install the `Az.ConnectedMachine` module with the following command (if you haven't already):

```PowerShell
Install-Module -Name Az.ConnectedMachine
```

Then, use the following command to upgrade the extension:

```PowerShell
# Variables 
$Subscription_Id = "<SubscriptionId>" 
$ResourceGroup = "<ResourceGroup>" 
$MachineName = "<MachineName>" 
$ExtensionName = "WindowsAgent.SqlServer" 
$Publisher = "Microsoft.AzureData" 
$TargetVersion = "<LatestVersion>"  # Example: 1.1.3211.337 

# Upgrade the extension 
Set-AzContext -Subscription $SubscriptionId 

$params = @{
  ResourceGroupName = $ResourceGroup
  MachineName = $MachineName
  Name = $ExtensionName
  Publisher = $Publisher
  Type = $ExtensionName
  TypeHandlerVersion = $TargetVersion
}

Update-AzConnectedMachineExtension @params
```


#### [Azure CLI](#tab/azure-cli)

To upgrade the extension by using the Azure CLI, first install the `connectedmachine` extension with the following command (if you haven't already):

```azurecli
az extension add --name connectedmachine 
```

Then, use the following command to upgrade the extension:

```azurecli
# Variables 
Subscription_Id="<SubscriptionId>" 
Resource_Group="<ResourceGroup>" 
Machine_Name="<ArcEnabledServerName>" 
Extension_Name="WindowsAgent.SqlServer" 
Publisher="Microsoft.AzureData" 
Target_Version="<LatestVersion>"  # Example: 1.1.3211.337 

# Upgrade the extension 

az account set --subscription $Subscription_Id 
az connectedmachine extension update \ 
    --resource-group $Resource_Group \ 
    --machine-name $Machine_Name \ 
    --name $Extension_Name \ 
    --publisher $Publisher \ 
    --type $Extension_Name \ 
    --type-handler-version $Target_Version 
```

---

For more information about upgrading the Azure extension for SQL Server, see [Upgrade extension](https://learn.microsoft.com/azure/azure-arc/servers/manage-vm-extensions-cli#upgrade-extensions).




## Related content

- [Configure best practices assessment for SQL Server enabled by Azure Arc](assess.md)
- [Manage inventory of SQL Server resources with Azure Arc](view-inventory.md)
- [Configure SQL Server enabled by Azure Arc](manage-configuration.md)
- [Use activity logs with SQL Server enabled by Azure Arc](activity-logs.md)
- [Data collection and reporting for SQL Server enabled by Azure Arc](data-collection.md)
