---
title: "Create a custom Azure Policy for Foundry"
description: "Learn how to use custom Azure policies to enable self-service resource management in your organization, while applying guardrails and constraints on allowed configurations to meet security and compliance requirements."
author: s-polly
ms.author: scottpolly
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: how-to
ms.date: 05/12/2026
ms.reviewer: deeikele
ms.custom:
  - dev-focus
  - classic-and-new
  - doc-kit-assisted
#customer intent: As an admin, I want to enable self-service resource management while staying compliant with security and compliance requirements.
ai-usage: ai-assisted
---

# Create custom policies for Microsoft Foundry


Learn how to use custom Azure policies to enable teams to self-manage Microsoft Foundry resources. Apply guardrails and constraints on allowed configurations so you can provide flexibility while meeting security and compliance requirements.

By using custom policies, you can:

- **Enforce governance**: Prevent unauthorized creation of Foundry accounts, projects, or connections, and control which Azure resources accounts and projects can declare in their capability settings.
- **Control resource behavior**: Ensure security configurations, enforce tagging, or allow only approved integrations.
- **Ensure compliance**: Apply enterprise security and operational standards consistently across environments.

## Prerequisites

- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- 
Access to a role that allows you to complete role assignments, such as **Owner**. For more information about permissions, see [Role-based access control for Microsoft Foundry](../concepts/rbac-foundry.md#permissions-for-each-built-in-role).
- The **Resource Policy Contributor** role (least privilege) or **Owner** role at the scope where you create and assign the policy definition.

For more information, see [What is Azure Policy?](https://learn.microsoft.com/azure/governance/policy/overview)

## Steps to create a custom policy

1. **Open policy in the Azure portal**
   - Go to [Azure portal](https://portal.azure.com).
   - Search for _Policy_ and select it.

1. **Define a new policy**
   - In the **Authoring** section, select **Definitions** > **+ Policy definition**.
   - Provide:
     - **Definition location**: Subscription (applies to resources in a single subscription) or management group (applies across multiple subscriptions).
     - **Name**: A unique name (for example, `Deny-Unapproved-Connections`).
     - **Description**: Explain the purpose (for example, "Restrict Foundry connections to approved categories").
     - **Category**: Use an existing category or create one such as `AI Governance`.

1. **Add policy rule**
   - Enter the rule in [JSON format](https://learn.microsoft.com/azure/governance/policy/concepts/definition-structure-policy-rule). For example, the following policy restricts Foundry connections to approved categories:

      ```json
      {
        "mode": "All",
        "policyRule": {
          "if": {
            "anyOf": [
              {
                "allOf": [
                  {
                    "field": "type",
                    "equals": "Microsoft.CognitiveServices/accounts/connections"
                  },
                  {
                    "field": "Microsoft.CognitiveServices/accounts/connections/category",
                    "notIn": "[parameters('allowedCategories')]"
                  }
                ]
              },
              {
                "allOf": [
                  {
                    "field": "type",
                    "equals": "Microsoft.CognitiveServices/accounts/projects/connections"
                  },
                  {
                    "field": "Microsoft.CognitiveServices/accounts/projects/connections/category",
                    "notIn": "[parameters('allowedCategories')]"
                  }
                ]
              }
            ]
          },
          "then": {
            "effect": "Deny"
          }
        },
        "parameters": {
          "allowedCategories": {
            "type": "Array",
            "metadata": {
              "displayName": "Allowed connection categories",
              "description": "List of connection categories approved for use"
            }
          }
        }
      }
      ```

      For a complete, ready-to-use version of this policy, see the full sample:

      [Code reference unavailable in this source snapshot: ~/foundry-samples-main/infrastructure/infrastructure-setup-bicep/05-custom-policy-definitions/deny-disallowed-connections.json](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/how-to/custom-policy-definition.md)

      This policy denies creation of Foundry connections when the connection `category` isn't in the `allowedCategories` parameter. It applies to both `Microsoft.CognitiveServices/accounts/connections` and `Microsoft.CognitiveServices/accounts/projects/connections`.

      To customize the behavior, update `allowedCategories` (or override it when you assign the policy) with the connection categories your organization approves.

      For more information, see:

      - [Policy definition structure](https://learn.microsoft.com/azure/governance/policy/concepts/definition-structure)
      - [Policy rule structure](https://learn.microsoft.com/azure/governance/policy/concepts/definition-structure-policy-rule)
      - [Policy effects](https://learn.microsoft.com/azure/governance/policy/concepts/effects)

1. **Assign the policy**
   - After saving, assign the policy to the desired scope (management group, subscription, or resource group).
   - Supply the approved categories through the `allowedCategories` parameter. For example, assign the policy with the Azure CLI:

     ```azurecli
     az policy assignment create \
       --name "deny-unapproved-connections" \
       --policy "<policy-definition-id>" \
       --params '{ "allowedCategories": { "value": [ "BingLLMSearch" ] } }'
     ```

1. **Validate the policy assignment**
   - Try to create a connection with a category that isn't in `allowedCategories` and confirm the request is denied with a `RequestDisallowedByPolicy` error.
   - Try to create a connection with a category that is in `allowedCategories` and confirm the request succeeds.

## Common custom policy scenarios

- **Allow only approved connection categories**  
  Block any connection category other than those approved by your organization.

- **Deny connections that use API keys as the authentication type**  
  Require all other authentication types because API keys are typically less secure.

- **Audit Foundry resources without valid agent capability settings**  
  Check for the existence of a virtual network subnet ARM ID and custom storage resources when using Agent service in a regulated environment.

- **Deny creation of account kinds that don't have full Foundry capabilities**  
  Ensure new accounts are configured so users can access all Foundry capabilities.

## Sample library

Explore ready-to-use templates and examples in the GitHub repository:  
[Custom policy definitions](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep/05-custom-policy-definitions)

This library includes JSON templates for common scenarios.

## Troubleshooting

- If you can't create or assign a policy definition, confirm you have the required role at the scope you're using.
- If a connection isn't blocked as expected, confirm the policy assignment scope includes the target resource.
- If a policy blocks more resources than expected, review the `allowedCategories` value used in the assignment.
- Policy evaluation can take up to 30 minutes after assignment. To force immediate evaluation, run `az policy state trigger-scan --resource-group <resource-group-name>`.

## Next steps

- To review built-in and custom policies for comprehensive compliance, see [Built-in Policies for Foundry](../../ai-services/policy-reference.md).
- Test policies in a nonproduction environment before enforcing them broadly.
