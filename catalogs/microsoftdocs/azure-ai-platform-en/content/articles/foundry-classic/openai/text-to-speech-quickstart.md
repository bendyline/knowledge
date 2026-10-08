---
title: "Text to speech with Azure OpenAI in Microsoft Foundry Models (classic)"
description: "Convert text to speech using Azure OpenAI voices. (classic)"
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: quickstart
ms.date: 01/30/2026
ms.author: pafarley
author: PatrickFarley
recommendations: false
ai-usage: ai-assisted
zone_pivot_groups: programming-languages-rest-js-cs

---

# Quickstart: Convert text to speech with Azure OpenAI in Microsoft Foundry Models (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



This quickstart shows you how to convert text to speech using Azure OpenAI voices.  

The available voices are: `alloy`, `echo`, `fable`, `onyx`, `nova`, and `shimmer`. For more information, see [Azure OpenAI reference documentation for text to speech](reference-preview.md#speech---create).

**Applies to: rest-api**



## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure OpenAI resource created in the North Central US or Sweden Central regions with the `tts-1` or `tts-1-hd` model deployed. For more information, see [Create a resource and deploy a model with Azure OpenAI](how-to/create-resource.md).

## Set up

### Retrieve key and endpoint

To successfully make a call against Azure OpenAI, you need an **endpoint** and a **key**.

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | The service endpoint can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. Alternatively, you can find the endpoint via the **Deployments** page in Microsoft Foundry portal. An example endpoint is: `https://docs-test-001.openai.azure.com/`. |
| `AZURE_OPENAI_API_KEY` | This value can be found in the **Keys & Endpoint** section when examining your resource from the Azure portal. You can use either `KEY1` or `KEY2`. |

Go to your resource in the Azure portal. The **Endpoint and Keys** can be found in the **Resource Management** section. Copy your endpoint and access key as you need both for authenticating your API calls. You can use either `KEY1` or `KEY2`. Always having two keys allows you to securely rotate and regenerate keys without causing a service disruption.

Screenshot of the overview UI for an Azure OpenAI resource in the Azure portal with the endpoint & access keys location highlighted.

### Environment variables

Create and assign persistent environment variables for your key and endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/text-to-speech-quickstart.md)

# [Command Line](#tab/command-line)

```CMD
setx AZURE_OPENAI_API_KEY "REPLACE_WITH_YOUR_KEY_VALUE_HERE" 
```

```CMD
setx AZURE_OPENAI_ENDPOINT "REPLACE_WITH_YOUR_ENDPOINT_HERE" 
```

# [PowerShell](#tab/powershell)

```powershell
[System.Environment]::SetEnvironmentVariable('AZURE_OPENAI_API_KEY', 'REPLACE_WITH_YOUR_KEY_VALUE_HERE', 'User')
```

```powershell
[System.Environment]::SetEnvironmentVariable('AZURE_OPENAI_ENDPOINT', 'REPLACE_WITH_YOUR_ENDPOINT_HERE', 'User')
```

# [Bash](#tab/bash)

```Bash
echo export AZURE_OPENAI_API_KEY="REPLACE_WITH_YOUR_KEY_VALUE_HERE" >> /etc/environment && source /etc/environment
```

```Bash
echo export AZURE_OPENAI_ENDPOINT="REPLACE_WITH_YOUR_ENDPOINT_HERE" >> /etc/environment && source /etc/environment
```
---

## Create a REST request and response

In a bash shell, run the following command. You need to replace `YourDeploymentName` with the deployment name you chose when you deployed the text to speech model. The deployment name isn't necessarily the same as the model name. Entering the model name results in an error unless you chose a deployment name that is identical to the underlying model name.

```bash
curl $AZURE_OPENAI_ENDPOINT/openai/deployments/YourDeploymentName/audio/speech?api-version=2025-04-01-preview \
 -H "api-key: $AZURE_OPENAI_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
    "model": "tts-1-hd",
    "input": "I'm excited to try text to speech.",
    "voice": "alloy"
}' --output speech.mp3
```

