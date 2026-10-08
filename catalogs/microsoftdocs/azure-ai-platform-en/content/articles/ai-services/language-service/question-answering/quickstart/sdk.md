---
title: "Quickstart: custom question answering"
description: This quickstart shows you how to create and manage your  custom question answering projects.
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 06/30/2026
author: laujan
ms.author: lajanuar
recommendations: false
ms.devlang: csharp
# ms.devlang: csharp, python
ms.custom: devx-track-python, devx-track-csharp, language-service-question-answering, mode-api, devx-track-dotnet
zone_pivot_groups: custom-cqa-quickstart
---
# Quickstart: custom question answering (CQA)


**Applies to: foundry**

This quickstart guides you through the essential steps needed to create, test, and deploy a custom question answering (CQA) project in Microsoft Foundry. It provides clear, actionable instructions for a fast and successful CQA deployment.

> **Note:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource, you can continue to use those existing Language resources within the Foundry portal. For more information, see [How to use Foundry Tools in the Foundry portal](../../../connect-services-foundry-portal.md).
> * We highly recommend that you use a Foundry resource in the Foundry; however, you can also follow these instructions using a Language resource.
>

## Prerequisites

Before you get started, you need the following resources and permissions:

* **An active Azure subscription**. If you don't have one, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **Requisite permissions**. Make sure the person establishing the account and project is assigned as the Foundry Account Owner role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, *see* [Role based access control (RBAC)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/openai/how-to/role-based-access-control.md#cognitive-services-contributor).

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.

