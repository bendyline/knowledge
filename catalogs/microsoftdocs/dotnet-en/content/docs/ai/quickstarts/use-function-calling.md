---
title: Quickstart - Extend OpenAI using functions and execute a local function with .NET
description: Create a simple chat app using OpenAI and extend the model to execute a local function.
ms.date: 03/04/2026
ms.topic: quickstart
ai-usage: ai-assisted
zone_pivot_groups: openai-library
---

# Invoke .NET functions using an AI model

In this quickstart, you create a .NET console AI chat app that connects to an AI model with local function-calling enabled. The app uses the [Microsoft.Extensions.AI](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI) library so you can write code using AI abstractions rather than a specific SDK. AI abstractions enable you to change the underlying AI model with minimal code changes.

**Applies to: openai**



## Prerequisites

- .NET 8.0 SDK or higher - [Install the .NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- An [API key from OpenAI](https://platform.openai.com/docs/libraries#create-and-export-an-api-key) so you can run this sample.




**Applies to: azure-openai**



## Prerequisites

- .NET 8.0 SDK or higher - [Install the .NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Developer CLI (optional) - [Install or update the Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd).




## Create the app

Complete the following steps to create a .NET console app to connect to an AI model.

1. In an empty directory on your computer, use the `dotnet new` command to create a new console app:

    ```dotnetcli
    dotnet new console -o FunctionCallingAI
    ```

1. Change directory into the app folder:

    ```dotnetcli
    cd FunctionCallingAI
    ```

1. Install the required packages:

    **Applies to: azure-openai**


    ```bash
    dotnet add package Azure.Identity
    dotnet add package Azure.AI.OpenAI
    dotnet add package Microsoft.Extensions.AI
    dotnet add package Microsoft.Extensions.AI.OpenAI
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```



    **Applies to: openai**


    ```bash
    dotnet add package Microsoft.Extensions.AI
    dotnet add package Microsoft.Extensions.AI.OpenAI
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```



1. Open the app in Visual Studio Code or your editor of choice

    ```bash
    code .
    ```

**Applies to: azure-openai**


## Create the AI service

1. To provision an Azure OpenAI service and model, complete the steps in the [Create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource) article.

1. From a terminal or command prompt, navigate to the root of your project directory.

1. Run the following commands to configure your Azure OpenAI endpoint and model name for the sample app:

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set AZURE_OPENAI_ENDPOINT <your-Azure-OpenAI-endpoint>
    dotnet user-secrets set AZURE_OPENAI_GPT_NAME <your-Azure-OpenAI-model-name>
    dotnet user-secrets set AZURE_OPENAI_API_KEY <your-Azure-OpenAI-key>
    ```




**Applies to: openai**


## Configure the app

1. Navigate to the root of your .NET project from a terminal or command prompt.

1. Run the following commands to configure your OpenAI API key as a secret for the sample app:

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set OpenAIKey <your-OpenAI-key>
    dotnet user-secrets set ModelName <your-OpenAI-model-name>
    ```



## Add the app code

The app uses the [`Microsoft.Extensions.AI`](https://www.nuget.org/packages/Microsoft.Extensions.AI/) package to send and receive requests to the AI model.

1. In the **Program.cs** file, add the following code to connect and authenticate to the AI model. The `ChatClient` is also configured to use function invocation, which allows the AI model to call .NET functions in your code.

    **Applies to: azure-openai**


    [language="csharp" source="snippets/function-calling/azure-openai/Program.cs" id="GetChatClient"::: (complete source file; reference: snippets/function-calling/azure-openai/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/function-calling/azure-openai/Program.cs.md)



    **Applies to: openai**


    [language="csharp" source="snippets/function-calling/openai/program.cs" id="GetChatClient"::: (complete source file; reference: snippets/function-calling/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/function-calling/openai/Program.cs.md)



1. Create a new `ChatOptions` object that contains an inline function the AI model can call to get the current weather. The function declaration includes a delegate to run logic, and name and description parameters to describe the purpose of the function to the AI model.

    [language="csharp" source="snippets/function-calling/openai/program.cs" id="AddOptions"::: (complete source file; reference: snippets/function-calling/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/function-calling/openai/Program.cs.md)

1. Add a system prompt to the `chatHistory` to provide context and instructions to the model. Send a user prompt with a question that requires the AI model to call the registered function to properly answer the question.

    [language="csharp" source="snippets/function-calling/openai/program.cs" id="PromptModel"::: (complete source file; reference: snippets/function-calling/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/function-calling/openai/Program.cs.md)

1. Use the `dotnet run` command to run the app:

    ```dotnetcli
    dotnet run
    ```

    The app prints the completion response from the AI model, which includes data provided by the .NET function. The AI model understood that the registered function was available and called it automatically to generate a proper response.

**Applies to: azure-openai**


## Clean up resources

If you no longer need them, delete the Azure OpenAI resource and GPT-4 model deployment.

1. In the [Azure portal](https://aka.ms/azureportal), navigate to the Azure OpenAI resource.
1. Select the Azure OpenAI resource, and then select **Delete**.



## Next steps

- [Handle invalid tool input from AI models](../how-to/handle-invalid-tool-input.md)
- [Access data in AI functions](../how-to/access-data-in-functions.md)
- [Quickstart - Build an AI chat app with .NET](build-chat-app.md)
- [Generate text and conversations with .NET and Azure OpenAI Completions](https://learn.microsoft.com/training/modules/open-ai-dotnet-text-completions/)
