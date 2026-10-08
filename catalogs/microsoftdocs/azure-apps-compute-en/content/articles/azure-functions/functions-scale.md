---
title: Azure Functions Scale and Hosting
description: Compare the various options you need to consider when choosing a hosting plan in which to run your function app in Azure Functions.
ms.assetid: 5b63649c-ec7f-4564-b168-e0a74cb7e0f3
ms.topic: limits-and-quotas
ms.date: 09/16/2026
ms.custom: H1Hack27Feb2017, devdivchpfy22, build-2023, build-2024, ignite-2024
#customer intent: As a cloud developer or platform engineer, I want guidance on Functions scaling and hosting so I can choose the best hosting plan for performance and cost-efficiency when running my code in Azure.
---
# Azure Functions hosting options

When you create a function app in Azure, you must choose a hosting option for your app. Azure provides you with these hosting options for your function code:

| Hosting option | Service | Availability | Container support |
| --- | --- | --- | --- |
| **[Flex Consumption plan]** | Azure Functions | Generally available (GA) | None |
| **[Premium plan]** | Azure Functions | GA | Linux |
| **[Dedicated plan]** | Azure Functions | GA | Linux |
| **[Container Apps]** | Azure Container Apps | GA | Linux |
| **[Consumption plan]** (legacy) | Azure Functions | Windows - GA<br/>Linux - Retired | None |

> **Important:**
> The Consumption plan is a legacy hosting plan. For new serverless function apps, use the [Flex Consumption plan]. For existing Consumption plan apps, [migrate to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md).

The Azure App Service infrastructure on both Linux and Windows virtual machines facilitates the Azure Functions hosting options. The hosting option you choose dictates the following behaviors:

- How your function app is scaled.
- The resources available to each function app instance.
- Support for advanced functionality, such as Azure Virtual Network connectivity.
- Support for Linux containers.

