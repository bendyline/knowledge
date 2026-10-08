---
title: Tutorial to prepare Azure portal, datacenter environment to deploy Azure Stack Edge Mini R device | Microsoft Docs
description: The first tutorial about deploying Azure Stack Edge Mini R device involves preparing the Azure portal.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.custom: devx-track-azurecli
ms.topic: tutorial
ms.date: 02/23/2022
ms.author: sipastak
# Customer intent: As an IT admin, I need to understand how to prepare the portal to deploy Azure Stack Edge Mini R device so I can use it to transfer data to Azure.
---

# Tutorial: Prepare to deploy Azure Stack Edge Mini R

This tutorial is the first in the series of deployment tutorials that are required to completely deploy an Azure Stack Edge Mini R device. This tutorial describes how to prepare the Azure portal to deploy an Azure Stack Edge resource.

You need administrator privileges to complete the setup and configuration process. The portal preparation takes less than 10 minutes.

In this tutorial, you learn how to:

> 
> * Create a new resource
> * Get the activation key

### Get started

To deploy Azure Stack Edge Mini R, refer to the following tutorials in the prescribed sequence.

| Step | Description |
| --- | --- |
| **Preparation** | These steps must be completed in preparation for the upcoming deployment. |
| **[Deployment configuration checklist](#deployment-configuration-checklist)** | Use this checklist to gather and record information before and during the deployment. |
| **[Deployment prerequisites](#prerequisites)** | These prerequisites validate that the environment is ready for deployment. |
|  |  |
| **Deployment tutorials** | These tutorials are required to deploy your Azure Stack Edge Mini R device in production. |
| **[1. Prepare the Azure portal for device](azure-stack-edge-mini-r-deploy-prep.md)** | Create and configure your Azure Stack Edge resource before you install the physical device. |
| **[2. Install the device](azure-stack-edge-mini-r-deploy-install.md)** | Inspect and cable your physical device. |
| **[3. Connect to the device](azure-stack-edge-mini-r-deploy-connect.md)** | Once the device is installed, connect to device local web UI. |
| **[4. Configure network settings](azure-stack-edge-mini-r-deploy-configure-network-compute-web-proxy.md)** | Configure network including the compute network and web proxy settings for your device. |
| **[5. Configure device settings](azure-stack-edge-mini-r-deploy-set-up-device-update-time.md)** | Assign a device name and DNS domain, configure update server and device time. |
| **[6. Configure security settings](azure-stack-edge-mini-r-deploy-configure-certificates-vpn-encryption.md)** | Configure certificates using your own certificates, set up VPN, and configure encryption-at-rest for your device. |
| **[7. Activate the device](azure-stack-edge-mini-r-deploy-activate.md)** | Use the activation key from service to activate the device. The device is ready to set up SMB or NFS shares or connect via REST. |
| **[8. Configure compute](azure-stack-edge-gpu-deploy-configure-compute.md)** | Configure the compute role on your device. A Kubernetes cluster is also created. |

You can now begin to set up the Azure portal.

## Deployment configuration checklist

Before you deploy your device, you need to collect information to configure the software on your Azure Stack Edge Mini R device. Preparing some of this information ahead of time helps streamline the process of deploying the device in your environment. Use the [Azure Stack Edge Mini R deployment configuration checklist](azure-stack-edge-mini-r-deploy-checklist.md) to note down the configuration details as you deploy your device.

## Prerequisites

Following are the configuration prerequisites for your Azure Stack Edge resource, your Azure Stack Edge device, and the datacenter network.

### For the Azure Stack Edge resource


Before you begin, make sure that:

* Your Microsoft Azure subscription is enabled for an Azure Stack Edge resource. Make sure that you used a supported subscription such as [Microsoft Enterprise Agreement (EA)](https://azure.microsoft.com/overview/sales-number/), [Cloud Solution Provider (CSP)](https://learn.microsoft.com/partner-center/azure-plan-lp), or [Microsoft Azure Sponsorship](https://azure.microsoft.com/offers/ms-azr-0036p/).
* You have owner or contributor access at resource group level for the Azure Stack Edge, IoT Hub, and Azure Storage resources.

* To create an order in the Azure Edge Hardware Center, you need to make sure that the Microsoft.EdgeOrder provider is registered. For information on how to register, go to [Register resource provider](azure-stack-edge-gpu-manage-access-power-connectivity-mode.md#register-resource-providers).   
* To create any Azure Stack Edge resource, you should have permissions as a contributor (or higher) scoped at resource group level. You also need to make sure that the `Microsoft.DataBoxEdge` provider is registered. For information on how to register, go to [Register resource provider](azure-stack-edge-gpu-manage-access-power-connectivity-mode.md#register-resource-providers).
  * To create any IoT Hub resource, make sure that Microsoft.Devices provider is registered. For information on how to register, go to [Register resource provider](azure-stack-edge-gpu-manage-access-power-connectivity-mode.md#register-resource-providers).
  * To create a Storage account resource, again you need contributor or higher access scoped at the resource group level. Azure Storage is by default a registered resource provider.
* You have admin or user access to Microsoft Entra ID Graph API. For more information, see [Azure Active Directory Graph API](https://learn.microsoft.com/previous-versions/azure/ad/graph/howto/azure-ad-graph-api-permission-scopes#default-access-for-administrators-users-and-guest-users-).
* You have your Microsoft Azure storage account with access credentials.


### For the Azure Stack Edge device

Before you deploy a physical device, make sure that:

- You've [run the Azure Stack Network Readiness Checker tool](azure-stack-edge-deploy-check-network-readiness.md) to check network readiness for your Azure Stack Edge device. You can use the tool to check whether your firewall rules are blocking access to any essential URLs for the service and verify custom URLs, among other tests. For more information, see [Check network readiness for your Azure Stack Edge device](azure-stack-edge-deploy-check-network-readiness.md).

- You've reviewed the safety information for this device at [Safety guidelines for your Azure Stack Edge device](azure-stack-edge-mini-r-safety.md).

- You have received the physical device. 
- You have access to a flat, stable, and level work surface where the device can rest safely. 
- The site where you intend to set up the device has standard AC power from an independent source or a rack power distribution unit (PDU). 

### For the datacenter network

Before you begin, make sure that:

- The network in your datacenter is configured per the networking requirements for your Azure Stack Edge device. For more information, see [Azure Stack Edge Mini R system requirements](azure-stack-edge-mini-r-system-requirements.md).

- For normal operating conditions of your Azure Stack Edge, you have:

    - A minimum of 10-Mbps download bandwidth to ensure the device stays updated.
    - A minimum of 20-Mbps dedicated upload and download bandwidth to transfer files.

## Create a new resource

If you have an existing Azure Stack Edge resource to manage your physical device, skip this step and go to [Get the activation key](#get-the-activation-key).

### [Azure Edge Hardware Center (Preview)](#tab/azure-edge-hardware-center)

Azure Edge Hardware Center (Preview) lets you explore and order a variety of hardware from the Azure hybrid portfolio including Azure Stack Edge Pro devices.

When you place an order through the Azure Edge Hardware Center, you can order multiple devices, to be shipped to more than one address, and you can reuse ship to addresses from other orders.

Ordering through Azure Edge Hardware Center will create an Azure resource that will contain all your order-related information. One resource each will be created for each of the units ordered. You will have to create an Azure Stack Edge resource after you receive the device to activate and manage it.


To place an order through the Azure Edge Hardware Center, do these steps:

1. Use your Microsoft Azure credentials to sign in to the Azure portal at this URL: [https://portal.azure.com](https://portal.azure.com).

2. Select **+ Create a resource**. Search for and select **Azure Edge Hardware Center**. In the Azure Edge Hardware Center, select **Create**.

    Screenshot of the Azure Stack Edge Hardware Center home page. The Create button is highlighted.

3. Select a subscription, and then select **Next**.

    Screenshot of the "Select a subscription" option for an Azure Edge Hardware Center order. The Subscription option and Next button are highlighted.

4. To start your order, select **Order** beside the product family that you want to order - for example, **Azure Stack Edge**. If you don't see the product family, you may need to use a different subscription; select **Try selecting a different subscription**. 

    Screenshot for selecting a product family from which to order in Azure Edge Hardware Center. The Order button by a product family is highlighted. 

5. Select the shipping destination for your order.

    Screenshot for selecting a shipping destination for your Azure Edge Hardware Center order. The shipping destination option and Next button are highlighted.

6. On the **Select Hardware** page, use the **Select** button to select the hardware product to order. For example, here **Azure Stack Edge Pro - GPU** was selected. 

    Screenshot for selecting a hardware product for an Azure Edge Hardware Center order. The Select button for a product is highlighted.

    After you select a hardware product, you'll select the device configuration to order. For example, if you chose Azure Stack Edge Pro - GPU, you can choose from Azure Stack Edge Pro - 1 GPU and Azure Stack Edge Pro - 2 GPU models.

    If you are placing a first-time order for Azure Stack Edge, select **Sign-up** and fill out the web form as part of the Azure Edge Hardware Center ordering experience.

    The web form collects the following details about your deployment:
   - Total deployment scale 
   - Cluster size 
   - Hardware requirements 
   - Geographic presence 

   Microsoft will evaluate the deployment details you provide and may contact you by email for more information. We have certain requirements in place for new customers to ensure that Azure Stack Edge is the right fit for the use case; not all requests will be fulfilled. If you have questions, you can send email to [AzureStack1Pinquiry@microsoft.com](mailto:AzureStack1Pinquiry@microsoft.com).

   Screenshot of web form for first-time customer Azure Stack Edge hardware orders. The Sign-up button for a product is highlighted.

7. Select the device configuration, and then choose **Select**. The available configurations depend on the hardware you selected. The screen below shows available configurations for Azure Stack Edge Pro - GPU devices.

    If you're ordering Azure Stack Edge Mini R devices, which all have the same configuration, you won't see this screen. 

    Screenshot for selecting a hardware configuration for a hardware product in an Azure Edge Hardware Center order. Hardware product and configuration options are highlighted.

    The **Create order** wizard opens.

8.  On the **Basics** tab, provide an **Order name**, **Resource group**, and **Region**. Then select **Next: Shipping + quantity >**.

    Screenshot of the Basics tab for entering an order name, resource group, and region for an Azure Edge Hardware Center order
  
    Next, you'll add each ship to address you want to send devices to and then specify how many devices to send to each address. You can order up to 20 units (devices) per order.

9. On the **Shipping + quantity** tab, add each ship to address to send devices to: 

    - To add a new ship to address, select **Add a new address**. 

       A required **Address alias** field on the **New address** screen identifies the address for later use. Select **Add** when you finish filling in the address fields. Then use **Select address(es)** to add the address to your order.

       Screenshot of New address screen for Azure Edge Hardware Center order. Address alias option and Add button are highlighted.

    - To use a ship to address from a previous order, or to use an address that you just added, choose **Select address(es)**. Then, on the **Select address(es)** screen, select one or more addresses, and choose **Select**.

       Screenshot of Select Addresses screen for Azure Edge Hardware Center order. "Select addresses" option, two selected addresses, and Select button are highlighted.

    The **Shipping + quantity** tab now has a separate item for each ship to address.

    Each order item name includes a name prefix (the order name followed by the address alias), with an item number for each device that is shipped to that address.

    Illustration of Shipping Plus Quantity tab for Azure Edge Hardware Center order with 2 addresses. The parts of an order item name are identified.

10. For each address, enter the **Quantity** of devices to ship on the **Shipping + quantity** tab.

    When you enter a quantity of more than one, a **+n more** label appears after the order item name.

     Screenshot showing the Shipping + quantity tab with a Quantity of more than one for an address

11. If you want to change the names of order items, select and click the order item name to open the **Rename order item** pane. If you're shipping more than one item to an address, select **+n more**.

    You can make two types of name change:
 
    * To use a different name prefix for all of the order items, edit the **Name prefix** and then select **Apply**, as shown on the following screen.

    * You can also edit the name of each order item individually. 

    When you finish, select **Done**.

    Screenshot showing how to rename order items for an Azure Edge Hardware Center order

    Select **Next: Notifications >** to continue.

12. If you want to receive status notifications as your order progresses, enter the email address for each recipient on the **Notifications** tab. 

    To add an email address, enter the address, and select **Add**. You can add up to 20 email addresses.

    Screenshot of Notifications tab for Azure Edge Hardware Center order. Notifications tab, Add button, and Review Plus Create button are highlighted.

    When you finish, select **Review + create** to continue.

13. On the **Review + create** tab:

    1. Review your order. The order is automatically validated when you open this screen. If you see a **Validation failed** banner, you'll have to fix the issues before you create the order.
    
    1. Review the **Privacy terms**, and select the check box to agree to them.
 
    1. Select **Create**.

    Screenshot of the Review + create tab for an Azure Edge Hardware Center order

    During deployment, the order opens in the portal, with the status of each order item displayed. After deployment completes, you may need to click the Down arrow by **Deployment details** to see the status of individual items.

    Screenshot showing Deployment Details while an Azure Edge Hardware Center order is deployed. Resource details are highlighted.

14. To view details for an order item, shown below, select the item in the **Resource** column of the deployment details.

    Screenshot showing resource details for a selected resource in an Azure Edge Hardware Center order. Resource name is highlighted.

15. After a device ships (**Shipped** tag is green), a **Configure hardware** option is added to the item details. Select that option to create a management resource for the device in Azure Stack Edge.    

    Screenshot showing the Configure hardware option for an order item shipped from the Azure Edge Hardware Center.

    The subscription, resource group, and deployment area are filled in from the order, but you can change them.

    Screenshot of the Create management resource screen for a shipped order item in an Azure Edge Hardware Center order.

    After you activate the device, you'll be able to open the management resource from the item, and open the order item from the management resource.


#### Create a management resource for each device

To manage devices that are ordered through the Azure Edge Hardware Center, you'll create a management resource for each device in Azure Stack Edge. When the device is activated, the management resource is associated with an order item. You'll be able to open the order item from the management resource and open the management resource from the order item. 

After a device is delivered, a **Configure hardware** link is added to the order item detail, giving you a direct way to open a wizard for creating a management resource. You can also use the **Create management resource** option in Azure Stack Edge.


To create a management resource for a device ordered through the Azure Edge Hardware Center, do these steps:

1. Use your Microsoft Azure credentials to sign in to the Azure portal at this URL: [https://portal.azure.com](https://portal.azure.com).

1. There are two ways to get started creating a new management resource:

    - Through the Azure Edge Hardware Center: Search for and select **Azure Edge Hardware Center**. In the Hardware Center, display **All order items**. Select the item **Name**. In the item **Overview**, select **Configure hardware**.

       The **Configure hardware** option appears after a device is shipped.

       Illustration showing 4 steps to start management resource creation from an order item in the Azure Edge Hardware Center.

    - In Azure Stack Edge: Search for and select **Azure Stack Edge**. Select **+ Create**. Then select **Create management resource**.

       Illustration showing 3 steps to start management resource creation in Azure Stack Edge.

    The **Create management resource** wizard opens.

1. On the **Basics** tab, enter the following settings:

    | Setting | Value |
    | --- | --- |
    | **Select a subscription**<sup>1</sup> | Select the subscription to use for the management resource. |
    | **Resource group**<sup>1</sup> | Select the resource group to use for the management resource. |
    | **Name** | Provide a name for the management resource. |
    | **Deploy Azure resource in** | Select the country or region where the metadata for the management resource will reside. The metadata can be stored in a different location than the physical device. |

    <sup>1</sup> An organization may use different subscriptions and resource groups to order devices than they use to manage them.

    Screenshot of the Basics tab for Create Management Resource. The Basics tab, options, and Review Plus Create button are highlighted.

    Select **Review + create** to continue.

1. On the **Review + create** tab, review basic settings for the management resource and the terms of use. Then select **Create**.

    If you started this procedure by clicking **Configure hardware** for a delivered item in an Azure Edge Hardware Center order, the device, order resource name, and order status are listed at the top of the screen.

      Screenshot of Review Plus Create tab when an Azure Stack Edge management resource is created for an order item in Azure Edge Hardware Center. Device order info is highlighted.

    The **Create** button isn't available until all validation checks have passed.

1. When the process completes, the **Overview** pane for new resource opens.

    Screenshot showing a completed management resource in Azure Stack Edge.


### [Azure CLI](#tab/azure-cli)

If necessary, prepare your environment for Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-mini-r-deploy-prep.md)

To create an Azure Stack Edge resource, run the following commands in Azure CLI.

1. Create a resource group by using the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command, or use an existing resource group:

   ```azurecli
   az group create --name myasepgpu1 --location eastus
   ```

1. To create a device, use the [az databoxedge device create](https://learn.microsoft.com/cli/azure/databoxedge/device#az-databoxedge-device-create) command:

   ```azurecli
   az databoxedge device create --resource-group myasepgpu1 \
      --device-name myasegpu1 --location eastus --sku EdgeMR_Mini
   ```

   Choose a location closest to the geographical region where you want to deploy your device. The region stores only the metadata for device management. The actual data can be stored in any storage account.

   For a list of all the regions where the Azure Stack Edge resource is available, see [Azure products available by region](https://azure.microsoft.com/global-infrastructure/services/?products=databox&regions=all). If using Azure Government, all the government regions are available as shown in the [Azure regions](https://azure.microsoft.com/global-infrastructure/regions/).

1. To create an order, run the [az databoxedge order create](https://learn.microsoft.com/cli/azure/databoxedge/order#az-databoxedge-order-create) command:

   ```azurecli
   az databoxedge order create --resource-group myasepgpu1 \
      --device-name myasegpu1 --company-name "Contoso" \
      --address-line1 "1020 Enterprise Way" --city "Sunnyvale" \
      --state "California" --country "United States" --postal-code 94089 \
      --contact-person "Gus Poland" --email-list gus@contoso.com --phone 4085555555
   ```

The resource creation takes a few minutes. Run the [az databoxedge order show](https://learn.microsoft.com/cli/azure/databoxedge/order#az-databoxedge-order-show) command to see the order:

```azurecli
az databoxedge order show --resource-group myasepgpu1 --device-name myasegpu1 
```

After you place an order, Microsoft reviews the order and contacts you by email with shipping details.

---

## Get the activation key

After the Azure Stack Edge resource is up and running, you'll need to get the activation key. This key is used to activate and connect your Azure Stack Edge Mini R device with the resource. You can get this key now while you are in the Azure portal.

1. Select the resource you created, and select **Overview**.

   Screenshot of the Overview pane for an Azure Stack Edge resource.

2. On the **Activate** tile, provide a name for the Azure Key Vault, or accept the default name. The key vault name can be between 3 and 24 characters. 

    A key vault is created for each Azure Stack Edge resource that is activated with your device. The key vault lets you store and access secrets. For example, the Channel Integrity Key (CIK) for the service is stored in the key vault.

    Once you've specified a key vault name, select **Generate activation key** to create an activation key.

    [Screenshot of Overview pane for newly created Azure Stack Edge resource, with a key vault name entry. The entry and the Generate Activation Key button are highlighted.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/media/azure-stack-edge-mini-r-deploy-prep/azure-stack-edge-resource-3.png#lightbox)

    Wait a few minutes while the key vault and activation key are created. Select the copy icon to copy the key and save it for later use.

> **Important:**
> - The activation key expires three days after it is generated.
> - If the key has expired, generate a new key. The older key is not valid.

## Next steps

In this tutorial, you learned about Azure Stack Edge topics such as:

> 
> * Create a new resource
> * Get the activation key

Advance to the next tutorial to learn how to install Azure Stack Edge.

> 
> [Install Azure Stack Edge](azure-stack-edge-mini-r-deploy-install.md)
