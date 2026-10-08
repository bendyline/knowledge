---
title: Service limits
titleSuffix: Azure Digital Twins
description: Chart showing the limits of the Azure Digital Twins service.
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: reference
ms.service: azure-digital-twins
---

# Azure Digital Twins service limits

The following sections describe the service limits of Azure Digital Twins.

> **Note:**
> Some areas of this service have adjustable limits. This is represented in the tables below with the **Adjustable?** column. When the limit can be adjusted, the **Adjustable?** value is **Yes**.
>
> If your business requires raising an adjustable limit or quota above the default limit, you can request additional resources by [opening a support ticket](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/newsupportrequest).

## Limits by type


### Functional limits

The following table lists the functional limits of Azure Digital Twins. 

| Area | Capability | Default limit | Adjustable? |
| --- | --- | --- | --- |
| Azure resource | Number of Azure Digital Twins instances in a region, per subscription | 10 | Yes, up to 50 |
| Digital twins | Number of twins in an Azure Digital Twins instance | 2,000,000 | Yes |
| Digital twins | Number of digital twins that can be imported in a single [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) job | 2,000,000 | No |
| Digital twins | Number of incoming relationships to a single twin | 50,000 | No |
| Digital twins | Number of outgoing relationships from a single twin | 50,000 | No |
| Digital twins | Total number of relationships in an Azure Digital Twins instance | 20,000,000 | Yes |
| Digital twins | Number of relationships that can be imported in a single [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) job | 10,000,000 | No |
| Digital twins | Maximum size (of JSON body in a PUT or PATCH request) of a single twin | 32 KB | No |
| Digital twins | Maximum request payload size | 32 KB | No |
| Digital twins | Maximum size of a string property value (UTF-8) | 4 KB | No |
| Digital twins | Maximum size of a property name | 1 KB | No |
| Routing | Number of endpoints for a single Azure Digital Twins instance | 6 | No |
| Routing | Number of routes for a single Azure Digital Twins instance | 6 | Yes |
| Models | Number of models within a single Azure Digital Twins instance | 10,000 | Yes |
| Models | Number of models that can be imported in a single API call (not using the [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs)) | 250 | No |
| Models | Number of models that can be imported in a single [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) job | 10,000 | No |
| Models | Maximum size (of JSON body in a PUT or PATCH request) of a single model | 1 MB | No |
| Models | Number of items returned in a single page | 100 | No |
| Query | Number of items returned in a single page | 1000 | Yes |
| Query | Number of `AND` / `OR` expressions in a query | 50 | Yes |
| Query | Number of array items in an `IN` / `NOT IN` clause | 50 | Yes |
| Query | Number of characters in a query | 8,000 | Yes |
| Query | Number of `JOINS` in a query | 5 | Yes |

### Rate limits

The following table lists the rate limits of different APIs.

| API | Capability | Default limit | Adjustable? |
| --- | --- | --- | --- |
| Jobs API | Number of requests per second | 1 | Yes |
| Jobs API | Number of bulk jobs running concurrently (including import and delete) | 1 | Yes |
| Models API | Number of requests per second | 100 | Yes |
| Digital Twins API | Number of read requests per second | 1,000 | Yes |
| Digital Twins API | Number of patch requests per second | 1,000 | Yes |
| Digital Twins API | Number of create/delete operations per second across all twins and relationships | 500 | Yes |
| Digital Twins API | Number of create/update/delete operations per second on a single twin or its incoming/outgoing relationships | 10 | No |
| Digital Twins API | Number of outstanding operations on a single twin or its incoming/outgoing relationships | 500 | No |
| Query API | Number of requests per second | 500 | Yes |
| Query API | [Query Units](https://learn.microsoft.com/azure/digital-twins/concepts-query-units) per second | 4,000 | Yes |
| Event Routes API | Number of requests per second | 100 | Yes |

### Other limits

Limits on data types and fields within DTDL documents for Azure Digital Twins models can be found in its spec documentation in GitHub: [Digital Twins Definition Language (DTDL) - version 3](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v3/DTDL.v3.md).
 
Query latency details are described in [Query language](https://learn.microsoft.com/azure/digital-twins/concepts-query-language#considerations-for-querying). Limitations of particular query language features can be found in the [query reference documentation](https://learn.microsoft.com/azure/digital-twins/concepts-query-language#reference-documentation).


## Working with limits

>**Note:**
>Azure Digital Twins will automatically scale resources to meet the rate limits described in this article. You may experience throttling before these limits are reached due to internal scaling to adapt to the incoming load. Internal scaling can take anywhere from 5 to 30 minutes, during which time your application may encounter 429 errors.

When a limit is reached, any requests beyond it are throttled by the service, which will result in a **429** error response from these requests.

To manage the throttling, here are some recommendations for working with limits.
* **Use retry logic.** The [Azure Digital Twins SDKs](concepts-apis-sdks.md) implement retry logic for failed requests, so if you're working with a provided SDK, this functionality is already built in. Otherwise, consider implementing retry logic in your own application. The service sends back a `Retry-After` header in the failure response, which you can use to determine how long to wait before retrying.
* **Use thresholds and notifications to warn about approaching limits.** Some of the service limits for Azure Digital Twins have corresponding [metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics) that can be used to track usage in these areas. To configure thresholds and set up an alert on any metric when a threshold is approached, see the instructions in [Create a new alert rule](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-create-new-alert-rule?tabs=metric). To set up notifications for other limits where metrics aren't provided, consider implementing this logic in your own application code.
* **Deploy at scale across multiple instances.** Avoid having a single point of failure. Instead of one large graph for your entire deployment, consider sectioning out subsets of twins logically (like by region or tenant) across multiple instances. 
* **Review the [Modeling tools and best practices](concepts-models.md#modeling-tools-and-best-practices)** for modeling recommendations to help you operate within the functional limits.

## Next steps

Learn more about the current release of Azure Digital Twins in the service overview:
* [What is Azure Digital Twins?](overview.md)
