---
title: Include file
description: Include file
author: sdgilley
ms.reviewer: sgilley
ms.author: sgilley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 08/25/2026
ms.custom: include
---

1. Get the project's resource ID:

   ```azurecli
   PROJECT_ID=$(az cognitiveservices account project show \
       --name my-foundry-resource \
       --resource-group my-foundry-rg \
       --project-name my-foundry-project \
       --query id -o tsv)
   ```

1. Assign the **Foundry User** role to a team member:

   
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


   ```azurecli
   az role assignment create \
       --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" \
       --assignee "user@contoso.com" \
       --assignee-principal-type User \
       --scope $PROJECT_ID
   ```


> **Note:**
> Because the Foundry RBAC roles were recently renamed, use the role definition ID (GUID) instead of the role name in your code to avoid issues during the rename rollout:
> - **Foundry User**: `53ca6127-db72-4b80-b1b0-d745d6d5456d`
> - **Foundry Owner**: `c883944f-8b7b-4483-af10-35834be79c4a`
> - **Foundry Account Owner**: `e47c6f54-e4a2-4754-9501-8e0985b135e1`
> - **Foundry Project Manager**: `eadc314b-1a2d-4efa-be10-5d325db5065e`


   To add a security group instead of an individual user:

   ```azurecli
   az role assignment create \
       --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" \
       --assignee-object-id "<security-group-object-id>" \
       --assignee-principal-type Group \
       --scope $PROJECT_ID
   ```

1. Verify the role assignment:

   ```azurecli
   az role assignment list \
       --scope $PROJECT_ID \
       --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" \
       --output table
   ```

Reference: [az role assignment](https://learn.microsoft.com/cli/azure/role/assignment)
