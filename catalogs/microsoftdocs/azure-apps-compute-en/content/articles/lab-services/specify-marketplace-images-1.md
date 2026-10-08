---
title: Specify marketplace images in a lab account 
description: This article shows you how to specify the Marketplace images that a lab creator can use to create labs.
ms.topic: how-to
ms.date: 02/15/2022
---

# Specify Marketplace images available to lab creators in a lab account


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


> **Important:**
> The information in this article applies to lab accounts. Azure Lab Services **lab plans** replace **lab accounts**. Learn how you can get started by [creating a lab plan](quick-create-resources.md). For existing lab account customers, we recommend that you [migrate from lab accounts to lab plans](how-to-migrate-lab-acounts-to-lab-plans.md).


As a lab account owner, you can specify the Marketplace images that lab creators can use to create labs in the lab account.

## Select images available for labs

Select **Marketplace images** on the menu to the left. By default, you see the full list of images (both enabled and disabled). You can filter  for **Status** to be equal to **Enabled** or **Disabled**.

Screenshot that shows the Marketplace images page for a lab account.  The Marketplace images menu and status filter are highlighted.

The Marketplace images that are displayed in the list are only the ones that satisfy the following conditions:

- Creates a single VM.
- Uses Azure Resource Manager to provision VMs
- Doesn't require purchasing an extra licensing plan

## Enable and disable images

To enable one or more images:

1. Check images you want to enable.
2. Select **Enable image** button.
3. Select **Apply**.

Screenshot of Marketplace images page for lab account.  A disabled image is selected from the list of images.

To disable one or images:

1. Check images you want to disable.
2. Select **Disable image** button.
3. Select **Apply**.

## Next steps

- As an educator, [create and manage labs](how-to-manage-classroom-labs.md).
- As an educator, [configure and publish templates](how-to-create-manage-template.md).
- As an educator, [configure and control usage of a lab](how-to-manage-lab-users.md).
- As a student, [access labs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md).
