---
title: Chatbot with Azure OpenAI (.NET)
description: Learn how to build and deploy a Blazor web app to Azure App Service that connects to Azure OpenAI using managed identity.
author: cephalin
ms.author: cephalin
ms.date: 11/18/2025
ms.update-cycle: 180-days
ms.topic: tutorial
ms.custom:
  - devx-track-dotnet
  - linux-related-content
  - build-2025
ms.collection: ce-skilling-ai-copilot
ms.service: azure-app-service
---

# Tutorial: Build a chatbot with Azure App Service and Azure OpenAI (.NET)

In this tutorial, you'll build an intelligent AI application by integrating Azure OpenAI with a .NET Blazor application and deploying it to Azure App Service. You'll create an interactive Blazor page that sends chat completion requests to a model in Azure OpenAI and streams the response back to the page.

Screenshot showing chatbot running in Azure App Service.

In this tutorial, you learn how to:

> 
> * Create an Azure OpenAI resource and deploy a language model
> * Build a Blazor application with Azure OpenAI
> * Deploy the application to Azure App Service
> * Implement passwordless authentication both in the development environment and in Azure

## Prerequisites

- An [Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) with an active subscription
- A [GitHub account](https://github.com/join) for using GitHub Codespaces

## 1. Create an Azure OpenAI resource



In this section, you use Azure CLI in GitHub Codespaces to create an Azure OpenAI resource.

1. Sign in to [GitHub Codespaces](https://github.com/codespaces) with your GitHub account.
1. Select **Use this template** in the **Blank** tile to create a new blank codespace.
1. In the Codespace terminal, install the Azure CLI.

   ```bash
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

1. Sign in to your Azure account.

   ```azurecli
   az login
   ```

   Follow the instructions in the terminal to authenticate.

1. Set environment variables by providing names for your resource group and Azure OpenAI service and setting an appropriate Azure region as your location.

   ```azurecli
   export RESOURCE_GROUP="<group-name>"
   export OPENAI_SERVICE_NAME="<azure-openai-name>"
   export APPSERVICE_NAME="<app-name>"
   export LOCATION="<azure-region>"
   ```

   > **Important:**
   > The location is tied to the regional availability of the chosen model. Model and [deployment type](https://learn.microsoft.com/azure/ai-foundry/foundry-models/concepts/deployment-types) availability vary among Azure regions and billing tiers. This tutorial uses `gpt-4o-mini`, which is available in several regions under the Standard deployment type.
   >
   > Before selecting a location, consult the [Model summary and region availability table](https://learn.microsoft.com/azure/ai-services/openai/concepts/models#model-summary-table-and-region-availability) to verify model support in your preferred region.

1. Create a resource group and an Azure OpenAI resource with a custom domain, and then add a `gpt-4o-mini` model:

   ```azurecli
   # Resource group
   az group create --name $RESOURCE_GROUP --location $LOCATION
   # Azure OpenAI resource
   az cognitiveservices account create \
     --name $OPENAI_SERVICE_NAME \
     --resource-group $RESOURCE_GROUP \
     --location $LOCATION \
     --custom-domain $OPENAI_SERVICE_NAME \
     --kind OpenAI \
     --sku s0
   # gpt-4o-mini model
   az cognitiveservices account deployment create \
     --name $OPENAI_SERVICE_NAME \
     --resource-group $RESOURCE_GROUP \
     --deployment-name gpt-4o-mini \
     --model-name gpt-4o-mini \
     --model-version 2024-07-18 \
     --model-format OpenAI \
     --sku-name Standard \
     --sku-capacity 1
   # Cognitive Services OpenAI User role that lets the signed in Azure user read models from Azure OpenAI
   az role assignment create \
     --assignee $(az ad signed-in-user show --query id -o tsv) \
     --role "Cognitive Services OpenAI User" \
     --scope /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.CognitiveServices/accounts/$OPENAI_SERVICE_NAME
   ```

Now that you have an Azure OpenAI resource, you can create a web application to interact with it.


## 2. Create and set up a Blazor web app

In this section, you'll create a new Blazor web application using the .NET CLI.

1. In your Codespace terminal, create a new Blazor app and try running it for the first time.

    ```bash
    dotnet new blazor -o .
    dotnet run
    ```
  
    You should see a notification in GitHub Codespaces indicating that the app is available at a specific port. Select **Open in browser** to launch the app in a new browser tab.

1. Back in the Codespace terminal, stop the app with Ctrl+C.

1. Install the required NuGet packages for working with Azure OpenAI:

    ```bash
    dotnet add package Azure.AI.OpenAI
    dotnet add package Azure.Identity
    ```

1. Open `Components/Pages/Home.razor` and replace its content with the following code, for a simple chat completion stream call with Azure OpenAI:

    ```csharp
    @page "/"
    @rendermode InteractiveServer
    @using Azure.AI.OpenAI
    @using Azure.Identity
    @using OpenAI.Chat
    @inject Microsoft.Extensions.Configuration.IConfiguration _config
    
    <h3>Azure OpenAI Chat</h3>
    <div class="mb-3 d-flex align-items-center" style="margin:auto;">
        <input class="form-control me-2" @bind="userMessage" placeholder="Type your message..." />
        <button class="btn btn-primary" @onclick="SendMessage">Send</button>
    </div>
    <div class="card p-3" style="margin:auto;">
        @if (!string.IsNullOrEmpty(aiResponse))
        {
            <div class="alert alert-info mt-3 mb-0">@aiResponse</div>
        }
    </div>
    
    @code {
        private string? userMessage;
        private string? aiResponse;
    
        private async Task SendMessage()
        {
            if (string.IsNullOrWhiteSpace(userMessage)) return;
    
            // Initialize the Azure OpenAI client
            var endpoint = new Uri(_config["AZURE_OPENAI_ENDPOINT"]!);
            var client = new AzureOpenAIClient(endpoint, new DefaultAzureCredential());
            var chatClient = client.GetChatClient("gpt-4o-mini");
    
            aiResponse = string.Empty;
            StateHasChanged();
    
            // Create a chat completion streaming request
            var chatUpdates = chatClient.CompleteChatStreamingAsync(
                [
                    new UserChatMessage(userMessage)
                ]);
    
                await foreach(var chatUpdate in chatUpdates)
                {
                    // Update the UI with the streaming response
                    foreach(var contentPart in chatUpdate.ContentUpdate)
                {
                    aiResponse += contentPart.Text;
                    StateHasChanged();
                }
            }
        }
    }
    ```

1. In the terminal, retrieve your OpenAI endpoint:

    ```bash
    az cognitiveservices account show \
      --name $OPENAI_SERVICE_NAME \
      --resource-group $RESOURCE_GROUP \
      --query properties.endpoint \
      --output tsv
    ```

1. Run the app again by adding `AZURE_OPENAI_ENDPOINT` with its value from the CLI output:

   ```bash
   AZURE_OPENAI_ENDPOINT=<output-from-previous-cli-command> dotnet run
   ```

1. Select **Open in browser** to launch the app in a new browser tab.

1. Type a message in the textbox and select "**Send**, and give the app a few seconds to reply with the message from Azure OpenAI.

The application uses [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential), which automatically uses your Azure CLI signed in user for token authentication. Later in this tutorial, you'll deploy your Blazor app to Azure App Service and configure it to securely connect to your Azure OpenAI resource using managed identity. The same `DefaultAzureCredential` in your code can detect the managed identity and use it for authentication. No extra code is needed.

## 3. Deploy to Azure App Service and configure OpenAI connection

Now that your app works locally, let's deploy it to Azure App Service and set up a service connection to Azure OpenAI using managed identity.

1. First, deploy your app to Azure App Service using the Azure CLI command `az webapp up`. This command creates a new web app and deploys your code to it:

    ```bash
    az webapp up \
      --resource-group $RESOURCE_GROUP \
      --location $LOCATION \
      --name $APPSERVICE_NAME \
      --plan $APPSERVICE_NAME \
      --sku B1 \
      --os-type Linux \
      --track-status false
    ```

   This command might take a few minutes to complete. It creates a new web app in the same resource group as your OpenAI resource.

1. After the app is deployed, create a service connection between your web app and the Azure OpenAI resource using managed identity:

    ```bash
    az webapp connection create cognitiveservices \
      --resource-group $RESOURCE_GROUP \
      --name $APPSERVICE_NAME \
      --target-resource-group $RESOURCE_GROUP \
      --account $OPENAI_SERVICE_NAME
      --connection azure-openai \
      --system-identity
    ```

   This command creates a connection between your web app and the Azure OpenAI resource by: 

    - Generating system-assigned managed identity for the web app.
    - Adding the Cognitive Services OpenAI Contributor role to the managed identity for the Azure OpenAI resource.
    - Adding the `AZURE_OPENAI_ENDPOINT` app setting to your web app.

    Your app is now deployed and connected to Azure OpenAI with managed identity. It reads the `AZURE_OPENAI_ENDPOINT` app setting through the [IConfiguration](https://learn.microsoft.com/dotnet/api/microsoft.extensions.configuration.iconfiguration) injection.

1. Open the deployed web app in the browser. Find the URL of the deployed web app in the terminal output. Open your web browser and navigate to it.

    ```azurecli
    az webapp browse
    ```    

1. Type a message in the textbox and select **Send**, and give the app a few seconds to reply with the message from Azure OpenAI.

    Screenshot showing chatbot running in Azure App Service.

## Frequently asked questions

- [What if I want to connect to OpenAI instead of Azure OpenAI?](#what-if-i-want-to-connect-to-openai-instead-of-azure-openai)
- [Can I connect to Azure OpenAI with an API key instead?](#can-i-connect-to-azure-openai-with-an-api-key-instead)
- [How does DefaultAzureCredential work in this tutorial?](#how-does-defaultazurecredential-work-in-this-tutorial)

---

### What if I want to connect to OpenAI instead of Azure OpenAI?

To connect to OpenAI instead, use the following code:

```csharp
@using OpenAI.Client

var client = new OpenAIClient("<openai-api-key>");
```

For more information, see [OpenAI API authentication](https://platform.openai.com/docs/api-reference/authentication).

When working with connection secrets in App Service, you should use [Key Vault references](app-service-key-vault-references.md) instead of storing secrets directly in your codebase. This ensures that sensitive information remains secure and is managed centrally.

---

### Can I connect to Azure OpenAI with an API key instead?

Yes, you can connect to Azure OpenAI using an API key instead of managed identity. This approach is supported by the Azure OpenAI SDKs and Semantic Kernel.

- For details on using API keys with Semantic Kernel in C#, see the [Semantic Kernel C# Quickstart](https://learn.microsoft.com/semantic-kernel/get-started/quick-start-guide?pivots=programming-language-csharp).
- For details on using API keys with the Azure OpenAI client library: [Quickstart: Get started using chat completions with Azure OpenAI Service](https://learn.microsoft.com/azure/ai-services/openai/chatgpt-quickstart?pivots=programming-language-csharp).

When working with connection secrets in App Service, you should use [Key Vault references](app-service-key-vault-references.md) instead of storing secrets directly in your codebase. This ensures that sensitive information remains secure and is managed centrally.

---

### How does DefaultAzureCredential work in this tutorial?

The `DefaultAzureCredential` simplifies authentication by automatically selecting the best available authentication method:

- **During local development**: After you run `az login`, it uses your local Azure CLI credentials.
- **When deployed to Azure App Service**: It uses the app's managed identity for secure, passwordless authentication.

This approach lets your code run securely and seamlessly in both local and cloud environments without modification.

## More resources

- [Build grounded agent applications with Foundry Agent Service and Foundry IQ](scenario-ai-chatbot-retrieval-augmented-generation.md)
- [Tutorial: Run chatbot in App Service with a Phi-4 sidecar extension (ASP.NET Core)](tutorial-ai-slm-dotnet.md)
- [Create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource)
- [Learn more about managed identity in App Service](overview-managed-identity.md)
