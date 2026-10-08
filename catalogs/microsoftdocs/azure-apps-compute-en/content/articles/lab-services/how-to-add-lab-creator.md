---
title: 'How to add a lab creator to a lab account with Azure Lab Services'
titleSuffix: Azure Lab Services
description: Learn how to grant a user access to create labs.
ms.topic: tutorial
services: lab-services
ms.service: azure-lab-services
author: RoseHJM
ms.author: rosemalcolm
ms.date: 06/27/2024
ms.custom: subject-rbac-steps
---

# Add a user to the Lab Creator role


> **Important:**
> Azure Lab Services **lab plans** replace **lab accounts**. Learn how you can get started by [creating a lab plan](quick-create-resources.md). For existing lab account customers, we recommend that you [migrate from lab accounts to lab plans](how-to-migrate-lab-acounts-to-lab-plans.md).


To grant people the permission to create labs, add them to the Lab Creator role.

Follow these steps to [assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

> **Note:**
> Azure Lab Services automatically assigns the Lab Creator role to the Azure account you use to create the lab account.

1. On the **Lab Account** page, select **Access control (IAM)**.

1. From the **Access control (IAM)** page, select **Add** > **Add role assignment**.

    Screenshot that shows the Access control (I A M) page with Add role assignment menu option highlighted.

1. On the **Role** tab, select the **Lab Creator** role.

    Screenshot that shows the Add role assignment page with Role tab selected.

1. On the **Members** tab, select the user you want to add to the Lab Creators role.

1. On the **Review + assign** tab, select **Review + assign** to assign the role.

## Next steps

In this article, you granted lab creation permissions to another user. To learn about how to create a lab, see [Manage labs in Azure Lab Services when using lab accounts](how-to-manage-classroom-labs.md).
