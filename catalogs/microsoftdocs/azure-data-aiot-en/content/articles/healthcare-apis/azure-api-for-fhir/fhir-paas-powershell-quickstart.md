---
title: 'Quickstart: Deploy Azure API for FHIR using PowerShell'
description: In this quickstart, you learn how to deploy Azure API for FHIR using PowerShell.
services: healthcare-apis
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: quickstart
ms.date: 11/20/2025
ms.author: kesheth
ms.custom: devx-track-azurepowershell
---

# Quickstart: Deploy Azure API for FHIR using PowerShell


> **Important:**
> Microsoft deprecated Azure API for FHIR on **September 30, 2026**. For questions or assistance, create an Azure support request by using **Azure API for FHIR Extension Request**.


In this quickstart, you learn how to deploy Azure API for FHIR using PowerShell.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cloud-shell-try-it.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/fhir-paas-powershell-quickstart.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/fhir-paas-powershell-quickstart.md)

## Register the Azure API for FHIR resource provider

If the `Microsoft.HealthcareApis` resource provider isn't already registered for your subscription, you can register it with the following command.

```azurepowershell-interactive
Register-AzResourceProvider -ProviderNamespace Microsoft.HealthcareApis
```

## Create Azure resource group

```azurepowershell-interactive
New-AzResourceGroup -Name "myResourceGroupName" -Location westus2
```

## Deploy Azure API for FHIR

```azurepowershell-interactive
New-AzHealthcareApisService -Name nameoffhirservice -ResourceGroupName myResourceGroupName -Location westus2 -Kind fhir-R4
```

> **Note:**
> Depending on the version of the `Az` PowerShell module you have installed, the provisioned FHIR server may be configured to use [local role-based access control (RBAC)](configure-local-rbac.md) and have the currently signed in PowerShell user in the list of allowed identity object IDs for the deployed FHIR service. We recommend you [use Azure RBAC](configure-azure-rbac.md) for assigning data plane roles. You may need to delete this user's object ID after deployment to enable Azure RBAC mode.


## Fetch capability statement

You can validate that the Azure API for FHIR account is running by fetching a FHIR capability statement with the following commands.

```azurepowershell-interactive
$metadata = Invoke-WebRequest -Uri "https://nameoffhirservice.azurehealthcareapis.com/metadata"
$metadata.RawContent
```

## Clean up resources

If you're not going to continue using this application, delete the resource group with the following steps.

```azurepowershell-interactive
Remove-AzResourceGroup -Name myResourceGroupName
```

## Next steps

In this quickstart guide, you deployed the Azure API for FHIR into your subscription. For more information about the settings in Azure API for FHIR and to start using Azure API for FHIR, see

>
>[Additional settings in Azure API for FHIR](azure-api-for-fhir-additional-settings.md)

>
>[Register Applications Overview](fhir-app-registration.md)

>
>[Configure Azure RBAC](configure-azure-rbac.md)

>
>[Configure local RBAC](configure-local-rbac.md)

>
>[Configure database settings](configure-database.md)

>
>[Configure customer-managed keys](customer-managed-key.md)

>
>[Configure CORS](configure-cross-origin-resource-sharing.md)

>
>[Configure Private Link](configure-private-link.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