The format of your first line of the command with an example endpoint would appear as follows curl `https://aoai-docs.openai.azure.com/openai/deployments/{YourDeploymentName}/audio/speech?api-version=2025-04-01-preview \`. 

> **Important:**
> For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). For more information about credential security, see this [security](../../ai-services/security-features.md) article.





**Applies to: programming-language-javascript**



[Source code](https://github.com/openai/openai-node) | [Package (npm)](https://www.npmjs.com/package/openai) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for passwordless authentication in a local development environment, create the necessary context by signing in with the Azure CLI.
- An Azure OpenAI resource created in a supported region (see [Region availability](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/models#model-summary-table-and-region-availability)). For more information, see [Create a resource and deploy a model with Azure OpenAI](how-to/create-resource.md).

### Microsoft Entra ID prerequisites

For the recommended keyless authentication with Microsoft Entra ID, you need to:
- Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for keyless authentication with Microsoft Entra ID.
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

## Set up
 
1. Create a new folder `synthesis-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir synthesis-quickstart && cd synthesis-quickstart
    ```
    
1. Create the `package.json` with the following command:

    ```shell
    npm init -y
    ```   

1. Install the OpenAI client library for JavaScript with:

    ```console
    npm install openai
    ```

1. For the **recommended** passwordless authentication:

    ```console
    npm install @azure/identity
    ```

## Retrieve resource information


You need to retrieve the following information to authenticate your application with your Azure OpenAI resource:

#### [Microsoft Entra ID](#tab/keyless)

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | This value will correspond to the custom name you chose for your deployment when you deployed a model. This value can be found under **Resource Management** > **Model Deployments** in the Azure portal. |

Learn more about [keyless authentication](https://learn.microsoft.com/azure/ai-services/authentication) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

#### [API key](#tab/api-key)

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_OPENAI_API_KEY` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. You can use either `KEY1` or `KEY2`. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | This value will correspond to the custom name you chose for your deployment when you deployed a model. This value can be found under **Resource Management** > **Model Deployments** in the Azure portal. |

Learn more about [finding API keys](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/text-to-speech-quickstart.md)

---





> **Caution:**
> To use the recommended keyless authentication with the SDK, make sure that the `AZURE_OPENAI_API_KEY` environment variable isn't set. 

## Create a speech file

#### [Microsoft Entra ID](#tab/keyless)

1. Create the `index.js` file with the following code:

    ```javascript
    const { writeFile } = require("fs/promises");
    const { AzureOpenAI } = require("openai");
    const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");
    require("openai/shims/node");
    
    // You will need to set these environment variables or edit the following values
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "Your endpoint";
    const speechFilePath = "<path to save the speech file>";
    
    // Required Azure OpenAI deployment name and API version
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "tts";
    const apiVersion = process.env.OPENAI_API_VERSION || "2024-08-01-preview";
    
    // keyless authentication    
    const credential = new DefaultAzureCredential();
    const scope = "https://ai.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);

    function getClient() {
      return new AzureOpenAI({
        endpoint,
        azureADTokenProvider,
        apiVersion,
        deployment: deploymentName,
      });
    }
    
    async function generateAudioStream(
      client,
      params
    ) {
      const response = await client.audio.speech.create(params);
      if (response.ok) return response.body;
      throw new Error(`Failed to generate audio stream: ${response.statusText}`);
    }
    export async function main() {
      console.log("== Text to Speech Sample ==");
    
      const client = getClient();
      const streamToRead = await generateAudioStream(client, {
        model: deploymentName,
        voice: "alloy",
        input: "the quick brown chicken jumped over the lazy dogs",
      });
    
      console.log(`Streaming response to ${speechFilePath}`);
      await writeFile(speechFilePath, streamToRead);
      console.log("Finished streaming");
    }
    
    main().catch((err) => {
      console.error("The sample encountered an error:", err);
    });
    
    ```

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the JavaScript file.

    ```shell
    node index.js
    ```

## [API key](#tab/api-key)

