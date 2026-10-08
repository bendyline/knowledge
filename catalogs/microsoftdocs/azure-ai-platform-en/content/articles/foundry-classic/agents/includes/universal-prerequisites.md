---
manager: mcleans
author: aahill
ms.author: aahi
ms.service: microsoft-foundry
ms.subservice: foundry-agent-service
ms.topic: include
ms.date: 05/12/2025
---

* [A set up agent environment](../environment-setup.md)
* Assign the **Foundry User**  [RBAC role](../../concepts/rbac-foundry.md) to each team member who needs to create or edit agents using the SDK or Agent Playground

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

    * This role must be assigned at the project scope
    * Minimum required permissions: **agents/*/read**, **agents/*/action**, **agents/*/delete**
