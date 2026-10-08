---
title: Create a Deployment Environment
titleSuffix: Azure Deployment Environments
description: Learn how to create and access an environment in Azure Deployment Environments by using the developer portal. 
author: RoseHJM
ms.author: rosemalcolm
ms.service: azure-deployment-environments
ms.custom: build-2023
ms.topic: quickstart
ms.date: 05/19/2026

#customer intent: As a developer, I want to create and access an environment so that I can use preconfigured Azure resources to deploy an application.
---

# Quickstart: Create and access an environment in Azure Deployment Environments


> **Note:**
> Transition your [Azure Deployment Environments](deployment-environments-retirement-guide.md) workflows to a Microsoft service, Azure service, or partner solution by 22 February 2027. Azure Deployment Environments retires on this date.

This quickstart describes how to create and access an [environment](concept-environments-key-concepts.md#environments) in Azure Deployment Environments by using the developer portal.

As a developer, you can create environments associated with a [project](concept-environments-key-concepts.md#projects) in Deployment Environments. An environment provides preconfigured Azure resources for deploying your application.

## Prerequisites

- Someone in your organization must configure Deployment Environments with a dev center and at least one project before you can create a deployment environment. To meet this prerequisite, platform engineers can complete the steps in [Quickstart: Configure Azure Deployment Environments](quickstart-create-and-configure-devcenter.md).
- You must have permissions as a Deployment Environments User for a project. If you don't have permissions for a project, contact your administrator.

## Create an environment

An environment in Deployment Environments is a collection of Azure resources on which your application is deployed. You can create an environment from the developer portal.


> **Note:**
> Only users who have the [Deployment Environments User](how-to-manage-deployment-environments-access.md) role, the [DevCenter Project Admin](how-to-manage-deployment-environments-access.md) role, or a built-in role that has appropriate permissions can create an environment. Users who have the [Deployment Environments Reader](how-to-manage-deployment-environments-access.md) role can view their own environments and environments created by others.


1. Go to the [developer portal](https://devportal.microsoft.com). The landing page contains useful information and links. When you're ready, select **Sign in**. 

   Screenshot of the developer portal landing page. Sign in is highlighted.

#### [No existing environments](#tab/no-existing-environments)

2. If you don't have any environments, you see this screen. Select **New environment**.

   Screenshot of the developer portal. New environment is highlighted.

#### [Existing environments](#tab/existing-environments)

2. Select **New environment**.
 
   Screenshot of the developer portal with the New environment button highlighted.
 
---
 
3. In the **Add an environment** pane, enter or select the following information:

   | Field | Value |
   | --- | --- |
   | **Name** | Enter a descriptive name for your environment. |
   | **Project** | Select the project you want to create the environment in. If you have access to more than one project, you see a list of available projects. |
   | **Type** | Select the environment type you want to create. If you have access to more than one environment type, you see a list of available types. |
   | **Definition** | Select the environment definition you want to use to create the environment. You see a list of the environment definitions that are available from the catalogs associated with your dev center. |

   Screenshot showing the Add an environment pane.

   If your environment is configured to accept parameters, you can enter them on a separate pane. In this example, you don't need to specify any parameters.

4. Select **Create**. You see your environment in the developer portal immediately. An indicator shows the progress of the environment creation.

## Access an environment

You can access and manage your environments in the Deployment Environments developer portal.

1. Sign in to the [developer portal](https://devportal.microsoft.com).

1. You can view all of your existing environments. To access the resources created as part of an environment, select **View resources**.

   Screenshot showing an environment card. The View resources link is highlighted.

1. You can view the resources in your environment in the Azure portal:

   Screenshot showing the list of environment resources.

   Creating an environment automatically creates a resource group that stores the environment's resources. The resource group name follows the pattern `<projectName>-<environmentName>`. You can view the resource group in the Azure portal.

## Related content

- [Add and configure a catalog](how-to-configure-catalog.md)
- [Add and configure an environment definition](configure-environment-definition.md)
