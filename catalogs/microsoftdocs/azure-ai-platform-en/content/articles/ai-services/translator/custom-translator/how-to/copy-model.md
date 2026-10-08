---
title: Copy an Azure Custom Translator model
titleSuffix: Foundry Tools
description: This article explains how to copy a custom model to another Custom Translator workspace.
author: laujan
manager: mcleans
ms.service: azure-translator-foundry-tools
ms.date: 06/02/2026
ms.author: lajanuar
ms.topic: how-to
---

# Copy a Custom Translator model

Copying a model to other workspaces enables model lifecycle management (for example, development → test → production) and increases usage scalability while reducing the training cost.

## Copy custom model to another workspace

   > **Note:**
   >
   > To copy model from one workspace to another, you must have an **Owner** role in both workspaces.
   >
   > The copied model can't be recopied. You can only rename, delete, or publish a copied model.

1. After successful model training, select the **Model details** blade.

1. Select the **Model Name** to copy.

1. Select **Copy to workspace**.

1. Fill out the target details.

   Screenshot illustrating the copy model dialog window.

   > **Note:**
      >
      > A dropdown list displays the list of workspaces available to use. Otherwise, select **Create a new workspace**.
      >
      > If selected workspace contains a project for the same language pair, it can be selected from the Project dropdown list, otherwise, select **Create a new project** to create one.

1. Select **Copy model**.

1. A notification panel shows the copy progress. The process should complete fairly quickly:

   Screenshot illustrating notification that the copy model is in process.

1. After **Copy model** completion, a copied model is available in the target workspace and ready to publish. A **Copied model** watermark is appended to the model name.

   Screenshot illustrating the copy complete dialog window.

## Next steps

> 
> [Learn how to publish/deploy a Custom Translator model](publish-model.md).