* A [Foundry resource](../../../multi-service-resource.md) or a [Language resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics).
* An [Azure AI Search resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.Search) (required for accessing CQA). For more information on how to connect your Azure AI Search resource, *see* [Configure connections in Foundry](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/conversational-language-understanding/how-to/configure-azure-resources.md#step-2-configure-connections-in-ai-foundry)
* A Foundry project created in the Foundry. For more information, *see* [Create a Foundry project](https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects).

## Get started

1. Navigate to the [Foundry](https://ai.azure.com/).

1. If you aren't already signed in, the portal prompts you to do so with your Azure credentials.

1. Once signed in, you can create or access your existing projects within Foundry.

1. If you're not already at your project for this task, select it.

## Create your CQA fine tuning task

In the Foundry, a fine-tuning task serves as your workspace for your CQA solutions. Previously, a **fine-tuning task** was referred to as a **CQA project**. You might encounter both terms used interchangeably in older CQA documentation.

1. After you select the Foundry project to use for this quickstart, select **fine-tuning** from the left navigation menu.

     Screenshot of the fine-tuning menu selection in the Foundry.

1. From the main window, select the **AI Service fine-tuning** tab and then the **+ Fine-tune button**.

     Screenshot of fine-tune button in the Foundry.

1. From the **Create service fine-tuning** window, choose the **Custom question answering** tab and then select **Next**.

     Screenshot of custom question answering tab in the Foundry.

1. Select your **Connected Azure AI Search resource** from the **Create CQA fine tuning task** window. For more information, *see* [Configure Azure resource connections](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/conversational-language-understanding/how-to/configure-azure-resources.md#step-2-configure-connections-in-ai-foundry).

1. Next, complete the **Name** and **Language** fields. For this project, you can leave the **Default answer when no answer is returned** field as is (**No answer found**).

1. Select the **Create** button.

## Add a CQA knowledge base source

A CQA knowledge base is a structured set of question-and-answer pairs optimized for conversational AI. The knowledge base uses natural language processing to interpret user queries and return context-aware, accurate answers from a specific dataset.

1. From the **Getting Started** menu, select **Manage sources**.

     Screenshot of manage sources selection in the Foundry.

1. From the main window, select the **+ Add source** drop-down menu.

1. From the drop-down menu you can select **Add chit chat**, **Add URLs**, or **Add Files**.

     Screenshot of add source drop-down menu in the Foundry.

1. For this project, let's choose **Add chitchat**.

1. From the **Add new source** window, let's choose **Friendly**.

     Screenshot of the select source selection and add button in the Foundry.

1. Finally, select **Add**. It may take a few minutes for the source to be created.

1. Once created, the source is listed in the **Manage sources** window.

     Screenshot of manage sources list in the Foundry.

## Test your knowledge base

1. Select **Test knowledge base** from the **Getting Started** menu.

1. Type the following in the **Type your question** field and then select **Run**.

     ```text
       Hello! How are you doing today?

     ```

1. In the inspection interface, you can review the response confidence level and choose the most suitable answer.

    Screenshot of the inspection interface in the Foundry.

## Deploy your knowledge base

Deploying a CQA knowledge base means publishing your curated question-and-answer content as a live, searchable endpoint. This process moves your project from a testing phase to a production environment enabling client applications to use it for various projects and solutions, including chatbots.

1. Once your inspection is complete, choose the **Deploy knowledge base** section from the **Getting Started** menu.

1. Select the **Deploy** button first from the **Deploy knowledge base** main window and then from the **Deploy this project** pop-up window. It takes a few minutes to deploy.

1. After deployment is complete, your deployed project is listed in the **Deploy knowledge base** window.

That's it! Your Custom Question Answering (CQA) knowledge base provides a natural language interface to your data, allowing users to interact with information in a conversational manner. By deploying this solution, you can create advanced chatbots and interactive agents that comprehend user questions, supply precise answers, and adjust to changing informational requirements.



**Applies to: rest**

## Prerequisites

* The current version of [cURL](https://curl.haxx.se/). Several command-line switches are used in the quickstarts, which are noted in the [cURL documentation](https://curl.haxx.se/docs/manpage.html).
* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Custom question answering requires a [Language resource](https://portal.azure.com/?quickstart=true#create/Microsoft.CognitiveServicesTextAnalytics) with the custom question answering feature enabled to generate an API key and endpoint.
* After your Language resource deploys, select **Go to resource**. You need the key and endpoint from the resource you create to connect to the API. Paste your key and endpoint into the code later in the quickstart.
* Create a Language resource with [Azure CLI](../../../multi-service-resource.md?pivots=azcli) and provide the following properties: `--api-properties qnaAzureSearchEndpointId=/subscriptions/<azure-subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Search/searchServices/<azure-search-service-name> qnaAzureSearchEndpointKey=<azure-search-service-auth-key>`
* An existing project to query. If you have not setup a project, you can follow the instructions in the [**Foundry quickstart**](sdk.md). Or add a project that uses this [Surface User Guide URL](https://support.microsoft.com/en-US/surface/models/surface-book-3-specs-and-features) as a data source.



## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/question-answering/quickstart/sdk.md)

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




## Query a project

### Generate an answer from a project

To [query a custom question answering project](https://learn.microsoft.com/rest/api/questionanswering/question-answering/get-answers) with the REST APIs and cURL, you need the following information:

| Variable name | Value |
| --- | --- |
| `Endpoint` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. An example endpoint is: `https://southcentralus.cognitiveservices.azure.com/` |
| `API-Key` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. You can use either Key1 or Key2. Always having two valid keys always for secure key rotation with zero downtime. The key value is part of the sample request. |
| `Project` | The name of your custom question answering project. |
| `Deployment` | There are two possible values: `test`, and `production`. |

The cURL command is executed from a BASH shell. Edit this command with your own resource name, resource key, and JSON values and size of JSON.

```bash
curl -X POST -H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" -H "Content-Type: application/json" -d '{
  "question": "How much battery life do I have left?"
  }'  '$LANGUAGE_ENDPOINT.cognitiveservices.azure.com/language/:query-knowledgebases?projectName={YOUR_PROJECT_NAME}&api-version=2021-10-01&deploymentName={DEPLOYMENT_NAME}'
```

When you run the code, if you're using the data source from the prerequisites you get an answer that looks as follows:

```json
{
"answers": [
    {
      "questions": [
        "Check battery level"
      ],
      "answer": "If you want to see how much battery you have left, go to **Start  **> **Settings  **> **Devices  **> **Bluetooth & other devices  **, then find your pen. The current battery level will appear under the battery icon.",
      "confidenceScore": 0.9185,
      "id": 101,
      "source": "https://support.microsoft.com/en-us/surface/how-to-use-your-surface-pen-8a403519-cd1f-15b2-c9df-faa5aa924e98",
      "metadata": {},
      "dialog": {
        "isContextOnly": false,
        "prompts": []
      }
    }
  ]
}
```

The `confidenceScore` returns a value between 0 and 1. Consider the confidence score as a percentage by multiplying it by 100. For example, a confidence score of 0.9185 indicates that the custom question-answering system is 91.85% confident that its response is correct based on the project information.

If you want to exclude answers where the confidence score falls below a certain threshold, you can add the `confidenceScoreThreshold` parameter.

```bash
curl -X POST -H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" -H "Content-Type: application/json" -d '{
  "question": "How much battery life do I have left?",
  "confidenceScoreThreshold": "0.95",
  }'  '$LANGUAGE_ENDPOINT.cognitiveservices.azure.com//language/:query-knowledgebases?projectName=Sample-project&api-version=2021-10-01&deploymentName={DEPLOYMENT_NAME}'
```

Since we know from our previous execution of the code that our confidence score is: `.9185` setting the threshold to `.95` results in the [default answer](../how-to/change-default-answer.md) being returned.

```json
{
  "answers": [
    {
      "questions": [],
      "answer": "No good match found in KB",
      "confidenceScore": 0.0,
      "id": -1,
      "metadata": {}
    }
  ]
}
```



## Query text without a project

You can also [use custom question answering without a project](https://learn.microsoft.com/rest/api/questionanswering/question-answering/get-answers-from-text) with the prebuilt custom question answering REST API, which is called via `query-text`. In this case, you provide question answering with both a question and the associated text records you would like to search for an answer at the time the request is sent.

For this example, you only need to modify the variables for `API KEY` and `ENDPOINT`.

```bash
curl -X POST -H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" -H "Content-Type: application/json" -d '{
"question":"How long does it takes to charge a surface?",
"records":[
{"id":"doc1","text":"Power and charging.It takes two to four hours to charge the Surface Pro 4 battery fully from an empty state. It can take longer if you\u0027re using your Surface for power-intensive activities like gaming or video streaming while you\u0027re charging it"},
{"id":"doc2","text":"You can use the USB port on your Surface Pro 4 power supply to charge other devices, like a phone, while your Surface charges. The USB port on the power supply is only for charging, not for data transfer. If you want to use a USB device, plug it into the USB port on your Surface."}],
"language":"en",
"stringIndexType":"Utf16CodeUnit"
}'  '$LANGUAGE_ENDPOINT.cognitiveservices.azure.com/language/:query-text?&api-version=2021-10-01'
```

This example returns a result of:

```json
{  
"answers": [
    {
      "answer": "Power and charging.It takes two to four hours to charge the Surface Pro 4 battery fully from an empty state. It can take longer if you're using your Surface for power-intensive activities like gaming or video streaming while you're charging it",
      "confidenceScore": 0.9118788838386536,
      "id": "doc1",
      "answerSpan": {
        "text": "two to four hours",
        "confidenceScore": 0.9850527,
        "offset": 27,
        "length": 18
      },
      "offset": 0,
      "length": 243
    },
    {
      "answer": "It can take longer if you're using your Surface for power-intensive activities like gaming or video streaming while you're charging it",
      "confidenceScore": 0.052793052047491074,
      "id": "doc1",
      "answerSpan": {
        "text": "longer",
        "confidenceScore": 0.6694634,
        "offset": 11,
        "length": 7
      },
      "offset": 109,
      "length": 134
    },
    {
      "answer": "You can use the USB port on your Surface Pro 4 power supply to charge other devices, like a phone, while your Surface charges. The USB port on the power supply is only for charging, not for data transfer. If you want to use a USB device, plug it into the USB port on your Surface.",
      "confidenceScore": 0.017600709572434425,
      "id": "doc2",
      "answerSpan": {
        "text": "USB port on your Surface Pro 4 power supply to charge other devices, like a phone, while your Surface charges. The USB port on the power supply is only for charging",
        "confidenceScore": 0.1544854,
        "offset": 15,
        "length": 165
      },
      "offset": 0,
      "length": 280
    }
  ]
}
```



**Applies to: programming-language-csharp**

Use this quickstart for the custom question answering client library for .NET to:

* Get an answer from a project.
* Get an answer from a body of text that you send along with your question.
* Get the confidence score for the answer to your question.

 [Reference documentation][questionanswering_refdocs] | [Package (NuGet)][questionanswering_nuget_package]  | [Samples][questionanswering_samples] | [Library source code][questionanswering_client_src]

[questionanswering_nuget_package]: https://www.nuget.org/packages/Azure.AI.Language.QuestionAnswering/
[questionanswering_refdocs]: https://learn.microsoft.com/dotnet/api/Azure.AI.Language.QuestionAnswering/
[questionanswering_client_src]: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitivelanguage/Azure.AI.Language.QuestionAnswering/src/
[questionanswering_samples]: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitivelanguage/Azure.AI.Language.QuestionAnswering/samples/README.md

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
* Custom question answering requires a [Language resource](https://portal.azure.com/?quickstart=true#create/Microsoft.CognitiveServicesTextAnalytics) with the custom question answering feature enabled to generate an API key and endpoint. 
* After your Language resource deploys, select **Go to resource**. You need the key and endpoint from the resource you create to connect to the API. Paste your key and endpoint into the code later in the quickstart.
* Create a Language resource with [Azure CLI](../../../multi-service-resource.md?pivots=azcli) and provide the following properties: `--api-properties qnaAzureSearchEndpointId=/subscriptions/<azure-subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Search/searchServices/<azure-search-service-name> qnaAzureSearchEndpointKey=<azure-search-service-auth-key>`
* An existing project to query. If you don't have a project, you can follow the instructions in the [**Microsoft Foundry quickstart**](sdk.md). Or add a project that uses this [Surface User Guide URL](https://support.microsoft.com/en-US/surface/models/surface-book-3-specs-and-features) as a data source.



## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/question-answering/quickstart/sdk.md)

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




### CLI

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `question-answering-quickstart`. This command creates a simple "Hello World" C# project with a single source file: *program.cs*.

```console
dotnet new console -n question-answering-quickstart
```

Change your directory to the newly created app folder. You can build the application with:

```console
dotnet build
```

The build output should contain no warnings or errors.

```console
...
Build succeeded.
 0 Warning(s)
 0 Error(s)
...
```

Within the application directory, install the custom question answering client library for .NET with the following command:

```console
dotnet add package Azure.AI.Language.QuestionAnswering
```



## Query a project

#### Generate an answer from a project

The following example allows you to query a project using `GetAnswers` to get an answer to your question.

You need to update the code and provide your own values for the following variables:

| Variable name | Value |
| --- | --- |
| `endpoint` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. An example endpoint is: `https://southcentralus.cognitiveservices.azure.com/` |
| `credential` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. You can use either Key1 or Key2. Always having two valid keys always for secure key rotation with zero downtime. The key value is part of the sample request. |
| `projectName` | The name of your custom question answering project. |
| `deploymentName` | There are two possible values: `test`, and `production`. |

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). For more information, see [Foundry Tools security](../../../security-features.md).

From the project directory, open the *program.cs* file and replace with the following code:

```csharp
using Azure;
using Azure.AI.Language.QuestionAnswering;
using System;

namespace question_answering
{
    class Program
    {
        static void Main(string[] args)
        {

            // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
            Uri endpoint = new Uri("LANGUAGE_ENDPOINT");
            AzureKeyCredential credential = new AzureKeyCredential("LANGUAGE_KEY");
            string projectName = "{YOUR-PROJECT-NAME}";
            string deploymentName = "production";

            string question = "How long should my Surface battery last?";

            QuestionAnsweringClient client = new QuestionAnsweringClient(endpoint, credential);
            QuestionAnsweringProject project = new QuestionAnsweringProject(projectName, deploymentName);

            Response<AnswersResult> response = client.GetAnswers(question, project);

            foreach (KnowledgeBaseAnswer answer in response.Value.Answers)
            {
                Console.WriteLine($"Q:{question}");
                Console.WriteLine($"A:{answer.Answer}");
            }
        }
    }
}
```

While we're hard coding the variables for our example. For production, consider using a secure way of storing and accessing your credentials. For example, [Azure key vault](https://learn.microsoft.com/azure/key-vault/general/overview) provides secure key storage.

After updating `Program.cs` and substituting in the correct variable values. Run the application with the `dotnet run` command from your application directory.

```console
dotnet run
```

The response looks as follows:

```console
Q: How much battery life do I have left?
A: If you want to see how much battery you have left, go to **Start  **> **Settings  **> **Devices  **> **Bluetooth & other devices  **, then find your pen. The current battery level will appear under the battery icon.
```

For information on confidence scores, add the following print statement underneath the existing print statements:

```csharp
Console.WriteLine($"Q:{question}");
Console.WriteLine($"A:{answer.Answer}");
Console.WriteLine($"({answer.Confidence})"); // add this line
```

If you execute `dotnet run` again, you now receive a result with a confidence score:

```console
Q:How much battery life do I have left?
A:If you want to see how much battery you have left, go to **Start  **> **Settings  **> **Devices  **> **Bluetooth & other devices  **, then find your pen. The current battery level will appear under the battery icon.
(0.9185)
```

Consider the confidence score as a percentage by multiplying it by 100. For example, a confidence score of 0.9185 indicates that the custom question-answering system is 91.85% confident that its response is correct based on the project information.

If you want to exclude answers where the confidence score falls below a certain threshold, you use  `AnswerOptions` to add the `ConfidenceScoreThreshold` property.

```csharp
QuestionAnsweringClient client = new QuestionAnsweringClient(endpoint, credential);
QuestionAnsweringProject project = new QuestionAnsweringProject(projectName, deploymentName);
AnswersOptions options = new AnswersOptions(); //Add this line
options.ConfidenceThreshold = 0.95; //Add this line

Response<AnswersResult> response = client.GetAnswers(question, project, options); //Add the additional options parameter
```

Since we know from our previous execution of the code that our confidence score is: `.9185` setting the threshold to `.95` results in the [default answer](../how-to/change-default-answer.md) being returned.

```console
Q:How much battery life do I have left?
A:No good match found in KB
(0)
```



## Query text without a project

You can also use custom question answering without a project with `GetAnswersFromText`. In this case, you provide custom question answering with both a question and the associated text records you would like to search for an answer at the time the request is sent.

For this example, you only need to modify the variables for `endpoint` and `credential`.

```csharp
using Azure;
using Azure.AI.Language.QuestionAnswering;
using System;
using System.Collections.Generic;


namespace questionansweringcsharp
{
    class Program
    {
        static void Main(string[] args)
        {

            Uri endpoint = new Uri("https://{YOUR-ENDPOINT}.cognitiveservices.azure.com/");
            AzureKeyCredential credential = new AzureKeyCredential("YOUR-LANGUAGE-RESOURCE-KEY");
            QuestionAnsweringClient client = new QuestionAnsweringClient(endpoint, credential);

            IEnumerable<TextDocument> records = new[]
            {
                new TextDocument("doc1", "Power and charging.It takes two to four hours to charge the Surface Pro 4 battery fully from an empty state. " +
                         "It can take longer if you're using your Surface for power-intensive activities like gaming or video streaming while you're charging it"),
                new TextDocument("doc2", "You can use the USB port on your Surface Pro 4 power supply to charge other devices, like a phone, while your Surface charges. " +
                         "The USB port on the power supply is only for charging, not for data transfer. If you want to use a USB device, plug it into the USB port on your Surface."),
            };

            AnswersFromTextOptions options = new AnswersFromTextOptions("How long does it takes to charge a surface?", records);
            Response<AnswersFromTextResult> response = client.GetAnswersFromText(options);

           foreach (TextAnswer answer in response.Value.Answers)
            {
                if (answer.Confidence > .9)
                {
                    string BestAnswer = response.Value.Answers[0].Answer;

                    Console.WriteLine($"Q:{options.Question}");
                    Console.WriteLine($"A:{BestAnswer}");
                    Console.WriteLine($"Confidence Score: ({response.Value.Answers[0].Confidence:P2})"); //:P2 converts the result to a percentage with 2 decimals of accuracy. 
                    break;
                }
                else
                {
                    Console.WriteLine($"Q:{options.Question}");
                    Console.WriteLine("No answers met the requested confidence score.");
                    break;
                }
            }

        }
    }
}
```

To run the code, replace the `Program.cs` with the contents of the script block and modify the `endpoint` and `credential` variables to correspond to the language resource you created as part of the prerequisites.

In this case, we iterate through all responses and only return the response with the highest confidence score that is greater than 0.9. To understand more about the options available with `GetAnswersFromText`.




**Applies to: programming-language-python**

Use this quickstart for the custom question answering client library for Python to:

* Get an answer from a project.
* Get an answer from a body of text that you send along with your question.
* Get the confidence score for the answer to your question.

[Package (PyPI)][questionanswering_pypi_package] | [Samples][questionanswering_samples] | [Library source code][questionanswering_client_src] 

[questionanswering_client_src]: https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/cognitivelanguage/azure-ai-language-questionanswering/
[questionanswering_pypi_package]: https://pypi.org/project/azure-ai-language-questionanswering/
[questionanswering_samples]: https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/cognitivelanguage/azure-ai-language-questionanswering/samples/README.md

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.x](https://www.python.org/)
* Custom question answering requires a [Language resource](https://portal.azure.com/?quickstart=true#create/Microsoft.CognitiveServicesTextAnalytics) with the custom question answering feature enabled to generate an API key and endpoint.
    * After your Language resource deploys, select **Go to resource**. You need the key and endpoint from the resource you create to connect to the API. Paste your key and endpoint into the code later in the quickstart.
* Create a Language resource with [Azure CLI](../../../multi-service-resource.md?pivots=azcli) and provide the following properties: `--api-properties qnaAzureSearchEndpointId=/subscriptions/<azure-subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Search/searchServices/<azure-search-service-name> qnaAzureSearchEndpointKey=<azure-search-service-auth-key>`
* An existing project to query. If you don't have a project, you can follow the instructions in the [**Microsoft Foundry quickstart**](sdk.md). Or add a project that uses this [Surface User Guide URL](https://support.microsoft.com/en-US/surface/models/surface-book-3-specs-and-features) as a data source.



## Setting up

### Install the client library

After installing Python, you can install the client library with:

```console
pip install azure-ai-language-questionanswering
```



## Query a project

### Generate an answer from a project

The example allows you to query a project using get_answers to get an answer to your question. You can copy this code into a dedicated .py file or into a cell in [Jupyter Notebook/Lab](https://jupyter.org/).

You need to update the code and provide your own values for the following variables.

| Variable name | Value |
| --- | --- |
| `endpoint` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. An example endpoint is: `https://southcentralus.cognitiveservices.azure.com/` |
| `credential` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. You can use either Key1 or Key2. Always having two valid keys always for secure key rotation with zero downtime. The key value is part of the sample request. |
| `knowledge_base_project` | The name of your question answering project. |
| `deployment` | There are two possible values: `test`, and `production`. `production`. |

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). For more information, see the Foundry Tools [security article](../../../security-features.md).

```python
from azure.core.credentials import AzureKeyCredential
from azure.ai.language.questionanswering import QuestionAnsweringClient

endpoint = "https://{YOUR-ENDPOINT}.cognitiveservices.azure.com/"
credential = AzureKeyCredential("{YOUR-LANGUAGE-RESOURCE-KEY}")
knowledge_base_project = "{YOUR-PROJECT-NAME}"
deployment = "production"

def main():
    client = QuestionAnsweringClient(endpoint, credential)
    with client:
        question="How much battery life do I have left?"
        output = client.get_answers(
            question = question,
            project_name=knowledge_base_project,
            deployment_name=deployment
        )
    print("Q: {}".format(question))
    print("A: {}".format(output.answers[0].answer))

if __name__ == '__main__':
    main()
```

While we're hard coding the variables for our example. For production, consider using a secure way of storing and accessing your credentials. For example, [Azure key vault](https://learn.microsoft.com/azure/key-vault/general/overview) provides secure key storage.

When you run the code, if you're using the data source from the prerequisites you get an answer that looks as follows:

```
Q: How much battery life do I have left?
A: If you want to see how much battery you have left, go to **Start  **> **Settings  **> **Devices  **> **Bluetooth & other devices  **, then find your pen. The current battery level will appear under the battery icon.
```

For information on confident scores add the following print statements:

```python
print("Q: {}".format(question))
print("A: {}".format(output.answers[0].answer))
print("Confidence Score: {}".format(output.answers[0].confidence)) # add this line 
```

You receive a result with a confidence score:

```
Q: How much battery life do I have left?
A: If you want to see how much battery you have left, go to **Start  **> **Settings  **> **Devices  **> **Bluetooth & other devices  **, then find your pen. The current battery level will appear under the battery icon.
Confidence Score: 0.9185
```

Consider the confidence score as a percentage by multiplying it by 100. For example, a confidence score of 0.9185 indicates that the custom question-answering system is 91.85% confident that its response is correct based on the project information.

If you want to exclude answers where the confidence score falls below a certain threshold, you can modify the AnswerOptions to add the `confidence_threshold` parameter.

```python
        output = client.get_answers(
            confidence_threshold = 0.95, #add this line
            question = question,
            project_name=knowledge_base_project,
            deployment_name=deployment
        )
```

Since we know from our previous execution of the code that our confidence score is: `.9185` setting the threshold to `.95` results in the [default answer](../how-to/change-default-answer.md) being returned.

```
Q: How much battery life do I have left?
A: No good match found in KB
Confidence Score: 0.0
```



## Query text without a project

You can also use custom question answering without a project with get_answers_from_text. In this case, you provide custom question answering with both a question and the associated text records you would like to search for an answer at the time the request is sent.

For this example, you only need to modify the variables for `endpoint` and `credential`.

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.language.questionanswering import QuestionAnsweringClient
from azure.ai.language.questionanswering import models as qna

endpoint = "https://{YOUR-ENDPOINT}.cognitiveservices.azure.com/"
credential = AzureKeyCredential("YOUR-LANGUAGE-RESOURCE-KEY")

def main():
    client = QuestionAnsweringClient(endpoint, credential)
    with client:
        question="How long does it takes to charge a surface?"
        input = qna.AnswersFromTextOptions(
            question=question,
            text_documents=[
                "Power and charging. It takes two to four hours to charge the Surface Pro 4 battery fully from an empty state. " +
                "It can take longer if you're using your Surface for power-intensive activities like gaming or video streaming while you're charging it.",
                "You can use the USB port on your Surface Pro 4 power supply to charge other devices, like a phone, while your Surface charges. " +
                "The USB port on the power supply is only for charging, not for data transfer. If you want to use a USB device, plug it into the USB port on your Surface.",
            ]
        )


        output = client.get_answers_from_text(input)

    best_answer = [a for a in output.answers if a.confidence > 0.9][0]
    print(u"Q: {}".format(input.question))
    print(u"A: {}".format(best_answer.answer))
    print("Confidence Score: {}".format(output.answers[0].confidence))

if __name__ == '__main__':
    main()
```

You can copy this code into a dedicated .py file or into a new cell in [Jupyter Notebook/Lab](https://jupyter.org/). This example returns a result of:

```
Q: How long does it takes to charge surface?
A: Power and charging. It takes two to four hours to charge the Surface Pro 4 battery fully from an empty state. It can take longer if you're using your Surface for power-intensive activities like gaming or video streaming while you're charging it.
Confidence Score: 0.9254655838012695
```

In this case, we iterate through all responses and only return the response with the highest confidence score that is greater than 0.9. To understand more about the options available with get_answers_from_text, review the AnswersFromTextOptions parameters.




## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../../multi-service-resource.md?pivots=azcli#clean-up-resources)


## Explore the REST API

* [Authoring API reference](https://learn.microsoft.com/rest/api/questionanswering/question-answering-projects)
* [Authoring API cURL examples](../how-to/authoring.md)
* [Runtime API reference](https://learn.microsoft.com/rest/api/questionanswering/question-answering)

## Next steps

* [Tutorial: Create an FAQ bot](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/question-answering/tutorials/bot-service.md)
