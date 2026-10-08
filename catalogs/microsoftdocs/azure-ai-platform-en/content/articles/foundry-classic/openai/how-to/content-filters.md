---
title: "Configure content filters (classic)"
description: "Learn how to use and configure the content filters that come with Microsoft Foundry, including getting approval for gated modifications. (classic)"
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: how-to
ms.date: 09/08/2026
author: ssalgadodev
ms.author: ssalgado
recommendations: false
ms.custom: FY25Q1-Linter
# customer intent: As a developer, I want to learn how to configure content filters with Microsoft Foundry so that I can ensure that my applications comply with our Code of Conduct.
---

# Configure content filters (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



The content filtering system integrated into Microsoft Foundry runs alongside the core models, including image generation models. It uses an ensemble of multi-class classification models to detect four categories of harmful content (violence, hate, sexual, and self-harm) at four severity levels respectively (safe, low, medium, and high), and optional binary classifiers for detecting jailbreak risk, existing text, and code in public repositories. 

The default content filtering configuration is set to filter at the medium severity threshold for all four content harms categories for both prompts and completions. That means that content that is detected at severity level medium or high is filtered, while content detected at severity level low or safe is not filtered by the content filters. Learn more about content categories, severity levels, and the behavior of the content filtering system [here](../../foundry-models/concepts/content-filter.md). 

Prompt shields and protected text and code models are optional and on by default. For prompt shields and protected material text and code models, the configurability feature allows all customers to turn the models on and off. The models are by default on and can be turned off per your scenario. Some models are required to be on for certain scenarios to retain coverage under the [Customer Copyright Commitment](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/openai/customer-copyright-commitment).

