---
title: Azure App Service monitoring data reference
description: This article contains important reference material you need when you monitor Azure App Service.
ms.date: 03/07/2024
ms.custom: horz-monitor
ms.topic: reference
author: msangapu-msft
ms.author: msangapu
ms.service: azure-app-service
---

# Azure App Service monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)

See [Monitor Azure App Service](monitor-app-service.md) for details on the data you can collect for Azure App Service and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)

### Supported metrics for Microsoft.Web

The following tables list the automatically collected platform metrics for App Service.

| Metric Type | Resource Provider / Type Namespace<br/> and link to individual metrics |
| --- | --- |
| Web apps | [Microsoft.Web/sites](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-sites-metrics) |
| App Service Plans | [Microsoft.Web/serverfarms](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-serverfarms-metrics) |
| Staging slots | [Microsoft.Web/sites/slots](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-sites-slots-metrics) |
| App Service Environment | [Microsoft.Web/hostingEnvironments](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-hostingenvironments-metrics) |
| App Service Environment Front-end | [Microsoft.Web/hostingEnvironments/multiRolePools](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-hostingenvironments-multirolepools-metrics) |
| App Service Environment Worker Pools | [Microsoft.Web/hostingEnvironments/workerPools](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-hostingenvironments-workerpools-metrics) |

>**Note:**
>Azure App Service, Functions, and Logic Apps share the Microsoft.Web/sites namespace dating back to when they were a single service. Refer to the **Metric** column in the [Microsoft.Web/sites](https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-web-sites-metrics) table to see which metrics apply to which services. The **Metrics** interface in the Azure portal for each service shows only the metrics that apply to that service.

>**Note:**
>App Service Plan metrics are available only for plans in *Basic*, *Standard*, and *Premium* tiers.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)

Some metrics in the following namespaces have the listed dimensions:

**Microsoft.Web/sites**

- Instance
- workflowName
- status
- accountName

**Microsoft.Web/serverFarms**,<br>
**Microsoft.Web/sites/slots**,<br>
**Microsoft.Web/hostingEnvironments**,<br>
**Microsoft.Web/hostingenvironments/multirolepools,**<br>
**Microsoft.Web/hostingenvironments/workerpools**

- Instance

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)

### Supported resource logs for Microsoft.Web

- [Microsoft.Web/hostingEnvironments](https://learn.microsoft.com/azure/azure-monitor/reference/supported-logs/microsoft-web-hostingenvironments-logs)
- [Microsoft.Web/sites](https://learn.microsoft.com/azure/azure-monitor/reference/supported-logs/microsoft-web-sites-logs)
- [Microsoft.Web/sites/slots](https://learn.microsoft.com/azure/azure-monitor/reference/supported-logs/microsoft-web-sites-slots-logs)

The following table lists more information about resource logs you can collect for App Service. 

| Log type | Windows | Windows Container | Linux | Linux Container | Description |
| --- | --- | --- | --- | --- | --- |
| AppServiceConsoleLogs | Java SE & Tomcat | Yes | Yes | Yes | Standard output and standard error |
| AppServiceHTTPLogs | Yes | Yes | Yes | Yes | Web server logs |
| AppServiceEnvironmentPlatformLogs | Yes | N/A | Yes | Yes | App Service Environment: scaling, configuration changes, and status logs |
| AppServiceAuditLogs | Yes | Yes | Yes | Yes | Login activity via FTP and Kudu |
| AppServiceFileAuditLogs | Yes | Yes | TBA | TBA | File changes made to the site content; **only available for Premium tier and above** |
| AppServiceAppLogs | ASP.NET | ASP.NET | Java SE & Tomcat Images | Java SE & Tomcat Images | Java and Tomcat are supported in their default configuration. [Additional code and/or configuration might be required for some logging frameworks](https://github.com/Azure-Samples/SpringBoot3Log4j2AppSvcLogs). |
| AppServiceIPSecAuditLogs | Yes | Yes | Yes | Yes | Requests from IP Rules |
| AppServicePlatformLogs | TBA | Yes | Yes | Yes | Container operation logs |
| AppServiceAntivirusScanAuditLogs | Yes | Yes | Yes | Yes | [Anti-virus scan logs](https://azure.github.io/AppService/2020/12/09/AzMon-AppServiceAntivirusScanAuditLogs.html) using Microsoft Defender for Cloud; **only available for Premium tier** |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)
### App Services

Microsoft.Web/sites
- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity)
- [LogicAppWorkflowRuntime](https://learn.microsoft.com/azure/azure-monitor/reference/tables/logicappworkflowruntime)
- [AppServiceAuthenticationLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceauthenticationlogs)
- [AppServiceServerlessSecurityPluginData](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceserverlesssecurityplugindata)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics)
- [AppServiceAppLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceapplogs)
- [AppServiceAuditLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceauditlogs)
- [AppServiceConsoleLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceconsolelogs)
- [AppServiceFileAuditLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appservicefileauditlogs)
- [AppServiceHTTPLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appservicehttplogs)
- [FunctionAppLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/functionapplogs)
- [AppServicePlatformLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceplatformlogs)
- [AppServiceIPSecAuditLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/appserviceipsecauditlogs)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/monitor-app-service-reference.md)

The following table lists common activity log operations related to App Service. This list isn't exhaustive. For all Microsoft.Web resource provider operations, see [Microsoft.Web resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftweb).

| Operation | Description |
| :--- | :--- |
| Create or Update Web App | App was created or updated |
| Delete Web App | App was deleted |
| Create Web App Backup | Backup of app |
| Get Web App Publishing Profile | Download of publishing profile |
| Publish Web App | App deployed |
| Restart Web App | App restarted |
| Start Web App | App started |
| Stop Web App | App stopped |
| Swap Web App Slots | Slots were swapped |
| Get Web App Slots Differences | Slot differences |
| Apply Web App Configuration | Applied configuration changes |
| Reset Web App Configuration | Configuration changes reset |
| Approve Private Endpoint Connections | Approved private endpoint connections |
| Network Trace Web Apps | Started network trace |
| Newpassword Web Apps | New password created |
| Get Zipped Container Logs for Web App | Get container logs |
| Restore Web App From Backup Blob | App restored from backup |

## Related content

- See [Monitor App Service](monitor-app-service.md) for a description of monitoring App Service.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
