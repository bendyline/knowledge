---
title: Use Microsoft Entra ID in Communication Services
titleSuffix: An Azure Communication Services quickstart
description: Microsoft Entra ID lets you authorize Azure Communication Services access from applications running in Azure VMs, function apps, and other resources.
services: azure-communication-services
author: peiliu
ms.service: azure-communication-services
ms.subservice: identity
ms.topic: quickstart
ms.date: 06/30/2021
ms.author: peiliu
ms.reviewer: mikben
zone_pivot_groups: acs-azcli-js-csharp-java-python
ms.custom: mode-other, devx-track-extended-java, devx-track-js, devx-track-python
---

# Quickstart: Authenticate using Microsoft Entra ID


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services by using Microsoft Entra ID. The Communication Services Identity and SMS SDKs support Microsoft Entra authentication.

This quickstart shows you how to authorize access to the Identity and SMS SDKs from an Azure environment that supports Active Directory. It also describes how to test your code in a development environment by creating a service principal for your work.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An active Azure Communication Services resource, see [create a Communication Services resource](../create-communication-resource.md) if you do not have one.
- To send an SMS you will need a [Phone Number](../telephony/get-phone-number.md).
- A setup Service Principal for a development environment, see [Authorize access with service principal](service-principal.md?pivots=platform-azcli)

**Applies to: platform-azcli**

## Additional Prerequisites

 - Azure CLI. [Installation guide](https://learn.microsoft.com/cli/azure/install-azure-cli)

## Setting Up

When using Active Directory for other Azure Resources, you should be using Managed identities. To learn how to enable managed identities for Azure Resources, see one of these articles:

- [Azure portal](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/qs-configure-portal-windows-vm)
- [Azure PowerShell](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/qs-configure-powershell-windows-vm)
- [Azure CLI](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/qs-configure-cli-windows-vm)
- [Azure Resource Manager template](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/qs-configure-template-windows-vm)
- [Azure Resource Manager SDKs](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/qs-configure-sdk-windows-vm)
- [App services](../../../app-service/overview-managed-identity.md)

## Authenticate a registered application in the development environment

If your development environment doesn't support single sign-on or login via a web browser, then you can use a registered application to authenticate from the development environment.

<a name='creating-an-azure-active-directory-registered-application'></a>

### Creating a Microsoft Entra registered Application

To create a registered application from the Azure CLI, you need to be logged in to the Azure account where you want the operations to take place. To do this, you can use the `az login` command and enter your credentials in the browser. Once you're logged in to your Azure account from the CLI, we can call the `az ad sp create-for-rbac` command to create the registered application and service principal.

The following example uses the Azure CLI to create a new registered application:

```azurecli
az ad sp create-for-rbac --name <application-name> --role Contributor --scopes /subscriptions/<subscription-id>
```

The `az ad sp create-for-rbac` command will return a list of service principal properties in JSON format. Copy these values so that you can use them to create the necessary environment variables in the next step.

```json
{
    "appId": "generated-app-ID",
    "displayName": "service-principal-name",
    "name": "http://service-principal-uri",
    "password": "generated-password",
    "tenant": "tenant-ID"
}
```
> **Important:**
> Azure role assignments may take a few minutes to propagate.

#### Set environment variables

The Azure Identity SDK reads values from three environment variables at runtime to authenticate the application. The following table describes the value to set for each environment variable.

| Environment variable | Value |
| --- | --- |
| `AZURE_CLIENT_ID` | `appId` value from the generated JSON |
| `AZURE_TENANT_ID` | `tenant` value from the generated JSON |
| `AZURE_CLIENT_SECRET` | `password` value from the generated JSON |

> **Important:**
> After you set the environment variables, close and re-open your console window. If you're using Visual Studio or another development environment, you may need to restart it in order for it to register the new environment variables.

Once these variables have been set, you should be able to use the DefaultAzureCredential object in your code to authenticate to the service client of your choice.



**Applies to: programming-language-csharp**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/use-managed-Identity)

## Overview

This quickstart demonstrates how to use managed identities via Azure Service Principals to authenticate with Azure Communication Services. It provides examples for issuing an access token for Voice over IP (VoIP) calls and sending SMS messages.

## Setting up

### Create a new C# application

