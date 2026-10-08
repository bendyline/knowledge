---
title: How to determine your quota usage 
description: Learn how to determine where the cores for your subscription are used and if you have any spare capacity against your quota.  
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to 
ms.date: 10/11/2022 
ms.custom: sfi-image-nochange
--- 

# Determine usage and quota  


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).



> **Note:**
> This article references features available in [lab plans](concept-lab-accounts-versus-lab-plans.md), which replaced lab accounts.


Keeping track of how your quota of VM cores is being used across your subscriptions can be difficult. You may want to know what your current usage is, how much you have left, and in what regions you have capacity. To help you understand where and how you're using your quota, Azure provides the Usage + Quotas page.

## Determine your usage and quota

1. In the [Azure portal](https://portal.azure.com), go to the subscription you want to examine.

1. On the Subscription page, under Settings, select **Usage + quotas**.

   Screenshot showing the Subscription overview left menu, with Usage and quotas highlighted.

1. To view Usage + quotas information about Azure Lab Services, select **Azure Lab Services**.  

   Screenshot showing the Usage and quotas page, Compute drop-down, with Azure Lab Services highlighted.
  
   >**Tip:**
   >If you don’t see any data on the Usage + quotas page, or you’re not able to select Azure Lab Services from the list, your subscription may not be registered with Azure Lab Services.
   >Follow the steps in the Register your subscription with Azure Labs Services section below to resolve the issue.

1. In this example, you can see the **Quota name**, the **Region**, the **Subscription** the quota is assigned to, and the **Current Usage**.

   Screenshot showing the Usage and quotas page, with column headings highlighted.

1. You can also see that the usage is grouped by level; regular, low, and no usage. Within the usage levels, the items are grouped in their sizes – including Small / Medium / Large cores, and by labs and lab plans.

   Screenshot showing the Usage and quotas page, with VM size groups highlighted.

1. To view quota and usage information for specific regions, select **Region:** and select the regions to display, and then select **Apply**.

   Screenshot showing the Usage and quotas page, with Regions drop down highlighted.

1. To view only the items that are using part of your quota, select **Usage:**, and then select **Only items with usage**.

   Screenshot showing the Usage and quotas page, with Usage drop down and Only show items with usage option highlighted.

1. To view items that are using above a certain amount of your quota, select **Usage:**, and then select **Select custom usage**.

   Screenshot showing the Usage and quotas page, with Usage drop down and Select custom usage option highlighted.

1. You can then set a custom usage threshold, so only the items using above the specified percentage of the quota are displayed.  

   Screenshot showing the Usage and quotas page, with Select custom usage option and configuration settings highlighted.

1. Select **Apply**.

 Each subscription has its own Usage + quotas page, which covers all the various services in the subscription, not just Azure Lab Services. Although you can request a quota increase from the Usage + quotas page, you'll have more relevant information at hand if you make your request from your lab plan page.

## Register your subscription with Azure Labs Services

In most cases, Azure Lab Services will register your subscription when you perform certain actions, like creating a lab plan. In some cases, you must register your subscription with the Azure Labs Service manually before you can view your usage and quota information on the Usage + Quotas page.  

### To register your subscription:

1. In the [Azure portal](https://portal.azure.com), go to the subscription you want to examine.

1. On the Subscription page, under Settings, select **Usage + quotas**.

   Screenshot showing the Subscription overview left menu, with Usage and quotas highlighted.

1. If you aren’t registered with Azure Lab Services, you’ll see the message *“One or more resource providers selected are not registered for this subscription. To access your quotas, register the resource provider.”*  

   Screenshot showing the register with service message and link to register the resource provider highlighted.

1. Select the link and follow the instructions to register your account with Azure Lab Services.

## Next steps

- Learn more about [Capacity limits in Azure Lab Services](capacity-limits.md).
- Learn how to [Request a core limit increase](how-to-request-capacity-increase.md).
