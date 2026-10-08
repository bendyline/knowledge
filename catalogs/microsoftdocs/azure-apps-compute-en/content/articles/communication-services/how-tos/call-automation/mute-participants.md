---
title: Mute participants during a call
titleSuffix: An Azure Communication Services how-to document
description: Provides a how-to guide for muting participants during a call.
author: kunaal
ms.service: azure-communication-services
ms.subservice: call-automation
ms.topic: include
ms.date: 03/19/2023
ms.author: kpunjabi
ms.custom: private_preview, devx-track-extended-java
services: azure-communication-services
zone_pivot_groups: acs-csharp-java
---

# Mute participants during a call 


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


>**Important:**
>Functionality described on this document is currently in private preview. Private preview includes access to SDKs and documentation for testing purposes that are not yet available publicly.
>Apply to become an early adopter by filling out the form for [preview access to Azure Communication Services](https://aka.ms/acs-tap-invite).

With Azure Communication Services Call Automation SDK, developers can now mute participants through server based API requests. This feature can be useful when you want your application to mute participants after they've joined the meeting to avoid any interruptions or distractions to ongoing meetings.   

If you’re interested in abilities to allow participants to mute/unmute themselves on the call when they’ve joined with Azure Communication Services Client Libraries, you can use our [mute/unmute function](../calling-sdk/manage-calls.md) provided through our Calling Library.

## Common use cases

### Contact center supervisor call monitoring

In a typical contact center, there may be times when a supervisor needs to join an on-going call to monitor the call to provide guidance to agents after the call on how they could improve their assistance. The supervisor would join muted as to not disturb the on-going call with any extra side noise.

*This guide helps you learn how to mute participants by using the mute action provided through Azure Communication Services Call Automation SDK.*


**Applies to: programming-language-csharp**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- The latest [.NET library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- Obtain the NuGet package from the [Azure SDK Dev Feed](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md#nuget-package-dev-feed)

## Create a new C# application

In the console window of your operating system, use the `dotnet` command to create a new web application.

```console
dotnet new web -n MyApplication
```

## Install the NuGet package

During the preview phase, the NuGet package can be obtained by configuring your package manager to use the Azure SDK Dev Feed from [here](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md#nuget-package-dev-feed)

## Establish a call

By this point you should be familiar with starting calls, if you need to learn more about making a call, follow our [quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md). In this quickstart, we'll answer an incoming call.

## Mute participant during a call 

``` csharp
var target = new CommunicationUserIdentifier(ACS_USER_ID); 
var callConnection = callAutomationClient.GetCallConnection(CALL_CONNECTION_ID); 
await callConnection.MuteParticipantsAsync(target, "OperationContext").ConfigureAwait(false);
```

## Participant muted event

``` json
{
  "id": "9dff6ffa-a496-4279-979d-f6455cb88b22",
  "source": "calling/callConnections/401f3500-08a0-4e9e-b844-61a65c845a0b",
  "type": "Microsoft.Communication.ParticipantsUpdated",
  "data": {
    "participants": [
      {
        "identifier": {
          "rawId": "<ACS_USER_ID>",
          "kind": "communicationUser",
          "communicationUser": {
            "id": "<ACS_USER_ID>"
          }
        },
        "isMuted": true
      },
      {
        "identifier": {
          "rawId": "<ACS_USER_ID>",
          "kind": "communicationUser",
          "communicationUser": {
            "id": "<ACS_USER_ID>"
          }
        },
        "isMuted": false
      },
      {
        "identifier": {
          "rawId": "<ACS_USER_ID>",
          "kind": "communicationUser",
          "communicationUser": {
            "id": "<ACS_USER_ID>"
          }
        },
        "isMuted": false
      }
    ],
    "sequenceNumber": 4,
    "callConnectionId": "401f3500-08a0-4e9e-b844-61a65c845a0b",
    "serverCallId": "aHR0cHM6Ly9hcGkuZmxpZ2h0cHJveHkuc2t5cGUuY29tL2FwaS92Mi9jcC9jb252LXVzZWEyLTAxLmNvbnYuc2t5cGUuY29tL2NvbnYvRkhjV1lURXFZMENUY0VKUlJ3VHc1UT9pPTQmZT02MzgxNDkzMTEwNDk0NTM2ODQ=",
    "correlationId": "aaaa0000-bb11-2222-33cc-444444dddddd"
  },
  "time": "2023-03-21T17:22:35.4300007+00:00",
  "specversion": "1.0",
  "datacontenttype": "application/json",
  "subject": "calling/callConnections/401f3500-08a0-4e9e-b844-61a65c845a0b"
}
```



**Applies to: programming-language-java**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp)
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- [Java Development Kit](https://learn.microsoft.com/java/azure/jdk/?preserve-view=true\&view=azure-java-stable) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).

## Create a new Java application

In your terminal or command window, navigate to the directory where you would like to create your Java application. Run the command below to generate the Java project from the maven-archetype-quickstart template. 

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

The command above creates a directory with the same name as `artifactId` argument. Under this directory, `src/main/java` directory contains the project source code, `src/test/java` directory contains the test source. 

You'll notice that the 'generate' step created a directory with the same name as the artifactId. Under this directory, `src/main/java` directory contains source code, `src/test/java` directory contains tests, and `pom.xml` file is the project's Project Object Model, or POM.

Update your applications POM file to use Java 8 or higher.

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

## Configure Azure SDK dev feed

Since the Call Automation SDK version used in this quickstart isn't yet available in Maven Central Repository, we need to add an Azure Artifacts development feed, which contains the latest version of Call Automation SDK.

Add the [azure-sdk-for-java feed](https://dev.azure.com/azure-sdk/public/_artifacts/feed/azure-sdk-for-java) to your `pom.xml`. Follow the instructions after clicking the "Connect to Feed" button.

## Add package references

In your POM file, add the following reference for the project. 

**azure-communication-callingserver**

Azure Communication Services Call Automation SDK package is retrieved from the Azure SDK Dev Feed configured above.

``` xml 
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-communication-callautomation</artifactId>
  <version>1.0.0-alpha.20230317.1</version>
</dependency>
```

## Update App.java with code

In your editor of choice, open App.java file and update it with the code provided in [Update app.java with code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md) section.

## Establish a call

By this point you should be familiar with starting calls, if you need to learn more about making a call, follow our [quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md). In this quickstart, we'll answer an incoming call.


## Mute participant during a call 

``` java
var target = new CommunicationUserIdentifier(ACS_USER_ID); 
var callConnectionAsync = callAutomationClientAsync.getCallConnectionAsync(CALL_CONNECTION_ID); 
callConnectionAsync.muteParticipantsAsync(target).block();
```

## Participant muted event

``` json
{
  "id": "9dff6ffa-a496-4279-979d-f6455cb88b22",
  "source": "calling/callConnections/401f3500-08a0-4e9e-b844-61a65c845a0b",
  "type": "Microsoft.Communication.ParticipantsUpdated",
  "data": {
    "participants": [
      {
        "identifier": {
          "rawId": "<ACS_USER_ID>",
          "kind": "communicationUser",
          "communicationUser": {
            "id": "<ACS_USER_ID>"
          }
        },
        "isMuted": true
      },
      {
        "identifier": {
          "rawId": "<ACS_USER_ID>",
          "kind": "communicationUser",
          "communicationUser": {
            "id": "<ACS_USER_ID>"
          }
        },
        "isMuted": false
      },
      {
        "identifier": {
          "rawId": "<ACS_USER_ID>",
          "kind": "communicationUser",
          "communicationUser": {
            "id": "<ACS_USER_ID>"
          }
        },
        "isMuted": false
      }
    ],
    "sequenceNumber": 4,
    "callConnectionId": "401f3500-08a0-4e9e-b844-61a65c845a0b",
    "serverCallId": "aHR0cHM6Ly9hcGkuZmxpZ2h0cHJveHkuc2t5cGUuY29tL2FwaS92Mi9jcC9jb252LXVzZWEyLTAxLmNvbnYuc2t5cGUuY29tL2NvbnYvRkhjV1lURXFZMENUY0VKUlJ3VHc1UT9pPTQmZT02MzgxNDkzMTEwNDk0NTM2ODQ=",
    "correlationId": "aaaa0000-bb11-2222-33cc-444444dddddd"
  },
  "time": "2023-03-21T17:22:35.4300007+00:00",
  "specversion": "1.0",
  "datacontenttype": "application/json",
  "subject": "calling/callConnections/401f3500-08a0-4e9e-b844-61a65c845a0b"
}
```




## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../quickstarts/create-communication-resource.md#clean-up-resources).

## Next steps

Learn more about [Call Automation](../../concepts/call-automation/call-automation.md).
