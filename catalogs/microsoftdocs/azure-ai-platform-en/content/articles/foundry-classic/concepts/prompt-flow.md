---
title: "Prompt flow in Microsoft Foundry portal (classic)"
description: "This article introduces prompt flow in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
  - build-2024
  - ignite-2024
  - hub-only
ms.topic: concept-article
ms.date: 01/30/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Prompt flow in Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




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
> alternatives such as [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) before the retirement date. For migration guidance, see the Prompt flow [migration guide](../how-to/prompt-flow-migration-overview.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).




Prompt flow is a development tool that streamlines the entire development cycle of AI applications powered by large language models (LLMs). Prompt flow provides a comprehensive solution that simplifies the process of prototyping, experimenting, iterating, and deploying your AI applications.

Prompt flow is available independently as an open-source project on [GitHub](https://github.com/microsoft/promptflow), with its own SDK and [VS Code extension](https://marketplace.visualstudio.com/items?itemName=prompt-flow.prompt-flow). Prompt flow is also available and recommended to use as a feature within both [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) and [Azure Machine Learning studio](https://ml.azure.com). This set of documentation focuses on prompt flow in Foundry portal.

> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../how-to/migrate-project.md).


Definitions:

- *Prompt flow* is a feature that you can use to generate, customize, or run a flow.
- A *flow* is an executable instruction set that implements the AI logic.​​ You can create or run flows through multiple tools, like a prebuilt canvas, LangChain, and others. You save iterations of a flow as assets. Once deployed, a flow becomes an API. Not all flows are prompt flows. Rather, prompt flow is one way to create a flow. 
- A *prompt* is a package of input sent to a model, consisting of the user input, system message, and any examples. User input is text submitted in the chat window. System message is a set of instructions to the model that scope its behaviors and functionality.
- A *sample flow* is a simple, prebuilt orchestration flow that shows how flows work, and can be customized. 
- A *sample prompt* is a defined prompt for a specific scenario that can be copied from a library and used as-is or modified in prompt design. 

## Benefits of prompt flow

By using prompt flow in Foundry portal, you can:

- Orchestrate executable flows with LLMs, prompts, and Python tools through a visualized graph.
- Debug, share, and iterate your flows with ease through team collaboration.
- Create prompt variants and compare their performance.

### Prompt engineering agility

- Interactive authoring experience: Prompt flow provides a visual representation of the flow's structure, so you can easily understand and navigate projects. 
- Variants for prompt tuning: You can create and compare multiple prompt variants, facilitating an iterative refinement process.
- Evaluation: Built-in evaluation flows enable you to assess the quality and effectiveness of your prompts and flows.
- Comprehensive resources: Prompt flow includes a library of built-in tools, samples, and templates that serve as a starting point for development, inspiring creativity, and accelerating the process.

### Enterprise readiness

- Collaboration: Prompt flow supports team collaboration, so multiple users can work together on prompt engineering projects, share knowledge, and maintain version control.
- All-in-one platform: Prompt flow streamlines the entire prompt engineering process, from development and evaluation to deployment and monitoring. You can effortlessly deploy your flows as Azure AI endpoints and monitor their performance in real-time, ensuring optimal operation and continuous improvement.
- Enterprise Readiness Solutions: Prompt flow applies robust Azure AI enterprise readiness solutions, providing a secure, scalable, and reliable foundation for the development, experimentation, and deployment of flows.

By using prompt flow in Foundry portal, you can unleash prompt engineering agility, collaborate effectively, and apply enterprise-grade solutions for successful LLM-based application development and deployment.

## Flow development lifecycle

Prompt flow offers a well-defined process that facilitates the seamless development of AI applications. By using it, you can effectively progress through the stages of developing, testing, tuning, and deploying flows, ultimately resulting in the creation of fully fledged AI applications.

The lifecycle consists of the following stages:

- Initialization: Identify the business use case, collect sample data, learn to build a basic prompt, and develop a flow that extends its capabilities.
- Experimentation: Run the flow against sample data, evaluate the prompt's performance, and iterate on the flow if necessary. Continuously experiment until satisfied with the results.
- Evaluation and refinement: Assess the flow's performance by running it against a larger dataset, evaluate the prompt's effectiveness, and refine as needed. Proceed to the next stage if the results meet the desired criteria.
- Production: Optimize the flow for efficiency and effectiveness, deploy it, monitor performance in a production environment, and gather usage data and feedback. Use this information to improve the flow and contribute to earlier stages for further iterations.

By following this structured and methodical approach, prompt flow empowers you to develop, rigorously test, fine-tune, and deploy flows with confidence, resulting in the creation of robust and sophisticated AI applications.

## Flow types

In Foundry portal, you can start a new flow by selecting a flow type or a template from the gallery. 

Screenshot of example flow types and templates from the gallery.

Here are some examples of flow types:

- **Standard flow**: Designed for general application development, the standard flow allows you to create a flow using a wide range of built-in tools for developing LLM-based applications. It provides flexibility and versatility for developing applications across different domains.
- **Chat flow**: Tailored for conversational application development, the Chat flow builds upon the capabilities of the standard flow and provides enhanced support for chat inputs and outputs and chat history management. By using native conversation mode and built-in features, you can seamlessly develop and debug your applications within a conversational context.
- **Evaluation flow**: Designed for evaluation scenarios, the evaluation flow enables you to create a flow that takes the outputs of previous flow runs as inputs. This flow type allows you to evaluate the performance of previous run results and output relevant metrics, facilitating the assessment and improvement of their models or applications.

## Flows

A flow in Prompt flow serves as an executable workflow that streamlines the development of your LLM-based AI application. It provides a comprehensive framework for managing data flow and processing within your application.

Within a flow, nodes take center stage, representing specific tools with unique capabilities. These nodes handle data processing, task execution, and algorithmic operations, with inputs and outputs. By connecting nodes, you establish a seamless chain of operations that guides the flow of data through your application.

To facilitate node configuration and fine-tuning, a visual representation of the workflow structure is provided through a DAG (Directed Acyclic Graph) graph. This graph showcases the connectivity and dependencies between nodes, providing a clear overview of the entire workflow.

Screenshot of an example directed acyclic graph in prompt flow editor.

By using the flow feature in Prompt flow, you can design, customize, and optimize the logic of your AI application. The cohesive arrangement of nodes ensures efficient data processing and effective flow management, empowering you to create robust and advanced applications.

## Prompt flow tools

Tools are the fundamental building blocks of a flow.

In Foundry portal, tool options include the [LLM tool](../how-to/prompt-flow-tools/llm-tool.md), [Prompt tool](../how-to/prompt-flow-tools/prompt-tool.md), [Python tool](../how-to/prompt-flow-tools/python-tool.md), and more.

Screenshot of tool options in prompt flow editor.

Each tool is a simple, executable unit with a specific function. By combining different tools, you can create a flow that accomplishes a wide range of goals. For example, you can use the LLM tool to generate text or summarize an article and the Python tool to process the text to inform the next flow component or result.

One of the key benefits of Prompt flow tools is their seamless integration with third-party APIs and Python open source packages. This integration not only improves the functionality of large language models but also makes the development process more efficient for developers.

If the prompt flow tools in Foundry portal don't meet your requirements, you can [develop your own custom tool and make it a tool package](https://microsoft.github.io/promptflow/how-to-guides/develop-a-tool/create-and-use-tool-package.html). To discover more custom tools developed by the open source community, visit [prompt flow custom tools](https://microsoft.github.io/promptflow/integrations/tools/index.html).

## Related content

- [Build with prompt flow in Foundry portal](../how-to/flow-develop.md)
- [Get started with prompt flow in VS Code](https://microsoft.github.io/promptflow/how-to-guides/quick-start.html)
