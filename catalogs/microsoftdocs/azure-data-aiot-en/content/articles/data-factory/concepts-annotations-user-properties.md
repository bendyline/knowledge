---
title: Monitor Azure Data Factory and Azure Synapse Analytics pipelines with annotations and user properties
description: Advanced monitoring with annotations and user properties
author: whhender
ms.author: whhender
ms.subservice: monitoring
ms.topic: how-to
ms.date: 10/20/2023
---

# Monitor Azure Data Factory and Azure Synapse Analytics pipelines with annotations and user properties

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


When monitoring your data pipelines, you might want to be able to filter and monitor a certain group of activities, such as those of a project or specific department's pipelines. You might also need to further monitor activities based on dynamic properties. You can achieve these things by using annotations and user properties.

## Annotations

Azure Data Factory annotations are tags that you can add to your Azure Data Factory or Azure Synapse Analytics entities to easily identify them. An annotation allows you to classify or group different entities in order to easily monitor or filter them after an execution. Annotations only allow you to define static values and can be added to pipelines, datasets, linked services, and triggers.

## User properties

User properties are key-value pairs defined at the activity level. By adding user properties, you can view additional information about activities under activity runs window that might help you to monitor your activity executions.
User properties allow you to define dynamic values and can be added to any activity, up to 5 per activity, under User Properties tab.

## Create and use annotations and user properties

As we discussed, annotations are static values that you can assign to pipelines, datasets, linked services, and triggers. Let's assume you want to filter for pipelines that belong to the same business unit or project name. We first create the annotation. Select the Properties icon, + New button and name your annotation appropriately. We advise being consistent with your naming.

Screenshot showing how to create an annotation.

When you go to the Monitor tab, you can filter under Pipeline runs for this Annotation:

Screenshot showing how to monitor an annotations.

If you want to monitor for dynamic values at the activity level, you can do so by using the User properties. You can add these under any activity by clicking on the Activity box, User properties tab and the + New button:

Screenshot showing how to create user properties.

For Copy Activity specifically, you can autogenerate these:

Screenshot showing User Properties under Copy activity.

To monitor User properties, go to the Activity runs monitoring view. Here you see all the properties you added.

Screenshot showing how to use User Properties in the Monitor tab.

You can remove some from the view if you select the Bookmark sign:

Screenshot showing how to remove User Properties.

## Related content

To learn more about monitoring see [Visually monitor Azure Data Factory.](monitor-visually.md)
