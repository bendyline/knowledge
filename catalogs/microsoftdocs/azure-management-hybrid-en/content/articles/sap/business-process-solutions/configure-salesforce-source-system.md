---
title: Configure a Salesforce Source System
description: Learn how to configure Salesforce as a source system in Business Process Solutions, which includes following prerequisites, creating a Salesforce connection, and setting up the source system.
author: mohitmakhija1
ms.service: sap-on-azure
ms.subservice: center-sap-solutions
ms.topic: how-to
ms.date: 11/07/2025
ms.author: momakhij
---

# Configure a Salesforce source system

This article shows you how to configure a Salesforce source system in Business Process Solutions. To set up your Azure environment, follow the steps in the prerequisites in [Configure an SAP source system with Azure Data Factory](configure-source-system-with-data-factory.md#prerequisites). This article also shows you how to set up the connection in your Business Process Solutions item.

## Prerequisites

Before you create a source system for Salesforce, follow these steps to create a connection to the Salesforce system from Microsoft Fabric:

1. To create a new connection, go to your workspace and select the **Settings** toolbar button in the upper-right corner of the page.
1. Select **Manage connections and gateways**.

   Screenshot that shows the Manage connections and gateways page.

1. Select **New**.

   Screenshot that shows the New button.

1. In the **New connection** input area, select the type as **Cloud**.
1. Enter the inputs for the fields:

   - **Connection name**: Enter the name.
   - **Connection type**: Select **Salesforce**.
   - **Login server**: Enter the URL.
   - **Class info**: Enter **object**.
   - **Authentication method**: Select **OAuth**. Select **Edit credentials** to enter the user name and password for the connection.

   Screenshot that shows how to enter Salesforce connection details.

1. Select **Create** to create the connection.
1. After the connection is created, open the connection, copy the connection ID, and keep it handy.

## Configure a Salesforce source system

To configure your source system, follow these steps:

1. On the home screen, select **Configure source system**.

   Screenshot that shows the Configure source system button.

1. Select **New source system**.

   Screenshot that shows the New source system button.

1. Enter the required field inputs in **System connection**:

   - **Fabric SQL database**: Enter the connection ID.
   - **Salesforce**: Enter the connection ID.
1. Select **Create** to begin deployment.

   Screenshot that shows the source system details input form.

1. Monitor the deployment status by using the refresh button to refresh the page.

   Screenshot that shows the deployment status monitoring view.

1. After the deployment is finished, you can see the resources deployed to your workspace.

## Next step

>
>[Run extraction and data processing in Business Process Solutions](run-extraction-data-processing.md#salesforce-data-extraction-and-processing)
