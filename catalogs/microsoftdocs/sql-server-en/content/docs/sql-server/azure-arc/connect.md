---
title: Connect Your SQL Server to Azure Arc
description: Connect an instance of SQL Server to Azure Arc. Allows you to manage SQL Server centrally, as an Arc-enabled resource.
author: pochiraju
ms.author: rajpo
ms.reviewer: maghan
ms.date: 07/08/2025
ms.topic: how-to
ms.custom:
  - references_regions
---

# Connect your SQL Server to Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 


> **Important:**  
> Azure Arc automatically installs the Azure extension for SQL Server when a server connected to Azure Arc has SQL Server installed. All the SQL Server instance resources are automatically created in Azure, providing a centralized management platform for all your SQL Server instances.
>
> To automatically connect your SQL Server instances, see [Automatically Connect your SQL Server to Azure Arc](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/azure-arc/automatically-connect.md).
>
> Use the method in this article, if your server is already connected to Azure, but Azure extension for SQL Server is not deployed automatically.
>
> An `ArcSQLServerExtensionDeployment = Disabled` tag is created on the Arc machine resource if the extension is deployed using this method.

This article explains how to connect your SQL Server instance to Azure Arc. Before you proceed, complete the [Prerequisites - SQL Server enabled by Azure Arc](prerequisites.md).

## Onboard the server to Azure Arc

If the server that runs your SQL Server instance isn't yet connected to Azure, you can initiate the connection from the target machine using the onboarding script. This script connects the server to Azure and installs the Azure extension for SQL Server.

> **Note:**  
> If your server is already connected to Azure, proceed to [Connect your SQL Server to Azure Arc on a server already enabled by Azure Arc](connect-already-enabled.md).

### Generate an onboarding script for SQL Server

1. Go to [Azure Arc](https://portal.azure.com/#view/Microsoft_Azure_ArcCenterUX/ArcCenterMenuBlade/~/getStarted) in the Azure portal.

1. Under **Data services**, select **SQL servers**. Under **SQL Server instances**, select **+ Add**.

   The **Add existing SQL Server instances** page opens.

1. Select **Connect SQL Server instances** for a new registration or **Register SQL Server instances** for a disconnected instance.

1. Review the prerequisites and select **Next: Server details**

1. Specify:

    - **Subscription**
    - **Resource group**
    - **Region**
    - **Operating system**

    If necessary, specify the proxy your network uses to connect to the Internet.

    To use a specific name for Azure Arc enabled Server instead of default host name, users can add the name for Azure Arc enabled Server in **Server Name**.

   Screenshot of server details for Azure Arc.

1. Select the SQL Server edition and license type you're using on this machine. Some Arc-enabled SQL Server features are only available for SQL Server instances with Software Assurance (Paid) or with Azure pay-as-you-go. For more information, review [Configure SQL Server enabled by Azure Arc](manage-configuration.md).

1. Specify the SQL Server instance(s) you want to exclude from registering (if you have multiple instances installed on the server). Separate each excluded instance by a space.

   > **Important:**  
   > If the machine that hosts the SQL Server instance is already [connected to Azure Arc](https://learn.microsoft.com/azure/azure-arc/servers/onboard-portal), make sure to select the same resource group that contains the corresponding **Server - Azure Arc** resource.

   Screenshot of server management details.

1. Select **Next: Tags** to optionally add tags to the resource for your SQL Server instance.

1. Select **Run script** to generate the onboarding script.

   Screenshot of a download script.

1. Select **Download** to download the script to your machine.

### Connect SQL Server instances to Azure Arc

In this step, execute the script you downloaded from the Azure portal, on the target machine. The script installs Azure extension for SQL Server. If the machine itself doesn't have the Azure connected machine agent installed, the script installs it first, then installs the Azure extension for SQL Server. Azure connected machine agent registers the connected server as an Azure resource of type `Server - Azure Arc`, and the Azure extension for SQL Server connects the SQL Server instances as an Azure resource of type `SQL Server - Azure Arc`.

> **Important:**  
> Make sure to execute the script using an account that meets the minimum permission requirements described in [prerequisites](prerequisites.md).

## [Windows](#tab/windows)

1. Launch an admin instance of **powershell.exe** and sign in to your PowerShell module with your Azure credentials. Follow the [sign-in instructions](https://learn.microsoft.com/powershell/azure/install-az-ps#sign-in).

1. Execute the downloaded script.

   ```powershell
   & '.\RegisterSqlServerArc.ps1'
   ```

   > **Note:**  
   > If you have yet to previously install the [Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az) and see issues the first time you run it, follow the instructions in the script and rerun it.

## [Linux](#tab/linux)

1. Use Azure CLI to sign in with your Azure credentials. Follow the [sign in instructions](https://learn.microsoft.com/cli/azure/authenticate-azure-cli)

1. Grant the execution permission to the downloaded script and execute it.

   ```console
   sudo chmod +x ./RegisterSqlServerArc.sh
   ./RegisterSqlServerArc.sh
   ```

---

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
