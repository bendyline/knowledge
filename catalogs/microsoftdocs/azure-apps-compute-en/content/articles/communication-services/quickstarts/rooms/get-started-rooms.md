---
title: Create a room
titleSuffix: An Azure Communication Services article
description: This article describes how to create a Room within your Azure Communication Services resource.
services: azure-communication-services
author: mayssamm
manager: alexokun

ms.author: mayssamm
ms.date: 06/02/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: mode-other, devx-track-azurecli, devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-azcli-js-csharp-java-python
---
# Create a room resource


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to create a Room within your Azure Communication Services resource. A room is a server-managed communications space for a known, fixed, set of participants to collaborate for a predetermined duration. For more information and use cases, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md).

## Object model

The following table lists the main properties of room objects:

| Name | Description |
| --- | --- |
| `roomId` | Unique room identifier. |
| `validFrom` | Earliest time a room can be used. |
| `validUntil` | Latest time a room can be used. |
| `pstnDialOutEnabled` | Enable or disable dialing out to a public switched telephone network (PSTN) number from a room. |
| `participants` | List of participants in a room. Specified as a `CommunicationUserIdentifier`. |
| `roleType` | The role of a room participant. Can be `Presenter`, `Attendee`, `Consumer`, or `Collaborator`. |

**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md?#access-your-connection-strings-and-service-endpoints-using-azure-cli).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- You can get the connection string from the Azure portal by clicking the keys in the settings. 

## Setting up 

### Add the extension

Add the Azure Communication Services extension for Azure CLI by using the `az extension` command.

```azurecli-interactive
az extension add --name communication
```

### Sign in to Azure CLI

You need to [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in by running the ```az login``` command from the terminal and providing your credentials.


### Store your connection string in an environment variable 

You can configure the `AZURE_COMMUNICATION_CONNECTION_STRING` environment variable to use Azure CLI keys operations without having to use `--connection_string` to pass in the connection string. To configure an environment variable, open a console window and select your operating system from the below tabs. Replace `<connectionString>` with your actual connection string.

##### [Windows](#tab/windows)

```console
setx AZURE_COMMUNICATION_CONNECTION_STRING "<connectionString>"
```

After you add the environment variable, you might need to restart any running programs that need to read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example. 

##### [macOS](#tab/unix)

Edit your **`.zshrc`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<connectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you might need to close and reopen the editor, IDE, or shell in order to access the variable. 

##### [Linux](#tab/linux)

Edit your **`.bash_profile`**, and add the environment variable:

```bash
export AZURE_COMMUNICATION_CONNECTION_STRING="<connectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you might need to close and reopen the editor, IDE, or shell to access the variable. 

---

## Operations

### Create a room

Use the `rooms create` command to create a room. 

```azurecli-interactive
az communication rooms create --presenter-participants "<participantId>" --consumer-participants "<participantId>" --attendee-participant "<participantId>" --valid-from "<valid-from>" --valid-until "<valid-until>" --pstn-dial-out-enabled "<pstn-dial-out-enabled>" --connection-string "<connection-string>"
```

- Use `<participantId>` optionally to specify the type of participant as presenter-participants, consumer-participants, or attendee-participants. If you don't specify a value, the default is empty. 
- Replace `<connection-string>` with your Azure Communication Services connection string. 
- Use `<valid-from>` optionally to specify the timestamp when the room is open for joining, in ISO8601 format, ex: 2022-07-14T10:21. 
- Use `<valid-until>` optionally to specify the timestamp when the room can no longer be joined, in ISO8601 format, ex: 2022-07-14T10:21. 
- Use `<pstn-dial-out-enabled>` optionally by setting this flag ("True" or "False") to enable or disable PSTN dial out for a room. By default, this flag is set to "False" when creating a room.

If you store the connection string in environment variables, you don't need to pass them to the command.

```azurecli-interactive
az communication rooms create 
```

### Enable PSTN dial out capability for a room

You can enable the PSTN dial out during `rooms create` by defining the `--pstn-dial-out-enabled` parameter as `True`. You can change this capability during q `rooms update` by specifying the `--pstn-dial-out-enabled` parameter.

```azurecli-interactive
az communication rooms create --pstn-dial-out-enabled "<pstn-dial-out-enabled>" --connection-string "<connection-string>"
```

```azurecli-interactive
az communication rooms update --pstn-dial-out-enabled "<pstn-dial-out-enabled>" --room "<roomId>"
```

- To enable or disable PSTN dial out for a room, set `<pstn-dial-out-enabled>` flag (`True` or `False`).

### Get the rooms 

The `rooms get` command returns the attributes of an existing room.

```azurecli-interactive
az communication rooms get --room "<roomId>" 
```

- Replace `<roomId>` with your room ID.

### Update the timeframe of a room 

You can update the timestamp of a room. Before calling the `room update` command, ensure that you acquired a new room with a valid timeframe. 

```azurecli-interactive
az communication rooms update --valid-from "<valid-from>" --valid-until "<valid-until>" --pstn-dial-out-enabled "<pstn-dial-out-enabled>" --room "<roomId>"
```

- Replace `<valid-from>` with the timestamp in ISO8601 format, ex: 2022-07-14T10:21, to specify when the room is open for joining. Should be used together with `--valid-until`.
- Replace `<valid-until>` with the timestamp in ISO8601 format, ex: 2022-07-14T10:21, to specify when the room can no longer be joined. Should be used together with `--valid-from`.
- Replace `<pstn-dial-out-enabled>` set this flag ("True" or "False") to enable or disable PSTN dial out for a room. Should be used together with `--pstn-dial-out-enabled`.
- Replace `<roomId>` with your room ID.
  
### List all active rooms

The `rooms list` command returns all active rooms belonging to your Azure Communication Services resource.

```azurecli-interactive
az communication rooms list
```

### Add new participants or update existing participants

When you create a room, you can update the room by adding new participant or updating an existing participant in it. Before calling the `room participant add-or-update` command, ensure that you acquired a new user. 

Use the `identity user create` command to create a new participant, identified by `participantId`.

```azurecli-interactive
az communication identity user create
```

Add a user as a participant to the room.

```azurecli-interactive
az communication rooms participant add-or-update --attendee-participant "<participantId>" --room "<roomId>"
```

- Replace `<participantId>` with your participant ID. If the `<participantId>` doesn't exist in the room, the participant is added to the room as an attendee role. Otherwise, the participant's role is updated to an attendee role.
- Replace `<roomId>` with your room ID.

### Get list of participants in a room
```azurecli-interactive
az communication rooms participant get --room "<roomId>"
```
- Replace `<roomId>` with your room ID.
  
### Remove a participant from a room 

You can remove a room participant from a room by using `rooms participant -remove`.

```azurecli-interactive
az communication rooms participant remove --room "<roomId>" --participants "<participant1>" "<participant2>" "<participant3>"
```

- Replace `<roomId>` with your room ID.
- Replace `<participant1>`, `<participant2>`, `<participant3>` with your user IDs obtained earlier with running `identity user create`command.

### Delete a room 

Similar to creating a room, you can also delete a room. 

Use `room delete` command to delete the existing room.

```azurecli-interactive
az communication rooms delete --room "<roomId>"
```

- Replace `<roomId>` with your room ID.



**Applies to: programming-language-csharp**


A room is a server-managed communications space for a known, fixed set of participants to collaborate for a predetermined duration. For more information, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md).


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- The latest version [.NET Core client library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.

## Sample code

Review and download the sample code for from GitHub at [Rooms Quickstart - .NET](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/RoomsQuickstart).

## Set up

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `RoomsQuickstart`. This command creates a simple "Hello World" C# project with a single source file: **Program.cs**.

```console
dotnet new console -o RoomsQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd RoomsQuickstart
dotnet build
```

### Install the package

Install the Azure Communication Rooms client library for .NET with [NuGet][https://www.nuget.org/]:

```console
dotnet add package Azure.Communication.Rooms
```

Use the Azure Communication Rooms client library for .NET [version 1.1.0](https://www.nuget.org/packages/Azure.Communication.Rooms/1.1.0) or later.

### Set up the app framework

In the `Program.cs` file, add the following code to import the required namespaces and create the basic program structure.

```csharp

using System;
using Azure;
using Azure.Core;
using Azure.Communication.Rooms;

namespace RoomsQuickstart
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            Console.WriteLine("Azure Communication Services - Rooms Quickstart");

            // Quickstart code goes here
        }
    }
}

