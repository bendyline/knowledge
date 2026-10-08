---
title: Azure Native New Relic Service overview
description: Learn about using New Relic in Azure Marketplace.
author: shijojoy
ms.author: shijoy
ms.topic: overview
ms.date: 01/10/2025
---

# What is Azure Native New Relic Service?


Use Azure Native Integrations to easily provision, manage, and tightly integrate software and services from software development companies on Azure.

Microsoft and New Relic developed this service and manage it together.

You can find New Relic in the [Azure portal](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/NewRelic.Observability%2Fmonitors) or get it on [Azure Marketplace](https://marketplace.microsoft.com/product/newrelicinc1635200720692.newrelic_liftr_payg_2025?tab=Overview).

New Relic is a full-stack observability platform that enables a single source of truth for application performance, infrastructure monitoring, log management, error tracking, and real-user monitoring. Combined with the Azure platform, use Azure Native New Relic Service to help monitor, troubleshoot, and optimize Azure services and applications.

Azure Native New Relic Service in Marketplace enables you to create and manage New Relic accounts by using the Azure portal with a fully integrated experience. Integration with Azure enables you to use New Relic as a monitoring solution for your Azure workloads through a streamlined workflow, starting from procurement and moving all the way to configuration and management.

You can create and manage the New Relic resources by using the Azure portal through a resource provider named `NewRelic.Observability`. New Relic owns and runs the software as a service (SaaS) application, including the New Relic organizations and accounts that are created through this experience.

> **Important:**
> For New Relic accounts you create by using Azure Native New Relic Service, customer data is stored and processed in the region where the service was deployed. Currently, Azure Native New Relic Service doesn't support Sovereign Cloud.
>
> For accounts that you create directly by using the New Relic portal and use for linking, New Relic determines where the customer data is stored and processed. Depending on the configuration at the time of setup, this data might be on or outside Azure.

## Capabilities

Azure Native New Relic Service provides the following capabilities:

- Easily onboard and use New Relic as a natively integrated service on Azure.
- Get a single bill for all the resources that you consume on Azure, including New Relic.
- Automatically monitor metrics, subscription activity and resource logs. For more information, see [Monitor & Observe Azure resources with Azure Native Integrations](../metrics-logs.md).
- Use a single experience to install and uninstall the New Relic agent on virtual machines and app services.

### Billing

When you use the integrated New Relic experience in the Azure portal by using Azure Native New Relic Service, the service creates and maps the following entities for monitoring and billing purposes.

Conceptual diagram that shows the relationship between Azure and New Relic.

- **New Relic resource in Azure**: By using the New Relic resource, you can manage the New Relic account on Azure. The resource is created in the Azure subscription and resource group that you select during the creation process or linking process.
- **New Relic organization**: The New Relic organization on New Relic software as a service (SaaS) is used for user management and billing.
- **New Relic account**: The New Relic account on New Relic SaaS is used to store and process telemetry data.
- **Azure Marketplace SaaS resource**: When you set up a new account and organization on New Relic by using Azure Native New Relic Service, the SaaS resource is created automatically, based on the plan that you select from the Azure New Relic offer in Azure Marketplace. This resource is used for billing.

> **Note:**
> Azure Marketplace SaaS resource is set up only if you created the New Relic organization by using Azure Native New Relic Service. If you created your New Relic organization directly from the New Relic portal, Azure Marketplace SaaS resource doesn't exist, and New Relic manages your billing.

## Subscribe to New Relic


You can subscribe to the service through the Azure Marketplace [online store](https://learn.microsoft.com/marketplace/marketplace-overview#azure-marketplace-online-store) or through the [Azure portal](https://learn.microsoft.com/azure/azure-portal/azure-portal-overview). Search for it by name:
 *Azure Native New Relic Service: New Relic Azure*.


### Subscribe from the Azure portal

Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, on the service menu's global search bar, search for **marketplace**. In the **Services** results, select **Marketplace**.

    The Azure Marketplace **Get Started** pane appears.

1. On the command bar, enter the name of the service in the **Search the Marketplace** search box.

1. In the search results, choose the provider.

1. Choose your preferred plan, and then select **Subscribe**.

The pane for creating a resource appears.


## New Relic links

For more help, see the New Relic documentation.

- For more information on the New Relic and Azure partnership, see [New Relic & Azure Partnership](https://newrelic.com/press-release/2022051803).
- For more help with using Azure Native New Relic Service, see the [New Relic documentation](https://docs.newrelic.com/docs/infrastructure/microsoft-azure-integrations/get-started/azure-native).
- To find New Relic in Azure, go to the [pay-as-you-go listing in Azure Marketplace](https://ms.portal.azure.com/#browse/NewRelic.Observability%2Fmonitors).

## Next steps

- [Quickstart: Get started with Azure Native New Relic Service](create.md)
