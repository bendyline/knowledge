---
title: "Create a Confluent Cloud Resource - Azure Portal"
description: Learn how to begin using Apache Kafka & Apache Flink on Confluent Cloud by creating an instance in the Azure portal.
ms.author: praveenrajap
author: praveenrajap
ms.topic: quickstart
ms.date: 02/07/2025
ms.custom: sfi-image-nochange

#customer intent: As a developer, I want to learn how to create a new instance of Apache Kafka & Apache Flink on Confluent Cloud by using the Azure portal so that I can create my own resources.
---

# Quickstart: Create a Confluent resource in the Azure portal

In this quickstart, you use the Azure portal to create a resource in Apache Kafka & Apache Flink on Confluent Cloud, an Azure Native Integrations service.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).


- You must [subscribe to Confluent Cloud](overview.md#subscribe-to-confluent-cloud).

## Create a Confluent resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


## Basics

The **Basics** tab has three sections:

- **Project details**
- **Azure resource details**
- **Confluent organization details**

Screenshot that shows the options to create a Confluent organization on the Basics tab in the Azure portal.

Each section has required settings to configure (identified with red asterisks).

1. Under **Project details**, enter or select values for these settings:

    | Name | Action |
    | --- | --- |
    | **Subscription** | Select an existing subscription. |
    | **Resource group** | Select an existing resource group, or create a new one. |

1. Under **Azure resource details**, enter or select values for these settings:

    | Name | Action |
    | --- | --- |
    | **Resource name** | Enter a unique name for the resource. |
    | **Region** | Select an Azure region for the resource deployment. |

1. Under **Confluent organization details**, enter or select values for these settings:

    | Name | Action |
    | --- | --- |
    | **Organization** | Select an existing organization, or create a new one. |

    > **Note:**
    > If you select an existing organization, the resource is billed to that organization's billing plan.

    To change your [billing plan](overview.md#billing), select **Change plan**.

    If you create a new organization, the remaining fields refresh to reflect the details of the plan you select for the new organization.

1. Select **Next**.

### Tags (optional)


Optionally, you can create tags for your resource. Then select **Review + create**.

### Review + create


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.


## Related content

- [Manage your Confluent Cloud resource](manage.md)
