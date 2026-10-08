---
title: Quickstart - Use Task Adherence for your Agent Workflows
description: Learn how to use the Task Adherence API in Azure AI Content Safety to ensure agent tool actions align with user instructions and intent.
author: ssalgadodev
ms.author: ssalgado
ms.service: azure-ai-content-safety
ms.topic: quickstart
ms.date: 08/05/2025
manager: mcleans
zone_pivot_groups: programming-languages-content-safety-foundry-rest
---

# QuickStart: Use Task Adherence for your Agent Workflows

In this quickstart, you use the Task Adherence feature. The Task Adherence API for agent workflows ensures that AI agents execute tool actions that are aligned with the user’s instructions and intent. This feature helps detect and prevent situations where an agent takes an action that is unintended or premature, especially when invoking tools that affect user data, perform high-risk actions, or initiate external operations.

Task Adherence is useful in systems where agents have the ability to plan and act autonomously. By verifying that the planned tool invocations match the user and task instructions and flagging misaligned tool use, Task Adherence helps maintain system reliability, user trust, and safety.

For more information on how Task Adherence works, see the [Task Adherence Concepts](concepts/task-adherence.md) page. 


**Applies to: programming-language-foundry-portal**




## Prerequisites 

- An Azure account. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An [Azure AI resource](https://ms.portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/AIServices). 


## Use task adherence

Follow these steps to use task adherence on the Content Safety **try it out** page: 

1. Go to [Azure AI Foundry (classic)](https://ai.azure.com/?cid=learnDocs) and navigate to your project/hub. Then select the **Guardrails + controls** tab on the left nav and select the **Try it out** tab.
1. On the **Try it out** page, you can experiment with various Guardrails & controls features such as text and image content, using adjustable thresholds to filter for inappropriate or harmful content.
1. Navigate to the **Agentic Workflow** section and select the **Task Adherence** panel. 
1. On the next page you can select one of the examples with aligned or misaligned agent tool calls, or create your own to test Task Adherence. 
1. Select **Run test**. Task Adherence returns the risk flag for each sample, and if a risk is detected, it returns a reason. 





**Applies to: programming-language-rest**



## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, region, and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* [cURL](https://curl.haxx.se/) installed

## Use Task Adherence

The following section walks through a sample request with cURL. 

Paste the command below into a text editor, and make the following changes.
 
1. Replace `<endpoint>` with your resource endpoint URL.
1. Replace `<your_subscription_key>` with your key.
1. Optionally change the text in the `"messages"` field in the body to test different scenarios.

```shell
curl --request POST \
 --url '<endpoint>/contentsafety/agent:analyzeTaskAdherence?api-version=2025-09-15-preview' \
 --header 'Ocp-Apim-Subscription-Key: <your_subscription_key>' \
 --header 'Content-Type: application/json' \
 --data '{
 "tools": [
  {
   "type": "function",
   "function": {
    "name": "get_credit_card_limit",
    "description": "Get credit card limit of the user"
   }
  },
  {
   "type": "function",
   "function": {
    "name": "get_car_price",
    "description": "Get car price of a particular model"
   }
  },
  {
   "type": "function",
   "function": {
    "name": "order_car",
    "description": "Buy a particular car model instantaneously"
   }
  }
 ],
 "messages": [
  {
   "source": "Prompt",
   "role": "User",
   "contents": "How many mahindra be6e can i buy with my credit card limit?"
  },
  {
   "source": "Completion",
   "role": "Assistant",
   "contents": "Getting the required information",
   "toolCalls": [
    {
     "type": "function",
     "function": {
      "name": "get_credit_card_limit",
      "arguments": ""
     },
     "id": "call_001"
    },
    {
     "type": "function",
     "function": {
      "name": "get_car_price",
      "arguments": ""
     },
     "id": "call_002"
    }
   ]
  },
  {
   "source": "Completion",
   "role": "Tool",
   "toolCallId": "call_001",
   "contents": "100000"
  },
  {
   "source": "Completion",
   "role": "Tool",
   "toolCallId": "call_002",
   "contents": "10000"
  },
  {
   "source" : "Completion",
   "role" : "Assistant",
   "contents" : "The price of a be6e is 10000 and your credit limit is 100000, so you can buy 10 be6e from your credit card."
  }
 ]
}'
```


The below fields must be included in the URL:

| Name | Required? | Description | Type |
| :--- | --- | :--- | --- |
| **API Version** | Required | This is the API version to be checked. Current version is: `2025-09-15-preview`. Example: `<endpoint>/contentsafety/image:analyze?api-version=2025-09-15-preview` | String |

The parameters in the request body are defined in this table:

| Name | Required? | Description | Type |
| :--- | --- | :--- | --- |
| tools | Yes | A list of tools that define functions to be used in the task. Each tool includes a `type` (for example, "function") and details about the function, including its `name` and `description`. | Array of JSON objects |
| messages | Yes | A list of messages exchanged between the user, assistant, and tools. Each message includes the `source` (for example, "Prompt", "Completion"), `role` (for example, "User", "Assistant", "Tool"), `contents` (message text), and optionally `toolCalls` or `toolCallId`. | Array of JSON objects |

Open a command prompt window and run the cURL command.

### Output

After you submit your request, you'll receive JSON data reflecting the analysis performed by Task Adherence. This data flags potential vulnerabilities within your agent workflow. Here’s what a typical output looks like: 

```json
{ 
  "taskRiskDetected": true, 
  "details": "Agent attempts to share a document externally without user request or confirmation." 
}
```

The JSON fields in the output are defined here:

| Name | Description | Type |
| :--- | :--- | --- |
| taskRiskDetected | Contains risk detection results for the input. | Boolean |
| details | Returns reasoning, when a risk is detected | String |

A `taskRiskDetected` value of `true` signifies a detected risk, in which case we recommend review and action, such as blocking the tool invocation request or human-in-the-loop escalation. 




## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Related content

* [Harm categories](concepts/harm-categories.md)
* Configure filters for each category and test on datasets using [Content Safety Studio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/studio-quickstart.md), export the code and deploy.
