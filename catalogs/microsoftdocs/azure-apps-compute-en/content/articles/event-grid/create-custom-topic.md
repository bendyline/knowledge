---
title: Create an Azure Event Grid topic or domain
description: Learn how to create a custom topic or a domain in Azure Event Grid by using the Azure portal so that you can publish and route your own events.
ms.date: 08/27/2026
ms.topic: how-to
ms.custom: mode-ui
ai-usage: ai-assisted
---

# Create a custom topic or a domain in Azure Event Grid

An Event Grid custom topic gives you a user-defined endpoint where you publish your own application events. A domain lets you manage many related topics as a single resource, which helps when you send events to many subscribers across a large organization.

This article shows you how to create a custom topic or a domain in Azure Event Grid by using the Azure portal.

## Prerequisites

If you're new to Azure Event Grid, read through [Event Grid overview](overview.md) before you start.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/event-grid/register-provider.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/create-custom-topic.md)

## Create a custom topic or domain

An Event Grid topic provides a user-defined endpoint that you post your events to.

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. In the search bar at the top, type **Event Grid Topics**, and then select **Event Grid Topics** from the drop-down list. To create a domain, search for **Event Grid Domains**.

    Screenshot showing the Azure portal search bar to search for Event Grid topics.
1. On the **Event Grid Topics** or **Event Grid Domains** page, select **+ Create** on the toolbar.

    Screenshot showing the Create Topic button on Event Grid topics page.

## Basics page

On the **Basics** page of the **Create Topic** or **Create Event Grid Domain** wizard, follow these steps:

1. Select your Azure **subscription**.
1. Select an existing resource group or select **Create new**, and enter a **name** for the **resource group**.
1. Enter a unique **name** for the custom topic or domain. The name must be unique because a Domain Name System (DNS) entry represents it. Don't use the name shown in the image. Instead, create your own name. It must be between 3 and 50 characters and contain only values a-z, A-Z, 0-9, and "-".
1. Select a **location** for the Event Grid topic or domain.
1. Select **Next: Networking** at the bottom of the page to switch to the **Networking** page.

    Screenshot showing the Basics page of the Create Topic wizard.

## Networking page

On the **Networking** page of the **Create Topic** or **Create Event Grid Domain** wizard, follow these steps:

1. If you want to allow clients to connect to the topic or domain endpoint via a public IP address, keep the **Public access** option selected. You can restrict access to specific IP addresses or an IP address range.

    Screenshot showing the selection of Public access option on the Networking page of the Create topic wizard.
1. To allow access to the topic or domain via a private endpoint, select the **Private access** option.

    Screenshot showing the selection of Private access option on the Networking page of the Create topic wizard.&#x20;
1. Follow the instructions in the [Add a private endpoint using Azure portal](configure-private-endpoints.md#use-azure-portal) section to create a private endpoint.
1. Select **Next: Security** at the bottom of the page to switch to the **Security** page.


## Security page

On the **Security** page of the **Create Topic**  or **Create Event Grid Domain** wizard, follow these steps:

1. To assign a system-assigned managed identity to your topic or domain, select **Enable system assigned identity**.

    Screenshot of the Identity page with system assigned identity option selected.
1. To assign a user-assigned identity, select **Add user assigned identity** in the **User assigned identity** section of the page.
1. In the **Select user assigned identity** window, select the subscription that has the user-assigned identity, select the **user-assigned identity**, and then select **Select**.

    Screenshot of the Identity page with user assigned identity option selected.
1. To disable local authentication, select **Disabled**. When you disable local authentication, the topic or domain accepts only Microsoft Entra authentication, not access key or SAS authentication.

    Screenshot showing the Advanced tab of Create Topic page when you can disable local authentication.
1. Configure the minimum required Transport Layer Security (TLS) version. For more information, see [Configure minimum TLS version](transport-layer-security-configure-minimum-version.md).

    Screenshot showing the Advanced tab of Create Topic page when you can select the minimum TLS version.
1. Select **Advanced** at the bottom of the page to switch to the **Advanced** page.

## Advanced page

1. On the **Advanced** page of the **Create Topic** or **Create Event Grid Domain** wizard, select the schema for events that you publish to this topic.

     Screenshot showing the selection of a schema on the Advanced page.
1. For **Data residency**, select whether to keep all data in the same region (**Regional**) or replicate the metadata to a predefined secondary region (**Cross-Geo**).

    Screenshot showing the Data residency section of the Advanced page in the Create Topic wizard.

    The **Cross-Geo** option allows Microsoft-initiated failover to the paired region when there's a region failure. For more information, see [Server-side geo disaster recovery in Azure Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/geo-disaster-recovery.md). Microsoft exercises Microsoft-initiated failover in rare situations to fail over Event Grid resources from an affected region to the corresponding geo-paired region. This process doesn't require your intervention. Microsoft reserves the right to determine when to take this path. The mechanism doesn't require your consent before it fails over your topic or domain. For more information, see [How do I recover from a failover?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/faq.yml)

    If you select the **Regional** option, you can define your own disaster recovery plan.
1. Select **Next: Tags** to move to the **Tags** page.

## Tags page

The **Tags** page has no fields specific to Event Grid. You can assign a tag (name-value pair) as you do for any other Azure resource. Select **Next: Review + create** to switch to the **Review + create** page.

## Review + create page

On the **Review + create** page, review all your settings, confirm the validation succeeded, and then select **Create** to create the topic or the domain.

Screenshot showing the Review + create page.


## Next steps

Now that you know how to create custom topics or domains, learn more about what Event Grid can help you do:

- [Route custom events to web endpoint with the Azure portal and Event Grid](custom-event-quickstart-portal.md)
- [About Event Grid](overview.md)
- [Event handlers](event-handlers.md)

To learn about publishing events to and consuming events from Event Grid by using different programming languages, see the following samples:

- [Azure Event Grid samples for .NET](https://learn.microsoft.com/samples/azure/azure-sdk-for-net/azure-event-grid-sdk-samples/)
- [Azure Event Grid samples for Java](https://learn.microsoft.com/samples/azure/azure-sdk-for-java/eventgrid-samples/)
- [Azure Event Grid samples for Python](https://learn.microsoft.com/samples/azure/azure-sdk-for-python/eventgrid-samples/)
- [Azure Event Grid samples for JavaScript](https://learn.microsoft.com/samples/azure/azure-sdk-for-js/eventgrid-javascript/)
- [Azure Event Grid samples for TypeScript](https://learn.microsoft.com/samples/azure/azure-sdk-for-js/eventgrid-typescript/)
