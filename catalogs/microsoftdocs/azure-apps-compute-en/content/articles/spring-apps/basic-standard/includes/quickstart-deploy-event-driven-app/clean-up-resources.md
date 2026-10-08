---
author: karlerickson
ms.author: v-shilichen
ms.service: azure-spring-apps
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

<!-- 
For clarity of structure, a separate markdown file is used to describe how to clean up resources using Azure portal or AZD.

[!INCLUDE [clean-up-resources-portal-or-azd](includes/quickstart-deploy-event-driven-app/clean-up-resources.md)]

-->

## 6. Clean up resources

Be sure to delete the resources you created in this article when you no longer need them. You can delete the Azure resource group, which includes all the resources in the resource group.

**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure CLI](#tab/Azure-CLI)

Use the following command to delete the entire resource group, including the newly created service:

```azurecli
az group delete --name ${RESOURCE_GROUP}
```

---



**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following command to delete all the Azure resources used in this sample application:

```bash
azd down
```

The following list describes the command interactions:

- **Total resources to delete: \<your-resources-total>, are you sure you want to continue?**: Press <kbd>y</kbd>.
- **Would you like to permanently delete these resources instead, allowing their names to be reused?**: Press <kbd>y</kbd>. Press <kbd>n</kbd> if you want to reuse the Key Vault.

The console outputs messages similar to the following example:

```output
SUCCESS: Your application was removed from Azure in xx minutes xx seconds.
```

---