The plan you choose also impacts the costs for running your function code. For more information, see [Billing](#billing).

This article provides a detailed comparison between the various hosting options. To learn more about running and managing your function code in Linux containers, see [Linux container support in Azure Functions](container-concepts.md).

## Overview of plans

The following table summarizes the benefits of the various options for Azure Functions hosting.

| Option | Benefits |
| --- | --- |
| **[Flex Consumption plan]** | Experience fast horizontal scaling, with flexible compute options, virtual network integration, and serverless pay-as-you-go billing.<br/><br/>In the Flex Consumption plan, function instances dynamically scale out (up to 1,000) based on configured per-instance concurrency, incoming events, and per-function workloads for optimal efficiency.<br/><br/>Consider the Flex Consumption plan when:<br/><br/>✔ You need a serverless host for your function code, paying only for on-demand executions.<br/>✔ You require virtual network connectivity for secure access to Azure resources.<br/>✔ Your workloads are variable and can go from no activity to demanding rapid, event-driven scaling.<br/>✔ You want to customize compute with memory sizes (512 MB, 2,048 MB, or 4,096 MB) and reduce cold starts via one or more pre-provisioned (always-ready) instances. |
| **[Premium plan]** | Automatically scales based on demand using prewarmed workers, which run applications with no delay after being idle, runs on more powerful instances, and connects to virtual networks. <br/><br/>Consider the Azure Functions Premium plan in the following situations: <br/><br/>✔ Your function apps run continuously, or nearly continuously.<br/>✔ You want more control of your instances and want to deploy multiple function apps on the same plan with event-driven scaling.<br/>✔ You have a high number of small executions and a high execution bill, but low GB seconds in the Consumption plan.<br/>✔ You need more CPU or memory options than are provided by consumption plans.<br/>✔ Your code needs to run longer than the maximum execution time allowed on the Consumption plan.<br/>✔ You require virtual network connectivity for secure access to Azure resources.<br/>✔ You want to provide a custom Linux image in which to run your functions. |
| **[Dedicated plan]** | Run your functions within an App Service plan at regular [App Service plan rates](https://azure.microsoft.com/pricing/details/app-service/windows/).<br/><br/>Best for long-running scenarios where [Durable Functions](../durable-task/common/what-is-durable-task.md) can't be used. Consider an App Service plan in the following situations:<br/><br/>✔ You have existing and underutilized virtual machines that are already running other App Service instances.<br/>✔ You must have fully predictable billing, or you need to manually scale instances.<br/>✔ You want to run multiple web apps and function apps on the same plan<br/>✔ You need access to larger compute size choices.<br/>✔ Full compute isolation and secure network access provided by an App Service Environment (ASE).<br/>✔ Very high memory usage and high scale (ASE). |
| **[Container Apps]** | Create and deploy containerized function apps in a fully managed environment hosted by Azure Container Apps.<br/><br/>Use the Azure Functions programming model to build event-driven, serverless, cloud native function apps. Run your functions alongside other microservices, APIs, websites, and workflows as container-hosted programs. Consider hosting your functions on Container Apps in the following situations:<br/><br/>✔ You want control of the container image and want to package custom libraries with your function code to support line-of-business apps.<br/>✔ You need to migrate code execution from on-premises or legacy apps to cloud native microservices running in containers.<br/>✔ When you want to avoid the overhead and complexity of managing Kubernetes clusters and dedicated compute.<br/>✔ Your functions need high-end processing power provided by dedicated GPU compute resources. |
| **[Consumption plan]** (legacy) | Pay for compute resources only when your functions are running (pay-as-you-go) with automatic scale on Windows.<br/><br/>On the Consumption plan, function instances are dynamically added and removed based on the number of incoming events.<br/><br/>Consider the Consumption plan when:<br/><br/>✔ You have a dependency on Windows. For example, using the full .NET Framework or Windows-specific features like certain PowerShell modules.<br/>✔ You want a serverless billing model and pay only when your functions are running.<br/><br/>For new serverless function apps, use the [Flex Consumption plan] instead. |

The remaining tables in this article compare hosting options based on various features and behaviors. 

## <a name="operating-systemruntime"></a>Operating system support

This table shows operating system support for the hosting options. 

| Hosting | Linux<sup>1</sup> deployment | Windows<sup>2</sup> deployment |
| --- | --- | --- |
| **[Flex Consumption plan]** | ✅ Code-only<br/>❌ Container (not supported) | ❌ Not supported |
| **[Premium plan]** | ✅ Code-only<br/>✅ Container | ✅ Code-only |
| **[Dedicated plan]** | ✅ Code-only<br/>✅ Container | ✅ Code-only |
| **[Container Apps]** | ✅ Container-only | ❌ Not supported |
| **[Consumption plan]** | ✅ Code-only (Retired)<br/>❌ Container (not supported) | ✅ Code-only (legacy) |

1. Linux is the only supported operating system for the [Python runtime stack](functions-reference-python.md).  
2. Windows deployments are code-only. Azure Functions doesn't currently support Windows containers. 


> **Important:**  
> Function apps still running the [end-of-life v3 runtime](functions-versions.md#retired-versions) on Linux in a Consumption plan stop running after September 30, 2026. To avoid service disruption, [migrate your app to the v4 runtime](migrate-version-3-version-4.md).
>
> The option to host function apps on Linux in a Consumption plan is retiring on 30 September 2028. The Linux Consumption plan isn't getting any new features or [language versions](supported-languages.md). Apps running on Windows in a Consumption plan aren't currently affected. [Migrate your apps to the Flex Consumption plan](migration/migrate-plan-consumption-to-flex.md) before the retirement date.


## <a name="timeout"></a>Function app timeout duration 

The `functionTimeout` property in the [host.json](functions-host-json.md#functiontimeout) project file sets the timeout duration for functions in a function app. This property applies specifically to function executions. After the trigger starts function execution, the function needs to return or respond within the timeout duration. When an execution exceeds this duration, a timeout error occurs and the language worker process restarts. For C# apps running in-process, the host process itself restarts. To avoid timeouts and subsequent process restarts, it's important to [write robust functions](functions-best-practices.md#write-robust-functions). For more information, see [Improve Azure Functions performance and reliability](performance-reliability.md#make-sure-background-tasks-complete). 

The following table shows the default and maximum values (in minutes) for specific plans:

| Plan | Default | Maximum<sup>1</sup> |
| --- | --- | --- |
| **[Flex Consumption plan](flex-consumption-plan.md)** | 30 | Unbounded<sup>2</sup> |
| **[Premium plan](functions-premium-plan.md)** | 30 | Unbounded<sup>2</sup> |
| **[Dedicated plan](dedicated-plan.md)** | 30 | Unbounded<sup>3</sup> |
| **[Container Apps](../container-apps/functions-overview.md)** | 30 | Unbounded<sup>4</sup> |
| **[Consumption plan](consumption-plan.md)** | 5 | 10 |

1. Regardless of the function app timeout setting, 230 seconds is the maximum amount of time that an HTTP triggered function can take to respond to a request. This limit exists because of the [default idle timeout of Azure Load Balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/faq-availability-performance-application-issues.yml#why-does-my-request-time-out-after-230-seconds). For longer processing times, consider using the [Durable Functions async pattern](../durable-task/durable-functions/durable-functions-http-features.md#async-operation-tracking) or [defer the actual work and return an immediate response](performance-reliability.md#avoid-long-running-functions).
2. There's no maximum execution timeout duration enforced. However, the grace period given to a function execution is 60 minutes [during scale in](event-driven-scaling.md#scale-in-behaviors) for the Flex Consumption and Premium plans, and a grace period of 10 minutes is given during platform updates.
3. Requires the App Service plan be set to [Always On](https://learn.microsoft.com/azure/azure-functions/dedicated-plan#always-on). A grace period of 10 minutes is given during platform updates.
4. When the [minimum number of replicas](../container-apps/scale-app.md#scale-definition) is set to zero, the default timeout depends on the specific triggers used in the app.

These values assume that the Azure Functions host process starts and runs correctly. There's a maximum timeout of 60 seconds for the language-specific worker process to also start. The worker process startup timeout isn't currently configurable.

## Language support

For details on current native language stack support in Functions, see [Supported languages in Azure Functions](supported-languages.md).

## Scale

The following table compares the scaling behaviors of the various hosting plans.  
Maximum instances are given on a per-function app (Consumption), per-plan (Premium/Dedicated), or per-function group (Flex Consumption) basis, unless otherwise indicated. In the [Flex Consumption plan](flex-consumption-plan.md), the maximum instance count applies to the on-demand instances in each [function group](flex-consumption-plan.md#per-function-scaling) rather than to the app's combined instances, and it doesn't include [always ready instances](flex-consumption-plan.md#always-ready-instances). 

| Plan | Scale out | Max # instances |
| --- | --- | --- |
| **[Flex Consumption plan]** | Fast event-driven scaling decisions are calculated on a per-function basis, called [per-function scaling](flex-consumption-plan.md#per-function-scaling), which provides a more deterministic way of scaling the functions in your app. Except for HTTP, Blob storage (Event Grid), and Durable Functions, all other function trigger types in your app scale on independent instances. All HTTP triggers in your app scale together as a group on the same instances, as do all Blob storage (Event Grid) triggers. All Durable Functions triggers also share instances and scale together. | 1000<sup>1</sup> |
| **[Premium plan]** | [Event driven](event-driven-scaling.md). Scale out automatically, even during periods of high load. Azure Functions infrastructure scales CPU and memory resources by adding more instances of the Functions host, based on the number of events that its functions are triggered on. | **Windows:** 100<sup>6</sup><br/>**Linux:** 20-100<sup>2,6</sup> |
| **[Dedicated plan]** | Manual/autoscale | 10-30<sup>3</sup><br/>100 (ASE) |
| **[Container Apps]** | [Event driven](event-driven-scaling.md). Scale out automatically, even during periods of high load. Azure Functions infrastructure scales CPU and memory resources by adding more instances of the Functions host, based on the number of events that its functions are triggered on. | 300-1000<sup>4</sup> |
| **[Consumption plan]** | [Event driven](event-driven-scaling.md). Automatic scale based on the source of events. Functions infrastructure scales resources by adding more instances of the function host, based on the number of incoming trigger events. | **Windows:** 200<br/>**Linux:** 100<sup>5</sup> |

1. Flex Consumption plan has a regional subscription quota that limits the total memory usage of all instances across a given region. For more information, see [Regional subscription memory quotas](flex-consumption-plan.md#regional-subscription-memory-quotas). Flex Consumption plans currently only support Linux.
2. In some regions, Linux apps on a Premium plan can scale to 100 instances. For more information, see the [Premium plan article](functions-premium-plan.md#region-max-scale-out). 
3. For specific limits for the various App Service plan options, see the [App Service plan limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md#azure-app-service-limits).
4. On Container Apps, the default is 10 instances, but you can set the [maximum number of replicas](../container-apps/scale-app.md#scale-definition), which has an overall maximum of 1000. This setting is honored as long as there's enough cores quota available. For more information, see [Quotas for Azure Container Apps](https://learn.microsoft.com/azure/container-apps/quotas). When you create your function app from the Azure portal, you're limited to 300 instances.
5. During scale-out, there's currently a limit of 500 instances per subscription per hour for Linux apps on a Consumption plan. 
6. For private endpoint restricted http triggers, scaling out is limited to at most 20 instances.

## Cold start behavior

| Plan | Details |
| --- | --- |
| **[Flex Consumption plan]** | Improved cold start even when scaled to zero. Supports [always ready instances](flex-consumption-plan.md#always-ready-instances) to further reduce the delay when provisioning new instances. |
| **[Premium plan]** | Supports [always ready instances](functions-premium-plan.md#always-ready-instances) to avoid cold starts by letting you maintain one or more _perpetually warm_ instances. |
| **[Dedicated plan]** | When it runs in a Dedicated plan, the Functions host can run continuously on a prescribed number of instances, which means that cold start isn't really an issue. |
| **[Container Apps]** | Depends on the [minimum number of replicas](../container-apps/scale-app.md#scale-definition):<br/> • When set to zero: apps can scale to zero when idle and some requests might have more latencies at startup.<br/>• When set to one or more: the host process runs continuously, which means that cold start isn't an issue. |
| **[Consumption plan]** | Apps can scale to zero when idle, meaning some requests might have more latencies at startup. The consumption plan does have some optimizations to help decrease cold start time, including pulling from prewarmed placeholder functions that already have the host and language processes running. |

## Service limits

| Resource | [Flex Consumption plan](flex-consumption-plan.md) | [Premium plan](functions-premium-plan.md) | [Dedicated plan](dedicated-plan.md)/[ASE](../app-service/environment/overview.md) | [Container Apps](../container-apps/functions-overview.md) | [Consumption plan](consumption-plan.md) |
| --- | --- | --- | --- | --- | --- |
| Default [timeout duration](https://learn.microsoft.com/azure/azure-functions/functions-scale#timeout) (min) | 30 | 30 | 30 | 30<sup>16</sup> | 5 |
| Max [timeout duration](https://learn.microsoft.com/azure/azure-functions/functions-scale#timeout) (min) | unbounded<sup>9</sup> | unbounded<sup>9</sup> | unbounded<sup>2</sup> | unbounded<sup>17</sup> | 10 |
| Max outbound connections (per instance) | unbounded | unbounded | see [App Service limits](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-app-service-limits) | unbounded | 600 active (1200 total) |
| Max request size (MB)<sup>3</sup> | 210 | 210 | 210 | 210 | 210 |
| Max query string length<sup>3</sup> | 4096 | 4096 | 4096 | 4096 | 4096 |
| Max request URL length<sup>3</sup> | 8192 | 8192 | 8192 | 8192 | 8192 |
| [ACU](https://learn.microsoft.com/azure/virtual-machines/acu) per instance | 210-840 | 100-840/210-250<sup>10</sup> | [varies](https://learn.microsoft.com/azure/container-apps/billing) | 100 | varies |
| Max memory (GB per instance) | 4<sup>14</sup> | 3.5-14 | 1.75-256/8-256 | [varies](https://learn.microsoft.com/azure/container-apps/billing) | 1.5 |
| Max instance count (Windows&nbsp;\|&nbsp;Linux)<sup>15</sup> | n/a&nbsp;\|&nbsp;1000 | 20-100 | 10-30 (100 ASE)<sup>11</sup> | 300-1000<sup>1</sup> | 200&nbsp;\|&nbsp;100 |
| Function apps per plan<sup>13</sup> | 1 | 100 | unbounded<sup>4</sup> | unbounded<sup>4</sup> | 100 |
| [App Service plans](https://learn.microsoft.com/azure/app-service/overview-hosting-plans) | n/a | 100 per resource group | 100 per resource group | n/a | 100 per [region](https://azure.microsoft.com/global-infrastructure/regions/) |
| [Deployment slots](https://learn.microsoft.com/azure/azure-functions/functions-deployment-slots) per app<sup>12</sup> | n/a | 3 | 1-20<sup>11</sup> | not supported | 2 |
| Storage (temporary)<sup>5</sup> | 0.8 GB | 11-61 GB | 11-140 GB | n/a | 0.5 GB |
| Storage (persisted) | 0 GB<sup>7</sup> | 250 GB | 10-1000 GB<sup>11</sup> | n/a | 1 GB<sup>6,7</sup> |
| Custom domains per app</a> | 25<sup>8</sup> | 500 | 500 | not supported | 500<sup>8</sup> |
| Custom domain [TSL/SSL support](https://learn.microsoft.com/azure/app-service/configure-ssl-bindings) | unbounded SNI SSL and one IP SSL connection included | unbounded SNI SSL and one IP SSL connection included | unbounded SNI SSL and one IP SSL connection included | not supported | unbounded SNI SSL connection included |

Notes on service limits:

1. On Container Apps, you can set the [maximum number of replicas](https://learn.microsoft.com/azure/container-apps/scale-app#scale-definition), which the platform honors as long as there's enough cores quota available.
2. Requires the App Service plan be set to [Always On](https://learn.microsoft.com/azure/azure-functions/dedicated-plan#always-on). Pay at standard [rates](https://azure.microsoft.com/pricing/details/app-service/). A grace period of 10 minutes is given for HTTP triggered functions during platform updates but not for other triggers.
3. These limits are [set in the host](https://github.com/Azure/azure-functions-host/blob/dev/src/WebJobs.Script.WebHost/web.config).  
4. The actual number of function apps that you can host depends on the activity of the apps, the size of the machine instances, and the corresponding resource utilization.  
5. The storage limit is the total content size in temporary storage across all apps in the same App Service plan. For Consumption plans on Linux, the storage is currently 1.5 GB.
6. Consumption plan uses an Azure Files share for persisted storage. When you provide your own Azure Files share, the specific share size limits depend on the storage account you set for [WEBSITE_CONTENTAZUREFILECONNECTIONSTRING](https://learn.microsoft.com/azure/azure-functions/functions-app-settings#website_contentazurefileconnectionstring). 
7. On Linux, you must [explicitly mount your own Azure Files share](https://learn.microsoft.com/azure/azure-functions/storage-considerations#mount-file-shares).
8. When your function app is hosted in a [Consumption plan](https://learn.microsoft.com/azure/azure-functions/consumption-plan), only the CNAME option is supported. For function apps in a [Premium plan](https://learn.microsoft.com/azure/azure-functions/functions-premium-plan) or an [App Service plan](https://learn.microsoft.com/azure/azure-functions/dedicated-plan), you can map a custom domain using either a CNAME or an A record.  
9. There's no maximum execution timeout duration enforced. However, the grace period given to a function execution is 60 minutes [during scale in](event-driven-scaling.md#scale-in-behaviors) and 10 minutes during platform updates.
10. Workers are roles that host customer apps. Workers are available in three fixed sizes: One vCPU/3.5 GB RAM; Two vCPU/7 GB RAM; Four vCPU/14 GB RAM.   
11. See [App Service limits](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#app-service-limits) for details.  
12. Including the production slot.  
13. There's currently a limit of 5,000 function apps in a given subscription. 
14. Flex Consumption plan instance sizes are currently defined as 512 MB, 2,048 MB, or 4,096 MB. For more information, see [Instance memory](https://learn.microsoft.com/azure/azure-functions/flex-consumption-plan#instance-sizes).  
15. For details, see [Scale](functions-scale.md#scale) in the Hosting comparison article.
16. When the [minimum number of replicas](https://learn.microsoft.com/azure/container-apps/scale-app#scale-definition) is set to zero, the default timeout depends on the specific triggers used in the app.
17. When the [minimum number of replicas](../container-apps/scale-app.md#scale-definition) is set to one or more.



## Networking features


| Feature | [Flex Consumption plan](flex-consumption-plan.md) | [Consumption plan](consumption-plan.md) | [Premium plan](functions-premium-plan.md) | [Dedicated plan](dedicated-plan.md)/[ASE](../app-service/environment/overview.md) | [Container Apps](../container-apps/functions-overview.md)<sup>1</sup> |
| --- | --- | --- | --- | --- | --- |
| [Inbound access restrictions](functions-networking-options.md#inbound-access-restrictions) | ✅ | ✅ | ✅ | ✅ | ✅<sup>2</sup> |
| [Private endpoints (inbound)](functions-networking-options.md#private-endpoints) | ✅ | ❌ | ✅ | ✅ | ❌ |
| [Service endpoints (inbound)](functions-networking-options.md#service-endpoints) | ✅ | ❌ | ✅ | ✅ | ✅ |
| [Virtual network integration (outbound)](functions-networking-options.md#virtual-network-integration) | ✅ | ❌ | ✅ | ✅<sup>3</sup> | ✅ |
| [Hybrid Connections](functions-networking-options.md#hybrid-connections) | ❌ | ❌ | ✅ (Windows only) | ✅ (Windows only) | ✅ (Windows only) |

1. For more information, see [Networking in Azure Container Apps environment](../container-apps/networking.md). 
2. Managed through the Container Apps environment [ingress configuration](../container-apps/ip-restrictions.md).
3. The Dedicated/ASE plan also supports [gateway-required virtual network integration](../app-service/configure-gateway-required-vnet-integration.md).


## Certificates

You need to manage certificates when you use a custom domain name with your function app, when your function code authenticates to an external service using a client certificate, or when you require mutual TLS (mTLS). The default `*.azurewebsites.net` domain already has a platform-managed certificate. The following table shows certificate support across hosting plans:

| Feature | [Flex Consumption plan](flex-consumption-how-to.md#configure-site-scoped-certificates) | [Premium plan](../app-service/configure-ssl-certificate.md) | [Dedicated plan/ASE](../app-service/configure-ssl-certificate.md) | [Container Apps] | [Consumption plan](../app-service/configure-ssl-certificate.md) |
| --- | --- | --- | --- | --- | --- |
| Managed certificates | ✅ <sup>2</sup> | ✅ | ✅ | ✅ | ✅ |
| Private certificates (.pfx) | ✅ (3 per app) | ✅ (unlimited<sup>1</sup>) | ✅ (unlimited<sup>1</sup>) | [✅](../container-apps/custom-domains-certificates.md) | ✅ (unlimited<sup>1</sup>) |
| Public certificates (.cer) | ✅ (3 per app) | ✅ (unlimited<sup>1</sup>) | ✅ (unlimited<sup>1</sup>) | ✅ | ✅ (unlimited<sup>1</sup>) |
| Import from Key Vault<sup>2</sup> | ✅ | ✅ | ✅ | ✅ | ✅ |
| Certificate model | [Site-scoped](flex-consumption-how-to.md#configure-site-scoped-certificates) | [Webspace-scoped](../app-service/overview-tls.md) | [Webspace-scoped](../app-service/overview-tls.md) | [Per-environment](../container-apps/custom-domains-certificates.md) | [Webspace-scoped](../app-service/overview-tls.md) |
| Access from code | [Per-certificate toggle](flex-consumption-how-to.md#make-a-certificate-accessible-to-your-code) | [`WEBSITE_LOAD_CERTIFICATES`](functions-app-settings.md#website_load_certificates) | [`WEBSITE_LOAD_CERTIFICATES`](functions-app-settings.md#website_load_certificates) | [Environment variables](../container-apps/certificates-overview.md) | [`WEBSITE_LOAD_CERTIFICATES`](functions-app-settings.md#website_load_certificates) |

1. Subject to [App Service plan limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md#azure-app-service-limits).
2. Certificates imported from Key Vault are automatically synced within 24 hours after renewal.

## Billing

| Plan | Details |
| --- | --- |
| **[Flex Consumption plan]** | Billing is based on number of executions, the memory of instances when they're actively executing functions, plus the cost of any [always ready instances](flex-consumption-plan.md#always-ready-instances). For more information, see [Flex Consumption plan billing](flex-consumption-plan.md#billing). |
| **[Premium plan]** | Premium plan is based on the number of core seconds and memory used across needed and prewarmed instances. At least one instance per plan must always be kept warm. This plan provides the most predictable pricing. |
| **[Dedicated plan]** | You pay the same for function apps in an App Service Plan as you would for other App Service resources, like web apps.<br/><br/>For an ASE, there's a flat monthly rate that pays for the infrastructure and doesn't change with the size of the environment. There's also a cost per App Service plan vCPU. All apps hosted in an ASE are in the Isolated pricing model. For more information, see the [ASE overview article](../app-service/environment/overview.md#pricing). |
| **[Container Apps]** | Billing in Azure Container Apps is based on your plan type. For more information, see [Billing in Azure Container Apps](../container-apps/billing.md). |
| **[Consumption plan]** | Pay only for the time your functions run. Billing is based on number of executions, execution time, and memory used. |

For a direct cost comparison between dynamic hosting plans (Consumption, Flex Consumption, and Premium), see the [Azure Functions pricing page](https://azure.microsoft.com/pricing/details/functions/). For pricing of the various Dedicated plan options, see the [App Service pricing page](https://azure.microsoft.com/pricing/details/app-service). For pricing Container Apps hosting, see [Azure Container Apps pricing](https://azure.microsoft.com/pricing/details/container-apps/).

<!---this needs to move into a troubleshooting how to article-->
## Limitations for creating new function apps in an existing resource group

In some cases, when trying to create a new hosting plan for your function app in an existing resource group you might receive one of the following errors:

- The pricing tier isn't allowed in this resource group
- <SKU_name> workers aren't available in resource group <resource_group_name>

These errors can occur when the following conditions are met:

- You create a function app in an existing resource group that has yet to contain another function app or web app. For example, Linux Consumption apps aren't supported in the same resource group as Linux Dedicated or Linux Premium plans.
- Your new function app is created in the same region as the previous app.
- The previous app is in some way incompatible with your new app. This incompatibility can occur between versions, operating systems, or is due to other platform-level features, such as availability zone support.

Function app and web app plans are mapped to different pools of resources when they're created. Different plans require a different set of infrastructure capabilities. When you create an app in a resource group, that resource group is mapped and assigned to a specific pool of resources. If you try to create another plan in that resource group and the mapped pool doesn't have the required resources, the previously mentioned errors occur.

If this situation happens, create your function app and hosting plan in a new resource group instead.

## Next steps

+ [Deployment technologies in Azure Functions](functions-deployment-technologies.md) 
+ [Azure Functions developer guide](functions-reference.md)

[Consumption plan]: consumption-plan.md
[Flex Consumption plan]: flex-consumption-plan.md
[Premium plan]: functions-premium-plan.md
[Dedicated plan]: dedicated-plan.md
[Container Apps]: ../container-apps/functions-overview.md
