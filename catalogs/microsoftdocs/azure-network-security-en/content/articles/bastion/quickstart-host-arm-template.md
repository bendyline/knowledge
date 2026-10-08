---
title: 'Quickstart: Deploy Azure Bastion to a virtual network using an ARM template'
titleSuffix: Azure Bastion
description: Learn how to deploy Azure Bastion to a virtual network by using an Azure Resource Manager template.
author: asudbring
ms.author: allensu
ms.service: azure-bastion
ms.topic: quickstart 
ms.date: 03/31/2025
ms.custom: template-quickstart, devx-track-arm-template
#Customer intent: As someone with a networking background, I want to deploy Azure Bastion to a virtual machine by using an ARM template.
# Customer intent: As a network engineer, I want to deploy Azure Bastion to a virtual network using an ARM template, so that I can securely connect to virtual machines without requiring public IP addresses.
---


# Quickstart: Deploy Azure Bastion to a virtual network by using an ARM template

This quickstart describes how to use an Azure Resource Manager template (ARM template) to deploy Azure Bastion to a virtual network.

An ARM template is a JavaScript Object Notation (JSON) file that defines the infrastructure and configuration for your project. The template uses declarative syntax. In declarative syntax, you describe your intended deployment without writing the sequence of programming commands to create the deployment.

The following diagram shows the architecture of Bastion.

Diagram that shows the Azure Bastion architecture.

If your environment meets the prerequisites and you're familiar with using ARM templates, select the following **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

Verify that you have an Azure subscription. If you don't already have an Azure subscription, you can activate your [MSDN subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details) or sign up for a [free account](https://azure.microsoft.com/pricing/free-trial).

> **Note:**
> The use of Bastion with Azure Private DNS zones is not supported at this time. Before you begin, make sure that the virtual network where you plan to deploy your Bastion resource is not linked to a private DNS zone.

## Review the template

To view the entire template that this quickstart uses, see [Azure Bastion as a Service with NSG](https://azure.microsoft.com/resources/templates/azure-bastion-nsg/).

By default, this template creates a Bastion deployment with a resource group, a virtual network, network security group (NSG) settings, an AzureBastionSubnet subnet, a bastion host, and a public IP address resource that's used for the bastion host. Here's the purpose of each part of the template:

* [Microsoft.Network/bastionHosts](https://learn.microsoft.com/azure/templates/microsoft.network/bastionhosts) creates the bastion host.
* [Microsoft.Network/virtualNetworks](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks) creates a virtual network.
* [Microsoft.Network/virtualNetworks/subnets](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets) creates the subnet.
* [Microsoft Network/networkSecurityGroups](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets) controls the NSG settings.
* [Microsoft.Network/publicIpAddresses](https://learn.microsoft.com/azure/templates/microsoft.network/publicIpAddresses) specifies the public IP address value for the bastion host.

### Parameters

| Parameter name | Description |
| --- | --- |
| `Region` | Azure region for Bastion and the virtual network. |
| `vnet-name` | Name of a new or existing virtual network to which Bastion should be deployed. |
| `vnet-ip-prefix` | IP prefix for available addresses in a virtual network address space. |
| `vnet-new-or-existing` | Choice of whether to deploy new virtual network or deploy to an existing one. |
| `bastion-subnet-ip-prefix` | Bastion subnet IP prefix, which must be within the virtual network IP prefix's address space. |
| `bastion-host-name` | Name of the Bastion resource. |

> **Note:**
> To find more templates, see [Azure quickstart templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Network&pageNumber=1&sort=Popular).

## Deploy the template

> **Important:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/quickstart-host-arm-template.md)

In this section, you deploy Bastion by using the Azure portal. You don't connect and sign in to your virtual machine or deploy Bastion directly from your VM.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select the following **Deploy to Azure** button:

     Button to deploy the Resource Manager template to Azure.

1. In the **Azure Bastion as a Service** template, enter or select information on the **Basics** tab. Keep these considerations in mind:

   * If you're using the template for a test environment, you can use the example values that this step provides.
   * To view the template, select **Edit template**. On this page, you can adjust some of the values, such as the address space or the name of certain resources. Select **Save** to save your changes, or select **Discard** to discard them.
   * If you decide to create your bastion host in an existing virtual network, be sure to fill in the values for the template as they exist in your deployed environment, or the template will fail.

    Screenshot of example values for an Azure Bastion ARM template.

   | Setting | Example value |
   | --- | --- |
   | **Subscription** | Select your Azure subscription. |
   | **Resource group** | Select **Create new**, enter **TestRG1**, and then select **OK**. |
   | **Region** | Enter **East US**. |
   | **Vnet-name** | Enter **VNet1**. |
   | **Vnet-ip-prefix** | Enter **10.1.0.0/16**. |
   | **Vnet-new-or-existing** | Select **new**. |
   | **Bastion-subnet-ip-prefix** | Enter **10.1.1.0/24**. |
   | **Bastion-host-name** | Enter **TestBastionHost**. |

1. Select the **Review + create** tab, or select the **Review + create** button. Select **Create**.
1. The deployment finishes within 10 minutes. You can view the progress on the template **Overview** pane. If you close the portal, deployment continues.

## Validate the deployment

To validate the deployment of Bastion:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select the **TestRG1** resource group that you created in the previous section.
1. From the **Overview** pane of the resource group, scroll down to the **Resources** tab. Validate the Bastion resource.

   Screenshot that shows the Azure Bastion resource in a resource group.

## Clean up resources

When you finish using the virtual network and the virtual machines, delete the resource group and all of the resources that it contains:

1. Enter the name of your resource group in the **Search** box at the top of the portal, and then select it from the search results.
1. Select **Delete resource group**.
1. Enter your resource group for **TYPE THE RESOURCE GROUP NAME**, and then select **Delete**.

## Next steps

In this quickstart, you deployed Bastion by using an ARM template. You then connected to a virtual machine securely via Bastion. Continue with the following steps if you want to copy and paste to your virtual machine.

> 
> [Quickstart: Create a Windows virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal)

> 
> [Create an RDP connection to a Windows VM using Azure Bastion](bastion-connect-vm-rdp-windows.md)
