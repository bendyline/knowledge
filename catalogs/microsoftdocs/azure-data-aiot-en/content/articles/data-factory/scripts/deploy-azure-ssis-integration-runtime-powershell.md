---
title: Deploy Azure SSIS integration runtime using PowerShell
description: This PowerShell script creates an Azure-SSIS integration runtime that can run SSIS packages in the cloud.
ms.subservice: integration-services
ms.topic: article
ms.author: makromer
author: kromerm
ms.custom: devx-track-azurepowershell
ms.date: 10/20/2023
---

# PowerShell script - deploy Azure-SSIS integration runtime

This sample PowerShell script creates an Azure-SSIS integration runtime that can run your SSIS packages in Azure.  

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/scripts/deploy-azure-ssis-integration-runtime-powershell.md)

This sample requires Azure PowerShell. Run `Get-Module -ListAvailable Az` to find the version.
If you need to install or upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell).

Run the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet to connect to Azure.


## Sample script

[Code reference unavailable in this source snapshot: ~/powershell_scripts/data-factory/deploy-azure-ssis-integration-runtime/deploy-azure-ssis-integration-runtime.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/scripts/deploy-azure-ssis-integration-runtime-powershell.md)

## Clean up deployment

After you run the sample script, you can use the following command to remove the resource group and all resources associated with it:

```powershell
Remove-AzResourceGroup -ResourceGroupName $resourceGroupName
```
To remove the data factory from the resource group, run the following command: 

```powershell
Remove-AzDataFactoryV2 -Name $dataFactoryName -ResourceGroupName $resourceGroupName
```

## Script explanation

This script uses the following commands:

| Command | Notes |
| --- | --- |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates a resource group in which all resources are stored. |
| [Set-AzDataFactoryV2](https://learn.microsoft.com/powershell/module/az.datafactory/set-Azdatafactoryv2) | Create a data factory. |
| [Set-AzDataFactoryV2IntegrationRuntime](https://learn.microsoft.com/powershell/module/az.datafactory/set-Azdatafactoryv2integrationruntime) | Creates an Azure-SSIS integration runtime that can run SSIS packages in the cloud |
| [Start-AzDataFactoryV2IntegrationRuntime](https://learn.microsoft.com/powershell/module/az.datafactory/start-Azdatafactoryv2integrationruntime) | Starts the Azure-SSIS integration runtime. |
| [Get-AzDataFactoryV2IntegrationRuntime](https://learn.microsoft.com/powershell/module/az.datafactory/get-Azdatafactoryv2integrationruntime) | Gets information about the Azure-SSIS integration runtime. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Deletes a resource group including all nested resources. |
|  |  |

## Related content

For more information on the Azure PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/).

Additional Azure Data Factory PowerShell script samples can be found in the [Azure Data Factory PowerShell samples](../samples-powershell.md).
