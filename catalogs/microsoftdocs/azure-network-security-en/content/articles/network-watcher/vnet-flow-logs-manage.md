---
title: Manage Virtual Network Flow Logs
titleSuffix: Azure Network Watcher
description: Learn how to create, change, enable, disable, or delete Azure Network Watcher virtual network flow logs.
author: halkazwini
ms.author: halkazwini
ms.service: azure-network-watcher
ms.topic: how-to
ms.date: 01/22/2026

# Customer intent: As an Azure administrator, I want to manage virtual network flow logs so that I can log, analyze, and optimize IP traffic in my virtual network.
---

# Create, change, enable, disable, or delete virtual network flow logs

Virtual network flow logging is a feature of Azure Network Watcher that allows you to log information about IP traffic flowing through an Azure virtual network. For more information about virtual network flow logging, see [Virtual network flow logs overview](vnet-flow-logs-overview.md).

In this article, you learn how to create, change, enable, disable, or delete a virtual network flow log using the Azure portal, PowerShell, and Azure CLI.

## Prerequisites

# [**Portal**](#tab/portal)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Insights provider. For more information, see [Register Insights provider](#register-insights-provider).

- A virtual network. If you need to create a virtual network, see [Create a virtual network using the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md?toc=/azure/network-watcher/toc.json).

- An Azure storage account. If you need to create a storage account, see [Create a storage account using the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-portal\&toc=/azure/network-watcher/toc.json).

# [**PowerShell**](#tab/powershell)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Insights provider. For more information, see [Register Insights provider](#register-insights-provider).

- A virtual network. If you need to create a virtual network, see [Create a virtual network using PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-powershell.md).

- An Azure storage account. If you need to create a storage account, see [Create a storage account using PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-powershell).

