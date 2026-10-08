---
title: Look up operator information for a phone number using Azure Communication Services
description: This article describes how to look up operator information for any phone number using Azure Communication Services.
services: azure-communication-services
author: ericasp
manager: danielav
ms.service: azure-communication-services
ms.subservice: pstn
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 08/10/2023
ms.topic: quickstart
ms.author: ericasp
zone_pivot_groups: acs-js-csharp-java-python
---

# Look up operator information for a phone number using Azure Communication Services


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: programming-language-javascript**

Get started with the Phone Numbers client library for JavaScript to look up operator information for phone numbers. Use the operator information to determine whether and how to communicate with that phone number. Follow these steps to install the package and look up operator information about a phone number.

> **Note:**
> To view the source code for this example, see [Manage Phone Numbers - JavaScript | GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/lookup-phone-number).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Node.js](https://nodejs.org/) Active LTS _(long-term support)_ and Maintenance LTS versions (8.11.1 and 10.14.1 recommended).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

### Prerequisite check

In a terminal or command window, run the `node --version` command to check that Node.js is installed.

## Setting up

To set up an environment for sending lookup queries, take the steps in the following sections.

### Create a new Node.js Application

In a terminal or command window, create a new directory for your app and navigate to it.

```console
mkdir number-lookup-quickstart && cd number-lookup-quickstart
```

Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```

Create a file called **number-lookup-quickstart.js** in the root of the directory you created. Add the following snippet to it:

```javascript
async function main() {
    // quickstart code will go here
}

main();
```

### Install the package

Use the `npm install` command to install the Azure Communication Services Phone Numbers client library for JavaScript.

```console
npm install @azure/communication-phone-numbers@1.3.0 --save
```

The `--save` option adds the library as a dependency in your **package.json** file.

## Code examples

### Authenticate the client

Import the **PhoneNumbersClient** from the client library and instantiate it with your connection string, which can be acquired from an Azure Communication Services resource in the [Azure portal](https://portal.azure.com). Using a `COMMUNICATION_SERVICES_CONNECTION_STRING` environment variable is recommended to avoid putting your connection string in plain text within your code. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

Add the following code to the top of **number-lookup-quickstart.js**:

```javascript
const { PhoneNumbersClient } = require('@azure/communication-phone-numbers');

// This code retrieves your connection string from an environment variable
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// Instantiate the phone numbers client
const phoneNumbersClient = new PhoneNumbersClient(connectionString);
```

### Look up phone number formatting

To search for a phone number's operator information, call `searchOperatorInformation` from the `PhoneNumbersClient`.

```javascript
let formattingResults = await phoneNumbersClient.searchOperatorInformation([ "<target-phone-number>" ]);
```

Replace `<target-phone-number>` with the phone number you're looking up, usually a number you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123.

### Look up operator information for a number

To search for a phone number's operator information, call `searchOperatorInformation` from the `PhoneNumbersClient`, passing `true` for the `includeAdditionalOperatorDetails` option.

```javascript
let searchResults = await phoneNumbersClient.searchOperatorInformation([ "<target-phone-number>" ], { "includeAdditionalOperatorDetails": true });
```

> **Warning:**
> Using this function incurs a charge to your account.

### Use operator information

You can now use the operator information. For this quickstart guide, we can print some of the details to the console.

First, we can print details about the number format.

```javascript
let formatInfo = formattingResults.values[0];
console.log(formatInfo.phoneNumber + " is formatted " + formatInfo.internationalFormat + " internationally, and " + formatInfo.nationalFormat + " nationally");
```

Next, we can print details about the phone number and operator.

```javascript
let operatorInfo = searchResults.values[0];
console.log(operatorInfo.phoneNumber + " is a " + (operatorInfo.numberType ? operatorInfo.numberType : "unknown") + " number, operated in "
    + operatorInfo.isoCountryCode + " by " + (operatorInfo.operatorDetails.name ? operatorInfo.operatorDetails.name : "an unknown operator"));
```

You can also use the operator information to determine whether to send an SMS. For more information, see [Send an SMS message](../sms/send.md).

## Run the code

Run the application from your terminal or command window with the `node` command.

```console
node number-lookup-quickstart.js
```

## Sample code

You can download the sample app from [Manage Phone Numbers - JavaScript | GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/lookup-phone-number)).



**Applies to: programming-language-csharp**

Get started with the Phone Numbers client library for C# to look up operator information for phone numbers. Use the operator information to determine whether and how to communicate with that phone number. Follow these steps to install the package and look up operator information about a phone number.

> **Note:**
> To view the source code for this example, see [Manage Phone Numbers - C# | GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/LookupNumber).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [.NET Core client library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

### Prerequisite check

In a terminal or command window, run the `dotnet` command to check that the .NET SDK is installed.

## Setting up

To set up an environment for sending lookup queries, take the steps in the following sections.

### Create a new C# application

In a terminal or command window, run the `dotnet new` command to create a new console app with the name `NumberLookupQuickstart`. This command creates a simple "Hello World" C# project with a single source file, **Program.cs**.

```console
dotnet new console -o NumberLookupQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd NumberLookupQuickstart
dotnet build
```

### Connect to dev package feed
The public preview version of the SDK is published to a dev package feed. You can add the dev feed using the [NuGet CLI](https://learn.microsoft.com/nuget/reference/nuget-exe-cli-reference), which adds it to the NuGet.Config file.

```console
nuget sources add -Name "Azure SDK for .NET Dev Feed" -Source "https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-net/nuget/v3/index.json"
```

More detailed information and other options for connecting to the dev feed can be found in the [contributing guide](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md#nuget-package-dev-feed).

### Install the package

While still in the application directory, install the Azure Communication Services PhoneNumbers client library for .NET package by using the following command.

```console
dotnet add package Azure.Communication.PhoneNumbers --version 1.3.0
```

Add a `using` directive to the top of **Program.cs** to include the `Azure.Communication` namespace.

```csharp
using System;
using System.Threading.Tasks;
using Azure.Communication.PhoneNumbers;
```

Update `Main` function signature to be async.

```csharp
internal class Program
{
    static async Task Main(string[] args)
    {
        ...
    }
}
```

## Code examples

### Authenticate the client

Phone Number clients can be authenticated using connection string acquired from an Azure Communication Services resource in the [Azure portal](https://portal.azure.com). Using a `COMMUNICATION_SERVICES_CONNECTION_STRING` environment variable is recommended to avoid putting your connection string in plain text within your code. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

```csharp
// This code retrieves your connection string from an environment variable.
string? connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING");

PhoneNumbersClient client = new PhoneNumbersClient(connectionString, new PhoneNumbersClientOptions(PhoneNumbersClientOptions.ServiceVersion.V2024_03_01_Preview));
```

Phone Number clients can also authenticate with Microsoft Entra authentication. With this option,
`AZURE_CLIENT_SECRET`, `AZURE_CLIENT_ID`, and `AZURE_TENANT_ID` environment variables need to be set up for authentication.

```csharp
// Get an endpoint to our Azure Communication Services resource.
Uri endpoint = new Uri("<endpoint_url>");
TokenCredential tokenCredential = new DefaultAzureCredential();
client = new PhoneNumbersClient(endpoint, tokenCredential);
```

### Look up phone number formatting

To look up the national and international formatting for a number, call  `SearchOperatorInformationAsync` from the `PhoneNumbersClient`.

```csharp
OperatorInformationResult formattingResult = await client.SearchOperatorInformationAsync(new[] { "<target-phone-number>" });
```

Replace `<target-phone-number>` with the phone number you're looking up, usually a number you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123.

### Look up operator information for a number

To search for a phone number's operator information, call `SearchOperatorInformationAsync` from the `PhoneNumbersClient`, passing `true` for the `IncludeAdditionalOperatorDetails` option.

```csharp
OperatorInformationResult searchResult = await client.SearchOperatorInformationAsync(new[] { "<target-phone-number>" }, new OperatorInformationOptions() { IncludeAdditionalOperatorDetails = true });
```

> **Warning:**
> Using this function incurs a charge to your account.

### Use operator information

You can now use the operator information. For this quickstart guide, we can print some of the details to the console.

First, we can print details about the number format.

```csharp
OperatorInformation formattingInfo = formattingResult.Values[0];
Console.WriteLine($"{formattingInfo.PhoneNumber} is formatted {formattingInfo.InternationalFormat} internationally, and {formattingInfo.NationalFormat} nationally");
```

Next, we can print details about the phone number and operator.

```csharp
OperatorInformation operatorInformation = searchResult.Values[0];
Console.WriteLine($"{operatorInformation.PhoneNumber} is a {operatorInformation.NumberType ?? "unknown"} number, operated in {operatorInformation.IsoCountryCode} by {operatorInformation.OperatorDetails.Name ?? "an unknown operator"}");
```

You can also use the operator information to determine whether to send an SMS. For more information about sending an SMS, see [Send an SMS message](../sms/send.md).

## Run the code

Run the application from your terminal or command window with the `dotnet run` command.

```console
dotnet run --interactive
```

## Sample code

You can download the sample app from [Manage Phone Numbers - C# | GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/LookupNumber).



**Applies to: programming-language-java**

Get started with the Phone Numbers client library for Java to look up operator information for phone numbers. Use the operator information to determine whether and how to communicate with that phone number. Follow these steps to install the package and look up operator information about a phone number.

> **Note:**
> To view the source code for this example, see [Manage Phone Numbers - Java | GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/LookupNumber).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/?preserve-view=true\&view=azure-java-stable) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

### Prerequisite check

In a terminal or command window, run the `mvn -v` command to check that Maven is installed.

## Setting up

To set up an environment for sending lookup queries, take the steps in the following sections.

### Create a new Java application

In a terminal or command window, navigate to the directory where you'd like to create your Java application. Run the following command to generate the Java project from the maven-archetype-quickstart template.

```console
mvn archetype:generate -DgroupId=com.communication.lookup.quickstart -DartifactId=communication-lookup-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

The 'generate' task creates a directory with the same name as the `artifactId`. Under this directory, the src/main/java directory contains the project source code, the `src/test/java directory` contains the test source, and the `pom.xml` file is the project's Project Object Model, or POM.

### Connect to dev package feed
The public preview version of the SDK is published to a dev package feed. To connect to the dev feed, open the **pom.xml** file in your text editor and add the dev repo to **both** your pom.xml's `<repositories>` and `<distributionManagement>` sections that you can add if they don't already exist.

```xml
<repository>
  <id>azure-sdk-for-java</id>
  <url>https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-java/maven/v1</url>
  <releases>
    <enabled>true</enabled>
  </releases>
  <snapshots>
    <enabled>true</enabled>
  </snapshots>
</repository>
```

You might need to add or edit the `settings.xml` file in `${user.home}/.m2`

```xml
<server>
  <id>azure-sdk-for-java</id>
  <username>azure-sdk</username>
  <password>[PERSONAL_ACCESS_TOKEN]</password>
</server>
```

You can generate a [Personal Access Token](https://dev.azure.com/azure-sdk/_details/security/tokens) with _Packaging_ read & write scopes and paste it into the `<password>` tag.

More detailed information and other options for connecting to the dev feed can be found [here](https://dev.azure.com/azure-sdk/public/_artifacts/feed/azure-sdk-for-java/connect).

### Install the package
Add the following dependency elements to the group of dependencies in the **pom.xml** file.

```xml
<dependencies>
  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-common</artifactId>
    <version>1.0.0</version>
  </dependency>

  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-phonenumbers</artifactId>
    <version>1.2.0</version>
  </dependency>

  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.2.3</version>
  </dependency>

  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-core</artifactId>
    <version>1.41.0</version>
  </dependency>
</dependencies>
```

Check the `properties` section to ensure your project is targeting Maven version 1.8 or above.

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

## Code examples

### Set up the app framework

From the project directory:

1. Navigate to the */src/main/java/com/communication/lookup/quickstart* directory
1. Open the *App.java* file in your editor
1. Replace the `System.out.println("Hello world!");` statement
1. Add `import` directives

Use the following code to begin:

```java
package com.communication.lookup.quickstart;

import com.azure.communication.phonenumbers.*;
import com.azure.communication.phonenumbers.models.*;
import com.azure.core.http.rest.*;
import com.azure.core.util.Context;
import com.azure.identity.*;
import java.io.*;
import java.util.ArrayList;

public class App
{
    public static void main( String[] args ) throws IOException
    {
        System.out.println("Azure Communication Services - Number Lookup Quickstart");
        // Quickstart code goes here
    }
}
```

### Authenticate the client

The client can be authenticated using a connection string acquired from an Azure Communication Services resource in the [Azure portal](https://portal.azure.com). Using a `COMMUNICATION_SERVICES_CONNECTION_STRING` environment variable is recommended to avoid putting your connection string in plain text within your code. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).
<!-- embedme ./src/samples/java/com/azure/communication/phonenumbers/ReadmeSamples.java#L30-L41 -->
```java
// This code retrieves your connection string from an environment variable
String connectionString = System.getenv("COMMUNICATION_SERVICES_CONNECTION_STRING");

PhoneNumbersClient phoneNumberClient = new PhoneNumbersClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

Alternatively, you can authenticate using Microsoft Entra authentication. Using the `DefaultAzureCredentialBuilder` is the easiest way to get started with Microsoft Entra ID. You can acquire your resource name from an Azure Communication Services resource in the [Azure portal](https://portal.azure.com).
<!-- embedme ./src/samples/java/com/azure/communication/phonenumbers/ReadmeSamples.java#L52-L62 -->
```java
// You can find your resource name from your resource in the Azure portal
String endpoint = "https://<RESOURCE_NAME>.communication.azure.com";

PhoneNumbersClient phoneNumberClient = new PhoneNumbersClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

### Look up phone number formatting

To look up the national and international formatting for a number, call `searchOperatorInformation` from the `PhoneNumbersClient`.

```java
ArrayList<String> phoneNumbers = new ArrayList<String>();
phoneNumbers.add("<target-phone-number>");

// Use the free number lookup functionality to get number formatting information
OperatorInformationResult formattingResult = phoneNumberClient.searchOperatorInformation(phoneNumbers);
OperatorInformation formattingInfo = formattingResult.getValues().get(0);
```

Replace `<target-phone-number>` with the phone number you're looking up, usually a number you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123.

### Look up operator information for a number

To search for a phone number's operator information, call `searchOperatorInformationWithResponse` from the `PhoneNumbersClient`, passing `true` for the `IncludeAdditionalOperatorDetails` option.

```java
OperatorInformationOptions options = new OperatorInformationOptions();
options.setIncludeAdditionalOperatorDetails(true);
Response<OperatorInformationResult> result = phoneNumberClient.searchOperatorInformationWithResponse(phoneNumbers, options, Context.NONE);
OperatorInformation operatorInfo = result.getValue().getValues().get(0);
```

> **Warning:**
> Using this function incurs a charge to your account.

### Use operator information

You can now use the operator information. For this quickstart guide, we can print some of the details to the console.

First, we can print details about the number format.

```java
System.out.println(formattingInfo.getPhoneNumber() + " is formatted "
    + formattingInfo.getInternationalFormat() + " internationally, and "
    + formattingInfo.getNationalFormat() + " nationally");
```

Next, we can print details about the phone number and operator.

```java
String numberType = operatorInfo.getNumberType() == null ? "unknown" : operatorInfo.getNumberType().toString();
String operatorName = "an unknown operator";
if (operatorInfo.getOperatorDetails()!= null && operatorInfo.getOperatorDetails().getName() != null)
{
    operatorName = operatorInfo.getOperatorDetails().getName();
}
System.out.println(operatorInfo.getPhoneNumber() + " is a " + numberType + " number, operated in "
    + operatorInfo.getIsoCountryCode() + " by " + operatorName);
```

You can also use the operator information to determine whether to send an SMS. For more information, see [Send an SMS message](../sms/send.md).

## Run the code

Run the application from your terminal or command window with the following commands:
Navigate to the directory containing the *pom.xml* file and compile the project.

```console
mvn compile
```

Then, build the package.

```console
mvn package
```

To execute the app, use the `mvn` command.

```console
mvn exec:java -D"exec.mainClass"="com.communication.lookup.quickstart.App" -D"exec.cleanupDaemonThreads"="false"
```

## Sample code

You can download the sample app from [Manage Phone Numbers - Java | GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/LookupNumber).



**Applies to: programming-language-python**

Get started with the Phone Numbers client library for Python to look up operator information for phone numbers. Use the operator information to determine whether and how to communicate with that phone number. Follow these steps to install the package and look up operator information about a phone number.

> **Note:**
> To view the source code for this example, see [Manage Phone Numbers - Python | GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/lookup-phone-numbers-quickstart).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python](https://www.python.org/downloads/) 3.7+.
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).

### Prerequisite check

In a terminal or command window, run the `python --version` command to check that Python is installed.

## Setting up

To set up an environment for sending lookup queries, take the steps in the following sections.

### Create a new Python application

In a terminal or command window, create a new directory for your app and navigate to it.

```console
mkdir number-lookup-quickstart && cd number-lookup-quickstart
```

Use a text editor to create a file called `number_lookup_sample.py` in the project root directory and add the following code. The remaining quickstart code is added in the following sections.

```python
import os
from azure.communication.phonenumbers import PhoneNumbersClient

try:
   print('Azure Communication Services - Number Lookup Quickstart')
   # Quickstart code goes here
except Exception as ex:
   print('Exception:')
   print(ex)
```

### Install the package

While still in the application directory, install the Azure Communication Services PhoneNumbers client library for Python package by using the `pip install` command.

```console
pip install azure-communication-phonenumbers==1.2.0
```

## Code examples

### Authenticate the client

The client can be authenticated using a connection string acquired from an Azure Communication Services resource in the [Azure portal](https://portal.azure.com). Using a `COMMUNICATION_SERVICES_CONNECTION_STRING` environment variable is recommended to avoid putting your connection string in plain text within your code. Learn how to [manage your resource's connection string](../create-communication-resource.md#store-your-connection-string).

```python
# This code retrieves your connection string from an environment variable
connection_string = os.getenv('COMMUNICATION_SERVICES_CONNECTION_STRING')
try:
    phone_numbers_client = PhoneNumbersClient.from_connection_string(connection_string)
except Exception as ex:
    print('Exception:')
    print(ex)
```

Alternatively, the client can be authenticated using Microsoft Entra authentication. Using the `DefaultAzureCredential` object is the easiest way to get started with Microsoft Entra ID and you can install it using the `pip install` command.

```console
pip install azure-identity
```

Creating a `DefaultAzureCredential` object requires you to have `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID` already set as environment variables with their corresponding values from your registered Microsoft Entra application.

For a ramp-up on how to get these environment variables, you can learn how to [set up service principals from CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli-service-principal).

Once the `azure-identity` library is installed, you can continue authenticating the client.

```python
from azure.identity import DefaultAzureCredential

# You can find your endpoint from your resource in the Azure portal
endpoint = 'https://<RESOURCE_NAME>.communication.azure.com'
try:
    credential = DefaultAzureCredential()
    phone_numbers_client = PhoneNumbersClient(endpoint, credential)
except Exception as ex:
    print('Exception:')
    print(ex)
```

### Look up phone number formatting

To look up the national and international formatting for a number, call `search_operator_information` from the `PhoneNumbersClient`.

```python
formatting_results = phone_numbers_client.search_operator_information("<target-phone-number>")
```

Replace `<target-phone-number>` with the phone number you're looking up, usually a number you'd like to send a message to.

> **Warning:**
> Provide phone numbers in E.164 international standard format, for example, +14255550123.

### Look up operator information for a number

To search for a phone number's operator information, call `search_operator_information` from the `PhoneNumbersClient`, passing `True` for the `include_additional_operator_details` option.

```python
options = { "include_additional_operator_details": True }
operator_results = phone_numbers_client.search_operator_information("<target-phone-number>", options=options)
```

> **Warning:**
> Using this function incurs a charge to your account.

### Use operator information

You can now use the operator information. For this quickstart guide, we can print some of the details to the console.

First, we can print details about the number format.

```python
formatting_info = formatting_results.values[0]
print(str.format("{0} is formatted {1} internationally, and {2} nationally", formatting_info.phone_number, formatting_info.international_format, formatting_info.national_format))
```

Next, we can print details about the phone number and operator.

```python
operator_information = operator_results.values[0]

number_type = operator_information.number_type if operator_information.number_type else "unknown"
if operator_information.operator_details is None or operator_information.operator_details.name is None:
    operator_name = "an unknown operator"
else:
    operator_name = operator_information.operator_details.name

print(str.format("{0} is a {1} number, operated in {2} by {3}", operator_information.phone_number, number_type, operator_information.iso_country_code, operator_name))
```

You can also use the operator information to determine whether to send an SMS. For more information about sending an SMS, see [Send an SMS message](../sms/send.md).

## Run the code

Run the application from your terminal or command window with the `python` command.

```console
python number_lookup_sample.py
```

## Sample code

You can download the sample app from [Manage Phone Numbers - Python | GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/lookup-phone-numbers-quickstart).



## Troubleshooting

Common questions and issues:

- Changes to environment variables might not take effect in programs that are already running. If you notice your environment variables aren't working as expected, try closing and reopening any programs you're using to run and edit code.
- The data returned by this endpoint is subject to various international laws and regulations, therefore the accuracy of the results depends on several factors. These factors include whether the number was ported, the country code, and the approval status of the caller. Based on these factors, operator information might not be available for some phone numbers or could reflect the original operator of the phone number, not the current operator.

## Next steps

This article described how to:
> 
> * Look up number formatting
> * Look up operator information for a phone number

> 
> [Number Lookup Concept](../../concepts/numbers/number-lookup-concept.md)

> 
> [Number Lookup SDK](../../concepts/numbers/number-lookup-sdk.md)