```

## Initialize a room client

Create a new `RoomsClient` object that you need to create new `rooms` and manage their properties and lifecycle. Use the connection string of your Communications Service to authenticate the request. For more information on connection strings, see [this page](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

```csharp

// Find your Communication Services resource in the Azure portal
var connectionString = "<connection_string>";
RoomsClient roomsClient = new RoomsClient(connectionString);

```

## Create a room

### Set up room participants

To set up who can join a room, you need to have the list of the identities of those users. Follow the instructions at [Access tokens](../identity/access-tokens.md?pivots=programming-language-csharp) to creatieusers and issue access tokens. Alternatively, to create the users on demand, you can create them using the `CommunicationIdentityClient`. Azure Communication Services Rooms currently support a room participant of type `CommunicationUserIdentifier` only, using other types of `CommunicationIdentity` cause a runtime error.

To use the `CommunicationIdentityClient`, install the following package:

```console
dotnet add package Azure.Communication.Identity
```

Also, import the namespace of the package at the top of your `Program.cs` file:

``` csharp
using Azure.Communication.Identity;
```

Now, you can initialize the `CommunicationIdentityClient` and use it to create users:

```csharp
// Create identities for users who will join the room
CommunicationIdentityClient identityClient = new CommunicationIdentityClient(connectionString);
CommunicationUserIdentifier user1 = identityClient.CreateUser();
CommunicationUserIdentifier user2 = identityClient.CreateUser();
```

Then, create the list of room participants by referencing those users:

```csharp
List<RoomParticipant> participants = new List<RoomParticipant>()
{
    new RoomParticipant(user1) { Role = ParticipantRole.Presenter },
    new RoomParticipant(user2) // The default participant role is ParticipantRole.Attendee
};
```

### Initialize the room

Create a new room using the `participants` defined in the preceding code snippet:

```csharp
// Create a room
DateTimeOffset validFrom = DateTimeOffset.UtcNow;
DateTimeOffset validUntil = validFrom.AddDays(1);
CancellationToken cancellationToken = new CancellationTokenSource().Token;

CommunicationRoom createdRoom = await roomsClient.CreateRoomAsync(validFrom, validUntil, participants, cancellationToken);

// CreateRoom or CreateRoomAsync methods can take CreateRoomOptions type as an input parameter.
bool pstnDialOutEnabled = false;
CreateRoomOptions createRoomOptions = new CreateRoomOptions()
{
    ValidFrom = validFrom,
    ValidUntil = validUntil,
    PstnDialOutEnabled = pstnDialOutEnabled,
    Participants = participants
};

createdRoom = await roomsClient.CreateRoomAsync(createRoomOptions, cancellationToken);
string roomId = createdRoom.Id;
Console.WriteLine("\nCreated room with id: " + roomId);
```

Since rooms are server-side entities, you should keep track of and persist the `roomId` in the storage medium of choice. You can reference the `roomId` to view or update the properties of a room object.

### Enable PSTN dial out capability for a room
Each room has PSTN dial out disabled by default. You can enable the PSTN dial out for a room at creation, by defining the `pstnDialOutEnabled` parameter as true. You can change this capability  for a room by issuing an update request for the `pstnDialOutEnabled` parameter.

```csharp
// Create a room
CancellationToken cancellationToken = new CancellationTokenSource().Token;

// CreateRoom or CreateRoomAsync methods to create a room with PSTN dial out capability
bool pstnDialOutEnabled = true;
CreateRoomOptions createRoomOptions = new CreateRoomOptions()
{
    PstnDialOutEnabled = pstnDialOutEnabled,
};

CommunicationRoom createdRoom = await roomsClient.CreateRoomAsync(createRoomOptions, cancellationToken);
Console.WriteLine("\nCreated a room with PSTN dial out enabled: " + createdRoom.PstnDialOutEnabled);

