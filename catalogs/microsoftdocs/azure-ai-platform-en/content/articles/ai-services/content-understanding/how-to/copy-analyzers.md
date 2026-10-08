---
title: Copy custom analyzers
titleSuffix: Foundry Tools
description: Copy custom analyzers within a resource and across Azure resources.
author: PatrickFarley 
ms.author: pafarley
manager: mcleans
ms.date: 01/29/2026
ai-usage: ai-assisted
ms.service: azure-content-understanding-foundry-tools
ms.topic: how-to
ms.custom:
  - ignite-2024-understanding-release
  - references_regions
  - build-2025
zone_pivot_groups: programming-languages-content-understanding
---

# Copy custom analyzers

Every Content Understanding resource provides access to all prebuilt analyzers by default. For a complete list, see [prebuilt analyzers](../concepts/prebuilt-analyzers.md). Custom analyzers are analyzers you define to process specific content where you can define the content type, schema, and any other processing logic. For more information on defining a custom analyzer, see [defining a custom analyzer](customize-analyzer-content-understanding-studio.md).

The copy operation on analyzers supports a few different scenarios:
* **Copy within a resource** to create a copy of an existing analyzer in the same resource as a backup or a version you can iterate on.
* **Copy across resources** to copy an analyzer from one Foundry resource to another. This supports failover scenarios and sharing analyzers across teams.

> **Important:**
>
> The copy operation for copying across resources supports copying analyzers across subscriptions and even Azure tenants.

**Applies to: programming-language-rest**



<!-- markdownlint-disable MD025 -->