The goal is to create a new console application in C# to run the quickstart code. Open a terminal window (e.g., Command Prompt, PowerShell, or Bash) and execute the following command to create a new console app named `ActiveDirectoryAuthenticationQuickstart`:

```console
dotnet new console -o ActiveDirectoryAuthenticationQuickstart
```

This command will generate a simple "Hello World" C# project, including a single source file: `Program.cs`.

### Build the Application

Navigate to the newly created app folder and compile your application using the `dotnet build` command:

```console
cd ActiveDirectoryAuthenticationQuickstart
dotnet build
```

### Install the Required SDK Packages

To interact with Azure Communication Services and Azure Identity, add the following NuGet packages to your project:

```console
dotnet add package Azure.Communication.Identity
dotnet add package Azure.Communication.Sms
dotnet add package Azure.Identity
```

### Update the Program.cs file

To use the installed Azure SDK packages, include the following `using` directives at the top of your `Program.cs` file:

```csharp
using Azure.Identity;
using Azure.Communication.Identity;
using Azure.Communication.Sms;
using Azure.Core;
using Azure;
```

## Authenticate with DefaultAzureCredential

For this quickstart, we'll use the [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential), which is suitable for both development and production environments. Declare an instance of this credential at the class level in `Program.cs`:

```csharp
private DefaultAzureCredential credential = new DefaultAzureCredential();
```

## Issue a token with service principals

Add the following method to your `Program.cs` file. This method uses the Azure Communication Services SDK to issue a VoIP Access Token:

```csharp
public AccessToken CreateIdentityAndGetTokenAsync(Uri resourceEndpoint)
{
    var client = new CommunicationIdentityClient(resourceEndpoint, this.credential);
    var result = client.CreateUserAndToken(scopes: new[] { CommunicationTokenScope.VoIP });
    var (user, token) = response.Value;
    return token;
}
```

## Send an SMS with service principals

To demonstrate sending an SMS, add the following method to your `Program.cs` file. This method uses the Azure Communication Services SDK to send an SMS message:

```csharp
public SmsSendResult SendSms(Uri resourceEndpoint, string from, string to, string message)
{
    SmsClient smsClient = new SmsClient(resourceEndpoint, this.credential);
    SmsSendResult sendResult = smsClient.Send(
            from: from,
            to: to,
            message: message,
            new SmsSendOptions(enableDeliveryReport: true) // optional
        );

    return sendResult;
}
```

## Write the Main method

In the `Main` method of your `Program.cs` file, add code to call the methods you created for issuing a token and sending an SMS. Your `Main` method should look similar to this:

```csharp
static void Main(string[] args)
{
    // Replace <RESOURCE_NAME> with your Communication Services resource name,
    // for example: "https://<RESOURCE_NAME>.communication.azure.com".
    Uri endpoint = new("https://<RESOURCENAME>.communication.azure.com/");

    // Create an instance of the Program class to invoke instance methods.
    Program instance = new();

    Console.WriteLine("Retrieving new Access Token, using Service Principals");
    AccessToken response = instance.CreateIdentityAndGetTokenAsync(endpoint);
    Console.WriteLine($"Retrieved Access Token: {response.Token}");

    Console.WriteLine("Sending SMS using Service Principals");

    // Replace with your Azure Communication Services phone number and the target phone number.
    SmsSendResult result = instance.SendSms(endpoint, "<Your Azure Communication Services Phone Number>", "<The Phone Number you'd like to send the SMS to.>", "Hello from using Service Principals");
    Console.WriteLine($"Sms id: {result.MessageId}");
    Console.WriteLine($"Send Result Successful: {result.Successful}");
}
```

Your final `Program.cs` file should look like this:

```csharp
class Program
     {
          private DefaultAzureCredential credential = new DefaultAzureCredential();
          static void Main(string[] args)
          {
               // Replace <RESOURCE_NAME> with your Communication Services resource name,
               // for example: "https://<RESOURCE_NAME>.communication.azure.com".
               Uri endpoint = new("https://acstestingrifox.communication.azure.com/");

               // Create an instance of the Program class to invoke instance methods.
               Program instance = new();

               Console.WriteLine("Retrieving new Access Token, using Service Principals");
               AccessToken response = instance.CreateIdentityAndGetTokenAsync(endpoint);
               Console.WriteLine($"Retrieved Access Token: {response.Token}");

               Console.WriteLine("Sending SMS using Service Principals");

               // Replace with your Azure Communication Services phone number and the target phone number.
               SmsSendResult result = instance.SendSms(endpoint, "<Your Azure Communication Services Phone Number>", "<The Phone Number you'd like to send the SMS to.>", "Hello from Service Principals");
               Console.WriteLine($"Sms id: {result.MessageId}");
               Console.WriteLine($"Send Result Successful: {result.Successful}");
          }
          public AccessToken CreateIdentityAndGetTokenAsync(Uri resourceEndpoint)
          {
               var client = new CommunicationIdentityClient(resourceEndpoint, this.credential);
               var result = client.CreateUserAndToken(scopes: new[] { CommunicationTokenScope.VoIP });
               var (user, token) = response.Value;
               return token;
          }
          public SmsSendResult SendSms(Uri resourceEndpoint, string from, string to, string message)
          {
               SmsClient smsClient = new SmsClient(resourceEndpoint, this.credential);
               SmsSendResult sendResult = smsClient.Send(
                    from: from,
                    to: to,
                    message: message,
                    new SmsSendOptions(enableDeliveryReport: true) // optional
               );

               return sendResult;
          }
    }
```

## Run the program

It is time to run your application and verify that it retrieves an access token and sends an SMS. Open a terminal, navigate to your application directory, and run:

```console
     dotnet run
```

The console output should appear as follows:

```Bash
     Retrieving new Access Token, using Service Principals
     Retrieved Access Token: ...
     Sending SMS using Service Principals
     Sms id: ...
     Send Result Successful: True
```


**Applies to: programming-language-javascript**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/use-managed-Identity)

## Setting up

### Create a new Node.js application

Open your terminal or command window create a new directory for your app, and navigate to it.

```console
mkdir active-directory-authentication-quickstart && cd active-directory-authentication-quickstart
```

Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```

### Install the SDK packages

```console
npm install @azure/communication-identity
npm install @azure/communication-common
npm install @azure/communication-sms
npm install @azure/identity
```

### Create a new file

Open a new file with a text editor and save it as `index.js`, we'll be placing our code inside this file.

### Use the SDK packages

Add the following `require` directives to the top of `index.js` to use the Azure Identity and Azure Storage SDKs.

```JavaScript
const { DefaultAzureCredential } = require("@azure/identity");
const { CommunicationIdentityClient, CommunicationUserToken } = require("@azure/communication-identity");
const { SmsClient, SmsSendRequest } = require("@azure/communication-sms");
```
## Create a DefaultAzureCredential

We'll be using the [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) for this quickstart. This credential is suitable for production and development environments. As it is needed for each operation let's create it within the top of our `index.js` file. 

```JavaScript
    const credential = new DefaultAzureCredential();
```

## Create an identity and issue a token with service principals

Next, we'll write a function which creates a new identity and issues a token for this identity, we'll use this later to test our service principal setup.

```JavaScript
async function createIdentityAndIssueToken(resourceEndpoint) {
    const client = new CommunicationIdentityClient(resourceEndpoint, credential);
    return await client.createUserAndToken(["chat"]);
}
```

## Send an SMS with service principals

Now, lets write a function which uses service principals to send an SMS:

```JavaScript
async function sendSms(resourceEndpoint, fromNumber, toNumber, message) {
    const smsClient = new SmsClient(resourceEndpoint, credential);
    const sendRequest = {
        from: fromNumber,
        to: [toNumber],
        message: message
    };
    return await smsClient.send(
        sendRequest,
        {} //Optional SendOptions
    );
}
```

## Write the main function

With our functions created we can now write a main function to call them and demonstrate the use of Service Principals:
```JavaScript
async function main() {
    // You can find your endpoint and access key from your resource in the Azure portal
    // e.g. "https://<RESOURCE_NAME>.communication.azure.com";
    const endpoint = "https://<RESOURCE_NAME>.communication.azure.com/"

    
    console.log("Retrieving new Access Token, using Service Principals");
    const result = await createIdentityAndIssueToken(endpoint);
    console.log(`Retrieved Access Token: ${result.token}`);

    console.log("Sending SMS using Service Principals");

    // You will need a phone number from your resource to send an SMS.
    const smsResult = await sendSms(endpoint, "<FROM NUMBER>", "<TO NUMBER>", "Hello from Service Principals");
    console.log(`SMS ID: ${smsResult[0].messageId}`);
    console.log(`Send Result Successful: ${smsResult[0].successful}`);
}