> **Note:**
> All customers can modify the content filters and configure the severity thresholds (low, medium, high). In addition, customers can choose to switch to annotate only or disable prompt filtering. Approval is required for turning the content filters partially or fully off on completions. Managed customers only can apply for full content filtering control via this form: [Limited Access Review: Modified Content Filters](https://ncv.microsoft.com/uEfCgnITdR). At this time, it's not possible to become a managed customer.

Content filters can be configured at the resource level. Once a new configuration is created, it can be associated with one or more deployments. For more information about model deployment, see the [resource deployment guide](create-resource.md).

## Prerequisites

* You must have an Azure OpenAI resource and a large language model (LLM) deployment to configure content filters. Follow a [quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/chatgpt-quickstart?) to get started.

## Understand content filter configurability




Azure OpenAI in Microsoft Foundry Models includes default safety settings applied to all models (excluding audio API models such as Whisper). These configurations provide you with a responsible experience by default, including content filtering models, blocklists, prompt transformation, [content credentials](../concepts/content-credentials.md), and others. [Read more about it here](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/default-safety-policies). 

All customers can also configure content filters and create custom content policies that are tailored to their use case requirements. The configurability feature allows customers to adjust the settings, separately for prompts and completions, to filter content for each content category at different severity levels as described in the table below. Content detected at the 'safe' severity level is labeled in annotation output but isn't subject to filtering and isn't configurable.

| Severity filtered | Configurable for prompts | Configurable for completions | Descriptions |
| --- | --- | --- | --- |
| Low, medium, high | Yes | Yes | Strictest filtering configuration. Content detected at severity levels low, medium, and high is filtered. |
| Medium, high | Yes | Yes | Content detected at severity level low isn't filtered, content at medium and high is filtered. |
| High | Yes | Yes | Content detected at severity levels low and medium isn't filtered. Only content at severity level high is filtered. |
| No filters | Yes | If approved<sup>1</sup> | No content is blocked or annotated. Requires approval for completion<sup>1</sup>. |
| Annotate only | Yes | If approved<sup>1</sup> | Disables the filter functionality, so content isn't blocked, but annotations are returned via API response. Requires approval for completion<sup>1</sup>. |

<sup>1</sup> For Azure OpenAI models, only customers who have been approved for modified content filtering have full content filtering control and can turn off content filters. Apply for modified content filters via this form: [Limited Access Review: Modified Content Filters](https://ncv.microsoft.com/uEfCgnITdR). For Azure Government customers, apply for modified content filters via this form: [Azure Government - Request Modified Content Filtering](https://aka.ms/AOAIGovModifyContentFilter).

Configurable content filters for inputs (prompts) and outputs (completions) are available for all Azure OpenAI models.

Content filtering configurations are created within a Resource in Foundry portal, and can be associated with Deployments. [Learn more about configuring content filters here](content-filters.md).  

Customers are responsible for ensuring that applications integrating Azure OpenAI comply with the [Code of Conduct](https://learn.microsoft.com/legal/ai-code-of-conduct?context=/azure/ai-foundry/openai/context/context). 

 
## Understand other filters

You can configure the following filter categories in addition to the default harm category filters.

| Filter category | Status | Default setting | Applied to prompt or completion? | Description |
| --- | --- | --- | --- | --- |
| Prompt Shields for direct attacks (jailbreak) | GA | On | User prompt | Filters / annotates user prompts that might present a Jailbreak Risk. For more information about annotations, visit [Foundry content filtering](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/content-filter?tabs=python#annotations-preview). |
| Prompt Shields for indirect attacks | GA | Off | User prompt | Filter / annotate Indirect Attacks, also referred to as Indirect Prompt Attacks or Cross-Domain Prompt Injection Attacks, a potential vulnerability where third parties place malicious instructions inside of documents that the generative AI system can access and process. Requires: [Document embedding and formatting](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/content-filter?tabs=warning%2Cuser-prompt%2Cpython-new#embedding-documents-in-your-prompt). |
| Protected material - code | GA | On | Completion | Filters protected code or gets the example citation and license information in annotations for code snippets that match any public code sources, powered by GitHub Copilot. For more information about consuming annotations, see the [Protected material concepts guide](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/content-filter-protected-material) |
| Protected material - text | GA | On | Completion | Identifies and blocks known text content from being displayed in the model output (for example, song lyrics, recipes, and selected web content). |
| Groundedness | Preview | Off | Completion | Detects whether the text responses of large language models (LLMs) are grounded in the source materials provided by the users. Ungroundedness refers to instances where the LLMs produce information that is non-factual or inaccurate from what was present in the source materials. Requires: [Document embedding and formatting](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/content-filter?tabs=warning%2Cuser-prompt%2Cpython-new#embedding-documents-in-your-prompt). |
| Personally identifiable information (PII) | Preview | Off | Completion | Filters information that can be used to identify a particular individual, such as a name, address, phone number, email address, social security number, driver's license number, passport number, or similar information. |


## Create a content filter in Microsoft Foundry

For any model deployment in [Foundry](https://ai.azure.com/?cid=learnDocs), you can directly use the default content filter, but you might want to have more control. For example, you could make a filter stricter or more lenient, or enable more advanced capabilities like prompt shields and protected material detection.

> **Tip:**
> For guidance with content filters in your Foundry project, you can read more at [Foundry content filtering](https://learn.microsoft.com/azure/ai-studio/concepts/content-filtering).

Follow these steps to create a content filter:


> **Tip:**
> Because you can [customize the left pane](../../what-is-foundry.md#customize-the-left-pane) in the Microsoft Foundry portal, you might see different items than shown in these steps. If you don't see what you're looking for, select **... More** at the bottom of the left pane.

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. Navigate to your project. Then select the **Guardrails + controls** page from the left menu and select the **Content filters** tab.

    Screenshot of the button to create a new content filter.
1. Select **+ Create content filter**.
1. On the **Basic information** page, enter a name for your content filtering configuration. Select a connection to associate with the content filter. Then select **Next**.

    Screenshot of the option to select or enter basic information such as the filter name when creating a content filter.

    Now you can configure the input filters (for user prompts) and output filters (for model completion). 
1. On the **Input filters** page, you can set the filter for the input prompt. For the first four content categories there are three severity levels that are configurable: Low, medium, and high. You can use the sliders to set the severity threshold if you determine that your application or usage scenario requires different filtering than the default values. 
    Some filters, such as Prompt Shields and Protected material detection, enable you to determine if the model should annotate and/or block content. Selecting **Annotate only** runs the respective model and returns annotations via API response, but it will not filter content. In addition to annotate, you can also choose to block content.

    If your use case was approved for modified content filters, you receive full control over content filtering configurations. You can choose to turn filtering partially or fully off, or enable annotate only for the content harms categories (violence, hate, sexual, and self-harm).

    Content is annotated by category and blocked according to the threshold you set. For the violence, hate, sexual, and self-harm categories, adjust the slider to block content of high, medium, or low severity.

    Screenshot of input filter screen.
1. On the **Output filters** page, you can configure the output filter, which is applied to all output content the model generates. Configure the individual filters as before. The page provides the Streaming mode option, letting you filter content in near-real-time as the model generates it and reducing latency. When you're finished select **Next**. 
    
    Content is annotated by each category and blocked according to the threshold. For violent content, hate content, sexual content, and self-harm content category, adjust the threshold to block harmful content with equal or higher severity levels.

    Screenshot of output filter screen.
   
1. Optionally, on the **Connection** page, you can associate the content filter with a deployment. If a selected deployment already has a filter attached, you must confirm that you want to replace it. You can also associate the content filter with a deployment later. Select **Create**.

    Content filtering configurations are created at the hub level in the [Foundry portal](https://ai.azure.com/?cid=learnDocs). Learn more about configurability in the [Azure OpenAI in Foundry Models documentation](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/content-filters).

1. On the **Review** page, review the settings and then select **Create filter**.

### Use a blocklist as a filter

You can apply a blocklist as either an input or output filter, or both. Enable the **Blocklist** option on the **Input filter** and/or **Output filter** page. Select one or more blocklists from the dropdown, or use the built-in profanity blocklist. You can combine multiple blocklists into the same filter.

## Apply a content filter

The filter creation process gives you the option to apply the filter to the deployments you want. You can also change or remove content filters from your deployments at any time.

Follow these steps to apply a content filter to a deployment:

1. Go to [Foundry](https://ai.azure.com/?cid=learnDocs) and select a project.
1. Select **Models + endpoints** on the left pane and choose one of your deployments, then select **Edit**.

    Screenshot of the button to edit a deployment.

1. In the **Update deployment** window, select the content filter you want to apply to the deployment. Then select **Save and close**.

    Screenshot of apply content filter.

    You can also edit and delete a content filter configuration if necessary. Before you delete a content filtering configuration, you need to unassign and replace it from any deployment in the **Deployments** tab.

Now, you can go to the playground to test whether the content filter works as expected.

> **Tip:**
> You can also create and update content filters using the REST APIs. For more information, see the [API reference](https://learn.microsoft.com/rest/api/aiservices/accountmanagement/rai-policies/create-or-update). Content filters can be configured at the resource level. Once a new configuration is created, it can be associated with one or more deployments. For more information about model deployment, see the resource [deployment guide](create-resource.md). 


## Specify a content filtering configuration at request time 

In addition to the deployment-level content filtering configuration, we also provide a request header that allows you specify your custom configuration at request time for each API call. 

```bash
curl --request POST \ 
    --url 'URL' \ 
    --header 'Content-Type: application/json' \ 
    --header 'api-key: API_KEY' \ 
    --header 'x-policy-id: CUSTOM_CONTENT_FILTER_NAME' \ 
    --data '{ 
        "messages": [ 
            { 
                "role": "system", 
                "content": "You are a creative assistant." 
            }, 
            { 
                "role": "user", 
                "content": "Write a poem about the beauty of nature." 
            } 
        ] 
    }' 
```

The request-level content filtering configuration will override the deployment-level configuration, for the specific API call. 

> **Important:**
> Content filter specification at request time is not available for image input (chat with images) scenarios. In those cases the default content filter will be used.

If a configuration is specified that does not exist, the following error message will be returned. 

```json
{ 
    "error": 
        { 
            "code": "InvalidContentFilterPolicy", 
            "message": "Your request contains invalid content filter policy. Please provide a valid policy." 
        } 
} 
```

## Report content filtering feedback

If you are encountering a content filtering issue, select the **Filters Feedback** button at the top of the playground. This is enabled in the **Images, Chat, and Completions** playground once you submit a prompt. 

When the dialog appears, select the appropriate content filtering issue. Include as much detail as possible relating to your content filtering issue, such as the specific prompt and content filtering error you encountered. Do not include any private or sensitive information. 

For support, please [submit a support ticket](https://ms.portal.azure.com/#view/Microsoft_Azure_Support/HelpAndSupportBlade/~/overview). 

## Follow best practices

We recommend informing your content filtering configuration decisions through an iterative identification (for example, red team testing, stress-testing, and analysis) and measurement process to address the potential harms that are relevant for a specific model, application, and deployment scenario. After you implement mitigations such as content filtering, repeat measurement to test effectiveness. Recommendations and best practices for Responsible AI for Azure OpenAI, grounded in the [Microsoft Responsible AI Standard](https://aka.ms/RAI) can be found in the [Responsible AI Overview for Azure OpenAI](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/openai/overview).

## Related content

- Learn more about Responsible AI practices for Azure OpenAI: [Overview of Responsible AI practices for Azure OpenAI models](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/openai/overview).
- Read more about [content filtering categories and severity levels](../../foundry-models/concepts/content-filter.md) with Foundry.
- Learn more about red teaming from our: [Introduction to red teaming large language models (LLMs) article](../concepts/red-teaming.md).
- Learn how to [configure content filters using the API](https://learn.microsoft.com/rest/api/aiservices/accountmanagement/rai-policies/create-or-update)
