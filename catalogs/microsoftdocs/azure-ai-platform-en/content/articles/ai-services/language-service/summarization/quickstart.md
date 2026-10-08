---
title: "Quickstart: Use Summarization"
titleSuffix: Foundry Tools
description: Use this quickstart to start using Summarization.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 06/30/2026
ms.author: lajanuar
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: language-service-summarization, mode-api, devx-track-extended-java, devx-track-js, devx-track-python, build-2024
zone_pivot_groups: programming-languages-text-analytics
---
# Quickstart: using text, document and conversation summarization


> **Important:**
> Our preview region, Sweden Central, showcases our latest and continually evolving LLM fine tuning techniques based on GPT models. You're welcome to try them out with a Language resource in the Sweden Central region.
>
> Conversation summarization is only available using:
>
> * REST API
> * Python
> * C#


**Applies to: programming-language-csharp**


# [Text summarization](#tab/text-summarization)

[Reference documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-net/tree/Azure.AI.TextAnalytics_5.3.0/sdk/textanalytics/Azure.AI.TextAnalytics/samples) |  [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.3.0) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics) 

# [Conversation summarization](#tab/conversation-summarization)

[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.language.conversations-readme?view=azure-dotnet\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-net/tree/Azure.AI.Language.Conversations_1.1.0/sdk/cognitivelanguage/Azure.AI.Language.Conversations/samples) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.Language.Conversations/1.1.0) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/Azure.AI.Language.Conversations_1.1.0/sdk/cognitivelanguage/Azure.AI.Language.Conversations/src/)

# [Document summarization](#tab/document-summarization)

[Reference documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-net/tree/Azure.AI.TextAnalytics_5.3.0/sdk/textanalytics/Azure.AI.TextAnalytics/samples) |  [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.3.0) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics) 

---

Use this quickstart to create a text summarization application with the client library for .NET. In the following example, you'll create a C# application that can summarize documents or text-based customer service conversations.

> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform summarization tasks without the need to write code.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You'll need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service, and upgrade later to a paid tier for production.
* To use the Analyze feature, you'll need a Language resource with the standard (S) pricing tier.

## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/quickstart.md)

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



### Create a new .NET Core application

Using the Visual Studio IDE, create a new .NET Core console app. This creates a "Hello World" project with a single C# source file: *program.cs*.

# [Text summarization](#tab/text-summarization)

