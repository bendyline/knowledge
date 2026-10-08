---
title: "Quickstart: Use the Text Analytics for health REST API and client library"
titleSuffix: Foundry Tools
description: Use this quickstart to start using Text Analytics for health.
#services: cognitive-services
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 08/13/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: language-service-health, mode-api, devx-track-extended-java, devx-track-js, devx-track-python
keywords: text mining, health, text analytics for health
zone_pivot_groups: programming-languages-text-analytics
---
<!-- markdownlint-disable MD025 -->
# Quickstart: Using Text Analytics for health client library and REST API

This article contains Text Analytics for health quickstarts that help with using the supported client libraries, C#, Java, NodeJS, and Python and the REST API.

> **Tip:**
> You can use [**Microsoft Foundry**](https://ai.azure.com/) to try Azure Language features without needing to write code. 

**Applies to: programming-language-csharp**


[Reference documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?preserve-view=true\&view=azure-dotnet) | [More samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.2.0) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics)

Use this quickstart to create a Text Analytics for health application with the client library for .NET. In the following example, you create a C# application that can identify medical [entities](concepts/health-entity-categories.md), [relations](concepts/relation-extraction.md), and [assertions](concepts/assertion-detection.md) that appear in text.




## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service (providing 5,000 text records - 1,000 characters each) and upgrade later to the `Standard S` pricing tier for production. You can also start with the `Standard S` pricing tier, receiving the same initial quota for free (5000 text records) before getting charged. For more information on pricing, visit [Language Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/).



## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/text-analytics-for-health/quickstart.md)

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

Using the Visual Studio IDE, create a new .NET Core console app. This action creates a "Hello World" project with a single C# source file: *program.cs*.

Install the client library by right-clicking the solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse** and search for `Azure.AI.TextAnalytics`. Select version `5.2.0`, and then **Install**. You can also use the [Package Manager Console](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-powershell#find-and-install-a-package).



## Code example

Copy the following code into your *program.cs* file. Then run the code.

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


```csharp
using Azure;
using System;
using Azure.AI.TextAnalytics;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Example
{
    class Program
    {
        // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
        private static readonly AzureKeyCredential credentials = new (Environment.GetEnvironmentVariable("LANGUAGE_KEY"));
        private static readonly Uri endpoint = new (Environment.GetEnvironmentVariable("LANGUAGE_ENDPOINT"));
        
        // Example method for extracting information from healthcare-related text 
        static async Task healthExample(TextAnalyticsClient client)
        {
            string document = "Prescribed 100mg ibuprofen, taken twice daily.";

            List<string> batchInput = new List<string>()
            {
                document
            };
            AnalyzeHealthcareEntitiesOperation healthOperation = await client.StartAnalyzeHealthcareEntitiesAsync(batchInput);
            await healthOperation.WaitForCompletionAsync();

            await foreach (AnalyzeHealthcareEntitiesResultCollection documentsInPage in healthOperation.Value)
            {
                Console.WriteLine($"Results of Azure Text Analytics for health async model, version: \"{documentsInPage.ModelVersion}\"");
                Console.WriteLine("");

                foreach (AnalyzeHealthcareEntitiesResult entitiesInDoc in documentsInPage)
                {
                    if (!entitiesInDoc.HasError)
                    {
                        foreach (var entity in entitiesInDoc.Entities)
                        {
                            // view recognized healthcare entities
                            Console.WriteLine($"  Entity: {entity.Text}");
                            Console.WriteLine($"  Category: {entity.Category}");
                            Console.WriteLine($"  Offset: {entity.Offset}");
                            Console.WriteLine($"  Length: {entity.Length}");
                            Console.WriteLine($"  NormalizedText: {entity.NormalizedText}");
                        }
                        Console.WriteLine($"  Found {entitiesInDoc.EntityRelations.Count} relations in the current document:");
                        Console.WriteLine("");

                        // view recognized healthcare relations
                        foreach (HealthcareEntityRelation relations in entitiesInDoc.EntityRelations)
                        {
                            Console.WriteLine($"    Relation: {relations.RelationType}");
                            Console.WriteLine($"    For this relation there are {relations.Roles.Count} roles");

                            // view relation roles
                            foreach (HealthcareEntityRelationRole role in relations.Roles)
                            {
                                Console.WriteLine($"      Role Name: {role.Name}");

                                Console.WriteLine($"      Associated Entity Text: {role.Entity.Text}");
                                Console.WriteLine($"      Associated Entity Category: {role.Entity.Category}");
                                Console.WriteLine("");
                            }
                            Console.WriteLine("");
                        }
                    }
                    else
                    {
                        Console.WriteLine("  Error!");
                        Console.WriteLine($"  Document error code: {entitiesInDoc.Error.ErrorCode}.");
                        Console.WriteLine($"  Message: {entitiesInDoc.Error.Message}");
                    }
                    Console.WriteLine("");
                }
            }
        }

        static async Task Main(string[] args)
        {
            var client = new TextAnalyticsClient(endpoint, credentials);
            await healthExample(client);
        }

    }
}

```




### Output

```console
Results of Azure Text Analytics for health async model, version: "2022-03-01"

  Entity: 100mg
  Category: Dosage
  Offset: 11
  Length: 5
  NormalizedText:
  Entity: ibuprofen
  Category: MedicationName
  Offset: 17
  Length: 9
  NormalizedText: ibuprofen
  Entity: twice daily
  Category: Frequency
  Offset: 34
  Length: 11
  NormalizedText:
  Found 2 relations in the current document:

    Relation: DosageOfMedication
    For this relation there are 2 roles
      Role Name: Dosage
      Associated Entity Text: 100mg
      Associated Entity Category: Dosage

      Role Name: Medication
      Associated Entity Text: ibuprofen
      Associated Entity Category: MedicationName


    Relation: FrequencyOfMedication
    For this relation there are 2 roles
      Role Name: Medication
      Associated Entity Text: ibuprofen
      Associated Entity Category: MedicationName

      Role Name: Frequency
      Associated Entity Text: twice daily
      Associated Entity Category: Frequency
```

> **Tip:**
> Fast Healthcare Interoperability Resources (FHIR) structuring is available using Azure Language REST API. The client libraries are not currently supported. [Learn more](how-to/call-api.md) on how to use FHIR structuring in your API call.




**Applies to: programming-language-java**


[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?preserve-view=true\&view=azure-java-stable) | [More samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics)

Use this quickstart to create a Text Analytics for health application with the client library for Java. In the following example, you create a Java application that can identify medical [entities](concepts/health-entity-categories.md), [relations](concepts/relation-extraction.md), and [assertions](concepts/assertion-detection.md) that appear in text.

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/index.html) with version 8 or above
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service (providing 5,000 text records - 1,000 characters each) and upgrade later to the `Standard S` pricing tier for production. You can also start with the `Standard S` pricing tier, receiving the same initial quota for free (5,000 text records) before getting charged. For more information on pricing, visit [Language Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/).




## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/text-analytics-for-health/quickstart.md)

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

Create a Java file named `EntityLinking.java`. Open the file and copy the below code. Then run the code.  

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


```java
import com.azure.core.credential.AzureKeyCredential;
import com.azure.ai.textanalytics.models.*;
import com.azure.ai.textanalytics.TextAnalyticsClientBuilder;
import com.azure.ai.textanalytics.TextAnalyticsClient;

import java.util.List;
import java.util.Arrays;
import com.azure.core.util.Context;
import com.azure.core.util.polling.SyncPoller;

import com.azure.ai.textanalytics.util.*;


public class Example {

    // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
    private static String KEY = System.getenv("LANGUAGE_KEY");
    private static String ENDPOINT = System.getenv("LANGUAGE_ENDPOINT");

    public static void main(String[] args) {
        TextAnalyticsClient client = authenticateClient(languageKey, languageEndpoint);
        healthExample(client);
    }

    // Method to authenticate the client object with your key and endpoint
    static TextAnalyticsClient authenticateClient(String key, String endpoint) {
        return new TextAnalyticsClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();
    }

    // Example method for extracting information from healthcare-related text 
    static void healthExample(TextAnalyticsClient client){
        List<TextDocumentInput> documents = Arrays.asList(
                new TextDocumentInput("0",
                        "Prescribed 100mg ibuprofen, taken twice daily."));

        AnalyzeHealthcareEntitiesOptions options = new AnalyzeHealthcareEntitiesOptions().setIncludeStatistics(true);

        SyncPoller<AnalyzeHealthcareEntitiesOperationDetail, AnalyzeHealthcareEntitiesPagedIterable>
                syncPoller = client.beginAnalyzeHealthcareEntities(documents, options, Context.NONE);

        System.out.printf("Poller status: %s.%n", syncPoller.poll().getStatus());
        syncPoller.waitForCompletion();

        // Task operation statistics
        AnalyzeHealthcareEntitiesOperationDetail operationResult = syncPoller.poll().getValue();
        System.out.printf("Operation created time: %s, expiration time: %s.%n",
                operationResult.getCreatedAt(), operationResult.getExpiresAt());
        System.out.printf("Poller status: %s.%n", syncPoller.poll().getStatus());

        for (AnalyzeHealthcareEntitiesResultCollection resultCollection : syncPoller.getFinalResult()) {
            // Model version
            System.out.printf(
                    "Results of Azure Text Analytics for health entities\" Model, version: %s%n",
                    resultCollection.getModelVersion());

            for (AnalyzeHealthcareEntitiesResult healthcareEntitiesResult : resultCollection) {
                System.out.println("Document ID = " + healthcareEntitiesResult.getId());
                System.out.println("Document entities: ");
                // Recognized healthcare entities
                for (HealthcareEntity entity : healthcareEntitiesResult.getEntities()) {
                    System.out.printf(
                            "\tText: %s, normalized name: %s, category: %s, subcategory: %s, confidence score: %f.%n",
                            entity.getText(), entity.getNormalizedText(), entity.getCategory(),
                            entity.getSubcategory(), entity.getConfidenceScore());
                }
                // Recognized healthcare entity relation groups
                for (HealthcareEntityRelation entityRelation : healthcareEntitiesResult.getEntityRelations()) {
                    System.out.printf("Relation type: %s.%n", entityRelation.getRelationType());
                    for (HealthcareEntityRelationRole role : entityRelation.getRoles()) {
                        HealthcareEntity entity = role.getEntity();
                        System.out.printf("\tEntity text: %s, category: %s, role: %s.%n",
                                entity.getText(), entity.getCategory(), role.getName());
                    }
                }
            }
        }
    }
}

```



