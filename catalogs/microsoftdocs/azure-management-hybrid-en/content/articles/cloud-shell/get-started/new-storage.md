---
description: Learn how to start using Azure Cloud Shell with persistent storage.
ms.contributor: jahelmic
ms.date: 08/07/2026
ms.topic: how-to
tags: azure-resource-manager
title: Get started with Azure Cloud Shell using persistent storage
---
# Get started with Azure Cloud Shell using persistent storage

The first time you start Cloud Shell you have the choice to continue with or without storage.
Creating a storage account allows you to create files that are persisted across sessions. This
article shows you how to start Cloud Shell with a newly created storage account for persistent file
storage.

## Start Cloud Shell

1. Sign into the [Azure portal][04].
1. Launch **Cloud Shell** from the top navigation of the Azure portal.

   Screenshot showing how to start Azure Cloud Shell in the Azure portal.

1. The first time you start Cloud Shell you're prompted to which shell to use. Select **Bash** or
   **PowerShell**.

   Screenshot showing the prompt to select the shell.

1. In the **Getting started** pane, select **Mount storage account**. Using the dropdown menu,
   select the subscription you want to use for Cloud Shell, then select the **Apply** button.

   Screenshot showing the select subscription and optional storage prompt.

1. In the **Mount storage account** pane, select **We will create a storage account for you**.
   Select the **Next** button to create a new resource group and storage account.

   Screenshot showing the create storage account prompt.

### Set your subscription

1. List subscriptions you have access to.

   <!-- markdownlint-disable MD023 MD024 MD051-->
   #### [Azure CLI](#tab/azurecli)

   ```azurecli-interactive
   az account list
   ```

   #### [Azure PowerShell](#tab/powershell)

   ```azurepowershell-interactive
   Get-AzSubscription
   ```

1. Set your preferred subscription:

   #### [Azure CLI](#tab/azurecli)

   ```azurecli-interactive
   az account set --subscription 'my-subscription-name'
   ```

   #### [Azure PowerShell](#tab/powershell)

   ```azurepowershell-interactive
   Set-AzContext -Subscription <SubscriptionId>
   ```
   <!-- markdownlint-enable MD023 MD024 MD051-->
   ---

> **Tip:**
> Your subscription is remembered for future sessions using `/home/<user>/.azure/azureProfile.json`.

### Get a list of Azure commands

<!-- markdownlint-disable MD023 MD024 MD051-->
#### [Azure CLI](#tab/azurecli)

Run the following command to see a list of all Azure CLI commands.

```azurecli-interactive
az
```

Run the following command to get a list of Azure CLI commands that apply to WebApps:

```azurecli-interactive
az webapp --help
```

#### [Azure PowerShell](#tab/powershell)

Run the following command to see a list of all Azure PowerShell cmdlets.

```azurepowershell-interactive
Get-Command -Module Az.*
```

Under `Azure` drive, the `Get-AzCommand` lists context-specific Azure commands.

Run the following commands to get a list the Azure PowerShell commands that apply to WebApps.

```azurepowershell-interactive
cd 'Azure:/My Subscription/WebApps'
Get-AzCommand
```
<!-- markdownlint-enable MD023 MD024 MD051-->

---

## Next steps

- [Learn about Azure PowerShell][03]
- [Learn about Azure CLI][02]
- [Learn about persisting files in Cloud Shell][09]
- [Learn about Azure Files storage][01]

<!-- link references -->
[01]: https://learn.microsoft.com/azure/storage/files/storage-files-introduction
[02]: https://learn.microsoft.com/cli/azure/
[03]: https://learn.microsoft.com/powershell/azure/
[04]: https://portal.azure.com/
[05]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/get-started/media/new-storage/choose-shell.png
[06]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/get-started/media/new-storage/getting-started.png
[07]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/get-started/media/new-storage/shell-icon.png
[08]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/get-started/media/new-storage/create-storage.png
[09]: ../persisting-shell-storage.md
