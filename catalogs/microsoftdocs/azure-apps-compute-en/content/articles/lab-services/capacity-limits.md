---
title: Capacity limits
description: Learn about VM capacity limits in Azure Lab Services.
ms.topic: concept-article
ms.date: 08/28/2023
ms.custom: devdivchpfy22
---

# Capacity limits in Azure Lab Services


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


Azure Lab Services has default capacity limits on Azure subscriptions that adhere to Azure Compute quota limitations and to mitigate fraud. All Azure subscriptions have an initial capacity limit, which can vary based on subscription type, number of standard compute cores, and GPU cores available inside Azure Lab Services. The capacity limit restricts how many virtual machines you can create inside your lab before you need to request a limit increase.  

If you're close to, or have reached your subscription's core limit, you see warning messages from Azure Lab Services in the portal.  The core limits affect the following actions:

- Create a lab
- Publish a lab
- Increase lab capacity

These actions might be disabled if there are no more cores available for your subscription.

Screenshot of core limit warning in Azure Lab Services.

> **Note:**
> Azure Lab Services capacity limits are set per subscription.

### Prerequisites


- To create a support request, your Azure account needs the [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner), [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#contributor), or [Support Request Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#support-request-contributor) role at the subscription level.

- To verify current quota for a subscription before you submit a support request, your Azure account needs the [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner) or [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#contributor) role at the subscription level.


## Request a limit increase

If you reach the cores limit, you can request a limit increase to continue using Azure Lab Services. The request process is a checkpoint to ensure your subscription isn't involved in any cases of fraud or unintentional, sudden large-scale deployments.

To create a support request, see [Request a core limit increase](how-to-request-capacity-increase.md).

## Subscriptions with default limit of zero cores

Some rare subscription types that are more commonly used for fraud can have a default limit of zero standard cores and zero GPU cores. If you're using one of these subscription types, your admin needs to request a limit increase before you can use Azure Lab Services.

## Per-customer assigned capacity

Azure Lab Services hosts lab resources, including VMs, within special Microsoft-managed Azure subscriptions that aren't visible to customers.  With [lab plans](concept-lab-accounts-versus-lab-plans.md), VM capacity is dedicated to each customer.  With lab accounts, VM capacity was available from a large pool shared by customers.

Before you set up a large number of VMs across your labs, we recommend that you open a support ticket to pre-request VM capacity. Requests should include VM size, number, and location. Requesting capacity before lab creation helps us to ensure that you create your labs in a region that has a sufficient number of VM cores for the VM size that you need for your labs.

## Azure region restrictions

Azure Lab Services enables you to create labs in different Azure regions. The default limit for the total number of regions you can use for creating labs varies by offer category type. For example, the default for Pay-As-You-Go subscriptions is two regions.

If you have reached the Azure regions limit for your subscription, you can only create labs in regions that you're already using. When you create a new lab in another region, the lab creation fails with an error message.

To overcome the Azure region restriction, you have the following options:

- [Delete all labs](how-to-manage-labs.md#delete-a-lab) in one of the other regions to reduce the total number of regions in which you have labs.

- Contact Azure support to [request the removal of the region restriction](#request-removal-of-region-restriction) for your subscription.

- Contact Azure support to [request a limit increase](how-to-request-capacity-increase.md). When a limit increase is granted, the region restriction is lifted for your subscription. We recommend that you request a small limit increase for any SKU to lift the restriction for your subscription.

### Request removal of region restriction

You can contact Azure support and create a support ticket to lift the region restriction from your subscription.

1. In the [Azure portal](https://portal.azure.com), go to your lab plan.
1. In the left navigation menu, select **New Support Request**.
1. On the **Problem description** tab, enter the following information, and then select **Next**.

    | Field | Value |
    | --- | --- |
    | **Summary** | Enter *Remove region restriction*. |
    | **Issue type** | *Technical* |
    | **Subscription** | Select your Azure subscription. |
    | **Service** | Select *My Services*. |
    | **Service type** | Select *Lab Services with lab plan*. |
    | **Resource** | *Select your lab plan*. |
    | **Problem type** | Select *Labs Portal (labs.azure.com)*. |
    | **Problem subtype** | Select *Problem creating a new lab*. |

    Screenshot that shows how to create an Azure support request in the Azure portal to remove the region restriction.

1. On the **Additional details** page, enter *Requesting lift of regional restrictions* in the **Description** field, and then select **Next**.

1. On the **Review + create** page, select **Create** to create the support request.

## Best practices for requesting a limit increase

The time it takes to assign capacity varies depending on the VM size, region, and number of cores requested. You don't need to go through the process of requesting extra capacity often. To ensure that you have the resources you require when you need them, you should:

- Request capacity as far in advance as possible.
- Be flexible on the region where you're requesting capacity, if possible.
- Recognize that capacity remains assigned for the lifetime of a subscription. When lab plans or labs are deleted, the capacity remains assigned to the subscription.
- Request extra capacity only if you need more than is already assigned to your subscription.
- Make incremental requests for VM cores rather than making large, bulk requests. Break requests for large numbers of cores into smaller requests for extra flexibility in how those requests are fulfilled.


## Related content

- As an admin, learn more about the different [virtual machine sizes in the administrator's guide](administrator-guide.md#vm-sizing).
- As an admin, see [Request a capacity increase](how-to-request-capacity-increase.md)