This guide shows you how to use the [Content Understanding REST API](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers?view=rest-contentunderstanding-2025-11-01\&preserve-view=true) to copy custom analyzers within a resource and across Foundry resources.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* [cURL](https://everything.curl.dev/install/index.html) installed for your dev environment.
* An existing custom analyzer in your resource. See [Create a custom analyzer](../tutorial/create-custom-analyzer.md) if you need to create one.

## Copy within a Foundry resource

The copy operation within a Foundry resource is a single-step operation. Specify the target analyzer ID in the request URL and provide the source analyzer ID in the request body.

```http
POST https://{resource}.services.ai.azure.com/contentunderstanding/analyzers/{targetAnalyzer}:copy?api-version=2025-11-01
Content-Type: application/json
Ocp-Apim-Subscription-Key: {Auth key}

{
  "sourceAnalyzerId": "{sourceAnalyzerId}"

}
```

## Copy across Foundry resources

Copying an analyzer across Foundry resources is a multi-step process because a service principal might not have permissions on both resources:

1. Call the [Grant Copy Authorization](https://learn.microsoft.com/rest/api/contentunderstanding/content-analyzers/grant-copy-authorization?view=rest-contentunderstanding-2025-11-01) API on the source analyzer, providing the fully qualified resource ID of the copy target and the target region. The response contains a copy authorization token with an expiration time (`expiresAt`).
2. Call the copy API on the target resource, providing the fully qualified source resource ID, the source analyzer ID, and the source region.

> **Important:**
> Both the source and target resources require the **Cognitive Services User** role to be granted to the credential used to run the code. This role is required for cross-resource copying operations.

```http
POST https://{source resource}.services.ai.azure.com/contentunderstanding/analyzers/{source analyzer id}:grantCopyAuthorization?api-version=2025-11-01
Content-Type: application/json
Ocp-Apim-Subscription-Key: {Auth key}

{ 
  "targetAzureResourceId":"/subscriptions/{subscription guid}/resourceGroups/{resource group}/providers/Microsoft.CognitiveServices/accounts/{target resource}",
  "targetRegion":"{region}"
}


POST https://{target resource}.services.ai.azure.com/contentunderstanding/analyzers/{target analyzer id}:copy?api-version=2025-11-01
Content-Type: application/json
Ocp-Apim-Subscription-Key: {Auth key}

{
    "sourceAzureResourceId":"/subscriptions/{subscription guid}/resourceGroups/{resource group}/providers/Microsoft.CognitiveServices/accounts/{source resource}",
    "sourceAnalyzerId":"{source analyzer id}",
    "sourceRegion":"{region}"
}
```

 > **Note:**
>
> Analyzers now support classification/segmentation and analysis of each of the identified classes and segments in a single request. When copying an analyzer that uses this feature, you need to copy any referenced analyzers as well.

## Verify the copy

You can validate that the analyzer was copied by calling the GET analyzer on the resource if this copy was within the resource, or on the target resource if this copy was across resources.

```http
GET https://{target resource}.services.ai.azure.com/contentunderstanding/analyzers/{target analyzer id}?api-version=2025-11-01
Ocp-Apim-Subscription-Key: {Auth key}

```




**Applies to: programming-language-python**



<!-- markdownlint-disable MD025 -->


This guide shows you how to use the Content Understanding Python SDK to copy custom analyzers within a resource and across Foundry resources.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key.
* [Python 3.9 or later](https://www.python.org/).
* An existing custom analyzer in your resource. See [Create a custom analyzer](../tutorial/create-custom-analyzer.md) if you need to create one.

## Set up

1. Install the Content Understanding client library for Python with pip:

    ```console
    pip install azure-ai-contentunderstanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    pip install azure-identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```python
import os
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.core.credentials import AzureKeyCredential
from azure.identity import DefaultAzureCredential

endpoint = os.environ["CONTENTUNDERSTANDING_ENDPOINT"]
key = os.getenv("CONTENTUNDERSTANDING_KEY")
credential = AzureKeyCredential(key) if key else DefaultAzureCredential()

client = ContentUnderstandingClient(
    endpoint=endpoint, credential=credential
)
```

## Copy within a Foundry resource

To copy an analyzer within the same resource, call the `begin_copy_analyzer` method with the target and source analyzer IDs.

```python
source_analyzer_id = "my-source-analyzer"
target_analyzer_id = "my-target-analyzer"

poller = client.begin_copy_analyzer(
    analyzer_id=target_analyzer_id,
    source_analyzer_id=source_analyzer_id,
)
poller.result()

print("Analyzer copied successfully!")
```

> **Tip:**
> This code is based on the [copy analyzer sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_copy_analyzer.py) in the SDK repository.

## Copy across Foundry resources

Copying an analyzer across Foundry resources is a multi-step process:

1. Grant copy authorization on the source resource.
1. Use the authorization to call the copy API on the target resource.

> **Important:**
> Both the source and target resources require the **Cognitive Services User** role to be granted to the credential used to run the code. This role is required for cross-resource copying operations.

For cross-resource copying, set the following additional environment variables:
- `CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID` - Full Azure Resource Manager resource ID of the source resource.
- `CONTENTUNDERSTANDING_SOURCE_REGION` - Azure region of the source resource.
- `CONTENTUNDERSTANDING_TARGET_ENDPOINT` - Target resource endpoint.
- `CONTENTUNDERSTANDING_TARGET_RESOURCE_ID` - Full Azure Resource Manager resource ID of the target resource.
- `CONTENTUNDERSTANDING_TARGET_REGION` - Azure region of the target resource.
- `CONTENTUNDERSTANDING_TARGET_KEY` - Target API key (optional if using DefaultAzureCredential).

Example resource ID format:
`/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{name}`

```python
source_endpoint = os.environ["CONTENTUNDERSTANDING_ENDPOINT"]
source_key = os.getenv("CONTENTUNDERSTANDING_KEY")
source_credential = (
    AzureKeyCredential(source_key) if source_key else DefaultAzureCredential()
)

source_resource_id = os.environ["CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID"]
source_region = os.environ["CONTENTUNDERSTANDING_SOURCE_REGION"]

target_endpoint = os.environ["CONTENTUNDERSTANDING_TARGET_ENDPOINT"]
target_key = os.getenv("CONTENTUNDERSTANDING_TARGET_KEY")
target_credential = (
    AzureKeyCredential(target_key) if target_key else DefaultAzureCredential()
)

target_resource_id = os.environ["CONTENTUNDERSTANDING_TARGET_RESOURCE_ID"]
target_region = os.environ["CONTENTUNDERSTANDING_TARGET_REGION"]

source_analyzer_id = "my-source-analyzer"
target_analyzer_id = "my-target-analyzer"

# Create source and target clients
source_client = ContentUnderstandingClient(
    endpoint=source_endpoint, credential=source_credential
)
target_client = ContentUnderstandingClient(
    endpoint=target_endpoint, credential=target_credential
)

# Step 1: Grant copy authorization on the source resource
copy_auth = source_client.grant_copy_authorization(
    analyzer_id=source_analyzer_id,
    target_azure_resource_id=target_resource_id,
    target_region=target_region,
)

print("Authorization granted successfully!")
print(f"  Target Azure Resource ID: {copy_auth.target_azure_resource_id}")
print(f"  Expires at: {copy_auth.expires_at}")

# Step 2: Copy analyzer to target resource
copy_poller = target_client.begin_copy_analyzer(
    analyzer_id=target_analyzer_id,
    source_analyzer_id=source_analyzer_id,
    source_azure_resource_id=source_resource_id,
    source_region=source_region,
)
copy_poller.result()

print("Analyzer copied successfully to target resource!")
```

> **Tip:**
> This code is based on the [grant copy auth sample](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples/sample_grant_copy_auth.py) in the SDK repository.

> **Note:**
>
> Analyzers now support classification/segmentation and analysis of each of the identified classes and segments in a single request. When copying an analyzer that uses this feature, you need to copy any referenced analyzers as well.

## Verify the copy

Validate that the analyzer was copied by retrieving it from the target resource.

```python
copied_analyzer = target_client.get_analyzer(
    analyzer_id=target_analyzer_id
)
print(f"  Target Analyzer ID: {copied_analyzer.analyzer_id}")
print(f"  Description: {copied_analyzer.description}")
print(f"  Status: {copied_analyzer.status}")
```




**Applies to: programming-language-csharp**



<!-- markdownlint-disable MD025 -->

This guide shows you how to use the Content Understanding .NET SDK to copy custom analyzers within a resource and across Foundry resources.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key.
* The current version of [.NET](https://dotnet.microsoft.com/download/dotnet).
* An existing custom analyzer in your resource. See [Create a custom analyzer](../tutorial/create-custom-analyzer.md) if you need to create one.

## Set up

1. Create a new .NET console application:

    ```console
    dotnet new console -n CopyAnalyzerExample
    cd CopyAnalyzerExample
    ```

1. Install the Content Understanding client library for .NET:

    ```console
    dotnet add package Azure.AI.ContentUnderstanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    dotnet add package Azure.Identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```csharp
using Azure;
using Azure.AI.ContentUnderstanding;
using Azure.Identity;

string endpoint = Environment.GetEnvironmentVariable(
    "CONTENTUNDERSTANDING_ENDPOINT");
string apiKey = Environment.GetEnvironmentVariable(
    "CONTENTUNDERSTANDING_KEY");

var client = !string.IsNullOrEmpty(apiKey)
    ? new ContentUnderstandingClient(
        new Uri(endpoint),
        new AzureKeyCredential(apiKey))
    : new ContentUnderstandingClient(
        new Uri(endpoint),
        new DefaultAzureCredential());
```

## Copy within a Foundry resource

To copy an analyzer within the same resource, call the `CopyAnalyzerAsync` method with the target and source analyzer IDs.

```csharp
string sourceAnalyzerId = "my-source-analyzer";
string targetAnalyzerId = "my-target-analyzer";

await client.CopyAnalyzerAsync(
    WaitUntil.Completed,
    targetAnalyzerId,
    sourceAnalyzerId);
```

> **Tip:**
> This code is based on the [copy analyzer sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample14_CopyAnalyzer.md) in the SDK repository.

## Copy across Foundry resources

Copying an analyzer across Foundry resources is a multi-step process:

1. Grant copy authorization on the source resource.
1. Use the authorization to call the copy API on the target resource.

> **Important:**
> Both the source and target resources require the **Cognitive Services User** role to be granted to the credential used to run the code. This role is required for cross-resource copying operations.

```csharp
// Get source endpoint from configuration
string sourceEndpoint =
    "https://source-resource.services.ai.azure.com/";

// Create source client using DefaultAzureCredential
ContentUnderstandingClient sourceClient =
    new ContentUnderstandingClient(
        new Uri(sourceEndpoint),
        new DefaultAzureCredential());

// Source analyzer ID (must already exist in the source resource)
string sourceAnalyzerId =
    "my_source_analyzer";
// Target analyzer ID (will be created during copy)
string targetAnalyzerId =
    "my_target_analyzer";

// Get source and target resource information
string sourceResourceId =
    "/subscriptions/{subscriptionId}"
    + "/resourceGroups/{resourceGroupName}"
    + "/providers/Microsoft.CognitiveServices"
    + "/accounts/{name}";
string sourceRegion = "eastus";
string targetEndpoint =
    "https://target-resource.services.ai.azure.com/";
string targetResourceId =
    "/subscriptions/{subscriptionId}"
    + "/resourceGroups/{resourceGroupName}"
    + "/providers/Microsoft.CognitiveServices"
    + "/accounts/{name}";
string targetRegion = "westus";

// Create target client using DefaultAzureCredential
ContentUnderstandingClient targetClient =
    new ContentUnderstandingClient(
        new Uri(targetEndpoint),
        new DefaultAzureCredential());

// Step 1: Grant copy authorization
var copyAuth = await
    sourceClient.GrantCopyAuthorizationAsync(
        sourceAnalyzerId,
        targetResourceId,
        targetRegion);

Console.WriteLine("Copy authorization granted successfully!");
Console.WriteLine(
    $"  Target Azure Resource ID: "
    + $"{copyAuth.Value.TargetAzureResourceId}");
Console.WriteLine(
    $"  Expires at: {copyAuth.Value.ExpiresAt}");

// Step 2: Copy analyzer to target resource
var copyOperation = await
    targetClient.CopyAnalyzerAsync(
        WaitUntil.Completed,
        targetAnalyzerId,
        sourceAnalyzerId,
        sourceResourceId,
        sourceRegion);

var targetResult = copyOperation.Value;
Console.WriteLine(
    $"Target analyzer '{targetAnalyzerId}' "
    + "copied successfully to target resource!");
Console.WriteLine(
    $"Target analyzer description: "
    + $"{targetResult.Description}");
```

> **Tip:**
> This code is based on the [grant copy auth sample](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples/Sample15_GrantCopyAuth.md) in the SDK repository.

> **Note:**
>
> Analyzers now support classification/segmentation and analysis of each of the identified classes and segments in a single request. When copying an analyzer that uses this feature, you need to copy any referenced analyzers as well.

## Verify the copy

Validate that the analyzer was copied by retrieving it from the target resource.

```csharp
var analyzerDetails = await
    targetClient.GetAnalyzerAsync(targetAnalyzerId);
var result = analyzerDetails.Value;

Console.WriteLine(
    $"Analyzer '{targetAnalyzerId}' found.");
if (result.Description != null)
{
    Console.WriteLine(
        $"  Description: {result.Description}");
}
```




**Applies to: programming-language-java**



<!-- markdownlint-disable MD025 -->

This guide shows you how to use the Content Understanding Java SDK to copy custom analyzers within a resource and across Foundry resources.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key.
* [Java Development Kit (JDK)](https://learn.microsoft.com/java/openjdk/download) version 8 or later.
* [Apache Maven](https://maven.apache.org/download.cgi).
* An existing custom analyzer in your resource. See [Create a custom analyzer](../tutorial/create-custom-analyzer.md) if you need to create one.

## Set up

1. Add the Content Understanding dependency to your **pom.xml** file in the `<dependencies>` section:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-contentunderstanding</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

1. Optionally, add the Azure Identity library for Microsoft Entra authentication:

    ```xml
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
        <version>1.14.2</version>
    </dependency>
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```java
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;
import com.azure.ai.contentunderstanding.ContentUnderstandingClient;
import com.azure.ai.contentunderstanding.ContentUnderstandingClientBuilder;
import com.azure.ai.contentunderstanding.models.ContentAnalyzer;
import com.azure.ai.contentunderstanding.models.ContentAnalyzerOperationStatus;
import com.azure.ai.contentunderstanding.models.CopyAuthorization;
import com.azure.identity.DefaultAzureCredentialBuilder;

String endpoint = System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
String key = System.getenv("CONTENTUNDERSTANDING_KEY");

ContentUnderstandingClientBuilder builder =
    new ContentUnderstandingClientBuilder()
        .endpoint(endpoint);

ContentUnderstandingClient client;
if (key != null && !key.trim().isEmpty()) {
    client = builder.credential(
        new AzureKeyCredential(key)).buildClient();
} else {
    client = builder.credential(
        new DefaultAzureCredentialBuilder()
            .build()).buildClient();
}
```

## Copy within a Foundry resource

To copy an analyzer within the same resource, call the `beginCopyAnalyzer` method with the target and source analyzer IDs.

```java
String sourceAnalyzerId = "my-source-analyzer";
String targetAnalyzerId = "my-target-analyzer";

SyncPoller<ContentAnalyzerOperationStatus, ContentAnalyzer>
    copyPoller = client.beginCopyAnalyzer(
        targetAnalyzerId, sourceAnalyzerId);
ContentAnalyzer copiedAnalyzer =
    copyPoller.getFinalResult();

System.out.println(
    "Analyzer copied to '"
    + targetAnalyzerId + "' successfully!");
```

> **Tip:**
> This code is based on the [copy analyzer sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample14_CopyAnalyzer.java) in the SDK repository.

## Copy across Foundry resources

Copying an analyzer across Foundry resources is a multi-step process:

1. Grant copy authorization on the source resource.
1. Use the authorization to call the copy API on the target resource.

> **Important:**
> Both the source and target resources require the **Cognitive Services User** role to be granted to the credential used to run the code. This role is required for cross-resource copying operations.

Example resource ID format:
`/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{name}`

```java
String sourceEndpoint =
    System.getenv("CONTENTUNDERSTANDING_ENDPOINT");
String sourceKey =
    System.getenv("CONTENTUNDERSTANDING_KEY");
String sourceResourceId =
    System.getenv(
        "CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID");
String sourceRegion =
    System.getenv(
        "CONTENTUNDERSTANDING_SOURCE_REGION");
String targetEndpoint =
    System.getenv(
        "CONTENTUNDERSTANDING_TARGET_ENDPOINT");
String targetKey =
    System.getenv("CONTENTUNDERSTANDING_TARGET_KEY");
String targetResourceId =
    System.getenv(
        "CONTENTUNDERSTANDING_TARGET_RESOURCE_ID");
String targetRegion =
    System.getenv(
        "CONTENTUNDERSTANDING_TARGET_REGION");

String sourceAnalyzerId = "my-source-analyzer";
String targetAnalyzerId = "my-target-analyzer";

// Build source client
ContentUnderstandingClientBuilder sourceBuilder =
    new ContentUnderstandingClientBuilder()
        .endpoint(sourceEndpoint);
ContentUnderstandingClient sourceClient;
if (sourceKey != null
    && !sourceKey.trim().isEmpty()) {
    sourceClient = sourceBuilder.credential(
        new AzureKeyCredential(sourceKey))
        .buildClient();
} else {
    sourceClient = sourceBuilder.credential(
        new DefaultAzureCredentialBuilder()
            .build()).buildClient();
}

// Build target client
ContentUnderstandingClientBuilder targetBuilder =
    new ContentUnderstandingClientBuilder()
        .endpoint(targetEndpoint);
ContentUnderstandingClient targetClient;
if (targetKey != null
    && !targetKey.trim().isEmpty()) {
    targetClient = targetBuilder.credential(
        new AzureKeyCredential(targetKey))
        .buildClient();
} else {
    targetClient = targetBuilder.credential(
        new DefaultAzureCredentialBuilder()
            .build()).buildClient();
}

// Step 1: Grant copy authorization on source client
CopyAuthorization copyAuth =
    sourceClient.grantCopyAuthorization(
        sourceAnalyzerId,
        targetResourceId,
        targetRegion);

System.out.println(
    "Copy authorization granted successfully!");
System.out.println(
    "  Target Azure Resource ID: "
    + copyAuth.getTargetAzureResourceId());
System.out.println(
    "  Expires at: " + copyAuth.getExpiresAt());

// Step 2: Copy analyzer to target resource
SyncPoller<ContentAnalyzerOperationStatus,
    ContentAnalyzer> copyPoller =
    targetClient.beginCopyAnalyzer(
        targetAnalyzerId,
        sourceAnalyzerId,
        false,
        sourceResourceId,
        sourceRegion);

ContentAnalyzer targetResult =
    copyPoller.getFinalResult();
System.out.println(
    "Target analyzer '"
    + targetAnalyzerId + "' copied successfully!");
System.out.println(
    "  Description: "
    + targetResult.getDescription());
```

> **Tip:**
> This code is based on the [grant copy auth sample](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding/samples/Sample15_GrantCopyAuth.java) in the SDK repository.

> **Note:**
>
> Analyzers now support classification/segmentation and analysis of each of the identified classes and segments in a single request. When copying an analyzer that uses this feature, you need to copy any referenced analyzers as well.

## Verify the copy

Validate that the analyzer was copied by retrieving it from the target resource.

```java
ContentAnalyzer analyzer =
    targetClient.getAnalyzer(targetAnalyzerId);

System.out.println(
    "Analyzer '" + targetAnalyzerId + "' found.");
if (analyzer.getDescription() != null) {
    System.out.println(
        "  Description: "
        + analyzer.getDescription());
}
```




**Applies to: programming-language-javascript**



<!-- markdownlint-disable MD025 -->

This guide shows you how to use the Content Understanding JavaScript SDK to copy custom analyzers within a resource and across Foundry resources.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key.
* [Node.js](https://nodejs.org/) LTS version.
* An existing custom analyzer in your resource. See [Create a custom analyzer](../tutorial/create-custom-analyzer.md) if you need to create one.

## Set up

1. Create a new Node.js project:

    ```console
    mkdir copy-analyzer-example
    cd copy-analyzer-example
    npm init -y
    ```

1. Install the Content Understanding client library:

    ```console
    npm install @azure/ai-content-understanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    npm install @azure/identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```javascript
const { AzureKeyCredential } =
    require("@azure/core-auth");
const { DefaultAzureCredential } =
    require("@azure/identity");
const {
    ContentUnderstandingClient,
} = require("@azure/ai-content-understanding");

const endpoint =
    process.env["CONTENTUNDERSTANDING_ENDPOINT"];
const key =
    process.env["CONTENTUNDERSTANDING_KEY"];

const credential = key
    ? new AzureKeyCredential(key)
    : new DefaultAzureCredential();

const client = new ContentUnderstandingClient(
    endpoint,
    credential
);
```

## Copy within a Foundry resource

To copy an analyzer within the same resource, call the `copyAnalyzer` method with the target and source analyzer IDs.

```javascript
const sourceAnalyzerId = "my-source-analyzer";
const targetAnalyzerId = "my-target-analyzer";

const copyPoller = client.copyAnalyzer(
    targetAnalyzerId, sourceAnalyzerId
);
await copyPoller.pollUntilDone();

console.log("Analyzer copied successfully!");
```

> **Tip:**
> This code is based on the [copy analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/copyAnalyzer.js) in the SDK repository.

## Copy across Foundry resources

Copying an analyzer across Foundry resources is a multi-step process:

1. Grant copy authorization on the source resource.
1. Use the authorization to call the copy API on the target resource.

> **Important:**
> Both the source and target resources require the **Cognitive Services User** role to be granted to the credential used to run the code. This role is required for cross-resource copying operations.

For cross-resource copying, set the following additional environment variables:
- `CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID` - Full Azure Resource Manager resource ID of the source resource.
- `CONTENTUNDERSTANDING_SOURCE_REGION` - Azure region of the source resource.
- `CONTENTUNDERSTANDING_TARGET_ENDPOINT` - Target resource endpoint.
- `CONTENTUNDERSTANDING_TARGET_RESOURCE_ID` - Full Azure Resource Manager resource ID of the target resource.
- `CONTENTUNDERSTANDING_TARGET_REGION` - Azure region of the target resource.
- `CONTENTUNDERSTANDING_TARGET_KEY` - Target API key (optional if using DefaultAzureCredential).

Example resource ID format:
`/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{name}`

```javascript
const { DefaultAzureCredential } = require("@azure/identity");

const sourceEndpoint =
    process.env["CONTENTUNDERSTANDING_ENDPOINT"];
const sourceKey =
    process.env["CONTENTUNDERSTANDING_KEY"];

const sourceResourceId =
    process.env[
        "CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID"
    ];
const sourceRegion =
    process.env["CONTENTUNDERSTANDING_SOURCE_REGION"];

const targetEndpoint =
    process.env[
        "CONTENTUNDERSTANDING_TARGET_ENDPOINT"
    ];
const targetKey =
    process.env["CONTENTUNDERSTANDING_TARGET_KEY"];

const targetResourceId =
    process.env[
        "CONTENTUNDERSTANDING_TARGET_RESOURCE_ID"
    ];
const targetRegion =
    process.env[
        "CONTENTUNDERSTANDING_TARGET_REGION"
    ];

const sourceAnalyzerId = "my-source-analyzer";
const targetAnalyzerId = "my-target-analyzer";

// Create clients for source and target resources
const sourceCredential = sourceKey
    ? new AzureKeyCredential(sourceKey)
    : new DefaultAzureCredential();
const targetCredential = targetKey
    ? new AzureKeyCredential(targetKey)
    : new DefaultAzureCredential();

const sourceClient = new ContentUnderstandingClient(
    sourceEndpoint,
    sourceCredential
);
const targetClient = new ContentUnderstandingClient(
    targetEndpoint,
    targetCredential
);

// Step 1: Grant copy authorization on the source
const copyAuth =
    await sourceClient.grantCopyAuthorization(
        sourceAnalyzerId,
        targetResourceId,
        { targetRegion: targetRegion }
    );

console.log("Copy authorization granted!");
console.log(
    `  Target resource: `
    + `${copyAuth.targetAzureResourceId}`
);
console.log(
    `  Expires at: ${copyAuth.expiresAt}`
);

// Step 2: Copy the analyzer from source to target
const copyPoller = targetClient.copyAnalyzer(
    targetAnalyzerId,
    sourceAnalyzerId,
    {
        sourceAzureResourceId: sourceResourceId,
        sourceRegion: sourceRegion,
    }
);
await copyPoller.pollUntilDone();

console.log("Analyzer copied successfully!");

// Verify the copy
const targetInfo = await targetClient.getAnalyzer(
    targetAnalyzerId
);
console.log(
    `Target analyzer '${targetAnalyzerId}':`
);
console.log(
    `  Description: ${targetInfo.description}`
);
console.log(
    `  Status: ${targetInfo.status}`
);
```

> **Tip:**
> This code is based on the [grant copy auth sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/grantCopyAuth.js) in the SDK repository.

> **Note:**
>
> Analyzers now support classification/segmentation and analysis of each of the identified classes and segments in a single request. When copying an analyzer that uses this feature, you need to copy any referenced analyzers as well.

## Verify the copy

Validate that the analyzer was copied by retrieving it from the target resource.

```javascript
const analyzer = await client.getAnalyzer(
    targetAnalyzerId
);
console.log(
    `Analyzer '${targetAnalyzerId}' found.`
);
if (analyzer.description) {
    console.log(
        `  Description: ${analyzer.description}`
    );
}
```




**Applies to: programming-language-typescript**



<!-- markdownlint-disable MD025 -->

This guide shows you how to use the Content Understanding TypeScript SDK to copy custom analyzers within a resource and across Foundry resources.

## Prerequisites

* An active Azure subscription. If you don't have an Azure account, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) created in a [supported region](../language-region-support.md).
* Your resource endpoint and API key.
* [Node.js](https://nodejs.org/) LTS version.
* [TypeScript](https://www.typescriptlang.org/) 5.x or later.
* An existing custom analyzer in your resource. See [Create a custom analyzer](../tutorial/create-custom-analyzer.md) if you need to create one.

## Set up

1. Create a new Node.js project:

    ```console
    mkdir copy-analyzer-example
    cd copy-analyzer-example
    npm init -y
    ```

1. Install TypeScript and the Content Understanding client library:

    ```console
    npm install typescript ts-node @azure/ai-content-understanding
    ```

1. Optionally, install the Azure Identity library for Microsoft Entra authentication:

    ```console
    npm install @azure/identity
    ```

## Set up environment variables

To authenticate with the Content Understanding service, set the environment variables with your own values before running the sample:
- `CONTENTUNDERSTANDING_ENDPOINT` - the endpoint to your Content Understanding resource.
- `CONTENTUNDERSTANDING_KEY` - your Content Understanding API key (optional if using [Microsoft Entra ID](../concepts/secure-communications.md) DefaultAzureCredential).

### Windows

```cmd
setx CONTENTUNDERSTANDING_ENDPOINT "your-endpoint"
setx CONTENTUNDERSTANDING_KEY "your-key"
```

### Linux / macOS

```bash
export CONTENTUNDERSTANDING_ENDPOINT="your-endpoint"
export CONTENTUNDERSTANDING_KEY="your-key"
```

## Create the client

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from
    "@azure/identity";
import {
    ContentUnderstandingClient,
} from "@azure/ai-content-understanding";
import type {
    ContentAnalyzer,
} from "@azure/ai-content-understanding";

const endpoint =
    process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const key =
    process.env["CONTENTUNDERSTANDING_KEY"];

const credential = key
    ? new AzureKeyCredential(key)
    : new DefaultAzureCredential();

const client = new ContentUnderstandingClient(
    endpoint,
    credential
);
```

## Copy within a Foundry resource

To copy an analyzer within the same resource, call the `copyAnalyzer` method with the target and source analyzer IDs.

```typescript
const sourceAnalyzerId = "my-source-analyzer";
const targetAnalyzerId = "my-target-analyzer";

const copyPoller = client.copyAnalyzer(
    targetAnalyzerId, sourceAnalyzerId
);
await copyPoller.pollUntilDone();

console.log("Analyzer copied successfully!");
```

> **Tip:**
> This code is based on the [copy analyzer sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/copyAnalyzer.ts) in the SDK repository.

## Copy across Foundry resources

Copying an analyzer across Foundry resources is a multi-step process:

1. Grant copy authorization on the source resource.
1. Use the authorization to call the copy API on the target resource.

> **Important:**
> Both the source and target resources require the **Cognitive Services User** role to be granted to the credential used to run the code. This role is required for cross-resource copying operations.

For cross-resource copying, set the following additional environment variables:
- `CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID` - Full Azure Resource Manager resource ID of the source resource.
- `CONTENTUNDERSTANDING_SOURCE_REGION` - Azure region of the source resource.
- `CONTENTUNDERSTANDING_TARGET_ENDPOINT` - Target resource endpoint.
- `CONTENTUNDERSTANDING_TARGET_RESOURCE_ID` - Full Azure Resource Manager resource ID of the target resource.
- `CONTENTUNDERSTANDING_TARGET_REGION` - Azure region of the target resource.
- `CONTENTUNDERSTANDING_TARGET_KEY` - Target API key (optional if using DefaultAzureCredential).

Example resource ID format:
`/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{name}`

```typescript
import { DefaultAzureCredential } from
    "@azure/identity";

const sourceEndpoint =
    process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const sourceKey =
    process.env["CONTENTUNDERSTANDING_KEY"];

const sourceResourceId =
    process.env[
        "CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID"
    ]!;
const sourceRegion =
    process.env[
        "CONTENTUNDERSTANDING_SOURCE_REGION"
    ]!;

const targetEndpoint =
    process.env[
        "CONTENTUNDERSTANDING_TARGET_ENDPOINT"
    ]!;
const targetKey =
    process.env["CONTENTUNDERSTANDING_TARGET_KEY"];

const targetResourceId =
    process.env[
        "CONTENTUNDERSTANDING_TARGET_RESOURCE_ID"
    ]!;
const targetRegion =
    process.env[
        "CONTENTUNDERSTANDING_TARGET_REGION"
    ]!;

const sourceAnalyzerId = "my-source-analyzer";
const targetAnalyzerId = "my-target-analyzer";

// Create clients for source and target resources
const sourceCredential = sourceKey
    ? new AzureKeyCredential(sourceKey)
    : new DefaultAzureCredential();
const targetCredential = targetKey
    ? new AzureKeyCredential(targetKey)
    : new DefaultAzureCredential();

const sourceClient = new ContentUnderstandingClient(
    sourceEndpoint, sourceCredential
);
const targetClient = new ContentUnderstandingClient(
    targetEndpoint, targetCredential
);

// Step 1: Grant copy authorization on the source
const copyAuth =
    await sourceClient.grantCopyAuthorization(
        sourceAnalyzerId,
        targetResourceId,
        { targetRegion: targetRegion }
    );

console.log("Copy authorization granted!");
console.log(
    `  Target resource: `
    + `${copyAuth.targetAzureResourceId}`
);
console.log(
    `  Expires at: ${copyAuth.expiresAt}`
);

// Step 2: Copy the analyzer from source to target
const copyPoller = targetClient.copyAnalyzer(
    targetAnalyzerId,
    sourceAnalyzerId,
    {
        sourceAzureResourceId: sourceResourceId,
        sourceRegion: sourceRegion,
    }
);
await copyPoller.pollUntilDone();

console.log("Analyzer copied successfully!");

// Verify the copy
const targetInfo = await targetClient.getAnalyzer(
    targetAnalyzerId
);
console.log(
    `Target analyzer '${targetAnalyzerId}':`
);
console.log(
    `  Description: ${targetInfo.description}`
);
console.log(
    `  Status: ${targetInfo.status}`
);
```

> **Tip:**
> This code is based on the [grant copy auth sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/src/grantCopyAuth.ts) in the SDK repository.

> **Note:**
>
> Analyzers now support classification/segmentation and analysis of each of the identified classes and segments in a single request. When copying an analyzer that uses this feature, you need to copy any referenced analyzers as well.

## Verify the copy

Validate that the analyzer was copied by retrieving it from the target resource.

```typescript
const analyzer = await client.getAnalyzer(
    targetAnalyzerId
);
console.log(
    `Analyzer '${targetAnalyzerId}' found.`
);
if (analyzer.description) {
    console.log(
        `  Description: ${analyzer.description}`
    );
}
```




## Related content

* Explore more [Python SDK samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/samples)
* Explore more [.NET SDK samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentunderstanding/Azure.AI.ContentUnderstanding/samples)
* Explore more [Java SDK samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentunderstanding/azure-ai-contentunderstanding/src/samples/java/com/azure/ai/contentunderstanding)
* Explore more [JavaScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript)
* Explore more [TypeScript SDK samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript)
