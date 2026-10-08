---
title: "Quickstart: Create a serverless Apache Spark pool using Synapse Studio"
description: Create a serverless Apache Spark pool using Synapse Studio by following the steps in this guide.
author: ms-arali
ms.author: arali
ms.reviewer:  eskot
ms.date: 03/11/2024
ms.service: azure-synapse-analytics
ms.subservice: spark
ms.topic: quickstart
ms.custom:
  - mode-ui
  - sfi-image-nochange
---

# Quickstart: Create a serverless Apache Spark pool using Synapse Studio

Azure Synapse Analytics offers various analytics engines to help you ingest, transform, model, analyze,  and serve your data. Apache Spark pool offers open-source big data compute capabilities. After you create an Apache Spark pool in your Synapse workspace, data can be loaded, modeled, processed, and served to obtain insights.  

This quickstart describes the steps to create an Apache Spark pool in a Synapse workspace by using Synapse Studio.

> **Important:**
> Billing for Spark instances is prorated per minute, whether you are using them or not. Be sure to shutdown your Spark instance after you have finished using it, or set a short timeout. For more information, see the **Clean up resources** section of this article.

> **Note:**
> Synapse Studio will continue to support terraform or bicep-based configuration files.

If you don't have an Azure subscription, [create a free account before you begin](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Prerequisites

- You'll need an Azure subscription. If needed, [create a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- You'll be using the [Synapse workspace](quickstart-create-workspace.md).

## Sign in to the Azure portal

Sign in to the [Azure portal](https://portal.azure.com/)

## Navigate to the Synapse workspace

1. Navigate to the Synapse workspace where the Apache Spark pool will be created by typing the service name (or resource name directly) into the search bar.
    Screenshot from the Azure portal of the search bar with Synapse workspaces typed in.

1. From the list of workspaces, type the name (or part of the name) of the workspace to open. For this example, we use a workspace named **contosoanalytics**.
    Screenshot from the Azure portal of the list of Synapse workspaces filtered to show those containing the name Contoso.
   
## Launch Synapse Studio

From the workspace overview, select the **Workspace web URL** to open Synapse Studio.

Screenshot from the Azure portal of a Synapse workspace overview with Launch Synapse Studio highlighted.

## Create the Apache Spark pool in Synapse Studio

> **Important:**
> Azure Synapse Runtime for Apache Spark 2.4 has been deprecated and officially not supported since September 2023. Given [Spark 3.1](https://learn.microsoft.com/azure/synapse-analytics/spark/apache-spark-3-runtime) and [Spark 3.2](https://learn.microsoft.com/azure/synapse-analytics/spark/apache-spark-32-runtime) are also End of Support announced, [we recommend customers migrate to Spark 3.3](https://learn.microsoft.com/azure/synapse-analytics/spark/apache-spark-33-runtime).

1. On the Synapse Studio home page, navigate to the **Management Hub** in the left navigation by selecting the **Manage** icon.
    Screenshot from the Azure portal of the Synapse Studio home page with Management Hub section highlighted.
   
1. Once in the Management Hub, navigate to the **Apache Spark pools** section to see the current list of Apache Spark pools that are available in the workspace.
    Screenshot from the Azure portal of the Synapse Studio management hub with Apache Spark pools navigation selected.
   
1. Select **+ New** and the new Apache Spark pool create wizard will appear. 

1. Enter the following details in the **Basics** tab:

    | Setting | Suggested value | Description  |
    | :--- | :--- | :--- |
    | **Apache Spark pool name** | A valid pool name, like `contosospark` | This is the name that the Apache Spark pool will have. |
    | **Node size** | Small (4 vCPU / 32 GB) | Set this to the smallest size to reduce costs for this quickstart |
    | **Autoscale** | Disabled | We won't need autoscale in this quickstart |
    | **Number of nodes** | 8 | Use a small size to limit costs in this quickstart |
    | **Dynamically allocate executors** | Disabled | This setting maps to the dynamic allocation property in Spark configuration for Spark Application executors allocation. We won't need autoscale in this quickstart. |
     
    Screenshot from the Azure portal of the Basics for Synapse Studio new Apache Spark pool.
   
    > **Important:**
    > There are specific limitations for the names that Apache Spark pools can use. Names must contain letters or numbers only, must be 15 or less characters, must start with a letter, not contain reserved words, and be unique in the workspace.

1. In the next tab, **Additional settings**, leave all settings as defaults.

1. Select **Tags**. Consider using Azure tags. For example, the "Owner" or "CreatedBy" tag to identify who created the resource, and the "Environment" tag to identify whether this resource is in Production, Development, etc. For more information, see [Develop your naming and tagging strategy for Azure resources](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging). When ready, select **Review + create**.

1. In the **Review + create** tab, make sure that the details look correct based on what was previously entered, and press **Create**. 

    Screenshot from the Azure portal of the Create Synapse Studio new Apache Spark pool.
   
1. The Apache Spark pool will start the provisioning process.

1. Once the provisioning is complete, the new Apache Spark pool will appear in the list.

    Screenshot from the Azure portal of the Synapse Studio new Apache Spark pool list.
   
## Clean up Apache Spark pool resources using Synapse Studio

The following steps delete the Apache Spark pool from the workspace using Synapse Studio.

> **Warning:**
> Deleting a Spark pool will remove the analytics engine from the workspace. It will no longer be possible to connect to the pool, and all queries, pipelines, and notebooks that use this Spark pool will no longer work.

If you want to delete the Apache Spark pool, do the following steps:

1. Navigate to the Apache Spark pools in the Management Hub in Synapse Studio.
1. Select the ellipsis next to the Apache pool to be deleted (in this case, **contosospark**) to show the commands for the Apache Spark pool.

    Screenshot from the Azure portal of a list of Apache Spark pools, with the recently created pool selected.
   
1. Select **Delete**.
1. Confirm the deletion, and press **Delete** button.
1. When the process completes successfully, the Apache Spark pool will no longer be listed in the workspace resources. 

## Related content

- [Quickstart: Create a serverless Apache Spark pool in Azure Synapse Analytics using web tools](quickstart-apache-spark-notebook.md)
- [Quickstart: Create a new serverless Apache Spark pool using the Azure portal](quickstart-create-apache-spark-pool-portal.md)
