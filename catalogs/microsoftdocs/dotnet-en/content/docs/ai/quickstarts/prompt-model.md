---
title: Quickstart - Connect to and prompt an AI model with .NET
description: Create a simple chat app using Microsoft.Extensions.AI to summarize a text.
ms.date: 03/04/2026
ms.topic: quickstart
zone_pivot_groups: openai-library
ai-usage: ai-assisted
---

# Connect to and prompt an AI model

In this quickstart, you learn how to create a .NET console chat app to connect to and prompt an OpenAI or Azure OpenAI model. The app uses the [Microsoft.Extensions.AI](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI) library so you can write code using AI abstractions rather than a specific SDK. AI abstractions enable you to change the underlying AI model with minimal code changes.

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
    dotnet new console -o ExtensionsAI
    ```

1. Change directory into the app folder:

    ```dotnetcli
    cd ExtensionsAI
    ```

1. Install the required packages:

    **Applies to: azure-openai**


    ```bash
    dotnet add package Azure.AI.OpenAI
    dotnet add package Azure.Identity
    dotnet add package Microsoft.Extensions.AI.OpenAI --prerelease
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```



    **Applies to: openai**


    ```bash
    dotnet add package OpenAI
    dotnet add package Microsoft.Extensions.AI.OpenAI --prerelease
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```



1. Open the app in Visual Studio Code or your editor of choice.

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

1. Copy the [benefits.md](https://raw.githubusercontent.com/dotnet/docs/refs/heads/main/docs/ai/quickstarts/snippets/prompt-completion/azure-openai/benefits.md) file to your project directory. Configure the project to copy this file to the output directory. If you're using Visual Studio, right-click on the file in Solution Explorer, select **Properties**, and then set **Copy to Output Directory** to **Copy if newer**.

1. In the `Program.cs` file, add the following code to connect and authenticate to the AI model.

   **Applies to: azure-openai**


   [language="csharp" source="snippets/prompt-completion/azure-openai/program.cs" id="CreateChatClient"::: (complete source file; reference: snippets/prompt-completion/azure-openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/prompt-completion/azure-openai/Program.cs.md)

   > **Note:**
   > [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) searches for authentication credentials from your local tooling. If you aren't using the `azd` template to provision the Azure OpenAI resource, you'll need to assign the `Azure AI Developer` role to the account you used to sign in to Visual Studio or the Azure CLI. For more information, see [Authenticate to Foundry tools with .NET](../azure-ai-services-authentication.md).



   **Applies to: openai**


   [language="csharp" source="snippets/prompt-completion/openai/program.cs" id="CreateChatClient"::: (complete source file; reference: snippets/prompt-completion/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/prompt-completion/openai/Program.cs.md)



1. Add code to read the `benefits.md` file content and then create a prompt for the model. The prompt instructs the model to summarize the file's text content in 20 words or less.

   [language="csharp" source="snippets/prompt-completion/openai/program.cs" id="CreatePrompt"::: (complete source file; reference: snippets/prompt-completion/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/prompt-completion/openai/Program.cs.md)

1. Call the `GetResponseAsync` method to send the prompt to the model to generate a response.

   [language="csharp" source="snippets/prompt-completion/openai/program.cs" id="GetResponse"::: (complete source file; reference: snippets/prompt-completion/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/prompt-completion/openai/Program.cs.md)

1. Run the app:

   ```dotnetcli
   dotnet run
   ```

   The app prints out the completion response from the AI model. Customize the text content of the `benefits.md` file or the length of the summary to see the differences in the responses.

**Applies to: azure-openai**


## Clean up resources

If you no longer need them, delete the Azure OpenAI resource and GPT-4 model deployment.

1. In the [Azure portal](https://aka.ms/azureportal), navigate to the Azure OpenAI resource.
1. Select the Azure OpenAI resource, and then select **Delete**.



## Next steps

- [Quickstart - Build an AI chat app with .NET](build-chat-app.md)
- [Generate text and conversations with .NET and Azure OpenAI Completions](https://learn.microsoft.com/training/modules/open-ai-dotnet-text-completions/)
