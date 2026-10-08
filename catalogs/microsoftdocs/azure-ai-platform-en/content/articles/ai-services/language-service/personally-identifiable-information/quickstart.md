---
title: "Quickstart: Detect personally identifiable information (PII)"
titleSuffix: Foundry Tools
description: Use Azure Language in Foundry Tools to detect and redact personally identifiable information (PII) with client libraries, the REST API, or the Microsoft Foundry portal.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 04/27/2026
ms.author: lajanuar
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom:
- language-service-pii
- mode-other
- devx-track-extended-java
- devx-track-js
- devx-track-python
- pilot-ai-workflow-jan-2026
keywords: pii, personally identifiable information, redaction, text analytics
zone_pivot_groups: programming-languages-text-analytics
ai-usage: ai-assisted
---

<!-- markdownlint-disable MD025 -->
# Quickstart: Detect personally identifiable information (PII)

In this quickstart, you use the Azure Language in Foundry Tools PII detection feature to identify and redact personally identifiable information in text. You can get started using your preferred client library, the REST API, or the Microsoft Foundry portal.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

> **Note:**
> This quickstart focuses on text PII. For conversation workflows, see [How to detect and redact PII in conversations](how-to/redact-conversation-pii.md). For document workflows, see [Document-based PII overview](document-based-pii-overview.md) and [How to detect and redact PII in native documents](how-to/redact-document-pii.md).

**Applies to: programming-language-csharp**


<!-- markdownlint-disable MD041 -->
[Reference documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?view=azure-dotnet\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.2.0) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics)

Use this quickstart to create a Personally Identifiable Information (PII) detection application with the client library for .NET. In the following example, you create a C# application that can identify [recognized sensitive information](concepts/entity-categories.md) in text.

<!-- markdownlint-disable MD041 -->
> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform Azure Language tasks without the need to write code.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/)

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 


### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.


### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/personally-identifiable-information/quickstart.md)

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

Using the Visual Studio IDE, create a new .NET Core console app. This step creates a "Hello World" project with a single C# source file: *program.cs*.