### Output

```console
Poller status: IN_PROGRESS.
Operation created time: 2022-09-15T19:06:11Z, expiration time: 2022-09-16T19:06:11Z.
Poller status: SUCCESSFULLY_COMPLETED.
Results of Azure Text Analytics for health entities" Model, version: 2022-03-01
Document ID = 0
Document entities: 
    Text: 100mg, normalized name: null, category: Dosage, subcategory: null, confidence score: 0.980000.
    Text: ibuprofen, normalized name: ibuprofen, category: MedicationName, subcategory: null, confidence score: 1.000000.
    Text: twice daily, normalized name: null, category: Frequency, subcategory: null, confidence score: 1.000000.
Relation type: DosageOfMedication.
    Entity text: 100mg, category: Dosage, role: Dosage.
    Entity text: ibuprofen, category: MedicationName, role: Medication.
Relation type: FrequencyOfMedication.
    Entity text: ibuprofen, category: MedicationName, role: Medication.
    Entity text: twice daily, category: Frequency, role: Frequency.
```

> **Tip:**
> Fast Healthcare Interoperability Resources (FHIR) structuring is available using Azure Language REST API. The client libraries are not currently supported. [Learn more](how-to/call-api.md) on how to use FHIR structuring in your API call.




**Applies to: programming-language-javascript**


[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme) | [More samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-language-text) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text) 

