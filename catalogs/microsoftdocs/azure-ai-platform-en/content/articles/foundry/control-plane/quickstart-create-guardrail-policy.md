---
title: "Quickstart: Create a guardrail policy"
description: "Learn how to create a guardrail policy for model deployments in Microsoft Foundry so that you can govern the usage of guardrail controls across your subscription."
author: gregharen
ms.author: lagayhar 
ms.reviewer: gregharen
ms.date: 05/06/2026
ms.topic: quickstart
ms.service: microsoft-foundry
ms.subservice: foundry-control-plane
ms.custom: dev-focus, doc-kit-assisted
ai-usage: ai-assisted
#CustomerIntent: As a subscription owner, I want to manage guardrail policies in Microsoft Foundry so that I can monitor compliance status in Foundry Control Plane.
---

# Quickstart: Create a guardrail policy
In this quickstart, you create a policy in Microsoft Foundry to govern the use of guardrail controls for model deployments across your subscription.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Prerequisites


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


- A Foundry project. If you don't have one, [create a project](../how-to/create-projects.md).

- The [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner) or [Resource Policy Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#resource-policy-contributor) role at the subscription or resource group level. For more information, see the [overview of Azure Policy](https://learn.microsoft.com/azure/governance/policy/overview#azure-policy-and-azure-rbac).

> **Note:**
> This capability is available only in the [Microsoft Foundry (new) portal](../what-is-foundry.md).

## Create the guardrail policy

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.




1. On the toolbar, select **Operate**.

1. On the left pane, select **Compliance**.

1. Select **Create policy**.

    Screenshot of the Compliance pane of Foundry Control Plane.

1. Select the controls to add to the policy. Guardrail controls include content safety, prompt injection, and protected materials. These controls represent the minimum settings required for a model deployment to be considered compliant with the policy.

   As you configure each control, select **Add control** to add it to the policy.

    Screenshot of the area for adding controls.

1. Select **Next** to move to scope selection. You can scope your policy to a single subscription or a resource group.

   Select a scope, select the subscription or resource group that you want the policy to apply to, and then choose **Select**.

    Screenshot of the area for selecting a scope.

1. Select **Next** to add exceptions to the policy. The exception options depend on your scope selection:
   - If you scoped to a *subscription*, you can create exceptions for entire resource groups or individual model deployments within that subscription.
   - If you scoped to a *resource group*, you can create exceptions only for individual model deployments.

    Screenshot of the area for configuring exceptions.

1. Select **Next** to move to the review stage. Enter a name for your policy and review the scope, exceptions, and controls. When you're ready, select **Submit** to create the policy.

    Screenshot of the area for reviewing and submitting a guardrail policy.

## Verify your policy

After you submit your policy, verify that it was created successfully:

1. On the **Compliance** pane, select the **Policies** tab.

1. Locate your newly created policy in the policy list.

1. Check that the policy name, scope, and status are correct.

> **Note:**
> It takes some time for Azure Policy to perform a compliance scan. Initial compliance results might not appear immediately after policy creation. After the scan completes, return to the **Compliance** pane to review compliance status for your model deployments.

## Clean up resources

If you no longer need the guardrail policy, you can delete it:

1. On the **Compliance** pane, select the **Policies** tab.

1. Select the policy that you want to remove.

1. Select **Delete policy**, and then confirm the deletion.

> **Note:**
> Deleting a policy in the Foundry portal also removes the associated policy assignment in Azure Policy.

## Related content

- [Manage compliance and security in Microsoft Foundry](how-to-manage-compliance-security.md)
- [What is Microsoft Foundry Control Plane?](overview.md)
- [Enforce token limits for models](how-to-enforce-limits-models.md)
