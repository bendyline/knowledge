---
title: Specify marketplace images for a lab in Azure Lab Services
description: This article shows you how to specify which Marketplace images can be used during lab creation.
ms.topic: how-to
ms.date: 07/04/2022
ms.custom: devdivchpfy22
---

# Specify Marketplace images available to lab creators


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).



> **Note:**
> This article references features available in [lab plans](concept-lab-accounts-versus-lab-plans.md), which replaced lab accounts.


> **Note:**
> If you're using [lab accounts](concept-lab-accounts-versus-lab-plans.md), see [Specify Marketplace images with lab accounts](specify-marketplace-images-1.md).

As an admin, you can specify the Marketplace images that educators can use when creating labs.

## Select images available for labs

Select **Marketplace images** on the menu to the left. By default, you can see the full list of images (both enabled and disabled). You can filter for **Status** to be equal to **Enabled** or **Disabled**.

Screenshot that shows the Marketplace images page for a lab plan. The Marketplace images menu and status filter are highlighted.

The Marketplace images that are displayed in the list are only the ones that satisfy the following conditions:

- Creates a single VM.
- Uses Azure Resource Manager to provision VMs.
- Doesn't require purchasing an extra licensing plan.

## Enable and disable images

To enable one or more images:

1. Check images you want to enable.
1. Select **Enable image** button.
1. Select **Apply**.

Screenshot of Marketplace images page for lab account. A disabled image is selected from the list of images.

To disable one or images:

1. Check images you want to disable.
1. Select **Disable image** button.
1. Select **Apply**.

## Next steps

- As an educator, [create and manage labs](how-to-manage-classroom-labs.md).
- As an educator, [configure and publish templates](how-to-create-manage-template.md).
- As an educator, [configure and control usage of a lab](how-to-manage-lab-users.md).
- As a student, [access labs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/how-to-use-lab.md).
