---
title: "Role-based access control for Microsoft Foundry (classic)"
description: "This article introduces role-based access control in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.custom:
  - classic-and-new
  - ignite-2023
  - build-2024
  - ignite-2024
ms.topic: concept-article
ms.date: 04/13/2026
ms.reviewer: meerakurup
ms.author: sgilley 
author: sdgilley 
ai-usage: ai-assisted
ROBOTS: NOINDEX, NOFOLLOW
---

# Role-based access control for Microsoft Foundry (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/concepts/rbac-foundry.md)

> **Tip:**
> This article is for a Foundry project type. An alternate RBAC article for hub-based projects is available: [Role-based access control for Microsoft Foundry (Hubs and Projects)](hub-rbac-foundry.md).

In this article, you learn about role-based access control (RBAC) in your Microsoft Foundry resource and how to assign roles that control access to resources.  

> **Tip:**
> RBAC roles apply when you authenticate using Microsoft Entra ID. If you use key-based authentication instead, the key grants full access without role restrictions. Microsoft recommends using Entra ID authentication for improved security and granular access control.


## Minimum role assignments to get started

For new users to Azure and Microsoft Foundry, start with these minimum assignments so both your user principal and project managed identity can access Foundry features.

You can verify current assignments by using [Check access for a user to a single Azure resource](https://learn.microsoft.com/azure/role-based-access-control/check-access?tabs=default).

* Assign the **Foundry User** role on your Foundry resource to your **user principal**.

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

* Assign the **Foundry User** role on your Foundry resource to your **project's managed identity**.
* If users need to view quota or run deployment eligibility checks, assign the **Cognitive Services Usages Reader** role at the subscription scope. For more information, see [Access quota and usage information](../../foundry/concepts/rbac-foundry.md#access-quota-and-usage-information).

If the user who created the project can assign roles (for example, by having the Azure Owner role at the subscription or resource group scope), both assignments are added automatically **when the project is created through the Microsoft Foundry portal UI**.

> **Tip:**
> If a user or service principal only needs to interact with agents (for example, calling the Responses API) without creating or modifying them, assign **Foundry Agent Consumer** instead of **Foundry User**. This role provides least-privilege access for agent consumers.

To assign the **Foundry User** role manually, use the following quick steps.

### Assign Foundry User role to your user principal

In the Azure portal, open your Foundry resource and go to **Access control (IAM)**. Create a role assignment for **Foundry User**, set **Members** to **User, group, or service principal**, select your user principal, and then select **Review + assign**.

### Assign Foundry User role to your project's managed identity

In the Azure portal, open your Foundry resource and go to **Access control (IAM)**. Create a role assignment for **Foundry User**, set **Members** to **Managed identity**, select your project's managed identity, and then select **Review + assign**.

## Terminology for role-based access control in Foundry

To understand role-based access control in Microsoft Foundry, consider two questions for your enterprise. 

* What permissions do I want my team to have when building in Microsoft Foundry?
* At what scope do I want to assign permissions to my team?

To help answer these questions, here are descriptions of some terminology used throughout this article. 

* **Permissions**: Allowed or denied actions that an identity can perform on a resource, such as reading, writing, deleting, or managing both control plane and data plane operations.
* **Scope**: The set of Azure resources to which a role assignment applies. Typical scopes include subscription, resource group, Foundry resource, Foundry project, or an individual agent.
* **Role**: A named collection of permissions that defines which actions can be performed on Azure resources at a given scope.

An identity gets a *role* with specific *permissions* at a selected *scope* based on your enterprise requirements.

In Microsoft Foundry, consider the following scopes when completing role assignments. 

* **Foundry resource**: The top-level scope that defines the administrative, security, and monitoring boundary for a Microsoft Foundry environment.
* **Foundry project**: A sub-scope within a Foundry resource used to organize work and enforce access control for Foundry APIs, tools, and developer workflows.
* **Agent**: A narrower scope within a Foundry project that applies to an individual agent. Role assignments at this scope are currently evaluated only for agent endpoint access, so use this scope to grant access to a specific agent's endpoints without granting endpoint access to all agents in the project. For more information, see [Agent-scope role assignments](../../foundry/concepts/rbac-foundry.md#agent-scope-role-assignments).

## Built-in roles

A **built-in role** in Foundry is a role created by Microsoft that covers common access scenarios that you can assign to your team members. Key built-in roles used across Azure include Owner, Contributor, and Reader. These roles aren't specific to Foundry resource permissions. 

For Foundry resources, use additional built-in roles to follow least-privilege access principles. The following table lists key built-in roles for Foundry and links to the exact role definitions in [AI + Machine Learning built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/ai-machine-learning).

| Role | Description |
| --- | --- |
| **Foundry Agent Consumer** | Grants access to interact with agent endpoints in a Foundry project. Least-privilege access role for principals that only need to interact with agents. |
| **Foundry User** | Grants reader access to Foundry project, Foundry resource, and data actions for your Foundry project. If you can assign roles, this role is assigned to you automatically. Otherwise, your subscription Owner or a user with role assignment permissions grants it. Least-privilege access role for developers building and testing agents. |
| **Foundry Project Manager** | Lets you perform management actions on Foundry projects, build and develop with projects, and conditionally assign the Foundry User role to other user principals. |
| **Foundry Account Owner** | Grants full access to manage projects and resources, and lets you conditionally assign the Foundry User, ACR, and monitoring roles to other user principals. |
| **Foundry Owner** | Grants full access to manage projects and resources and build and develop with projects. Lets you conditionally assign the Foundry User, ACR, and monitoring roles. Highly privileged self-serve role designed for digital natives. |

> **Note:**
> Except for **Cognitive Services Usages Reader** when users need quota visibility, don't assign built-in roles that start with **Cognitive Services**. These roles are designed for accessing AI Services resources directly and don't apply to Foundry scenarios.
>
> Similarly, don't use the **Azure AI Developer** role for Foundry work. Despite the name, this role is scoped to Azure Machine Learning workspaces and Foundry hubs, not to Foundry projects or Foundry hosted agents. For Foundry project access, use **Foundry User** or **Foundry Owner** instead.



### Permissions for each built-in role

Use the following table and diagram to see the permissions allowed for each built-in role in Foundry, including the key Azure built-in roles. 

| Built-in role | Create Foundry projects | Create Foundry accounts | Build and develop in a project (data actions) | Complete role assignments | Reader access to projects and accounts | Manage models |
| --- | --- | --- | --- | --- | --- | --- |
| **Foundry User** |  |  | ✔ |  | ✔ |  |
| **Foundry Project Manager** | ✔ |  | ✔ | ✔ (only assign Foundry User role) | ✔ |  |
| **Foundry Account Owner** | ✔ | ✔ |  | ✔ (only assign Foundry User role) | ✔ | ✔ |
| **Foundry Owner** | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| **Owner** | ✔ | ✔ |  | ✔ (assign any role to any user) | ✔ | ✔ |
| **Contributor** | ✔ | ✔ |  |  | ✔ | ✔ |
| **Reader** |  |  |  |  | ✔ |  |


> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.




Use these tabs to explore the differences between the built-in roles, assigned at the Foundry resource level (except for Owner, which is assigned at the subscription level)

# [Owner](#tab/owner)

Diagram shows access for Owner.

# [Foundry Owner](#tab/ai-owner)

Diagram shows access for Foundry Owner.

# [Foundry Account Owner](#tab/ai-account-owner)

Diagram shows access for Foundry Account Owner.

# [Foundry Project Manager](#tab/ai-project-manager)

Diagram shows access for Foundry Project Manager.

# [Foundry User](#tab/ai-user)

Diagram shows access for Foundry User.


---

## Sample enterprise RBAC mappings for projects

Here's an example of how to implement role-based access control (RBAC) for an enterprise Foundry resource. 

| Persona | Role and Scope | Purpose |
| --- | --- | --- |
| IT admin | Owner on subscription scope | The IT admin ensures the Foundry resource meets enterprise standards. Assign managers the **Foundry Account Owner** role on the resource to let them create new Foundry accounts. Assign managers the **Foundry Project Manager** role on the resource to let them create projects within an account. |
| Managers | Foundry Account Owner on Foundry resource scope | Managers manage the Foundry resource, deploy models, audit compute resources, audit connections, and create shared connections. They can't build in projects, but they can assign the **Foundry User** role to themselves and others to start building. |
| Team lead or lead developer | Foundry Project Manager on Foundry resource scope | Lead developers create projects for their team and start building in those projects. After you create a project, project owners invite other members and assign the **Foundry User** role. |
| Team members or developers | Foundry User on Foundry project scope and Reader on the Foundry resource scope | Developers build agents in a project with pre-deployed Foundry models and pre-built connections. |
| Agent consumers or end users | Foundry Agent Consumer on Foundry project scope (or agent scope for per-agent control) | Users and service principals that only need to interact with agents through their endpoints. This role provides least-privilege access without granting broader development capabilities. |


## Manage role assignments

To manage roles in Foundry, you must have permission to assign and remove roles in Azure. The Azure built-in **Owner** role includes that permission. You can assign roles through the Foundry portal (Admin page), Azure portal IAM, or Azure CLI. You can remove roles by using Azure portal IAM or Azure CLI.

In the Foundry portal, manage permissions by:

1. On the **Home** page in [Foundry](https://ai.azure.com/?cid=learnDocs), select your Foundry resource.
1. Select **Users** to add or remove users for the resource.

You can manage permissions in the [Azure portal](https://portal.azure.com) under **Access Control (IAM)** or by using Azure CLI.

For example, the following command assigns the Foundry User role to `joe@contoso.com` for resource group `this-rg` in subscription `00000000-0000-0000-0000-000000000000`:

```azurecli
az role assignment create --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" --assignee "joe@contoso.com" --scope /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/this-rg 
```


> **Note:**
> Because the Foundry RBAC roles were recently renamed, use the role definition ID (GUID) instead of the role name in your code to avoid issues during the rename rollout:
> - **Foundry User**: `53ca6127-db72-4b80-b1b0-d745d6d5456d`
> - **Foundry Owner**: `c883944f-8b7b-4483-af10-35834be79c4a`
> - **Foundry Account Owner**: `e47c6f54-e4a2-4754-9501-8e0985b135e1`
> - **Foundry Project Manager**: `eadc314b-1a2d-4efa-be10-5d325db5065e`



## Create custom roles for projects

If the built-in roles don't meet your enterprise requirements, create a custom role that allows for precise control over allowed actions and scopes. Here's an example subscription-level custom role definition:

```json
{
  "Name": "My Enterprise Foundry User",
  "IsCustom": true,
  "Description": "Custom role for Foundry at my enterprise to only allow building Agents. Assign at subscription level.",
  "Actions": [
    "Microsoft.CognitiveServices/*/read",
    "Microsoft.Authorization/*/read",
    "Microsoft.CognitiveServices/accounts/listkeys/action",
    "Microsoft.Resources/deployments/*"
  ],
  "NotActions": [],
  "DataActions": [
    "Microsoft.CognitiveServices/accounts/AIServices/agents/*"
  ],
  "NotDataActions": [],
  "AssignableScopes": ["/subscriptions/<your-subscription-id>"]
}
```

Save the definition to a file and create the role:

```azurecli
az role definition create --role-definition custom-role.json
```

> **Note:**
> This format is what the Azure CLI and Azure PowerShell accept. The REST API and Azure Resource Manager templates wrap the same fields in a `properties` object and use camel case, such as `roleName` instead of `Name`.

For more information on creating a custom role, see the following articles.

- [Azure portal](https://learn.microsoft.com/azure/role-based-access-control/custom-roles-portal)
- [Azure CLI](https://learn.microsoft.com/azure/role-based-access-control/custom-roles-cli)
- [Azure PowerShell](https://learn.microsoft.com/azure/role-based-access-control/custom-roles-powershell)
- [Disable preview features in Microsoft Foundry](../../foundry/how-to/disable-preview-features.md). This article provides more details on specific permissions in Foundry across control and data plane which you can utilize when building custom roles.

## Notes and limitations

* To view and purge deleted Foundry accounts, you must have the Contributor role assigned at the subscription scope.
* Users with the Contributor role can deploy models in Foundry.
* You need the Owner role on a resource's scope to create custom roles in the resource.
* If you have permissions to role assign in Azure (for example, the Owner role assigned on the account scope) to your user principal, and you deploy a Foundry resource from the Azure portal or Foundry portal UI, then the Foundry User role gets automatically assigned to your user principal. This assignment doesn't apply when deploying Foundry from SDK or CLI. 

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

* When you create a Foundry resource, the built-in role-based access control (RBAC) permissions give you access to the resource. To use resources created outside Foundry, ensure the resource has permissions that let you access it. Here are some examples: 
    * To use a new Azure Blob Storage account, add the Foundry account resource's managed identity to the Storage Blob Data Reader role on that storage account. 
    * To use a new Azure AI Search source, add Foundry to the Azure AI Search role assignments.
* To fine-tune a model in Foundry, you need both data plane and control plane permissions. Deploying a fine-tuned model is a control plane permission. Therefore, the only built-in role with both data plane and control plane permissions is the **Foundry Owner** role. Or, if you prefer, you can also assign the **Foundry User** role for data plane permissions and the **Foundry Account Owner** role for control plane permissions.


## Related content

- [Create a project](../how-to/create-projects.md).
- [Add a connection in Foundry portal](../how-to/connections-add.md).
- [Authentication and Authorization in Foundry](authentication-authorization-foundry.md).
- [Disable preview features in Microsoft Foundry](../../foundry/how-to/disable-preview-features.md).


## Appendix

### Access Isolation Examples

Each organization may have different access isolation requirements depending on the user personas in their enterprise. Access isolation refers to which users in your enterprise are given what role assignments for either a separation of permissions using our built-in roles or a unified, highly permissive role. There are three access isolation options for Foundry that you can select for your organization depending on your access isolation requirements. 

**No access isolation.** This means in your enterprise, you don't have any requirements separating permissions between a developer, project manager, or an admin. The permissions for these roles can be assigned across teams. 

Therefore, you should...
* Grant all users in your enterprise the **Foundry Owner** role on the resource scope 

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


**Partial access isolation.** This means the project manager in your enterprise should be able to develop within projects as well as create projects. But your admins shouldn't be able to develop within Foundry, only create Foundry projects and accounts. 

Therefore, you should...
* Grant your admin with **Foundry Account Owner** on the resource scope
* Grant your developer and project managers with **Foundry Project Manager** role on the resource 

**Full access isolation.** This means your admins, project managers, and developers have clear permissions assigned that don't overlap for their different functions within an enterprise. 

Therefore you should...
* Grant your admin the **Foundry Account Owner** on resource scope
* Grant your developer the **Reader** role on Foundry resource scope and **Foundry User** on project scope
* Grant your project manager the **Foundry Project Manager** role on resource scope
* Grant your agent consumers the **Foundry Agent Consumer** role on project scope (or agent scope for per-agent control)

### Use Microsoft Entra groups with Foundry

Microsoft Entra ID provides several ways to manage access to resources, applications, and tasks. By using Microsoft Entra groups, you can grant access and permissions to a group of users instead of to each individual user. Enterprise IT admins can create Microsoft Entra groups in the Azure portal to simplify the role assignment process for developers. When you create a Microsoft Entra group, you can minimize the number of role assignments required for new developers working on Foundry projects by assigning the group the required role assignment on the necessary resource.

Complete the following steps to use Microsoft Entra ID groups with Foundry:

1. Create a **Security** group in **Groups** in the Azure portal.
1. Add an owner and the user principals in your organization who need shared access.
1. Open the target resource and go to **Access control (IAM)**.
1. Assign the required role to **User, group, or service principal**, and select the new security group.
1. Select **Review + assign** so the role assignment applies to all members of the group.

Common examples:

* To build agents, run traces, and use core Foundry capabilities, assign **Foundry User** to the Microsoft Entra group.
* To allow interaction with agents without broader development access, assign **Foundry Agent Consumer** to the Microsoft Entra group.
* To use Tracing and Monitoring features, assign **Reader** on the connected Application Insights resource to the same group.

To learn more about Microsoft Entra ID groups, prerequisites, and limitations, refer to:

- [Learn about groups, group membership, and access in Microsoft Entra](https://learn.microsoft.com/entra/fundamentals/concept-learn-about-groups).
- [How to manage groups in Microsoft Entra](https://learn.microsoft.com/entra/fundamentals/how-to-manage-groups).
