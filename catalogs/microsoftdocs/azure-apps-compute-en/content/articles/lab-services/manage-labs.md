---
title: View and delete labs in Azure Lab Services
description: Learn how to view and delete all the labs associated with a lab plan. 
ms.topic: how-to
ms.date: 04/06/2021
ms.custom:
  - devdivchpfy22
  - sfi-image-nochange
---

# Manage labs


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


This article describes how a lab plan owner or administrator can view and delete all the labs associated with a lab plan.

Lab plans and labs are sibling resources contained in a resource group. Administrators can use existing tools in the Azure portal to manage labs.

## View labs

1. Open the **Resource Group** page.

    Screenshot of the labs in the plan.

    To view only lab resources, set a filter for `Type == Lab`.

1. You see a **list of labs** with the following information:
    1. Name of the lab.
    1. Type of the resource (Lab).
    1. Location of the lab.

1. Open a lab to view additional information such as the associated lab plan, OS type, and virtual machine size.

## Delete a lab

1. Open the **Resource Group** page.

    To view only lab resources, set a filter for `Type == Lab`.

1. Select **... (ellipsis)**, and then select **Delete**.

    Screenshot of lab deletion.

1. Type **Yes** on the warning message.

    Screenshot of lab deletion confirmation message.

## Next steps

See other articles in the **How-to guides** -> **Create and configure lab plans (lab plan owner)** section of the table-of-content (TOC).
