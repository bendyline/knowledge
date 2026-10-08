---
title: Manage NSG Flow Logs Using Azure Policy
titleSuffix: Azure Network Watcher
description: Learn how to use Azure Policy built-in policies to audit network security groups and Azure Network Watcher NSG flow logs.
author: halkazwini
ms.author: halkazwini
ms.service: azure-network-watcher
ms.topic: how-to
ms.date: 05/04/2026
ms.custom: sfi-image-nochange

# Customer intent: As an Azure administrator, I want to use built-in policies to audit and deploy NSG flow logs, so that I can ensure compliance and improve visibility for network security groups within my organization.
---

# Manage NSG flow logs using Azure Policy

> **Important:**
> Network security group (NSG) flow logs retire on September 30, 2027. Because the feature is retiring, it no longer supports new NSG flow logs creation. [Migrate](nsg-flow-logs-migrate.md) to [virtual network flow logs](vnet-flow-logs-overview.md), which address the limitations of NSG flow logs. After the retirement date, Azure no longer supports traffic analytics enabled for NSG flow logs, and deletes existing NSG flow log resources in your subscriptions. However, Azure doesn't delete existing NSG flow log records from Azure Storage, and they continue to follow their configured retention policies. For more information, see the [official announcement](https://azure.microsoft.com/updates/v2/Azure-NSG-flow-logs-Retirement).


Azure Policy helps you enforce organizational standards and assess compliance at scale. Common use cases for Azure Policy include implementing governance for resource consistency, regulatory compliance, security, cost, and management. To learn more about Azure Policy, see [What is Azure Policy?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/overview.md) and [Quickstart: Create a policy assignment to identify noncompliant resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/assign-policy-portal.md).

In this article, you learn how to use built-in policies to audit your setup of network security group (NSG) flow logs.

## Audit network security groups using a built-in policy

The **Flow logs should be configured for every network security group** policy audits all existing network security groups in a scope by checking all Azure Resource Manager objects of type `Microsoft.Network/networkSecurityGroups`. This policy then checks for linked flow logs through the flow logs property of the network security group, and it flags any network security group that doesn't have flow logs enabled.

To audit your flow logs using the built-in policy, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the search box at the top of the portal, enter *policy*. Select **Policy** from the search results.

    Screenshot that shows how to search for Azure Policy in the Azure portal.

1. Select **Assignments**, and then select **Assign policy**.

    Screenshot of selecting the button for assigning a policy in the Azure portal.

1. Select the ellipsis (**...**) next to **Scope** to choose your Azure subscription that has the network security groups you want the policy to audit. You can also choose the resource group that has the network security groups. After you make your selections, choose the **Select** button.

    Screenshot of selecting the scope of the policy in the Azure portal.

1. Select the ellipsis (**...**) next to **Policy definition** to choose the built-in policy that you want to assign. Enter *flow log* in the search box, and then select the **Built-in** filter. From the search results, select **Flow logs should be configured for every network security group**, and then select **Add**.

    Screenshot of selecting the audit policy in the Azure portal.

1. Enter a name in **Assignment name**, and enter your name in **Assigned by**.

    This policy doesn't require any parameters. It also doesn't contain any role definitions, so you don't need to create role assignments for the managed identity on the **Remediation** tab.

1. Select **Review + create**, and then select **Create**.

    Screenshot of the Basics tab to assign an audit policy in the Azure portal.

1. Select **Compliance**. Search for the name of your assignment, and then select it.

    Screenshot of the Compliance page that shows noncompliant resources based on the audit policy.

1. Select **Resource compliance** to get a list of all noncompliant network security groups.

    Screenshot of the Policy compliance page that shows the noncompliant resources based on the audit policy.

## Related content

- [Audit and deploy virtual network flow logs using Azure Policy](vnet-flow-logs-policy.md)
- [Virtual network flow logs overview](vnet-flow-logs-overview.md)
- [Traffic analytics overview](traffic-analytics.md)