Use this quickstart to create a Text Analytics for health application with the client library for Node.js. In the following example, you create a JavaScript application that can identify medical [entities](concepts/health-entity-categories.md), [relations](concepts/relation-extraction.md), and [assertions](concepts/assertion-detection.md) that appear in text.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Node.js](https://nodejs.org/) v14 LTS or later
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service (providing 5,000 text records - 1,000 characters each) and upgrade later to the `Standard S` pricing tier for production. You can also start with the `Standard S` pricing tier, receiving the same initial quota for free (5,000 text records) before getting charged. For more information on pricing, visit [Language Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/).



## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/text-analytics-for-health/quickstart.md)

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
npm install @azure/ai-language-text
```



## Code example

Open the file and copy the below code. Then run the code.  

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


```javascript
"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
// This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;

const documents = ["Patient does not suffer from high blood pressure."];
  
  async function main() {
    console.log("== Text analytics for health sample ==");
  
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
    const actions = [
      {
        kind: "Healthcare",
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
      if (actionResult.kind !== "Healthcare") {
        throw new Error(`Expected a healthcare results but got: ${actionResult.kind}`);
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
        console.log("\tRecognized Entities:");
        for (const entity of result.entities) {
          console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
          if (entity.dataSources.length > 0) {
            console.log("\t and it can be referenced in the following data sources:");
            for (const ds of entity.dataSources) {
              console.log(`\t\t- ${ds.name} with Entity ID: ${ds.entityId}`);
            }
          }
        }
        if (result.entityRelations.length > 0) {
          console.log(`\tRecognized relations between entities:`);
          for (const relation of result.entityRelations) {
            console.log(
              `\t\t- Relation of type ${relation.relationType} found between the following entities:`
            );
            for (const role of relation.roles) {
              console.log(`\t\t\t- "${role.entity.text}" with the role ${role.name}`);
            }
          }
        }
      }
    }
  }
  
  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
```

### Output

```console
== Text analytics for health sample ==
The operation was created on Mon Feb 13 2023 13:12:10 GMT-0800 (Pacific Standard Time)
The operation results will expire on Tue Feb 14 2023 13:12:10 GMT-0800 (Pacific Standard Time)
Last time the operation was updated was on: Mon Feb 13 2023 13:12:10 GMT-0800 (Pacific Standard Time)
- Document 0
    Recognized Entities:
    - Entity "high blood pressure" of type SymptomOrSign
        and it can be referenced in the following data sources:
            - UMLS with Entity ID: C0020538
            - AOD with Entity ID: 0000023317
            - BI with Entity ID: BI00001
            - CCPSS with Entity ID: 1017493
            - CCS with Entity ID: 7.1
            - CHV with Entity ID: 0000015800
            - COSTAR with Entity ID: 397
            - CSP with Entity ID: 0571-5243
            - CST with Entity ID: HYPERTENS
            - DXP with Entity ID: U002034
            - HPO with Entity ID: HP:0000822
            - ICD10 with Entity ID: I10-I15.9
            - ICD10AM with Entity ID: I10-I15.9
            - ICD10CM with Entity ID: I10
            - ICD9CM with Entity ID: 997.91
            - ICPC2ICD10ENG with Entity ID: MTHU035456
            - ICPC2P with Entity ID: K85004
            - LCH with Entity ID: U002317
            - LCH_NW with Entity ID: sh85063723
            - LNC with Entity ID: LA14293-7
            - MDR with Entity ID: 10020772
            - MEDCIN with Entity ID: 33288
            - MEDLINEPLUS with Entity ID: 34
            - MSH with Entity ID: D006973
            - MTH with Entity ID: 005
            - MTHICD9 with Entity ID: 997.91
            - NANDA-I with Entity ID: 00905
            - NCI with Entity ID: C3117
            - NCI_CPTAC with Entity ID: C3117
            - NCI_CTCAE with Entity ID: E13785
            - NCI_CTRP with Entity ID: C3117
            - NCI_FDA with Entity ID: 1908
            - NCI_GDC with Entity ID: C3117
            - NCI_NCI-GLOSS with Entity ID: CDR0000458091
            - NCI_NICHD with Entity ID: C3117
            - NCI_caDSR with Entity ID: C3117
            - NOC with Entity ID: 060808
            - OMIM with Entity ID: MTHU002068
            - PCDS with Entity ID: PRB_11000.06
            - PDQ with Entity ID: CDR0000686951
            - PSY with Entity ID: 23830
            - RCD with Entity ID: XE0Ub
            - SNM with Entity ID: F-70700
            - SNMI with Entity ID: D3-02000
            - SNOMEDCT_US with Entity ID: 38341003
            - WHO with Entity ID: 0210
```

> **Tip:**
> Fast Healthcare Interoperability Resources (FHIR) structuring is available using Azure Language REST API. The client libraries are not currently supported. [Learn more](how-to/call-api.md) on how to use FHIR structuring in your API call.




**Applies to: programming-language-python**


[Reference documentation](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?preserve-view=true\&view=azure-python) | [More samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) | [Package (PyPi)](https://pypi.org/project/azure-ai-textanalytics/5.2.0/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics) 


Use this quickstart to create a Text Analytics for health application with the client library for Python. In the following example, you create a Python application that can identify medical [entities](concepts/health-entity-categories.md), [relations](concepts/relation-extraction.md), and [assertions](concepts/assertion-detection.md) that appear in text.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.8 or later](https://www.python.org/)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service (providing 5,000 text records - 1,000 characters each) and upgrade later to the `Standard S` pricing tier for production. You can also start with the `Standard S` pricing tier, receiving the same initial quota for free (5,000 text records) before getting charged. For more information on pricing, visit [Language Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/).



## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/text-analytics-for-health/quickstart.md)

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

> **Important:**
> Go to the Azure portal. If Azure Language resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint by navigating to your resource's **Keys and Endpoint** page, under **Resource Management**. 

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Foundry Tools [security](../../security-features.md) article for more information.


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

# Example function for extracting information from healthcare-related text 
def health_example(client):
    documents = [
        """
        Patient needs to take 50 mg of ibuprofen.
        """
    ]

    poller = client.begin_analyze_healthcare_entities(documents)
    result = poller.result()

    docs = [doc for doc in result if not doc.is_error]

    for idx, doc in enumerate(docs):
        for entity in doc.entities:
            print("Entity: {}".format(entity.text))
            print("...Normalized Text: {}".format(entity.normalized_text))
            print("...Category: {}".format(entity.category))
            print("...Subcategory: {}".format(entity.subcategory))
            print("...Offset: {}".format(entity.offset))
            print("...Confidence score: {}".format(entity.confidence_score))
        for relation in doc.entity_relations:
            print("Relation of type: {} has the following roles".format(relation.relation_type))
            for role in relation.roles:
                print("...Role '{}' with entity '{}'".format(role.name, role.entity.text))
        print("------------------------------------------")
health_example(client)
```



### Output

```console
Entity: 50 mg
...Normalized Text: None
...Category: Dosage
...Subcategory: None
...Offset: 31
...Confidence score: 1.0
Entity: ibuprofen
...Normalized Text: ibuprofen
...Category: MedicationName
...Subcategory: None
...Offset: 40
...Confidence score: 1.0
Relation of type: DosageOfMedication has the following roles
...Role 'Dosage' with entity '50 mg'
...Role 'Medication' with entity 'ibuprofen'
```

> **Tip:**
> Fast Healthcare Interoperability Resources (FHIR) structuring is available using Azure Language REST API. The client libraries are not currently supported. [Learn more](how-to/call-api.md) on how to use FHIR structuring in your API call.




**Applies to: rest-api**


[Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)

Use this quickstart to send language detection requests using the REST API. In the following example, you use cURL to identify medical [entities](concepts/health-entity-categories.md), [relations](concepts/relation-extraction.md), and [assertions](concepts/assertion-detection.md) that appear in text.


## Prerequisites

* The current version of [cURL](https://curl.haxx.se/)
* An Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, [create a Foundry resource](../../multi-service-resource.md?pivots=azportal).
    * You need the key and endpoint from the resource you create to connect your application to the API. You paste your key and endpoint into the code later in the quickstart.
    * You can use the free pricing tier (`Free F0`) to try the service (providing 5,000 text records - 1,000 characters each) and upgrade later to the `Standard S` pricing tier for production. You can also start with the `Standard S` pricing tier, receiving the same initial quota for free (5,000 text records) before getting charged. For more information on pricing, visit [Language Pricing](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/).

> **Note:**
> * The following BASH examples use the `\` line continuation character. If your console or terminal uses a different line continuation character, use that character.
> * You can find language specific samples on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code).
> * Go to the Azure portal and find the key and endpoint for Azure Language resource you created in the prerequisites. They are located on the resource's **key and endpoint** page, under **resource management**. Then replace the strings in the code below with your key and endpoint.
To call the API, you need the following information:

## Setting up

### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/text-analytics-for-health/quickstart.md)

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




| parameter | Description |
| --- | --- |
| `-X POST <endpoint>` | Specifies your endpoint for accessing the API. |
| `-H Content-Type: application/json` | The content type for sending JSON data. |
| `-H "Ocp-Apim-Subscription-Key:<key>` | Specifies the key for accessing the API. |
| `-d <documents>` | The JSON containing the documents you want to send. |

The following cURL commands are executed from a BASH shell. Edit these commands with your own resource name, resource key, and JSON values.




## Text Analytics for health

1. Copy the command into a text editor.
2. Make the following changes in the command where needed:
    1. Replace the value `<your-language-resource-key>` with your key.
    2. Replace the first part of the request URL `<your-language-resource-endpoint>` with your endpoint URL.
3. Open a command prompt window.
4. Paste the command from the text editor into the command prompt window, and then run the command.


```bash
curl -i -X POST $LANGUAGE_ENDPOINT/language/analyze-text/jobs?api-version=2022-05-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d '{"analysisInput":{"documents": [{"text": "The doctor prescried 200mg Ibuprofen.","language": "en","id": "1"}]},"tasks":[{"taskId": "analyze 1","kind": "Healthcare","parameters": {"fhirVersion": "4.0.1"}}]}'
```

Get the `operation-location` from the response header. The value will look similar to the following URL:

```rest
https://your-resource.cognitiveservices.azure.com/language/analyze-text/jobs/{JOB-ID}?api-version=2022-05-15-preview
```

To get the results of the request, use the following cURL command. Be sure to replace `{JOB-ID}` with the numerical ID value you received from the previous `operation-location` response header:

```bash
curl -X GET  $LANGUAGE_ENDPOINT/language/analyze-text/jobs/{JOB-ID}?api-version=2022-05-15-preview \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY"
```



### JSON response

```json
{
    "jobId": "{JOB-ID}",
    "lastUpdatedDateTime": "2022-06-27T22:04:39Z",
    "createdDateTime": "2022-06-27T22:04:38Z",
    "expirationDateTime": "2022-06-28T22:04:38Z",
    "status": "succeeded",
    "errors": [],
    "tasks": {
        "completed": 1,
        "failed": 0,
        "inProgress": 0,
        "total": 1,
        "items": [
            {
                "kind": "HealthcareLROResults",
                "lastUpdateDateTime": "2022-06-27T22:04:39.7086762Z",
                "status": "succeeded",
                "results": {
                    "documents": [
                        {
                            "id": "1",
                            "entities": [
                                {
                                    "offset": 4,
                                    "length": 6,
                                    "text": "doctor",
                                    "category": "HealthcareProfession",
                                    "confidenceScore": 0.76
                                },
                                {
                                    "offset": 21,
                                    "length": 5,
                                    "text": "200mg",
                                    "category": "Dosage",
                                    "confidenceScore": 0.99
                                },
                                {
                                    "offset": 27,
                                    "length": 9,
                                    "text": "Ibuprofen",
                                    "category": "MedicationName",
                                    "confidenceScore": 1.0,
                                    "name": "ibuprofen",
                                    "links": [
                                        {
                                            "dataSource": "UMLS",
                                            "id": "C0020740"
                                        },
                                        {
                                            "dataSource": "AOD",
                                            "id": "0000019879"
                                        },
                                        {
                                            "dataSource": "ATC",
                                            "id": "M01AE01"
                                        },
                                        {
                                            "dataSource": "CCPSS",
                                            "id": "0046165"
                                        },
                                        {
                                            "dataSource": "CHV",
                                            "id": "0000006519"
                                        },
                                        {
                                            "dataSource": "CSP",
                                            "id": "2270-2077"
                                        },
                                        {
                                            "dataSource": "DRUGBANK",
                                            "id": "DB01050"
                                        },
                                        {
                                            "dataSource": "GS",
                                            "id": "1611"
                                        },
                                        {
                                            "dataSource": "LCH_NW",
                                            "id": "sh97005926"
                                        },
                                        {
                                            "dataSource": "LNC",
                                            "id": "LP16165-0"
                                        },
                                        {
                                            "dataSource": "MEDCIN",
                                            "id": "40458"
                                        },
                                        {
                                            "dataSource": "MMSL",
                                            "id": "d00015"
                                        },
                                        {
                                            "dataSource": "MSH",
                                            "id": "D007052"
                                        },
                                        {
                                            "dataSource": "MTHSPL",
                                            "id": "WK2XYI10QM"
                                        },
                                        {
                                            "dataSource": "NCI",
                                            "id": "C561"
                                        },
                                        {
                                            "dataSource": "NCI_CTRP",
                                            "id": "C561"
                                        },
                                        {
                                            "dataSource": "NCI_DCP",
                                            "id": "00803"
                                        },
                                        {
                                            "dataSource": "NCI_DTP",
                                            "id": "NSC0256857"
                                        },
                                        {
                                            "dataSource": "NCI_FDA",
                                            "id": "WK2XYI10QM"
                                        },
                                        {
                                            "dataSource": "NCI_NCI-GLOSS",
                                            "id": "CDR0000613511"
                                        },
                                        {
                                            "dataSource": "NDDF",
                                            "id": "002377"
                                        },
                                        {
                                            "dataSource": "PDQ",
                                            "id": "CDR0000040475"
                                        },
                                        {
                                            "dataSource": "RCD",
                                            "id": "x02MO"
                                        },
                                        {
                                            "dataSource": "RXNORM",
                                            "id": "5640"
                                        },
                                        {
                                            "dataSource": "SNM",
                                            "id": "E-7772"
                                        },
                                        {
                                            "dataSource": "SNMI",
                                            "id": "C-603C0"
                                        },
                                        {
                                            "dataSource": "SNOMEDCT_US",
                                            "id": "387207008"
                                        },
                                        {
                                            "dataSource": "USP",
                                            "id": "m39860"
                                        },
                                        {
                                            "dataSource": "USPMG",
                                            "id": "MTHU000060"
                                        },
                                        {
                                            "dataSource": "VANDF",
                                            "id": "4017840"
                                        }
                                    ]
                                }
                            ],
                            "relations": [
                                {
                                    "relationType": "DosageOfMedication",
                                    "entities": [
                                        {
                                            "ref": "#/results/documents/0/entities/1",
                                            "role": "Dosage"
                                        },
                                        {
                                            "ref": "#/results/documents/0/entities/2",
                                            "role": "Medication"
                                        }
                                    ]
                                }
                            ],
                            "warnings": [],
                            "fhirBundle": {
                                "resourceType": "Bundle",
                                "id": "95d61191-402a-48c6-9657-a1e4efbda877",
                                "meta": {
                                    "profile": [
                                        "http://hl7.org/fhir/4.0.1/StructureDefinition/Bundle"
                                    ]
                                },
                                "identifier": {
                                    "system": "urn:ietf:rfc:3986",
                                    "value": "urn:uuid:95d61191-402a-48c6-9657-a1e4efbda877"
                                },
                                "type": "document",
                                "entry": [
                                    {
                                        "fullUrl": "Composition/34b666d3-45e7-474d-a398-d3b0329541ad",
                                        "resource": {
                                            "resourceType": "Composition",
                                            "id": "34b666d3-45e7-474d-a398-d3b0329541ad",
                                            "status": "final",
                                            "type": {
                                                "coding": [
                                                    {
                                                        "system": "http://loinc.org",
                                                        "code": "11526-1",
                                                        "display": "Pathology study"
                                                    }
                                                ],
                                                "text": "Pathology study"
                                            },
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            },
                                            "encounter": {
                                                "reference": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                                "type": "Encounter",
                                                "display": "unknown"
                                            },
                                            "date": "2022-06-27",
                                            "author": [
                                                {
                                                    "reference": "Practitioner/a8ef1526-d4ce-41df-96df-e9d03428c840",
                                                    "type": "Practitioner",
                                                    "display": "Unknown"
                                                }
                                            ],
                                            "title": "Pathology study",
                                            "section": [
                                                {
                                                    "title": "General",
                                                    "code": {
                                                        "coding": [
                                                            {
                                                                "system": "",
                                                                "display": "Unrecognized Section"
                                                            }
                                                        ],
                                                        "text": "General"
                                                    },
                                                    "text": {
                                                        "div": "<div>\r\n\t\t\t\t\t\t\t<h1>General</h1>\r\n\t\t\t\t\t\t\t<p>The doctor prescried 200mg Ibuprofen.</p>\r\n\t\t\t\t\t</div>"
                                                    },
                                                    "entry": [
                                                        {
                                                            "reference": "List/c8ca6757-1d7c-4c49-94e9-ef5263cb943c",
                                                            "type": "List",
                                                            "display": "General"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "fullUrl": "Practitioner/a8ef1526-d4ce-41df-96df-e9d03428c840",
                                        "resource": {
                                            "resourceType": "Practitioner",
                                            "id": "a8ef1526-d4ce-41df-96df-e9d03428c840",
                                            "extension": [
                                                {
                                                    "extension": [
                                                        {
                                                            "url": "offset",
                                                            "valueInteger": -1
                                                        },
                                                        {
                                                            "url": "length",
                                                            "valueInteger": 7
                                                        }
                                                    ],
                                                    "url": "http://hl7.org/fhir/StructureDefinition/derivation-reference"
                                                }
                                            ],
                                            "name": [
                                                {
                                                    "text": "Unknown",
                                                    "family": "Unknown"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "fullUrl": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                        "resource": {
                                            "resourceType": "Patient",
                                            "id": "68dd21ce-58ae-4e59-9445-8331f99899ed",
                                            "gender": "unknown"
                                        }
                                    },
                                    {
                                        "fullUrl": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                        "resource": {
                                            "resourceType": "Encounter",
                                            "id": "90c75fea-4526-4e94-82f8-8df3bc983a14",
                                            "meta": {
                                                "profile": [
                                                    "http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter"
                                                ]
                                            },
                                            "status": "finished",
                                            "class": {
                                                "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                                                "display": "unknown"
                                            },
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            }
                                        }
                                    },
                                    {
                                        "fullUrl": "MedicationStatement/17aeee32-1189-47fc-9223-8abe174f1292",
                                        "resource": {
                                            "resourceType": "MedicationStatement",
                                            "id": "17aeee32-1189-47fc-9223-8abe174f1292",
                                            "extension": [
                                                {
                                                    "extension": [
                                                        {
                                                            "url": "offset",
                                                            "valueInteger": 27
                                                        },
                                                        {
                                                            "url": "length",
                                                            "valueInteger": 9
                                                        }
                                                    ],
                                                    "url": "http://hl7.org/fhir/StructureDefinition/derivation-reference"
                                                }
                                            ],
                                            "status": "active",
                                            "medicationCodeableConcept": {
                                                "coding": [
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls",
                                                        "code": "C0020740",
                                                        "display": "ibuprofen"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/aod",
                                                        "code": "0000019879"
                                                    },
                                                    {
                                                        "system": "http://www.whocc.no/atc",
                                                        "code": "M01AE01"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/ccpss",
                                                        "code": "0046165"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/chv",
                                                        "code": "0000006519"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/csp",
                                                        "code": "2270-2077"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/drugbank",
                                                        "code": "DB01050"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/gs",
                                                        "code": "1611"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/lch_nw",
                                                        "code": "sh97005926"
                                                    },
                                                    {
                                                        "system": "http://loinc.org",
                                                        "code": "LP16165-0"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/medcin",
                                                        "code": "40458"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/mmsl",
                                                        "code": "d00015"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/msh",
                                                        "code": "D007052"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/mthspl",
                                                        "code": "WK2XYI10QM"
                                                    },
                                                    {
                                                        "system": "http://ncimeta.nci.nih.gov",
                                                        "code": "C561"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_ctrp",
                                                        "code": "C561"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_dcp",
                                                        "code": "00803"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_dtp",
                                                        "code": "NSC0256857"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_fda",
                                                        "code": "WK2XYI10QM"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                                                        "code": "CDR0000613511"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/nddf",
                                                        "code": "002377"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/pdq",
                                                        "code": "CDR0000040475"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/rcd",
                                                        "code": "x02MO"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                                                        "code": "5640"
                                                    },
                                                    {
                                                        "system": "http://snomed.info/sct",
                                                        "code": "E-7772"
                                                    },
                                                    {
                                                        "system": "http://snomed.info/sct/900000000000207008",
                                                        "code": "C-603C0"
                                                    },
                                                    {
                                                        "system": "http://snomed.info/sct/731000124108",
                                                        "code": "387207008"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/usp",
                                                        "code": "m39860"
                                                    },
                                                    {
                                                        "system": "http://www.nlm.nih.gov/research/umls/uspmg",
                                                        "code": "MTHU000060"
                                                    },
                                                    {
                                                        "system": "http://hl7.org/fhir/ndfrt",
                                                        "code": "4017840"
                                                    }
                                                ],
                                                "text": "Ibuprofen"
                                            },
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            },
                                            "context": {
                                                "reference": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                                "type": "Encounter",
                                                "display": "unknown"
                                            },
                                            "dosage": [
                                                {
                                                    "text": "200mg",
                                                    "doseAndRate": [
                                                        {
                                                            "doseQuantity": {
                                                                "value": 200
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "fullUrl": "List/c8ca6757-1d7c-4c49-94e9-ef5263cb943c",
                                        "resource": {
                                            "resourceType": "List",
                                            "id": "c8ca6757-1d7c-4c49-94e9-ef5263cb943c",
                                            "status": "current",
                                            "mode": "snapshot",
                                            "title": "General",
                                            "subject": {
                                                "reference": "Patient/68dd21ce-58ae-4e59-9445-8331f99899ed",
                                                "type": "Patient"
                                            },
                                            "encounter": {
                                                "reference": "Encounter/90c75fea-4526-4e94-82f8-8df3bc983a14",
                                                "type": "Encounter",
                                                "display": "unknown"
                                            },
                                            "entry": [
                                                {
                                                    "item": {
                                                        "reference": "MedicationStatement/17aeee32-1189-47fc-9223-8abe174f1292",
                                                        "type": "MedicationStatement",
                                                        "display": "Ibuprofen"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "errors": [],
                    "modelVersion": "2022-03-01"
                }
            }
        ]
    }
}
```



> **Tip:**
> Fast Healthcare Interoperability Resources (FHIR) structuring is available using Azure Language REST API. The client libraries are not currently supported. [Learn more](how-to/call-api.md) on how to use FHIR structuring in your API call.
 



**Applies to: ai-foundry-portal**


﻿---
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: include
ms.date: 06/02/2026
ms.author: lajanuar
ms.custom: doc-kit-assisted
---
<!-- markdownlint-disable MD041 -->
## Prerequisites

> **Tip:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource—whether used on its own or through Language Studio—you can continue to use those existing Language resources within the Microsoft Foundry portal.
> * For more information, see[Connect services in the Microsoft Foundry portal](../../connect-services-foundry-portal.md)).
> * Consider using a Foundry resource for the best experience. You can also follow these instructions with a Language resource.

* **Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **Requisite permissions**. Make sure the person establishing the account and project is assigned as the **Foundry Account Owner** role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, see[Role based access control (RBAC)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/openai/how-to/role-based-access-control.md#cognitive-services-contributor)).
* **Foundry resource**. Create a[Foundry resource](../../multi-service-resource.md)). Alternatively, you can use a [Language resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics).
* **A Foundry project**. For more information, see[Create a Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md)).

## Role-based access control (RBAC) requirements

Assign the correct roles to your user principal and project managed identity to access the Text Analytics for Health playground. Microsoft recommends using Microsoft Entra ID authentication, which enforces role-based restrictions. Key-based authentication grants full access without role checks and should be avoided in production environments.

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged.

* Assign the minimum required roles to both your user principal and project managed identity so they can access Foundry features.

* Verify current assignments using [Check access for a user to a single Azure resource](https://learn.microsoft.com/azure/role-based-access-control/check-access).

### [New Foundry](#tab/new-foundry)

> **Note:**
> This content refers to the [new Foundry](https://ai.azure.com/) portal, which supports only[Foundry projects](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md)) and provides streamlined access to models, agents, and tools. To confirm that you're using new Foundry, make sure the version toggle in the portal banner is in the **on** position. 

You can use [new Foundry playground](https://ai.azure.com/) to:

> 
>
> * Extract health entities from clinical text
> * Review detected entities, categories, and confidence scores
> * Return structured output in FHIR format

## Navigate to the new Foundry playground

The active project appears in the upper-left corner. To create a new project:

1. Open the project drop-down menu.
1. Enter a project name or select an existing one.
1. Select **Create project**.

   Screenshot of the new Foundry homepage.

There are two ways to access the Text Analytics for Health interface:

1. Select the **Discover** tab from the upper right navigation bar to go to the **Models** page.
   * In the search bar under models, enter **Azure** and press enter.
   * Select **Text Analytics for Health** from the search results.
   * Select the **Open in Playground** button.

1. Select the **Build** tab from the upper right navigation bar.
   * From the left navigation bar, select **Models**.
   * Select the **AI services** tab.
   * Select **Text Analytics for Health** to go to the playground.

## Extract health information

The **Text Analytics for Health** model identifies and extracts health-related entities and relationships from clinical and biomedical text. The playground provides configuration options to customize your preferences and detailed output to review detected entities and their confidence scores.

1. On the **Playground** tab, select **Azure Language—Text Analytics for Health** from the drop-down menu.

1. Select the sample text, use the paperclip icon to upload your text, or enter your own clinical text.

1. In the **Configure** side panel, you can set the following options:

    | Option | Description |
    | --- | --- |
    | **API version** | Select the API version that you prefer to use. |
    | **Model version** | Select the model version that you prefer to use. |
    | **Language** | Select the language in which your source text is written. |
    | **Return output in FHIR structure** | Returns the output in the Fast Healthcare Interoperability Resources (FHIR) structure. |

1. After you make your selections, choose the **Detect** button. Detected entities are highlighted in the text and you can review the accompanying details in formatted text or as a JSON response.

    | Field | Description |
    | --- | --- |
    | **Entity** | The detected entity. |
    | **Category** | The type of entity that was detected. |
    | **Confidence** | The model's level of certainty regarding whether it correctly identified an entity type. |

Verify that the detected entities match the health information in your input text. You can use the **Edit** button to modify the **Configure** parameters and rerun detection as needed.

### [Foundry (classic)](#tab/foundry-classic)

> **Note:**
> This content refers to the [Foundry (classic)](https://ai.azure.com/) portal, which supports hub-based projects and other resource types. To confirm that you're using Foundry (classic), make sure the version toggle in the portal banner is in the **off** position. 

You can use [Foundry (classic)](https://ai.azure.com/) to:

> 
>
> * Extract health entities from clinical text
> * Review detected entities, categories, and confidence scores
> * Return structured output in FHIR format

## Navigate to the Foundry (classic) playground

1. In the left pane, select **Playgrounds**.
1. Select the **Try Azure Language Playground** button.

Screenshot showing the Playgrounds navigation and the Try Azure Language Playground button in Foundry (classic).

## Extract health information in the Foundry (classic) playground

The **Language Playground** consists of four sections:

| Section | Purpose |
| --- | --- |
| **Top banner** | Select the input language and choose a Language capability. |
| **Left pane** | Set **Configuration** options such as API version, model version, and output format. |
| **Center pane** | Enter text for processing and review highlighted results. |
| **Right pane** | View **Details** for each detected entity. |

Select **Extract health information** from the top banner tiles to get started.

In **Configuration** you can select from the following options:

| Option | Description |
| --- | --- |
| Select API version | Select which version of the API to use. |
| Select model version | Select which version of the model to use. |
| Select text language | Select the language of your input text. |
| Return output in FHIR structure | Returns the output in the Fast Healthcare Interoperability Resources (FHIR) structure. |

After the operation completes, the type of entity is displayed beneath each entity in the center pane.

The **Details** section contains the following fields for each entity:

| Field | Description |
| --- | --- |
| Entity | The detected entity. |
| Category | The type of entity that was detected. |
| Confidence | The model's level of certainty that the entity type is correct. |

A screenshot of an example of extract health information in Foundry portal.

Verify that each health entity appears highlighted with the correct category label. If no entities appear, check that the input text contains recognizable health terminology and that the correct API version is selected.

## Open in Visual Studio Code

After validating your scenario in the playground, select **Open in VS Code** to carry your current configuration directly into a development environment—no manual setup required.

1. Configure your scenario in the playground:
   - Select your API version and model version.
   - Enter and test your sample input.
   - Adjust options such as entity types and FHIR output format.
1. Select **Open in VS Code**.
1. Visual Studio Code opens with a preconfigured code sample that reflects your playground configuration, including your API version, model, and health detection settings.

> **Tip:**
> Use the playground to compare outputs across API versions—for example, preview versus GA—before exporting your configuration to code.

---



## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

* [How to call the hosted API](how-to/call-api.md)
* [How to use the service with Docker containers](how-to/use-containers.md)
