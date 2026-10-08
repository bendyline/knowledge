---
title: Compute session in Azure Machine Learning prompt flow
titleSuffix: Azure Machine Learning
description: Learn about how in Azure Machine Learning prompt flow, the execution of flows is facilitated by using compute session.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.custom:
  - ignite-2023
  - build-2024
ms.topic: concept-article
author: lgayhardt
ms.author: lagayhar
ms.reviewer: sooryar
ms.date: 11/14/2025
ms.update-cycle: 365-days
---

# Compute session in prompt flow


> **Warning:**
> Prompt flow in Microsoft Foundry and Azure Machine Learning will be retired on April 20, 2027. Prompt flow is no longer 
> recommended for new development. Migrate existing Prompt flow applications and deployments to Microsoft Agent Framework before 
> April 20, 2027.
>  
> Prompt flow container images are no longer receiving updates, including security and package updates. This applies to Prompt 
> flow runtime images, including `promptflow-runtime`, `promptflow-runtime-stable`, and `promptflow-python`.
>  
> After April 20, 2027, Prompt flow, including the web authoring experience in Microsoft Foundry and Azure Machine Learning, the 
> VS Code extensions, and related Prompt flow container images, will no longer be supported or available.
> 
> If your application depends on Prompt flow deployments or runtime images, plan to move those workloads to supported 
> alternatives such as [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) before the retirement date. For migration guidance, see the
> Prompt flow [migration guide](migrate-prompt-flow-to-agent-framework.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).


In Azure Machine Learning prompt flow, you use a compute session to run flows.

## Compute sessions

In prompt flow, compute sessions serve as computing resources that enable customers to execute their flows seamlessly. A compute session is equipped with a prebuilt Docker image that includes our built-in tools, ensuring that all necessary tools are readily available for execution. Compute session is managed by Azure Machine Learning, providing users with a convenient and efficient way to execute their flows without the need to manage the underlying infrastructure.

Within the Azure Machine Learning workspace, you can create a compute session by using the predefined base image. This base image is set up to reference the prebuilt Docker image, so you can get started easily and efficiently. We regularly update the base image to ensure it aligns with the latest version of the Docker image. You can also add Python packages to the base image through the `requirements.txt` file, which are installed during the creation of the compute session, and manually install them in a running compute session.

If you want more customization, prompt flow lets you create a custom base image. By using our prebuilt Docker image as a foundation, you can easily customize your image by adding your preferred packages, configurations, or other dependencies. After you customize the environment, you can publish it as a custom base image within the Azure Machine Learning workspace, so you can create a compute session based on your custom base image.

In addition to running flows, the compute session also validates and ensures the accuracy and functionality of the tools incorporated within the flow when you update the prompt or code content.

## Next steps

- [Manage compute session in prompt flow](how-to-manage-compute-session.md)
