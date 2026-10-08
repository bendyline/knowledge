---
title: "Python tool for flows in Microsoft Foundry portal (classic)"
description: "This article introduces you to the Python tool for flows in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom: 
  - ignite-2023
  - devx-track-python
  - build-2024
  - ignite-2024
  - hub-only
ms.topic: concept-article
ms.date: 01/27/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Python tool for flows in Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


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
> alternatives such as [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) before the retirement date. For migration guidance, see the Prompt flow [migration guide](../prompt-flow-migration-overview.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).




The prompt flow Python tool provides customized code snippets as self-contained executable nodes. You can quickly create Python tools, edit code, and verify results.

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


## Build with the Python tool

1. Create or open a flow in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). For more information, see [Create a flow](../flow-develop.md).
1. Select **+ Python** to add the Python tool to your flow.

    Screenshot that shows the Python tool added to a flow in Foundry portal.

1. Enter values for the Python tool input parameters that are described in the [Inputs table](#inputs). For example, in the **Code** input text box, enter the following Python code:

    ```python
    from promptflow import tool

    @tool
    def my_python_tool(message: str) -> str:
        return 'hello ' + message
    ```

    For more information, see [Python code input requirements](#python-code-input-requirements).

1. Add more tools to your flow, as needed. Or select **Run** to run the flow.
1. The outputs are described in the [Outputs table](#outputs). Based on the previous example Python code input, if the input message is "world," the output is `hello world`.

## Inputs

The list of inputs changes based on the arguments of the tool function, after you save the code. Adding type to arguments and `return` values helps the tool show the types properly.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| Code | string | The Python code snippet. | Yes |
| Inputs | - | The list of the tool function parameters and its assignments. | - |

## Outputs

The output is the `return` value of the Python tool function. For example, consider the following Python tool function:

```python
from promptflow import tool

@tool
def my_python_tool(message: str) -> str:
    return 'hello ' + message
```

If the input message is "world," the output is `hello world`.

### Types

| Type | Python example | Description |
| --- | --- | --- |
| int | param: int | Integer type |
| bool | param: bool | Boolean type |
| string | param: str | String type |
| double | param: float | Double type |
| list | param: list or param: List[T] | List type |
| object | param: dict or param: Dict[K, V] | Object type |
| Connection | param: CustomConnection | Connection type is handled specially. |

Treat parameters with the `Connection` type annotation as connection inputs. This treatment means:

- The prompt flow extension shows a selector to select the connection.
- During execution time, the prompt flow tries to find the connection with the same name from the parameter value that you pass in.

> **Note:**
> The `Union[...]` type annotation supports only connection type. An example is `param: Union[CustomConnection, OpenAIConnection]`.

## Python code input requirements

This section describes requirements for the Python code input for the Python tool.

- Python tool code should consist of complete Python code, including any necessary module imports.
- Python tool code must contain a function decorated with `@tool` (tool function), serving as the entry point for execution. Apply the `@tool` decorator only once within the snippet.
- Assign Python tool function parameters in the `Inputs` section.
- Python tool function must have a return statement and value, which is the output of the tool.

The following Python code is an example of best practices:

```python
from promptflow import tool

@tool
def my_python_tool(message: str) -> str:
    return 'hello ' + message
```

## Consume a custom connection in the Python tool

If you're developing a Python tool that requires calling external services with authentication, use the custom connection in a prompt flow. By using this connection, you can securely store the access key and then retrieve it in your Python code.

### Create a custom connection

Create a custom connection that stores all your large language model API key or other required credentials.



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


1. Go to the **Management center** page for your project. 
1. Under either the **Hub** or **Project** heading, select **Connected resources**.
1. Select **+ New Connection**.
1. Select **Custom** service. You can define your connection name. Select **Add key-value pairs** to add multiple key-value pairs to store your credentials and keys.

    > **Note:**
    > Make sure at least one key-value pair is set as secret. Otherwise, the connection isn't created successfully. To set one key-value pair as secret, select **is secret** to encrypt and store your key value.

### Consume a custom connection in Python

To consume a custom connection in your Python code:

1. In the code section of your Python node, import the custom connection library by using `from promptflow.connections import CustomConnection`. Define an input parameter of the type `CustomConnection` in the tool function.
1. Parse the input to the input section. Then select your target custom connection in the value dropdown list.

For example:

```python
from promptflow import tool
from promptflow.connections import CustomConnection

@tool
def my_python_tool(message: str, myconn: CustomConnection) -> str:
    # Get authentication key-values from the custom connection
    connection_key1_value = myconn.key1
    connection_key2_value = myconn.key2
```

## Next steps

- [Learn more about how to create a flow](../flow-develop.md)