// UpdateRoom or UpdateRoomAsync methods can take UpdateRoomOptions to enable or disable PSTN dial out capability
pstnDialOutEnabled = false;
UpdateRoomOptions updateRoomOptions = new UpdateRoomOptions()
{
    PstnDialOutEnabled = pstnDialOutEnabled,
};

CommunicationRoom updatedRoom = await roomsClient.UpdateRoomAsync(roomId, updateRoomOptions, cancellationToken);
Console.WriteLine("\nUpdated a room with PSTN dial out enabled: " + updatedRoom.PstnDialOutEnabled);

```

## Get properties of an existing room

To retrieve the details of an existing room, reference the `roomId`:

```csharp

// Retrieve the room with corresponding ID
CommunicationRoom room = await roomsClient.GetRoomAsync(roomId);
Console.WriteLine("\nRetrieved room with id: " + room.Id);

```

## Update the lifetime of a room

You can change the lifetime of a room by issuing an update request for the `ValidFrom` and `ValidUntil` parameters. A room can be valid for a maximum of six months.

```csharp

// Update room lifetime
DateTimeOffset updatedValidFrom = DateTimeOffset.UtcNow;
DateTimeOffset updatedValidUntil = DateTimeOffset.UtcNow.AddDays(10);
CommunicationRoom updatedRoom = await roomsClient.UpdateRoomAsync(roomId, updatedValidFrom, updatedValidUntil, cancellationToken);

// UpdateRoom or UpdateRoomAsync methods can take UpdateRoomOptions type as an input parameter.
bool pstnDialOutEnabled = true;
UpdateRoomOptions updateRoomOptions = new UpdateRoomOptions()
{
    ValidFrom = validFrom,
    ValidUntil = validUntil,
    PstnDialOutEnabled = pstnDialOutEnabled,
};

updatedRoom = await roomsClient.UpdateRoomAsync(roomId, updateRoomOptions, cancellationToken);
Console.WriteLine("\nUpdated room with validFrom: " + updatedRoom.ValidFrom + ", validUntil: " + updatedRoom.ValidUntil + " and pstnDialOutEnabled: " + updatedRoom.PstnDialOutEnabled);
```

### List all active rooms

To retrieve all active rooms, use the `GetRoomsAsync` method exposed on the client.

```csharp

// List all active rooms
AsyncPageable<CommunicationRoom> allRooms = roomsClient.GetRoomsAsync();
await foreach (CommunicationRoom currentRoom in allRooms)
{
    Console.WriteLine("\nFirst room id in all active rooms: " + currentRoom.Id);
    break;
}

```

### Add new participants or update existing participants

To add new participants to a room, use the `AddParticipantsAsync` method exposed on the client.

```csharp

List<RoomParticipant> addOrUpdateParticipants = new List<RoomParticipant>();
// Update participant2 from Attendee to Consumer
RoomParticipant participant2 = new RoomParticipant(user2) { Role = ParticipantRole.Consumer };
// Add participant3
CommunicationUserIdentifier user3 = identityClient.CreateUser();
RoomParticipant participant3 = new RoomParticipant(user3) { Role = ParticipantRole.Collaborator };
addOrUpdateParticipants.Add(participant2);
addOrUpdateParticipants.Add(participant3);

Response addOrUpdateParticipantsResponse = await roomsClient.AddOrUpdateParticipantsAsync(roomId, addOrUpdateParticipants);
Console.WriteLine("\nAdded or updated participants to room");

```

When you add participants to a room, they become eligible to join calls. Updated participants  see their new `role` in the call.

## Get list of participants

Retrieve the list of participants for an existing room by referencing the `roomId`:

```csharp

// Get list of participants in room
AsyncPageable<RoomParticipant> existingParticipants = roomsClient.GetParticipantsAsync(roomId);
Console.WriteLine("\nRetrieved participants from room: ");
await foreach (RoomParticipant participant in existingParticipants)
{
    Console.WriteLine($"{participant.CommunicationIdentifier.ToString()},  {participant.Role.ToString()}");
}

```

## Remove participants

To remove a participant from a room and revoke their access, use the `RemoveParticipantsAsync` method.

```csharp

// Remove user from room
List<CommunicationIdentifier> removeParticipants = new List<CommunicationIdentifier>();
removeParticipants.Add(user2);

Response removeParticipantsResponse = await roomsClient.RemoveParticipantsAsync(roomId, removeParticipants);
Console.WriteLine("\nRemoved participants from room");

```

## Delete room

If you wish to disband an existing room, issue an explicit delete request. All rooms and their associated resources are automatically deleted at the end of their validity plus a grace period.

```csharp

// Deletes the specified room
Response deleteRoomResponse = await roomsClient.DeleteRoomAsync(roomId);
Console.WriteLine("\nDeleted room with id: " + roomId);
```

## Run the code

To run the code, make sure you are in the same directory as the `Program.cs` file.

```console

dotnet run

```

The expected output describes each completed action:

```console

Azure Communication Services - Rooms Quickstart

Created a room with id: 99445276259151407

Retrieved room with id: 99445276259151407

Updated room with validFrom: 2023-05-11T22:11:46.784Z, validUntil: 2023-05-21T22:16:46.784Z and pstnDialOutEnabled: true

First room id in all active rooms: 99445276259151407

Added or updated participants to room

Retrieved participants from room:
8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7c76-35f3-343a0d00e901, Presenter
8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-f00d-aa4b-0cf9-9c3a0d00543e, Consumer
8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-f00d-aaf2-0cf9-9c3a0d00543f, Collaborator

Removed participants from room

Deleted room with id: 99445276259151407

