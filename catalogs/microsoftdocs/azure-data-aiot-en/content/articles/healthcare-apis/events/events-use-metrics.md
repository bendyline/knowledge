---
title: View Events Metrics in Azure Health Data Services
description: View events metrics in the Azure portal to monitor event subscriptions and Event Hubs in Azure Health Data Services. Learn how to track processed events and failures.
services: healthcare-apis
author: chachachachami
ms.service: azure-health-data-services
ms.topic: how-to
ms.date: 04/28/2026
ms.author: chrupa
ms.custom: sfi-image-nochange
ai-usage: ai-assisted
---

# View events metrics

In this article, you learn how to view events metrics in the Azure portal to monitor event subscriptions and Event Hubs. 

Events metrics provide a way to track the health and performance of your event subscriptions and Event Hubs by showing how many events are successfully processed, delivered, or failed over time.

To learn more about Azure Monitor and metrics, see [Azure Monitor Metrics overview](https://learn.microsoft.com/azure/azure-monitor/metrics/data-platform-metrics).

## Prerequisites

Before you can view events metrics, ensure you have the following:

- An Azure subscription. If you don't have one, you can create a free account at [https://azure.com/free](https://azure.com/free).
- An Azure Health Data Services workspace with with at least one event subscription configured to send events to an [Azure Event Hubs](events-deploy-portal.md) instance.

## View events metrics

1. Within your Azure Health Data Services workspace, select  **Events**. 

   Screenshot of the Events page in an Azure Health Data Services workspace.

1. The **Events** page displays the combined metrics for all events subscriptions. In this example, you have one subscription named **fhir-events** and one processed message. To view the metrics for that subscription, select the subscription in the lower left corner of the page.

   Screenshot of the Events page showing metrics for all event subscriptions.
    
1. On **Event Subscription**, the subscription named **fhir-events** has one processed message. To view the Event Hubs metrics, select the name of the Event Hubs (in this example, **azuredocsfhirservice**) from the lower right corner of the page.

   Screenshot of the Event Subscription page with the selected Event Hubs name.

1. On **Event Hubs Instance**, the Event Hubs received the incoming message presented in the previous Events Subscription metrics pages.

   Screenshot of displaying event hubs metrics.

## Next steps

> 
> [Enable diagnostic settings for events](events-enable-diagnostic-settings.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7. 
>
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
