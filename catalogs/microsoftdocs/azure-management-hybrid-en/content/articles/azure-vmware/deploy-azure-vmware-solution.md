---
title: Deploy and configure Azure VMware Solution
description: In this tutorial, learn how to use the information gathered in the planning stage to deploy and configure the Azure VMware Solution private cloud.
ms.topic: tutorial
ms.custom: "engagement-fy23, devx-track-azurecli"
ms.service: azure-vmware
ms.date: 3/02/2026
# Customer intent: "As a cloud architect, I want to deploy and configure a private cloud using Azure VMware Solution, so that I can leverage VMware technologies within the Azure environment for optimized resource management and increased operational efficiency."
---

# Deploy and configure Azure VMware Solution

After you [plan your deployment](plan-private-cloud-deployment.md), deploy and configure your Azure VMware Solution private cloud. 

In this tutorial, you'll:

> 
> * Register the resource provider and create a private cloud
> * Connect to a new or existing ExpressRoute virtual network gateway
> * Validate the network connection

Once you completed this section, follow the next steps provided at the end of this tutorial.

## Register the Microsoft.AVS resource provider


<!-- Used in deploy-azure-vmware-solution.md and tutorial-create-private-cloud.md -->

To use Azure VMware Solution, you must first register the resource provider with your subscription. For more information about resource providers, see [Azure resource providers and types](../azure-resource-manager/management/resource-providers-and-types.md).


### [Portal](#tab/azure-portal)
 
1. Sign in to the [Azure portal](https://portal.azure.com).
 
   >**Note:**
   >If you need access to the Azure US Gov portal, go to https://portal.azure.us/

1. On the Azure portal menu, select **All services**.

1. In the **All services** box, enter **subscription**, and then select **Subscriptions**.

1. Select the subscription from the subscription list to view.

1. Select **Resource providers** and enter **Microsoft.AVS** into the search. 
 
1. If the resource provider isn't registered, select **Register**.

### [Azure CLI](#tab/azure-cli)

To begin using Azure CLI:

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/deploy-azure-vmware-solution.md)

