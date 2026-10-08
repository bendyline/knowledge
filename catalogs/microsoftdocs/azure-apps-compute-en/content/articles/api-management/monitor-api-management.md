---
title: Monitor Azure API Management
description: Learn how to monitor Azure API Management using Azure Monitor, including data collection, analysis, and alerting.
ms.date: 09/09/2025
ms.custom:
  - horz-monitor
  - build-2025
ms.topic: how-to
ms.service: azure-api-management
---

# Monitor API Management

**APPLIES TO: All API Management tiers**

 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

## Collect data with Azure Monitor

This table describes how you can collect data to monitor your service, and what you can do with the data once collected:

| Data to collect | Description | How to collect and route the data | Where to view the data | Supported data |
| --- | --- | --- | --- | --- |
| Metric data | Metrics are numerical values that describe an aspect of a system at a particular point in time. Metrics can be aggregated using algorithms, compared to other metrics, and analyzed for trends over time. | - Collected automatically at regular intervals.</br> - You can route some platform metrics to a Log Analytics workspace to query with other data. Check the **DS export** setting for each metric to see if you can use a diagnostic setting to route the metric data. | [Metrics explorer](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started) | [Azure API Management metrics supported by Azure Monitor](monitor-api-management-reference.md#metrics) |
| Resource log data | Logs are recorded system events with a timestamp. Logs can contain different types of data, and be structured or free-form text. You can route resource log data to Log Analytics workspaces for querying and analysis. | [Create a diagnostic setting](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings) to collect and route resource log data. | [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/learn/quick-create-workspace) | [Azure API Management resource log data supported by Azure Monitor](monitor-api-management-reference.md#resource-logs) |
| Activity log data | The Azure Monitor activity log provides insight into subscription-level events. The activity log includes information like when a resource is modified or a virtual machine is started. | - Collected automatically.</br> - [Create a diagnostic setting](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings) to a Log Analytics workspace at no charge. | [Activity log](https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log) |  |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-supported-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

## Built in monitoring for API Management

Azure API management has the following built in monitoring features.

### Get API analytics in Azure API Management

Azure API Management provides analytics for your APIs so that you can analyze their usage and performance. Use analytics for high-level monitoring and troubleshooting of your APIs. For other monitoring features, including near real-time metrics and resource logs for diagnostics and auditing, see [Tutorial: Monitor published APIs](api-management-howto-use-azure-monitor.md).

Screenshot of API analytics in the portal.

> **Note:**
> Currently, this feature isn't available in [workspaces](workspaces-overview.md).

- API Management provides analytics using an [Azure Monitor-based dashboard](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview). The dashboard aggregates data in an Azure Log Analytics workspace.
- In the classic API Management service tiers, your API Management instance also includes *legacy built-in analytics* in the Azure portal, and analytics data can be accessed using the API Management REST API. Closely similar data is shown in the Azure Monitor-based dashboard and built-in analytics.

> **Important:**
> * The Azure Monitor-based dashboard is the recommended way to access analytics data.
> * Effective March 2027, the dashboard and reports associated with API Management built-in analytics in the classic tiers will be [retired](breaking-changes/analytics-dashboard-retirement-march-2027.md). We recommend transitioning to the Azure Monitor-based dashboard that replaces it.

With API analytics, analyze the usage and performance of the APIs in your API Management instance across several dimensions, including:

- Timeline
- Geography
- APIs
- API operations
- Products
- Subscriptions
- Users
- Requests
- Language models (for large language model APIs)

API analytics provides data on requests, including failed and unauthorized requests. Geography values are based on IP address mapping. There can be a delay in the availability of analytics data.

#### Azure Monitor-based dashboard

To use the Azure Monitor-based dashboard, you need a Log Analytics workspace as a data source for API Management gateway logs.

If you need to configure one, the following are brief steps to send gateway logs to a Log Analytics workspace. For more information, see [Enable diagnostic setting for Azure Monitor logs](#enable-diagnostic-setting-for-azure-monitor-logs), later in this article. This procedure is a one-time setup.

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left-hand menu, under **Monitoring**, select **Diagnostic settings** > **+ Add diagnostic setting**.
1. Enter a descriptive name for the diagnostic setting.
1. In **Logs**, select **Logs related to ApiManagement Gateway**.
    > **Tip:**
    > To collect logs for large language model (LLM) APIs for display on the Azure Monitor-based dashboard, also select **Logs related to generative AI gateway**.

1. In **Destination details**, select **Send to Log Analytics** and select a Log Analytics workspace in the same or a different subscription. If you need to create a workspace, see [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace).
1. Make sure **Resource specific** is selected as the destination table.
1. Select **Save**.

> **Important:**
> A new Log Analytics workspace can take up to 2 hours to start receiving data. An existing workspace should start receiving data within approximately 15 minutes.

#### Access the dashboard

After a Log Analytics workspace is configured, access the Azure Monitor-based dashboard to analyze the usage and performance of your APIs.

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left-hand menu, under **Monitoring**, select **Analytics**. The analytics dashboard opens.
1. Select a time range for data.
1. Select a report category for analytics data, such as **Timeline**, **Geography**, and so on.

### Legacy built-in analytics

In certain API Management service tiers, built-in analytics (also called *legacy analytics* or *classic analytics*) is also available in the Azure portal, and analytics data can be accessed using the API Management REST API. 

To access the built-in (classic) analytics in the Azure portal:

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left-hand menu, under **Monitoring**, select **Analytics (classic)**.
1. Select a time range for data, or enter a custom time range.
1. Select a report category for analytics data, such as **Timeline**, **Geography**, and so on.
1. Optionally, filter the report by one or more other categories.

Use [Reports](https://learn.microsoft.com/rest/api/apimanagement/reports) operations in the API Management REST API to retrieve and filter analytics data for your API Management instance.

Available operations return report records by API, geography, API operations, product, request, subscription, time, or user.

### Azure Monitor logs

This section shows you how to enable Azure Monitor logs for auditing and troubleshooting usage of different features of your API Management instance. By enabling a diagnostic setting, you can enable collection of one or more of the following categories of resource logs:

| Category | Description | Notes |
| --- | --- | --- |
| API Management gateway | Requests processed by the API Management gateway, including HTTP methods, protocols, request and response bodies, headers, timings, error details, and cache involvement. | Adjust settings for all APIs, or override them for individual APIs.<br/><br/>In API Management instances configured with [workspaces](workspaces-overview.md), gateway logs can be collected individually for each workspace and aggregated for centralized access by the platform team. |
| WebSocket connections | Events for [WebSocket API](websocket-api.md) connections, starting from the handshake until the connection is terminated. |
| Developer portal usage | Requests that are received and processed by the API Management [developer portal](developer-portal-overview.md), including user authentication actions, views of API details, and API testing in the interactive test console. |
| Generative AI gateway | Requests processed by the API Management gateway for large language model (LLM) REST APIs such as Microsoft Foundry APIs, including token usage, models, and optionally details of request prompts and response completions. | Enable logging of request messages and/or response messages for specific LLM APIs. |

For more information, see [API Management monitoring data reference](monitor-api-management-reference.md).


#### Enable diagnostic setting for Azure Monitor logs



To configure a diagnostic setting for collection of resource logs:

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left menu, under **Monitoring**, select **Diagnostic settings** > **+ Add diagnostic setting**.

   Screenshot of adding a diagnostic setting in the portal.

1. On the **Diagnostic setting** page, enter or select details for the setting:

    1. **Diagnostic setting name**: Enter a descriptive name.
    1. **Category groups**: Optionally make a selection for your scenario.
    1. Under **Categories**: Select one or more categories. For example, select **Logs related to ApiManagement Gateway** to collect logs for most requests to the API Management gateway. 
    1. Under **Destination details**, select one or more options and specify details for the destination. For example, send logs to an Azure Log Analytics workspace, archive logs to a storage account, or stream them to an event hub. For more information, see [Diagnostic settings in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings).
    1. Select **Save**.


   > **Tip:**
   > * To view API analytics in the [Azure Monitor-based dashboard](monitor-api-management.md#access-the-dashboard) for API Management (**Monitoring** > **Analytics** blade), select an Azure Log Analytics workspace as the destination.
   > * If you select a Log Analytics workspace, you can choose to store the data in a resource-specific table (for example, an ApiManagementGatewayLogs table) or store in the general AzureDiagnostics table. We recommend using the resource-specific table for log destinations that support it. [Learn more](https://learn.microsoft.com/azure/azure-monitor/essentials/resource-logs#send-to-log-analytics-workspace)
1. After configuring details for the log destination or destinations, select **Save**. 

> **Note:**
> Adding a diagnostic setting object might result in a failure if the [MinApiVersion property](https://learn.microsoft.com/dotnet/api/microsoft.azure.management.apimanagement.models.apiversionconstraint.minapiversion) of your API Management service is set to any API version higher than 2022-09-01-preview. 

> **Note:**
> To enable diagnostic settings for API Management workspaces, see [Create and manage a workspace](how-to-create-workspace.md#enable-diagnostic-settings-for-monitoring-workspace-apis).



### View Azure Monitor log data

Depending on the log destination you choose, it can take a few minutes for data to appear.

#### View logs in Log Analytics workspace


If you enable collection of logs or metrics in a Log Analytics workspace, it can take a few minutes for data to appear in Azure Monitor and the Azure Monitor-based dashboard for API Management (**Monitoring** > **Analytics** blade).

To view the data:

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left menu, under **Monitoring**, select **Logs**.
1. Run queries to view the data. Several [sample queries](https://learn.microsoft.com/azure/azure-monitor/logs/queries) are provided, or run your own. For example, the following query retrieves the most recent 24 hours of data from the ApiManagementGatewayLogs table:

    ```kusto
    ApiManagementGatewayLogs
    | where TimeGenerated > ago(1d) 
    ```
    Screenshot of querying ApiManagementGatewayLogs table in the portal.


#### View logs in storage account

If you send logs to a storage account, you can access the data in the Azure portal and download it for analysis.

1. In the [Azure portal](https://portal.azure.com), navigate to the storage account destination.
1. In the left menu, select **Storage Browser**.
1. Under **Blob containers**, select a name for the log data, for example, **insights-logs-developerportalauditlogs** for developer portal usage logs.
1. Navigate to the container for the logs in your API Management instance. The logs are partitioned in intervals of 1 hour.
1. To retrieve the data for further analysis, select **Download**.

### Modify API logging settings


When you use the portal to create a diagnostic setting to enable collection of API Management gateway or generative AI gateway (LLM) logs, logging is enabled with default settings. Default settings do not include details of requests or responses such as request or response bodies. You can adjust the logging settings for all APIs, or override them for individual APIs. For example, adjust the sampling rate or the verbosity of the gateway log data, enable logging of LLM request or response messages, or disable logging for some APIs.

For details about the logging settings, see the [Diagnostic - Create or Update](https://learn.microsoft.com/rest/api/apimanagement/diagnostic/create-or-update) and the [API diagnostic - Create or Update](https://learn.microsoft.com/rest/api/apimanagement/api-diagnostic/create-or-update) REST API reference pages.

To configure logging settings for all APIs:

1. In the left menu of your API Management instance, select **APIs** > **APIs** > **All APIs**.
1. Select the **Settings** tab from the top bar.
1. Scroll down to the **Diagnostic Logs** section, and select the **Azure Monitor** tab.
1. Review the settings and make changes if needed. Select **Save**. 

To configure logging settings for a specific API:

1. In the left menu of your API Management instance, select **APIs** > **APIs** and then the name of the API.
1. Select the **Settings** tab from the top bar.
1. Scroll down to the **Diagnostic Logs** section, and select the **Azure Monitor** tab.
1. Review the settings and make changes if needed. Select **Save**. 


> **Important:**
> API Management enforces a 32 KB limit for the size of log entries sent to Azure Monitor. The behavior when a log entry exceeds the limit depends on the log category and the data attributes that are logged:
> * **API Management gateway logs** - Logged request or response payloads in a log entry, if collected, can be up to 8,192 bytes each. If the combined size of all attributes in an entry exceeds 32 KB, API Management trims the entry by removing all body and trace content. 
> * **Generative AI gateway logs** - LLM request or response messages up to 32 KB in size, if collected, are sent in a single entry. Messages larger than 32 KB are split and logged in 32 KB chunks with sequence numbers for later reconstruction. Request messages and response messages can't exceed 2 MB each.


[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-tools.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)


### Visualize API Management monitoring data using a Managed Grafana dashboard

You can use [Azure Managed Grafana](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/index.yml) to visualize API Management monitoring data that is collected into a Log Analytics workspace. Use a prebuilt [API Management dashboard](https://grafana.com/grafana/dashboards/16604-azure-api-management) for real-time visualization of logs and metrics collected from your API Management instance.

- [Learn more about Azure Managed Grafana](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/overview.md)
- [Learn more about observability in Azure API Management](observability.md)

On your API Management instance:

- To visualize resource logs and metrics for API Management, configure [diagnostic settings](api-management-howto-use-azure-monitor.md#resource-logs) to collect resource logs and send them to a Log Analytics workspace.
- To visualize detailed data about requests to the API Management gateway, [integrate](api-management-howto-app-insights.md) your API Management instance with Application Insights.

  > **Note:**
  > To visualize data in a single dashboard, configure the Log Analytics workspace for the diagnostic settings and the Application Insights instance in the same resource group as your API Management instance.

On your Managed Grafana workspace:

- To create a Managed Grafana instance and workspace, see the quickstart for the [portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/quickstart-managed-grafana-portal.md) or the [Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/quickstart-managed-grafana-cli.md).
- The Managed Grafana instance must be in the same subscription as the API Management instance.
- When created, the Grafana workspace is automatically assigned a Microsoft Entra managed identity, which is assigned the Monitor Reader role on the subscription. This approach gives you immediate access to Azure Monitor from the new Grafana workspace without needing to set permissions manually. Learn more about [configuring data sources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/how-to-data-source-plugins-managed-identity.md) for Managed Grafana.

First import the [API Management dashboard](https://grafana.com/grafana/dashboards/16604-azure-api-management) to your Management Grafana workspace.

To import the dashboard:

1. Go to your Azure Managed Grafana workspace. In the portal, on the **Overview** page of your Managed Grafana instance, select the **Endpoint** link. 
1. In the Managed Grafana workspace, go to **Dashboards** > **Browse** > **Import**.
1. On the **Import** page, under **Import via grafana.com**, enter *16604* and select **Load**. 
1. Select an **Azure Monitor data source**, review or update the other options, and select **Import**.

To use the API Management dashboard:

1. In the Managed Grafana workspace, go to **Dashboards** > **Browse** and select your API Management dashboard.
1. In the dropdowns at the top, make selections for your API Management instance. If configured, select an Application Insights instance and a Log Analytics workspace.  

Review the default visualizations on the dashboard, which appears similar to the following screenshot:

Screenshot of API Management dashboard in Managed Grafana workspace.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-export-data.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-kusto.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-alerts-part-one.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

To see how to set up an alert rule in Azure API Management, see [Set up an alert rule](api-management-howto-use-azure-monitor.md#set-up-an-alert-rule).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-alerts-part-two.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/azmon-horz-advisor.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/monitor-api-management.md)

## Related content

- [API Management monitoring data reference](monitor-api-management-reference.md)
- [Tutorial: Monitor published APIs](api-management-howto-use-azure-monitor.md)
- [Monitoring Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource)