```

## Reference documentation

Read about the full set of capabilities of Azure Communication Services rooms from the [.NET SDK reference](https://learn.microsoft.com/dotnet/api/overview/azure/communication.rooms-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/rooms/rooms).


**Applies to: programming-language-java**


A room is a server-managed communications space for a known, fixed set of participants to collaborate for a predetermined duration. For more information, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md).


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/?view=azure-java-stable\&preserve-view=true) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi)

## Sample code

Review and download the sample code for from GitHub at [Azure Communication Services - Rooms - Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/rooms-quickstart-java).

## Set up

### Create a new Java application

In a console window (such as cmd, PowerShell, or Bash), use the `mvn` command to create a new console app with the name `rooms-quickstart`. This command creates a simple "Hello World" Java project with a single source file: **App.java**.

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

### Include the package

You need to use the Azure Communication Rooms client library for Java [version 1.1.0](https://search.maven.org/artifact/com.azure/azure-communication-rooms/1.1.0/jar) or above.

#### Include the BOM file

Include the `azure-sdk-bom` to your project to take dependency on the General Availability (GA) version of the library. In the following snippet, replace the {bom_version_to_target} placeholder with the version number.

To learn more about the Bill of Materials (BOM), see the [Azure SDK BOM readme](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/boms/azure-sdk-bom/README.md).

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>{bom_version_to_target}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
Then include the direct dependency in the dependencies section without the version tag.

```xml
<dependencies>
  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-rooms</artifactId>
  </dependency>
</dependencies>
```

#### Include direct dependency

If you want to take dependency on a particular version of the library that isn't present in the BOM, add the direct dependency to your project as follows.

[//]: # ({x-version-update-start;com.azure:azure-communication-rooms;current})
```xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-communication-rooms</artifactId>
  <version>1.0.0-beta.1</version>
</dependency>
```

### Set up app framework

Go to the `/src/main/java/com/communication/quickstart` directory and open the `App.java` file. Add the following code:

```java

package com.communication.rooms.quickstart;

import com.azure.communication.common.*;
import com.azure.communication.identity.*;
import com.azure.communication.identity.models.*;
import com.azure.core.credential.*;
import com.azure.communication.rooms.*;

import java.io.IOException;
import java.time.*;
import java.util.*;

public class App
{
    public static void main( String[] args ) throws IOException
    {
        System.out.println("Azure Communication Services - Rooms Quickstart");
        // Quickstart code goes here
    }
}

```

## Initialize a room client

Create a new `RoomsClient` object that you need to create new rooms and manage their properties and lifecycle. Use the connection string of your Communications Service to authenticate the request. For more information on connection strings, see [Create communication resource](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

```java

// Initialize the rooms client
// Find your Communication Services resource in the Azure portal
String connectionString = "<connection string>";
RoomsClient roomsClient = new RoomsClientBuilder().connectionString(connectionString).buildClient();

```

## Create a room

### Set up room participants

To set up who can join a room, you need to have the list of the identities of those users. Follow the instructions at [Access tokens](../identity/access-tokens.md?pivots=programming-language-java) to create users and issue access tokens. Alternatively, if you want to create the users on demand, you can create them using the `CommunicationIdentityClient`. Azure Communication Services Rooms currently supports a room participant of type `CommunicationUserIdentifier` only, using other types of `CommunicationIdentity` causes a runtime error.

To use `CommunicationIdentityClient`, add the following package:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-identity</artifactId>
</dependency>
```

Import the package on top on your `App.java` file:
```java
import com.azure.communication.identity.CommunicationIdentityClient;
import com.azure.communication.identity.CommunicationIdentityClientBuilder;
```

Now, initialize `CommunicationIdentityClient` and use it to create users:

```java
CommunicationIdentityClient communicationIdentityClient = new CommunicationIdentityClientBuilder()
    .connectionString(connectionString)
    .buildClient();

CommunicationUserIdentifier user1 = communicationClient.createUser();
CommunicationUserIdentifier user2 = communicationClient.createUser();
CommunicationUserIdentifier user3 = communicationClient.createUser();
```

Then, create the list of room participants by referencing those users:

```java
//The default participant role is ParticipantRole.Attendee
RoomParticipant participant_1 = new RoomParticipant(user1);
RoomParticipant participant_2 = new RoomParticipant(user2);
RoomParticipant participant_3 = new RoomParticipant(user3);

List<RoomParticipant> roomParticipants = new ArrayList<RoomParticipant>();

roomParticipants.add(participant_1);
roomParticipants.add(participant_2.setRole(ParticipantRole.CONSUMER));
```

### Initialize the room

Create a new room using the `roomParticipants` defined in the preceding code snippet:

```java
OffsetDateTime validFrom = OffsetDateTime.now();
OffsetDateTime validUntil = validFrom.plusDays(30);
boolean pstnDialOutEnabled = false;

CreateRoomOptions createRoomOptions = new CreateRoomOptions()
    .setValidFrom(validFrom)
    .setValidUntil(validUntil)
    .setPstnDialOutEnabled(pstnDialOutEnabled)
    .setParticipants(roomParticipants);

CommunicationRoom roomCreated = roomsClient.createRoom(createRoomOptions);

System.out.println("\nCreated a room with id: " + roomCreated.getRoomId());

```

Rooms are server-side entities, so you should keep track of and persist the `roomId` in the storage medium of choice. You can reference the `roomId` to view or update the properties of a room object.

### Enable PSTN dial out capability for a room

Each room has PSTN dial out disabled by default. The PSTN dial out can be enabled for a room at creation, by defining the `pstnDialOutEnabled` parameter as true. You can change this capability  for a room by issuing an update request for the `pstnDialOutEnabled` parameter.

```java
boolean pstnDialOutEnabled = true;
// Create a room with PSTN dial out capability
CreateRoomOptions createRoomOptions = new CreateRoomOptions()
    .setPstnDialOutEnabled(pstnDialOutEnabled)

CommunicationRoom roomCreated = roomsClient.createRoom(createRoomOptions);
System.out.println("\nCreated a room with PSTN dial out enabled: " + roomCreated.getPstnDialOutEnabled());

// Update a room to enable or disable PSTN dial out capability
pstnDialOutEnabled = false;
UpdateRoomOptions updateRoomOptions = new UpdateRoomOptions()
    .setPstnDialOutEnabled(pstnDialOutEnabled);

CommunicationRoom roomUpdated = roomsClient.updateRoom(roomId, updateRoomOptions);
System.out.println("\nUpdated a room with PSTN dial out enabled: " + roomUpdated.getPstnDialOutEnabled());

```

