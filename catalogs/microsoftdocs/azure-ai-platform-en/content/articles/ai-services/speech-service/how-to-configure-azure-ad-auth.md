---
title: How to configure Microsoft Entra authentication
titleSuffix: Foundry Tools
description: Learn how to authenticate using Microsoft Entra authentication
author: goergenj
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 06/06/2026
ms.author: jagoerge
zone_pivot_groups: programming-languages-set-two
ms.custom: devx-track-azurepowershell, devx-track-extended-java, devx-track-python, devx-track-azurecli
ai-usage: ai-assisted
---

# Microsoft Entra authentication with the Speech SDK

When using the Speech SDK to access the Speech service, there are three authentication methods available: service keys, a key-based token, and Microsoft Entra ID. This article describes how to configure a Foundry resource and create a Speech SDK configuration object to use Microsoft Entra ID for authentication.

This article shows how to use Microsoft Entra authentication with the Speech SDK. You learn how to:

> 
>
> - Create a Foundry resource
> - Configure the Speech resource for Microsoft Entra authentication
> - Get a Microsoft Entra access token
> - Create the appropriate SDK configuration object.

To learn more about Microsoft Entra access tokens, including token lifetime, visit [Access tokens in the Microsoft identity platform](https://learn.microsoft.com/azure/active-directory/develop/access-tokens).

## Create a Foundry resource
To create a Foundry resource in the [Azure portal](https://portal.azure.com), see [this quickstart](../multi-service-resource.md?pivots=azportal).

<a name='configure-the-speech-resource-for-azure-ad-authentication'></a>

## Configure the Speech resource for Microsoft Entra authentication

To configure your Speech resource for Microsoft Entra authentication, create a custom domain name and assign roles.

### Create a custom domain name


Follow these steps to create a [custom subdomain name for Foundry Tools](../cognitive-services-custom-subdomains.md) for your Speech resource.

> **Caution:**
> When you turn on a custom domain name, the operation is [not reversible](../cognitive-services-custom-subdomains.md#can-i-change-a-custom-domain-name). The only way to go back to the [regional name](../cognitive-services-custom-subdomains.md#is-there-a-list-of-regional-endpoints) is to create a new Speech resource.
>
> If your Speech resource has a lot of associated custom models and projects created via [Speech Studio](https://aka.ms/speechstudio/customspeech), we strongly recommend trying the configuration with a test resource before you modify the resource used in production.

# [Azure portal](#tab/portal)

To create a custom domain name using the Azure portal, follow these steps:

1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. Select the required Speech resource.
1. In the **Resource Management** group on the left pane, select **Networking**.
1. On the **Firewalls and virtual networks** tab, select **Generate Custom Domain Name**. A new right panel appears with instructions to create a unique custom subdomain for your resource.
1. In the **Generate Custom Domain Name** panel, enter a custom domain name. Your full custom domain will look like:
    `https://{your custom name}.cognitiveservices.azure.com`. 
    
    Remember that after you create a custom domain name, it _cannot_ be changed.
    
    After you've entered your custom domain name, select **Save**.
1. After the operation finishes, in the **Resource management** group, select **Keys and Endpoint**. Confirm that the new endpoint name of your resource starts this way: `https://{your custom name}.cognitiveservices.azure.com`.

# [PowerShell](#tab/powershell)

To create a custom domain name by using PowerShell, confirm that your computer has PowerShell version 7.x or later with the Azure PowerShell module version 5.1.0 or later. To see the versions of these tools, follow these steps:

1. In a PowerShell window, enter:

    `$PSVersionTable`

    Confirm that the `PSVersion` value is 7.x or later. To upgrade PowerShell, follow the instructions at [Installing various versions of PowerShell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell).

1. In a PowerShell window, enter:

    `Get-Module -ListAvailable Az`

    If nothing appears, or if that version of the Azure PowerShell module is earlier than 5.1.0, follow the instructions at [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to upgrade.

Before you proceed, run `Connect-AzAccount` to create a connection with Azure.

## Verify that a custom domain name is available

Check whether the custom domain that you want to use is available. 
The following code confirms that the domain is available by using the [Check Domain Availability](https://learn.microsoft.com/rest/api/cognitiveservices/accountmanagement/checkdomainavailability/checkdomainavailability) operation in the Foundry Tools REST API.

> **Note:**
> The following code will *not* work in Azure Cloud Shell.

```azurepowershell
$subscriptionId = "Your Azure subscription Id"
$subdomainName = "custom domain name"

# Select the Azure subscription that contains the Speech resource.
# You can skip this step if your Azure account has only one active subscription.
Set-AzContext -SubscriptionId $subscriptionId

# Prepare the OAuth token to use in the request to the Foundry Tools REST API.
$Context = Get-AzContext
$AccessToken = (Get-AzAccessToken -TenantId $Context.Tenant.Id).Token
$token = ConvertTo-SecureString -String $AccessToken -AsPlainText -Force

# Prepare and send the request to the Foundry Tools REST API.
$uri = "https://management.azure.com/subscriptions/" + $subscriptionId + `
    "/providers/Microsoft.CognitiveServices/checkDomainAvailability?api-version=2017-04-18"
$body = @{
subdomainName = $subdomainName
type = "Microsoft.CognitiveServices/accounts"
}
$jsonBody = $body | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri $uri -ContentType "application/json" -Authentication Bearer `
    -Token $token -Body $jsonBody | Format-List
```
If the desired name is available, you'll see a response like this:
```azurepowershell
isSubdomainAvailable : True
reason               :
type                 :
subdomainName        : my-custom-name
```
If the name is already taken, then you'll see the following response:
```azurepowershell
isSubdomainAvailable : False
reason               : Sub domain name 'my-custom-name' is already used. Please pick a different name.
type                 :
subdomainName        : my-custom-name
```
## Create your custom domain name

To turn on a custom domain name for the selected Speech resource, use the [Set-AzCognitiveServicesAccount](https://learn.microsoft.com/powershell/module/az.cognitiveservices/set-azcognitiveservicesaccount) cmdlet.

> **Caution:**
> After the following code runs successfully, you'll create a custom domain name for your Speech resource. Remember that this name *cannot* be changed.

```azurepowershell
$resourceGroup = "Resource group name where Speech resource is located"
$speechResourceName = "Your Speech resource name"
$subdomainName = "custom domain name"

# Select the Azure subscription that contains the Speech resource.
# You can skip this step if your Azure account has only one active subscription.
$subscriptionId = "Your Azure subscription Id"
Set-AzContext -SubscriptionId $subscriptionId

# Set the custom domain name to the selected resource.
# WARNING: THIS CANNOT BE CHANGED OR UNDONE!
Set-AzCognitiveServicesAccount -ResourceGroupName $resourceGroup `
    -Name $speechResourceName -CustomSubdomainName $subdomainName
```

# [Azure CLI](#tab/azure-cli)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/how-to-configure-azure-ad-auth.md)

This section requires the latest version of the Azure CLI. If you're using Azure Cloud Shell, the latest version is already installed.

## Verify that the custom domain name is available

Check whether the custom domain that you want to use is free. Use the [Check Domain Availability](https://learn.microsoft.com/rest/api/cognitiveservices/accountmanagement/checkdomainavailability/checkdomainavailability) method from the Foundry Tools REST API.

Copy the following code block, insert your preferred custom domain name, and save to the file `subdomain.json`.

```json
{
    "subdomainName": "custom domain name",
    "type": "Microsoft.CognitiveServices/accounts"
}
```

Copy the file to your current folder or upload it to Azure Cloud Shell and run the following command. Replace `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` with your Azure subscription ID.

```azurecli-interactive
az rest --method post --url "https://management.azure.com/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/providers/Microsoft.CognitiveServices/checkDomainAvailability?api-version=2017-04-18" --body @subdomain.json
```
If the desired name is available, you'll see a response like this:
```json
{
  "isSubdomainAvailable": true,
  "reason": null,
  "subdomainName": "my-custom-name",
  "type": null
}
```

If the name is already taken, then you'll see the following response:
```json
{
  "isSubdomainAvailable": false,
  "reason": "Sub domain name 'my-custom-name' is already used. Please pick a different name.",
  "subdomainName": "my-custom-name",
  "type": null
}
```
## Turn on a custom domain name

To use a custom domain name with the selected Speech resource, use the [az cognitiveservices account update](https://learn.microsoft.com/cli/azure/cognitiveservices/account#az-cognitiveservices-account-update) command.

(If your Azure account has only one active subscription, you can skip this step.) Select the Azure subscription that contains the Speech resource. Replace `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` with your Azure subscription ID.
```azurecli-interactive
az account set --subscription xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
Set the custom domain name to the selected resource. Replace the sample parameter values with the actual ones and run the following command.

> **Caution:**
> After successful execution of the following command, you'll create a custom domain name for your Speech resource. Remember that this name *cannot* be changed.

```azurecli-interactive
az cognitiveservices account update --name my-speech-resource-name --resource-group my-resource-group-name --custom-domain my-custom-name
```

***


### Assign roles
For Microsoft Entra authentication with Speech resources, you need to assign either the *Cognitive Services Speech Contributor* or *Cognitive Services Speech User* role.

You can assign roles to the user or application using the [Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal) or [PowerShell](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-powershell).

<a name='get-an-azure-ad-access-token'></a>

## Get a Microsoft Entra access token
**Applies to: programming-language-csharp**

To get a Microsoft Entra access token in C#, use the [Azure Identity Client Library](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme).

Here's an example of using Azure Identity to get a Microsoft Entra access token from an interactive browser:
```c#
TokenRequestContext context = new Azure.Core.TokenRequestContext(new string[] { "https://cognitiveservices.azure.com/.default" });
InteractiveBrowserCredential browserCredential = new InteractiveBrowserCredential();
var browserToken = browserCredential.GetToken(context);
string aadToken = browserToken.Token;
```
> **Note:**
> The token context must be set to "https://cognitiveservices.azure.com/.default".



**Applies to: programming-language-cpp**

To get a Microsoft Entra access token in C++, use the [Azure Identity Client Library](https://github.com/Azure/azure-sdk-for-cpp/tree/main/sdk/identity/azure-identity).

Here's an example of using Azure Identity to get a Microsoft Entra access token with your tenant ID, client ID, and client secret credentials:
```cpp
const std::string tokenContext = "https://cognitiveservices.azure.com/.default";

Azure::Identity::DefaultAzureCredential();

Azure::Core::Credentials::TokenRequestContext context;
context.Scopes.push_back(tokenContext);

auto token = cred.GetToken(context, Azure::Core::Context());
```

> **Note:**
> The token context must be set to "https://cognitiveservices.azure.com/.default".



**Applies to: programming-language-java**

To get a Microsoft Entra access token in Java, use the [Azure Identity Client Library](https://learn.microsoft.com/java/api/overview/azure/identity-readme).

Here's an example of using Azure Identity to get a Microsoft Entra access token from a browser:
```java
TokenRequestContext context = new TokenRequestContext();
context.addScopes("https://cognitiveservices.azure.com/.default");

InteractiveBrowserCredentialBuilder builder = new InteractiveBrowserCredentialBuilder();
InteractiveBrowserCredential browserCredential = builder.build();

AccessToken browserToken = browserCredential.getToken(context).block();
String token = browserToken.getToken();
```

> **Note:**
> The token context must be set to "https://cognitiveservices.azure.com/.default".



**Applies to: programming-language-python**

To get a Microsoft Entra access token in Python, use the [Azure Identity Client Library](https://learn.microsoft.com/python/api/overview/azure/identity-readme).

Here's an example of using Azure Identity to get a Microsoft Entra access token from an interactive browser:
```Python
from azure.identity import  InteractiveBrowserCredential
ibc = InteractiveBrowserCredential()
aadToken = ibc.get_token("https://cognitiveservices.azure.com/.default")
```


### More samples

Find samples that get a Microsoft Entra access token in [Microsoft identity platform code samples](https://learn.microsoft.com/azure/active-directory/develop/sample-v2-code).

For programming languages where a Microsoft identity platform client library isn't available, you can directly [request an access token](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth-ropc).

## Get the Speech resource ID

You need your Speech resource ID to make SDK calls using Microsoft Entra authentication in scenarios that don't yet support Entra ID directly.

# [Azure portal](#tab/portal)

To get the resource ID in the Azure portal:

1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. Select a Foundry resource.
1. In the **Resource Management** group on the left pane, select **Properties**.
1. Copy the **Resource ID**

# [PowerShell](#tab/powershell)

To get the resource ID using PowerShell, confirm that you have PowerShell version 7.x or later with the Azure PowerShell module version 5.1.0 or later. To see the versions of these tools, follow these steps:

1. In a PowerShell window, enter:

    `$PSVersionTable`

    Confirm that the `PSVersion` value is 7.x or later. To upgrade PowerShell, follow the instructions at [Installing various versions of PowerShell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell).

1. In a PowerShell window, enter:

    `Get-Module -ListAvailable Az`

    If nothing appears, or if that version of the Azure PowerShell module is earlier than 5.1.0, follow the instructions at [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to upgrade.

Now run `Connect-AzAccount` to create a connection with Azure.

```azurepowershell
Connect-AzAccount
$subscriptionId = "Your Azure subscription Id"
$resourceGroup = "Resource group name where Speech resource is located"
$speechResourceName = "Your Speech resource name"

# Select the Azure subscription that contains the Speech resource.
# You can skip this step if your Azure account has only one active subscription.
Set-AzContext -SubscriptionId $subscriptionId

# Get the Speech resource 
$resource = Get-AzCognitiveServicesAccount -Name $speechResourceName -ResourceGroupName $resourceGroup

# Get the resource ID:
$resourceId = resource.Id
```

---

## Create the Speech SDK configuration object

With a Microsoft Entra access token, you can now create a Speech SDK configuration object.

The method of providing the token, and the method to construct the corresponding Speech SDK ```Config``` object varies by the object you're using.

**Applies to: programming-language-csharp**

### SpeechRecognizer, SourceLanguageRecognizer, ConversationTranscriber

For ```SpeechRecognizer```, ```SourceLanguageRecognizer```, ```ConversationTranscriber``` objects, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication, along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), to create a ```SpeechConfig``` object.

```C#
TokenCredential browserCredential = new InteractiveBrowserCredential();

// Define the custom domain endpoint for your Speech resource.
var endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
var speechConfig = SpeechConfig.FromEndpoint(new Uri(endpoint), browserCredential);
```

### TranslationRecognizer

For ```TranslationRecognizer``` object, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication, along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), to create a ```SpeechTranslationConfig``` object.

```C#
TokenCredential browserCredential = new InteractiveBrowserCredential();

// Define the custom domain endpoint for your Speech resource
var endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechTranslationConfig object using the custom domain endpoint and TokenCredential.
var speechConfig = SpeechTranslationConfig.FromEndpoint(new Uri(endpoint), browserCredential);
```

### SpeechSynthesizer

For ```SpeechSynthesizer``` objects, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication. Along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), use these credentials to create a ```SpeechConfig``` object.

```C#
TokenCredential browserCredential = new InteractiveBrowserCredential();

// Define the custom domain endpoint for your Speech resource.
var endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
var speechConfig = SpeechConfig.FromEndpoint(new Uri(endpoint), browserCredential);
```


**Applies to: programming-language-cpp**

### SpeechRecognizer, SpeechSynthesizer, ConversationTranscriber

For ```SpeechRecognizer```, ```SpeechSynthesizer```, and ```ConversationTranscriber``` objects, use an appropriate instance of [TokenCredential](https://github.com/Azure/azure-sdk-for-cpp/tree/main/sdk/identity/azure-identity) for authentication. Along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), use these credentials to create a ```SpeechConfig``` object.

```C++
auto browserCredential = std::make_shared<Azure::Identity::InteractiveBrowserCredential>();

// Define the custom domain endpoint for your Speech resource.
auto endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
auto speechConfig = SpeechConfig::FromEndpoint(endpoint, browserCredential);
```

### TranslationRecognizer

For the ```TranslationRecognizer```, use an appropriate instance of [TokenCredential](https://github.com/Azure/azure-sdk-for-cpp/tree/main/sdk/identity/azure-identity) for authentication. Along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), use these credentials to create a ```SpeechTranslationConfig``` object.

```cpp
auto browserCredential = std::make_shared<Azure::Identity::InteractiveBrowserCredential>();

// Define the custom domain endpoint for your Speech resource
auto endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechTranslationConfig object using the custom domain endpoint and TokenCredential.
auto speechConfig = SpeechTranslationConfig::FromEndpoint(endpoint, browserCredential);
```



**Applies to: programming-language-java**

### SpeechRecognizer, ConversationTranscriber

For ```SpeechRecognizer```, ```ConversationTranscriber``` objects, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication, along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), to create a ```SpeechConfig``` object.

```Java
TokenCredential browserCredential = new InteractiveBrowserCredentialBuilder().build();

// Define the custom domain endpoint for your Speech resource.
String endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new java.net.URI(endpoint), browserCredential);
```

### TranslationRecognizer

For ```TranslationRecognizer``` object, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication, along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), to create a ```SpeechTranslationConfig``` object.

```Java
TokenCredential browserCredential = new InteractiveBrowserCredentialBuilder().build();

// Define the custom domain endpoint for your Speech resource
String endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechTranslationConfig object using the custom domain endpoint and TokenCredential.
SpeechConfig speechConfig = SpeechTranslationConfig.fromEndpoint(new java.net.URI(endpoint), browserCredential);
```

### SpeechSynthesizer

For `SpeechSynthesizer` object, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication. Along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), use these credentials to create a `SpeechConfig` object.

```Java
TokenCredential browserCredential = new InteractiveBrowserCredentialBuilder().build();

// Define the custom domain endpoint for your Speech resource.
String endpoint = "https://{your custom name}.cognitiveservices.azure.com/";

// Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new java.net.URI(endpoint), browserCredential);
```


**Applies to: programming-language-python**

### SpeechRecognizer, ConversationTranscriber

For ```SpeechRecognizer```, ```ConversationTranscriber``` objects, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication, along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), to create a ```SpeechConfig``` object.

```Python
browserCredential = InteractiveBrowserCredential()

# Define the custom domain endpoint for your Speech resource.
custom_endpoint = "https://{your custom name}.cognitiveservices.azure.com/"

# Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
speechConfig = SpeechConfig(token_credential=browserCredential, endpoint=custom_endpoint)
```

### TranslationRecognizer

For ```TranslationRecognizer``` object, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication, along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), to create a ```SpeechTranslationConfig``` object.

```Python
browserCredential = InteractiveBrowserCredential()

# Define the custom domain endpoint for your Speech resource
custom_endpoint = "https://{your custom name}.cognitiveservices.azure.com/"

# Create the SpeechTranslationConfig object using the custom domain endpoint and TokenCredential.
speechTranslationConfig = SpeechTranslationConfig(token_credential=browserCredential, endpoint=custom_endpoint)
```

### SpeechSynthesizer

For the ```SpeechSynthesizer``` object, use an appropriate instance of [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) for authentication. Along with the endpoint that includes your [custom domain](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-private-link?tabs=portal#create-a-custom-domain-name), use these elements to create a ```SpeechConfig``` object.

```Python
browserCredential = InteractiveBrowserCredential()

# Define the custom domain endpoint for your Speech resource.
custom_endpoint = "https://{your custom name}.cognitiveservices.azure.com/"

# Create the SpeechConfig object using the custom domain endpoint and TokenCredential.
speechConfig = SpeechConfig(token_credential=browserCredential, endpoint=custom_endpoint)
```


> **Note:**
> The ```ConversationTranslator``` doesn't support Microsoft Entra authentication.
