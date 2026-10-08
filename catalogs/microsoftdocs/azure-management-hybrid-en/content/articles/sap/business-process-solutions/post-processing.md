---
title: Post-processing in Business Process Solutions
titleSuffix: SAP on Azure
description: Learn how to import lakehouse views, reset checkpoints for delta tables, and configure semantic model refresh in Business Process Solutions.
author: ritikesh-vali
ms.service: sap-on-azure
ms.subservice: center-sap-solutions
ms.topic: how-to
ms.date: 04/07/2026
ms.author: tpounjula
---

# Post-processing in Business Process Solutions

After you deploy insights, complete these post-processing tasks to import lakehouse views, reset checkpoints for delta tables, and configure semantic model refresh.

## Connection for Semantic Model Refreshes

To refresh the semantic model automatically through pipelines, set up a connection in Microsoft Fabric.

1. Open the semantic model item. Select **File** > **Settings**.
   Screenshot showing how to open the semantic model settings.
2. Open **Gateway and cloud connections**. Under **Cloud connections**, select **Create a connection**.
3. Enter a unique name for your connection. Multiple reports can use this connection. Select **OAuth 2.0** as the authentication method.
   Screenshot showing how to create a Microsoft Fabric lakehouse connection.
4. Select **Edit credentials**. Provide the credentials. Then select **Create**.
5. After the connection is created, return to the semantic model. Associate the connection.
   Screenshot showing how to associate a connection to the semantic model.
6. Refresh the semantic model. Confirm that it completes successfully.

## Import Lakehouse Views

Some insights require SQL views on top of the lakehouse. To deploy these views, run the provided notebook from your workspace:

1. Go to your workspace.
2. Open the notebook **bps_gold_view_creation**.
   Screenshot showing how to open the bps_gold_view_creation notebook.
3. Select **Run all**.
   Screenshot showing how to run the bps_gold_view_creation notebook.
4. When the notebook run finishes, you see the SQL views in your gold lakehouse.

## Reset checkpoint for Delta tables

If you need to reinitialize delta extraction for a table, you can reset its checkpoint from the dataset explorer.

1. In **Datasets**, navigate to the dataset you want and select the delta table.
2. Select the ellipsis (**...**) next to the table, and then select **Reset Checkpoint**.
   Screenshot showing the table actions menu with the Reset Checkpoint option selected for a delta table.
3. Confirm that the notification appears showing that the checkpoint reset is in progress.
   Screenshot showing the Resetting checkpoint notification for the selected table.
4. Verify that the success notification appears after the operation completes.
   Screenshot showing the Successfully reset checkpoint notification for the selected table.
5. Rerun the relevant extraction or processing pipeline if you want to reload the table after the checkpoint reset.

## Monitoring and troubleshooting

### Semantic model refresh fails

If the semantic model refresh fails, a required table or column might be missing or incorrectly configured in the Gold lakehouse.

To troubleshoot this issue, follow these steps:

1. Refresh the semantic model and review the refresh log for errors.
1. If a view is missing, refer to the [Import lakehouse views](#import-lakehouse-views) section and run the notebook manually. Confirm that the required views are created in the Gold lakehouse.
1. If a table is missing, check the Bronze, Silver, and Gold lakehouses in that order to identify where the table is missing.
1. If a column is missing, check the table schema in the Gold lakehouse. If the column isn't present, check the Silver and Bronze lakehouses to identify where it was lost.
1. If the column isn't present in the source system, download the Power BI report and refresh the table schema in Power BI. Then refresh the report.

## Summary

This article describes the post-processing tasks for insights in Business Process Solutions. You learn how to import lakehouse views, reset checkpoints for delta tables, and configure a connection for semantic model refresh.