Install the client library by right-clicking the solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse** and search for `Azure.AI.TextAnalytics`. Make sure **Include prerelease** is checked. Select version `5.3.0`, and then **Install**. You can also use the [Package Manager Console](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-powershell#find-and-install-a-package).

# [Conversation summarization](#tab/conversation-summarization)

Install the client library by right-clicking the solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse** and search for `Azure.AI.Language.Conversations`. Make sure **Include prerelease** is checked. Select version `1.1.0`, and then **Install**. You can also use the [Package Manager Console](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-powershell#find-and-install-a-package).


# [Document summarization](#tab/document-summarization)

Install the client library by right-clicking the solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse** and search for `Azure.AI.TextAnalytics`. Make sure **Include prerelease** is checked. Select version `5.3.0`, and then **Install**. You can also use the [Package Manager Console](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-powershell#find-and-install-a-package).

---

## Code example

Copy the following code into your *program.cs* file. Then run the code.  

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


# [Text summarization](#tab/text-summarization)

```csharp
using Azure;
using System;
using Azure.AI.TextAnalytics;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Example
{
    class Program
    {
        // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
        static string languageKey = Environment.GetEnvironmentVariable("LANGUAGE_KEY");
        static string languageEndpoint = Environment.GetEnvironmentVariable("LANGUAGE_ENDPOINT");

        private static readonly AzureKeyCredential credentials = new AzureKeyCredential(languageKey);
        private static readonly Uri endpoint = new Uri(languageEndpoint);

        // Example method for summarizing text
        static async Task TextSummarizationExample(TextAnalyticsClient client)
        {
            string document = @"The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. 
                These sentences collectively convey the main idea of the document. This feature is provided as an API for developers. 
                They can use it to build intelligent solutions based on the relevant information extracted to support various use cases. 
                Extractive summarization supports several languages. It is based on pretrained multilingual transformer models, part of our quest for holistic representations. 
                It draws its strength from transfer learning across monolingual and harness the shared nature of languages to produce models of improved quality and efficiency." ;
        
            // Prepare analyze operation input. You can add multiple documents to this list and perform the same
            // operation to all of them.
            var batchInput = new List<string>
            {
                document
            };
        
            TextAnalyticsActions actions = new TextAnalyticsActions()
            {
                ExtractiveSummarizeActions = new List<ExtractiveSummarizeAction>() { new ExtractiveSummarizeAction() }
            };
        
            // Start analysis process.
            AnalyzeActionsOperation operation = await client.StartAnalyzeActionsAsync(batchInput, actions);
            await operation.WaitForCompletionAsync();
            // View operation status.
            Console.WriteLine($"AnalyzeActions operation has completed");
            Console.WriteLine();
        
            Console.WriteLine($"Created On   : {operation.CreatedOn}");
            Console.WriteLine($"Expires On   : {operation.ExpiresOn}");
            Console.WriteLine($"Id           : {operation.Id}");
            Console.WriteLine($"Status       : {operation.Status}");
        
            Console.WriteLine();
            // View operation results.
            await foreach (AnalyzeActionsResult documentsInPage in operation.Value)
            {
                IReadOnlyCollection<ExtractiveSummarizeActionResult> summaryResults = documentsInPage.ExtractiveSummarizeResults;
        
                foreach (ExtractiveSummarizeActionResult summaryActionResults in summaryResults)
                {
                    if (summaryActionResults.HasError)
                    {
                        Console.WriteLine($"  Error!");
                        Console.WriteLine($"  Action error code: {summaryActionResults.Error.ErrorCode}.");
                        Console.WriteLine($"  Message: {summaryActionResults.Error.Message}");
                        continue;
                    }
        
                    foreach (ExtractiveSummarizeResult documentResults in summaryActionResults.DocumentsResults)
                    {
                        if (documentResults.HasError)
                        {
                            Console.WriteLine($"  Error!");
                            Console.WriteLine($"  Document error code: {documentResults.Error.ErrorCode}.");
                            Console.WriteLine($"  Message: {documentResults.Error.Message}");
                            continue;
                        }
        
                        Console.WriteLine($"  Extracted the following {documentResults.Sentences.Count} sentence(s):");
                        Console.WriteLine();
        
                        foreach (ExtractiveSummarySentence sentence in documentResults.Sentences)
                        {
                            Console.WriteLine($"  Sentence: {sentence.Text}");
                            Console.WriteLine();
                        }
                    }
                }
            }
        }

        static async Task Main(string[] args)
        {
            var client = new TextAnalyticsClient(endpoint, credentials);
            await TextSummarizationExample(client);
        }
    }
}

```

### Output

```console
AnalyzeActions operation has completed

Created On   : 9/16/2021 8:04:27 PM +00:00
Expires On   : 9/17/2021 8:04:27 PM +00:00
Id           : 2e63fa58-fbaa-4be9-a700-080cff098f91
Status       : succeeded

Extracted the following 3 sentence(s):

Sentence: The extractive summarization feature in uses natural language processing techniques to locate key sentences in an unstructured text document.

Sentence: This feature is provided as an API for developers.

Sentence: They can use it to build intelligent solutions based on the relevant information extracted to support various use cases.
```

# [Conversation summarization](#tab/conversation-summarization)

```csharp
using System;
using Azure;
using Azure.Core;
using Azure.AI.Language.Conversations;
using System.Text.Json;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
        private static readonly AzureKeyCredential credentials = new AzureKeyCredential("replace-with-your-key-here");
        private static readonly Uri endpoint = new Uri("replace-with-your-endpoint-here");

        static async Task Main(string[] args)
        {
            ConversationAnalysisClient client = new ConversationAnalysisClient(endpoint, credentials);
            await Summarization(client);
        }

        static async Task Summarization(ConversationAnalysisClient client)
        {
            var data = new
            {
                analysisInput = new
                {
                    conversations = new[]
                    {
                        new
                        {
                            conversationItems = new[]
                            {
                                new
                                {
                                    text = "Hello, you're chatting with Rene. How may I help you?",
                                    id = "1",
                                    role = "Agent",
                                    participantId = "Agent",
                                },
                                new
                                {
                                    text = "Hi, I tried to set up wifi connection for Smart Brew 300 coffee machine, but it didn't work.",
                                    id = "2",
                                    role = "Customer",
                                    participantId = "Customer",
                                },
                                new
                                {
                                    text = "I'm sorry to hear that. Let's see what we can do to fix this issue. Could you please try the following steps for me? First, could you push the wifi connection button, hold for 3 seconds, then let me know if the power light is slowly blinking on and off every second?",
                                    id = "3",
                                    role = "Agent",
                                    participantId = "Agent",
                                },
                                new
                                {
                                    text = "Yes, I pushed the wifi connection button, and now the power light is slowly blinking?",
                                    id = "4",
                                    role = "Customer",
                                    participantId = "Customer",
                                },
                                new
                                {
                                    text = "Great. Thank you! Now, please check in your Contoso Coffee app. Does it prompt to ask you to connect with the machine?",
                                    id = "5",
                                    role = "Agent",
                                    participantId = "Agent",
                                },
                                new
                                {
                                    text = "No. Nothing happened.",
                                    id = "6",
                                    role = "Customer",
                                    participantId = "Customer",
                                },
                                new
                                {
                                    text = "I'm very sorry to hear that. Let me see if there's another way to fix the issue. Please hold on for a minute.",
                                    id = "7",
                                    role = "Agent",
                                    participantId = "Agent",
                                }
                            },
                            id = "1",
                            language = "en",
                            modality = "text",
                        },
                    }
                },
                tasks = new[]
                {
                    new
                    {
                        parameters = new
                        {
                            summaryAspects = new[]
                            {
                                "issue",
                                "resolution",
                            }
                        },
                        kind = "ConversationalSummarizationTask",
                        taskName = "1",
                    },
                },
            };

            Operation<BinaryData> analyzeConversationOperation = await client.AnalyzeConversationsAsync(WaitUntil.Started, RequestContent.Create(data));
            analyzeConversationOperation.WaitForCompletion();

            using JsonDocument result = JsonDocument.Parse(analyzeConversationOperation.Value.ToStream());
            JsonElement jobResults = result.RootElement;
            foreach (JsonElement task in jobResults.GetProperty("tasks").GetProperty("items").EnumerateArray())
            {
                JsonElement results = task.GetProperty("results");

                Console.WriteLine("Conversations:");
                foreach (JsonElement conversation in results.GetProperty("conversations").EnumerateArray())
                {
                    Console.WriteLine($"Conversation: #{conversation.GetProperty("id").GetString()}");
                    Console.WriteLine("Summaries:");
                    foreach (JsonElement summary in conversation.GetProperty("summaries").EnumerateArray())
                    {
                        Console.WriteLine($"Text: {summary.GetProperty("text").GetString()}");
                        Console.WriteLine($"Aspect: {summary.GetProperty("aspect").GetString()}");
                    }
                    Console.WriteLine();
                }
            }
        }
    }
}
```

### Output

```console
Conversations:
Conversation: #1
Summaries:
Text: Customer is unable to set up wifi connection for Smart Brew 300 coffee machine.
Aspect: issue
Text: The agent instructed the customer to press the wifi connection button, hold for 3 seconds, and check if the power light blinks. The agent also asked the customer to check if the Contoso Coffee app prompts to connect with the machine, but the issue persisted. The agent is looking for another way to fix the issue.
Aspect: resolution
```

# [Document summarization](#tab/document-summarization)

```csharp
using Azure;
using System;
using Azure.AI.TextAnalytics;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Example
{
    class Program
    {
        // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
        static string languageKey = Environment.GetEnvironmentVariable("LANGUAGE_KEY");
        static string languageEndpoint = Environment.GetEnvironmentVariable("LANGUAGE_ENDPOINT");

        private static readonly AzureKeyCredential credentials = new AzureKeyCredential(languageKey);
        private static readonly Uri endpoint = new Uri(languageEndpoint);

        // Example method for summarizing text
        static async Task TextSummarizationExample(TextAnalyticsClient client)
        {
            string document = @"The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. 
                These sentences collectively convey the main idea of the document. This feature is provided as an API for developers. 
                They can use it to build intelligent solutions based on the relevant information extracted to support various use cases. 
                Extractive summarization supports several languages. It is based on pretrained multilingual transformer models, part of our quest for holistic representations. 
                It draws its strength from transfer learning across monolingual and harness the shared nature of languages to produce models of improved quality and efficiency." ;
        
            // Prepare analyze operation input. You can add multiple documents to this list and perform the same
            // operation to all of them.
            var batchInput = new List<string>
            {
                document
            };
        
            TextAnalyticsActions actions = new TextAnalyticsActions()
            {
                ExtractiveSummarizeActions = new List<ExtractiveSummarizeAction>() { new ExtractiveSummarizeAction() }
            };
        
            // Start analysis process.
            AnalyzeActionsOperation operation = await client.StartAnalyzeActionsAsync(batchInput, actions);
            await operation.WaitForCompletionAsync();
            // View operation status.
            Console.WriteLine($"AnalyzeActions operation has completed");
            Console.WriteLine();
        
            Console.WriteLine($"Created On   : {operation.CreatedOn}");
            Console.WriteLine($"Expires On   : {operation.ExpiresOn}");
            Console.WriteLine($"Id           : {operation.Id}");
            Console.WriteLine($"Status       : {operation.Status}");
        
            Console.WriteLine();
            // View operation results.
            await foreach (AnalyzeActionsResult documentsInPage in operation.Value)
            {
                IReadOnlyCollection<ExtractiveSummarizeActionResult> summaryResults = documentsInPage.ExtractiveSummarizeResults;
        
                foreach (ExtractiveSummarizeActionResult summaryActionResults in summaryResults)
                {
                    if (summaryActionResults.HasError)
                    {
                        Console.WriteLine($"  Error!");
                        Console.WriteLine($"  Action error code: {summaryActionResults.Error.ErrorCode}.");
                        Console.WriteLine($"  Message: {summaryActionResults.Error.Message}");
                        continue;
                    }
        
                    foreach (ExtractiveSummarizeResult documentResults in summaryActionResults.DocumentsResults)
                    {
                        if (documentResults.HasError)
                        {
                            Console.WriteLine($"  Error!");
                            Console.WriteLine($"  Document error code: {documentResults.Error.ErrorCode}.");
                            Console.WriteLine($"  Message: {documentResults.Error.Message}");
                            continue;
                        }
        
                        Console.WriteLine($"  Extracted the following {documentResults.Sentences.Count} sentence(s):");
                        Console.WriteLine();
        
                        foreach (ExtractiveSummarySentence sentence in documentResults.Sentences)
                        {
                            Console.WriteLine($"  Sentence: {sentence.Text}");
                            Console.WriteLine();
                        }
                    }
                }
            }
        }

        static async Task Main(string[] args)
        {
            var client = new TextAnalyticsClient(endpoint, credentials);
            await TextSummarizationExample(client);
        }
    }
}

```

### Output

```console
AnalyzeActions operation has completed

Created On   : 9/16/2021 8:04:27 PM +00:00
Expires On   : 9/17/2021 8:04:27 PM +00:00
Id           : 2e63fa58-fbaa-4be9-a700-080cff098f91
Status       : succeeded

Extracted the following 3 sentence(s):

Sentence: The extractive summarization feature in uses natural language processing techniques to locate key sentences in an unstructured text document.

Sentence: This feature is provided as an API for developers.

Sentence: They can use it to build intelligent solutions based on the relevant information extracted to support various use cases.
```

---




**Applies to: programming-language-java**


[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-preview\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.3.0) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics)

Use this quickstart to create a text summarization application with the client library for Java. In the following example, you'll create a Java application that can summarize documents.

> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform summarization tasks without the need to write code.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/index.html) with version 8 or above
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You'll need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service, and upgrade later to a paid tier for production.
* To use the Analyze feature, you'll need a Language resource with the standard (S) pricing tier.

## Setting up

### Add the client library

Create a Maven project in your preferred IDE or development environment. Then add the following dependency to your project's *pom.xml* file. You can find the implementation syntax [for other build tools](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.3.0) online.

```xml
<dependencies>
     <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.3.0</version>
    </dependency>
</dependencies>
```



### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/quickstart.md)

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




## Code example

Create a Java file named `Example.java`. Open the file and copy the below code. Then run the code.  

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


```java
import com.azure.core.credential.AzureKeyCredential;
import com.azure.ai.textanalytics.models.*;
import com.azure.ai.textanalytics.TextAnalyticsClientBuilder;
import com.azure.ai.textanalytics.TextAnalyticsClient;
import java.util.ArrayList;
import java.util.List;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.textanalytics.util.*;

public class Example {

    // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
    private static String languageKey = System.getenv("LANGUAGE_KEY");
    private static String languageEndpoint = System.getenv("LANGUAGE_ENDPOINT");

    public static void main(String[] args) {
        TextAnalyticsClient client = authenticateClient(languageKey, languageEndpoint);
        summarizationExample(client);
    }
    // Method to authenticate the client object with your key and endpoint
    static TextAnalyticsClient authenticateClient(String key, String endpoint) {
        return new TextAnalyticsClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();
    }
    // Example method for summarizing text
    static void summarizationExample(TextAnalyticsClient client) {
        List<String> documents = new ArrayList<>();
        documents.add(
                "The extractive summarization feature uses natural language processing techniques "
                + "to locate key sentences in an unstructured text document. "
                + "These sentences collectively convey the main idea of the document. This feature is provided as an API for developers. "
                + "They can use it to build intelligent solutions based on the relevant information extracted to support various use cases. "
                + "Extractive summarization supports several languages. "
                + "It is based on pretrained multilingual transformer models, part of our quest for holistic representations. "
                + "It draws its strength from transfer learning across monolingual and harness the shared nature of languages "
                + "to produce models of improved quality and efficiency.");
    
        SyncPoller<AnalyzeActionsOperationDetail, AnalyzeActionsResultPagedIterable> syncPoller =
                client.beginAnalyzeActions(documents,
                        new TextAnalyticsActions().setDisplayName("{tasks_display_name}")
                                .setExtractSummaryActions(
                                        new ExtractSummaryAction()),
                        "en",
                        new AnalyzeActionsOptions());
    
        syncPoller.waitForCompletion();
    
        syncPoller.getFinalResult().forEach(actionsResult -> {
            System.out.println("Extractive Summarization action results:");
            for (ExtractSummaryActionResult actionResult : actionsResult.getExtractSummaryResults()) {
                if (!actionResult.isError()) {
                    for (ExtractSummaryResult documentResult : actionResult.getDocumentsResults()) {
                        if (!documentResult.isError()) {
                            System.out.println("\tExtracted summary sentences:");
                            for (SummarySentence summarySentence : documentResult.getSentences()) {
                                System.out.printf(
                                        "\t\t Sentence text: %s, length: %d, offset: %d, rank score: %f.%n",
                                        summarySentence.getText(), summarySentence.getLength(),
                                        summarySentence.getOffset(), summarySentence.getRankScore());
                            }
                        } else {
                            System.out.printf("\tCannot extract summary sentences. Error: %s%n",
                                    documentResult.getError().getMessage());
                        }
                    }
                } else {
                    System.out.printf("\tCannot execute Extractive Summarization action. Error: %s%n",
                            actionResult.getError().getMessage());
                }
            }
        });
    }
}

```



### Output

```console
Extractive Summarization action results:
    Extracted summary sentences:
         Sentence text: The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document., length: 138, offset: 0, rank score: 1.000000.
         Sentence text: This feature is provided as an API for developers., length: 50, offset: 206, rank score: 0.510000.
         Sentence text: Extractive summarization supports several languages., length: 52, offset: 378, rank score: 0.410000.
```




**Applies to: programming-language-javascript**


<!-- markdownlint-disable MD041 -->
[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme?view=azure-node-latest\&preserve-view=true) | [Additional samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/textanalytics/ai-text-analytics/samples) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-text-analytics/v/5.2.0-beta.1) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics) 

