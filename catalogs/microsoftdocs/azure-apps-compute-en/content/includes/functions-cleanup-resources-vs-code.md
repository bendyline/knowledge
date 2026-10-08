---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 05/19/2022
ms.author: glenga
ms.custom: devdivchpfy22
---

## Clean up resources

When you continue to the [next step](#next-steps) and add an Azure Storage queue binding to your function, you'll need to keep all your resources in place to build on what you've already done.

Otherwise, you can use the following steps to delete the function app and its related resources to avoid incurring any further costs.


1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. In the command palette, search for and select `Azure: Open in portal`.

1. Choose your function app and press <kbd>Enter</kbd>. The function app page opens in the Azure portal.

3. In the **Overview** tab, select the named link next to **Resource group**.

   Screenshot of select the resource group to delete from the function app page.

1. On the **Resource group** page, review the list of included resources, and verify that they're the ones you want to delete.

5. Select **Delete resource group**, and follow the instructions.

   Deletion may take a couple of minutes. When it's done, a notification appears for a few seconds. You can also select the bell icon at the top of the page to view the notification.


For more information about Functions costs, see [Estimating Consumption plan costs](../articles/azure-functions/functions-consumption-costs.md).