main();
```

The final `index.js` file should look like this:
```JavaScript
const { DefaultAzureCredential } = require("@azure/identity");
const { CommunicationIdentityClient, CommunicationUserToken } = require("@azure/communication-identity");
const { SmsClient, SmsSendRequest } = require("@azure/communication-sms");

const credential = new DefaultAzureCredential();

async function createIdentityAndIssueToken(resourceEndpoint) {
    const client = new CommunicationIdentityClient(resourceEndpoint, credential);
    return await client.createUserAndToken(["chat"]);
}

async function sendSms(resourceEndpoint, fromNumber, toNumber, message) {
    const smsClient = new SmsClient(resourceEndpoint, credential);
    const sendRequest = {
        from: fromNumber,
        to: [toNumber],
        message: message
    };
    return await smsClient.send(
        sendRequest,
        {} //Optional SendOptions
    );
}

async function main() {
    // You can find your endpoint and access key from your resource in the Azure portal
    // e.g. "https://<RESOURCE_NAME>.communication.azure.com";
    const endpoint = "https://<RESOURCE_NAME>.communication.azure.com/"

    
    console.log("Retrieving new Access Token, using Service Principals");
    const result = await createIdentityAndIssueToken(endpoint);
    console.log(`Retrieved Access Token: ${result.token}`);

    console.log("Sending SMS using Service Principals");

    // You will need a phone number from your resource to send an SMS.
    const smsResult = await sendSms(endpoint, "<FROM NUMBER>", "<TO NUMBER>", "Hello from Service Principals");
    console.log(`SMS ID: ${smsResult[0].messageId}`);
    console.log(`Send Result Successful: ${smsResult[0].successful}`);
}

main();
```

## Run the program

With everything complete, you can run the file by entering `node index.js` from your project's directory. If everything went well you should see something similar to the following.

```Bash
    $ node index.js
    Retrieving new Access Token, using Service Principals
    Retrieved Access Token: ey...Q
    Sending SMS using Service Principals
    SMS ID: ...
    Send Result Successful: true
```


**Applies to: programming-language-java**

## Additional prerequisites for Java
For Java, you'll also need:
- [Java Development Kit (JDK)](https://learn.microsoft.com/azure/developer/java/fundamentals/java-jdk-install) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/use-managed-Identity)

## Setting up

### Create a new Java application

Open your terminal or command window. Navigate to the directory where you'd like to create your Java application. Run the command below to generate the Java project from the maven-archetype-quickstart template.

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

You'll notice that the 'generate' task created a directory with the same name as the `artifactId`. Under this directory, the src/main/java directory contains the project source code, the `src/test/java directory` contains the test source, and the `pom.xml` file is the project's Project Object Model, or POM.

### Install the package

Open the **pom.xml** file in your text editor. Add the following dependency element to the group of dependencies.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-identity</artifactId>
    <version>[1.4.0,)</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-sms</artifactId>
    <version>1.0.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.2.3</version>
</dependency>
```

### Use the SDK packages

Add the following `import` directives to your code to use the Azure Identity and Azure Communication SDKs.

```java
import com.azure.communication.common.*;
import com.azure.communication.identity.*;
import com.azure.communication.identity.models.*;
import com.azure.communication.sms.*;
import com.azure.communication.sms.models.*;
import com.azure.core.credential.*;
import com.azure.identity.*;

import java.util.*;
```

## Create a DefaultAzureCredential

We'll be using the [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) for this quickstart. This credential is suitable for production and development environments. As it is needed for each operation let's create it within the `App.java` class. Add the following to the top of the `App.java` class.

```java
private TokenCredential credential = new DefaultAzureCredentialBuilder().build();
```

## Issue a token with service principals

Now we'll add code which uses the created credential, to issue a VoIP Access Token. We'll call this code later on;

```java
    public AccessToken createIdentityAndGetTokenAsync(String endpoint) {
          CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
                    .endpoint(endpoint)
                    .credential(this.credential)
                    .buildClient();

          CommunicationUserIdentifierAndToken result =  communicationIdentityClient.createUserAndToken(new ArrayList<>(Arrays.asList(CommunicationTokenScope.CHAT)));
          return result.getUserToken();
    }
```

