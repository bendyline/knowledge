---
title: How to add additional owners to a lab in Azure Lab Services
description: This article shows you how an administrator can add a user as an owner to a lab in Azure Lab Services. 
ms.topic: how-to
ms.date: 08/03/2021
ms.custom:
  - subject-rbac-steps
  - sfi-image-nochange
---

# How to add additional owners to an existing lab in Azure Lab Services


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


> **Important:**
> The information in this article applies to lab accounts. Azure Lab Services **lab plans** replace **lab accounts**. Learn how you can get started by [creating a lab plan](quick-create-resources.md). For existing lab account customers, we recommend that you [migrate from lab accounts to lab plans](how-to-migrate-lab-acounts-to-lab-plans.md).


This article shows you how you, as an administrator, can add additional owners to an existing lab.

## Add user to the reader role for the lab account
1. Back on the **Lab Account** page, select **All labs** on the left menu.
2. Select the **lab** to which you want to add user as an owner. 

    Select the lab&#x20;  
1. In the navigation menu, select **Access control (IAM)**.

1. Select **Add** > **Add role assignment**.

    Access control (IAM) page with Add role assignment menu open.

1. On the **Role** tab, select the **Reader** role.

    Add role assignment page with Role tab selected.

1. On the **Members** tab, select the user you want to add to the Reader role.

1. On the **Review + assign** tab, select **Review + assign** to assign the role.
## Add user to the owner role for the lab

> **Note:**
> If the user has only Reader access on the a lab, the lab isn't shown in labs.azure.com. For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).


1. On the **Lab Account** page, select **Access control (IAM)**

1. Select **Add** > **Add role assignment**.

    Access control (IAM) page with Add role assignment menu open.

1. On the **Role** tab, select the **Owner** role.

    Add role assignment page with Role tab selected.

1. On the **Members** tab, select the user you want to add to the Owner's role

1. On the **Review + assign** tab, select **Review + assign** to assign the role.


## Next steps
Confirm that the user sees the lab upon logging into the [Lab Services portal](https://labs.azure.com).
