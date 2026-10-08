---
title: Configure an SAP Source System with Open Mirroring
description: Learn how to configure SAP S/4HANA and SAP ECC source systems with open mirroring in Business Process Solutions, including setting up source system connections.
author: mohitmakhija1
ms.service: sap-on-azure
ms.subservice: center-sap-solutions
ms.topic: how-to
ms.date: 11/07/2025
ms.author: momakhij
---

# Configure an SAP source system with open mirroring

This article describes how to configure SAP S/4HANA and SAP ECC source systems by using open mirroring. In this scenario, Business Process Solutions processes the extracted data, and non-Microsoft tools handle data ingestion. Configure data extraction directly within the extraction solution that you chose.

## Prerequisites

### Set up a Fabric SQL Database connection

Business Process Solutions uses a Fabric SQL Database connection to read and orchestrate data processing. You must create this connection before you configure source system connections. To set up the connection, follow these steps:

1. To create a new connection, go to your workspace and select **Settings** in the upper-right corner.
1. Select **Manage connections and gateways**.

   Screenshot that shows how to open the Settings page.

1. Select **New**.

   Screenshot that shows how to create a new connection.

1. In the new connection input, select **Cloud** as the type.
1. Enter the connection name.
1. For the connection type, select **SQL database in Fabric**.
1. For the authentication method, select **OAuth** > **Edit Credentials** and enter the details.
1. Select **Create** to create the connection.

   Screenshot that shows how to enter connection details for a new connection.

1. Open the connection, copy the connection ID, and keep it handy.

   Screenshot that shows how to copy the connection ID.

### Mirror DD03ND table to mirrored database

Business Process Solutions requires the DD03ND table to correctly map SAP data types during transformation. Replicating this view is mandatory for transformations to work. You can replicate this table by using your existing mirroring solution. Set the target table name as `DD03ND` and configure the replication frequency to match your other SAP tables.

## Configure an SAP S/4 HANA source system with open mirroring

To configure your SAP S/4 HANA source system with open mirroring, follow these steps:

1. On the home screen, select **Configure source system**.

   Screenshot that shows Configure source system.

1. Select **New source system**.

   Screenshot that shows New source system.

1. Enter the inputs for the fields.

   Screenshot that shows the SAP S/4HANA input fields for source system configuration.

1. In the **System connection** section, select the name of the mirroring partner. Add the connection ID for the connection that you created in the prerequisites in [Configure an SAP source system with Data Factory](configure-source-system-with-data-factory.md#prerequisites). Select **Create** to start the deployment.

   Screenshot that shows how to enter SQL connection details.

1. Monitor the deployment status by using the refresh button to refresh the page.

   Screenshot that shows the deployment status monitoring view.

1. After the deployment is finished, you can see the resources that are deployed to your workspace.

## Configure an SAP ECC source system with open mirroring

1. On the home screen, select **Configure source system**.
     
   Screenshot that shows Configure source system.

1. Select **New source system**.

   Screenshot that shows  selecting New source system.

1. Enter the inputs for the fields.

   Screenshot that shows the SAP ECC input fields for source system configuration.

1. In the **System connection** section, select the name of the mirroring partner. Add the connection ID for the connection that you created in the prerequisites in [Configure an SAP source system with Azure Data Factory](configure-source-system-with-data-factory.md#prerequisites). Select **Create** to start the deployment.

   Screenshot that shows entering SQL connection details for open mirroring.

1. You can monitor the deployment status by using the refresh button to refresh the page.

   Screenshot that shows the deployment status monitoring view for sap ecc system.

1. After the deployment is finished, you can see the resources that are deployed to your workspace.

## Next step

>
>[Run extraction and data processing in Business Process Solutions](run-extraction-data-processing.md#sap-s4-hana-data-processing-with-open-mirroring)
