---
title: Quickstart - Create Your Azure API Center - Portal
description: Learn how to use the Azure portal to set up an API center for API discovery, reuse, and governance. 

ms.service: azure-api-center
ms.topic: quickstart
ms.date: 10/13/2025
 
---

# Quickstart: Create your API center - Azure portal


Create your [API center](overview.md) to start an inventory of your organization's APIs. Azure API Center enables tracking APIs in a centralized location for discovery, reuse, and governance.

After creating your API center, follow the steps in the tutorials to add custom metadata, APIs, versions, definitions, and other information.


## Prerequisites

* If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* At least a Contributor role assignment or equivalent permissions in the Azure subscription. 

## Register the Microsoft.ApiCenter provider

If you haven't already, you need to register the **Microsoft.ApiCenter** resource provider in your subscription. You only need to register the resource provider once. 

To register the resource provider using the portal:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the search bar, enter and select *Subscriptions*.

1. Select the subscription where you want to create the API center.

1. In the sidebar menu, under **Settings**, select **Resource providers**.

1. Search for **Microsoft.ApiCenter** in the list of resource providers. If it isn't registered, select **Register**.

## Create an API center

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the search bar, enter and select *API Centers*. 

1. Select **+ Create**. 

1. On the **Basics** tab, select or enter the following settings: 

    1. Select your Azure subscription. 

    1. Select an existing resource group, or select **Create new** to create a new one. 

    1. Enter a **Name** for your API center. It must be unique in the region where you're creating your API center. 

    1. In **Region**, select one of the [available regions](overview.md#available-regions) for Azure API Center, for example, *West Europe*. 

    1. In **Pricing plan**, select the pricing plan that meets your needs. 

1. Optionally, on the **Tags** tab, add one or more name/value pairs to help you categorize your Azure resources.

1. Select **Review + create**. 

1. After validation completes, select **Create**.

After deployment, your API center is ready to use!


## Next step

Now you can start adding information to the inventory in your API center. To help you organize your APIs and other information, begin by defining custom metadata in your API center.

> 
> [Define custom metadata](tutorials/add-metadata-properties.md)
