---
title: Set up Traffic Manager for Your Domain
description: Discover how to use Azure Traffic Manager with a custom domain to improve app performance and global availability.
keywords: Azure Traffic Manager, custom domain, load balancing, Azure App Service, traffic management
ms.assetid: 0f96c0e7-0901-489b-a95a-e3b66ca0a1c2
ms.topic: how-to
ms.date: 02/14/2025
author: msangapu-msft
ms.author: msangapu
ms.service: azure-app-service 
# As a systems administrator, I want to use Traffic Manager with a custom domain so that I can improve app performance and global availability. 
  
---
# Configure Traffic Manager for your Azure App Service domain

> 
> * [Buy a domain](manage-custom-dns-buy-domain.md)
> * [Map an external domain](app-service-web-tutorial-custom-domain.md)
> * [Map to a Traffic Manager profile](configure-domain-traffic-manager.md)
> 
> 




> **Important:**
> As of July 28, 2025, changes to App Service Managed Certificates (ASMC) impact how certificates are issued and renewed in certain scenarios. While most customers don’t need to take action, we recommend reviewing our [ASMC detailed blog post](https://go.microsoft.com/fwlink/?linkid=2328307) for more information.
>

When you use [Azure Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/index.yml) to load balance traffic to [Azure App Service](overview.md), the App Service app can be accessed using **\<traffic-manager-endpoint>.trafficmanager.net**. You can assign a custom domain name, such as www\.contoso.com, with your App Service app in order to provide a more recognizable domain name for your users.

This article shows you how to configure a custom domain name with an App Service app that's integrated with [Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-overview.md).

> **Note:**
> Only [CNAME](https://en.wikipedia.org/wiki/CNAME_record) records are supported when you configure a domain name using the Traffic Manager endpoint. Because A records are not supported, a root domain mapping, such as contoso.com is also not supported.
> 

## Prepare the app

To map a custom DNS name to an app that's integrated with Azure Traffic Manager, the web app's [App Service plan](https://azure.microsoft.com/pricing/details/app-service/) must be in **Standard** tier or higher. In this step, you make sure that the App Service app is in the supported pricing tier.

### Check the pricing tier

To check the pricing tier:

1. In the [Azure portal](https://portal.azure.com), search for and select **App Services**.

1. On the **App Services** page, select the name of your Azure app.

   Portal navigation to Azure app

1. In the left navigation of the app page, select **Scale up (App Service plan)**.

   Scale-up menu

1. The app's current tier is highlighted by a blue border. Check to make sure that the app is in **Standard** tier or above (any tier in the **Production** or **Isolated** category). If yes, close the **Scale up** page and skip to [Create the CNAME mapping](#create-the-cname-mapping).

    Check pricing tier

### Scale up the App Service plan

If you need to scale up your app:

1. Select any of the pricing tiers in the **Production** category. For additional options, click **See additional options**.

1. Click **Apply**.

## Create Traffic Manager endpoint

Following the steps at [Add or Delete Endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-manage-endpoints.md), add your App Service app as an endpoint in your Traffic Manager profile.

Once your App Service app is in a supported pricing tier, it shows up in the list of available App Service targets when you add the endpoint. If your app isn't listed, [verify the pricing tier of your app](#prepare-the-app).

## Create the CNAME mapping
> **Note:**
> To configure an [App Service domain that you purchased](manage-custom-dns-buy-domain.md), skip this section and go to [Enable custom domain](#enable-custom-domain).
> 


1. Sign in to the website of your domain provider.

    You can use Azure DNS to manage DNS records for your domain and configure a custom DNS name for Azure App Service. For more information, see [Tutorial: Host your domain in Azure DNS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-delegate-domain-azure-dns.md).

1. Find the page for managing DNS records.

    Every domain provider has its own DNS records interface, so consult the provider's documentation. Look for areas of the site labeled **Domain Name**, **DNS**, or **Name Server Management**.
    
    Often, you can find the DNS records page by viewing your account information and then looking for a link like **My domains**. Go to that page, and then look for a link that's named something like **Zone file**, **DNS Records**, or **Advanced configuration**.

   The following screenshot is an example of a DNS records page:

   Screenshot that shows an example DNS records page.

1. To create a record, select **Add** or select the appropriate widget.

> **Note:**
> For certain providers, such as GoDaddy, changes to DNS records don't become effective until you select a separate **Save Changes** link.


While the specifics of each domain provider vary, you map *from* a [non-root custom domain name](#what-about-root-domains) (such as **www.contoso.com**) *to* the Traffic Manager domain name (**contoso.trafficmanager.net**) that's integrated with your app. 

> **Note:**
> If a record is already in use and you need to preemptively bind your apps to it, you can create an additional CNAME record. For example, to preemptively bind **www\.contoso.com** to your app, create a CNAME record from **awverify.www** to **contoso.trafficmanager.net**. You can then add "www\.contoso.com" to your app without the need to change the "www" CNAME record. For more information, see [Migrate an active DNS name to Azure App Service](manage-custom-dns-migrate-domain.md).

Once you have finished adding or modifying DNS records at your domain provider, save the changes.

### What about root domains?

Since Traffic Manager only supports custom domain mapping with CNAME records, and because DNS standards don't support CNAME records for mapping root domains (for example, **contoso.com**), Traffic Manager doesn't support mapping to root domains. To work around this issue, use a URL redirect from at the app level. In ASP.NET Core, for example, you can use [URL Rewriting](https://learn.microsoft.com/aspnet/core/fundamentals/url-rewriting). Then, use Traffic Manager to load balance the subdomain (**www.contoso.com**). Another approach is you can [create an alias record for your domain name apex to reference an Azure Traffic Manager profile](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/tutorial-alias-tm.md). An example is contoso.com. Instead of using a redirecting service, you can configure Azure DNS to reference a Traffic Manager profile directly from your zone. 

For high availability scenarios, you can implement a load-balancing DNS setup without Traffic Manager by creating multiple *A records* that point from the root domain to each app copy's IP address. Then, [map the same root domain to all the app copies](app-service-web-tutorial-custom-domain.md#create-the-dns-records). Since the same domain name cannot be mapped to two different apps in the same region, this setup only works when your app copies are in different regions.

## Enable custom domain
After the records for your domain name have propagated, use the browser to verify that your custom domain name resolves to your App Service app.

> **Note:**
> It can take some time for your CNAME to propagate through the DNS system. You can use a service such as <a href="https://www.digwebinterface.com/">https://www.digwebinterface.com/</a> to verify that the CNAME is available.
> 
> 

1. Once domain resolution succeeds, to back to your app page in the [Azure portal](https://portal.azure.com)
2. From the left navigation, select **Custom domains** > **Add hostname**.
4. Type the custom domain name that you mapped earlier and select **Validate**.
5. Make sure that **Hostname record type** is set to **CNAME (www\.example.com or any subdomain)**.

6. Since the App Service app is now integrated with a Traffic Manager endpoint, you should see the Traffic Manager domain name under **CNAME configuration**. Select it and click **Add custom domain**.

    Add DNS name to the app

## Next step

> 
> [Secure a custom DNS name with an TLS/SSL binding in Azure App Service](configure-ssl-bindings.md)
