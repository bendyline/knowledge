---
title: Start, Stop, and Delete an Application in Azure Spring Apps
description: Need to start, stop, or delete your Azure Spring Apps application? Learn how to manage the state of an Azure Spring Apps application.
author: KarlErickson
ms.service: azure-spring-apps
ms.topic: how-to
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.author: karler
ms.custom: devx-track-java, devx-track-extended-java, engagement-fy23
---

# Start, stop, and delete an application in Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


**This article applies to:** ✅ Java ✅ C#

**This article applies to:** ✅ Basic/Standard ✅ Enterprise

This guide explains how to change an application's state in Azure Spring Apps by using either the Azure portal or the Azure CLI.

## Prerequisites

- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- A deployed Azure Spring Apps service instance. Follow the [quickstart on deploying an app via the Azure CLI](quickstart.md) to get started.
- At least one application already created in your service instance.

## Application state

Your applications running in Azure Spring Apps might not need to run continuously. For example, an application might not always need to run if it's used only during business hours.

There might be times where you wish to stop or start an application. You can also restart an application as part of general troubleshooting steps or delete an application you no longer require.

## Manage application state

After you deploy an application, you can start, stop, and delete it by using the [Azure portal](https://portal.azure.com) or [Azure CLI](https://learn.microsoft.com/cli/azure/).

### [Azure portal](#tab/azure-portal)

1. Go to your Azure Spring Apps service instance in the [Azure portal](https://portal.azure.com).

1. Go to **Settings** and select **Apps**.

1. Select the application whose state you want to change.

1. On the **Overview** page for that application, select **Start/Stop**, **Restart**, or **Delete**.

   Screenshot of Azure portal showing the Overview page of the demo app.

### [Azure CLI](#tab/azure-cli)

1. First, use the following command to install the Azure Spring Apps extension for Azure CLI:

   ```azurecli-interactive
   az extension add --name spring
   ```

1. Next, perform any of the following Azure CLI operations:

   - Start your application:

     ```azurecli-interactive
     az spring app start \
         --resource-group <resource-group-name> \
         --service <Azure-Spring-Apps-instance-name> \
         --name <application-name>
     ```

   - Stop your application:

     ```azurecli
     az spring app stop \
         --resource-group <resource-group-name> \
         --service <Azure-Spring-Apps-instance-name> \
         --name <application-name>
     ```

   - Restart your application:

     ```azurecli
     az spring app restart \
         --resource-group <resource-group-name> \
         --service <Azure-Spring-Apps-instance-name> \
         --name <application-name>
     ```

   - Delete your application:

     ```azurecli
     az spring app delete \
         --resource-group <resource-group-name> \
         --service <Azure-Spring-Apps-instance-name> \
         --name <application-name>
     ```

---

## Next steps

> 
> [Start or stop your Azure Spring Apps service instance](how-to-start-stop-service.md)
