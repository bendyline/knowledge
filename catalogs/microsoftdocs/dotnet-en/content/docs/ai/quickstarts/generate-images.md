---
title: Quickstart - Generate images using OpenAI.Images.ImageClient
description: Create a simple app using to generate images using OpenAI.Images.ImageClient in .NET.
ms.date: 03/04/2026
ms.topic: quickstart
zone_pivot_groups: openai-library
ai-usage: ai-assisted
---

# Generate images using OpenAI.Images.ImageClient

In this quickstart, you create a .NET console app that uses `OpenAI.Images.ImageClient` to generate images using an OpenAI or Azure OpenAI DALL-E AI model. These models generate images from text prompts.

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
    dotnet new console -o ImagesAI
    ```

1. Change directory into the app folder:

    ```dotnetcli
    cd ImagesAI
    ```

1. Install the required packages:

    **Applies to: azure-openai**


    ```bash
    dotnet add package Azure.AI.OpenAI
    dotnet add package Azure.Identity
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```



    **Applies to: openai**


    ```bash
    dotnet add package OpenAI
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```



1. Open the app in Visual Studio Code or your editor of choice.

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

1. In the `Program.cs` file, add the following code to connect and authenticate to the AI model.

    **Applies to: azure-openai**


    [language="csharp" source="snippets/image-generation/azure-openai/program.cs" ::: (complete source file; reference: snippets/image-generation/azure-openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/image-generation/azure-openai/Program.cs.md)

    > **Note:**
    > [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) searches for authentication credentials from your local tooling. If you aren't using the `azd` template to provision the Azure OpenAI resource, you'll need to assign the `Azure AI Developer` role to the account you used to sign in to Visual Studio or the Azure CLI. For more information, see [Authenticate to Foundry tools with .NET](../azure-ai-services-authentication.md).



    **Applies to: openai**


    [language="csharp" source="snippets/image-generation/openai/program.cs" ::: (complete source file; reference: snippets/image-generation/openai/program.cs)](../../../_code/docs/ai/quickstarts/snippets/image-generation/openai/Program.cs.md)



    The preceding code:

    - Reads essential configuration values from the project user secrets to connect to the AI model.
    - Creates an `OpenAI.Images.ImageClient` to connect to the AI model.
    - Sends a prompt to the model that describes the desired image.
    - Prints the URL of the generated image to the console output.

1. Run the app:

    ```dotnetcli
    dotnet run
    ```

    Navigate to the image URL in the console output to view the generated image. Customize the text content of the prompt to create new images or modify the original.

**Applies to: azure-openai**


## Clean up resources

If you no longer need them, delete the Azure OpenAI resource and GPT-4 model deployment.

1. In the [Azure portal](https://aka.ms/azureportal), navigate to the Azure OpenAI resource.
1. Select the Azure OpenAI resource, and then select **Delete**.



## Next steps

- [Quickstart - Build an AI chat app with .NET](build-chat-app.md)
- [Generate text and conversations with .NET and Azure OpenAI Completions](https://learn.microsoft.com/training/modules/open-ai-dotnet-text-completions/)
