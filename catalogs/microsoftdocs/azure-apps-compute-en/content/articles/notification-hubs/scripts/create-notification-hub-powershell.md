---

title: Create an Azure notification hub using PowerShell | Microsoft Docs
description: Learn how to use a PowerShell script to create an Azure notification hub.
author: sethmanheim
manager: lizross
services: notification-hubs
editor: sethmanheim

ms.service: azure-notification-hubs
ms.topic: article
ms.date: 01/14/2020
ms.author: sethm
ms.custom: devx-track-azurepowershell
---

# Use PowerShell to create an Azure notification hub

This sample PowerShell script creates a sample Azure notification hub. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/scripts/create-notification-hub-powershell.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/sample-powershell-install-no-ssh.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/scripts/create-notification-hub-powershell.md)

## Prerequisites

* **Azure subscription** - If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Sample script

[Code reference unavailable in this source snapshot: ~/powershell_scripts/notification-hubs/create-notification-hub/create-notification-hub.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/scripts/create-notification-hub-powershell.md)

## Clean up deployment

After you run the sample script, you can use the following command to remove the resource group and all resources associated with it:

```powershell
Remove-AzResourceGroup -ResourceGroupName $resourceGroupName
```

## Script explanation

This script uses the following commands:

| Command | Notes |
| --- | --- |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates a resource group in which all resources are stored. |
| [New-AzNotificationHubsNamespace](https://learn.microsoft.com/powershell/module/az.notificationhubs/new-aznotificationhubsnamespace) | Creates a namespace for the notification hub. |
| [New-AzNotificationHub](https://learn.microsoft.com/powershell/module/az.notificationhubs/new-aznotificationhub) | Creates a notification hub. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Deletes a resource group including all nested resources. |
|  |  |

## Next steps

For more information on the Azure PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/).
