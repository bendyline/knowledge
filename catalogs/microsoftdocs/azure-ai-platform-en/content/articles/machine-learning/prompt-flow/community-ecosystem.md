---
title: Prompt flow ecosystem
titleSuffix: Azure Machine Learning
description: Introduction to the prompt flow ecosystem, which includes the prompt flow open source project, tutorials, SDK, CLI and VS Code extension.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
ms.topic: concept-article
author: lgayhardt
ms.author: lagayhar
ms.reviewer: sooryar
ms.date: 02/28/2026
ms.update-cycle: 365-days
---

# Prompt flow ecosystem


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


The prompt flow ecosystem provides a comprehensive set of tutorials, tools, and resources for developers who want to leverage the power of prompt flow to experimentally tune their prompts and develop their LLM-based application in a pure local environment, without any dependencies on Azure resources binding. This article provides an overview of the key components within the ecosystem, which include:
 - **Prompt flow open source project** in GitHub.
 - **Prompt flow SDK and CLI** for seamless flow execution and integration with CI/CD pipeline.
 - **VS Code extension** for convenient flow authoring and development within a local environment.

## Prompt flow SDK/CLI

The prompt flow SDK/CLI empowers developers to use code to manage credentials, initialize flows, develop flows, and execute batch testing and evaluation of prompt flows locally.

It's designed for efficiency, allowing simultaneous triggering of large dataset-based flow tests and metric evaluations. Additionally, you can easily integrate the SDK/CLI into your CI/CD pipeline, automating the testing process.

To get started with the prompt flow SDK, explore and follow the [SDK quick start notebook](https://github.com/microsoft/promptflow/blob/main/examples/tutorials/get-started/quickstart.ipynb) in steps.

## VS Code extension

The ecosystem also provides a powerful VS Code extension designed for enabling you to easily and interactively develop prompt flows, fine-tune your prompts, and test them with a user-friendly UI.

Screenshot of the prompt flow extension in the VS Code showing the UI.&#x20;

To get started with the prompt flow VS Code extension, go to the extension marketplace to install and read the details tab.

Screenshot of the prompt flow extension in the VS Code marketplace.&#x20;

## Transition to production in cloud

After you develop and test your prompt flow within the community ecosystem, you might want to transition to a production-grade LLM application. Use Azure Machine Learning for this phase to ensure security, efficiency, and scalability.

You can shift your local flow to your Azure resource to leverage large-scale execution and management in the cloud. For more information, see [Integration with GenAIOps](how-to-integrate-with-llm-app-devops.md#go-back-to-studio-ui-for-continuous-development).

## Community support

The community ecosystem thrives on collaboration and support. Join the active community forums to connect with fellow developers, and contribute to the growth of the ecosystem.

[GitHub Repository: promptflow](https://github.com/microsoft/promptflow)

For questions or feedback, you can [open GitHub issue directly](https://github.com/microsoft/promptflow/issues/new) or reach out to pf-feedback@microsoft.com.


## Next steps

The prompt flow community ecosystem empowers developers to build interactive and dynamic prompts with ease. By using the prompt flow SDK and the VS Code extension, you can create compelling user experiences and fine-tune your prompts in a local environment.

- Join the [prompt flow community on GitHub](https://github.com/microsoft/promptflow).
