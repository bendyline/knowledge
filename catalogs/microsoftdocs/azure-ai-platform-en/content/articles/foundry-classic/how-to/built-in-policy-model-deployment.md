---
title: "Control AI model deployment with built-in policies (classic)"
description: "Learn how to use built-in Azure policies to control what managed Foundry Tools (serverless API deployment) and Model-as-a-Platform (MaaP) AI models can be deployed in Microsoft Foundry portal. (classic)"
ms.author: scottpolly 
author: s-polly 
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: how-to #Don't change
ms.date: 02/02/2026
ms.reviewer: aashishb
reviewer: aashishb_microsoft
ms.custom: dev-focus
ai-usage: ai-assisted
#customer intent: As an admin, I want control what Managed Foundry Tools (serverless API deployment) and Model-as-a-Platform (MaaP) AI models can be deployed by my developers.

---

# Control AI model deployment with built-in policies in Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



Use Azure Policy to control which AI models your developers can deploy in Foundry portal. This article shows how to assign the built-in policy for Managed Foundry Tools (serverless API deployment) and Model-as-a-Platform (MaaP) models.

> **Tip:**
> The steps in this article govern the deployment of MaaS and MaaP models for both a 
Foundry project and 
hub-based project.

## Prerequisites

- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- One of the following Azure RBAC roles at the subscription or resource group level:
    - [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner)
    - [Resource Policy Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#resource-policy-contributor)
- Familiarity with [Azure Policy](https://learn.microsoft.com/azure/governance/policy/overview).
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and the [Bicep CLI](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install) installed.

## Enable the policy

You can assign the policy by using Bicep or the Azure portal.

> **Note:**
> The policy is named "[Preview]: Azure Machine Learning Deployments should only use approved Registry Models" because Foundry uses the Azure Machine Learning resource provider for model deployments.

### [Bicep](#tab/bicep)

Use the following Bicep template to assign the policy to a resource group. This example allows only the `gpt-35-turbo` model from the `azure-openai` registry.

1. Save the following code as `main.bicep`.

    ```bicep
    targetScope = 'resourceGroup'

    param policyAssignmentName string = 'allowed-models-assignment'
    param allowedModelPublishers array = []
    param allowedAssetIds array = [
      'azureml://registries/azure-openai/models/gpt-35-turbo/versions/3'
    ]

    // Policy Definition ID for "[Preview]: Azure Machine Learning Deployments should only use approved Registry Models"
    var policyDefinitionId = '/providers/Microsoft.Authorization/policyDefinitions/12e5dd16-d201-47ff-849b-8454061c293d'

    resource policyAssignment 'Microsoft.Authorization/policyAssignments@2024-04-01' = {
      name: policyAssignmentName
      properties: {
        policyDefinitionId: policyDefinitionId
        parameters: {
          allowedModelPublishers: {
            value: allowedModelPublishers
          }
          allowedAssetIds: {
            value: allowedAssetIds
          }
        }
        displayName: 'Allow specific AI models'
        description: 'This policy assignment restricts AI model deployments to the specified list.'
      }
    }
    ```

1. Deploy the Bicep file by using Azure CLI.

    ```azurecli
    az deployment group create --resource-group <your-resource-group> --template-file main.bicep
    ```

    Replace `<your-resource-group>` with the name of your resource group. On success, the command returns JSON with `"provisioningState": "Succeeded"`.

1. Verify the policy assignment.

    ```azurecli
    az policy assignment show --name allowed-models-assignment --resource-group <your-resource-group>
    ```

1. Notify your developers that the policy is in place. They receive an error message if they try to deploy a model that isn't in the list of allowed models.

**Reference:**
- [Microsoft.Authorization/policyAssignments Bicep resource](https://learn.microsoft.com/azure/templates/microsoft.authorization/policyassignments)
- [az deployment group create](https://learn.microsoft.com/cli/azure/deployment/group#az-deployment-group-create)
- [az policy assignment show](https://learn.microsoft.com/cli/azure/policy/assignment#az-policy-assignment-show)

### [Azure portal](#tab/portal)

1. From the [Azure portal](https://portal.azure.com), select **Policy** from the left side of the page. You can also search for **Policy** in the search bar at the top of the page.
1. From the left side of the Azure Policy Dashboard, select **Authoring**, **Definition**, and then search for "[Preview]: Azure Machine Learning Deployments should only use approved Registry Models" in the search bar within the page. You can also directly navigate to [policy definition creation page](https://portal.azure.com/#blade/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F12e5dd16-d201-47ff-849b-8454061c293d).
1. Select **Assign** to assign the policy to the management group:

    - **Scope**: Select the scope where you want to assign the policy. The scope can be a management group, subscription, or resource group.
    - **Policy definition**: this section already has a value of "**[Preview]: Azure Machine Learning Deployments should only use approved Registry Models**".
    - **Assignment name**: Enter a unique name for the assignment.

    You can leave the rest of the fields as their default values or customize them as needed for your organization.

1. Select **Next** at the bottom of the page or the **Parameters** tab at the top of the page.
1. In the **Parameters** tab, deselect **Only show parameters that needs input or review** to see all fields:

    - **Effect**: Set to [**Deny**](https://learn.microsoft.com/azure/governance/policy/concepts/effect-deny).
        > **Note:**
        > By using the [audit](https://learn.microsoft.com/azure/governance/policy/concepts/effect-audit) option, you can configure the policy to log information to your own compliance dashboard.
    - **Allowed Models Publishers**: Enter a list of publisher names enclosed in quotation marks, separated by commas.
    - **Allowed Asset Ids**: Enter a list of model asset IDs enclosed in quotation marks, separated by commas.

        To get the model asset ID strings and model publishers' name, use the following steps:

        1. Go to the [Foundry model catalog](../concepts/foundry-models-overview.md).

        1. For each model you want to allow, select the model to view the details. In the model detail information, copy the **Model ID** value. For example, the value might look like `azureml://registries/azure-openai/models/gpt-35-turbo/versions/3` for GPT-3.5-Turbo model. The provided names are also *Collections* in model catalog. For example, the publisher for "Meta-Llama-3.1-70B-Instruct" model is Meta. 
        
            > **Important:**
            > The model ID value must be an exact match for the model. If the model ID isn't an exact match, the model isn't allowed.

1. Select **Review + create** tab and verify that the policy assignment is correct. When ready, select **Create** to assign the policy.

---

## Monitor compliance

To monitor compliance with the policy, follow these steps:

1. From the [Azure portal](https://portal.azure.com), select **Policy** from the left side of the page. You can also search for **Policy** in the search bar at the top of the page.
1. From the left side of the Azure Policy Dashboard, select **Compliance**. Each policy assignment is listed with the compliance status. To view more details, select the policy assignment.

## Update the policy assignment

To update an existing policy assignment with new models, follow these steps:

1. From the [Azure portal](https://portal.azure.com), select **Policy** from the left side of the page. You can also search for **Policy** in the search bar at the top of the page.
1. From the left side of the Azure Policy Dashboard, select **Assignments** and find the existing policy assignment. Select the ellipsis (...) next to the assignment and select **Edit assignment**.
1. From the **Parameters** tab, update the **Allowed models** parameter with the new model IDs.
1. From the **Review + Save** tab, select **Save** to update the policy assignment.

## Best practices

- **Granular scoping**: Assign policies at the appropriate scope to balance control and flexibility. For example, apply at the subscription level to control all resources in the subscription, or apply at the resource group level to control resources in a specific group.
- **Policy naming**: Use a consistent naming convention for policy assignments to make it easier to identify the purpose of the policy. Include information such as the purpose and scope in the name.
- **Documentation**: Keep records of policy assignments and configurations for auditing purposes. Document any changes you make to the policy over time.
- **Regular reviews**: Periodically review policy assignments to ensure they align with your organization's requirements.
- **Testing**: Test policies in a nonproduction environment before applying them to production resources.
- **Communication**: Make sure developers are aware of the policies in place and understand the implications for their work.

## Troubleshooting

| Issue | Solution |
| --- | --- |
| Policy doesn't block deployments | Verify the policy assignment scope includes the target resource group. Check that the effect is set to **Deny**, not **Audit**. |
| Model ID not recognized | Ensure the model ID is an exact match, including the version number (for example, `azureml://registries/azure-openai/models/gpt-35-turbo/versions/3`). |
| Policy assignment fails | Confirm you have the Owner or Resource Policy Contributor role at the target scope. |
| Changes don't take effect immediately | Policy evaluation can take up to 30 minutes. To force evaluation, use `az policy state trigger-scan`. |

## Related content

- [Azure Policy overview](https://learn.microsoft.com/azure/governance/policy/overview)
- [Foundry model catalog](../concepts/foundry-models-overview.md)