## Get properties of an existing room

Retrieve the details of an existing room by referencing the `roomId`:

```java

// Retrieve the room with corresponding ID
CommunicationRoom roomResult = roomsClient.getRoom(roomId);

System.out.println("Retrieved room with id: " + roomResult.getRoomId());
```

## Update the lifetime of a room

You can change the lifetime of a room by issuing an update request for the `ValidFrom` and `ValidUntil` parameters. A room can be valid for a maximum of six months.

```java

OffsetDateTime validFrom = OffsetDateTime.now().plusDays(1);
OffsetDateTime validUntil = validFrom.plusDays(1);
boolean pstnDialOutEnabled = true;

UpdateRoomOptions updateRoomOptions = new UpdateRoomOptions()
    .setValidFrom(validFrom)
    .setValidUntil(validUntil)
    .setPstnDialOutEnabled(pstnDialOutEnabled);

CommunicationRoom roomResult = roomsClient.updateRoom(roomId, updateRoomOptions);

System.out.println("Updated room with validFrom: " + roomResult.getValidFrom() + ", validUntil: " + roomResult.getValidUntil() + " and pstnDialOutEnabled: " + roomResult.getPstnDialOutEnabled());
```

## Add or update participants

To add or update participants to a room, use the `addOrUpdateParticipants` method exposed on the client.

```java

List<RoomParticipant> participantsToAddAOrUpdate = new ArrayList<>();

// Updating current participant
participantsToAddAOrUpdate.add(participant_1.setRole(ParticipantRole.PRESENTER));

// Adding new participant
 participantsToAddAOrUpdate.add(participant_3.setRole(ParticipantRole.COLLABORATOR));

AddOrUpdateParticipantsResult addOrUpdateParticipantsResult = roomsClient.addOrUpdateParticipants(roomId, participantsToAddAOrUpdate);

System.out.println("Participant(s) added/updated");

```

Once you add participants to a room, they're eligible to join calls.

## Get list of participants

Retrieve the list of participants for an existing room by referencing the `roomId`:

```java

// Get list of participants
try {

PagedIterable<RoomParticipant> participants = roomsClient.listParticipants(roomId);

System.out.println("Participants:/n");

for (RoomParticipant participant : participants) {
    System.out.println(participant.getCommunicationIdentifier().getRawId() + " (" + participant.getRole() + ")");
   }
} catch (Exception ex) {
    System.out.println(ex);
}

```

## Remove participants

To remove a participant from a room and revoke their access, use the `removeParticipants` method.

```java

// Remove a participant from the room
List<CommunicationIdentifier> participantsToRemove = new ArrayList<>();

participantsToRemove.add(participant_3.getCommunicationIdentifier());

RemoveParticipantsResult removeParticipantsResult = roomsClient.removeParticipants(roomId,participantsToRemove);

System.out.println("Participant(s) removed");

```

### List all active rooms

Retrieve all active rooms under your Azure Communication Services resource.

```java
try {
    Iterable<PagedResponse<CommunicationRoom>> roomPages = roomsClient.listRooms().iterableByPage();

    System.out.println("Listing all the rooms IDs in the first two pages of the list of rooms:");

    int count = 0;
    for (PagedResponse<CommunicationRoom> page : roomPages) {
        for (CommunicationRoom room : page.getElements()) {
            System.out.println("\n" + room.getRoomId());
        }

        count++;
        if (count >= 2) {
            break;
        }
    }
} catch (Exception ex) {
    System.out.println(ex);
}
```

## Delete room

To disband an existing room, issue an explicit delete request. All rooms and their associated resources are automatically deleted at the end of their validity plus a grace period.

```java

// Deletes the specified room
roomsClient.deleteRoomWithResponse(roomId, Context.NONE);
System.out.println("\nDeleted the room with ID: " + roomId);

```


## Run the code

To run the code, go to the directory that contains the `pom.xml` file and compile the program.

```console
mvn compile
```

Then, build the package:

```console
mvn package
```

Execute the app.

```console
mvn exec:java -D"exec.mainClass"="com.communication.rooms.quickstart" -D"exec.cleanupDaemonThreads"="false"
```

The expected output describes each completed action:

```console
Azure Communication Services - Rooms Quickstart

Created a room with id:  99445276259151407

Retrieved room with id:  99445276259151407

Updated room with validFrom: 2023-05-11T22:11:46.784Z, validUntil: 2023-05-11T22:16:46.784Z and pstnDialOutEnabled: true

Participant(s) added/updated

Participants:
8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7c76-35f3-343a0d00e901 (Presenter)
8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7c76-35f3-343a0d00e902 (Consumer)
8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7c76-35f3-343a0d00e903 (Collaborator)

Participant(s) removed

Listing all the rooms IDs in the first two pages of the list of rooms: 
99445276259151407
99445276259151408
99445276259151409

Deleted the room with ID:  99445276259151407
```

## Reference articles

