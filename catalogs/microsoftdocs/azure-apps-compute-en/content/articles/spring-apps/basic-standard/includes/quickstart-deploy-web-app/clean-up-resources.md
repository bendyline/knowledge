---
author: KarlErickson
ms.author: xiada
ms.service: azure-spring-apps
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

<!--
For clarity of structure, a separate markdown file is used to describe how to clean up resources using Azure portal or AZD.

[!INCLUDE [clean-up-resources-portal-or-azd](includes/quickstart-deploy-web-app/clean-up-resources.md)]

-->

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](../../includes/quickstart-deploy-web-app/clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](../../includes/quickstart-deploy-web-app/clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following command to delete all the Azure resources used in this sample application:

```bash
azd down
```

The following list describes the command interaction:

- **Total resources to delete: \<resources-total>, are you sure you want to continue?**: Press <kbd>y</kbd>.

The console outputs messages similar to the following example:

```output
SUCCESS: Your application was removed from Azure in xx minutes xx seconds.
```

---
