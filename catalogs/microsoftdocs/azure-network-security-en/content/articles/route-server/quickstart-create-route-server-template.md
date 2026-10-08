---
title: 'Quickstart: Create an Azure Route Server using an ARM template'
description: Learn how to deploy Azure Route Server using Azure Resource Manager templates to enable dynamic routing and BGP peering with network virtual appliances in your virtual network.
author: duongau
ms.author: duau
ms.service: azure-route-server
ms.topic: quickstart
ms.date: 09/17/2025
ms.custom: subject-armqs, mode-arm, devx-track-arm-template

#CustomerIntent: As an Azure administrator, I want to deploy Azure Route Server in my environment so that it dynamically updates virtual machines (VMs) routing tables with changes in the topology.
---

# Quickstart: Create an Azure Route Server using an ARM template

This quickstart shows you how to use an Azure Resource Manager template (ARM template) to deploy Azure Route Server into a new or existing virtual network. Azure Route Server enables dynamic routing between your virtual network and network virtual appliances through BGP peering, automatically managing route exchanges in your network infrastructure.

By completing this quickstart, you'll have a functioning Route Server deployed with the necessary network infrastructure and ready for BGP peering configuration.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/quickstart-create-route-server-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button to open the template in the Azure portal.

Button to deploy the Azure Resource Manager template to Azure portal.

## Prerequisites

Before you begin, ensure you have the following requirements:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Familiarity with [Azure Route Server service limits](route-server-faq.md#limitations).

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/route-server). This ARM template deploys a complete Route Server environment including the virtual network infrastructure and BGP peering configuration.

The template creates the following resources:
- Azure Route Server in a new or existing virtual network
- Dedicated subnet named **RouteServerSubnet** to host the Route Server  
- BGP peering configuration with specified Peer ASN and Peer IP

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/route-server/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/quickstart-create-route-server-template.md)

### Template resources

The following Azure resources are defined in the template:

* [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualNetworks?pivots=deployment-language-arm-template) - Virtual network to host the Route Server
* [**Microsoft.Network/virtualNetworks/subnets**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualNetworks/subnets?pivots=deployment-language-arm-template) - Two subnets, including the required **RouteServerSubnet**  
* [**Microsoft.Network/virtualHubs**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualhubs?pivots=deployment-language-arm-template) - Route Server deployment resource
* [**Microsoft.Network/virtualHubs/ipConfigurations**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualhubs/ipConfigurations?pivots=deployment-language-arm-template) - IP configuration for Route Server
* [**Microsoft.Network/virtualHubs/bgpConnections**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualhubs/bgpconnections?pivots=deployment-language-arm-template) - BGP peering configuration with Peer ASN and Peer IP

To find more templates related to Azure networking, see [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Network&pageNumber=1&sort=Popular).

## Deploy the template

You can deploy the template using Azure PowerShell through Azure Cloud Shell or your local PowerShell environment.

1. Select **Open Cloud Shell** from the following code block to open Azure Cloud Shell, and then follow the instructions to sign in to Azure:

    ```azurepowershell-interactive
    $projectName = Read-Host -Prompt "Enter a project name that is used for generating resource names"
    $location = Read-Host -Prompt "Enter the location (i.e. centralus)"
    $templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.network/route-server/azuredeploy.json"

    $resourceGroupName = "${projectName}rg"

    New-AzResourceGroup -Name $resourceGroupName -Location "$location"
    New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri

    Read-Host -Prompt "Press [ENTER] to continue ..."
    ```

    Wait until you see the prompt from the console.

1. Select **Copy** from the previous code block to copy the PowerShell script.

1. Right-click the shell console pane and then select **Paste**.

1. Enter the values when prompted:
   - **Project name**: Used for generating resource names (the resource group name will be the project name with **rg** appended)
   - **Location**: Azure region where resources will be deployed

    The deployment takes approximately 20 minutes to complete. When finished, the output should be similar to:

    Screenshot showing Route Server Resource Manager template PowerShell deployment output.

Azure PowerShell is used to deploy the template in this example. You can also use the Azure portal, Azure CLI, and REST API for template deployment. To learn about other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-portal.md).

## Validate the deployment

After the template deployment completes, verify that the Route Server was created successfully.

### Verify resources in the Azure portal

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Select **Resource groups** from the left pane.

1. Select the resource group that you created in the previous section. The default resource group name is the project name with **rg** appended.

1. The resource group should contain the virtual network and associated resources:

     Screenshot showing Route Server deployment resource group with virtual network and related resources.

### Verify Route Server deployment

1. From the Azure portal, navigate to your resource group and select the Route Server resource.

2. On the Route Server overview page, verify the following:

    - **Status** shows as "Succeeded"
    - **BGP ASN** displays the configured autonomous system number
    - **Routing State** shows as "Provisioned"

    Screenshot showing Route Server overview page confirming successful deployment.

## Clean up resources

When you no longer need the Route Server and associated resources, delete the resource group to remove the Route Server and all related resources.

To delete the resource group, use the [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) cmdlet:

```azurepowershell-interactive
Remove-AzResourceGroup -Name <your resource group name>
```

## Next step

Now that you've deployed a Route Server using an ARM template, learn more about Route Server capabilities:

> 
> [Tutorial: Configure BGP peering between Route Server and network virtual appliance](peer-route-server-with-virtual-appliance.md)
