---
title: Continuous integration and deployment for dedicated SQL pool
description: Enterprise-class Database DevOps experience for dedicated SQL pool in Azure Synapse Analytics with built-in support for continuous integration and deployment using Azure Pipelines.
author: ajagadish-24
ms.author: ajagadish
ms.date: 02/04/2020
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: how-to
ms.custom:
  - azure-synapse
  - sfi-image-nochange
---
# Continuous integration and deployment for dedicated SQL pool in Azure Synapse Analytics

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

This simple tutorial outlines how to integrate your SQL Server Data tools (SSDT) database project with Azure DevOps and leverage Azure Pipelines to set up continuous integration and deployment. This tutorial is the second step in building your continuous integration and deployment pipeline for data warehousing.

## Before you begin

- Go through the [source control integration tutorial](sql-data-warehouse-source-control-integration.md)

- Set up and connect to Azure DevOps

## Continuous integration with Visual Studio build

1. Navigate to Azure Pipelines and create a new build pipeline.

      New Pipeline

2. Select your source code repository (Azure Repos Git) and select the .NET Desktop app template.

      Pipeline Setup

3. Edit your YAML file to use the proper pool of your agent. Your YAML file should look something like this:

      YAML

At this point, you have a simple environment where any check-in to your source control repository main branch should automatically trigger a successful Visual Studio build of your database project. Validate the automation is working end to end by making a change in your local database project and checking in that change to your main branch.

## Continuous deployment with the Azure Synapse Analytics (or Database) deployment task

1. Add a new task using the [Azure SQL Database deployment task](https://learn.microsoft.com/azure/devops/pipelines/targets/azure-sqldb) and fill in the required fields to connect to your target data warehouse. When this task runs, the DACPAC generated from the previous build process is deployed to the target data warehouse. You can also use the [Azure Synapse Analytics deployment task](https://marketplace.visualstudio.com/items?itemName=ms-sql-dw.SQLDWDeployment).

      Deployment Task

2. If you are using a self-hosted agent, make sure you set your environment variable to use the correct SqlPackage.exe for Azure Synapse Analytics. The path should look something like this:

      Environment Variable

   C:\Program Files (x86)\Microsoft Visual Studio\2019\Preview\Common7\IDE\Extensions\Microsoft\SQLDB\DAC\150  

   Run and validate your pipeline. You can make changes locally and check in changes to your source control that should generate an automatic build and deployment.

## Next steps

- Explore [Dedicated SQL pool (formerly SQL DW) architecture](massively-parallel-processing-mpp-architecture.md)
- Quickly [create a dedicated SQL pool (formerly SQL DW)](create-data-warehouse-portal.md)
- [Load sample data](load-data-from-azure-blob-storage-using-copy.md)
- Explore [Videos](sql-data-warehouse-videos.md)
