---
title: Management hub
description: Manage your connections, source control configuration and global authoring properties in the Azure Data Factory management hub
ms.subservice: authoring
ms.topic: concept-article
author: kromerm
ms.author: makromer
ms.date: 10/20/2023
---

# Management hub in Azure Data Factory

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


The management hub, accessed by the *Manage* tab in the Azure Data Factory UX, is a portal that hosts global management actions for your data factory. Here, you can manage your connections to data stores and external computes, source control configuration, and trigger settings.

## Manage connections

### Linked services

Linked services define the connection information for Azure Data Factory to connect to external data stores and compute environments. For more information, see [linked services concepts](concepts-linked-services.md). Linked service creation, editing, and deletion is done in the management hub.

Manage linked services

### Integration runtimes

An integration runtime is a compute infrastructure used by Azure Data Factory to provide data integration capabilities across different network environments. For more information, learn about [integration runtime concepts](concepts-integration-runtime.md). In the management hub, you can create, delete, and monitor your integration runtimes.

Manage integration runtimes

## Manage source control

### Git configuration

You can view/ edit all the Git-related information under the Git configuration settings in the management hub. 

Last published commit information is listed as well and can help to understand the precise commit, which was last published/ deployed across environments. It can also be helpful when doing Hot Fixes in production.

For more information, learn about [source control in Azure Data Factory](source-control.md).

Manage git repo

### Parameterization template

To override the generated Resource Manager template parameters when publishing from the collaboration branch, you can generate or edit a custom parameters file. For more information, learn how to [use custom parameters in the Resource Manager template](continuous-integration-delivery-resource-manager-custom-parameters.md). The parameterization template is only available when working in a git repository. If the *arm-template-parameters-definition.json* file doesn't exist in the working branch, editing the default template will generate it.

Manage custom params

## Manage authoring

### Triggers

Triggers determine when a pipeline run should be kicked off. Currently triggers can be on a wall clock schedule, operate on a periodic interval, or depend on an event. For more information, learn about [trigger execution](concepts-pipeline-execution-triggers.md#trigger-types). In the management hub, you can create, edit, delete, or view the current state of a trigger.

Screenshot that shows where to create, edit, delete, nor view the current state of a trigger.

### Global parameters

Global parameters are constants across a data factory that can be consumed by a pipeline in any expression. For more information, learn about [global parameters](author-global-parameters.md).

Create global parameters

## Related content

Learn how to [configure a git repository](source-control.md) to your ADF
