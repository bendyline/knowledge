---
title: "Quickstart: Create a serverless Apache Spark pool using the Azure portal"
description: Create a serverless Apache Spark pool using the Azure portal by following the steps in this guide.
author: ms-arali
ms.author: arali
ms.reviewer:  arali
ms.date: 03/11/2024
ms.service: azure-synapse-analytics
ms.subservice: spark
ms.topic: quickstart
ms.custom:
  - mode-ui
  - sfi-image-nochange
---

# Quickstart: Create a new serverless Apache Spark pool using the Azure portal

Azure Synapse Analytics offers various analytics engines to help you ingest, transform, model, analyze, and distribute your data. An Apache Spark pool provides open-source big data compute capabilities. After you create an Apache Spark pool in your Synapse workspace, data can be loaded, modeled, processed, and distributed for faster analytic insight.

In this quickstart, you learn how to use the Azure portal to create an Apache Spark pool in a Synapse workspace.

> **Important:**
> Billing for Spark instances is prorated per minute, whether you are using them or not. Be sure to shutdown your Spark instance after you have finished using it, or set a short timeout. For more information, see the **Clean up resources** section of this article.

If you don't have an Azure subscription, [create a free account before you begin](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Prerequisites

- You'll need an Azure subscription. If needed, [create a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- You'll be using the [Synapse workspace](quickstart-create-workspace.md).

## Sign in to the Azure portal

Sign in to the [Azure portal](https://portal.azure.com/)

## Navigate to the Synapse workspace

1. Navigate to the Synapse workspace where the Apache Spark pool will be created by typing the service name (or resource name directly) into the search bar.
    Screenshot of the Azure portal search bar with Synapse workspaces typed in.
   
1. From the list of workspaces, type the name (or part of the name) of the workspace to open. For this example, we use a workspace named **contosoanalytics**.
    Screenshot from the Azure portal of the list of Synapse workspaces filtered to show those containing the name Contoso.


## Create new Apache Spark pool

1. In the Synapse workspace where you want to create the Apache Spark pool, select **New Apache Spark pool**. 
   Screenshot from the Azure portal of a Synapse workspace with a red box around the command to create a new Apache Spark pool.

1. Enter the following details in the **Basics** tab:

    | Setting | Suggested value | Description  |
    | :--- | :--- | :--- |
    | **Apache Spark pool name** | A valid pool name, like `contosospark` | This is the name that the Apache Spark pool will have. |
    | **Node size** | Small (4 vCPU / 32 GB) | Set this to the smallest size to reduce costs for this quickstart |
    | **Autoscale** | Disabled | We don't need autoscale for this quickstart |
    | **Number of nodes** | 5 | Use a small size to limit costs for this quickstart |
    
    Screenshot from the Azure portal of the Apache Spark pool create flow - basics tab.
   
    > **Important:**
    > There are specific limitations for the names that Apache Spark pools can use. Names must contain letters or numbers only, must be 15 or less characters, must start with a letter, not contain reserved words, and be unique in the workspace.

1. Select **Next: additional settings** and review the default settings. Don't modify any default settings.
    Screenshot from the Azure portal that shows the 'Create Apache Spark pool' page with the 'Additional settings' tab selected.

1. Select **Next: tags**. Consider using Azure tags. For example, the "Owner" or "CreatedBy" tag to identify who created the resource, and the "Environment" tag to identify whether this resource is in Production, Development, etc. For more information, see [Develop your naming and tagging strategy for Azure resources](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging).
    Screenshot from the Azure portal of Apache Spark pool create flow - additional settings tab.

1. Select **Review + create**.

1. Make sure that the details look correct based on what was previously entered, and select **Create**.
    Screenshot from the Azure portal of Apache Spark pool create flow - review settings tab.

1. At this point, the resource provisioning flow will start, indicating once it's complete.
    Screenshot from the Azure portal of that shows the 'Overview' page with a 'Your deployment is complete' message displayed.

1. After the provisioning completes, navigating back to the workspace will show a new entry for the newly created Apache Spark pool.
    Screenshot from the Azure portal of Apache Spark pool create flow - resource provisioning.

1. At this point, there are no resources running, no charges for Spark, you have created metadata about the Spark instances you want to create.

## Clean up resources

The following steps delete the Apache Spark pool from the workspace.

> **Warning:**
> Deleting an Apache Spark pool will remove the analytics engine from the workspace. It will no longer be possible to connect to the pool, and all queries, pipelines, and notebooks that use this Apache Spark pool will no longer work.

If you want to delete the Apache Spark pool, do the following steps:

1. Navigate to the Apache Spark pools pane in the workspace.
1. Select the Apache Spark pool to be deleted (in this case, **contosospark**).
1. Select **Delete**.
    Screenshot from the Azure portal of a list of Apache Spark pools, with the recently created pool selected.
1. Confirm the deletion, and select **Delete** button.
    Screenshot from the Azure portal of the Confirmation dialog to delete the selected Apache Spark pool.
1. When the process completes successfully, the Apache Spark pool will no longer be listed in the workspace resources.

## Related content

- [Quickstart: Create a serverless Apache Spark pool in Azure Synapse Analytics using web tools](quickstart-apache-spark-notebook.md)
- [Quickstart: Create a dedicated SQL pool using the Azure portal](quickstart-create-sql-pool-portal.md)
