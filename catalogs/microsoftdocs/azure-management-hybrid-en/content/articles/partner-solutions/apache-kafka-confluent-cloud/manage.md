---
title: Manage a Confluent Cloud Resource
description: Learn how to manage your Confluent Cloud resource settings.
ms.author: praveenrajap
author: praveenrajap
ms.topic: how-to
ms.date: 02/27/2025
ms.custom: sfi-image-nochange

---

# Manage a Confluent Cloud resource

This article describes how to manage the settings for Apache Kafka & Apache Flink on Confluent Cloud.

## Resource overview


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal search bar, enter *All resources* and select **All resources** from the results.

1. From the **Resources** list, select your resource.

   The Azure portal shows the resource with the **Overview** page open, by default.



Screenshot that shows a Confluent resource in the Azure portal with the overview displayed in the working pane.

The **Essentials** details include:

- Resource group
- Location
- Subscription name
- Subscription ID
- Tags
- Confluent single sign-on (SSO) URL
- Status
- Plan
- Billing term

To manage your resource, select the link next to a corresponding detail.

Select a tab to go to other details about your resource.

- The **Get started** tab provides links to configure connectors, manage user access, and manage Confluent.

    Select the **Launch** button to [create clusters](https://docs.confluent.io/cloud/current/clusters/create-cluster.html), [connect your apps, systems, and entire organizations](https://docs.confluent.io/cloud/current/connectors/index.html#).
- The **Tutorials** tab displays links to free courses and video tutorials.

## Delete a resource


To delete a resource:

1. On the command bar, select **Delete**.

1. On the **Delete Resource** pane, optionally select a reason for deleting the resource.

1. In the **Enter resource name to confirm deletion** box, enter the name of the resource.

1. Select **Delete**.

1. Select **Delete** again to confirm deletion.

After the resource is deleted, all billing for that resource through Azure Marketplace stops.


> **Important:**
>
> - To delete the resource on Confluent Cloud, see the documentation for [Confluent Cloud Environments](https://docs.confluent.io/current/cloud/using/environments.html) and [Confluent Cloud Basics](https://docs.confluent.io/current/cloud/using/cloud-basics.html).
> - The cluster and all data in the cluster are permanently deleted. If your contract includes a data retention clause, Confluent keeps your data for the time period that is specified in the [Terms of Service](https://www.confluent.io/confluent-cloud-tos).
> - You're billed for prorated usage up to the time the cluster is deleted. After your cluster is permanently deleted, Confluent sends you an email confirmation.

## Related content

- [Troubleshoot Confluent Cloud](troubleshoot.md)
