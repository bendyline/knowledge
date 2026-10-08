---
title: Troubleshoot events - Azure Health Data Services
description: Learn how to troubleshoot events in Azure Health Data Services, identify common issues, and restore event flow quickly. Get started with these resources.
services: healthcare-apis
author: chachachachami
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: troubleshooting
ms.date: 04/27/2026
ms.author: chrupa
---
# Troubleshoot events

Use this article to troubleshoot events and find resources to diagnose and resolve delivery, metrics, and diagnostics issues.

> **Important:**
> Turn on the Events feature to write FHIR&reg; resource and DICOM&reg; image change data and send event messages. The event feature doesn't send messages on past FHIR resource or DICOM image changes, or when the feature is turned off.

Diagram of data flow from users to a FHIR service and then into the events pipeline

## Resources for troubleshooting

> **Important:**
> For a list of supported event types and the operations that trigger them, see [Events operations](events-overview.md#supported-operations).
>
> For more information about the FHIR service delete types, see [REST API capabilities in the FHIR service in Azure Health Data Services](../fhir/rest-api-capabilities.md).

### Events message structures

To learn about the events message structures, required and nonrequired elements, and to see sample Events messages, see [Events message structures](events-message-structure.md).

### How-to articles

* To learn how to deploy events in the Azure portal, see [Deploy events by using the Azure portal](events-deploy-portal.md).

    > **Important:**
    > The event subscription requires access to the endpoint you chose to receive events messages. For more information, see [Enable managed identity for a system topic](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/enable-identity-system-topics.md).

* To learn how to use events metrics, see [How to use events metrics](events-use-metrics.md).

* To learn how to enable diagnostic settings for events, see [How to enable diagnostic settings for events](events-enable-diagnostic-settings.md).

* To learn how to troubleshoot common issues with events delivery, see [Troubleshoot Azure Event Grid issues](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/troubleshoot-issues.md).

## Contact support

If you have a technical question about Events or if you have a support related issue, see [Create a support request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/overview) and complete the required fields under the **Problem description** tab. For more information about Azure support options, see [Azure support plans](https://azure.microsoft.com/support/options/#support-plans). 

## Next steps

> 
> [Frequently asked questions about events](events-faqs.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7. 
>
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
