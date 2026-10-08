---
title: Azure NetApp Files for Azure Government 
description: Learn how to connect to Azure Government to use Azure NetApp Files and the Azure NetApp Files feature availability in Azure Government.
services: azure-netapp-files
author: b-hchen
ms.service: azure-netapp-files
ms.custom: devx-track-azurecli, no-azure-ad-ps-ref
ms.topic: concept-article
ms.date: 03/17/2026
ms.author: anfdocs
# Customer intent: As a government IT administrator, I want to understand how to access and utilize Azure NetApp Files in Azure Government, so that I can effectively manage mission-critical workloads within the dedicated cloud environment.
---

# Azure NetApp Files for Azure Government

[Microsoft Azure Government](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-welcome.md) delivers a dedicated cloud that enables government agencies and their partners to transform mission-critical workloads to the cloud.

This article describes Azure NetApp Files feature availability in Azure Government. It also shows you how to access Azure NetApp Files within Azure Government.

## Feature availability

For Azure Government regions supported by Azure NetApp Files, see [Products available by region](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/?products=netapp&regions=usgov-non-regional,us-dod-central,us-dod-east,usgov-arizona,usgov-texas,usgov-virginia&rar=true).

All [Azure NetApp Files features](whats-new.md) available on Azure public cloud are also available on supported Azure Government regions, *except for the features listed in the following table*:

| Azure NetApp Files features | Azure public cloud availability | Azure Government availability |
| :--- | :--- | :--- |
| Elastic zone-redundant storage service level | Preview | No |
| Microsoft Entra Kerberos authentication for SMB volumes with Azure NetApp Files | Preview | No |


## Portal access

Azure Government users can access Azure NetApp Files by pointing their browsers to **portal.azure.us**. The portal site name is **Microsoft Azure Government**. For more information, see [Connect to Azure Government using portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-get-started-connect-with-portal.md).

Screenshot that shows the Azure Government portal highlighting portal.azure.us as the URL.

From the Azure Government portal, you can access Azure NetApp Files the same way you would in the Azure portal. For example, you can enter **Azure NetApp Files** in the portal's **Search resources** box, and then select **Azure NetApp Files** from the list that appears.

You can follow [Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/index.yml) documentation for details about using the service.

## Azure CLI access

You can connect to Azure Government by setting the cloud name to `AzureUSGovernment` and then proceeding to sign in as you normally would with the `az login` command. After you run the sign-in command, a browser launches, where you enter the appropriate Azure Government credentials.

```azurecli 

az cloud set --name AzureUSGovernment 

``` 

To confirm the cloud was set to `AzureUSGovernment`, run:

```azurecli 

az cloud list --output table 

``` 

This command produces a table with Azure cloud locations. The `isActive` column entry for `AzureUSGovernment` should read `true`.

For more information, see [Connect to Azure Government with Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-get-started-connect-with-cli.md).

## REST API access

Endpoints for Azure Government are different from commercial Azure endpoints. For a list of different endpoints, see Azure Government's [Guidance for developers](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/compare-azure-government-global-azure.md#guidance-for-developers).

## PowerShell access

When you connect to Azure Government through PowerShell, you must specify an environmental parameter to ensure that you connect to the correct endpoints. From there, you can proceed to use Azure NetApp Files as you normally would with PowerShell.

[Include unavailable in this source snapshot: ~/reusable-content/msgraph-powershell/includes/aad-powershell-deprecation-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-government.md)

| Connection type | Command |
| --- | --- |
| [Azure](https://learn.microsoft.com/powershell/module/az.accounts/Connect-AzAccount) commands | `Connect-AzAccount -EnvironmentName AzureUSGovernment` |
| [Microsoft Graph PowerShell](https://learn.microsoft.com/powershell/microsoftgraph/authentication-commands) | `Connect-MgGraph -Environment USGov` |
| [Microsoft Entra PowerShell](https://learn.microsoft.com/powershell/entra-powershell/authentication-scenarios) | `Connect-Entra -Environment USGov` |
| Azure (Classic deployment model) commands | `Add-AzureAccount -Environment AzureUSGovernment` |
| [Microsoft Entra ID (Classic deployment model)](https://learn.microsoft.com/previous-versions/azure/jj151815\(v=azure.100\)) commands | `Connect-MsolService -AzureEnvironment UsGovernment` |

For more information, see [Connect to Azure Government with PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-get-started-connect-with-ps.md).

## Next steps

* [What is Azure Government?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-welcome.md)
* [What's new in Azure NetApp Files](whats-new.md)
* [Compare Azure Government and global Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/compare-azure-government-global-azure.md)
* [Azure NetApp Files REST API](azure-netapp-files-develop-with-rest-api.md)
* [Azure NetApp Files REST API using PowerShell](develop-rest-api-powershell.md)
