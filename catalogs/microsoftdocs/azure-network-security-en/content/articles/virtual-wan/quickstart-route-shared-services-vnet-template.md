---
title: 'Quickstart: Route to shared services using an ARM template'
titleSuffix: Azure Virtual WAN
description: Learn about how to set up routes to access a shared service VNet with a workload that you want every VNet and Branch to access using an Azure Resource Manager template (ARM template).
author: duongau
ms.service: azure-virtual-wan
ms.topic: quickstart
ms.date: 03/27/2025
ms.author: duau
ms.custom:
  - subject-armqs
  - mode-arm
  - devx-track-arm-template
  - sfi-image-nochange
---

# Quickstart: Route to shared services VNets using an ARM template

This quickstart describes how to use an Azure Resource Manager template (ARM template) to set up routes to access a shared service VNet with workloads that you want every VNet and Branch (VPN/ER/P2S) to access. Examples of these shared workloads might include virtual machines with services like domain controllers or file shares, or Azure services exposed internally through [Azure Private Endpoint](../private-link/private-endpoint-overview.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/quickstart-route-shared-services-vnet-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* Public key certificate data is required for this configuration. Sample data is provided in the article. However, the sample data is provided only to satisfy the template requirements in order to create a P2S gateway. After the template completes and the resources are deployed, you must update this field with your own certificate data in order for the configuration to work. See [Generate and export certificates](certificates-point-to-site.md#cer).

## <a name="review"></a>Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/virtual-wan-with-route-tables). The template for this article is too long to show here. To view the template, see [azuredeploy.json](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.network/virtual-wan-with-route-tables/azuredeploy.json).

In this quickstart, you'll create an Azure Virtual WAN multi-hub deployment, including all gateways and VNet connections. The list of input parameters has been purposely kept at a minimum. The IP addressing scheme can be changed by modifying the variables inside of the template. The scenario is explained further in the [Scenario: Shared services VNet](scenario-shared-services-vnet.md) article.

Deployment architecture

This template creates a fully functional Azure Virtual WAN environment with the following resources:

* 2 distinct hubs in different regions.
* 4 Azure Virtual Networks (VNet).
* 2 VNet connections for each VWan hub.
* 1 Point-to-Site (P2S) VPN gateway in each hub.
* 1 Site-to-Site (S2S) VPN gateway in each hub.
* 1 ExpressRoute gateway in each hub.
* Custom Route Tables RT_SHARED in each hub.
* A label LBL_RT_SHARED to group RT_SHARED route tables.

Multiple Azure resources are defined in the template:

* [**Microsoft.Network/virtualwans**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualwans)
* [**Microsoft.Network/virtualhubs**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualhubs)
* [**Microsoft.Network/virtualnetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)
* [**Microsoft.Network/hubvirtualnetworkconnections**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualhubs/hubvirtualnetworkconnections)
* [**Microsoft.Network/hubroutetables**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualhubs/hubRouteTables)
* [**Microsoft.Network/p2svpngateways**](https://learn.microsoft.com/azure/templates/microsoft.network/p2svpngateways)
* [**Microsoft.Network/vpngateways**](https://learn.microsoft.com/azure/templates/microsoft.network/vpngateways)
* [**Microsoft.Network/expressroutegateways**](https://learn.microsoft.com/azure/templates/microsoft.network/expressroutegateways)
* [**Microsoft.Network/vpnserverconfigurations**](https://learn.microsoft.com/azure/templates/microsoft.network/vpnServerConfigurations)

> **Note:**
> This ARM template doesn't create the customer-side resources required for hybrid connectivity. After you deploy the template, you still need to create and configure the P2S VPN clients, VPN branches (Local Sites), and connect ExpressRoute circuits.

To find more templates, see [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Network&pageNumber=1&sort=Popular).

## <a name="deploy"></a>Deploy the template

To deploy this template properly, you must use the button to Deploy to Azure button and the Azure portal, rather than other methods, for the following reasons:

* In order to create the P2S configuration, you need to upload the root certificate data. The data field doesn't accept the certificate data when using PowerShell or CLI.
* This template doesn't work properly using Cloud Shell due to the certificate data upload.
* Additionally, you can easily modify the template and parameters in the portal to accommodate IP address ranges and other values.

1. Click **Deploy to Azure**.

   Button to deploy the Resource Manager template to Azure.
1. To view the template, click **Edit template**. On this page, you can adjust some of the values such as address space or the name of certain resources. **Save** to save your changes, or **Discard**.
1. On the template page, enter the values. For this template, the P2S public certificate data is required. You need to input the public key certificate data from the root certificate that you want to use (as mentioned in the prerequisites). For more information, see [Generate and export certificates](certificates-point-to-site.md).
1. When you have finished entering values, select **Review + create**.
1. On the **Review + create** page, after validation passes, select **Create**.
1. It takes about 75 minutes for the deployment to complete. You can view the progress on the template **Overview** page. If you close the portal, deployment continues.

   Example of deployment complete

## <a name="validate"></a>Validate the deployment

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select **Resource groups** from the left pane.
1. Select the resource group that you created in the previous section. On the **Overview** page, you'll see something similar to this example:
   Example of resources

1. Click the virtual WAN to view the hubs. On the virtual WAN page, click each hub to view connections and other hub information.

## <a name="complete"></a>Complete the hybrid configuration

The template doesn't configure all of the settings necessary for a hybrid network. You need to complete the following configurations and settings, depending on your requirements.

* [Configure the VPN branches - local sites](virtual-wan-site-to-site-portal.md#site)
* [Complete the P2S VPN configuration](virtual-wan-point-to-site-portal.md)
* [Connect the ExpressRoute circuits](virtual-wan-expressroute-portal.md)

## Clean up resources

When you no longer need the resources that you created, delete them. Some of the Virtual WAN resources must be deleted in a certain order due to dependencies. Deleting can take about 30 minutes to complete.


1. Open the virtual WAN that you created.

1. Select a virtual hub associated to the virtual WAN to open the hub page.

1. Delete all gateway entities following the below order for each gateway type. This can take 30 minutes to complete.

   **VPN:**  
   * Disconnect VPN sites  
   * Delete VPN connections  
   * Delete VPN gateways  

   **ExpressRoute:**  
   * Delete ExpressRoute connections  
   * Delete ExpressRoute gateways

1. Repeat for all hubs associated to the virtual WAN.

1. You can either delete the hubs at this point, or delete the hubs later when you delete the resource group.

1. Navigate to the resource group in the Azure portal.

1. Select **Delete resource group**. This deletes the other resources in the resource group, including the hubs and the virtual WAN.

## Next steps

> 
> [Complete the P2S VPN configuration](virtual-wan-point-to-site-portal.md)

> 
> [Configure the VPN branches - local sites](virtual-wan-site-to-site-portal.md#site)

> 
> [Connect the ExpressRoute circuits](virtual-wan-expressroute-portal.md)