1. Create the `index.js` file with the following code: 

    ```javascript
    const { writeFile } = require("fs/promises");
    const { AzureOpenAI } = require("openai");
    require("openai/shims/node");
    
    // You will need to set these environment variables or edit the following values
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "Your endpoint";
    const apiKey = process.env.AZURE_OPENAI_API_KEY || "Your API key";
    const speechFilePath = "<path to save the speech file>";
    
    // Required Azure OpenAI deployment name and API version
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "tts";
    const apiVersion = process.env.OPENAI_API_VERSION || "2024-08-01-preview";
    
    function getClient() {
      return new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment: deploymentName,
      });
    }
    
    async function generateAudioStream(
      client,
      params
    ) {
      const response = await client.audio.speech.create(params);
      if (response.ok) return response.body;
      throw new Error(`Failed to generate audio stream: ${response.statusText}`);
    }
    export async function main() {
      console.log("== Text to Speech Sample ==");
    
      const client = getClient();
      const streamToRead = await generateAudioStream(client, {
        model: deploymentName,
        voice: "alloy",
        input: "the quick brown chicken jumped over the lazy dogs",
      });
    
      console.log(`Streaming response to ${speechFilePath}`);
      await writeFile(speechFilePath, streamToRead);
      console.log("Finished streaming");
    }
    
    main().catch((err) => {
      console.error("The sample encountered an error:", err);
    });
    
    ```

1. Run the JavaScript file.

    ```shell
    node index.js
    ```
    
---



**Applies to: programming-language-typescript**



