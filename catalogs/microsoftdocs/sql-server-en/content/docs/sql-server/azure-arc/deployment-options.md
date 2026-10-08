---
title: Deployment Options
description: Explains different ways to deploy SQL Server enabled by Azure Arc.
author: pochiraju
ms.author: rajpo
ms.reviewer: randolphwest
ms.date: 07/03/2025
ms.topic: install-set-up-deploy
---

# Deployment options for SQL Server enabled by Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

Azure Arc automatically installs the Azure extension for SQL Server when a server connected to Azure Arc has SQL Server installed. All the SQL Server instance resources are automatically created in Azure, providing a centralized management platform for all your SQL Server instances.

To automatically connect your server, see [Azure Connected Machine agent deployment options](https://learn.microsoft.com/azure/azure-arc/servers/deployment-options).

If your server is already connected to Azure, but Azure extension for SQL Server didn't deploy automatically.

> **Tip:**  
> Beginning with SQL Server 2022, you can connect a new SQL Server instance to Azure Arc when you're installing it on Windows Operating System. [Install SQL Server 2022](../../database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup.md#install-sql-server-2022).

<a id="onboarding-methods"></a>

## Onboard methods

The following table highlights each method so that you can determine which works best for your deployment. For detailed information, follow the links to view the steps for each topic.

| Method | Description |
| --- | --- |
| Interactively | Manually connect the SQL Server on a single physical or virtual machine that is already connected to Azure Arc. [Connect your SQL Server to Azure Arc on a server already enabled by Azure Arc](connect-already-enabled.md) |
| At scale | [Manage automatic connection for SQL Server enabled by Azure Arc](manage-autodeploy.md) |
| At scale | [Connect machines at scale by running PowerShell scripts with Configuration Manager](https://learn.microsoft.com/azure/azure-arc/servers/onboard-configuration-manager-powershell) |
| At scale | [Connect machines at scale with a Configuration Manager custom task sequence](https://learn.microsoft.com/azure/azure-arc/servers/onboard-configuration-manager-custom-task) |

Be sure to review the basic [prerequisites](prerequisites.md) before you deploy the agent, as well as any specific requirements listed in the steps for the onboarding method you choose.

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

- [Prerequisites - SQL Server enabled by Azure Arc](prerequisites.md)
