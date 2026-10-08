---
title: Process data using Stream Analytics
description: This article shows you how to process data from your Azure event hub using an Azure Stream Analytics job. 
ms.date: 06/26/2024
ms.topic: how-to
#customer intent: As a developer, I want to know how process event data in an event hub using an Azure Stream Analytics job. 
---


# Process data from your event hub using Azure Stream Analytics 
The Azure Stream Analytics service makes it easy to ingest, process, and analyze streaming data from Azure Event Hubs, enabling powerful insights to drive real-time actions. You can use the Azure portal to visualize incoming data and write a Stream Analytics query. Once your query is ready, you can move it into production in only a few clicks. 

## Key benefits
Here are the key benefits of Azure Event Hubs and Azure Stream Analytics integration: 

- **Preview data** – You can preview incoming data from an event hub in the Azure portal.
- **Test your query** – Prepare a transformation query and test it directly in the Azure portal. For the query language syntax, see [Stream Analytics Query Language](https://learn.microsoft.com/stream-analytics-query/built-in-functions-azure-stream-analytics) documentation.
- **Deploy your query to production** – You can deploy the query into production by creating and starting an Azure Stream Analytics job.

## End-to-end flow

> **Important:**
> - If you aren't a member of [owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#owner) or [contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#contributor) roles at the Azure subscription level, you must be a member of the [Stream Analytics Query Tester](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#stream-analytics-query-tester) role at the Azure subscription level to successfully complete steps in this section. This role allows you to perform testing queries without creating a stream analytics job first. For instructions on assigning a role to a user, see [Assign AD roles to users](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/manage-roles-portal.md).
> - If your event hub allows only the private access via private endpoints, you must have the Stream Analytics job joined to the same network so that the job can access events in the event hub. 

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Navigate to your **Event Hubs namespace** and then navigate to the **event hub**, which has the incoming data. 
1. On the left navigation menu, expand **Features**, and select **Process data**, and then select **Start** on the **Enable real time insights from events** tile. 

    Screenshot showing the Process data page with Enable real time insights from events tile selected.
1. You see a query page with values already set for the following fields. If you see a popup window about a consumer group and a policy being created for you, select **OK**. You immediately see a snapshot of the latest incoming data in this tab.
    1. Your **event hub** as an input for the query.
    1. Sample **SQL query** with SELECT statement. 
    1. An **output** alias to refer to your query test results. 

        Screenshot showing the Query editor for your Stream Analytics query.

    - The serialization type in your data is automatically detected (JSON/CSV). You can manually change it as well to JSON/CSV/AVRO.
    - You can preview incoming data in the table format or raw format. 
    - If your data shown isn't current, select **Refresh** to see the latest events. 
    - In the preceding image, the results are shown in the table format. To see the raw data, select **Raw** 
    
        Screenshot of the Input preview window in the result pane of the Process data page in the raw format.
1. Select **Test query** to see the snapshot of test results of your query in the **Test results** tab. You can also download the results.

    Screenshot of the Input preview window in the result pane with test results.

    Write your own query to transform the data. See [Stream Analytics Query Language reference](https://learn.microsoft.com/stream-analytics-query/stream-analytics-query-language-reference).
1. Once you tested the query and you want to move it in to production, select **Create Stream Analytics job**. 

    Screenshot of the Query page with the Create Stream Analytics job link selected.
1. On the **New Stream Analytics job** page, follow these steps: 
    1. Specify a **name** for the job.
    1. Select your **Azure subscription** where you want the job to be created.
    1. Select the **resource group** for the Stream Analytics job resource.
    1. Select the **location** for the job.
    1. For the **Event Hubs policy name**, create a new policy or select an existing one.
    1. For the **Event Hubs consumer group**, create a new consumer group or select an existing consumer group.
    1. Select **Create** to create the Stream Analytics job. 

        Screenshot showing the New Stream Analytics job window.

        > **Note:** 
        >  We recommend that you create a consumer group and a policy for each new Azure Stream Analytics job that you create from the Event Hubs page. Consumer groups allow only five concurrent readers, so providing a dedicated consumer group for each job will avoid any errors that might arise from exceeding that limit. A dedicated policy allows you to rotate your key or revoke permissions without impacting other resources. 
1. Your Stream Analytics job is now created where your query is the same that you tested, and input is your event hub. 

    Screenshot showing the Stream Analytics job page with a link to add an output.
9.	Add an [output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/stream-analytics-define-outputs.md) of your choice. 
1. Navigate back to Stream Analytics job page by clicking the name of the job in breadcrumb link. 
1. Select **Edit query** above the **Query** window.
1. Update `[OutputAlias]` with your output name, and select **Save query** link above the query. Close the Query page by selecting X in the top-right corner.  
1. Now, on the Stream Analytics job page, select **Start** on the toolbar to start the job.

    Screenshot of the Start job window for a Stream Analytics job.


## Access
**Issue** : User can't access preview data because they don’t have right permissions on the Subscription.

Option 1: The user who wants to preview incoming data needs to be added as a Contributor on Subscription.

Option 2: The user needs to be added as Stream Analytics Query tester role on Subscription. Navigate to Access control for the subscription. Add a new role assignment for the user as "Stream Analytics Query Tester" role.

Option 3: The user can create Azure Stream Analytics job. Set input as this event hub and navigate to "Query" to preview incoming data from this event hub.

Option 4: The admin can create a custom role on the subscription. Add the following permissions to the custom role and then add user to the new custom role.

Screenshots showing Microsoft.StreamAnalytics permissions page.


## Streaming units
Your Azure Stream Analytics job defaults to three streaming units (SUs). To adjust this setting, select **Scale** on the left menu in the **Stream Analytics job** page in the Azure portal. To learn more about streaming units, see [Understand and adjust Streaming Units](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/stream-analytics-streaming-unit-consumption.md).


Screenshots showing the Scale page for a Stream Analytics job.

[Include unavailable in this source snapshot: ../stream-analytics/includes/geo-replication-stream-analytics-job.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/process-data-azure-stream-analytics.md)

## Related content
To learn more about Stream Analytics queries, see [Stream Analytics Query Language](https://learn.microsoft.com/stream-analytics-query/built-in-functions-azure-stream-analytics)
