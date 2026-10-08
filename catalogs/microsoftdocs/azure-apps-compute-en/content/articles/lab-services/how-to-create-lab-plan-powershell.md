---
title: Create a lab plan using PowerShell
titleSuffix: Azure Lab Services
description: Learn how to create an Azure Lab Services lab plan using PowerShell and the Azure PowerShell module.
ms.topic: how-to
ms.date: 06/15/2022
ms.custom: mode-api, devx-track-azurepowershell
---

# Create a lab plan in Azure Lab Services using PowerShell and the Azure modules


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


In this article, you learn how to use PowerShell and the Azure module to create a lab plan.  Lab plans are used when creating labs for Azure Lab Services.  You'll also add a role assignment so an educator can create labs based on the lab plan.  For an overview of Azure Lab Services, see [An introduction to Azure Lab Services](lab-services-overview.md).

## Prerequisites


- An Azure account with an active subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


- An Azure account with permission to manage a lab, such as the [Lab Creator](concept-lab-services-role-based-access-control.md#lab-creator-role), [Owner](concept-lab-services-role-based-access-control.md#owner-role), [Contributor](concept-lab-services-role-based-access-control.md#contributor-role), or [Lab Services Contributor](concept-lab-services-role-based-access-control.md#lab-services-contributor-role) Azure RBAC role. Learn more about the [Azure Lab Services built-in roles and assignment scopes](concept-lab-services-role-based-access-control.md).


- [Windows PowerShell](https://learn.microsoft.com/powershell/scripting/windows-powershell/starting-windows-powershell).
- [Azure Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az). Must be version 7.2 or higher.

    ```powershell
    Install-Module 'Az'
    ```

- [Az.LabServices PowerShell module](https://learn.microsoft.com/powershell/module/az.labservices/).

    ```powershell
    Install-Module 'Az.LabServices'
    ```

Run [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) to sign in to Azure and verify an active subscription.

## Create a lab plan

The following steps will show you how to create a lab plan.  Any properties set in the lab plan will be used in labs created with this plan.

```powershell
New-AzResourceGroup -Name "MyResourceGroup" -Location "eastus"

$plan = New-AzLabServicesLabPlan -Name "ContosoLabPlan" `
    -ResourceGroupName "MyResourceGroup" `
    -Location "eastus" `
    -AllowedRegion @("westus","eastus")
```

## Add a user to the Lab Creator role

To create or edit up a lab in the Lab Services web portal ([https://labs.azure.com](https://labs.azure.com)), the educator must be assigned the **Lab Creator** role.  Assigning the **Lab Creator** role on the lab plan's resource group will allow an educator to use all lab plans in that resource group.

```powershell
New-AzRoleAssignment -SignInName <emailOrUserprincipalname> `
    -RoleDefinitionName "Lab Creator" `
    -ResourceGroupName "MyResourceGroup"
```

For more information about role assignments, see [Assign Azure roles using Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-powershell.md).

## Clean up resources

If you're not going to continue to use this application, delete the lab with the following steps:

```powershell
Remove-AzRoleAssignment -SignInName <emailOrUserprincipalname> `
    -RoleDefinitionName "Lab Creator" `
    -ResourceGroupName "MyResourceGroup"
$plan | Remove-AzLabServicesLabPlan
```

## Next steps

In this article, you created a resource group and a lab plan.  As an admin, you can learn more about [Azure PowerShell module](https://learn.microsoft.com/powershell/azure) and [Az.LabServices cmdlets](https://learn.microsoft.com/powershell/module/az.labservices/).

> 
> [Create a lab using PowerShell and the Azure module](how-to-create-lab-powershell.md)
