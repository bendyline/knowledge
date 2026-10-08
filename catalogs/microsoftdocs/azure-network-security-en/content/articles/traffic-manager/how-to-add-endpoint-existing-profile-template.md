---
title: Add an external endpoint to an existing profile - Azure Template
titlesuffix: Azure Traffic Manager
description: Learn how to add an external endpoint to an existing Azure Traffic Manager profile using an Azure Template.
author: asudbring
ms.author: allensu
ms.service: azure-traffic-manager
ms.topic: how-to
ms.date: 04/24/2023
ms.custom: template-how-to
# Customer intent: "As a cloud administrator, I want to add an external endpoint to an existing Traffic Manager profile using an ARM template, so that I can enhance traffic routing capabilities across my resources."
---

# Add an external endpoint to an existing profile using an Azure Template

This article describes how to use an Azure Resource Manager template (ARM Template) to add an external endpoint to an existing Traffic Manager profile.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/how-to-add-endpoint-existing-profile-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- An existing Azure Traffic Manager profile. For more information on creating an Azure Traffic Manager profile, see [Quickstart: Create a Traffic Manager profile using an ARM template](quickstart-create-traffic-manager-profile-template.md).

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/traffic-manager-add-external-endpoint).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/traffic-manager-add-external-endpoint/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/how-to-add-endpoint-existing-profile-template.md)

One Azure resource is defined in the template:

* [**Microsoft.Network/trafficManagerProfiles/ExternalEndpoints**](https://learn.microsoft.com/azure/templates/microsoft.network/trafficmanagerprofiles)

To find more templates that are related to Azure Traffic Manager, see [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Network&pageNumber=1&sort=Popular).

## Deploy the template

1. Select **Try it** from the following code block to open Azure Cloud Shell, and then follow the instructions to sign in to Azure.

    ```azurepowershell-interactive
    $templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.network/traffic-manager-add-external-endpoint/azuredeploy.json"

    $resourceGroupName = Read-Host -Prompt "Enter name of resource group of existing traffic manager profile"

    New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri

    Read-Host -Prompt "Press [ENTER] to continue ..."
    ```

    Wait until you see the prompt from the console.

1. Select **Copy** from the previous code block to copy the PowerShell script.

1. Right-click the shell console pane and then select **Paste**.

1. Enter the values.

    The template deployment adds another endpoint based on your inputs to an existing profile. 

    The resource group name is the existing resource group that contains the existing profile.

    > **Note:**
    > **existingTMProfileName** must match your existing profile name in order for the template to deploy successfully. If deployment fails, start over with Step 1.

    It takes a few minutes to deploy the template. When completed, the output is similar to:

    Azure Traffic Manager Resource Manager template PowerShell deployment output

    Azure PowerShell is used to deploy the template. In addition to Azure PowerShell, you can also use the Azure portal, Azure CLI, and REST API. To learn other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-portal.md).

## Validate the deployment

1. Use [Get-AzTrafficManagerProfile](https://learn.microsoft.com/powershell/module/az.trafficmanager/get-aztrafficmanagerprofile) to verify that another endpoint was added to the profile.

    ```azurepowershell-interactive
    Get-AzTrafficManagerProfile -ResourceGroupName myResourceGroup -Name ExternalEndpointExample | Select Endpoints
    ```
    The output is similar to:

    Output of validation command

## Clean up resources

When you no longer need the Traffic Manager profile, delete the resource group. This command removes the Traffic Manager profile and all the related resources.

To delete the resource group, call the `Remove-AzResourceGroup` cmdlet:

```azurepowershell-interactive
Remove-AzResourceGroup -Name <your resource group name>
```

## Next steps

In this quickstart, you added an endpoint to an existing Traffic Manager profile.

To learn more about routing traffic, continue to the Traffic Manager tutorials.

> 
> [Traffic Manager tutorials](tutorial-traffic-manager-improve-website-response.md)