- Azure Cloud Shell or Azure PowerShell.

    The steps in this article run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the cmdlets in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code and then paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure PowerShell locally](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. This article requires the Azure PowerShell version 7.4.0 or later. Run [Get-Module -ListAvailable Az](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/get-module) to find the installed version. If you run PowerShell locally, sign in to Azure using the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet.

# [**Azure CLI**](#tab/cli)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- Insights provider. For more information, see [Register Insights provider](#register-insights-provider).

- A virtual network. If you need to create a virtual network, see [Create a virtual network using the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-cli.md).

- An Azure storage account. If you need to create a storage account, see [Create a storage account using the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-cli).

- Azure Cloud Shell or Azure CLI.

    The steps in this article run the Azure CLI commands interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure CLI locally](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. This article requires the Azure CLI version 2.39.0 or later. Run [az --version](https://learn.microsoft.com/cli/azure/reference-index#az-version) command to find the installed version. If you run Azure CLI locally, sign in to Azure using the [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command.

---

## Register Insights provider

# [**Portal**](#tab/portal)

*Microsoft.Insights* provider must be registered to successfully log traffic flowing through a virtual network. If you aren't sure if the *Microsoft.Insights* provider is registered, check its status in the Azure portal by following these steps:

1. In the search box at the top of the portal, enter *subscriptions*. Select **Subscriptions** from the search results.

    Screenshot that shows how to search for Subscriptions in the Azure portal.

1. Select the Azure subscription that you want to enable the provider for in **Subscriptions**.

1. Under **Settings**, select **Resource providers**.

1. Enter *insight* in the filter box.

1. Confirm the status of the provider displayed is **Registered**. If the status is **NotRegistered**, select the **Microsoft.Insights** provider then select **Register**.

    Screenshot that shows how to register Microsoft Insights provider in the Azure portal.

# [**PowerShell**](#tab/powershell)

*Microsoft.Insights* provider must be registered to successfully log traffic in a virtual network. If you aren't sure if the *Microsoft.Insights* provider is registered, use [Register-AzResourceProvider](https://learn.microsoft.com/powershell/module/az.resources/register-azresourceprovider) to register it.

```azurepowershell-interactive
# Register Microsoft.Insights provider.
Register-AzResourceProvider -ProviderNamespace Microsoft.Insights
```

# [**Azure CLI**](#tab/cli)

*Microsoft.Insights* provider must be registered to successfully log traffic in a virtual network. If you aren't sure if the *Microsoft.Insights* provider is registered, use [az provider register](https://learn.microsoft.com/cli/azure/provider#az-provider-register) to register it.

```azurecli-interactive
# Register Microsoft.Insights provider.
az provider register --namespace Microsoft.Insights
```

---

## Create a flow log

Create a flow log for your virtual network, subnet, or network interface. This flow log is saved in an Azure storage account.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. Under **Logs**, select **Flow logs**.

1. In **Network Watcher | Flow logs**, select **+ Create** or **Create flow log** blue button.

    Screenshot of Network Watcher flow logs in the Azure portal.

1. On the **Basics** tab of **Create a flow log**, enter, or select the following values:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select the Azure subscription that contains your virtual network. |
    | Flow log type | Select **Virtual network**, then select **+ Select target resource**. Available options are: **Virtual network**, **Subnet**, and **Network interface**. <br> Select the resources you want to log, then select **Confirm selection**. |
    | Flow Log Name | Enter a name for the flow log, or leave the default name. The Azure portal uses ***{ResourceName}-{ResourceGroupName}-flowlog*** as the default name. |
    | **Instance details** |  |
    | Subscription | Select the Azure subscription that contains the storage account. |
    | Storage accounts | Select the storage account where you want to save the flow logs. To create a new storage account, select **Create a new storage account**. |
    | Retention (days) | Enter a retention period for the logs in days. This option is only available with [Standard general-purpose v2](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-overview.md?toc=/azure/network-watcher/toc.json#types-of-storage-accounts) storage accounts. Enter *0* to retain flow log data indefinitely (until you manually delete it). For pricing information, see [Azure Storage pricing](https://azure.microsoft.com/pricing/details/storage/). |

    Screenshot that shows the Basics tab of creating a virtual network flow log in the Azure portal.

1. To enable traffic analytics, select **Next: Analytics** button, or select the **Analytics** tab. Enter or select the following values:

    | Setting | Value |
    | --- | --- |
    | Enable traffic analytics | Select the checkbox to enable traffic analytics for your flow log. |
    | Traffic analytics processing interval | Select the processing interval that you prefer, available options are: **Every 1 hour** and **Every 10 mins**. The default processing interval is every one hour. For more information, see [Traffic analytics](traffic-analytics.md). |
    | Subscription | Select the Azure subscription of your Log Analytics workspace. |
    | Log Analytics Workspace | Select your Log Analytics workspace. By default, Azure portal creates ***DefaultWorkspace-{SubscriptionID}-{Region}*** Log Analytics workspace in ***defaultresourcegroup-{Region}*** resource group. |

    Screenshot that shows how to enable traffic analytics for a new flow log in the Azure portal.

    > **Note:**
    > To create and select a Log Analytics workspace other than the default one, see [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace?toc=/azure/network-watcher/toc.json)

1. Select **Review + create**.

1. Review the settings, and then select **Create**.

# [**PowerShell**](#tab/powershell)

Use [New-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/new-aznetworkwatcherflowlog) cmdlet to create a virtual network flow log. 

- Enable virtual network flow logs without traffic analytics

    ```azurepowershell-interactive
    # Place the virtual network configuration into a variable.
    $vnet = Get-AzVirtualNetwork -Name 'myVNet' -ResourceGroupName 'myResourceGroup'
    
    # Place the storage account configuration into a variable.
    $storageAccount = Get-AzStorageAccount -Name 'myStorageAccount' -ResourceGroupName 'myResourceGroup'
    
    # Create a VNet flow log.
    New-AzNetworkWatcherFlowLog -Enabled $true -Name 'myVNetFlowLog' -NetworkWatcherName 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -StorageId $storageAccount.Id -TargetResourceId $vnet.Id -FormatVersion 2
    ```

- Enable virtual network flow logs and traffic analytics

    ```azurepowershell-interactive
    # Place the virtual network configuration into a variable.
    $vnet = Get-AzVirtualNetwork -Name 'myVNet' -ResourceGroupName 'myResourceGroup'
    
    # Place the storage account configuration into a variable.
    $storageAccount = Get-AzStorageAccount -Name 'myStorageAccount' -ResourceGroupName 'myResourceGroup'
    
    # Create a traffic analytics workspace and place its configuration into a variable.
    $workspace = New-AzOperationalInsightsWorkspace -Name 'myWorkspace' -ResourceGroupName 'myResourceGroup' -Location 'EastUS'
    
    # Create a VNet flow log.
    New-AzNetworkWatcherFlowLog -Enabled $true -Name 'myVNetFlowLog' -NetworkWatcherName 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -StorageId $storageAccount.Id -TargetResourceId $vnet.Id -FormatVersion 2 -EnableTrafficAnalytics -TrafficAnalyticsWorkspaceId $workspace.ResourceId -TrafficAnalyticsInterval 10
    ```

# [**Azure CLI**](#tab/cli)

Use [az network watcher flow-log create](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-create) command to create a virtual network flow log. 

- Enable virtual network flow logs without traffic analytics

    ```azurecli-interactive
    # Create a VNet flow log.
    az network watcher flow-log create --location 'eastus' --resource-group 'myResourceGroup' --name 'myVNetFlowLog' --vnet 'myVNet' --storage-account 'myStorageAccount'
    ```
    
    ```azurecli-interactive
    # Create a VNet flow log (storage account is in a different resource group from the virtual network).
    az network watcher flow-log create --location 'eastus' --resource-group 'myResourceGroup' --name 'myVNetFlowLog' --vnet 'myVNet' --storage-account '/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/StorageRG/providers/Microsoft.Storage/storageAccounts/myStorageAccount'
    ```

- Enable virtual network flow logs and traffic analytics

    ```azurecli-interactive
    # Create a traffic analytics workspace.
    az monitor log-analytics workspace create --name 'myWorkspace' --resource-group 'myResourceGroup' --location 'eastus'
    
    # Create a VNet flow log.
    az network watcher flow-log create --location 'eastus' --name 'myVNetFlowLog' --resource-group 'myResourceGroup' --vnet 'myVNet' --storage-account 'myStorageAccount' --traffic-analytics true --workspace 'myWorkspace' --interval 10
    ```
    
    ```azurecli-interactive
    # Create a traffic analytics workspace.
    az monitor log-analytics workspace create --name 'myWorkspace' --resource-group 'myResourceGroup' --location 'eastus'
    
    # Create a VNet flow log (storage account and traffic analytics workspace are in different resource groups from the virtual network).
    az network watcher flow-log create --location 'eastus' --name 'myVNetFlowLog' --resource-group 'myResourceGroup' --vnet 'myVNet' --storage-account '/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/StorageRG/providers/Microsoft.Storage/storageAccounts/myStorageAccount' --traffic-analytics true --workspace '/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/WorkspaceRG/providers/Microsoft.OperationalInsights/workspaces/myWorkspace' --interval 10
    ```

---

> **Important:**
> If you configure virtual network flow logs at the NIC, subnet, and virtual network levels, the enablement preference follows this order: NIC > subnet > virtual network.

> **Note:**
> - If the storage account is in a different subscription, the resource that you're logging (virtual network, subnet, or network interface) and the storage account must be associated with the same Microsoft Entra tenant. The account you use for each subscription must have the [necessary permissions](rbac-permissions.md).
> - Currently, a storage account supports 100 rules, and each rule can accommodate 10 blob prefixes. For more information, see [How many retention policy rules can a storage account have?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/frequently-asked-questions.yml#how-many-retention-policy-rules-can-a-storage-account-have-)
> - All Azure Storage redundancy configurations are supported, including locally redundant storage (LRS), zone‑redundant storage (ZRS), geo‑redundant storage (GRS), and geo‑zone‑redundant storage (GZRS).

> **Warning:**
> Virtual network flow logs are ingested into a block blob at one-minute intervals by appending blocks. While ingestion is in progress, don't perform operations that modify the blob's block structure, such as editing, overwriting, or deleting the blob content. These operations can cause all subsequent flow log write operations to fail for that specific hour's blob.

> **Caution:**
> Traffic analytics creates and manages [data collection rule (DCR)](https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-rule-overview?toc=/azure/network-watcher/toc.json) and [data collection endpoint (DCE)](https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-endpoint-overview?toc=/azure/network-watcher/toc.json) resources in the same resource group as the Log Analytics workspace, prefixed with `NWTA`. If you perform any operation on these resources, traffic analytics might not function as expected.

## Enable or disable traffic analytics

Enable traffic analytics for a flow log to analyze the flow log data. Traffic analytics provides insights into the traffic patterns of your virtual network. You can enable or disable traffic analytics for a flow log at any time.

> **Note:**
> In addition to enabling or disabling traffic analytics, you can also change other flow log settings.

# [**Portal**](#tab/portal)

To enable traffic analytics for a flow log, follow these steps:

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. Under **Logs**, select **Flow logs**.

1. In **Network Watcher | Flow logs**, select the flow log that you want to enable traffic analytics for.

1. In **Flow logs settings**, under **Traffic analytics**, check the **Enable traffic analytics** checkbox.

    Screenshot that shows how to enable traffic analytics for an existing flow log in the Azure portal.

1. Enter or select the following values:

    | Setting | Value |
    | --- | --- |
    | Subscription | Select the Azure subscription of your Log Analytics workspace. |
    | Log Analytics workspace | Select your Log Analytics workspace. By default, Azure portal creates ***DefaultWorkspace-{SubscriptionID}-{Region}*** Log Analytics workspace in ***defaultresourcegroup-{Region}*** resource group. |
    | Traffic logging interval | Select the processing interval that you prefer, available options are: **Every 1 hour** and **Every 10 mins**. The default processing interval is every one hour. For more information, see [Traffic analytics](traffic-analytics.md). |

    Screenshot that shows configurations of traffic analytics for an existing flow log in the Azure portal.

1. Select **Save** to apply the changes.

To disable traffic analytics for a flow log, take the previous steps 1-3, then uncheck the **Enable traffic analytics** checkbox and select **Save**.

Screenshot that shows how to disable traffic analytics for an existing flow log in the Azure portal.

# [**PowerShell**](#tab/powershell)

To enable traffic analytics on a flow log resource, use [Set-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/set-aznetworkwatcherflowlog) cmdlet.

```azurepowershell-interactive
# Place the virtual network configuration into a variable.
$vnet = Get-AzVirtualNetwork -Name 'myVNet' -ResourceGroupName 'myResourceGroup'

# Place the storage account configuration into a variable.
$storageAccount = Get-AzStorageAccount -Name 'myStorageAccount' -ResourceGroupName 'myResourceGroup'

# Place the workspace configuration into a variable.
$workspace = Get-AzOperationalInsightsWorkspace -Name 'myWorkspace' -ResourceGroupName 'myResourceGroup'

# Update the VNet flow log.
Set-AzNetworkWatcherFlowLog -Enabled $true -Name 'myVNetFlowLog' -NetworkWatcherName 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -StorageId $storageAccount.Id -TargetResourceId $vnet.Id -FormatVersion 2 -EnableTrafficAnalytics -TrafficAnalyticsWorkspaceId $workspace.ResourceId -TrafficAnalyticsInterval 10
```

To disable traffic analytics on the flow log resource and continue to generate and save virtual network flow logs to storage account, use [Set-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/set-aznetworkwatcherflowlog) cmdlet.

```azurepowershell-interactive
# Place the virtual network configuration into a variable.
$vnet = Get-AzVirtualNetwork -Name 'myVNet' -ResourceGroupName 'myResourceGroup'

# Place the storage account configuration into a variable.
$storageAccount = Get-AzStorageAccount -Name 'myStorageAccount' -ResourceGroupName 'myResourceGroup'

# Update the VNet flow log.
Set-AzNetworkWatcherFlowLog -Enabled $true -Name 'myVNetFlowLog' -NetworkWatcherName 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -StorageId $storageAccount.Id -TargetResourceId $vnet.Id -FormatVersion 2
```

# [**Azure CLI**](#tab/cli)

To enable traffic analytics on a flow log resource, use [az network watcher flow-log update](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-update) command.

```azurecli-interactive
# Update the VNet flow log.
az network watcher flow-log update --location 'eastus' --name 'myVNetFlowLog' --resource-group 'myResourceGroup' --vnet 'myVNet' --storage-account 'myStorageAccount' --traffic-analytics true --workspace 'myWorkspace' --interval 10
```

To disable traffic analytics on the flow log resource and continue to generate and save virtual network flow logs to a storage account, use [az network watcher flow-log update](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-update) command.

```azurecli-interactive
# Update the VNet flow log.
az network watcher flow-log update --location 'eastus' --name 'myVNetFlowLog' --resource-group 'myResourceGroup' --vnet 'myVNet' --storage-account 'myStorageAccount' --traffic-analytics false
```

---

> **Caution:**
> Traffic analytics creates and manages [data collection rule (DCR)](https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-rule-overview?toc=/azure/network-watcher/toc.json) and [data collection endpoint (DCE)](https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-endpoint-overview?toc=/azure/network-watcher/toc.json) resources in the same resource group as the Log Analytics workspace, prefixed with `NWTA`. If you perform any operation on these resources, traffic analytics might not function as expected.

## List all flow logs

You can list all flow logs in a subscription or a group of subscriptions (Azure portal). You can also list all flow logs in a region.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. Under **Logs**, select **Flow logs**.

1. Select **Subscription equals** filter to choose one or more of your subscriptions. You can apply other filters like **Location equals** to list all the flow logs in a region.

    Screenshot that shows how to list existing flow logs in the Azure portal.

# [**PowerShell**](#tab/powershell)

Use [Get-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/get-aznetworkwatcherflowlog) cmdlet to list all flow log resources in a particular region in your subscription.

```azurepowershell-interactive
# Get all flow logs in East US region.
Get-AzNetworkWatcherFlowLog -Location 'eastus' | format-table
```

# [**Azure CLI**](#tab/cli)

Use [az network watcher flow-log list](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-list) command to list all flow log resources in a particular region in your subscription.

```azurecli-interactive
# Get all flow logs in East US region.
az network watcher flow-log list --location 'eastus' --out table
```

---

## View details of a flow log resource

You can view the details of a flow log.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. Under **Logs**, select **Flow logs**.

1. In **Network Watcher | Flow logs**, select the flow log that you want to see.

1. In **Flow logs settings**, you can view the settings of the flow log resource.

    Screenshot of Flow logs settings page in the Azure portal.

1. Select **Cancel** to close the settings page without making changes.

# [**PowerShell**](#tab/powershell)

Use [Get-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/get-aznetworkwatcherflowlog) cmdlet to see details of a flow log resource.

```azurepowershell-interactive
# Get the flow log details.
Get-AzNetworkWatcherFlowLog -NetworkWatcherName 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -Name 'myVNetFlowLog'
```

# [**Azure CLI**](#tab/cli)

Use [az network watcher flow-log show](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-show) to see details of a flow log resource.

```azurecli-interactive
# Get the flow log details.
az network watcher flow-log show --name 'myVNetFlowLog' --resource-group 'NetworkWatcherRG' --location 'eastus'
```

---

## Download a flow log

You can download the flow logs data from the storage account that you saved the flow log to.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *storage accounts*. Select **Storage accounts** from the search results.

1. Select the storage account you used to store the logs.

1. Under **Data storage**, select **Containers**.

1. Select the **insights-logs-flowlogflowevent** container.

1. In **insights-logs-flowlogflowevent**, navigate the folder hierarchy until you get to the `PT1H.json` file that you want to download. Virtual network flow log files follow the following path:

    ```
    https://{storageAccountName}.blob.core.windows.net/insights-logs-flowlogflowevent/flowLogResourceID=/{subscriptionID}_NETWORKWATCHERRG/NETWORKWATCHER_{Region}_{ResourceName}-{ResourceGroupName}-FLOWLOGS/y={year}/m={month}/d={day}/h={hour}/m=00/macAddress={macAddress}/PT1H.json
    ```

1. Select the ellipsis **...** to the right of the `PT1H.json` file, then select **Download**.

   Screenshot shows how to download a virtual network flow log data file from the storage account container in the Azure portal.

# [**PowerShell**](#tab/powershell)

To download virtual network flow logs from your storage account, use [Get-AzStorageBlobContent](https://learn.microsoft.com/powershell/module/az.storage/get-azstorageblobcontent) cmdlet. For more information, see [Download a blob](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-powershell.md#download-blobs).

Virtual network flow log files are saved to the storage account at the following path:

```
https://{storageAccountName}.blob.core.windows.net/insights-logs-flowlogflowevent/flowLogResourceID=/SUBSCRIPTIONS/{subscriptionID}/RESOURCEGROUPS/NETWORKWATCHERRG/PROVIDERS/MICROSOFT.NETWORK/NETWORKWATCHERS/NETWORKWATCHER_{Region}/FLOWLOGS/{FlowlogResourceName}/y={year}/m={month}/d={day}/h={hour}/m=00/macAddress={macAddress}/PT1H.json
```

# [**Azure CLI**](#tab/cli)

To download virtual network flow logs from your storage account, use the [az storage blob download](https://learn.microsoft.com/cli/azure/storage/blob#az-storage-blob-download) command. For more information, see [Download a blob](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-cli.md#download-a-blob).

Virtual network flow log files are saved to the storage account at the following path:

```
https://{storageAccountName}.blob.core.windows.net/insights-logs-flowlogflowevent/flowLogResourceID=/SUBSCRIPTIONS/{subscriptionID}/RESOURCEGROUPS/NETWORKWATCHERRG/PROVIDERS/MICROSOFT.NETWORK/NETWORKWATCHERS/NETWORKWATCHER_{Region}/FLOWLOGS/{FlowlogResourceName}/y={year}/m={month}/d={day}/h={hour}/m=00/macAddress={macAddress}/PT1H.json
```

---

> **Note:**
> As an alternative way to access and download flow logs from your storage account, you can use Azure Storage Explorer. For more information, see [Get started with Storage Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer.md) and [Download blobs using Storage Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/quickstart-storage-explorer.md#download-blobs).

For information about the structure of a flow log, see [Log format of virtual network flow logs](vnet-flow-logs-overview.md#log-format).

## Disable a flow log

You can temporarily disable a virtual network flow log without deleting it. Disabling a flow log stops flow logging for the associated virtual network. However, the flow log resource remains with all its settings and associations. You can re-enable it at any time to resume flow logging for the configured virtual network.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. Under **Logs**, select **Flow logs**.

1. In **Network Watcher | Flow logs**, select the checkbox of the flow log that you want to disable.

1. Select **Disable**.

    Screenshot shows how to disable a flow log in the Azure portal.

> **Note:**
> If traffic analytics is enabled for a flow log, you must disable it before you can disable the flow log. To disable traffic analytics, see [Enable or disable traffic analytics](#enable-or-disable-traffic-analytics).

# [**PowerShell**](#tab/powershell)

Use [Set-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/set-aznetworkwatcherflowlog) cmdlet to disable a flow log.

```azurepowershell-interactive
# Place the virtual network configuration into a variable.
$vnet = Get-AzVirtualNetwork -Name 'myVNet' -ResourceGroupName 'myResourceGroup'

# Place the storage account configuration into a variable.
$storageAccount = Get-AzStorageAccount -Name 'myStorageAccount' -ResourceGroupName 'myResourceGroup'

# Disable the VNet flow log.
Set-AzNetworkWatcherFlowLog -Enabled $false -Name 'myVNetFlowLog' -NetworkWatcherName 'NetworkWatcher_eastus' -ResourceGroupName 'NetworkWatcherRG' -StorageId $storageAccount.Id -TargetResourceId $vnet.Id
```

> **Note:**
> If you disable a flow log with traffic analytics enabled, you must either disable traffic analytics in the same command or disable it first before disabling the flow log.

# [**Azure CLI**](#tab/cli)

Use [az network watcher flow-log update](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-update) command to disable a flow log.

```azurecli-interactive
# Update the VNet flow log.
az network watcher flow-log update --enabled false --location 'eastus' --name 'myVNetFlowLog' --resource-group 'myResourceGroup' --vnet 'myVNet' --storage-account 'myStorageAccount'
```

> **Note:**
> If you disable a flow log with traffic analytics enabled, you must either disable traffic analytics in the same command or disable it first before disabling the flow log.

---

## Delete a flow log

You can permanently delete a virtual network flow log. Deleting a flow log deletes all its settings and associations. To begin flow logging again for the same resource, you must create a new flow log for it.

# [**Portal**](#tab/portal)

1. In the search box at the top of the portal, enter *network watcher*. Select **Network Watcher** from the search results.

1. Under **Logs**, select **Flow logs**.

1. In **Network Watcher | Flow logs**, select the checkbox of the flow log that you want to delete.

1. Select **Delete**.

    Screenshot shows how to delete a flow log in the Azure portal.

# [**PowerShell**](#tab/powershell)

To delete a virtual network flow log resource, use [Remove-AzNetworkWatcherFlowLog](https://learn.microsoft.com/powershell/module/az.network/remove-aznetworkwatcherflowlog) cmdlet.

```azurepowershell-interactive
# Delete the VNet flow log.
Remove-AzNetworkWatcherFlowLog -Name 'myVNetFlowLog' -Location 'eastus'
```

# [**Azure CLI**](#tab/cli)

To delete a virtual network flow log resource, use [az network watcher flow-log delete](https://learn.microsoft.com/cli/azure/network/watcher/flow-log#az-network-watcher-flow-log-delete) command.

```azurecli-interactive
# Delete the VNet flow log.
az network watcher flow-log delete --name 'myVNetFlowLog' --location 'eastus'
```

---

> **Note:**
> Deleting a flow log doesn't delete the flow log data from the storage account. Flow logs data stored in the storage account follows the configured retention policy or stays stored in the storage account until manually deleted.

## Related content

- [Audit and deploy virtual network flow logs using Azure Policy](vnet-flow-logs-policy.md)
- [Virtual network flow logs](vnet-flow-logs-overview.md)
- [Traffic analytics](traffic-analytics.md)
