---
title: Quickstart - Get and manage phone numbers using Azure Communication Services
description: Learn how to manage phone numbers using Azure Communication Services.
author: prakulka
manager: nmurav
services: azure-communication-services
ms.author: prakulka
ms.date: 06/30/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: pstn
ms.custom: references_regions, mode-other, devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-azp-azpnew-azcli-java-csharp-js-python
---

# Quickstart: Get and manage phone numbers


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> SMS and PSTN capabilities depend on the phone number you use and the country/region that you're operating within as determined by your Azure billing address. For more information, visit the [Subscription eligibility](../../concepts/numbers/sub-eligibility-number-capability.md) documentation.



> **Important:**
> For high-volume orders or in the event that your desired phone number is unavailable, please visit **[this page](https://github.com/Azure/Communication/blob/master/special-order-numbers.md)** for further assistance.

**Applies to: platform-azp-new**

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [An active Communication Services resource.](../create-communication-resource.md)

## Purchase a phone number

1. Navigate to your Communication Service resource in the [Azure portal](https://portal.azure.com).
 
   Screenshot showing a Communication Services resource's main page.

2. In the Communication Services resource overview, select on the "Phone numbers" option in the left-hand menu. 

   Screenshot showing a Communication Services resource's phone numbers page.

3. Select **Get** on the top left of the page to purchase your phone number. Selecting this launches our shopping wizard:

   Screenshot showing phone number shopping cart search wizard.

4. Choose the **Country/region** where you would like to provision the phone number. Country/region availability is based on the billing location for your Azure subscription. More information on what numbers are available for each country/region can be found [here](../../concepts/numbers/sub-eligibility-number-capability.md). Next you'll choose the [number type](../../concepts/telephony/plan-solution.md#phone-number-types-in-azure-communication-services). You can select from two phone number types: **Local**, and **Toll-free**.

> **Note:**
> - Bulk number orders or some countries/regions, such as the Netherlands, require a special order for phone numbers. If special ordering is needed, you will be prompted to follow the below mentioned special order process.
> - Click "Request a Special Order" button in the Phone Numbers section.
> - Open a [new case](https://aka.ms/ContactTNS).
> - Select "Azure Communication Service" as your Customer Profile.
> - Choose the Country/Region where you need the phone numbers.
> - Select "New TN Acquisition" as the case type.
> - Fill in the necessary details and submit your request.

5. Select **Search** to pull up numbers that meet your selected criteria. You have various filters to search for the number that fits your needs, including:

   - **Use case**: This is for whether you are using this number to call from an application (A2P) or from a human agent (P2P).
   - **Calling**: This is for determining the Calling capabilities you would like for your phone number: Making calls and/or receiving calls. 
   - **SMS**: This is for determining the SMS capabilities you would like for your phone number: Sending and/or receiving SMS messages.
   - **Custom**: You can also add custom filters to get a certain prefix or set of digits in your phone number.

   Screenshot showing phone number purchase page with available phone numbers.

6. Once you find the phone number or numbers to your choosing, select **Add to cart** to hold the numbers in the Telephony cart. These numbers are held for 16 minutes before your cart is automatically cleared. 

   Screenshot showing phone number shopping cart with two phone numbers in the cart.

   > **Note:**
   > The prices shown are the **monthly recurring charges** which cover the cost of leasing the selected phone number to you. Not included in this view is the **Pay-as-you-go costs** which are incurred when you make or receive calls. The price lists are [available here](../../concepts/pricing.md). These costs depend on number type and destinations called. For example, price-per-minute for a call from a Seattle regional number to a regional number in New York and a call from the same number to a UK mobile number may be different.

7. Select **Next** to review your purchase. To complete your purchase, select **Buy now**.

   Screenshot showing 2 phone numbers to review and purchase.

8. You can find your purchased numbers back on the **Phone numbers** page. It might take a few minutes for the numbers to be provisioned. 

   Screenshot of the phone numbers page with the newly purchased phone numbers boxed with a red border.


### Update Phone Number Capabilities

On the **Phone Numbers** page, you can select a phone number to configure it.

Screenshot showing the update features page.

Select the features from the available options, then select **Save** to apply your selection.

### Release Phone Number

On the **Numbers** page, you can release phone numbers.

Screenshot showing the release phone numbers page.

Select the phone number that you want to release and then select on the **Release** button.



**Applies to: platform-azcli**

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

- A purchased phone number.

## Setting up
### Add the extension
Add the Azure Communication Services extension for Azure CLI by using the `az extension` command.

```azurecli-interactive
az extension add --name communication
```

### Sign in to Azure CLI
You'll need to [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials.

## Operations

### List purchased phone number(s)

Run the following command to retrieve all of the purchased phone numbers.

```azurecli-interactive
az communication phonenumber list --connection-string "<yourConnectionString>"
```

Make this replacement in the code:

- Replace `<yourConnectionString>` with your connection string.

### Get purchased phone number details

Run the following command to get the phone number details for a purchased phone number.

```azurecli-interactive
az communication phonenumber show --phonenumber <purchasedPhoneNumber> --connection-string "<yourConnectionString>"
```
Make these replacements in the code:

- Replace `<purchasedPhoneNumber>` with a phone number that's associated with your Communication Services resource.
- Replace `<yourConnectionString>` with your connection string.

> **Note:**
> The Azure CLI option provides functionality only for listing and showing phone numbers. It does not support other operations such as searching, purchasing, editing or releasing phone numbers.

### (Optional) Use Azure CLI phone numbers operations without passing in a connection string

You can configure the `AZURE_COMMUNICATION_CONNECTION_STRING` environment variable to use Azure CLI phone numbers operations without having to use `--connection_string` to pass in the connection string. To configure an environment variable, open a console window and select your operating system from the below tabs. Replace `<yourConnectionString>` with your actual connection string.

#### [Windows](#tab/windows)

Open a console window and enter the following command:

```console
setx AZURE_COMMUNICATION_CONNECTION_STRING "<yourConnectionString>"
```

After you add the environment variable, you may need to restart any running programs that will need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable.

#### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell in order to access the variable.

---



**Applies to: programming-language-csharp**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/PhoneNumbers)

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version [.NET Core client library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

### Prerequisite check

- In a terminal or command window, run the `dotnet` command to check that the .NET client library is installed.

## Setting up

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `PhoneNumbersQuickstart`. This command creates a simple "Hello World" C# project with a single source file: **Program.cs**.

```console
dotnet new console -o PhoneNumbersQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd PhoneNumbersQuickstart
dotnet build
```

### Install the package

While still in the application directory, install the Azure Communication PhoneNumbers client library for .NET package by using the `dotnet add package` command.

```console
dotnet add package Azure.Communication.PhoneNumbers --version 1.0.0
```

Add a `using` directive to the top of **Program.cs** to include the namespaces.

```csharp
using System;
using System.Linq;
using System.Threading.Tasks;
using Azure.Communication.PhoneNumbers;
```

Update `Main` function signature to be async.

```csharp
static async Task Main(string[] args)
{
  ...
}
```

## Authenticate the client

Phone Number clients can be authenticated using connection string acquired from an Azure Communication Services resources in the [Azure portal](https://portal.azure.com).

```csharp
// Get a connection string to our Azure Communication Services resource.
var connectionString = "<connection_string>";
var client = new PhoneNumbersClient(connectionString);
```

Phone Number clients also have the option to authenticate with Microsoft Entra authentication. With this option,
`AZURE_CLIENT_SECRET`, `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` environment variables need to be set up for authentication.

```csharp
// Get an endpoint to our Azure Communication Services resource.
var endpoint = new Uri("<endpoint_url>");
TokenCredential tokenCredential = new DefaultAzureCredential();
client = new PhoneNumbersClient(endpoint, tokenCredential);
```

## Manage phone numbers

### Search for available phone numbers

In order to purchase phone numbers, you must first search for available phone numbers. To search for phone numbers, provide the area code, assignment type, [phone number capabilities](../../concepts/telephony/plan-solution.md#phone-number-capabilities-in-azure-communication-services), [phone number type](../../concepts/telephony/plan-solution.md#phone-number-types-in-azure-communication-services), and quantity. Note that for the toll-free phone number type, providing the area code is optional.

```csharp
var capabilities = new PhoneNumberCapabilities(calling:PhoneNumberCapabilityType.None, sms:PhoneNumberCapabilityType.Outbound);
var searchOptions = new PhoneNumberSearchOptions { AreaCode = "833", Quantity = 1 };

var searchOperation = await client.StartSearchAvailablePhoneNumbersAsync("US", PhoneNumberType.TollFree, PhoneNumberAssignmentType.Application, capabilities, searchOptions);
await searchOperation.WaitForCompletionAsync();
```

### Purchase phone numbers

The result of searching for phone numbers is a `PhoneNumberSearchResult`. This contains a `SearchId` which can be passed to the purchase numbers API to acquire the numbers in the search. Note that calling the purchase phone numbers API will result in a charge to your Azure Account.

```csharp
var purchaseOperation = await client.StartPurchasePhoneNumbersAsync(searchOperation.Value.SearchId);
await purchaseOperation.WaitForCompletionResponseAsync();
```

### Get phone number(s)

After a purchasing number, you can retrieve it from the client.
```csharp
var getPhoneNumberResponse = await client.GetPurchasedPhoneNumberAsync("+14255550123");
Console.WriteLine($"Phone number: {getPhoneNumberResponse.Value.PhoneNumber}, country code: {getPhoneNumberResponse.Value.CountryCode}");
```

You can also retrieve all the purchased phone numbers.
``` csharp
var purchasedPhoneNumbers = client.GetPurchasedPhoneNumbersAsync();
await foreach (var purchasedPhoneNumber in purchasedPhoneNumbers)
{
    Console.WriteLine($"Phone number: {purchasedPhoneNumber.PhoneNumber}, country code: {purchasedPhoneNumber.CountryCode}");
}
```

### Update phone number capabilities

With a purchased number, you can update the capabilities.

````csharp
var updateCapabilitiesOperation = await client.StartUpdateCapabilitiesAsync("+14255550123", calling: PhoneNumberCapabilityType.Outbound, sms: PhoneNumberCapabilityType.InboundOutbound);
await updateCapabilitiesOperation.WaitForCompletionAsync();
````


### Release phone number

You can release a purchased phone number.

````csharp
var releaseOperation = await client.StartReleasePhoneNumberAsync("+14255550123");
await releaseOperation.WaitForCompletionResponseAsync();
````

## Run the code

Run the application from your application directory with the `dotnet run` command.

```console
dotnet run
```

## Sample Code

You can download the sample app from [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/PhoneNumbers)



**Applies to: programming-language-java**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/PhoneNumbers)

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/?preserve-view=true\&view=azure-java-stable) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).
- A deployed Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

## Setting Up

### Create a new Java application

Open your terminal or command window. Navigate to the directory where you'd like to create your Java application. Run the command below to generate the Java project from the maven-archetype-quickstart template.

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

You'll notice that the 'generate' task created a directory with the same name as the `artifactId`. Under this directory, the src/main/java directory contains the project source code, the `src/test/java directory` contains the test source, and the `pom.xml` file is the project's Project Object Model, or POM.

### Install the package

Open the **pom.xml** file in your text editor. Add the following dependency elements to the group of dependencies.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-common</artifactId>
    <version>1.0.0</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-phonenumbers</artifactId>
    <version>1.0.0</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.2.3</version>
</dependency>
```

### Set up the app framework

From the project directory:

1. Navigate to the */src/main/java/com/communication/quickstart* directory
1. Open the *App.java* file in your editor
1. Replace the `System.out.println("Hello world!");` statement
1. Add `import` directives

Use the following code to begin:

```java
import com.azure.communication.phonenumbers.*;
import com.azure.communication.phonenumbers.models.*;
import com.azure.core.http.rest.*;
import com.azure.core.util.Context;
import com.azure.core.util.polling.LongRunningOperationStatus;
import com.azure.core.util.polling.PollResponse;
import com.azure.core.util.polling.SyncPoller;
import com.azure.identity.*;
import java.io.*;

public class App
{
    public static void main( String[] args ) throws IOException
    {
        System.out.println("Azure Communication Services - Phone Numbers Quickstart");
        // Quickstart code goes here
    }
}
```

## Authenticate the Phone Numbers Client

The PhoneNumberClientBuilder is enabled to use Microsoft Entra authentication
<!-- embedme ./src/samples/java/com/azure/communication/phonenumbers/ReadmeSamples.java#L52-L62 -->
```java
// You can find your endpoint and access key from your resource in the Azure portal
String endpoint = "https://<RESOURCE_NAME>.communication.azure.com";

PhoneNumbersClient phoneNumberClient = new PhoneNumbersClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

Alternatively, using the endpoint and access key from the communication resource to authenticate is also possible.
<!-- embedme ./src/samples/java/com/azure/communication/phonenumbers/ReadmeSamples.java#L30-L41 -->
```java
// You can find your connection string from your resource in the Azure portal
String connectionString = "endpoint=https://<RESOURCE_NAME>.communication.azure.com/;accesskey=<ACCESS_KEY>";

PhoneNumbersClient phoneNumberClient = new PhoneNumbersClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

## Manage Phone Numbers

### Search for Available Phone Numbers

In order to purchase phone numbers, you must first search for available phone numbers. To search for phone numbers, provide the area code, assignment type, [phone number capabilities](../../concepts/telephony/plan-solution.md#phone-number-capabilities-in-azure-communication-services), [phone number type](../../concepts/telephony/plan-solution.md#phone-number-types-in-azure-communication-services), and quantity. Note that for the toll-free phone number type, providing the area code is optional.

```java
 PhoneNumberCapabilities capabilities = new PhoneNumberCapabilities()
    .setCalling(PhoneNumberCapabilityType.INBOUND)
    .setSms(PhoneNumberCapabilityType.INBOUND_OUTBOUND);
PhoneNumberSearchOptions searchOptions = new PhoneNumberSearchOptions().setAreaCode("833").setQuantity(1);

SyncPoller<PhoneNumberOperation, PhoneNumberSearchResult> poller = phoneNumberClient
    .beginSearchAvailablePhoneNumbers("US", PhoneNumberType.TOLL_FREE, PhoneNumberAssignmentType.APPLICATION, capabilities, searchOptions, Context.NONE);
PollResponse<PhoneNumberOperation> response = poller.waitForCompletion();
String searchId = "";

if (LongRunningOperationStatus.SUCCESSFULLY_COMPLETED == response.getStatus()) {
    PhoneNumberSearchResult searchResult = poller.getFinalResult();
    searchId = searchResult.getSearchId();
    System.out.println("Searched phone numbers: " + searchResult.getPhoneNumbers());
    System.out.println("Search expires by: " + searchResult.getSearchExpiresBy());
    System.out.println("Phone number costs:" + searchResult.getCost().getAmount());
}
```

### Purchase Phone Numbers

The result of searching for phone numbers is a PhoneNumberSearchResult. This contains a `searchId` which can be passed to the purchase numbers API to acquire the numbers in the search. Note that calling the purchase phone numbers API will result in a charge to your Azure Account.

```java
PollResponse<PhoneNumberOperation> purchaseResponse = phoneNumberClient.beginPurchasePhoneNumbers(searchId, Context.NONE).waitForCompletion();
System.out.println("Purchase phone numbers operation is: " + purchaseResponse.getStatus());
```

### Get Phone Number(s)

After a purchasing number, you can retrieve it from the client.
```java
PurchasedPhoneNumber phoneNumber = phoneNumberClient.getPurchasedPhoneNumber("+14255550123");
System.out.println("Phone Number Country Code: " + phoneNumber.getCountryCode());
```

You can also retrieve all the purchased phone numbers.
``` java
PagedIterable<PurchasedPhoneNumber> phoneNumbers = phoneNumberClient.listPurchasedPhoneNumbers(Context.NONE);
PurchasedPhoneNumber phoneNumber = phoneNumbers.iterator().next();
System.out.println("Phone Number Country Code: " + phoneNumber.getCountryCode());
```

### Update Phone Number Capabilities

With a purchased number, you can update the capabilities.
```java
PhoneNumberCapabilities capabilities = new PhoneNumberCapabilities();
capabilities
    .setCalling(PhoneNumberCapabilityType.INBOUND)
    .setSms(PhoneNumberCapabilityType.INBOUND_OUTBOUND);

SyncPoller<PhoneNumberOperation, PurchasedPhoneNumber> poller = phoneNumberClient.beginUpdatePhoneNumberCapabilities("+18001234567", capabilities, Context.NONE);
PollResponse<PhoneNumberOperation> response = poller.waitForCompletion();
if (LongRunningOperationStatus.SUCCESSFULLY_COMPLETED == response.getStatus()) {
    PurchasedPhoneNumber phoneNumber = poller.getFinalResult();
    System.out.println("Phone Number Calling capabilities: " + phoneNumber.getCapabilities().getCalling()); //Phone Number Calling capabilities: inbound
    System.out.println("Phone Number SMS capabilities: " + phoneNumber.getCapabilities().getSms()); //Phone Number SMS capabilities: inbound+outbound
}
```

### Release Phone Number

You can release a purchased phone number.
```java
PollResponse<PhoneNumberOperation> releaseResponse =
    phoneNumberClient.beginReleasePhoneNumber("+14255550123", Context.NONE).waitForCompletion();
System.out.println("Release phone number operation is: " + releaseResponse.getStatus());
```

## Run the code

Navigate to the directory containing the *pom.xml* file and compile the project by using the following `mvn` command.

```console
mvn compile
```

Then, build the package.

```console
mvn package
```

Run the following `mvn` command to execute the app.

```console
mvn exec:java -Dexec.mainClass="com.communication.quickstart.App" -Dexec.cleanupDaemonThreads=false
```

The output of the app describes each action that is completed:
<!---cSpell:disable --->
```console
Azure Communication Services - Phone Numbers Quickstart

Searched phone numbers: [+18001234567]

Purchase phone numbers operation is: SUCCESSFULLY_COMPLETED

Phone Number Country Code: US

Phone Number Calling capabilities: inbound

Phone Number SMS capabilities: inbound

Release phone number operation is: SUCCESSFULLY_COMPLETED

```
<!---cSpell:enable --->



**Applies to: programming-language-python**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/phone-numbers-quickstart)

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python](https://www.python.org/downloads/) 3.7+.
- A deployed Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

## Setting up

### Create a new Python application

Open your terminal or command window and create a new directory for your app, then navigate to it.

```console
mkdir phone-numbers-quickstart && cd phone-numbers-quickstart
```

Use a text editor to create a file called phone_numbers_sample.py in the project root directory and add the following code. We'll be adding the remaining quickstart code in the following sections.

```python
import os
from azure.communication.phonenumbers import PhoneNumbersClient

try:
   print('Azure Communication Services - Phone Numbers Quickstart')
   # Quickstart code goes here
except Exception as ex:
   print('Exception:')
   print(ex)
```

### Install the package

While still in the application directory, install the Azure Communication Services Administration client library for Python package by using the `pip install` command.

```console
pip install azure-communication-phonenumbers
```

## Authenticate the Phone Numbers Client

The `PhoneNumbersClient` is enabled to use Microsoft Entra authentication. Using the `DefaultAzureCredential` object is the easiest way to get started with Microsoft Entra ID and you can install it using the `pip install` command.

```console
pip install azure-identity
```

Creating a `DefaultAzureCredential` object requires you to have `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID` already set as environment variables with their corresponding values from your registered Microsoft Entra application.

For a quick ramp-up on how to get these environment variables, you can follow the [Set up service principals from CLI quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/service-principal-from-cli.md).

Once you have installed the `azure-identity` library, we can continue authenticating the client.

```python
import os
from azure.communication.phonenumbers import PhoneNumbersClient
from azure.identity import DefaultAzureCredential

# You can find your endpoint from your resource in the Azure portal
endpoint = 'https://<RESOURCE_NAME>.communication.azure.com'
try:
    print('Azure Communication Services - Phone Numbers Quickstart')
    credential = DefaultAzureCredential()
    phone_numbers_client = PhoneNumbersClient(endpoint, credential)
except Exception as ex:
    print('Exception:')
    print(ex)
```

Alternatively, using the endpoint and access key from the communication resource to authenticate is also possible.

```python
import os
from azure.communication.phonenumbers import PhoneNumbersClient

# You can find your connection string from your resource in the Azure portal
connection_string = 'https://<RESOURCE_NAME>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>'
try:
    print('Azure Communication Services - Phone Numbers Quickstart')
    phone_numbers_client = PhoneNumbersClient.from_connection_string(connection_string)
except Exception as ex:
    print('Exception:')
    print(ex)
```

## Functions

Once the `PhoneNumbersClient` has been authenticated, we can start working on the different functions it can do.

### Search for Available Phone Numbers

In order to purchase phone numbers, you must first search for any available phone numbers. To search for phone numbers, provide the area code, assignment type, [phone number capabilities](../../concepts/telephony/plan-solution.md#phone-number-capabilities-in-azure-communication-services), [phone number type](../../concepts/telephony/plan-solution.md#phone-number-types-in-azure-communication-services), and quantity (default quantity is set to 1). Note that for the toll-free phone number type, providing the area code is optional.

```python
import os
from azure.communication.phonenumbers import PhoneNumbersClient, PhoneNumberCapabilityType, PhoneNumberAssignmentType, PhoneNumberType, PhoneNumberCapabilities
from azure.identity import DefaultAzureCredential

# You can find your endpoint from your resource in the Azure portal
endpoint = 'https://<RESOURCE_NAME>.communication.azure.com'
try:
    print('Azure Communication Services - Phone Numbers Quickstart')
    credential = DefaultAzureCredential()
    phone_numbers_client = PhoneNumbersClient(endpoint, credential)
    capabilities = PhoneNumberCapabilities(
        calling = PhoneNumberCapabilityType.INBOUND,
        sms = PhoneNumberCapabilityType.INBOUND_OUTBOUND
    )
    search_poller = phone_numbers_client.begin_search_available_phone_numbers(
        "US",
        PhoneNumberType.TOLL_FREE,
        PhoneNumberAssignmentType.APPLICATION,
        capabilities,
        polling = True
    )
    search_result = search_poller.result()
    print ('Search id: ' + search_result.search_id)
    phone_number_list = search_result.phone_numbers
    print('Reserved phone numbers:')
    for phone_number in phone_number_list:
        print(phone_number)

except Exception as ex:
    print('Exception:')
    print(ex)
```

### Purchase Phone Numbers

The result of searching for phone numbers is a `PhoneNumberSearchResult`. This contains a `searchId` which can be passed to the purchase numbers API to acquire the numbers in the search. Note that calling the purchase phone numbers API will result in a charge to your Azure Account.

```python
import os
from azure.communication.phonenumbers import (
    PhoneNumbersClient,
    PhoneNumberCapabilityType,
    PhoneNumberAssignmentType,
    PhoneNumberType,
    PhoneNumberCapabilities
)
from azure.identity import DefaultAzureCredential

# You can find your endpoint from your resource in the Azure portal
endpoint = 'https://<RESOURCE_NAME>.communication.azure.com'
try:
    print('Azure Communication Services - Phone Numbers Quickstart')
    credential = DefaultAzureCredential()
    phone_numbers_client = PhoneNumbersClient(endpoint, credential)
    capabilities = PhoneNumberCapabilities(
        calling = PhoneNumberCapabilityType.INBOUND,
        sms = PhoneNumberCapabilityType.INBOUND_OUTBOUND
    )
    search_poller = phone_numbers_client.begin_search_available_phone_numbers(
        "US",
        PhoneNumberType.TOLL_FREE,
        PhoneNumberAssignmentType.APPLICATION,
        capabilities,
        area_code="833",
        polling = True
    )
    search_result = poller.result()
    print ('Search id: ' + search_result.search_id)
    phone_number_list = search_result.phone_numbers
    print('Reserved phone numbers:')
    for phone_number in phone_number_list:
        print(phone_number)

    purchase_poller = phone_numbers_client.begin_purchase_phone_numbers(search_result.search_id, polling = True)
    purchase_poller.result()
    print("The status of the purchase operation was: " + purchase_poller.status())
except Exception as ex:
    print('Exception:')
    print(ex)
```

### Get purchased phone number(s)

After a purchasing number, you can retrieve it from the client.

```python
purchased_phone_number_information = phone_numbers_client.get_purchased_phone_number("+18001234567")
print('Phone number: ' + purchased_phone_number_information.phone_number)
print('Country code: ' + purchased_phone_number_information.country_code)
```

You can also retrieve all the purchased phone numbers.

```python
purchased_phone_numbers = phone_numbers_client.list_purchased_phone_numbers()
print('Purchased phone numbers:')
for purchased_phone_number in purchased_phone_numbers:
    print(purchased_phone_number.phone_number)
```

### Update Phone Number Capabilities

You can update the capabilities of a previously purchased phone number.
```python
update_poller = phone_numbers_client.begin_update_phone_number_capabilities(
    "+18001234567",
    PhoneNumberCapabilityType.OUTBOUND,
    PhoneNumberCapabilityType.OUTBOUND,
    polling = True
)
update_poller.result()
print('Status of the operation: ' + update_poller.status())
```

### Release Phone Number

You can release a purchased phone number.

```python
release_poller = phone_numbers_client.begin_release_phone_number("+18001234567")
release_poller.result()
print('Status of the operation: ' + release_poller.status())
```

## Run the code

From a console prompt, navigate to the directory containing the phone_numbers_sample.py file, then execute the following Python command to run the app.

```console
python phone_numbers_sample.py
```



**Applies to: programming-language-javascript**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/phone-numbers-quickstart)

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Node.js](https://nodejs.org/) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

### Prerequisite check

- In a terminal or command window, run `node --version` to check that Node.js is installed.

## Setting up

### Create a new Node.js Application

First, open your terminal or command window, create a new directory for your app, and navigate to it.

```console
mkdir phone-numbers-quickstart && cd phone-numbers-quickstart
```

Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```

Create a file called **phone-numbers-quickstart.js** in the root of the directory you just created. Add the following snippet to it:

```javascript
async function main() {
    // quickstart code will here
}

main();
```

### Install the package

Use the `npm install` command to install the Azure Communication Services Phone Numbers client library for JavaScript.

```console
npm install @azure/communication-phone-numbers --save
```

The `--save` option adds the library as a dependency in your **package.json** file.

## Authenticate the client

Import the **PhoneNumbersClient** from the client library and instantiate it with your connection string. The code below retrieves the connection string for the resource from an environment variable named `COMMUNICATION_SERVICES_CONNECTION_STRING`. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

Add the following code to the top of **phone-numbers-quickstart.js**:

```javascript
const { PhoneNumbersClient } = require('@azure/communication-phone-numbers');

// This code demonstrates how to fetch your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// Instantiate the phone numbers client
const phoneNumbersClient = new PhoneNumbersClient(connectionString);
```

## Manage phone numbers

### Search for available phone numbers

In order to purchase phone numbers, you must first search for available phone numbers. To search for phone numbers, provide the area code, assignment type, [phone number capabilities](../../concepts/telephony/plan-solution.md#phone-number-capabilities-in-azure-communication-services), [phone number type](../../concepts/telephony/plan-solution.md#phone-number-types-in-azure-communication-services), and quantity. Note that for the toll-free phone number type, providing the area code is optional.

Add the following snippet to your `main` function:

```javascript
/**
 * Search for Available Phone Number
 */

// Create search request
const searchRequest = {
    countryCode: "US",
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: {
      sms: "outbound",
      calling: "none"
    },
    areaCode: "833",
    quantity: 1
  };

const searchPoller = await phoneNumbersClient.beginSearchAvailablePhoneNumbers(searchRequest);

// The search is underway. Wait to receive searchId.
const { searchId, phoneNumbers } = await searchPoller.pollUntilDone();
const phoneNumber = phoneNumbers[0];

console.log(`Found phone number: ${phoneNumber}`);
console.log(`searchId: ${searchId}`);
```

### Purchase phone number

The result of searching for phone numbers is a `PhoneNumberSearchResult`. This contains a `searchId` which can be passed to the purchase numbers API to acquire the numbers in the search. Note that calling the purchase phone numbers API will result in a charge to your Azure Account.

Add the following snippet to your `main` function:

```javascript
/**
 * Purchase Phone Number
 */

const purchasePoller = await phoneNumbersClient.beginPurchasePhoneNumbers(searchId);

// Purchase is underway.
await purchasePoller.pollUntilDone();
console.log(`Successfully purchased ${phoneNumber}`);
```

### Update phone number capabilities

With a phone number now purchased, add the following code to update its capabilities:

```javascript
/**
 * Update Phone Number Capabilities
 */

// Create update request.
// This will update phone number to send and receive sms, but only send calls.
const updateRequest = {
  sms: "inbound+outbound",
  calling: "outbound"
};

const updatePoller = await phoneNumbersClient.beginUpdatePhoneNumberCapabilities(
  phoneNumber,
  updateRequest
);

// Update is underway.
await updatePoller.pollUntilDone();
console.log("Phone number updated successfully.");
```

### Get purchased phone number(s)

After a purchasing number, you can retrieve it from the client. Add the following code to your `main` function to get the phone number you just purchased:

```javascript
/**
 * Get Purchased Phone Number
 */

const { capabilities } = await phoneNumbersClient.getPurchasedPhoneNumber(phoneNumber);
console.log("These capabilities:", capabilities, "should be the same as these:", updateRequest, ".");
```

You can also retrieve all the purchased phone numbers.

```javascript
const purchasedPhoneNumbers = await phoneNumbersClient.listPurchasedPhoneNumbers();

for await (const purchasedPhoneNumber of purchasedPhoneNumbers) {
  console.log(`Phone number: ${purchasedPhoneNumber.phoneNumber}, country code: ${purchasedPhoneNumber.countryCode}.`);
}
```

### Release phone number

You can now release the purchased phone number. Add the code snippet below to your `main` function:

```javascript
/**
 * Release Purchased Phone Number
 */

const releasePoller = await phoneNumbersClient.beginReleasePhoneNumber(phoneNumber);

// Release is underway.
await releasePoller.pollUntilDone();
console.log("Successfully release phone number.");
```

## Run the code

Use the `node` command to run the code you added to the **phone-numbers-quickstart.js** file.

```console
node phone-numbers-quickstart.js
```


## Troubleshooting

Common Questions and Issues:

- When a phone number is released, the phone number shows up in your ACS resource on Azure portal until the end of the billing cycle. It also can't be repurchased until the end of the billing cycle.

- When a Communication Services resource is deleted, the phone numbers associated with that resource are automatically released at the same time.

## Next steps

In this quickstart you learned how to:

> 
> * Purchase a phone number
> * Manage your phone number
> * Release a phone number
> * Submit toll-free verification application [(see if required)](../../concepts/sms/sms-faq.md#toll-free-verification)

> 
> [Send an SMS](../sms/send.md)
> 
> 
> [Toll-free verification](../../concepts/sms/sms-faq.md#toll-free-verification)
>
> 
> [Build workflow for outbound calls using the purchased phone numbers](../call-automation/quickstart-make-an-outbound-call.md)
>
> 
> [Get started with calling in applications](../voice-video-calling/getting-started-with-calling.md)
>
> 
> [Send SMS globally with Messaging Connect](../../concepts/sms/messaging-connect.md)