Sign in to the Azure subscription you use for the Azure VMware Solution deployment through the Azure CLI. Register the `Microsoft.AVS` resource provider with the [az provider register](https://learn.microsoft.com/cli/azure/provider#az-provider-register) command:

```azurecli-interactive
az provider register -n Microsoft.AVS --subscription <your subscription ID>
```

You can use the [az provider list](https://learn.microsoft.com/cli/azure/provider#az-provider-list) command to see all available providers.

---


 


## Create an Azure VMware Solution private cloud


<!-- Used in deploy-azure-vmware-solution.md and tutorial-create-private-cloud.md -->

You can create an Azure VMware Solution private cloud using the Azure portal or the Azure CLI.


### [Portal](#tab/azure-portal)

1. Sign in to the [Azure portal](https://portal.azure.com).
 
   >**Note:**
   >If you need access to the Azure US Gov portal, go to https://portal.azure.us/

1. Select **Create a resource**. 

1. In the **Search services and marketplace** text box, type `Azure VMware Solution` and select it from the search results. 

1. On the **Azure VMware Solution** window, select **Create**.

1. If you need more hosts, [request a host quota increase](request-host-quota-azure-vmware-solution.md?WT.mc_id=Portal-VMCP).

1. On the **Basics** tab, enter values for the fields and then select **Review + Create**. 

   >**Tip:**
   >You gathered this information during the [planning phase](plan-private-cloud-deployment.md) of this quick start.

   | Field | Value |
   | --- | --- |
   | **Subscription** | Select the subscription you plan to use for the deployment. All resources in an Azure subscription are billed together. |
   | **Resource group** | Select the resource group for your private cloud. An Azure resource group is a logical container into which Azure resources are deployed and managed. Alternatively, you can create a new resource group for your private cloud. |
   | **Resource name** | Provide the name of your Azure VMware Solution private cloud. |
   | **Location** | Select a location, such as **(US) East US 2**. It's the *region* you defined during the planning phase. |
   | **Size of host** | Select the **AV36**, **AV36P** or **AV52** SKU. |
   | **Host Location** | Select **All hosts in one availability zone** for a standard private cloud or **Hosts in two availability zones** for stretched clusters. |
   | **Portable VCF (BYOL)** | Configure VCF License details for your private cloud, including the VCF license key, Site ID, serial number, VCF expiration date, and the number of VCF cores, all of which are obtained from Broadcom. For number of VCF cores, enter **only the number of BYOL cores deployed** on this private cloud. Do **not** enter the total number of cores purchased under your Broadcom entitlement unless all entitled cores are deployed on this private cloud. |
   | **Number of hosts** | Number of hosts allocated for the private cloud cluster. The default value is 3, which you can increase or decrease after deployment. If these nodes aren't listed as available, contact support to [request a quota increase](request-host-quota-azure-vmware-solution.md?WT.mc_id=Portal-VMCP). You can also select the link labeled **If you need more hosts, request a quota increase** in the Azure portal. |
   | **Address block for private cloud** | Provide an IP address block for the private cloud.  The CIDR represents the private cloud management network and is used for the cluster management services, such as vCenter Server and NSX-T Manager. Use /22 address space, for example, 10.175.0.0/22.  The address should be unique and not overlap with other Azure Virtual Networks and with on-premises networks. |
   

   Screenshot showing the Basics tab on the Create a private cloud window.

1. Verify the information entered, and if correct, select **Create**.  

   > **Note:**
   > This step takes an estimated 4+ hours. Adding a single host in an existing cluster takes an estimated 1 hour. If you are adding a new cluster with maximum nodes (16), it can take an estimated 4+ hours.

1. Verify that the deployment was successful. Navigate to the resource group you created and select your private cloud.  You see the status of **Succeeded** when the deployment is finished. 

   Screenshot showing that the deployment was successful.


### [Azure CLI](#tab/azure-cli)
Instead of the Azure portal to create an Azure VMware Solution private cloud, you can use the Azure CLI using the Azure Cloud Shell. For a list of commands you can use with Azure VMware Solution, see [Azure VMware commands](https://learn.microsoft.com/cli/azure/vmware).

To begin using Azure CLI:

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/deploy-azure-vmware-solution.md)


1. Create a resource group with the ['az group create'](https://learn.microsoft.com/cli/azure/group) command. An Azure resource group is a logical container into which Azure resources are deployed and managed. The following example creates a resource group named *myResourceGroup* in the *eastus* location:

   ```azurecli-interactive
   
   az group create --name myResourceGroup --location eastus
   ```

2. Provide a name for the resource group and the private cloud, a location, and the size of the cluster.

   | Property | Description |
   | --- | --- |
   | **-g** (Resource Group name) | The name of the resource group for your private cloud resources. |
   | **-n** (Private Cloud name) | The name of your Azure VMware Solution private cloud. |
   | **--location** | The region used for your private cloud. |
   | **--cluster-size** | The size of the cluster. The minimum value is 3. |
   | **--network-block** | The CIDR IP address network block to use for your private cloud. The address block shouldn't overlap with address blocks used in other virtual networks that are in your subscription and on-premises networks. |
   | **--sku** | The SKU value: AV36, AV36P or AV52 |

   ```azurecli-interactive 
   az vmware private-cloud create -g myResourceGroup -n myPrivateCloudName --location eastus --cluster-size 3 --network-block xx.xx.xx.xx/22 --sku AV36
   ```


## Connect to Azure Virtual Network with ExpressRoute

In the planning phase, you defined whether to use an *existing* or *new* ExpressRoute virtual network gateway.  

>**Important:**
>

If you plan to scale your Azure VMware Solution hosts by using [Azure NetApp Files datastores](attach-azure-netapp-files-to-azure-vmware-solution-hosts.md), deploying the virtual network close to your hosts with an ExpressRoute virtual network gateway is crucial. The closer the storage is to your hosts, the better the performance.
 

### Use a new ExpressRoute virtual network gateway

>**Important:**
>You must have a virtual network with a GatewaySubnet that **does not** already have a virtual network gateway.

| If | Then |
| --- | --- |
| You don't already have a virtual network... | Create:<ol><li><a href="tutorial-configure-networking.md#create-a-virtual-network-manually">Virtual network</a></li><li><a href="https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-howto-add-gateway-portal-resource-manager.md#create-the-gateway-subnet"></a>GatewaySubnet</a></li><li><a href="tutorial-configure-networking.md#create-a-virtual-network-gateway">Virtual network gateway</a></li><li><a href="tutorial-configure-networking.md#connect-expressroute-to-the-virtual-network-gateway">Connect ExpressRoute to the gateway</a></li></ol> |
| You already have a virtual network **without** a GatewaySubnet... | Create: <ol><li><a href="https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-howto-add-gateway-portal-resource-manager.md#create-the-gateway-subnet"></a>GatewaySubnet</a></li><li><a href="tutorial-configure-networking.md#create-a-virtual-network-gateway">Virtual network gateway</a></li><li><a href="tutorial-configure-networking.md#connect-expressroute-to-the-virtual-network-gateway">Connect ExpressRoute to the gateway</a></li></ol> |
| You already have a virtual network **with** a GatewaySubnet... | Create: <ol><li><a href="tutorial-configure-networking.md#create-a-virtual-network-gateway">Virtual network gateway</a></li><li><a href="tutorial-configure-networking.md#connect-expressroute-to-the-virtual-network-gateway">Connect ExpressRoute to the gateway</a></li></ol> |

### Use an existing virtual network gateway


<!-- Used in deploy-azure-vmware-solution.md and tutorial-configure-networking.md -->

1. Request an ExpressRoute authorization key:

   
<!-- used in tutorial-expressroute-global-reach-private-cloud.md and create-ipsec-tunnel.md -->

1. In the Azure portal, go to the Azure VMware Solution private cloud.

1. Under **Manage**, select **Connectivity**.

1. Select the **ExpressRoute** tab, and then select **+ Request an authorization key**.

   Screenshot that shows selections for requesting an ExpressRoute authorization key.

1. Provide a name for the authorization key, and then select **Create**.

   It can take about 30 seconds to create the key. After the key is created, it appears in the list of authorization keys for the private cloud.

   Screenshot that shows the ExpressRoute Global Reach authorization key.

1. Copy the authorization key and the ExpressRoute ID. You need them to complete the peering. The authorization key disappears after some time, so copy it as soon as it appears.


1. Go to the virtual network gateway that you plan to use, and then select **Connections** > **+ Add**.

1. On the **Add connection** pane, provide the following values, and then select **OK**.

   | Field | Value |
   | --- | --- |
   | **Name** | Enter a name for the connection. |
   | **Connection type** | Select **ExpressRoute**. |
   | **Redeem authorization** | Ensure that this checkbox is selected. |
   | **Virtual network gateway** | The value is prepopulated with the virtual network gateway that you intend to use. |
   | **Authorization key** | Paste the authorization key that you copied earlier. |
   | **Peer circuit URI** | Paste the ExpressRoute ID that you copied earlier. |

   Screenshot that shows the pane for adding an ExpressRoute connection to a virtual network gateway.

A status of **Succeeded** indicates that you finished creating the connection between your ExpressRoute circuit and your virtual network.

Screenshot that shows a successful virtual network gateway connection.



## Validate the connection

Ensure connectivity between the Azure Virtual Network where the ExpressRoute terminates and the Azure VMware Solution private cloud. 

1. Use a [virtual machine](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal#create-virtual-machine) within the Azure Virtual Network where the Azure VMware Solution ExpressRoute terminates. For more information, see [Connect to Azure Virtual Network with ExpressRoute](#connect-to-azure-virtual-network-with-expressroute).  

   1. Sign in to the Azure [portal](https://portal.azure.com).

   1. Navigate to a running virtual machine (VM), and under **Settings**, select **Networking** and the network interface resource.

      Screenshot showing virtual network interface settings in Azure portal.

   1. On the left, select **Effective routes**. A list of address prefixes that are contained within the `/22` CIDR block you entered during the deployment phase displays.

1. To sign in to both vCenter Server and NSX Manager, open a web browser and sign in to the same virtual machine used for network route validation.  

   Find the vCenter Server and NSX Manager console's IP addresses and credentials in the Azure portal. Select your private cloud and then **Manage** > **VMware credentials**.

   Screenshot displaying private cloud vCenter and NSX Manager URLs and credentials in Azure portal.


## Next steps

In the next tutorial, you'll connect Azure VMware Solution to your on-premises network through ExpressRoute.

> 
> [Connect to your on-premises environment](tutorial-expressroute-global-reach-private-cloud.md)
