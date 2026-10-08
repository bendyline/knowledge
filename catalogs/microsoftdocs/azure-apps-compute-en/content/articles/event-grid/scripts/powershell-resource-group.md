---
title: Azure PowerShell script sample - Subscribe to resource group | Microsoft Docs
description: This article provides a sample Azure PowerShell script that shows how to subscribe to Event Grid events for a resource group. 
ms.devlang: powershell
ms.custom: devx-track-azurepowershell
ms.topic: sample
ms.date: 09/15/2021
---

# Subscribe to events for a resource group with PowerShell

This script creates an Event Grid subscription to the events for a resource group.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/powershell-resource-group.md)

The preview sample script requires the Event Grid module. To install, run
`Install-Module -Name AzureRM.EventGrid -AllowPrerelease -Force -Repository PSGallery`

## Sample script - stable

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/powershell-resource-group.md)

[Code reference unavailable in this source snapshot: ~/powershell_scripts/event-grid/subscribe-to-resource-group/subscribe-to-resource-group.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/powershell-resource-group.md)

## Sample script - preview module

> **Important:**
>
> Using this Azure feature from PowerShell requires the `AzureRM` module installed. This
> is an older module only available for Windows PowerShell 5.1 that no longer receives new features.
> The `Az` and `AzureRM` modules are __not__ compatible when installed for the same versions of PowerShell.
> If you need both versions:
>
> 1. [Uninstall the Az module](https://learn.microsoft.com/powershell/azure/uninstall-az-ps) from a PowerShell 5.1 session.
> 2. [Install the AzureRM module](https://learn.microsoft.com/previous-versions/powershell/azure/install-azurerm-ps) from a PowerShell 5.1 session.
> 3. [Download and install PowerShell Core 6.x or later](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows).
> 4. [Install the Az module](https://learn.microsoft.com/powershell/azure/install-azure-powershell) in a PowerShell Core session.



[Code reference unavailable in this source snapshot: ~/powershell_scripts/event-grid/subscribe-to-resource-group-preview/subscribe-to-resource-group-preview.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/powershell-resource-group.md)

## Script explanation

This script uses the following command to create the event subscription. Each command in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [New-AzEventGridSubscription](https://learn.microsoft.com/powershell/module/az.eventgrid/new-azeventgridsubscription) | Create an Event Grid subscription. |

## Next steps

* For an introduction to managed applications, see [Azure Managed Application overview](../overview.md).
* For more information on PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/get-started-azureps).
