---
title: Connect SQL Server on a Server Already Enabled by Azure Arc
description: Connect an instance of SQL Server to Azure Arc on a server that is already enabled by Azure Arc. Allows you to manage SQL Server centrally, as an Arc-enabled resource.
author: pochiraju
ms.author: rajpo
ms.reviewer: maghan
ms.date: 07/03/2025
ms.topic: how-to
---

# Connect your SQL Server to Azure Arc on a server already enabled by Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

This article explains how to connect your SQL Server instance to Azure Arc on an Arc-enabled server. For example, you need to use this method to connect a SQL Server instance to Azure Arc at this time in US Government Virginia region, because automatic connection isn't currently available in that region. For this case, follow the steps under [Connect](#connect).

If the physical or virtual server isn't connected to Azure yet, follow the steps in [Connect your SQL Server to Azure Arc](connect.md).


> **Important:**  
> Azure Arc automatically installs the Azure extension for SQL Server when a server connected to Azure Arc has SQL Server installed. All the SQL Server instance resources are automatically created in Azure, providing a centralized management platform for all your SQL Server instances.
>
> To automatically connect your SQL Server instances, see [Automatically Connect your SQL Server to Azure Arc](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/azure-arc/automatically-connect.md).
>
> Use the method in this article, if your server is already connected to Azure, but Azure extension for SQL Server is not deployed automatically.
>
> An `ArcSQLServerExtensionDeployment = Disabled` tag is created on the Arc machine resource if the extension is deployed using this method.

## Prerequisites

Verify that `Microsoft.AzureArcData` is registered in each subscription. Review instructions at [Register resource providers](prerequisites.md#register-resource-providers).

Review all of the prerequisites at [Prerequisites - SQL Server enabled by Azure Arc](prerequisites.md).

If the machine with SQL Server is already connected to Azure Arc, to connect the SQL Server instances, install *Azure extension for SQL Server*. The extension is in the extension tab of "Server - Azure Arc" resource as **Azure Extension for SQL Server**.

> **Important:**  
> The Azure resource with type `SQL Server - Azure Arc` representing the SQL Server instance installed on the machine uses the same region and resource group as the Azure resources for Arc-enabled servers.

## Connect

### [Azure portal](#tab/azure)

To install the Azure extension for SQL Server, use the following steps:

1. Open the **Azure Arc > Servers** resource.
1. Search for the connected server with the SQL Server instance that you want to connect to Azure.
1. Under **Extensions**, select **+ Add**.
1. Select `Azure extension for SQL Server` and select **Next**.
1. Specify the SQL Server edition and license type you're using on this machine. Some Arc-enabled SQL Server features are only available for SQL Server instances with Software Assurance (Paid) or with Azure pay-as-you-go. For more information, review [Configure SQL Server enabled by Azure Arc](manage-configuration.md).
1. Specify the SQL Server instance(s) you want to exclude from registering (if you have multiple instances to skip, separate them by spaces) and select **Review + Create**.
   Screenshot for license type and exclude instances.
1. Select **Create**.

### [PowerShell](#tab/powershell)

To install *Azure extension for SQL Server*, run:

```powershell
$Settings = @{ SqlManagement = @{ IsEnabled = $true }; ExcludedSqlInstances = @(<Comma separated names of SQL Server instances, eg: "MSSQLSERVER01","MSSQLSERVER">); LicenseType="<License Type>"}

New-AzConnectedMachineExtension -Name "WindowsAgent.SqlServer" -ResourceGroupName {your resource group name} -MachineName {your machine name} -Location {azure region} -Publisher "Microsoft.AzureData" -Settings $Settings -ExtensionType "WindowsAgent.SqlServer"
```

### [Azure CLI](#tab/az)

To install *Azure extension for SQL Server* for Windows Operating System, run:

```azurecli
az connectedmachine extension create --machine-name "{your machine name}" --location "{azure region}" --name "WindowsAgent.SqlServer" --resource-group "{your resource group name}" --type "WindowsAgent.SqlServer" --publisher "Microsoft.AzureData" --settings "{\"SqlManagement\":{\"IsEnabled\":true}, \"LicenseType\":\"<License Type>\", \"ExcludedSqlInstances\":[]}"
```

To install *Azure extension for SQL Server* for Linux operating system, run:

```azurecli
settings="{\"SqlManagement\":{\"IsEnabled\":true},\"LicenseType\":\"<License Type>\"}"
az connectedmachine extension create --machine-name "{your machine name}" --location "{azure region}" --name "LinuxAgent.SqlServer" --resource-group "{your resource group name}" --type "LinuxAgent.SqlServer" --publisher "Microsoft.AzureData" --settings $settings
```

The possible licensing types that you can set are:

- `PAYG`
- `Paid`
- `LicenseOnly`

*Azure extension for SQL Server* for Linux is available for preview.

---

Once installed, the Azure extension for SQL Server recognizes all the installed SQL Server instances and connects them with Azure Arc.

The extension runs continuously to detect changes in the SQL Server configuration. For example, if a new SQL Server instance is installed on the machine, the extension automatically detects and registers it with Azure Arc. See [virtual machine extension management](https://learn.microsoft.com/azure/azure-arc/servers/manage-vm-extensions) for instructions on how to install and uninstall extensions to [Azure connected machine agent](https://learn.microsoft.com/azure/azure-arc/servers/agent-overview) using the Azure portal, Azure PowerShell or Azure CLI.

## Validate your Arc-enabled SQL Server resources

Go to **Azure Arc > SQL Server** and open the newly registered Arc-enabled SQL Server resource to validate.

Screenshot of validating a connected SQL Server.

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

- [Protect SQL Server with Microsoft Defender for Cloud](configure-advanced-data-security.md)
- [Configure best practices assessment for SQL Server enabled by Azure Arc](assess.md)
- [Known issues: SQL Server enabled by Azure Arc](known-issues.md)
