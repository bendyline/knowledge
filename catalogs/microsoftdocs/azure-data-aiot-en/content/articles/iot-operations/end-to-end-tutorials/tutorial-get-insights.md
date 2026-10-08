---
title: "Tutorial: Get insights from your processed data"
description: "Tutorial: Use a Real-Time Dashboard to capture insights from the OPC UA data you sent to Event Hubs."
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.subservice: azure-data-flows
ms.topic: tutorial
ms.date: 06/19/2026
ms.custom:
  - ignite-2023
  - sfi-image-nochange

#CustomerIntent: As an OT user, I want to create a visual report for my processed OPC UA data that I can use to analyze and derive insights from it.
---

# Tutorial: Get insights from your processed data


In this article, you create a [real-time dashboard](https://learn.microsoft.com/fabric/real-time-intelligence/dashboard-real-time-create) to capture insights from the OPC UA data that you sent to Event Hubs in the previous article. By using Microsoft Fabric Real-Time Intelligence, you bring your data from Event Hubs into Microsoft Fabric and map it into a KQL database that can be a source for real-time dashboards. Then, you build a dashboard to display that data in visual tiles that capture insights and show the values over time.


These operations are the last steps in the sample end-to-end experience, which goes from deploying Azure IoT Operations at the edge through getting insights from that device data in the cloud.


## Prerequisites

Before you begin this tutorial, complete [Tutorial: Send messages from assets to the cloud using a data flow](tutorial-upload-messages-to-cloud.md).


You also need the following Fabric resources:

- A Microsoft Fabric subscription. In your subscription, you need access to a workspace with **Contributor** or higher permissions.
- A Microsoft Fabric tenant that allows the creation of real-time dashboards. Your tenant administrator can enable this setting. For more information, see [Enable tenant settings in the admin portal](https://learn.microsoft.com/fabric/real-time-intelligence/dashboard-real-time-create#enable-tenant-settings-in-the-admin-portal).


## What problem will we solve?


When your OPC UA data arrives in the cloud, you can analyze a wealth of information. Organize the data and create reports with graphs and visualizations to gain insights. This article shows you how to connect the data to Real-Time Intelligence and create a real-time dashboard.


## Ingest data into Real-Time Intelligence

In this section, you set up a Microsoft Fabric *eventstream* to connect your event hub to a KQL database in Real-Time Intelligence. This process includes setting up a data mapping to transform the payload data from its JSON format to columns in KQL.

### Create an eventstream

In this section, you create an eventstream that will be used to bring your data from Event Hubs into Microsoft Fabric Real-Time Intelligence, and eventually into a KQL database.

Start by navigating to the [Real-Time Intelligence experience in Microsoft Fabric](https://app.fabric.microsoft.com/home?experience=fabric-developer) and opening your Fabric workspace.

Follow the steps in [Create an eventstream in Microsoft Fabric](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/create-manage-an-eventstream) to create a new eventstream resource in your workspace.

After the eventstream is created, you'll see the main editor where you can start building the eventstream.

### Add event hub as a source

Next, add your event hub from the previous tutorial as a data source for the eventstream.

Follow the steps in [Add Azure Event Hubs source to an eventstream](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/add-source-azure-event-hubs?pivots=standard-capabilities#add-an-azure-event-hub-as-a-source) to add the event source. Keep the following notes in mind:

- You'll be creating a new cloud connection with Shared Access Key authentication.
    - Make sure local authentication is enabled on your event hub. You can set this from its Overview page in the Azure portal.
- For **Consumer group**, use the default selection (*$Default*).
- For **Data format**, choose *Json* (it might be selected already by default).

After completing this flow, the Azure event hub is visible in the eventstream live view as a source.

Screenshot of the eventstream with an AzureEventHub source.

#### Verify data flow

Follow these steps to check your work so far, and make sure data is flowing into the eventstream.

1. Start your cluster where you deployed Azure IoT Operations in earlier tutorials. The OPC PLC simulator you deployed with your Azure IoT Operations instance should begin running and sending data to the MQTT broker. You can verify this part of the flow using mqttui as described in [Verify data is flowing](tutorial-add-assets.md#verify-data-is-flowing).

1. Wait a few minutes for data to propagate. Then, in the eventstream live view, select the *AzureEventHub* source and refresh the **Data preview**. You should see JSON data from the simulator begin to appear in the table.

    Screenshot of the eventstream with data from the AzureEventHub source.

>**Tip:**
>If data has not arrived in your eventstream, you may want to check your event hub activity to [verify that it's receiving messages](tutorial-upload-messages-to-cloud.md#verify-data-is-flowing). This will help you isolate which section of the flow to debug.

### Prepare KQL resources

In this section, you create a KQL database in your Microsoft Fabric workspace to use as a destination for your data.

1. Follow the steps in [Create an Eventhouse](https://learn.microsoft.com/fabric/real-time-intelligence/create-eventhouse#create-an-eventhouse-1) to create a Real-Time Intelligence Eventhouse with a child KQL database. You only need to complete the section entitled **Create an Eventhouse**.

1. Next, create a table in your database. Call it *OPCUA* and use the following columns.

    | Column name | Data type |
    | --- | --- |
    | AssetId | string |
    | Temperature | decimal |
    | Timestamp | datetime |

1. After the *OPCUA* table has been created, select your database and use the **Query with code** button to open a query window.

    Screenshot showing the Explore your data button.

1. Delete the existing code and run the following KQL query to create a data mapping for your table. The data mapping will be called *opcua_mapping*.

    ```kql
    .create table ['OPCUA'] ingestion json mapping 'opcua_mapping' '[{"column":"AssetId", "Properties":{"Path":"$[\'AssetId\']"}},{"column":"Temperature", "Properties":{"Path":"$[\'ThermostatTemperatureF\']"}},{"column":"Timestamp", "Properties":{"Path":"$[\'EventProcessedUtcTime\']"}}]'
    ```

### Add data table as a destination

Next, return to your eventstream view, where you can add your new KQL table as an eventstream destination.

Follow the steps in [Add a KQL Database destination to an eventstream](https://learn.microsoft.com/fabric/real-time-intelligence/event-streams/add-destination-kql-database?pivots=standard-capabilities#direct-ingestion-mode) to add the destination. Keep the following notes in mind:

- Use direct ingestion mode.
- On the **Configure** step, select the *OPCUA* table that you created earlier.
- On the **Inspect** step, select **opcua_mapping**, select **Existing mapping**, and choose *opcua_mapping*.

    Screenshot adding an existing mapping.

    >**Tip:**
    >If no existing mappings are found, try refreshing the eventstream editor and restarting the steps to add the destination. Alternatively, you can initiate this same configuration process from the KQL table instead of from the eventstream, as described in [Get data from Eventstream](https://learn.microsoft.com/fabric/real-time-intelligence/get-data-eventstream).

After completing this flow, the KQL table is visible in the eventstream live view as a destination.

Wait a few minutes for data to propagate and for the status of the destination to change to **Active**. You should see data from the event hub begin to appear in the preview. If data doesn't show up in the preview, wait a few minutes longer and refresh the preview again.

Screenshot of the eventstream with data in the KQL database destination.

If you want, you can also view and query this data in your KQL database directly.

Screenshot of the same data being queried from the KQL database.

## Create a Real-Time Dashboard

In this section, you'll create a new [Real-Time Dashboard](https://learn.microsoft.com/fabric/real-time-intelligence/dashboard-real-time-create) to visualize your tutorial data. The dashboard will allow filtering by asset ID and timestamp, and will display visual summaries of temperature data.

>**Note:**
>You can only create Real-Time Dashboards if your tenant admin has enabled the creation of Real-Time Dashboards in your Fabric tenant. For more information, see [Enable tenant settings in the admin portal](https://learn.microsoft.com/fabric/real-time-intelligence/dashboard-real-time-create#enable-tenant-settings-in-the-admin-portal).

### Create dashboard and connect data source

Follow the steps in the [Create a new dashboard](https://learn.microsoft.com/fabric/real-time-intelligence/dashboard-real-time-create#create-a-new-dashboard) section to create a new Real-Time Dashboard from the Real-Time Intelligence capabilities.

Then, follow the steps in the [Add data source](https://learn.microsoft.com/fabric/real-time-intelligence/dashboard-real-time-create#add-data-source) section to add your database as a data source. Keep the following note in mind:

- In the **Data sources** pane, your database will be under **Eventhouse/KQL Database**.

### Configure parameters

Next, configure some parameters for your dashboard so that the visuals can be filtered by asset ID and timestamp. The dashboard comes with a default parameter to filter by time range, so you only need to create one that can filter by asset ID.

1. Switch to the **Manage** tab, and select **Parameters**. Select **+ Add** to add a new parameter.

    Screenshot of adding a parameter to a dashboard.

1. Create a new parameter with the following characteristics:
    * **Label**: *Asset*
    * **Parameter type**: *Single selection* (already selected by default)
    * **Variable name**: *_asset*
    * **Data type**: *string* (already selected by default)
    * **Source**: *Query*
        * **Data source**: Your database (already selected by default)
        * Select **Edit query** and add the following KQL query.

            ```kql
            OPCUA
            | summarize by AssetId
            ```
    * **Value column**: *AssetId*
    * **Default value**: *Select first value of query*

1. Select **Done** to save your parameter. Then select **Close** to close the parameters pane.

### Create line chart tile

Next, add a tile to your dashboard to show a line chart of temperature over time for the selected asset and time range.

1. On the **Home** tab, select the **Add visual** drop-down and then select **Line chart** to add a new line chart tile.

    Screenshot of adding a line chart tile to a dashboard.

1. In the **Query editor**, enter the following KQL query for the tile. This query applies filter parameters from the dashboard selectors for time range and asset, and pulls the resulting records with their timestamp and temperature.

    ```kql
    OPCUA 
    | where Timestamp between (_startTime.._endTime)
    | where AssetId == _asset
    | project Timestamp, Temperature
    ```

    **Run** the query to verify that data can be found. The line chart visual displays the data. The line chart visual requires at least two data points to display, so, if you don't see any data, you may want to select a wider time range or wait for more data to arrive in your database before running the query.

    Screenshot of adding a tile query.

1. Select the **Visualization** tab and set or verify the following values:

    - **Visual type**: *Line chart* (default selection)
    - **General**:
        - **Tile name**: *Temperature over time*
    - **Data**:
        - **Y columns**: *Infer: Temperature (decimal)* (default selection)
        - **X columns**: *Infer: Timestamp (datetime)* (default selection)
    - **Y Axis**:
        - **Label**: *Units*
    - **X Axis**:
        - **Label**: *Timestamp*

    Select **Done** to create the tile.

    Screenshot of adding a tile visual.

View the finished tile on your dashboard.

Screenshot of the dashboard with one tile.

### Create max value tile

Next, create a tile to display the maximum value of temperature.

1. Select the **Add visual** drop-down and then select **Stat**.

1. In the **Query editor**, enter the following KQL query for the tile. This query applies filter parameters from the dashboard selectors for time range and asset, and takes the highest temperature value from the resulting records.

    ```kql
    OPCUA
    | where Timestamp between (_startTime.._endTime)
    | where AssetId == _asset
    | top 1 by Temperature desc
    | summarize by Temperature
    ```

    **Run** the query to verify that a maximum temperature can be found. The maximum temperature value should display in the visual preview.

1. Select the **Visualization** tab and set or verify the following values:
    - **Visual type**: *Stat* (default selection)
    - **General**:
        - **Tile name**: *Max temperature*
    - **Data**:
        - **Value column**: *Infer: Temperature (decimal)* (default selection)

    Select **Done** to create the tile.

    Screenshot of adding a stat visual.

1. View the finished tile on your dashboard (you may want to resize the tile so the full text is visible).

    Screenshot of the dashboard with two tiles.

1. **Save** your completed dashboard.

Now you have a dashboard that displays different types of visuals for the asset data in these tutorials. From here, you can experiment with the filters and adding other tile types to see how a dashboard can enable you to do more with your data.

## How did we solve the problem?

In this tutorial, you used an eventstream to ingest your Event Hubs data into a KQL database in Microsoft Fabric Real-Time Intelligence. Then, you created a Real-Time Dashboard powered by that data, which visually tracks changing values over time. By relating edge data from various sources together in Microsoft Fabric, you can create reports with visualizations and interactive features that offer deeper insights into asset health, utilization, and operational trends. This can empower you to enhance productivity, improve asset performance, and drive informed decision-making for better business outcomes.

This completes the final step in the tutorial flow for using Azure IoT Operations to manage device data from deployment through analysis in the cloud.

## Clean up resources

If you're continuing on to the next tutorial, keep all of your resources.


If you want to remove the Azure IoT Operations deployment but keep your cluster, use the [az iot ops delete](https://learn.microsoft.com/cli/azure/iot/ops#az-iot-ops-delete) command:

   ```azurecli
  az iot ops delete --name $AIO_INSTANCE_NAME --resource-group $RESOURCE_GROUP
   ```

If you want to delete all the resources you created for this quickstart, delete the Kubernetes cluster where you deployed Azure IoT Operations and then remove the Azure resource group that contained the cluster.


> **Note:**
> The resource group contains the Event Hubs namespace you created in this tutorial.

You can also delete your Microsoft Fabric workspace and/or all the resources within it associated with this tutorial, including the eventstream, Eventhouse, and Real-Time Dashboard.
