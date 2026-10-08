---
title: Tutorial - Monitor APIs in Azure API Management | Microsoft Docs
description: Learn how to use metrics, alerts, activity logs, and resource logs to monitor your APIs in Azure API Management.
services: api-management

ms.service: azure-api-management
ms.topic: tutorial
ms.date: 07/09/2025
ms.custom:
  - engagement-fy23
  - devdivchpfy22
  - build-2025
  - sfi-image-nochange
---
# Tutorial: Monitor published APIs

**APPLIES TO: All API Management tiers**



With Azure Monitor, you can visualize, query, route, archive, and take actions on the metrics or logs coming from your Azure API Management service. For an overview of Azure Monitor for API Management, see [Monitor API Management](monitor-api-management.md).

> **Tip:**
> API teams can use this feature in [workspaces](workspaces-overview.md). Workspaces provide isolated administrative access to APIs and their own API runtime environments.

In this tutorial, you learn how to:

> 
> * View metrics of your API
> * Set up an alert rule
> * View activity logs
> * Enable and view resource logs

> **Note:**
> API Management supports a range of additional tools to observe APIs, including [built-in analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/howto-use-analytics.md) and integration with [Application Insights](api-management-howto-app-insights.md). [Learn more](observability.md)
> 
## Prerequisites

+ Learn the [Azure API Management terminology](api-management-terminology.md).
+ Complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md).
+ Also, complete the following tutorial: [Import and publish your first API](import-and-publish.md).

## View metrics of your APIs

API Management emits [metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics) every minute, giving you near real-time visibility into the state and health of your APIs. The following are the most frequently used metrics. For a list of all available metrics, see [Metrics](monitor-api-management-reference.md#metrics).

* **Capacity** - helps you make decisions about upgrading/downgrading your API Management services. The metric is emitted per minute and reflects the estimated gateway capacity at the time of reporting. The metric ranges from 0-100 calculated based on gateway resources such as CPU and memory utilization and other factors.

    > **Tip:**
    > In the [v2 service tiers](v2-service-tiers-overview.md) and in [workspace gateways](workspaces-overview.md#workspace-gateway), API Management has replaced the gateway capacity metric with separate CPU and memory utilization metrics. These metrics can also be used for scaling decisions and troubleshooting. [Learn more](api-management-capacity.md)

* **Requests** - helps you analyze API traffic going through your API Management services. The metric is emitted per minute and reports the number of gateway requests with dimensions. Filter requests by response codes, location, hostname, and errors.

> **Note:**
> The Requests metric is not available in workspaces.

> **Important:**
> The following metrics have been retired: Total Gateway Requests, Successful Gateway Requests, Unauthorized Gateway Requests, Failed Gateway Requests, Other Gateway Requests. Please migrate to the Requests metric which provides closely similar functionality.

Screenshot of Metrics in API Management Overview

To access metrics:

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance. On the **Overview** page, on the **Monitor** tab, review key metrics for your APIs.
1. To investigate metrics in detail, select **Monitoring** > **Metrics** from the left menu.

    Screenshot of Metrics item in Monitoring menu in the portal.

    > **Tip:**
    > In a workspace, you can view capacity metrics scoped to a workspace gateway. Navigate to **Monitoring** > **Metrics** in the left menu of a workspace gateway.

1. From the drop-down, select metrics you're interested in. For example, **Requests**.
1. The chart shows the total number of API calls. Adjust the time range to focus on periods of interest.
1. You can filter the chart using the dimensions of the **Requests** metric. For example, select **Add filter**, select **Backend Response Code Category**, enter `500` as the value. The chart shows the number of requests failed in the API backend.

## Set up an alert rule

You can receive [alerts](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-metric-overview) based on metrics and activity logs. In Azure Monitor, [configure an alert rule](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-create-new-alert-rule) to perform an action when it triggers. Common actions include:

* Send an email notification
* Call a webhook
* Invoke an Azure Logic App

To configure an example alert rule based on a request metric:

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. Select **Monitoring** > **Alerts** from the left menu.

    Screenshot of Alerts option in Monitoring menu in the portal.

1. Select **+ Create** > **Alert rule**.
1. On the **Condition** tab:
    1. In **Signal name**, select **Requests**.
    1. In **Alert logic**, review or modify the default values for the alert. For example, update the static **Threshold**, which is the number of occurrences after which the alert should be triggered.
    1. In **Split by dimensions**, in **Dimension name**, select **Gateway Response Code Category**.
    1. In **Dimension values**, select **4xx**, for client errors such as unauthorized or invalid requests. If the dimension value doesn't appear, select **Add custom value** and enter **4xx**.
    1. In **When to evaluate**, accept the default settings, or select other settings to configure how often the rule runs. Select **Next**.

    Screenshot of configuring alert logic in the portal.

1. On the **Actions** tab, select or create one or more *action groups* to notify users about the alert and take an action. For example, create a new action group to send a notification email to `admin@contoso.com`. For detailed steps, see [Create and manage action groups in the Azure portal](https://learn.microsoft.com/azure/azure-monitor/alerts/action-groups).

    Screenshot of configuring notifications for new action group in the portal.

1. On the **Details** tab of **Create an alert rule**, enter a name and description of the alert rule and select the severity level.
1. Optionally configure the remaining settings. Then, on the **Review + create** tab, select **Create**.
1. Optionally test the alert rule by using an HTTP client to simulate a request that triggers the alert. For example, run the following command in a terminal, substituting the API Management hostname with the hostname of your API Management instance:

    ```bash
    curl GET https://contoso.azure-api.net/non-existent-endpoint HTTP/1.1 
    ```

    An alert triggers based on the evaluation period, and it will send email to admin@contoso.com. 

    Alerts also appear on the **Alerts** page for the API Management instance.

    Screenshot of alerts in portal.

## Activity logs

Activity logs provide insight into the operations on your API Management services. Using activity logs, you can determine the "what, who, and when" for any write operations (PUT, POST, DELETE) taken on your API Management services.

> **Note:**
> Activity logs do not include read (GET) operations or operations performed in the Azure portal.

You can access activity logs in your API Management service, or access logs of all your Azure resources in Azure Monitor. 

Screenshot of activity log in portal.

To view the activity log:

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.

1. Select **Activity log**.

    Screenshot of Activity log item in Monitoring menu in the portal.
1. Select the desired filtering scope and then **Apply**.

## Resource logs

Resource logs (Azure Monitor logs) provide rich information about API Management operations and errors that are important for auditing and troubleshooting purposes. When enabled through a diagnostic setting, the logs collect information about the API requests that are received and processed by the API Management gateway.

> **Note:**
> The Consumption tier doesn't support the collection of resource logs.

> **Tip:**
> In API Management instances with [workspaces](workspaces-overview.md), federated logs across the API Management service can be accessed by the API platform team for centralized API monitoring, while workspace teams can access the logs specific to their workspace's APIs. [Learn more about Azure Monitor logging with workspaces](how-to-create-workspace.md#enable-diagnostic-settings-for-monitoring-workspace-apis)



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


 
## View logs and metrics in Azure Log Analytics


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


For more information about using resource logs for API Management, see:
* [Log Analytics tutorial](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-tutorial).
* [Overview of log queries in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/logs/log-query-overview).

## Modify API logging settings


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


## Next steps

In this tutorial, you learned how to:

> 
> * View metrics of your API
> * Set up an alert rule
> * View activity logs
> * Enable and view resource logs


Advance to the next tutorial:

> 
> [Trace calls](api-management-howto-api-inspector.md)
