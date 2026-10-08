---
title: Update an existing assignment from the portal
description: Learn about the mechanism for updating an existing blueprint assignment from the portal in Azure Blueprints.
ms.date: 09/07/2023
ms.topic: how-to
---
# How to update an existing blueprint assignment


> **Important:**
> Azure Blueprints (Preview) will be **retired on January 31, 2027**, with a phased retirement
> beginning July 31, 2026. Migrate your existing blueprint definitions and assignments to
> [Deployment Stacks](../../../azure-resource-manager/bicep/deployment-stacks.md) (recommended)
> and [Template Specs](../../../azure-resource-manager/bicep/template-specs.md). Blueprint
> artifacts are converted to ARM JSON templates or Bicep files used to define deployment stacks.
> For the full phased timeline, impact, and FAQ, see
> [Azure Blueprints retirement](../blueprint-retirement.md) or
> <https://aka.ms/AzureBlueprintsRetirement>. To learn how to author an artifact as an ARM
> resource, see:
>
> - [Policy](https://learn.microsoft.com/azure/templates/microsoft.authorization/policyassignments?pivots=deployment-language-bicep)
> - [RBAC](https://learn.microsoft.com/azure/templates/microsoft.authorization/roleassignments?pivots=deployment-language-bicep)
> - [Deployments](https://learn.microsoft.com/azure/templates/microsoft.resources/deployments?pivots=deployment-language-bicep)


When a blueprint is assigned, the assignment can be updated. There are several reasons for updating
an existing assignment, including:

- Add or remove [resource locking](../concepts/resource-locking.md)
- Change the value of [dynamic parameters](../concepts/parameters.md#dynamic-parameters)
- Upgrade the assignment to a newer **Published** version of the blueprint

## Updating assignments

1. Select **All services** in the left pane. Search for and select **Blueprints**.

1. Select **Assigned blueprints** from the page on the left.

1. In the list of blueprints, select the blueprint assignment. Then use the **Update assignment**
   button OR select and hold (or right-click) the blueprint assignment and select **Update
   assignment**.

   Screenshot of the Blueprint assignment page with the 'Update assignment' button highlighted.

1. The **Assign blueprint** page loads pre-filled with all values from the original assignment. You
   can change the **blueprint definition version**, the **Lock Assignment** state, and any of the
   dynamic parameters that exist on the blueprint definition. Select **Assign** when done making
   changes.

1. On the updated assignment details page, see the new status. In this example, we added **Locking**
   to the assignment.

   Screenshot of an updated blueprint assignment showing the lock mode changed.

1. Explore details about other **Assignment operations** using the dropdown list. The table of
   **Managed resources** updates by selected assignment operation.

   Screenshot of an updated blueprint assignment showing the assignment operations and their status.

## Rules for updating assignments

The deployment of the updated assignments follows a few important rules. These rules determine what
happens to already deployed resources. The requested change and the type of artifact resource being
deployed or updated determine which actions are taken.

- Role Assignments
  - If the role or the role assignee (user, group, or app) changes, a new role assignment is
    created. Role assignments previously deployed are left in place.
- Policy Assignments
  - If the parameters of the policy assignment are changed, the existing assignment is updated.
  - If the definition of the policy assignment is changed, a new policy assignment is created.
    Policy assignments previously deployed are left in place.
  - If the policy assignment artifact is removed from the blueprint, deployed policy assignments are
    left in place.
- Azure Resource Manager templates (ARM templates)
  - The template is processed through Resource Manager as a **PUT**. As each resource type handles
    this action differently, review the documentation for each included resource to determine the
    impact of this action when run by Blueprints.

## Possible errors on updating assignments

When updating assignments, it's possible to make changes that break when executed. An example is
changing the location of a resource group after it has already been deployed. Any change that are
supported by [Resource Manager](../../../azure-resource-manager/management/overview.md) can be made,
but any change that would result in an error through Resource Manager will also result in the
failure of the assignment.

There's no limit on how many times an assignment can be updated. If an error occurs, determine the
error and make another update to the assignment. Example error scenarios:

- A bad parameter
- An already existing object
- A change not supported by Resource Manager

## Next steps

- Learn about the [blueprint lifecycle](../concepts/lifecycle.md).
- Understand how to use [static and dynamic parameters](../concepts/parameters.md).
- Learn to customize the [blueprint sequencing order](../concepts/sequencing-order.md).
- Find out how to make use of [blueprint resource locking](../concepts/resource-locking.md).
- Resolve issues during the assignment of a blueprint with
  [general troubleshooting](../troubleshoot/general.md).