Install the client library by right-clicking the solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse** and search for `Azure.AI.TextAnalytics`. Select version `5.2.0`, and then **Install**. You can also use the [Package Manager Console](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-powershell#find-and-install-a-package).

## Code example

Copy the following code into your *program.cs* file and run the code.

```csharp
using Azure;
using System;
using Azure.AI.TextAnalytics;

namespace Example
{
    class Program
    {
        // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
        static string languageKey = Environment.GetEnvironmentVariable("LANGUAGE_KEY");
        static string languageEndpoint = Environment.GetEnvironmentVariable("LANGUAGE_ENDPOINT");

        // Example method for detecting sensitive information (PII) from text 
        static void RecognizePIIExample(TextAnalyticsClient client)
        {
            string document = "Call our office at 312-555-1234, or send an email to support@contoso.com.";
        
            PiiEntityCollection entities = client.RecognizePiiEntities(document).Value;
        
            Console.WriteLine($"Redacted Text: {entities.RedactedText}");
            if (entities.Count > 0)
            {
                Console.WriteLine($"Recognized {entities.Count} PII entit{(entities.Count > 1 ? "ies" : "y")}:");
                foreach (PiiEntity entity in entities)
                {
                    Console.WriteLine($"Text: {entity.Text}, Category: {entity.Category}, SubCategory: {entity.SubCategory}, Confidence score: {entity.ConfidenceScore}");
                }
            }
            else
            {
                Console.WriteLine("No entities were found.");
            }
        }

        static void Main(string[] args)
        {
            if (string.IsNullOrWhiteSpace(languageKey) || string.IsNullOrWhiteSpace(languageEndpoint))
            {
                Console.WriteLine("Missing LANGUAGE_KEY or LANGUAGE_ENDPOINT environment variables.");
                return;
            }

            var endpoint = new Uri(languageEndpoint);
            var credentials = new AzureKeyCredential(languageKey);
            var client = new TextAnalyticsClient(endpoint, credentials);
            RecognizePIIExample(client);

            Console.Write("Press any key to exit.");
            Console.ReadKey();
        }

    }
}
```

## Output

```console
Redacted Text: Call our office at ************, or send an email to *******************.
Recognized 2 PII entities:
Text: 312-555-1234, Category: PhoneNumber, SubCategory: , Confidence score: 0.8
Text: support@contoso.com, Category: Email, SubCategory: , Confidence score: 0.8
```




**Applies to: programming-language-java**


<!-- markdownlint-disable MD041 -->
[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?view=azure-java-stable\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics)

Use this quickstart to create a Personally Identifiable Information (PII) detection application with the client library for Java. In the following example, you create a Java application that can identify [recognized sensitive information](concepts/entity-categories.md) in text.

<!-- markdownlint-disable MD041 -->
> **Tip:**
> You can try the [**Microsoft Foundry**](https://ai.azure.com/) platform to perform Azure Language tasks without the need to write code.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
* [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/index.html) with version 8 or above

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 


### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.


### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/personally-identifiable-information/quickstart.md)

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


### Add the client library

Create a Maven project in your preferred IDE or development environment. Then add the following dependency to your project's *pom.xml* file. You can find the implementation syntax [for other build tools](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0) online.

```xml
<dependencies>
     <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.2.0</version>
    </dependency>
</dependencies>
```

## Code example

Create a Java file named `Example.java`. Open the file and copy the following code. Then run the code.

```java
import com.azure.core.credential.AzureKeyCredential;
import com.azure.ai.textanalytics.models.*;
import com.azure.ai.textanalytics.TextAnalyticsClientBuilder;
import com.azure.ai.textanalytics.TextAnalyticsClient;

public class Example {

    // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
    private static String languageKey = System.getenv("LANGUAGE_KEY");
    private static String languageEndpoint = System.getenv("LANGUAGE_ENDPOINT");

    public static void main(String[] args) {
        if (languageKey == null || languageKey.isBlank() || languageEndpoint == null || languageEndpoint.isBlank()) {
            throw new IllegalArgumentException("Missing LANGUAGE_KEY or LANGUAGE_ENDPOINT environment variables");
        }
        TextAnalyticsClient client = authenticateClient(languageKey, languageEndpoint);
        recognizePiiEntitiesExample(client);
    }
    // Method to authenticate the client object with your key and endpoint
    static TextAnalyticsClient authenticateClient(String key, String endpoint) {
        return new TextAnalyticsClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();
    }

    // Example method for detecting sensitive information (PII) from text
    static void recognizePiiEntitiesExample(TextAnalyticsClient client)
    {
        // The text that need be analyzed.
        String document = "My SSN is 859-98-0987";
        PiiEntityCollection piiEntityCollection = client.recognizePiiEntities(document);
        System.out.printf("Redacted Text: %s%n", piiEntityCollection.getRedactedText());
        piiEntityCollection.forEach(entity -> System.out.printf(
            "Recognized Personally Identifiable Information entity: %s, entity category: %s, entity subcategory: %s,"
                + " confidence score: %f.%n",
            entity.getText(), entity.getCategory(), entity.getSubcategory(), entity.getConfidenceScore()));
    }
}

```

## Output

```console
Redacted Text: My SSN is ***********
Recognized Personally Identifiable Information entity: 859-98-0987, entity category: USSocialSecurityNumber, entity subcategory: null, confidence score: 0.650000.
```




**Applies to: programming-language-javascript**


<!-- markdownlint-disable MD041 -->
[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-text-analytics-readme?view=azure-node-latest\&preserve-view=true) | [More samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/textanalytics/ai-text-analytics/samples) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-text-analytics) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/textanalytics/ai-text-analytics)

