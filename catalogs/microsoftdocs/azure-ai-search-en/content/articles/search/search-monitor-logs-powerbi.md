---
title: Visualize Logs and Metrics with Power BI
description: Visualize Azure AI Search logs and metrics with Power BI.
author: mattwojo
ms.author: mattwoj
ms.reviewer: gimondra
ms.service: azure-ai-search
ms.custom:
  - ignite-2023
ms.topic: how-to
ms.date: 07/21/2026
ms.update-cycle: 365-days
ai-usage: ai-assisted
---

# Visualize Azure AI Search logs and metrics with Power BI


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


Azure AI Search can send operation logs and service metrics to an Azure Storage account, which can then be visualized in Power BI. This article explains the steps and how to use a Power BI template app to visualize the data. The template covers information about queries, indexing, operations, and service metrics.

> **Note:**
> The Power BI template is currently listed with the legacy product name Azure Cognitive Search in AppSource and in-app report labels.

## Set up logging and install the template

1. Enable metric and resource logging for your search service:

    1. Create or identify an existing [Azure Storage account](https://learn.microsoft.com/azure/storage/common/storage-account-create) where you can archive the logs.
    1. Go to your search service in the [Azure portal](https://portal.azure.com).
    1. Under Monitoring, select **Diagnostic settings**.
    1. Select **Add diagnostic setting**.
    1. Check **Archive to a storage account**, provide your storage account information, and check **OperationLogs** and **AllMetrics**.
    1. Select **Save**.

1. Once logging is enabled, logs and metrics are generated as you use the search service. It can take up to an hour before logged events show up in Azure Storage. Look for an **insights-logs-operationlogs** container for operations and an **insights-metrics-pt1m** container for metrics. Check your storage account for these containers to make sure you have data to visualize.

1. Find the Power BI app template in the [Power BI Apps marketplace](https://appsource.microsoft.com/en-us/product/power-bi/azurecognitivesearch.azurecognitivesearchlogsandmetrics?tab=Overview) and install it into a new workspace or an existing workspace. The template is listed as **Azure Cognitive Search: Analyze Logs and Metrics**.

1. After installing the template, select it from your list of apps in Power BI.

    Screenshot showing the Power BI template app tile with the legacy Azure Cognitive Search name.

1. Select **Connect your data**.

    Screenshot showing how to connect to your data in the Power BI template app.

1. Provide the name of the storage account that contains your logs and metrics. By default, the app looks at the last 10 days of data, but this value can be changed with the **Days** parameter.

    Screenshot showing how to enter the storage account name and number of days in the Connect to your data page.

1. Select **Key** as the authentication method and provide your storage account key. Select **None** or **Private** as the privacy level. Select **Sign In** to begin the loading process.

    Screenshot showing how to set authentication method, account key, and privacy level in the connection page.

1. Wait for the data to refresh. This might take some time depending on how much data you have. You can see if the data is still being refreshed based on the below indicator.

    Screenshot showing how to read the information on the data refresh page.

1. Select **Azure Cognitive Search Report** (legacy report name) to view the report.

    Screenshot showing how to select the report on the data refresh page.

1. Refresh the page after opening the report so that it opens with your data.

    Screenshot of the Power BI report.

## Modify app parameters

If you want to visualize data from a different storage account or change the number of days of data to query, follow these steps to change the **Days** and **StorageAccount** parameters.

1. Navigate to your Power BI apps, find your search app, and select the **Edit** action to continue to the workspace.

1. Select **Settings** from the Dataset options.

    Screenshot showing how to select Settings from the dataset options in the Power BI workspace.

1. While in the Datasets tab, change the parameter values and select **Apply**. If there's an issue with the connection, update the data source credentials on the same page.

1. Navigate back to the workspace and select **Refresh now** from the Dataset options.

    Screenshot showing how to select the Refresh Now option.

1. Open the report to view the updated data. You might also need to refresh the report to view the latest data.

## Troubleshooting report issues

If you can't see your data, try these troubleshooting steps:

1. Open the report and refresh the page to make sure you're viewing the latest data. There's an option in the report to refresh the data. Select this to get the latest data.

1. Ensure the storage account name and access key you provided are correct. The storage account name should correspond to the account configured with your search service logs.

1. Confirm that your storage account contains the containers **insights-logs-operationlogs** and **insights-metrics-pt1m**, and that each container has data. The logs and metrics are nested in multiple folder levels.

1. Check to see if the dataset is still refreshing. The refresh status indicator is shown in step 8 above. If it's still refreshing, wait until the refresh is complete to open and refresh the report.

## Next steps

+ [Monitor search operations and activity](https://learn.microsoft.com/azure/search/monitor-azure-cognitive-search)
+ [What is Power BI?](https://learn.microsoft.com/power-bi/fundamentals/power-bi-overview)
+ [Basic concepts for designers in the Power BI service](https://learn.microsoft.com/power-bi/service-basic-concepts)
