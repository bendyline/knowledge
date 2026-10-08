---
title: Create a lab using Bicep
titleSuffix: Azure Lab Services
description: Learn how to create an Azure Lab Services lab by using Bicep.
ms.topic: how-to
ms.date: 05/23/2022
ms.custom:
  - mode-api
  - devx-track-bicep
  - sfi-image-nochange
---

# Create a lab in Azure Lab Services using a Bicep file


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


In this article, you learn how to create a lab using a Bicep file.  For a detailed overview of Azure Lab Services, see [An introduction to Azure Lab Services](lab-services-overview.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-create-lab-bicep.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-create-lab-bicep.md)

## Prerequisites


- An Azure account with an active subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


- An Azure account with permission to manage a lab, such as the [Lab Creator](concept-lab-services-role-based-access-control.md#lab-creator-role), [Owner](concept-lab-services-role-based-access-control.md#owner-role), [Contributor](concept-lab-services-role-based-access-control.md#contributor-role), or [Lab Services Contributor](concept-lab-services-role-based-access-control.md#lab-services-contributor-role) Azure RBAC role. Learn more about the [Azure Lab Services built-in roles and assignment scopes](concept-lab-services-role-based-access-control.md).


- An Azure lab plan. If you don't have a lab plan yet, follow the steps in [Quickstart: Set up resources to create labs](quick-create-resources.md).

## Review the code

# [Bicep](#tab/bicep)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


The Bicep file used in this article is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/lab/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.labservices/lab/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-create-lab-bicep.md)

# [ARM](#tab/arm)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


The template used in this article is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/lab/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.labservices/lab-using-lab-plan/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-create-lab-bicep.md)

One Azure resource is defined in the template:

- **[Microsoft.LabServices/labs](https://learn.microsoft.com/azure/templates/microsoft.labservices/labs)**: resource type description.

More Azure Lab Services template samples can be found in [Azure Quickstart Templates](https://learn.microsoft.com/samples/browse/?expanded=azure\&products=azure-resource-manager\&terms=lab%20services).  For more information how to create a lab without a lab plan using automation, see [Create Azure LabServices lab template](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/lab/).

---

## Deploy the resources

# [Bicep](#tab/bicep)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters adminUsername=<admin-username>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -adminUsername "<admin-username>"
    ```

    ---

  > **Note:**
  > Replace **\<admin-username\>** with a unique username. You'll also be prompted to enter adminPassword. The minimum password length is 12 characters.

  When the deployment finishes, you should see a messaged indicating the deployment succeeded.

# [ARM](#tab/arm)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


1. Select the following link to sign in to Azure and open a template. The template creates a lab.

    Button to deploy the Resource Manager template to Azure.

2. Optionally, change the name of the lab.
3. Select the **resource group** the lab plan you're going to use.
4. Enter the required values for the template:

    1. **adminUser**. The name of the user that will be added as an administrator for the lab VM.
    2. **adminPassword**.  The password for the administrator user for the lab VM.
    3. **labPlanId**.  The resource ID for the lab plan to be used.  The **Id** is listed in the **Properties** page of the lab plan resource in Azure.

        Screenshot of properties page for lab plan in Azure Lab Services with ID property highlighted.

5. Select **Review + create**.
6. Select **Create**.

The Azure portal is used here to deploy the template. You can also use Azure PowerShell, Azure CLI, or the REST API. To learn other deployment methods, see [Deploy resources with ARM templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md).

---

## Review deployed resources

Use the Azure portal, Azure CLI, or Azure PowerShell to list the deployed resources in the resource group.

To use Azure PowerShell, first verify the Az.LabServices module is installed. Then use the **Get-AzLabServicesLab** cmdlet.

# [CLI](#tab/CLI)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

When no longer needed, use the Azure portal, Azure CLI, or Azure PowerShell to delete the VM and all of the resources in the resource group.

# [CLI](#tab/CLI)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

## Next steps

In this article, you deployed a simple virtual machine using a Bicep file or ARM template. To learn more about Azure virtual machines, continue to the tutorial for Linux VMs.

> 
> [Configure a template VM](how-to-create-manage-template.md)
