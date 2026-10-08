---
title: Tutorial - Deploy an Azure VMware Solution private cloud
description: Learn how to create and deploy an Azure VMware Solution private cloud
ms.topic: tutorial
ms.service: azure-vmware
ms.date: 4/03/2026
ms.custom: engagement-fy23, devx-track-azurecli
# Customer intent: As a cloud administrator, I want to deploy an Azure VMware Solution private cloud, so that I can manage and scale vSphere clusters with the necessary resources for our workloads.
---

# Tutorial: Deploy an Azure VMware Solution private cloud

The Azure VMware Solution private gives you the ability to deploy a vSphere cluster in Azure. For each private cloud created, there's one vSAN cluster by default. You can add, delete, and scale clusters. The minimum number of hosts per cluster is three. More hosts can be added one at a time, up to a maximum of 16 hosts per cluster. The maximum number of clusters per private cloud is 12. The initial deployment of Azure VMware Solution has three hosts.

You use vCenter Server and NSX-T Manager to manage most other aspects of cluster configuration or operation. All local storage of each host in a cluster is under the control of vSAN.

>**Tip:**
>You can always extend the cluster and add more clusters later if you need to go beyond the initial deployment number.

Because Azure VMware Solution doesn't allow you to manage your private cloud with your cloud vCenter Server at launch, you need to do more steps for the configuration. This tutorial covers these steps and related prerequisites.

In this tutorial, learn how to:

> 
> * Create an Azure VMware Solution private cloud
> * Verify the private cloud deployed

## Prerequisites

- Create a private cloud with the required administrative rights and permissions. You must be at the minimum contributor level in the subscription.
- Deploy Azure VMware Solution using the information you gathered in the [planning](plan-private-cloud-deployment.md) tutorial.
- Ensure you have the correct network configured as described in the [Network planning checklist](tutorial-network-checklist.md).
- Have hosts provisioned and verify that the Microsoft.AVS [resource provider is registered](deploy-azure-vmware-solution.md#register-the-microsoftavs-resource-provider).

## Create a private cloud


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

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/tutorial-create-private-cloud.md)


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


## Next steps

In this tutorial, you learned how to:

> 
> * Create an Azure VMware Solution private cloud
> * Verify the private cloud deployed
> * Delete an Azure VMware Solution private cloud

Continue to the next tutorial to learn how to create a jump box. You use the jump box to connect to your environment to manage your private cloud locally.

> 
> [Access an Azure VMware Solution private cloud](tutorial-access-private-cloud.md)
