---
author: laujan
ms.author: lajanuar
ms.date: 06/30/2026
ms.service: azure-language-foundry-tools
ms.topic: include
ms.custom:
  - build-2024
  - ignite-2024
  - build-2025
---
# [Text summarization](#tab/text-summarization)

[Reference documentation](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?view=azure-python\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) | [Package (PyPi)](https://pypi.org/project/azure-ai-textanalytics/5.3.0/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics) 

# [Conversation summarization](#tab/conversation-summarization)

[Reference documentation](https://learn.microsoft.com/python/api/overview/azure/ai-language-conversations-readme?preserve-view=true\&view=azure-python) | [More samples](https://github.com/Azure/azure-sdk-for-python/blob/azure-ai-language-conversations_1.1.0/sdk/cognitivelanguage/azure-ai-language-conversations/samples/README.md) | [Package (PyPi)](https://pypi.org/project/azure-ai-language-conversations/1.1.0/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/azure-ai-language-conversations_1.1.0/sdk/cognitivelanguage/azure-ai-language-conversations) 


# [Document summarization](#tab/document-summarization)

[Reference documentation](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?view=azure-python\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) | [Package (PyPi)](https://pypi.org/project/azure-ai-textanalytics/5.3.0/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics)
 
---

Use this quickstart to create a text summarization application with the client library for Python. In the following example, you'll create a Python application that can summarize documents or text-based customer service conversations.

> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform summarization tasks without the need to write code.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.x](https://www.python.org/)
* Once you have your Azure subscription, [create a Foundry resource](../../../../multi-service-resource.md?pivots=azportal).
    * You'll need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service, and upgrade later to a paid tier for production.
* To use the Analyze feature, you'll need a Language resource with the standard (S) pricing tier.


## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/includes/quickstarts/python-sdk.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---



### Install the client library

After installing Python, you can install the client library with:

# [Text summarization](#tab/text-summarization)

```console
pip install azure-ai-textanalytics==5.3.0
```

# [Conversation summarization](#tab/conversation-summarization)

```console
pip install azure-ai-language-conversations==1.1.0
```

# [Document summarization](#tab/document-summarization)

```console
pip install azure-ai-textanalytics==5.3.0
```

---

## Code example

Create a new Python file and copy the below code. Then run the code.  

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../../../security-features.md) article for more information.


# [Text summarization](#tab/text-summarization)

```python
# This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
key = os.environ.get('LANGUAGE_KEY')
endpoint = os.environ.get('LANGUAGE_ENDPOINT')

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# Authenticate the client using your key and endpoint 
def authenticate_client():
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, 
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

# Example method for summarizing text
def sample_extractive_summarization(client):
    from azure.core.credentials import AzureKeyCredential
    from azure.ai.textanalytics import (
        TextAnalyticsClient,
        ExtractiveSummaryAction
    ) 

    document = [
        "The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. "
        "These sentences collectively convey the main idea of the document. This feature is provided as an API for developers. " 
        "They can use it to build intelligent solutions based on the relevant information extracted to support various use cases. "
        "Extractive summarization supports several languages. It is based on pretrained multilingual transformer models, part of our quest for holistic representations. "
        "It draws its strength from transfer learning across monolingual and harness the shared nature of languages to produce models of improved quality and efficiency. "
    ]

    poller = client.begin_analyze_actions(
        document,
        actions=[
            ExtractiveSummaryAction(max_sentence_count=4)
        ],
    )

    document_results = poller.result()
    for result in document_results:
        extract_summary_result = result[0]  # first document, first result
        if extract_summary_result.is_error:
            print("...Is an error with code '{}' and message '{}'".format(
                extract_summary_result.code, extract_summary_result.message
            ))
        else:
            print("Summary extracted: \n{}".format(
                " ".join([sentence.text for sentence in extract_summary_result.sentences]))
            )

sample_extractive_summarization(client)
```



### Output

```console
Summary extracted: 
The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. This feature is provided as an API for developers. They can use it to build intelligent solutions based on the relevant information extracted to support various use cases.
```

# [Conversation summarization](#tab/conversation-summarization)

```python

key = "paste-your-key-here"
endpoint = "paste-your-endpoint-here"

import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.language.conversations import ConversationAnalysisClient

client = ConversationAnalysisClient(endpoint, AzureKeyCredential(key))
with client:
    poller = client.begin_conversation_analysis(
        task={
            "displayName": "Analyze conversations from xxx",
            "analysisInput": {
                "conversations": [
                    {
                        "conversationItems": [
                            {
                                "text": "Hello, you're chatting with Rene. How may I help you?",
                                "id": "1",
                                "role": "Agent",
                                "participantId": "Agent_1",
                            },
                            {
                                "text": "Hi, I tried to set up wifi connection for Smart Brew 300 coffee machine, but it didn't work.",
                                "id": "2",
                                "role": "Customer",
                                "participantId": "Customer_1",
                            },
                            {
                                "text": "I'm sorry to hear that. Let's see what we can do to fix this issue. Could you please try the following steps for me? First, could you push the wifi connection button, hold for 3 seconds, then let me know if the power light is slowly blinking on and off every second?",
                                "id": "3",
                                "role": "Agent",
                                "participantId": "Agent_1",
                            },
                            {
                                "text": "Yes, I pushed the wifi connection button, and now the power light is slowly blinking.",
                                "id": "4",
                                "role": "Customer",
                                "participantId": "Customer_1",
                            },
                            {
                                "text": "Great. Thank you! Now, please check in your Contoso Coffee app. Does it prompt to ask you to connect with the machine?",
                                "id": "5",
                                "role": "Agent",
                                "participantId": "Agent_1",
                            },
                            {
                                "text": "No. Nothing happened.",
                                "id": "6",
                                "role": "Customer",
                                "participantId": "Customer_1",
                            },
                            {
                                "text": "I'm very sorry to hear that. Let me see if there's another way to fix the issue. Please hold on for a minute.",
                                "id": "7",
                                "role": "Agent",
                                "participantId": "Agent_1",
                            },
                        ],
                        "modality": "text",
                        "id": "conversation1",
                        "language": "en",
                    },
                ]
            },
            "tasks": [
                {
                    "taskName": "Issue task",
                    "kind": "ConversationalSummarizationTask",
                    "parameters": {"summaryAspects": ["issue"]},
                },
                {
                    "taskName": "Resolution task",
                    "kind": "ConversationalSummarizationTask",
                    "parameters": {"summaryAspects": ["resolution"]},
                },
            ],
        }
    )

    # view result
    result = poller.result()
    task_results = result["tasks"]["items"]
    for task in task_results:
        print(f"\n{task['taskName']} status: {task['status']}")
        task_result = task["results"]
        if task_result["errors"]:
            print("... errors occurred ...")
            for error in task_result["errors"]:
                print(error)
        else:
            conversation_result = task_result["conversations"][0]
            if conversation_result["warnings"]:
                print("... view warnings ...")
                for warning in conversation_result["warnings"]:
                    print(warning)
            else:
                summaries = conversation_result["summaries"]
                for summary in summaries:
                    print(f"{summary['aspect']}: {summary['text']}")

```



### Output

```console
Issue task status: succeeded
issue: Customer tried to set up wifi connection for Smart Brew 300 coffee machine but it didn't work. No error message.

Resolution task status: succeeded
resolution: Asked customer to check if the Contoso Coffee app prompts to connect with the machine. Customer ended the chat.
```

# [Document summarization](#tab/document-summarization)

```python
# This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
key = os.environ.get('LANGUAGE_KEY')
endpoint = os.environ.get('LANGUAGE_ENDPOINT')

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# Authenticate the client using your key and endpoint 
def authenticate_client():
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, 
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

# Example method for summarizing text
def sample_extractive_summarization(client):
    from azure.core.credentials import AzureKeyCredential
    from azure.ai.textanalytics import (
        TextAnalyticsClient,
        ExtractiveSummaryAction
    ) 

    document = [
        "The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. "
        "These sentences collectively convey the main idea of the document. This feature is provided as an API for developers. " 
        "They can use it to build intelligent solutions based on the relevant information extracted to support various use cases. "
        "Extractive summarization supports several languages. It is based on pretrained multilingual transformer models, part of our quest for holistic representations. "
        "It draws its strength from transfer learning across monolingual and harness the shared nature of languages to produce models of improved quality and efficiency. "
    ]

    poller = client.begin_analyze_actions(
        document,
        actions=[
            ExtractiveSummaryAction(max_sentence_count=4)
        ],
    )

    document_results = poller.result()
    for result in document_results:
        extract_summary_result = result[0]  # first document, first result
        if extract_summary_result.is_error:
            print("...Is an error with code '{}' and message '{}'".format(
                extract_summary_result.code, extract_summary_result.message
            ))
        else:
            print("Summary extracted: \n{}".format(
                " ".join([sentence.text for sentence in extract_summary_result.sentences]))
            )

sample_extractive_summarization(client)
```



### Output

```console
Summary extracted: 
The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. This feature is provided as an API for developers. They can use it to build intelligent solutions based on the relevant information extracted to support various use cases.
```

---