Use this quickstart to create a Personally Identifiable Information (PII) detection application with the client library for Node.js. In the following example, you create a JavaScript application that can identify [recognized sensitive information](concepts/entity-categories.md) in text.

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
* [Node.js](https://nodejs.org/) v14 `LTS` or later

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 


### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.


### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/personally-identifiable-information/quickstart.md)

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

Install the npm package:

```console
npm install @azure/ai-text-analytics
```

## Code example

Open the file and copy the following sample and run the code.

```javascript
"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;

if (!key || !endpoint) {
  throw new Error("Missing LANGUAGE_KEY or LANGUAGE_ENDPOINT environment variables.");
}

async function main() {
    console.log(`PII recognition sample`);

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

  const documents = ["My phone number is 555-555-5555"];

    const results = await client.recognizePiiEntities(documents, "en");

    for (const result of results) {
      if (result.error) {
        console.error("Encountered an error:", result.error);
        continue;
      }

      console.log(`Redacted text: "${result.redactedText}"`);
      console.log("PII entities:");
      for (const entity of result.entities) {
        console.log(`\t- "${entity.text}" of type ${entity.category}`);
      }
    }
}

main().catch((err) => {
console.error("The sample encountered an error:", err);
});
```

## Output

```console
PII recognition sample
Redacted text: "My phone number is ************"
PII entities:
        - "555-555-5555" of type PhoneNumber
```




**Applies to: programming-language-python**


[Reference documentation](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?view=azure-python\&preserve-view=true) |  [More samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) | [Package (PyPi)](https://pypi.org/project/azure-ai-textanalytics/5.2.0/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics)

Use this quickstart to create a Personally Identifiable Information (PII) detection application with the client library for Python. In the following example, you'll create a Python application that can identify [recognized sensitive information](concepts/entity-categories.md) in text.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
* [Python 3.8 or later](https://www.python.org/)

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 


### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.


### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/personally-identifiable-information/quickstart.md)

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

```console
pip install azure-ai-textanalytics==5.2.0
```



## Code example

Create a new Python file and copy the below code. Then run the code.

```python
import os

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
language_key = os.environ.get("LANGUAGE_KEY")
language_endpoint = os.environ.get("LANGUAGE_ENDPOINT")

if not language_key or not language_endpoint:
        raise ValueError("Missing LANGUAGE_KEY or LANGUAGE_ENDPOINT environment variables")

# Authenticate the client using your key and endpoint 
def authenticate_client():
    ta_credential = AzureKeyCredential(language_key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

# Example method for detecting sensitive information (PII) from text 
def pii_recognition_example(client):
    documents = [
        "The employee's SSN is 859-98-0987.",
        "The employee's phone number is 555-555-5555."
    ]
    response = client.recognize_pii_entities(documents, language="en")
    result = [doc for doc in response if not doc.is_error]
    for doc in result:
        print("Redacted Text: {}".format(doc.redacted_text))
        for entity in doc.entities:
            print("Entity: {}".format(entity.text))
            print("\tCategory: {}".format(entity.category))
            print("\tConfidence Score: {}".format(entity.confidence_score))
            print("\tOffset: {}".format(entity.offset))
            print("\tLength: {}".format(entity.length))
pii_recognition_example(client)
```



## Output

```console
Redacted Text: The ********'s SSN is ***********.
Entity: employee
        Category: PersonType
        Confidence Score: 0.97
        Offset: 4
        Length: 8
Entity: 859-98-0987
        Category: USSocialSecurityNumber
        Confidence Score: 0.65
        Offset: 22
        Length: 11
Redacted Text: The ********'s phone number is ************.
Entity: employee
        Category: PersonType
        Confidence Score: 0.96
        Offset: 4
        Length: 8
Entity: 555-555-5555
        Category: PhoneNumber
        Confidence Score: 0.8
        Offset: 31
        Length: 12
```




**Applies to: rest-api**


[Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)

Use this quickstart to send Personally Identifiable Information (PII) detection requests using the REST API. In the following example, you will use cURL to identify [recognized sensitive information](concepts/entity-categories.md) in text.

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 


### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.


### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/personally-identifiable-information/quickstart.md)

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


## Create a JSON file with the example request body

In a code editor, create a new file named `test_pii_payload.json` and copy the following JSON example. This example request will be sent to the API in the next step.

```json
{
    "kind": "PiiEntityRecognition",
    "parameters": {
        "modelVersion": "latest"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "language": "en",
                "text": "Call our office at 312-555-1234, or send an email to support@contoso.com"
            }
        ]
    }
}
```

Save `test_pii_payload.json` somewhere on your computer. For example, your desktop.  

## Send a personally identifiable information (PII) detection API request

Use the following commands to send the API request using the program you're using. Copy the command into your terminal, and run it.

| Parameter | Description |
| --- | --- |
| `-X POST <endpoint>` | Specifies your endpoint for accessing the API. |
| `-H Content-Type: application/json` | The content type for sending JSON data. |
| `-H "Ocp-Apim-Subscription-Key: <key>"` | Specifies the key for accessing the API. |
| `-d <documents>` | The JSON containing the documents you want to send. |

# [Windows](#tab/windows)

 Replace `C:\Users\<myaccount>\Desktop\test_pii_payload.json` with the location of the example JSON request file you created in the previous step.

### Command prompt

```terminal
curl -X POST "%LANGUAGE_ENDPOINT%/language/:analyze-text?api-version=2022-05-01" ^
-H "Content-Type: application/json" ^
-H "Ocp-Apim-Subscription-Key: %LANGUAGE_KEY%" ^
-d "@C:\Users\<myaccount>\Desktop\test_pii_payload.json"
```

### PowerShell

```terminal
curl.exe -X POST $env:LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 `
-H "Content-Type: application/json" `
-H "Ocp-Apim-Subscription-Key: $env:LANGUAGE_KEY" `
-d "@C:\Users\<myaccount>\Desktop\test_pii_payload.json"
```

# [Linux](#tab/linux)

Use the following commands to send the API request using the program you're using. Replace `/home/mydir/test_pii_payload.json` with the location of the example JSON request file you created in the previous step.

```terminal
curl -X POST $LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d "@/home/mydir/test_pii_payload.json"
```

# [macOS](#tab/macos)

Use the following commands to send the API request using the program you're using. Replace `/home/mydir/test_pii_payload.json` with the location of the example JSON request file you created in the previous step.

```terminal
curl -X POST $LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d "@/home/mydir/test_pii_payload.json"
```

---

### JSON response

```json
{
    "kind": "PiiEntityRecognitionResults",
    "results": {
        "documents": [{
            "redactedText": "Call our office at ************, or send an email to *******************",
            "id": "1",
            "entities": [{
                "text": "312-555-1234",
                "category": "PhoneNumber",
                "offset": 19,
                "length": 12,
                "confidenceScore": 0.8
            }, {
                "text": "support@contoso.com",
                "category": "Email",
                "offset": 53,
                "length": 19,
                "confidenceScore": 0.8
            }],
            "warnings": []
        }],
        "errors": [],
        "modelVersion": "2021-01-15"
    }
}
```




**Applies to: ai-foundry-portal**


<!-- markdownlint-disable MD041 -->
## Prerequisites

> **Tip:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource—whether used on its own or through Language Studio—you can continue to use those existing Language resources within the Microsoft Foundry portal.
> * For more information, see [Connect services in the Microsoft Foundry portal](../../connect-services-foundry-portal.md).
> * Consider using a Foundry resource for the best experience. You can also follow these instructions with a Language resource.

* **Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **Requisite permissions**. Make sure the person establishing the account and project is assigned as the **Foundry Account Owner** role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, see [Role based access control (RBAC)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/openai/how-to/role-based-access-control.md#cognitive-services-contributor).
* **Foundry resource**. Create a [Foundry resource](../../multi-service-resource.md) or see [Configure a Foundry resource](../concepts/configure-azure-resources.md). Alternatively, you can use a [Language resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics).
* **A Foundry project**. For more information, see [Create a Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md).

## Role-based access control (RBAC) requirements

Assign the correct roles to your user principal and project managed identity to access PII playgrounds. Microsoft recommends using Microsoft Entra ID authentication, which enforces role-based restrictions. Key-based authentication grants full access without role checks and should be avoided in production environments.

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged.

* Assign the minimum required roles to both your user principal and project managed identity so they can access Foundry features.

* Verify current assignments using [Check access for a user to a single Azure resource](https://learn.microsoft.com/azure/role-based-access-control/check-access).

### [New Foundry](#tab/new-foundry)

> **Note:**
> This content refers to the [new Foundry](https://ai.azure.com/) portal, which supports only [Foundry projects](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md) and provides streamlined access to models, agents, and tools. To confirm that you're using new Foundry, make sure the version toggle in the portal banner is in the **on** position. 

You can use [new Foundry playground](https://ai.azure.com/) to:

> 
>
> * Detect and redact PII from text, conversations, or documents
> * Configure redaction policies, entity filters, and excluded values
> * Review detected entities and confidence scores

## Navigate to the new Foundry playground

The active project appears in the upper-left corner. To create a new project:

1. Open the project drop-down menu.
1. Enter a project name or select an existing one.
1. Select **Create project**.

   Screenshot of the new Foundry homepage.

There are two ways to access the PII playground:

1. Select the **Discover** tab from the upper right navigation bar to go to the **Models** page.
   * In the search bar under models, enter **Azure** and press enter.
   * Select your PII capability model from the search results.
   * Select the **Open in Playground** button.

1. Select the **Build** tab from the upper right navigation bar.
   * From the left navigation bar, select **Models**.
   * Select the **AI services** tab.
   * Select your PII capability model to go to the playground.

## Detect PII in the new Foundry playground

Each PII capability uses a dedicated model. On the **Playground** tab, select your capability from the drop-down menu:

| Capability | Model name |
| --- | --- |
| Text PII redaction | **Azure Language—Text PII redaction** |
| Conversation PII redaction | **Azure Language—Conversational PII redaction** |
| Document PII redaction | **Azure Language—Document PII redaction** |

1. Select sample input, use the paperclip icon to upload a file, or enter your own input data.

    > **Note:**
    > For the **Document PII redaction** capability, the playground ships with curated sample documents and expected outputs, so you can evaluate detection of common entity types—including names, addresses, financial IDs, and health identifiers—without uploading your own data. Document input is a native file (`.pdf`, `.docx`, or `.txt`), and the output is a redacted document rendering shown side-by-side with the source. This differs from text and conversation workflows, where entities are highlighted inline within the input text.
    >
    > Document processing is handled by the existing asynchronous native-file document-based PII pipeline. The playground uses the same Document PII model and policies as the production API, so results align with production behavior.
    >
    > After the job completes, a single view lets you compare detection results across entity types and review confidence scores. When you're ready, transition from curated samples to uploading live documents for real-content testing.

1. In the **Configure** side panel, set your preferred options. Available options vary by capability:

    | Option | Description |
    | --- | --- |
    | **API version** | Select the API version that you prefer to use. |
    | **Model version** | Select the model version that you prefer to use. |
    | **Language** | Select the language of your input. |
    | **Select types to include** | Select the PII types you want to detect or redact. |
    | **Value to exclude** | Specify values you want to exclude from detection. |
    | **Synonyms** | Provide alternative names for specific entity types. |
    | **Policy type** | Choose the type of redaction policy to apply (character mask, entity mask, or no mask). |
    | **Specify redaction character** | Choose the character used to mask sensitive text. Available with the **CharacterMask** policy. |

1. Select **Detect**. For text and conversation capabilities, detected entities are highlighted in the input and you can review the accompanying details in formatted text or as a JSON response. For the document capability, the redacted document is displayed side-by-side with the source and entity details appear in the **Details** pane.

    | Field | Description |
    | --- | --- |
    | **Type** | The detected entity type. |
    | **Confidence** | The model's level of certainty regarding whether it correctly identified an entity type. |
    | **Offset** | The number of characters from the beginning of the input to the entity. |
    | **Length** | The character length of the entity. |

Verify that the detected entities match the PII in your input. You can use the **Edit** button to modify the **Configure** parameters and rerun detection as needed.

### [Foundry (classic)](#tab/foundry-classic)

> **Note:**
> This content refers to the [Foundry (classic)](https://ai.azure.com/) portal, which supports hub-based projects and other resource types. To confirm that you're using Foundry (classic), make sure the version toggle in the portal banner is in the **off** position. 

You can use [Foundry (classic)](https://ai.azure.com/) to:

> 
>
> * Detect and redact PII from conversations and text
> * Configure redaction policies
> * Review detected entities and confidence scores

## Navigate to the Foundry (classic) playground

1. In the left pane, select **Playgrounds**.
1. Select the **Try Azure Language Playground** button.

Screenshot showing the Playgrounds navigation and the Try Azure Language Playground button in Foundry (classic).

## Detect PII in the Foundry (classic) playground

The **Language Playground** consists of four sections:

| Section | Purpose |
| --- | --- |
| **Top banner** | Select the input language and choose a PII detection capability. |
| **Left pane** | Set **Configuration** options such as API version, model version, and redaction policy. |
| **Center pane** | Enter text or conversation data for processing and review highlighted results. |
| **Right pane** | View **Details** for each detected entity. |

Select your PII capability from the top banner tiles. Each capability targets a different scenario.

In **Configuration** you can select from the following options:

| Option | Description |
| --- | --- |
| Select API version | Select which version of the API to use. |
| Select model version | Select which version of the model to use. |
| Select text language | Select the language of your input. |
| Select types to include | Select the types of information you want to redact. |
| Specify redaction policy | Select the method of redaction. |
| Specify redaction character | Select the character used for redaction. Only available with the **CharacterMask** redaction policy. |

After the operation completes, each detected entity is highlighted in the center pane with its type label displayed beneath it.

The **Details** section contains the following fields for each entity:

| Field | Description |
| --- | --- |
| Entity | The detected entity. |
| Category | The entity type that was detected. |
| Offset | The number of characters from the beginning of the line to the entity. |
| Length | The character length of the entity. |
| Confidence | The model's level of certainty that the entity type is correct. |
| Tags | The model's confidence scores for each identified entity subtype. |

Verify that each PII entity appears highlighted with the correct category label. If no entities appear, check that the input contains recognizable PII patterns and that the **Types** filter includes the expected categories.

---



## Troubleshooting

| Issue | Resolution |
| --- | --- |
| You get a `401` or `403` error when calling the API. | Confirm your key and endpoint are correct for the same Azure AI resource. If you recently changed role assignments, wait a few minutes and try again. |
| You get an error about missing environment variables. | Confirm `LANGUAGE_KEY` and `LANGUAGE_ENDPOINT` are set in your environment before you run the sample. |
| The Foundry experience doesn't match the steps. | In the Foundry portal, use the version toggle to switch between Foundry (classic) and Foundry (new), then follow the matching tab in the Foundry section. |
| No entities are detected in your text. | Verify that the input text contains recognizable PII patterns (names, addresses, phone numbers). Check that the **Types** filter includes the entity categories you expect. |
| The API returns an `InvalidLanguage` error. | Confirm the language code in the request matches one of the [supported languages](language-support.md). |

## Clean up resources

If you no longer need the resources you created in this quickstart, delete the individual resource or the entire resource group. Deleting the resource group also deletes all other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Related content

* [PII overview](overview.md)
* [Document-based PII overview](document-based-pii-overview.md)
* [How to detect and redact PII in text](how-to/redact-text-pii.md)
* [How to detect and redact PII in conversations](how-to/redact-conversation-pii.md)
* [Supported entity categories for text](concepts/entity-categories.md)