## Send an SMS with service principals

As another example of using service principals, we'll add this code which uses the same credential to send an SMS:

```java
     public SmsSendResult sendSms(String endpoint, String from, String to, String message) {
          SmsClient smsClient = new SmsClientBuilder()
                    .endpoint(endpoint)
                    .credential(this.credential)
                    .buildClient();

          // Send the message and check the response for a message id
          return smsClient.send(from, to, message);
     }
```
## Write the Main method

Your `App.java` should already have a Main method, let's add some code which will call our previously created code to demonstrate the use of service principals:
```java
    public static void main(String[] args) {
          App instance = new App();
          // You can find your endpoint and access key from your resource in the Azure portal
          // e.g. "https://<RESOURCE_NAME>.communication.azure.com";
          String endpoint = "https://<RESOURCE_NAME>.communication.azure.com/";

          System.out.println("Retrieving new Access Token, using Service Principals");
          AccessToken token = instance.createIdentityAndGetTokenAsync(endpoint);
          System.out.println("Retrieved Access Token: "+ token.getToken());

          System.out.println("Sending SMS using Service Principals");
          // You will need a phone number from your resource to send an SMS.
          SmsSendResult result = instance.sendSms(endpoint, "<FROM NUMBER>", "<TO NUMBER>", "Hello from Service Principals");
          System.out.println("Sms id: "+ result.getMessageId());
          System.out.println("Send Result Successful: "+ result.isSuccessful());
    }
```

Your final `App.java` should look like this:

```java
package com.communication.quickstart;

import com.azure.communication.common.*;
import com.azure.communication.identity.*;
import com.azure.communication.identity.models.*;
import com.azure.communication.sms.*;
import com.azure.communication.sms.models.*;
import com.azure.core.credential.*;
import com.azure.identity.*;

import java.util.*;

public class App 
{

    private TokenCredential credential = new DefaultAzureCredentialBuilder().build();

    public SmsSendResult sendSms(String endpoint, String from, String to, String message) {
          SmsClient smsClient = new SmsClientBuilder()
               .endpoint(endpoint)
               .credential(this.credential)
               .buildClient();

          // Send the message and check the response for a message id
          return smsClient.send(from, to, message);
    }
    
    public AccessToken createIdentityAndGetTokenAsync(String endpoint) {
          CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
                    .endpoint(endpoint)
                    .credential(this.credential)
                    .buildClient();

          CommunicationUserIdentifierAndToken result =  communicationIdentityClient.createUserAndToken(new ArrayList<>(Arrays.asList(CommunicationTokenScope.CHAT)));
          return result.getUserToken();
    }

    public static void main(String[] args) {
          App instance = new App();
          // You can find your endpoint and access key from your resource in the Azure portal
          // e.g. "https://<RESOURCE_NAME>.communication.azure.com";
          String endpoint = "https://<RESOURCE_NAME>.communication.azure.com/";

          System.out.println("Retrieving new Access Token, using Service Principals");
          AccessToken token = instance.createIdentityAndGetTokenAsync(endpoint);
          System.out.println("Retrieved Access Token: "+ token.getToken());

          System.out.println("Sending SMS using Service Principals");
          // You will need a phone number from your resource to send an SMS.
          SmsSendResult result = instance.sendSms(endpoint, "<FROM NUMBER>", "<TO NUMBER>", "Hello from Service Principals");
          System.out.println("Sms id: "+ result.getMessageId());
          System.out.println("Send Result Successful: "+ result.isSuccessful());
    }
}
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

The final output should resemble the following:
```
Retrieving new Access Token, using Service Principals
Retrieved Access Token: ey..A
Sending SMS using using Service Principals
Sms id: ...
Send Result Successful: true
```


**Applies to: programming-language-python**

> **Note:**
> Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/use-managed-Identity)

## Setting up

### Create a new Python application

Let us set up your working directory for the application. For that, open your terminal or command window, create a new directory, and navigate to it:

```console
mkdir active-directory-authentication-quickstart && cd active-directory-authentication-quickstart
```

### Install the SDK packages

Next we need to install the required Azure SDK packages. Run these commands:

```console
pip install azure-identity
pip install azure-communication-identity
pip install azure-communication-sms
```

### Create a new file
Now we need a Python file to hold your code. Open and save a new file called `authentication.py` within your directory.

### Use the SDK packages

Our next goal is to import the necessary Azure SDK modules to work with identity and SMS. Add the following statements at the top of your file:

```python
from azure.identity import DefaultAzureCredential
from azure.communication.identity import CommunicationIdentityClient
from azure.communication.sms import SmsClient
```

### Create a DefaultAzureCredential

We need to initialize a credential for both production and development environments.

Place this line with [DefaultAzureCredential](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) after previously inserted lines:

```python
     credential = DefaultAzureCredential()
