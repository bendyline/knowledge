---
title: Include file
description: Include file
author: s-polly
ms.service: azure-machine-learning
services: machine-learning
ms.topic: include
ms.date: 03/22/2023
ms.author: scottpolly
ms.custom: include file
---

## Set your kernel and open in Visual Studio Code (VS Code)

1. On the top bar above your opened notebook, create a compute instance if you don't already have one.

    Screenshot shows how to create a compute instance.

1. If the compute instance is stopped, select **Start compute** and wait until it's running.

    Screenshot shows how to start a stopped compute instance.

1. Wait until the compute instance is running. Then make sure that the kernel, found on the top right, is `Python 3.10 - SDK v2`. If not, use the dropdown list to select this kernel.

    Screenshot shows how to set the kernel.

    If you don't see this kernel, verify that your compute instance is running. If it is, select the **Refresh** button on the top right of the notebook.

1. If you see a banner that says you need to be authenticated, select **Authenticate**.

1. You can run the notebook here, or open it in VS Code for a full integrated development environment (IDE) with the power of Azure Machine Learning resources. Select **Open in VS Code**, then select either the web or desktop option.  When launched this way, VS Code is attached to your compute instance, the kernel, and the workspace file system.

    Screenshot shows how to open the notebook in VS Code.

> **Important:**
> The rest of this tutorial contains cells of the tutorial notebook. Copy and paste them into your new notebook, or switch to the notebook now if you cloned it.
