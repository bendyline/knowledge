---
title: Quickstart - Create an Azure Content Delivery Network profile and endpoint
titleSuffix: Azure Content Delivery Network
description: This quickstart shows how to enable Azure Content Delivery Network by creating a new content delivery network profile and content delivery network endpoint.
author: halkazwini
ms.author: halkazwini
ms.assetid: 4ca51224-5423-419b-98cf-89860ef516d2
ms.service: azure-content-delivery-network
ms.topic: quickstart
ms.date: 02/28/2026
ROBOTS: NOINDEX
# Customer intent: As a website administrator, I want to create a content delivery network profile and endpoint, so that I can efficiently deliver content to my users and improve load times for my web applications.
---

# Quickstart: Create an Azure Content Delivery Network profile and endpoint


> **Important:**
> Azure CDN Standard from Microsoft (classic) retires on **September 30, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](https://learn.microsoft.com/azure/cdn/migrate-tier). For more information, see ⁠[**Azure CDN Standard from Microsoft (classic) retirement**](https://azure.microsoft.com/updates?id=Azure-CDN-Standard-from-Microsoft-classic-will-be-retired-on-30-September-2027).

In this quickstart, you enable Azure Content Delivery Network by creating a new content delivery network profile, which is a collection of one or more content delivery network endpoints. After you've created a profile and an endpoint, you can start delivering content to your customers.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Storage account named *cdnstorageacct123*, which you use for the origin hostname. To complete this requirement, see [Integrate an Azure Storage account with Azure Content Delivery Network](cdn-create-a-storage-account-with-cdn.md).

## Sign in to the Azure portal

Sign in to the [Azure portal](https://portal.azure.com) with your Azure account.


## Create a new CDN profile

A CDN profile is a container for CDN endpoints and specifies a pricing tier.

1. In the Azure portal, select **Create a resource** (on the upper left). The **Create a resource** portal appears.
   
1. Search for and select **Front Door and CDN profiles**, then select **Create**:
    
    Create CDN resource.

    The **Compare offerings** pane appears.

1. Select **Explore other offerings** then select **Azure CDN Standard from Microsoft (classic)**. Select **Continue**.

    Select CDN Resource. Select Explore Other Options and Azure CDN Standard from Microsoft(Classic.).

1. In the **Basics** tab, enter the following values:
   
    | Setting | Value |
    | --- | --- |
    | **Subscription** | Select an Azure subscription from the drop-down list. |
    | **Resource group** | Select **Create new** and enter *CDNQuickstart-rg* for your resource group name, or select **Use existing** and choose *CDNQuickstart-rg* if you have the group already. |
    | **Resource group region** | If a new resource group is created, select a location near you from the drop-down list. |
    | **Name** | Enter your profile name, for example, *cdn-profile-123*. |
    | **Region** | Leave as default. |
    | **Pricing tier** | Select an Azure CDN option from the drop-down list. (Deployment time for the Microsoft tier takes about 10 minutes and the Verizon tiers take about 30 minutes.) |
    | **Create a new CDN endpoint now** | Leave unselected. |
   
    Input variables in Basics tab.

1. Select **Review + Create** then **Create** to create the profile.


<a name='create-a-new-cdn-endpoint'></a>

## Create a new content delivery network endpoint

After you've created a content delivery network profile, you use it to create an endpoint.

1. In the Azure portal, select in your dashboard the content delivery network profile that you created. If you can't find it, you can either open the resource group in which you created it, or use the search bar at the top of the portal, enter the profile name, and select the profile from the results.

1. On the content delivery network profile page, select **+ Endpoint**.

    The **Add an endpoint** pane appears.

3. Enter the following setting values:

    | Setting | Value |
    | --- | --- |
    | **Name** | Enter *cdn-endpoint-123* for your endpoint hostname. This name must be globally unique across Azure; if it's already in use, enter a different name. This name is used to access your cached resources at the domain *&lt;endpoint-name&gt;*.azureedge.net. |
    | **Origin type** | Select **Storage**. |
    | **Origin hostname** | Select the host name of the Azure Storage account you're using from the dropdown list, such as *cdnstorageacct123.blob.core.windows.net*. |
    | **Origin path** | Leave blank. |
    | **Origin host header** | Leave the default value (which is the Origin hostname). |
    | **Protocol** | Leave the default **HTTP** and **HTTPS** options selected. |
    | **Origin port** | Leave the default port values. |
    | **Optimized for** | Leave the default selection, **General web delivery**. |

3. Select **Add** to create the new endpoint. After the endpoint is created, it appears in the list of endpoints for the profile.

    View added endpoint.

    It can take up to ten minutes for the endpoint to propagate and be ready to serve content.

## Clean up resources

In the preceding steps, you created a content delivery network profile and an endpoint in a resource group. Save these resources if you want to go to [Next steps](#next-steps) and learn how to add a custom domain to your endpoint. However, if you don't expect to use these resources in the future, you can delete them by deleting the resource group, thus avoiding additional charges:

1. From the left-hand menu in the Azure portal, select **Resource groups** and then select **CDNQuickstart-rg**.

2. On the **Resource group** page, select **Delete resource group**, enter *CDNQuickstart-rg* in the text box, then select **Delete**. This action deletes the resource group, profile, and endpoint that you created in this quickstart.

## Next steps

> 
> [Tutorial: Use content delivery network to serve static content from a web app](cdn-add-to-web-app.md)