```

## Create an identity and issue a token with service principals

Create an identity and request a Voice over Internet Protocol (VoIP) access token:

```python
def create_identity_and_get_token(resource_endpoint):
     client = CommunicationIdentityClient(resource_endpoint, credential)
     user, token_response = client.create_user_and_token(scopes=["voip"])

     return token_response
```

### Send an SMS with service principals

Alternatively, you can utilize your credential to send a Short Message Service (SMS) as shown in the example below:

```python
def send_sms(resource_endpoint, from_phone_number, to_phone_number, message_content):
     sms_client = SmsClient(resource_endpoint, credential)

     sms_client.send(
          from_=from_phone_number,
          to_=[to_phone_number],
          message=message_content,
          enable_delivery_report=True  # optional property
     )
```

## Write our main code

Now we have all the necessary code blocks to execute the functions to create an identity, obtain an access token, and send an SMS.

Include the main code that calls your functions:

```python
# Retrieve your endpoint and access key from your resource in the Azure portal
# For example: "https://<RESOURCE_NAME>.communication.azure.com"
endpoint = "https://<RESOURCE_NAME>.communication.azure.com/"

print("Retrieving new Access Token, using Service Principals");
result = create_identity_and_get_token(endpoint);
print(f'Retrieved Access Token: {result.token}');

print("Sending SMS using Service Principals");

# Provide a valid phone number from your Azure resource to send an SMS.
sms_result = send_sms(endpoint, "<FROM_NUMBER>", "<TO_NUMBER>", "Hello from Service Principals");
print(f'SMS ID: {sms_result[0].message_id}');
print(f'Send Result Successful: {sms_result[0].successful}');
```

This is how the `authentication.py` looks after all changes you made:

```python
from azure.identity import DefaultAzureCredential
from azure.communication.identity import CommunicationIdentityClient
from azure.communication.sms import SmsClient

credential = DefaultAzureCredential()

def create_identity_and_get_token(resource_endpoint):
     client = CommunicationIdentityClient(resource_endpoint, credential)
     user, token_response = client.create_user_and_token(scopes=["voip"])

     return token_response

def send_sms(resource_endpoint, from_phone_number, to_phone_number, message_content):
     sms_client = SmsClient(resource_endpoint, credential)

     response = sms_client.send(
          from_=from_phone_number,
          to=[to_phone_number],
          message=message_content,
          enable_delivery_report=True  # optional property
     )
     return response

# You can find your endpoint and access key from your resource in the Azure portal
# e.g. "https://<RESOURCE_NAME>.communication.azure.com";
endpoint = "https://<RESOURCE_NAME>.communication.azure.com/"

print("Retrieving new Access Token, using Service Principals");
result = create_identity_and_get_token(endpoint);
print(f'Retrieved Access Token: {result.token}');

print("Sending SMS using Service Principals");

# You will need a phone number from your resource to send an SMS.
sms_result = send_sms(endpoint, "<FROM_NUMBER>", "<TO_NUMBER>", "Hello from Service Principals");
print(f'SMS ID: {sms_result[0].message_id}');
print(f'Send Result Successful: {sms_result[0].successful}');
```
## Run the program

It is time to execute your Python script to verify functionality. Run the file from your project's directory with the command:
```console
python authentication.py
``` 
If successful, you see output similar to this:
```Bash
    $ python authentication.py
    Retrieving new Access Token, using Service Principals
    Retrieved Access Token: ...
    Sending SMS using Service Principals
    SMS ID: ...
    Send Result Successful: true
```


## Next steps

- [Learn more about Azure role-based access control](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/index.yml)
- [Learn more about Azure identity library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme)
- [Creating user access tokens](access-tokens.md)
- [Send an SMS message](../sms/send.md)
- [Learn more about SMS](../../concepts/sms/concepts.md)
- [Quickly create an identity for testing](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).