[Source code](https://github.com/openai/openai-node) | [Package (npm)](https://www.npmjs.com/package/openai) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- [TypeScript](https://www.typescriptlang.org/download/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for passwordless authentication in a local development environment, create the necessary context by signing in with the Azure CLI.
- An Azure OpenAI resource created in a supported region (see [Region availability](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/models#model-summary-table-and-region-availability)). For more information, see [Create a resource and deploy a model with Azure OpenAI](how-to/create-resource.md).

### Microsoft Entra ID prerequisites

For the recommended keyless authentication with Microsoft Entra ID, you need to:
- Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for keyless authentication with Microsoft Entra ID.
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

## Set up

1. Create a new folder `assistants-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir assistants-quickstart && cd assistants-quickstart
    ```
    

1. Create the `package.json` with the following command:

    ```shell
    npm init -y
    ```

1. Update the `package.json` to ECMAScript with the following command: 

    ```shell
    npm pkg set type=module
    ```
    

1. Install the OpenAI client library for JavaScript with:

    ```console
    npm install openai
    ```

1. For the **recommended** passwordless authentication:

    ```console
    npm install @azure/identity
    ```

## Retrieve resource information


You need to retrieve the following information to authenticate your application with your Azure OpenAI resource:

#### [Microsoft Entra ID](#tab/keyless)

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | This value will correspond to the custom name you chose for your deployment when you deployed a model. This value can be found under **Resource Management** > **Model Deployments** in the Azure portal. |

Learn more about [keyless authentication](https://learn.microsoft.com/azure/ai-services/authentication) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

#### [API key](#tab/api-key)

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_OPENAI_API_KEY` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. You can use either `KEY1` or `KEY2`. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | This value will correspond to the custom name you chose for your deployment when you deployed a model. This value can be found under **Resource Management** > **Model Deployments** in the Azure portal. |

Learn more about [finding API keys](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/text-to-speech-quickstart.md)

---





> **Caution:**
> To use the recommended keyless authentication with the SDK, make sure that the `AZURE_OPENAI_API_KEY` environment variable isn't set. 

## Create a speech file

#### [Microsoft Entra ID](#tab/typescript-keyless)

1. Create the `index.ts` file with the following code:

    ```typescript
    import { writeFile } from "fs/promises";
    import { AzureOpenAI } from "openai";
    import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
    import type { SpeechCreateParams } from "openai/resources/audio/speech";
    import "openai/shims/node";
    
    // You will need to set these environment variables or edit the following values
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "Your endpoint";
    const speechFilePath = "<path to save the speech file>";
    
    // Required Azure OpenAI deployment name and API version
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "tts";
    const apiVersion = process.env.OPENAI_API_VERSION || "2025-04-01-preview";

    // keyless authentication    
    const credential = new DefaultAzureCredential();
    const scope = "https://ai.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);

    function getClient(): AzureOpenAI {
      return new AzureOpenAI({
        endpoint,
        azureADTokenProvider,
        apiVersion,
        deployment: deploymentName,
      });
    }
    
    async function generateAudioStream(
      client: AzureOpenAI,
      params: SpeechCreateParams
    ): Promise<NodeJS.ReadableStream> {
      const response = await client.audio.speech.create(params);
      if (response.ok) return response.body;
      throw new Error(`Failed to generate audio stream: ${response.statusText}`);
    }
    export async function main() {
      console.log("== Text to Speech Sample ==");
    
      const client = getClient();
      const streamToRead = await generateAudioStream(client, {
        model: deploymentName,
        voice: "alloy",
        input: "the quick brown chicken jumped over the lazy dogs",
      });
    
      console.log(`Streaming response to ${speechFilePath}`);
      await writeFile(speechFilePath, streamToRead);
      console.log("Finished streaming");
    }
    
    main().catch((err) => {
      console.error("The sample encountered an error:", err);
    });
    
    ```
    
   The import of `"openai/shims/node"` is necessary when running the code in a Node.js environment. It ensures that the output type of the `client.audio.speech.create` method is correctly set to `NodeJS.ReadableStream`.

1. Create the `tsconfig.json` file to transpile the TypeScript code and copy the following code for ECMAScript.

    ```json
    {
        "compilerOptions": {
          "module": "NodeNext",
          "target": "ES2022", // Supports top-level await
          "moduleResolution": "NodeNext",
          "skipLibCheck": true, // Avoid type errors from node_modules
          "strict": true // Enable strict type-checking options
        },
        "include": ["*.ts"]
    }
    ```

1. Transpile from TypeScript to JavaScript.

    ```shell
    tsc
    ```
    
1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the code with the following command:

    ```shell
    node index.js
    ```

#### [API key](#tab/typescript-key)

1. Create the `index.ts` file with the following code:

    ```typescript
    import { writeFile } from "fs/promises";
    import { AzureOpenAI } from "openai";
    import type { SpeechCreateParams } from "openai/resources/audio/speech";
    import "openai/shims/node";
    
    // You will need to set these environment variables or edit the following values
    const endpoint = "Your endpoint";
    const apiKey = process.env.AZURE_OPENAI_API_KEY || "Your API key";
    const speechFilePath =
      process.env["SPEECH_FILE_PATH"] || "<path to save the speech file>";
    
    // Required Azure OpenAI deployment name and API version
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "tts";
    const apiVersion = process.env.OPENAI_API_VERSION || "2025-04-01-preview";
    
    function getClient(): AzureOpenAI {
      return new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment: deploymentName,
      });
    }
    
    async function generateAudioStream(
      client: AzureOpenAI,
      params: SpeechCreateParams
    ): Promise<NodeJS.ReadableStream> {
      const response = await client.audio.speech.create(params);
      if (response.ok) return response.body;
      throw new Error(`Failed to generate audio stream: ${response.statusText}`);
    }
    export async function main() {
      console.log("== Text to Speech Sample ==");
    
      const client = getClient();
      const streamToRead = await generateAudioStream(client, {
        model: deploymentName,
        voice: "alloy",
        input: "the quick brown chicken jumped over the lazy dogs",
      });
    
      console.log(`Streaming response to ${speechFilePath}`);
      await writeFile(speechFilePath, streamToRead);
      console.log("Finished streaming");
    }
    
    main().catch((err) => {
      console.error("The sample encountered an error:", err);
    });
    
    ```
    
   The import of `"openai/shims/node"` is necessary when running the code in a Node.js environment. It ensures that the output type of the `client.audio.speech.create` method is correctly set to `NodeJS.ReadableStream`.

1. Create the `tsconfig.json` file to transpile the TypeScript code and copy the following code for ECMAScript.

    ```json
    {
        "compilerOptions": {
          "module": "NodeNext",
          "target": "ES2022", // Supports top-level await
          "moduleResolution": "NodeNext",
          "skipLibCheck": true, // Avoid type errors from node_modules
          "strict": true // Enable strict type-checking options
        },
        "include": ["*.ts"]
    }
    ```

1. Transpile from TypeScript to JavaScript.

    ```shell
    tsc
    ```
    
1. Run the code with the following command:

    ```shell
    node index.js
    ```

---



**Applies to: programming-language-dotnet**



## Prerequisites

- An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure OpenAI resource with a text to speech model (such as `tts`) deployed in a [supported region](../foundry-models/concepts/models-sold-directly-by-azure.md?tabs=standard-audio). For more information, see [Create a resource and deploy a model with Azure OpenAI](how-to/create-resource.md).
- [The .NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download)

### Microsoft Entra ID prerequisites

For the recommended keyless authentication with Microsoft Entra ID, you need to:
- Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for keyless authentication with Microsoft Entra ID.
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

## Set up

1. Create a new folder `to-speech-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir to-speech-quickstart && cd to-speech-quickstart
    ```

1. Create a new console application with the following command:

    ```shell
    dotnet new console
    ```

3. Install the [OpenAI .NET client library](https://www.nuget.org/packages/Azure.AI.OpenAI/) with the [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command:

    ```console
    dotnet add package Azure.AI.OpenAI
    ```

1. For the **recommended** keyless authentication with Microsoft Entra ID, install the [Azure.Identity](https://www.nuget.org/packages/Azure.Identity) package with:

    ```console
    dotnet add package Azure.Identity
    ```

1. For the **recommended** keyless authentication with Microsoft Entra ID, sign in to Azure with the following command:

    ```console
    az login
    ```

## Retrieve resource information


You need to retrieve the following information to authenticate your application with your Azure OpenAI resource:

#### [Microsoft Entra ID](#tab/keyless)

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | This value will correspond to the custom name you chose for your deployment when you deployed a model. This value can be found under **Resource Management** > **Model Deployments** in the Azure portal. |

Learn more about [keyless authentication](https://learn.microsoft.com/azure/ai-services/authentication) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

#### [API key](#tab/api-key)

| Variable name | Value |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_OPENAI_API_KEY` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. You can use either `KEY1` or `KEY2`. |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | This value will correspond to the custom name you chose for your deployment when you deployed a model. This value can be found under **Resource Management** > **Model Deployments** in the Azure portal. |

Learn more about [finding API keys](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/text-to-speech-quickstart.md)

---





## Run the quickstart

The sample code in this quickstart uses Microsoft Entra ID for the recommended keyless authentication. If you prefer to use an API key, you can replace the `DefaultAzureCredential` object with an `AzureKeyCredential` object. 

#### [Microsoft Entra ID](#tab/keyless)

```csharp
AzureOpenAIClient openAIClient = new AzureOpenAIClient(new Uri(endpoint), new DefaultAzureCredential()); 
```

#### [API key](#tab/api-key)

```csharp
AzureOpenAIClient openAIClient = new AzureOpenAIClient(new Uri(endpoint), new AzureKeyCredential(key));
```
---

> **Note:**
> You can get sample audio files, such as *wikipediaOcelot.wav*, from the [Azure Speech in Foundry Tools SDK repository at GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/sampledata/audiofiles).

To run the quickstart, follow these steps:

1. Replace the contents of `Program.cs` with the following code and update the placeholder values with your own.
    
    ```csharp
    using Azure;
    using Azure.AI.OpenAI;
    using Azure.Identity; // Required for Passwordless auth
    
    var endpoint = new Uri(
        Environment.GetEnvironmentVariable("YOUR_OPENAI_ENDPOINT") ?? throw new ArgumentNullException());
    var credentials = new DefaultAzureCredential();

    // Use this line for key auth
    // var credentials = new AzureKeyCredential(
    //    Environment.GetEnvironmentVariable("YOUR_OPENAI_KEY") ?? throw new ArgumentNullException());

    var deploymentName = "tts"; // Default deployment name, update with your own if necessary
    var speechFilePath = "YOUR_AUDIO_FILE_PATH";
    
    AzureOpenAIClient openAIClient = new AzureOpenAIClient(endpoint, credentials);
    AudioClient audioClient = openAIClient.GetAudioClient(deploymentName);
    
    var result = await audioClient.GenerateSpeechAsync(
                    "the quick brown chicken jumped over the lazy dogs");
    
    Console.WriteLine("Streaming response to ${speechFilePath}");
    await File.WriteAllBytesAsync(speechFilePath, result.Value.ToArray());
    Console.WriteLine("Finished streaming");
    ```

1. Run the application using the `dotnet run` command or the run button at the top of Visual Studio:

    ```dotnetcli
    dotnet run
    ```

## Output

The application will generate an audio file at the location you specified for the `speechFilePath` variable. Play the file on your device to hear the generated audio.




## Clean up resources

If you want to clean up and remove an Azure OpenAI resource, you can delete the resource. Before deleting the resource, you must first delete any deployed models.

- [Azure portal](../../ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../../ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

* Learn more about how to work with text to speech with Azure OpenAI in the [Azure OpenAI reference documentation](reference-preview.md#speech---create).
* For more examples, check out the [Azure OpenAI Samples GitHub repository](https://github.com/Azure-Samples/openai)
