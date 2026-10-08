---
title: Deploy events for Azure Health Data Services using the Azure portal
description: Learn how to use the Azure portal to deploy an event subscription to report events for Azure Health Data Services FHIR and DICOM services.
services: healthcare-apis
author: chachachachami
ms.service: azure-health-data-services
ms.subservice: events
ms.topic: quickstart
ms.date: 05/01/2026
ms.author: chrupa
ms.custom: sfi-image-nochange
ai-usage: ai-assisted
---

# Quickstart: Deploy events by using the Azure portal

In this quickstart, you learn how to deploy the events feature in the Azure portal to send FHIR&reg; and DICOM&reg; event messages.

## Prerequisites

Before you begin the steps to deploy the events feature, complete the following prerequisites.

* An active Azure account. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Microsoft Azure Event Hubs namespace and an event hub deployed in the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/event-hubs-create.md)
* [Workspace deployed in the Azure Health Data Services](../healthcare-apis-quickstart.md)  
* [FHIR service deployed in the workspace](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/fhir/fhir-portal-quickstart.md) or [DICOM service deployed in the workspace](../dicom/deploy-dicom-services-in-azure.md)

## Deploy events 

1. Browse to the workspace that contains the FHIR or DICOM service you want to send event messages from.  
1. Select **Events** on the left menu. Then select **+ Event Subscription** on the toolbar.
 
   Screenshot of workspace and select Events button.

1. **Name**: Enter a name for your event subscription.
1. **System Topic Name**: Enter a name for your system topic.

    > **Note:**
    > The first time you set up the events feature, enter a new **System Topic Name**. After the system topic for the workspace is created, use the **System Topic Name** for any additional event subscriptions that you create within the workspace.
    
1. **Event types**: Select the type of FHIR or DICOM events to send messages for, such as create, updated, and deleted.

   Screenshot of event types selection.


1. **Endpoint Type**: Select **Event Hub**.
1. **Endpoint**: Select **Configure an endpoint**. 
    1. Select the **Event Hub Namespace** and **Event Hub**.
    1. Select **Confirm selection**.

       Screenshot of event hub endpoint selection.

       > **Note:**
       > For this quickstart, use the default values for the **Event Schema** and the **Managed Identity Type** settings.

1. Select **Create**. 

   Screenshot of the create event subscription box.


Event messages aren't sent until the Event Grid System Topic deployment successfully completes. Upon successful creation of the Event Grid System Topic, the status of the workspace changes from **Updating** to **Succeeded**.

Screenshot of an events subscription being deployed.

Screenshot of an events subscription successfully deployed.

After the subscription is deployed, it needs access to your message delivery endpoint. 

Screenshot of a successfully deployed events subscription.

> **Tip:**
> For more information about providing access by using an Azure Managed identity, see [Assign a system-managed identity to an Event Grid system topic](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/enable-identity-system-topics.md) and [Event delivery with a managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/managed-service-identity.md). 
>
> For more information about managed identities, see [What are managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md).
>
> For more information about Azure role-based access control (Azure RBAC), see [What is Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md). 

## Next steps

In this quickstart, you learned how to deploy events by using the Azure portal. 

To learn how to enable the events metrics, see

> 
> [Use metrics](events-use-metrics.md)

To learn how to export Event Grid system diagnostic logs and metrics, see

> 
> [Enable diagnostic settings for events](events-enable-diagnostic-settings.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7. 
>
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
