---
title: Configuring Autoscaling
description: Learn how to configure autoscaling on Azure CycleCloud clusters. Scaling lets you easily increase or decrease a resource to accommodate heavier or lighter loads.
author: adriankjohnson
ms.date: 06/19/2026
ms.topic: how-to
ms.author: adjohnso
---

# AutoScale your clusters

*Scaling* means you can easily increase or decrease a resource to handle heavier or lighter loads. In Azure CycleCloud, you can easily scale up jobs when the load increases or scale down jobs to save costs. You can set up scaling to happen automatically or do it manually.

## Auto-scaling

When you create a new cluster through the GUI, the **Compute Backend** tab gives you the option to auto-scale your cluster and add execute hosts as needed. Select the check box to let CycleCloud start and stop execute nodes as needed. Set the number of initial and maximum cores.

**Applies to: \=cyclecloud-7**
Auto-scale setting for new cluster


**Applies to: \>=cyclecloud-8**
Auto-scale setting for new cluster


Setting a **Max Cores** number limits the number of nodes that start, so your workload doesn't run unchecked. You can also set up an [usage alert](../concepts/usage-tracking.md) when you submit your job to make sure you don't go over budget.

## Auto-scaling in cluster template

By default, new clusters have auto-scaling turned off. To turn on auto-scaling, add the following code to your [cluster template](cluster-templates.md):

``` ini
Autoscale = true
...
MaxCoreCount = xx
```

## More information

* Create a [Cluster Template](cluster-templates.md)
* [Start a Cluster](start-cluster.md)
