---
title: Create Elastic application
description: This article describes how to use the Azure portal to create an instance of Elastic, including Elastic Search, Elastic Observability, and Elastic Security.
author: pdjokar96
ms.author: piyushdash
ms.topic: quickstart
zone_pivot_groups: elastic-resource-type
ms.date: 12/01/2025
ms.custom: sfi-image-nochange
#customer intent: As an Azure developer, I want to create Elastic resources to use search, log analytics, and security monitoring functions for Azure environments.

---
---

# QuickStart: Create an Elastic resource

In this quickstart, you create an Elastic resource in Azure and configure it to start collecting logs from your Azure environment.

## What to expect

After you complete this quickstart, you have:

- An Elastic resource (`Microsoft.Elastic/monitors`) in your chosen resource group
- An Elastic deployment (serverless or cloud-hosted) running in your selected Azure region
- (Optional) Azure subscription activity logs and resource logs flowing to Elastic
- (Optional) Azure OpenAI connected for AI-powered search capabilities
- SSO enabled automatically for all Azure users in your tenant

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).


> **Note:**
> A given email address can only be part of one Elastic organization at a time. When you create your first Elastic resource from Azure with a new email, a new organization is created along with your first deployment or serverless project. For subsequent resources created with the same email, all deployments and projects go into the same organization.

> **Note:**
> Single sign-on (SSO) between the Azure portal and Elastic Cloud is automatically enabled for all Azure users. No additional configuration is required.

> **Important:**
> Azure free credits and most Azure free trial offers **can't** be used to purchase Azure Marketplace third-party offers, including Elastic. Your Elastic charges are billed against a payment method that supports Marketplace purchases (for example, a pay-as-you-go subscription or an Enterprise Agreement). For details, see [Understand your Azure Marketplace charges](https://learn.microsoft.com/azure/cost-management-billing/understand/understand-azure-marketplace-charges#azure-credit-eligibility).

## Choose your Elastic service

Elastic on Azure offers three services. Select the tab that matches your use case:

| Service | Best for |
| --- | --- |
| **Elastic Search** | Full-text search, vector search, application search, analytics |
| **Elastic Observability** | Log analytics, APM, infrastructure monitoring, alerting |
| **Elastic Security** | SIEM, threat detection, endpoint protection, compliance |

## Create an Elastic resource

You can start the creation workflow from either entry point:

- **Azure portal**: open the [Elastic resource browse page](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Elastic%2Fmonitors) and select **Create**.
- **Azure Marketplace**: open the offering that matches the service you chose and select **Get It Now**.

  - [Elastic Cloud (Elasticsearch)](https://azuremarketplace.microsoft.com/marketplace/apps/elastic.ec-azure-pp?tab=Overview)
  - [Elastic Observability](https://azuremarketplace.microsoft.com/marketplace/apps/elastic.ec-azure-observability?tab=Overview)
  - [Elastic Security](https://azuremarketplace.microsoft.com/marketplace/apps/elastic.ec-azure-security?tab=Overview)

Alternatively, from the Azure portal global search bar, search for **Elastic Cloud** and select the matching service.

Screenshot shows the create page for Elastic Cloud with options to create Elastic Search, Elastic Observability, and Elastic Security.

**Applies to: elastic-search**


Select **Elastic Search**.

### Basics tab

1. In the **Basics** tab, enter values for the settings:

    | Field | Action |
    | --- | --- |
    | Subscription | Select a subscription from the options. You must be an *Owner* or *Contributor*. |
    | Resource group | Use an existing resource group or create a new one. |
    | Resource name | Specify a unique name for the resource. |
    | Hosting Type | Select **Serverless** or **Cloud Hosted**. See [Serverless vs. cloud-hosted](overview.md#serverless-vs-cloud-hosted) for guidance. |
    | Configuration (**Serverless** only) | Select **General purpose** or **Optimized for Vectors**. Choose Vectors if you plan to use vector search or semantic search. |
    | Region | Select a region to deploy your resource. |
    | Version (**Cloud Hosted** only) | Select an Elasticsearch version. |
    | Size (**Cloud Hosted** only) | Review the cluster size and configuration. |
    | Plan | To choose a different plan, select **Change plan**. |
    | Billing term | Select monthly or annual billing. |
    | Price + Payment options | Review the pricing details for your configuration. |

1. At the bottom of the page, select **Next: Logs & metrics**.

### Logs & metrics tab (optional)

Configure which Azure resources send logs to Elastic. You can change these settings at any time after creation.

| Setting | What it does |
| --- | --- |
| **Send subscription activity logs** | Forwards management plane operations (resource creation, deletion, role assignments) to Elastic |
| **Send Azure resource logs for all defined sources** | Forwards diagnostic logs from supported Azure resources to Elastic |

For Observability and Security resource types, log forwarding is enabled by default.

You can refine which resources send logs by specifying tag-based include/exclude rules under **Logs**. For more information, see [tag rules for sending logs](../metrics-logs.md#tag-rules-for-sending-logs).

> **Note:**
> Automatic metrics collection isn't supported yet. To send metrics of Azure services to Elastic, see [Azure Metrics integration](https://www.elastic.co/docs/reference/integrations/azure_metrics) in the Elastic documentation.

At the bottom of the page, select **Next: Azure OpenAI configuration**.

### Azure OpenAI configuration tab

Connect an Azure OpenAI resource to enable AI-powered search experiences such as semantic search and retrieval-augmented generation (RAG).

1. Select an existing **Azure OpenAI Resource**.

1. Select an existing **Azure OpenAI Deployment**.

    > **Tip:**
    > You can skip this step and configure Azure OpenAI later from the manage experience. See [Manage your Elastic resource](manage.md).

1. At the bottom of the page, select **Next: Tags**.

### Tags tab (optional)


Optionally, you can create tags for your resource. Then select **Review + create**.

### Review + create tab


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.




**Applies to: elastic-observability**


Select **Elastic Observability**.

### Basics tab

1. In the **Basics** tab, enter values for the settings:

    | Field | Action |
    | --- | --- |
    | Subscription | Select a subscription from the options. You must be an *Owner* or *Contributor*. |
    | Resource group | Use an existing resource group or create a new one. |
    | Resource name | Specify a unique name for the resource. |
    | Hosting Type | Select **Serverless** or **Cloud Hosted**. See [Serverless vs. cloud-hosted](overview.md#serverless-vs-cloud-hosted) for guidance. |
    | Region | Select a region to deploy your resource. |
    | Version (**Cloud Hosted** only) | Select an Elasticsearch version. |
    | Size (**Cloud Hosted** only) | Review the cluster size and configuration. |
    | Plan | To choose a different plan, select **Change plan**. |
    | Billing term | Select monthly or annual billing. |
    | Price + Payment options | Review the pricing details for your configuration. |

1. At the bottom of the page, select **Next: Logs & metrics**.

### Logs & metrics tab (optional)

Configure which Azure resources send logs and metrics to Elastic. You can change these settings at any time after creation. For details on what gets forwarded and worked include/exclude examples, see [tag rules for sending metrics](../metrics-logs.md#tag-rules-for-sending-metrics) and [tag rules for sending logs](../metrics-logs.md#tag-rules-for-sending-logs) in [Monitor & Observe Azure resources with Azure Native Integrations](../metrics-logs.md).

| Setting | What it does |
| --- | --- |
| **Send subscription activity logs** | Forwards management plane operations to Elastic |
| **Send Azure resource logs for all defined sources** | Forwards diagnostic logs from supported Azure resources to Elastic (enabled by default) |

You can refine which resources send logs by specifying tag-based include/exclude rules under **Logs**.

> **Note:**
> Automatic metrics collection isn't supported yet. To send metrics of Azure services to Elastic, see [Azure Metrics integration](https://www.elastic.co/docs/reference/integrations/azure_metrics) in the Elastic documentation.

At the bottom of the page, select **Next: Azure OpenAI configuration**.

### Azure OpenAI configuration tab

Connect an Azure OpenAI resource to enable AI-assisted analysis of your observability data.

1. Select an existing **Azure OpenAI Resource**.

1. Select an existing **Azure OpenAI Deployment**.

1. At the bottom of the page, select **Next: Tags**.

### Tags tab (optional)


Optionally, you can create tags for your resource. Then select **Review + create**.

### Review + create tab


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.




**Applies to: elastic-security**


Select **Elastic Security**.

### Basics tab

1. In the **Basics** tab, enter values for the settings:

    | Field | Action |
    | --- | --- |
    | Subscription | Select a subscription from the options. You must be an *Owner* or *Contributor*. |
    | Resource group | Use an existing resource group or create a new one. |
    | Resource name | Specify a unique name for the resource. |
    | Hosting Type | Select **Serverless** or **Cloud Hosted**. See [Serverless vs. cloud-hosted](overview.md#serverless-vs-cloud-hosted) for guidance. |
    | Region | Select a region to deploy your resource. |
    | Version (**Cloud Hosted** only) | Select an Elasticsearch version. |
    | Size (**Cloud Hosted** only) | Review the cluster size and configuration. |
    | Plan | To choose a different plan, select **Change plan**. |
    | Billing term | Select monthly or annual billing. |
    | Price + Payment options | Review the pricing details for your configuration. |

1. At the bottom of the page, select **Next: Logs & metrics**.

### Logs & metrics tab (optional)

Configure which Azure resources send security-related logs to Elastic. You can change these settings at any time after creation.

| Setting | What it does |
| --- | --- |
| **Send subscription activity logs** | Forwards management plane operations for security auditing |
| **Send Azure resource logs for all defined sources** | Forwards diagnostic logs for security analysis (enabled by default) |

You can refine which resources send logs by specifying tag-based include/exclude rules under **Logs**. For more information, see [tag rules for sending logs](../metrics-logs.md#tag-rules-for-sending-logs).

> **Note:**
> Automatic metrics collection isn't supported yet. To send metrics of Azure services to Elastic, see [Azure Metrics integration](https://www.elastic.co/docs/reference/integrations/azure_metrics) in the Elastic documentation.

At the bottom of the page, select **Next: Azure OpenAI configuration**.

### Azure OpenAI configuration tab

Connect an Azure OpenAI resource to enable AI-assisted security analysis and threat investigation.

1. Select an existing **Azure OpenAI Resource**.

1. Select an existing **Azure OpenAI Deployment**.

1. At the bottom of the page, select **Next: Tags**.

### Tags tab (optional)


Optionally, you can create tags for your resource. Then select **Review + create**.

### Review + create tab


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.




## Verify your deployment

After the resource is created:

1. Navigate to your Elastic resource in the Azure portal.
2. In the **Overview** pane, confirm the **Status** shows as *Active*.
3. Select the **Elastic portal** link to open your Elastic deployment.
4. In the Elastic portal, verify that data is arriving (allow a few minutes for initial ingestion).

> **Tip:**
> If logs aren't appearing after 10 minutes, see [Troubleshooting](troubleshoot.md) for common causes and solutions.

## Next steps

> 
> [Manage your Elastic resource](manage.md)

- [Configure log forwarding rules](manage.md#reconfigure-rules-for-logs-and-metrics)
- [Deploy Elastic Agents to VMs](manage.md#elastic-agent-deployment)
- [Set up Azure OpenAI integration](manage.md#azure-openai-integration)
