---
title: IdentitySelector UI element
description: Describes the Microsoft.ManagedIdentity.IdentitySelector UI element for Azure portal. Use to assign managed identities to a resource.
ms.topic: reference
ms.date: 06/21/2024
---

# Microsoft.ManagedIdentity.IdentitySelector UI element

A control for assigning [managed identities](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) for a resource in a deployment.

## UI sample

The control consists of the following elements:

Microsoft.ManagedIdentity.IdentitySelector first step

When the user selects **Add**, the following form opens. The user can select one or more user-assigned identities for the resource.

Microsoft.ManagedIdentity.IdentitySelector second step

The selected identities are displayed in the table. The user can add or delete items from this table.

Microsoft.ManagedIdentity.IdentitySelector third step

## Schema

```json
{
  "name": "identity",
  "type": "Microsoft.ManagedIdentity.IdentitySelector",
  "label": "Managed Identity Configuration",
  "toolTip": {
    "systemAssignedIdentity": "Enable system assigned identity to grant the resource access to other existing resources.",
    "userAssignedIdentity": "Add user assigned identities to grant the resource access to other existing resources."
  },
  "defaultValue": {
    "systemAssignedIdentity": "Off"
  },
  "options": {
    "hideSystemAssignedIdentity": false,
    "hideUserAssignedIdentity": false
  },
  "visible": true
}
```

## Sample output

```json
{
  "identity": {
    "value": {
      "type": "UserAssigned",
      "userAssignedIdentities": {
        "/subscriptions/xxxx/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/TestUserIdentity1": {}
      }
    }
  }
}
```

## Remarks

- Use `defaultValue.systemAssignedIdentity` to set an initial value for the system assigned identity options control. The default value is `Off`. The following values are allowed:
  - `On` – A system assigned identity is assigned to the resource.
  - `Off` – A system assigned identity isn't assigned to the resource.
  - `OnOnly` – A system assigned identity is assigned to the resource. Users can't edit this value during deployment.
  - `OffOnly` – A system assigned identity isn't assigned to the resource. Users can't edit this value during deployment.

- If `options.hideSystemAssignedIdentity` is set to `true`, the UI to configure the system assigned identity isn't displayed. The default value for this option is `false`.
- If `options.hideUserAssignedIdentity` is set to `true`, the UI to configure the user assigned identity isn't displayed. The resource isn't assigned a user assigned identity. The default value for this option is `false`.

## Next steps

- For an introduction to creating UI definitions, see [Getting started with CreateUiDefinition](create-uidefinition-overview.md).
- For a description of common properties in UI elements, see [CreateUiDefinition elements](create-uidefinition-elements.md).
