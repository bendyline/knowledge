---
title: 'Quickstart: Use GPT-4 Turbo with Vision on your images with the Python SDK'
titleSuffix: Azure OpenAI
description: Get started using the Azure OpenAI Python SDK to deploy and use the GPT-4 Turbo with Vision model.
services: cognitive-services
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: include
ms.custom: references_regions
ms.date: 01/29/2026
ai-usage: ai-assisted
---

Use this article to get started using the Azure OpenAI Python SDK to deploy and use a vision-enabled chat model. 

[Library source code](https://github.com/openai/openai-python?azure-portal=true) | [Package (PyPi)](https://pypi.org/project/openai?azure-portal=true) |


## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- <a href="https://www.python.org/" target="_blank">Python 3.8 or later version</a>.
- An Azure OpenAI in Microsoft Foundry Models resource with a vision-enabled chat model deployed. See [Model availability](../../foundry-models/concepts/models-sold-directly-by-azure.md) for available regions. For more information about resource creation, see the [resource deployment guide](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource).

### Microsoft Entra ID prerequisites

For the recommended keyless authentication with Microsoft Entra ID, you need to:
- Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for keyless authentication with Microsoft Entra ID.
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

## Set up 

Install the OpenAI Python client library with:

```console
pip install openai
```


> **Note:**
> This library is maintained by OpenAI. Refer to the [release history](https://github.com/openai/openai-python/releases) to track the latest updates to the library.


### Retrieve key and endpoint

To successfully make a call against Azure OpenAI, you need an **endpoint** and a **key**.

| Variable name | Value |
| --- | --- |
| `ENDPOINT` | The service endpoint can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. Alternatively, you can find the endpoint via the **Deployments** page in Microsoft Foundry portal. An example endpoint is: `https://docs-test-001.openai.azure.com/`. |
| `API-KEY` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. You can use either `KEY1` or `KEY2`. |

Go to your resource in the Azure portal. The **Keys & Endpoint** section can be found in the **Resource Management** section. Copy your endpoint and access key as you'll need both for authenticating your API calls. You can use either `KEY1` or `KEY2`. Always having two keys allows you to securely rotate and regenerate keys without causing a service disruption.

Screenshot of the overview UI for an Azure OpenAI resource in the Azure portal with the endpoint and access keys location circled in red.



### Environment variables

Create and assign persistent environment variables for your key and endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/openai/includes/gpt-v-python.md)

# [Command Line](#tab/command-line)

```cmd
setx AZURE_OPENAI_API_KEY "REPLACE_WITH_YOUR_KEY_VALUE_HERE" 
setx AZURE_OPENAI_ENDPOINT "REPLACE_WITH_YOUR_ENDPOINT_HERE" 
```

# [PowerShell](#tab/powershell)

```powershell
[System.Environment]::SetEnvironmentVariable('AZURE_OPENAI_API_KEY', 'REPLACE_WITH_YOUR_KEY_VALUE_HERE', 'User')
[System.Environment]::SetEnvironmentVariable('AZURE_OPENAI_ENDPOINT', 'REPLACE_WITH_YOUR_ENDPOINT_HERE', 'User')
```

# [Bash](#tab/bash)

```bash
export AZURE_OPENAI_API_KEY="REPLACE_WITH_YOUR_KEY_VALUE_HERE"
export AZURE_OPENAI_ENDPOINT="REPLACE_WITH_YOUR_ENDPOINT_HERE"
```

---



## Create a new Python application

Create a new Python file named _quickstart.py_. Open the new file in your preferred editor or IDE.


1. Replace the contents of _quickstart.py_ with the following code. 
    
    ```python
    import os
    from openai import AzureOpenAI
    
    api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
    api_key= os.getenv("AZURE_OPENAI_API_KEY")
    deployment_name = '<your_deployment_name>'
    api_version = '2023-12-01-preview' # this might change in the future
    
    client = AzureOpenAI(
        api_key=api_key,  
        api_version=api_version,
        base_url=f"{api_base}/openai/deployments/{deployment_name}"
    )
    
    response = client.chat.completions.create(
        model=deployment_name,
        messages=[
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": [  
                { 
                    "type": "text", 
                    "text": "Describe this picture:" 
                },
                { 
                    "type": "image_url",
                    "image_url": {
                        "url": "<image URL>"
                    }
                }
            ] } 
        ],
        max_tokens=2000 
    )
    
    print(response)
    ```



1. Make the following changes:
    1. Make sure the `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_API_KEY` environment variables are set.
    1. Enter the name of your model deployment in the `deployment_name` variable.
    1. Change the value of the `"url"` field to the publicly accessible URL of your image.
        > **Tip:**
        > You can also use a base 64 encoded image data instead of a URL. For more information, see the [Vision chats how-to guide](../how-to/gpt-with-vision.md#use-a-local-image).
1. Run the application with the `python` command:

    ```console
    python quickstart.py
    ```
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/openai/includes/gpt-v-python.md)

<!--
## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `AuthenticationError` | Invalid or missing API key | Verify `AZURE_OPENAI_API_KEY` environment variable is set correctly. |
| `NotFoundError` | Incorrect endpoint or deployment | Check `AZURE_OPENAI_ENDPOINT` and `deployment_name` match your Azure resource. |
| `RateLimitError` | Quota exceeded | Wait and retry, or request a quota increase in Azure portal. |
| Truncated response | `max_tokens` too low | Increase the `max_tokens` value in your request. |
| `BadRequestError` with content filter | Image triggered content filter | GPT-4 Turbo with Vision has mandatory content filtering that can't be disabled. |

-->

## Clean up resources

If you want to clean up and remove an Azure OpenAI resource, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../../../ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../../../ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources)
