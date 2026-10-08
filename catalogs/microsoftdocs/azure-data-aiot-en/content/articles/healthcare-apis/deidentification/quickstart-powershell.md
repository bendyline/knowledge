---
title: "Quickstart: Deploy the Azure Health Data Services de-identification service with Azure PowerShell"
description: "Quickstart: Deploy the Azure Health Data Services de-identification service with Azure PowerShell."
author: jovinson-ms
ms.author: jovinson
ms.service: azure-health-data-services
ms.subservice: deidentification-service
ms.topic: quickstart
ms.custom: devx-track-azurepowershell
ms.date: 06/19/2025
---

# Quickstart: Deploy the Azure Health Data Services de-identification service with Azure PowerShell

In this quickstart, you use Azure PowerShell to deploy a de-identification service.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

[Include unavailable in this source snapshot: ~/reusable-content/azure-powershell/azure-powershell-requirements.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/deidentification/quickstart-powershell.md)

## Install the module

> **Important:**
> While the **Az.HealthDataAIServices** PowerShell module is in preview, you must install it separately
> using the `Install-Module` cmdlet.

```azurepowershell
Install-Module -Name Az.HealthDataAIServices
```

## Deploy a de-identification service

Replace `<deid-service-name>` with a name for your de-identification service.

```azurepowershell
New-AzResourceGroup -Name 'exampleRG' -Location 'EastUS'
New-AzDeidService -ResourceGroupName 'jovinson' -Name '<deid-service-name>' -Location 'EastUS'
```

The command returns the following output, with some fields omitted for brevity.

```output
Id                           : /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/exampleRG/providers/Mi
                               crosoft.HealthDataAIServices/DeidServices/<deid-service-name>
IdentityPrincipalId          :
IdentityTenantId             :
IdentityType                 :
IdentityUserAssignedIdentity : {
                               }
Location                     : eastus
Name                         : <deid-service-name>
PrivateEndpointConnection    :
ProvisioningState            : Succeeded
PublicNetworkAccess          : Enabled
ResourceGroupName            : exampleRG
ServiceUrl                   : https://example.api.eus001.deid.azure.com
Tag                          : {
                               }
Type                         : microsoft.healthdataaiservices/deidservices
```

## Clean up resources

When you no longer need the resources, use the Azure CLI to delete the resource group.

```azurepowershell
Remove-AzResourceGroup -Name 'exampleRG'
```

## Next steps

> 
> [Quickstart: Azure Health De-identification client library for .NET](quickstart-sdk-net.md)