Use this quickstart to create a text summarization application with the client library for Node.js. In the following example, you create a JavaScript application that can summarize documents.

> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform summarization tasks without the need to write code.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Node.js](https://nodejs.org/) v16 LTS
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
  * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code below later in the quickstart.
  * You can use the free pricing tier (`Free F0`) to try the service, and upgrade later to a paid tier for production.
* To use the Analyze feature, you need a Language resource with the standard (S) pricing tier.

## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/quickstart.md)

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


### Create a new Node.js application

In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 

```console
mkdir myapp 

cd myapp
```

Run the `npm init` command to create a node application with a `package.json` file. 

```console
npm init
```

### Install the client library

Install the npm packages:

```console
npm install --save @azure/ai-language-text@1.1.0
```



## Code example 

Open the file and copy the below code. Then run the code.  

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


```javascript
/**
 * This sample program extracts a summary of two sentences at max from an article.
 * For more information, see the feature documentation: {@link https://learn.microsoft.com/azure/ai-services/language-service/summarization/overview}
 *
 * @summary extracts a summary from an article
 */

const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

// Load the .env file if it exists
require("dotenv").config();

// This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
const endpoint = process.env.LANGUAGE_ENDPOINT;
const apiKey = process.env.LANGUAGE_KEY;

const documents = [
  `
           Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but "what really put the firecracker behind it was the pandemic, it accelerated everything," McKelvey said. She explained that customers were asking, "'How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?"
           In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account. From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.
           "And then, when you're done, you're done. You won't have any issues around security because you're not saving anything on your device," McKelvey said, noting that all the data is stored in the cloud.
           The ability to login to a Cloud PC from anywhere on any device is part of Microsoft's larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added. It enables employees accustomed to working from home to continue working from home; it enables companies to hire interns from halfway around the world; it allows startups to scale without requiring IT expertise.
           "I think this will be interesting for those organizations who, for whatever reason, have shied away from virtualization. This is giving them an opportunity to try it in a way that their regular, everyday endpoint admin could manage," McKelvey said.
           The simplicity of Windows 365 won over Dean Wells, the corporate chief information officer for the Government of Nunavut. His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.
           We didn't run it for very long," he said. "It didn't turn out the way we had hoped. So, we actually had terminated the project and rolled back out to just regular PCs."
           He re-evaluated this decision after the Government of Nunavut was hit by a ransomware attack in November 2019 that took down everything from the phone system to the government's servers. Microsoft helped rebuild the system, moving the government to Teams, SharePoint, OneDrive and Microsoft 365. Manchester's team recruited the Government of Nunavut to pilot Windows 365. Wells was intrigued, especially by the ability to manage the elastic workforce securely and seamlessly.
           "The impact that I believe we are finding, and the impact that we're going to find going forward, is being able to access specialists from outside the territory and organizations outside the territory to come in and help us with our projects, being able to get people on staff with us to help us deliver the day-to-day expertise that we need to run the government," he said.
           "Being able to improve healthcare, being able to improve education, economic development is going to improve the quality of life in the communities."`,
];

async function main() {
  console.log("== Extractive Summarization Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const actions = [
    {
      kind: "ExtractiveSummarization",
      maxSentenceCount: 2,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");

  poller.onProgress(() => {
    console.log(
      `Last time the operation was updated was on: ${poller.getOperationState().modifiedOn}`
    );
  });
  console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
  console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "ExtractiveSummarization") {
      throw new Error(`Expected extractive summarization results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("Summary:");
      console.log(result.sentences.map((sentence) => sentence.text).join("\n"));
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
```




**Applies to: programming-language-python**


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
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You'll need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service, and upgrade later to a paid tier for production.
* To use the Analyze feature, you'll need a Language resource with the standard (S) pricing tier.


## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/quickstart.md)

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
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


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




**Applies to: rest-api**


# [Text summarization](#tab/text-summarization)

# [Conversation summarization](#tab/conversation-summarization)

# [Document summarization](#tab/document-summarization)

---

Use this quickstart to send text summarization requests using the [REST API](https://learn.microsoft.com/rest/api/language/analyze-documents/analyze-documents-submit-job/analyze-documents-submit-job?view=rest-language-analyze-documents-2024-11-15-preview\&preserve-view=true\&tabs=HTTP). In the following example, you use cURL to summarize documents or text-based customer service conversations.

> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform summarization tasks without the need to write code.


## Prerequisites

* The current version of [cURL](https://curl.haxx.se/).
* Once you have your Azure subscription, <[create a Foundry resource](../../multi-service-resource.md?pivots=azportal#create-your-first-resource).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service, and upgrade later to a paid tier for production.



## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/summarization/quickstart.md)

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




## Example request

> **Note:**
> * The following BASH examples use the `\` line continuation character. If your console or terminal uses a different line continuation character, use that character.
> * You can find language specific samples on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code).
To call the API, you need the following information:

Choose the type of summarization you would like to perform, and select one of the tabs and see an example API call:

| Feature | Description |
| --- | --- |
| Text summarization | Use extractive text summarization to produce a summary of important or relevant information within a document. |
| Conversation summarization | Use abstractive text summarization to produce a summary of issues and resolutions in transcripts between customer-service agents, and customers. |

# [Text summarization](#tab/text-summarization)

| parameter | Description |
| --- | --- |
| `-X POST <endpoint>` | Specifies your endpoint for accessing the API. |
| `-H Content-Type: application/json` | The content type for sending JSON data. |
| `-H "Ocp-Apim-Subscription-Key:<key>` | Specifies the key for accessing the API. |
| `-d <documents>` | The JSON containing the documents you want to send. |

The following cURL commands are executed from a BASH shell. Edit these commands with your own JSON values.

## Text summarization

### Text extractive summarization example

The following example gets you started with text extractive summarization:

1. Copy the command into a text editor. The BASH example uses the `\` line continuation character. If your console or terminal uses a different line continuation character, use that character instead.

```bash
curl -i -X POST $LANGUAGE_ENDPOINT/language/analyze-text/jobs?api-version=2024-11-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d \
' 
{
  "displayName": "Text ext Summarization Task Example",
  "analysisInput": {
    "documents": [
      {
        "id": "1",
        "language": "en",
        "text": "At Microsoft, we have been on a quest to advance AI beyond existing techniques, by taking a more holistic, human-centric approach to learning and understanding. As Chief Technology Officer of Foundry Tools, I have been working with a team of amazing scientists and engineers to turn this quest into a reality. In my role, I enjoy a unique perspective in viewing the relationship among three attributes of human cognition: monolingual text (X), audio or visual sensory signals, (Y) and multilingual (Z). At the intersection of all three, there's magic—what we call XYZ-code as illustrated in Figure 1—a joint representation to create more powerful AI that can speak, hear, see, and understand humans better. We believe XYZ-code will enable us to fulfill our long-term vision: cross-domain transfer learning, spanning modalities and languages. The goal is to have pre-trained models that can jointly learn representations to support a broad range of downstream AI tasks, much in the way humans do today. Over the past five years, we have achieved human performance on benchmarks in conversational speech recognition, machine translation, conversational question answering, machine reading comprehension, and image captioning. These five breakthroughs provided us with strong signals toward our more ambitious aspiration to produce a leap in AI capabilities, achieving multi-sensory and multilingual learning that is closer in line with how humans learn and understand. I believe the joint XYZ-code is a foundational component of this aspiration, if grounded with external knowledge sources in the downstream AI tasks."
      }
    ]
  },
  "tasks": [
    {
      "kind": "ExtractiveSummarization",
      "taskName": "Text Extractive Summarization Task 1",
      "parameters": {
        "sentenceCount": 6
      }
    }
  ]
}
'
```

2. Open a command prompt window (for example: BASH).

3. Paste the command from the text editor into the command prompt window, then run the command.

4. Get the `operation-location` from the response header. The value looks similar to the following URL:

```http
https://<your-language-resource-endpoint>/language/analyze-text/jobs/12345678-1234-1234-1234-12345678?api-version=2024-11-15-preview
```

5. To get the results of the request, use the following cURL command. Be sure to replace `<my-job-id>` with the numerical ID value you received from the previous `operation-location` response header:

```bash
curl -X GET $LANGUAGE_ENDPOINT/language/analyze-text/jobs/<my-job-id>?api-version=2024-11-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY"
```

### Text extractive summarization example JSON response

```json
{
    "jobId": "56e43bcf-70d8-44d2-a7a7-131f3dff069f",
    "lastUpdateDateTime": "2022-09-28T19:33:43Z",
    "createdDateTime": "2022-09-28T19:33:42Z",
    "expirationDateTime": "2022-09-29T19:33:42Z",
    "status": "succeeded",
    "errors": [],
    "displayName": "Text ext Summarization Task Example",
    "tasks": {
        "completed": 1,
        "failed": 0,
        "inProgress": 0,
        "total": 1,
        "items": [
            {
                "kind": "ExtractiveSummarizationLROResults",
                "taskName": "Text Extractive Summarization Task 1",
                "lastUpdateDateTime": "2022-09-28T19:33:43.6712507Z",
                "status": "succeeded",
                "results": {
                    "documents": [
                        {
                            "id": "1",
                            "sentences": [
                                {
                                    "text": "At Microsoft, we have been on a quest to advance AI beyond existing techniques, by taking a more holistic, human-centric approach to learning and understanding.",
                                    "rankScore": 0.69,
                                    "offset": 0,
                                    "length": 160
                                },
                                {
                                    "text": "In my role, I enjoy a unique perspective in viewing the relationship among three attributes of human cognition: monolingual text (X), audio or visual sensory signals, (Y) and multilingual (Z).",
                                    "rankScore": 0.66,
                                    "offset": 324,
                                    "length": 192
                                },
                                {
                                    "text": "At the intersection of all three, there's magic—what we call XYZ-code as illustrated in Figure 1—a joint representation to create more powerful AI that can speak, hear, see, and understand humans better.",
                                    "rankScore": 0.63,
                                    "offset": 517,
                                    "length": 203
                                },
                                {
                                    "text": "We believe XYZ-code will enable us to fulfill our long-term vision: cross-domain transfer learning, spanning modalities and languages.",
                                    "rankScore": 1.0,
                                    "offset": 721,
                                    "length": 134
                                },
                                {
                                    "text": "The goal is to have pre-trained models that can jointly learn representations to support a broad range of downstream AI tasks, much in the way humans do today.",
                                    "rankScore": 0.74,
                                    "offset": 856,
                                    "length": 159
                                },
                                {
                                    "text": "I believe the joint XYZ-code is a foundational component of this aspiration, if grounded with external knowledge sources in the downstream AI tasks.",
                                    "rankScore": 0.49,
                                    "offset": 1481,
                                    "length": 148
                                }
                            ],
                            "warnings": []
                        }
                    ],
                    "errors": [],
                    "modelVersion": "latest"
                }
            }
        ]
    }
}
```

# [Conversation summarization](#tab/conversation-summarization)

## Conversation issue and resolution summarization

The following example gets you started with conversation issue and resolution summarization:

1. Copy the command into a text editor. The BASH example uses the `\` line continuation character. If your console or terminal uses a different line continuation character, use that character instead.

```bash
curl -i -X POST $LANGUAGE_ENDPOINT/language/analyze-conversations/jobs?api-version=2024-11-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d \
' 
{
  "displayName": "Conversation Task Example",
  "analysisInput": {
    "conversations": [
      {
        "conversationItems": [
          {
            "text": "Hello, you're chatting with Rene. How may I help you?",
            "id": "1",
            "role": "Agent",
            "participantId": "Agent_1"
          },
          {
            "text": "Hi, I tried to set up wifi connection for Smart Brew 300 espresso machine, but it didn't work.",
            "id": "2",
            "role": "Customer",
            "participantId": "Customer_1"
          },
          {
            "text": "I'm sorry to hear that. Let's see what we can do to fix this issue. Could you please try the following steps for me? First, could you push the wifi connection button, hold for 3 seconds, then let me know if the power light is slowly blinking on and off every second?",
            "id": "3",
            "role": "Agent",
            "participantId": "Agent_1"
          },
          {
            "text": "Yes, I pushed the wifi connection button, and now the power light is slowly blinking.",
            "id": "4",
            "role": "Customer",
            "participantId": "Customer_1"
          },
          {
            "text": "Great. Thank you! Now, please check in your Contoso Coffee app. Does it prompt to ask you to connect with the machine? ",
            "id": "5",
            "role": "Agent",
            "participantId": "Agent_1"
          },
          {
            "text": "No. Nothing happened.",
            "id": "6",
            "role": "Customer",
            "participantId": "Customer_1"
          },
          {
            "text": "I'm very sorry to hear that. Let me see if there's another way to fix the issue. Please hold on for a minute.",
            "id": "7",
            "role": "Agent",
            "participantId": "Agent_1"
          }
        ],
        "modality": "text",
        "id": "conversation1",
        "language": "en"
      }
    ]
  },
  "tasks": [
    {
      "taskName": "Conversation Task 1",
      "kind": "ConversationalSummarizationTask",
      "parameters": {
        "summaryAspects": ["issue"]
      }
    },
    {
      "taskName": "Conversation Task 2",
      "kind": "ConversationalSummarizationTask",
      "parameters": {
        "summaryAspects": ["resolution"],
        "sentenceCount": 1
      }
    }
  ]
}
'
```
Only the `resolution` aspect supports sentenceCount. If you don't specify the `sentenceCount` parameter, the model determines the summary's length. That `sentenceCount` is just the approximation of sentence count of output summary, range 1 to 7.

2. Open a command prompt window (for example: BASH).

3. Paste the command from the text editor into the command prompt window, then run the command.

4. Get the `operation-location` from the response header. The value looks similar to the following URL:

```http
https://<your-language-resource-endpoint>/language/analyze-conversations/jobs/12345678-1234-1234-1234-12345678?api-version=2024-11-15-preview
```

5. To get the results of the request, use the following cURL command. Be sure to replace `<my-job-id>` with the numerical ID value you received from the previous `operation-location` response header:

```bash
curl -X GET $LANGUAGE_ENDPOINT/language/analyze-conversations/jobs/<my-job-id>?api-version=2024-11-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY"
```

### Conversation issue and resolution summarization example JSON response

```json
{
  "jobId": "02ec5134-78bf-45da-8f63-d7410291ec40",
  "lastUpdatedDateTime": "2022-09-29T17:43:02Z",
  "createdDateTime": "2022-09-29T17:43:01Z",
  "expirationDateTime": "2022-09-30T17:43:01Z",
  "status": "succeeded",
  "errors": [],
  "displayName": "Conversation Task Example",
  "tasks": {
    "completed": 2,
    "failed": 0,
    "inProgress": 0,
    "total": 2,
    "items": [
      {
        "kind": "conversationalSummarizationResults",
        "taskName": "Conversation Task 1",
        "lastUpdateDateTime": "2022-09-29T17:43:02.3584219Z",
        "status": "succeeded",
        "results": {
          "conversations": [
            {
              "summaries": [
                {
                  "aspect": "issue",
                  "text": "Customer wants to connect their Smart Brew 300 to their Wi-Fi. | The Wi-Fi connection didn't work."
                }
              ],
              "id": "conversation1",
              "warnings": []
            }
          ],
          "errors": [],
          "modelVersion": "latest"
        }
      },
      {
        "kind": "conversationalSummarizationResults",
        "taskName": "Conversation Task 2",
        "lastUpdateDateTime": "2022-09-29T17:43:02.2099663Z",
        "status": "succeeded",
        "results": {
          "conversations": [
            {
              "summaries": [
                {
                  "aspect": "resolution",
                  "text": "Asked customer to check if the power light is blinking on and off every second."
                }
              ],
              "id": "conversation1",
              "warnings": []
            }
          ],
          "errors": [],
          "modelVersion": "latest"
        }
      }
    ]
  }
}
```

# [Document summarization](#tab/document-summarization)

### Summarization sample document

For this project, you need a **source document** uploaded to your **source container**. You can download our [Microsoft Word sample document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/Language/native-document-summarization.docx) or [Adobe PDF](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/Language/native-document-summarization.pdf) for this quickstart. The source language is English.

### Build the POST request

1. Using your preferred editor or IDE, create a new directory for your app named `native-document`.
1. Create a new json file called **document-summarization.json** in your **native-document** directory.

1. Copy and paste the Document Summarization **request sample** into your `document-summarization.json` file. Replace **`{your-source-container-SAS-URL}`** and **`{your-target-container-SAS-URL}`** with values from your Azure portal Storage account containers instance:

  ***Request sample***

  ```json
  {
   "kind": "ExtractiveSummarization",
   "parameters": {
        "sentenceCount": 6
    },
   "analysisInput":{
        "documents":[
            {
          "source":{
            "location":"{your-source-blob-SAS-URL}"
          },
          "targets":
            {
              "location":"{your-target-container-SAS-URL}",
            }
            }
        ]
    }
  }
  ```

### Run the POST request

Before you run the **POST** request, replace `{your-language-resource-endpoint}` and `{your-key}` with the endpoint value from your Azure portal Language resource instance.

  > **Important:**
  > Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). For more information, *see* Foundry Tools [security](https://learn.microsoft.com/azure/ai-services/security-features).

  ***PowerShell***

  ```powershell
   cmd /c curl "{your-language-resource-endpoint}/language/analyze-documents/jobs?api-version=2023-11-15-preview" -i -X POST --header "Content-Type: application/json" --header "Ocp-Apim-Subscription-Key: {your-key}" --data "@document-summarization.json"
  ```

  ***command prompt / terminal***

  ```bash
  curl -v -X POST "{your-language-resource-endpoint}/language/analyze-documents/jobs?api-version=2023-11-15-preview" --header "Content-Type: application/json" --header "Ocp-Apim-Subscription-Key: {your-key}" --data "@document-summarization.json"
  ```

Here's a sample response:

   ```http
   HTTP/1.1 202 Accepted
   Content-Length: 0
   operation-location: https://{your-language-resource-endpoint}/language/analyze-documents/jobs/f1cc29ff-9738-42ea-afa5-98d2d3cabf94?api-version=2023-11-15-preview
   apim-request-id: e7d6fa0c-0efd-416a-8b1e-1cd9287f5f81
   x-ms-region: West US 2
   Date: Thu, 25 Jan 2024 15:12:32 GMT
   ```

### POST response (jobId)

You receive a 202 (Success) response that includes a read-only Operation-Location header. The value of this header contains a jobId that can be queried to get the status of the asynchronous operation and retrieve the results using a GET request:

  Screenshot showing the operation-location value in the POST response.

### Get analyze results (GET request)

1. After your successful **POST** request, poll the operation-location header returned in the POST request to view the processed data.

1. Here's the structure of the **GET** request:

   ```http
   GET {cognitive-service-endpoint}/language/analyze-documents/jobs/{jobId}?api-version=2023-11-15-preview
   ```

1. Before you run the command, make these changes:

    * Replace {**jobId**} with the Operation-Location header from the POST response.

    * Replace {**your-language-resource-endpoint**} and {**your-key**} with the values from your Language instance in the Azure portal.

### Get request

```powershell
    cmd /c curl "{your-language-resource-endpoint}/language/analyze-documents/jobs/{jobId}?api-version=2023-11-15-preview" -i -X GET --header "Content-Type: application/json" --header "Ocp-Apim-Subscription-Key: {your-key}"
```

```bash
    curl -v -X GET "{your-language-resource-endpoint}/language/analyze-documents/jobs/{jobId}?api-version=2023-11-15-preview" --header "Content-Type: application/json" --header "Ocp-Apim-Subscription-Key: {your-key}"
```

#### Examine the response

You receive a 200 (Success) response with JSON output. The **status** field indicates the result of the operation. If the operation isn't complete, the value of **status** is "running" or "notStarted", and you should call the API again, either manually or through a script. We recommend an interval of one second or more between calls.

#### Sample response

```json
{
  "jobId": "f1cc29ff-9738-42ea-afa5-98d2d3cabf94",
  "lastUpdatedDateTime": "2024-01-24T13:17:58Z",
  "createdDateTime": "2024-01-24T13:17:47Z",
  "expirationDateTime": "2024-01-25T13:17:47Z",
  "status": "succeeded",
  "errors": [],
  "tasks": {
    "completed": 1,
    "failed": 0,
    "inProgress": 0,
    "total": 1,
    "items": [
      {
        "kind": "ExtractiveSummarizationLROResults",
        "lastUpdateDateTime": "2024-01-24T13:17:58.33934Z",
        "status": "succeeded",
        "results": {
          "documents": [
            {
              "id": "doc_0",
              "source": {
                "kind": "AzureBlob",
                "location": "https://myaccount.blob.core.windows.net/sample-input/input.pdf"
              },
              "targets": [
                {
                  "kind": "AzureBlob",
                  "location": "https://myaccount.blob.core.windows.net/sample-output/df6611a3-fe74-44f8-b8d4-58ac7491cb13/ExtractiveSummarization-0001/input.result.json"
                }
              ],
              "warnings": []
            }
          ],
          "errors": [],
          "modelVersion": "2023-02-01-preview"
        }
      }
    ]
  }
}
```

---




**Applies to: ai-foundry-portal**


## Prerequisites

* [Create a Project in Foundry in the Microsoft Foundry portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md)

## Navigate to the Foundry Playground

Using the left side pane, select **Playgrounds**. Then select the **Try Azure Language Playground** button.

The development lifecycle

## Use Summarization in the Foundry Playground

The **Language Playground** consists of four sections:

* Top banner: You can select any of the currently available Languages here.
* Right pane: This pane is where you can find the **Configuration** options for the service, such as the API and model version, along with features specific to the service.
* Center pane: This pane is where you enter your text for processing. After the operation is run, some results are shown here.
* Right pane: This pane is where **Details** of the run operation are shown.

Here you can select the Summarization capability that you want to use by choosing one of these top banner tiles: **Summarize conversation**, **Summarize for call center**, or **Summarize text**.

### Use Summarize conversation

**Summarize conversation** is designed to recap conversations and segment long meetings into timestamped chapters.

In **Configuration** there are the following options:

| Option | Description |
| --- | --- |
| Select API version | Select which version of the API to use. |
| Select text language | Select the language of the input text. |
| Summarization Aspects | Different methods of summarization that are returned. At least one must be selected. |

After your operation is completed, the **Details** section contains the following fields for the selected methods of summarization:

| Field | Description |
| --- | --- |
| Sentence |
| Recap | A recap of the processed text. The **Recap** Summarization aspect must be toggled on for this to appear. |
| Chapter Title | A list of titles for semantically segmented chapters with corresponding timestamps. The **Chapter title** Summarization aspect must be toggled on for this to appear. |
| Narrative | A list of narrative summaries for semantically segmented chapters with corresponding timestamps. The **Narrative** Summarization aspect must be toggled on for this to appear. |

A screenshot of an example of summarize conversation in Foundry portal.

### Use Summarize for call center

**Summarize for call center** is designed to recap calls and summarize them for customer issues and resolutions.

In **Configuration** there are the following options:

| Option | Description |
| --- | --- |
| Select API version | Select which version of the API to use. |
| Select text language | Select the language of the input text. |
| Summarization Aspects | Different methods of summarization that are returned. At least one must be selected. |

After your operation is completed, the **Details** section contains the following fields for the selected methods of summarization:

| Field | Description |
| --- | --- |
| Sentence |
| Recap | A recap of the processed text. The **Recap** Summarization aspect must be toggled on for this to appear. |
| Issue | A summary of the customer issue in the customer-and-agent conversation. The **Issue** Summarization aspect must be toggled on for this to appear. |
| Resolution | A summary of the solutions tried in the customer-and-agent conversation. The **Resolution** Summarization aspect must be toggled on for this to appear. |

A screenshot of an example of summarize for call center in Foundry portal.

### Use Summarize text

**Summarize text** is designed to summarize and extract key information at scale from text.

In **Configuration** there are the following options:

| Option | Description |
| --- | --- |
| Extractive summarization | The service will produce a summary by extracting salient sentences. |
| Number of sentences | The number of sentences that Extractive summarization will extract. |
| Abstractive summarization | the service will generate a summary with novel sentences. |
| Summary length | The length of the summary generated by Abstractive summarization. |
| Define keywords for summary focus (preview) | Helps focus summarization on a particular set of keywords. |

After your operation is completed, the **Details** section contains the following fields for the selected methods of summarization:

| Field | Description |
| --- | --- |
| Extractive summary | Extracted sentences from the input text, ranked by detected relevance and prioritized for words in the **Defined keywords for summary focus** field, if any. Sentences are sorted by rank score of detected relevance (default) or order of appearance in the input text. |
| Abstractive summary | A summary of the input text of the length chosen in the **Summary length** field and prioritized for words in the **Defined keywords for summary focus** field, if any. |

A screenshot of an example of summarize text in Foundry portal.




## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)



## Next steps

* [How to call text summarization](how-to/summarize.md?tabs=text-summarization)
* [How to call conversation summarization](how-to/summarize.md?tabs=conversation-summarization)