Read about the full set of capabilities of Azure Communication Services rooms from the [Java SDK reference](https://learn.microsoft.com/java/api/overview/azure/communication-rooms-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/rooms/rooms).


**Applies to: programming-language-python**


A room is a server-managed communications space for a known, fixed set of participants to collaborate for a predetermined duration. For more information, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md).


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- [Python](https://www.python.org/downloads/) 3.7+ for your operating system.

## Sample code

Review and download the sample code for from GitHub at [Rooms Quickstart - Python](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/rooms-quickstart).

## Set up

### Create a new Python application

In a terminal or console window, create a new folder for your application and navigate to it.

```console
mkdir acs-rooms-quickstart
cd acs-rooms-quickstart
```

### Install the package

You need to use the Azure Communication Rooms client library for Python [version 1.1.0](https://pypi.org/project/azure-communication-rooms/) or above.

From a console prompt, navigate to the directory containing the rooms.py file, then execute the following command:

```console
pip install azure-communication-rooms
```

### Set up the app framework

Create a new file called `rooms-quickstart.py` and add the basic program structure.

```python
import os
from datetime import datetime, timedelta
from azure.core.exceptions import HttpResponseError
from azure.communication.rooms import (
    RoomsClient,
    RoomParticipant,
    ParticipantRole
)

class RoomsQuickstart(object):
    print("Azure Communication Services - Rooms Quickstart")
    #room method implementations goes here

if __name__ == '__main__':
    rooms = RoomsQuickstart()
```

## Initialize a room client

Create a new `RoomsClient` object that you need to create new rooms and manage their properties and lifecycle. Use the connection string of your Communications Service to authenticate the request. For more information on connection strings, see [Create communications resource](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

```python
#Find your Communication Services resource in the Azure portal
connection_string = '<connection_string>'
rooms_client = RoomsClient.from_connection_string(connection_string)
```

## Create a room

### Set up room participants

To set up who can join a room, you need a list of the identities of those users. Follow the instructions at [Access tokens](../identity/access-tokens.md?pivots=programming-language-python) to create users and issue access tokens. Alternatively, to create the users on demand, you can create them using the `CommunicationIdentityClient`. Azure Communication Services rooms currently only support a room participant of type `CommunicationUserIdentifier`. Using other types of `CommunicationIdentity` causes a runtime error.

To use the `CommunicationIdentityClient`, install the following package:

```console
pip install azure-communication-identity
```

Also, import the namespace of the package at the top of your `rooms-quickstart.py` file:

```python
from azure.communication.identity import (
    CommunicationIdentityClient
)
```

Now, initialize the `CommunicationIdentityClient` and use it to create users:

```python
# Create identities for users who will join the room
identity_client = CommunicationIdentityClient.from_connection_string(connection_string)
user1 = identity_client.create_user()
user2 = identity_client.create_user()
user3 = identity_client.create_user()
```

Then, create the list of room participants by referencing those users:

```python
participant_1 = RoomParticipant(communication_identifier=user1, role=ParticipantRole.PRESENTER)
participant_2 = RoomParticipant(communication_identifier=user2, role=ParticipantRole.CONSUMER)
participants = [participant_1, participant_2]
```

### Initialize the room

Create a new room using the `participants` defined in the preceding code snippet:

```python
# Create a room
valid_from = datetime.now()
valid_until = valid_from + timedelta(weeks=4)
pstn_dial_out_enabled = False

try:
    create_room = rooms_client.create_room(
        valid_from=valid_from,
        valid_until=valid_until,
        pstn_dial_out_enabled=pstn_dial_out_enabled,
        participants=participants
    )
    print("\nCreated a room with id: " + create_room.id)
except HttpResponseError as ex:
    print(ex)
```

Since rooms are server-side entities, you should keep track of and persist the `room.id` in the storage medium of choice. You can reference the `id` to view or update the properties of a room object.

### Enable PSTN dial out capability for a room

Each room has PSTN dial out disabled by default. You can enable the PSTN dial out for a room at creation, by defining the `pstn_dial_out_enabled` parameter as true. You can change this capability for a room by issuing an update request for the `pstn_dial_out_enabled` parameter.

```python
# Create a room with PSTN dial out capability
pstn_dial_out_enabled = True
create_room = rooms_client.create_room(pstn_dial_out_enabled=pstn_dial_out_enabled)
print("\nCreated room with pstn_dial_out_enabled: " + updated_room.pstn_dial_out_enabled)

# Update a room to enable or disable PSTN dial out capability
pstn_dial_out_enabled= False
updated_room = rooms_client.update_room(room_id=room_id, pstn_dial_out_enabled=pstn_dial_out_enabled)
print("\nUpdated room with pstn_dial_out_enabled: " + updated_room.pstn_dial_out_enabled)

```

## Get properties of an existing room

Retrieve the details of an existing `room` by referencing the `id`:

```python
# Retrieves the room with corresponding ID
room_id = create_room.id
try:
    get_room = rooms_client.get_room(room_id=room_id)
    print("\nRetrieved room with id: ", get_room.id)
except HttpResponseError as ex:
    print(ex)
```

## Update the lifetime of a room

You can change the lifetime of a room by issuing an update request for the `valid_from` and `valid_until` parameters. A room can be valid for a maximum of six months.

```python
# Update the lifetime of a room
valid_from =  datetime.now()
valid_until = valid_from + timedelta(weeks=7)
pstn_dial_out_enabled=True

try:
    updated_room = rooms_client.update_room(room_id=room_id, valid_from=valid_from, valid_until=valid_until, pstn_dial_out_enabled=pstn_dial_out_enabled)
     print("\nUpdated room with validFrom: " + updated_room.valid_from + ", validUntil: " + updated_room.valid_until + " and pstn_dial_out_enabled: " + updated_room.pstn_dial_out_enabled)
except HttpResponseError as ex:
    print(ex)
```

## List all active rooms

To retrieve all active rooms created under your resource, use the `list_rooms` method exposed on the client.

```python
# List all active rooms
try:
    rooms = rooms_client.list_rooms()
    count = 0
    for room in rooms:
        if count == 1:
            break
        print("\nPrinting the first room in list"
            "\nRoom Id: " + room.id +
            "\nCreated date time: " + str(room.created_at) +
            "\nValid From: " + str(room.valid_from) + 
            "\nValid Until: " + str(room.valid_until) +
            "\nPSTN Dial-Out Enabled: " + str(room.pstn_dial_out_enabled))
        count += 1
except HttpResponseError as ex:
    print(ex)
```

## Add or update participants

To add new participants or update existing participants in a room, use the `add_or_update_participants` method exposed on the client.

```python
# Add or update participants in a room
try:
    # Update existing user2 from consumer to attendee
    participants = []
    participants.append(RoomParticipant(communication_identifier=user2, role=ParticipantRole.ATTENDEE))

    # Add new participant user3
    participants.append(RoomParticipant(communication_identifier=user3, role=ParticipantRole.COLLABORATOR))
    rooms_client.add_or_update_participants(room_id=room_id, participants=participants)
    print("\nAdd or update participants in room")

except HttpResponseError as ex:
    print('Error in adding or updating participants to room.', ex)
```

When you add participants to a room, they become eligible to join calls.

## List participants in a room

Retrieve the list of participants for an existing room by referencing the `room_id`:

```python
# Get list of participants in room
try:
    participants = rooms_client.list_participants(room_id)
    print('\nParticipants in Room Id :', room_id)
    for p in participants:
        print(p.communication_identifier.properties['id'], p.role)
except HttpResponseError as ex:
    print(ex)

```

## Remove participants

To remove a participant from a room and revoke their access, use the `remove_participants` method.

```python
# Remove Participants
try:
    participants = [user2]
    rooms_client.remove_participants(room_id=room_id, participants=participants)
    print("\nRemoved participants from room")

except HttpResponseError as ex:
    print(ex)

```

## Delete room

To disband an existing room, issue an explicit delete request. All rooms and associated resources are automatically deleted at the end of their validity plus a grace period.

```python
# Delete Room

rooms_client.delete_room(room_id=room_id)
print("\nDeleted room with id: " + room_id)

```

## Run the code

To run the code, make sure you are in the same directory as your `rooms-quickstart.py` file.

```console
python rooms-quickstart.py
```

The expected output describes each completed action:

```console
Azure Communication Services - Rooms Quickstart

Created a room with id:  99445276259151407

Retrieved room with id:  99445276259151407

Updated room with validFrom: 2023-05-03T00:00:00+00:00, validUntil: 2023-06-23T00:00:00+00:00 and pstn_dial_out_enabled: True

Printing the first room in list
Room Id: 99445276259151407
Created date time: 2023-05-03T00:00:00+00:00
Valid From: 2023-05-03T00:00:00+00:00
Valid Until: 2023-06-23T00:00:00+00:00
PSTN Dial-Out Enabled: True

Add or update participants in room

Participants in Room Id : 99445276259151407
8:acs:42a0ff0c-356d-4487-a288-ad0aad95d504_00000018-ef00-6042-a166-563a0d0051c1 Presenter
8:acs:42a0ff0c-356d-4487-a288-ad0aad95d504_00000018-ef00-6136-a166-563a0d0051c2 Consumer
8:acs:42a0ff0c-356d-4487-a288-ad0aad95d504_00000018-ef00-61fd-a166-563a0d0051c3 Collaborator

Removed participants from room

Deleted room with id: 99445276259151407
```

## Reference documentation

Read about the full set of capabilities of Azure Communication Services rooms from the [Python SDK reference](https://learn.microsoft.com/python/api/overview/azure/communication-rooms-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/rooms/rooms).


**Applies to: programming-language-javascript**


A room is a server-managed communications space for a known, fixed set of participants to collaborate for a predetermined duration. For more information, see [Rooms API for structured meetings](../../concepts/rooms/room-concept.md).


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- The latest versions of [Node.js](https://nodejs.org/en/download/package-manager/) Active LTS and Maintenance LTS versions.

## Sample code

Review and download the sample code for from GitHub at [Rooms Quickstart - JavaScript](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/rooms-quickstart).

## Set up

### Create a new web application

In a terminal or console window, create a new folder for your application and navigate to it.

```console
mkdir acs-rooms-quickstart && cd acs-rooms-quickstart
```

Run `npm init` to create a package.json file with default settings.

```console
npm init -y
```

Create a new file `index.js` where you add the code for this example.

### Install the packages

You need to use the Azure Communication Rooms client library for JavaScript [version 1.1.0](https://www.npmjs.com/package/@azure/communication-rooms) or above.

Use the `npm install` command to install the following Communication Services SDKs for JavaScript.

```console
npm install @azure/communication-rooms --save
```

### Set up the app framework

In the `index.js` file, add the following code. Add the code for this example in the `main` function.

``` javascript
const { RoomsClient } = require('@azure/communication-rooms');

const main = async () => {
  console.log("Azure Communication Services - Rooms Quickstart")

  // Quickstart code goes here

};

main().catch((error) => {
  console.log("Encountered an error");
  console.log(error);
})
```

## Initialize a room client

Create a new `RoomsClient` object that you need to create new rooms and manage their properties and lifecycle. Use the connection string of your Communications Service to authenticate the request. For more information on connection strings, see [Create communication resource](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

Add the following code in `index.js` inside the `main` function.

```javascript
const connectionString =
    process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

// create RoomsClient
const roomsClient = new RoomsClient(connectionString);
```

## Create a room

### Set up room participants

To set up who can join a room, you need to have the list of the identities of those users. Follow the instructions in [Access tokens](../identity/access-tokens.md?pivots=programming-language-javascript) to create users and issue access tokens. Alternatively, to create the users on demand, you can create them using the `CommunicationIdentityClient`. Azure Communication Services rooms currently support a room participant of type `CommunicationUserIdentifier` only, using other types of `CommunicationIdentity` causes a runtime error.

To use the `CommunicationIdentityClient`, install the following npm package:

```console
npm install @azure/communication-identity --save
```

Add the following required package at the top of your `index.js` file:

```javascript
const { CommunicationIdentityClient } = require('@azure/communication-identity');
```

Now, initialize the `CommunicationIdentityClient` and used it to create users:

```javascript
// create identities for users
const identityClient = new CommunicationIdentityClient(connectionString);
const user1 = await identityClient.createUserAndToken(["voip"]);
const user2 = await identityClient.createUserAndToken(["voip"]);
```

Then, create the list of room participants by referencing those users:

```javascript
const participants = [
  {
      id: user1.user,
      role: "Presenter",
  },
  {
    id: user2.user,
    role: "Consumer",
  }
]
```

### Initialize the room

Create a new room using the `participants` defined in the preceding code snippet:

```javascript
// Create a room
var validFrom = new Date(Date.now());
var validUntil = new Date(validFrom.getTime() + 60 * 60 * 1000);
var pstnDialOutEnabled = false;

const createRoomOptions = {
  validFrom,
  validUntil,
  pstnDialOutEnabled,
  participants
};

const createRoom = await roomsClient.createRoom(createRoomOptions);
const roomId = createRoom.id;
console.log("\nCreated a room with id: ", roomId);
```

Since rooms are server-side entities, you should keep track of and persist the `roomId` in the storage medium of choice. You can reference the `roomId` to view or update the properties of a `room` object.

### Enable PSTN dial out capability for a room

Each `room` has PSTN dial out disabled by default. You can enable the PSTN dial out for a room at creation, by defining the `pstnDialOutEnabled` parameter as true. You can also change this capability for a `room` by issuing an update request for the `pstnDialOutEnabled` parameter.

```javascript
// Create a room with PSTN dial out capability
var pstnDialOutEnabled = true;
const createRoomOptions = {
  pstnDialOutEnabled,
};

const createRoom = await roomsClient.createRoom(createRoomOptions);
console.log("\nCreated a room with PSTN dial out enabled: ", createRoom.pstnDialOutEnabled);

// Update a room to enable or disable PSTN dial out capability
pstnDialOutEnabled = false;
const updateRoomOptions = {
  pstnDialOutEnabled,
};

const updateRoom = await roomsClient.updateRoom(roomId, updateRoomOptions);
console.log("\nUpdated a room with PSTN dial out enabled: ", updateRoom.pstnDialOutEnabled);

```

## Get properties of an existing room

Retrieve the details of an existing room by referencing the `roomId`:

```javascript
// Retrieve the room with corresponding ID
const getRoom = await roomsClient.getRoom(roomId);
console.log("\nRetrieved room with id: ", getRoom.id);
```

## Update the lifetime of a room

You can change the lifetime of a room by issuing an update request for the `validFrom` and `validUntil` parameters. A room can be valid for a maximum of six months.

```javascript
// Update room lifetime
validFrom.setTime(validUntil.getTime());
validUntil.setTime(validFrom.getTime() + 5 * 60 * 1000);
pstnDialOutEnabled = true;
// request payload to update a room
const updateRoomOptions = {
  validFrom,
  validUntil,
  pstnDialOutEnabled,
};

const updateRoom = await roomsClient.updateRoom(roomId, updateRoomOptions);
console.log("\nUpdated room with validFrom: ", updateRoom.validFrom, ", validUntil: ", updateRoom.validUntil, " and pstnDialOutEnabled: ", updateRoom.pstnDialOutEnabled);
```

## Get list of rooms

Retrieve your list of rooms using the `listRooms` method:

```javascript
const roomsList = await roomsClient.listRooms();
console.log("\nRetrieved list of rooms; printing first room:");
for await (const currentRoom of roomsList) {
  // access room data here
  console.log(currentRoom);
  break;
}

```

## Add or update participants

To add new participants to a room, use the `addOrUpdateParticipants` method exposed on the client. This method also updates a participant if they already exist in the room.

```javascript
// Add and update participants

const user3 = await identityClient.createUserAndToken(["voip"]);

// request payload to add and update participants
const addOUpdateParticipantsList = [
  {
      id: user1.user,
      role: "Presenter",
  },
  {
    id: user3.user,
    role: "Collaborator",
  }
]

// add user3 to the room and update user1 to Presenter role
await roomsClient.addOrUpdateParticipants(roomId, addOUpdateParticipantsList);
console.log("\nAdded and updated participants in the room");
```

Once you add participants to a room, they're eligible to join calls.

## Get list of participants

Retrieve the list of participants for an existing room by referencing the `roomId`:

```javascript
const participantsList = await roomsClient.listParticipants(roomId);
console.log("\nRetrieved participants for room:");
for await (const participant of participantsList) {
  // access participant data here
  console.log(participant);
}
```

## Remove participants

To remove a participant from a room and revoke their access, use the `removeParticipants` method.

```javascript
// Remove both users from the room
const removeParticipantsList = [user1.user, user2.user]

// remove both users from the room with the request payload
await roomsClient.removeParticipants(roomId, removeParticipantsList);
console.log("\nRemoved participants from room");
```

## Delete room

If you wish to disband an existing room, you can issue an explicit delete request. All rooms and their associated resources are automatically deleted at the end of their validity plus a grace period.

```javascript
// Deletes the specified room
await roomsClient.deleteRoom(roomId);
console.log("\nDeleted room with id: ", roomId)
```

## Run the code

To run the code, make sure you are on the same directory as your `index.js` file.

```console
node index.js
```

The expected output describes each completed action:

```console
Azure Communication Services - Rooms QuickStart

Created a room with id:  99445276259151407

Retrieved room with id:  99445276259151407

Updated room with validFrom:  2023-05-11T22:11:46.784Z, validUntil:  2023-05-11T22:16:46.784Z and pstnDialOutEnabled: true

Retrieved list of rooms; printing first room:

{
  id: "99445276259151407",
  createdAt: "2023-05-11T22:11:50.784Z",
  validFrom: "2023-05-11T22:11:46.784Z",
  validUntil: "2023-05-11T22:16:46.784Z"
}

Added and updated participants in the room

Retrieved participants for room:
{
  id: {
    kind: 'communicationUser',
    communicationUserId: '8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7c76-35f3-343a0d00e901'
  },
  role: 'Presenter'
}
{
  id: {
    kind: 'communicationUser',
    communicationUserId: '8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7ccc-35f3-343a0d00e902'
  },
  role: 'Consumer'
}
{
  id: {
    kind: 'communicationUser',
    communicationUserId: '8:acs:b6aada1f-0b1d-47ac-866f-91aae00a1d01_00000018-ac89-7ccc-35f3-343a0d00e903'
  },
  role: 'Collaborator'
}

Removed participants from room

Deleted room with id:  99445276259151407
```

## Reference documentation

Read about the full set of capabilities of Azure Communication Services rooms from the [JavaScript SDK reference](https://learn.microsoft.com/javascript/api/overview/azure/communication-rooms-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/rooms/rooms).



## Next steps

You can learn how to [join a rooms call](join-rooms-call.md) after creating and configuring the room.

This article described how to:
> 
> - Create a new room
> - Get the properties of a room
> - Update the properties of a room
> - Delete a room

## Related articles

 - [Rooms API for structured meetings](../../concepts/rooms/room-concept.md).
 - [Voice and video calling concepts](../../concepts/voice-video-calling/about-call-types.md).
 - [Azure Communication Services samples](../../samples/overview.md).
