---
title: PowerShell script sample - Delete an Azure App Configuration store
titleSuffix: Azure App Configuration
description: Delete an Azure App Configuration store using a sample PowerShell script. See reference article links to commands used in the script.
services: azure-app-configuration
author: maud-lv
ms.service: azure-app-configuration
ms.topic: sample
ms.date: 04/12/2024
ms.author: malev 
ms.custom:
---

# Delete an Azure App Configuration store with PowerShell

This sample script deletes an instance of Azure App Configuration using PowerShell.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/powershell-delete-service.md)

To execute this sample script, you need a functional setup of [Azure PowerShell](https://learn.microsoft.com/powershell/azure/).

Open a PowerShell window with admin rights and run `Install-Module -Name Az` to install Azure PowerShell

## Sample script

In the following example, replace the placeholder text _`<ResourceGroupName>`_ and  _`<AppConfigurationStoreName>`_ with your App Configuration store name and the name of the resource group it belongs to.

```powershell
# Delete an App Configuration store
Remove-AzAppConfigurationStore -Name <AppConfigurationStoreName> -ResourceGroupName <ResourceGroupName>
```

## Script explanation

This script uses the following command to delete an App Configuration store. Each command in the table links to command specific documentation.

| Command | Notes |
| --- | --- |
| [Remove-AzAppConfigurationStore](https://learn.microsoft.com/powershell/module/az.appconfiguration/Remove-AzAppConfigurationStore) | Deletes an App Configuration store. |

## Next steps

For more information about Azure PowerShell, check out the [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/).

More App Configuration script samples for PowerShell can be found in the [Azure App Configuration PowerShell samples](../powershell-samples.md).
