---
title: Understand Identifiers
titleSuffix: An Azure Communication Services article
description: Understand identifier types and how to use them.
author: DominikMe
manager: RezaJooyandeh
services: azure-communication-services

ms.author: domessin
ms.date: 08/30/2022
ms.topic: concept-article
ms.service: azure-communication-services
ms.subservice: identity
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python-ios-android-rest
---

# Understand identifiers


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Communication Services SDKs and REST APIs use the *identifier* type to identify who is communicating with whom. For example, identifiers specify who to call, or who sent a chat message.

Depending on context, identifiers get wrapped with extra properties, like inside the `ChatParticipant` in the Chat SDK or inside the `RemoteParticipant` in the Calling SDK.

This article describes different types of identifiers and how they look across programming languages. You also get tips on how to use them.


## The `CommunicationIdentifier` type

There are user identities that you create yourself and there are external identities. Microsoft Teams users and phone numbers are external identities that come to play in interop scenarios. Each of these different identity types has a corresponding identifier that represents it. An identifier is a structured type that offers type-safety and works well with your editor's code completion.

**Applies to: programming-language-javascript**


### Communication user

The `CommunicationUserIdentifier` interface represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.


#### Basic usage

```javascript
// at some point you will have created a new user identity in your trusted service
const newUser = await identityClient.createUser();

// and then send newUser.communicationUserId down to your client application
// where you can again create an identifier for the user
const sameUser = { communicationUserId: newUserId };
```

#### API reference

[CommunicationUserIdentifier](https://learn.microsoft.com/javascript/api/@azure/communication-common/communicationuseridentifier)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifier` interface represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```javascript
// get the Teams user's ID from Graph APIs if only the email is known
const user = await graphClient.api("/users/bob@contoso.com").get();

// create an identifier
const teamsUser = { microsoftTeamsUserId: user.id };

// if you're not operating in the public cloud, you must also pass the right Cloud type.
const gcchTeamsUser = { microsoftTeamsUserId: userId, cloud: "gcch" };
```

#### API reference

[MicrosoftTeamsUserIdentifier](https://learn.microsoft.com/javascript/api/@azure/communication-common/microsoftteamsuseridentifier)

### Phone number

The `PhoneNumberIdentifier` interface represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```javascript
// create an identifier
const phoneNumber = { phoneNumber: "+112345556789" };
```

#### API reference

[PhoneNumberIdentifier](https://learn.microsoft.com/javascript/api/@azure/communication-common/phonenumberidentifier)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifier` interface represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. The Teams applications must be configured with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```javascript
// Get the Microsoft Teams App's ID from Graph APIs
const users = await graphClient.api("/users")
                    .filter(filterConditions)
                    .select('displayName,id')
                    .get();
//Here we assume that you have a function getBotFromUsers that gets the bot from the returned response
const bot = getBotFromUsers(users);
// Create an identifier
const teamsAppIdentifier = { teamsAppId: bot.id };

// If you're not operating in the public cloud, you must also pass the right Cloud type.
const gcchTeamsAppIdentifier = { teamsAppId: id, cloud: "gcch" };
```

#### API reference

[MicrosoftTeamsAppIdentifier](https://learn.microsoft.com/javascript/api/@azure/communication-common/microsoftteamsappidentifier)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```javascript
// get the Teams user's ID from Graph APIs if only the email is known
const user = await graphClient.api("/users/bob@contoso.com").get();

// Get the tenantId from Graph API
const org = await graphClient.api("/organization").get();
const tenantId = org.value[0].id;

//Communication Services Resource ID
const resourceId = "<resource-id-guid>";

// create an identifier
const teamsExtensionUser = { userId: user.id, tenantId: tenantId, resourceId: resourceId };

// if you're not operating in the public cloud, you must also pass the right Cloud type.
const gcchTeamsExtensionUser = { userId: user.id, tenantId: tenantId, resourceId: resourceId, cloud: "gcch" };
```

#### API reference

[TeamsExtensionUserIdentifier](https://learn.microsoft.com/javascript/api/@azure/communication-common/teamsextensionuseridentifier)

### Unknown

The `UnknownIdentifier` interface exists for future-proofing and you might encounter it when you are on an old version of the SDK and a new identifier type is recently introduced. Any unknown identifier from the service deserializes to `UnknownIdentifier` in the SDK.

#### Basic usage

```javascript
// create an identifier
const unknownId = { id: "a raw id that originated in the service" };
```

#### API reference

[UnknownIdentifier](https://learn.microsoft.com/javascript/api/@azure/communication-common/unknownidentifier)

### How to handle the `CommunicationIdentifier` base interface

While you construct identifiers for a concrete type that you pass *into* the SDK, the SDK returns a `CommunicationIdentifierKind`, which is a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions). It's easy to narrow to a concrete type and we suggest a switch-case statement with pattern matching:

```javascript
switch (communicationIdentifier.kind)
{
    case "communicationUser":
        // TypeScript has narrowed communicationIdentifier to be a CommunicationUserKind
        console.log(`Communication user: ${communicationIdentifier.communicationUserId}`);
        break;
    case "microsoftTeamsUser":
        // narrowed to MicrosoftTeamsUserKind
        console.log(`Teams user: ${communicationIdentifier.microsoftTeamsUserId}`);
        break;
    case "microsoftTeamsApp":
        // narrowed to MicrosoftTeamsAppIdentifier
        console.log(`Teams app: ${communicationIdentifier.teamsAppId}`);
        break;
    case "phoneNumber":
         // narrowed to PhoneNumberKind
        console.log(`Phone number: ${communicationIdentifier.phoneNumber}`);
        break;
    case "unknown":
         // narrowed to UnknownIdentifierKind
        console.log(`Unknown: ${communicationIdentifier.id}`);
        break;
    default:
        // be careful here whether you want to throw because a new SDK version
        // can introduce new identifier types
        break;
}
```

The identifier interfaces are designed so that you don't need to specify `kind` to reduce verbosity. Also, the discriminating union with the `kind` property is only used when returned from the SDK. However, if you need to translate an identifier to its corresponding discriminating union type you can use this helper:

```javascript
const identifierKind = getIdentifierKind(identifier); // now you can switch-case on the kind
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

Since `azure-communication-common@2.1.0` the SDK helps with the conversion:

```javascript
// get an identifier's raw Id
const rawId = getIdentifierRawId(communicationIdentifier);

// create an identifier from a given raw Id
const identifier = createIdentifierFromRawId(rawId);
```

An invalid raw ID converts to `UnknownIdentifier` in the SDK and any validation only happens service-side.



**Applies to: programming-language-csharp**


### Communication user

The `CommunicationUserIdentifier` represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.


#### Basic usage

```csharp
// at some point you will have created a new user identity in your trusted service
CommunicationUserIdentifier newUser = await identityClient.CreateUser();

// and then send newUser.Id down to your client application
// where you can again create an identifier for the user
var sameUser = new CommunicationUserIdentifier(newUserId);
```

#### API reference

[CommunicationUserIdentifier](https://learn.microsoft.com/dotnet/api/azure.communication.communicationuseridentifier)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifier` represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your signed in and acquired a token.

#### Basic usage

```csharp
// get the Teams user's ID from Graph APIs if only the email is known
var user = await graphClient.Users["bob@contoso.com"]
    .Request()
    .GetAsync();

// create an identifier
var teamsUser = new MicrosoftTeamsUserIdentifier(user.Id);

// if you're not operating in the public cloud, you must also pass the right Cloud type.
var gcchTeamsUser = new MicrosoftTeamsUserIdentifier(userId: userId, cloud: CommunicationCloudEnvironment.Gcch);
```

#### API reference

[MicrosoftTeamsUserIdentifier](https://learn.microsoft.com/dotnet/api/azure.communication.microsoftteamsuseridentifier)

### Phone number

The `PhoneNumberIdentifier` represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```csharp
// create an identifier
var phoneNumber = new PhoneNumberIdentifier("+112345556789");
```

#### API reference

[PhoneNumberIdentifier](https://learn.microsoft.com/dotnet/api/azure.communication.phonenumberidentifier)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifier` interface represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. The Teams applications must be configured with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```csharp
// Get the Microsoft Teams App's ID from Graph APIs
var users = await graphClient.Users.GetAsync((requestConfiguration) =>
{
	requestConfiguration.QueryParameters.Select = new string []{ "displayName","id" };
	requestConfiguration.QueryParameters.Filter = filterConditions;
});

// Here we assume that you have a function GetBotFromUsers that gets the bot from the returned response
var bot = GetBotFromUsers(users);

// Create an identifier
var teamsAppIdentifier = new MicrosoftTeamsAppIdentifier(bot.Id);

// If you're not operating in the public cloud, you must also pass the right Cloud type.
var gcchTeamsAppIdentifier = new MicrosoftTeamsAppIdentifier(bot.Id, CommunicationCloudEnvironment.Gcch);
```

#### API reference

[MicrosoftTeamsAppIdentifier](https://learn.microsoft.com/dotnet/api/azure.communication.microsoftteamsappidentifier)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```csharp
// get the Teams user's ID from Graph APIs if only the email is known
var user = await graphClient.Users["bob@contoso.com"]
    .Request()
    .GetAsync();

// Get the tenantId from Graph API
var organization = await graphClient.Organization
    .Request()
    .GetAsync();

string tenantId = organization.CurrentPage.FirstOrDefault()?.Id;

//Communication Services Resource ID
var resourceId = "<resource-id-guid>";

// create an identifier
var teamsExtensionUser = new TeamsExtensionUserIdentifier(user.Id, tenantId, resourceId);

// if you're not operating in the public cloud, you must also pass the right Cloud type.
var gcchTeamsExtensionUser = new TeamsExtensionUserIdentifier(userId: user.Id, tenantId: tenantId, resourceId: resourceId, cloud: CommunicationCloudEnvironment.Gcch);
```

#### API reference

[TeamsExtensionUserIdentifier](https://learn.microsoft.com/dotnet/api/azure.communication.teamsextensionuseridentifier)

### Unknown

The `UnknownIdentifier` exists for future-proofing and you might encounter it when you are on an old version of the SDK and a new identifier type is recently introduced. Any unknown identifier from the service deserializes to `UnknownIdentifier` in the SDK.

#### Basic usage

```csharp
// create an identifier
var unknown = new UnknownIdentifier("a raw id that originated in the service");
```

#### API reference

[UnknownIdentifier](https://learn.microsoft.com/dotnet/api/azure.communication.unknownidentifier)

### How to handle the `CommunicationIdentifier` base class

While you construct identifiers for a concrete type that you pass *into* the SDK, the SDK returns the `CommunicationIdentifier` protocol. It's easy to down-cast to a concrete type and we suggest a switch-case statement with pattern matching:

```csharp
switch (communicationIdentifier)
{
    case CommunicationUserIdentifier communicationUser:
        Console.WriteLine($"Communication user: {communicationUser.Id}");
        break;
    case MicrosoftTeamsUserIdentifier teamsUser:
        Console.WriteLine($"Teams user: {teamsUser.UserId}");
        break;
    case MicrosoftTeamsAppIdentifier teamsApp:
        Console.WriteLine($"Teams app: {teamsApp.AppId}");
        break;
    case PhoneNumberIdentifier phoneNumber:
        Console.WriteLine($"Phone number: {phoneNumber.PhoneNumber}");
        break;
    case UnknownIdentifier unknown:
        Console.WriteLine($"Unknown: {unknown.Id}");
        break;
    default:
        // be careful here whether you want to throw because a new SDK version
        // can introduce new identifier types
        break;
}
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

Since `Azure.Communication.Common 1.2.0` the SDK helps with the conversion:

```csharp
// get an identifier's raw Id
string rawId = communicationIdentifier.RawId;

// create an identifier from a given raw Id
CommunicationIdentifier identifier = CommunicationIdentifier.FromRawId(rawId);
```

An invalid raw ID converts to `UnknownIdentifier` in the SDK and any validation only happens service-side.



**Applies to: programming-language-python**


### Communication user

The `CommunicationUserIdentifier` represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.


#### Basic usage

```python
# at some point you will have created a new user identity in your trusted service
new_user = identity_client.create_user()

# and then send new_user.properties['id'] down to your client application
# where you can again create an identifier for the user
same_user = CommunicationUserIdentifier(new_user_id)
```

#### API reference

[CommunicationUserIdentifier](https://learn.microsoft.com/python/api/azure-communication-chat/azure.communication.chat.communicationuseridentifier)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifier` represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your signed in and acquired a token.

#### Basic usage

```python
# get the Teams user's ID from Graph APIs if only the email is known
user_id = graph_client.get("/users/bob@contoso.com").json().get("id");

# create an identifier
teams_user = MicrosoftTeamsUserIdentifier(user_id)

# if you're not operating in the public cloud, you must also pass the right Cloud type.
gcch_teams_user = MicrosoftTeamsUserIdentifier(user_id, cloud=CommunicationCloudEnvironment.GCCH)
```

#### API reference

[MicrosoftTeamsUserIdentifier](https://learn.microsoft.com/python/api/azure-communication-chat/azure.communication.chat.microsoftteamsuseridentifier)

### Phone number

The `PhoneNumberIdentifier` represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```python
# create an identifier
phone_number = PhoneNumberIdentifier("+112345556789")
```

#### API reference

[PhoneNumberIdentifier](https://learn.microsoft.com/python/api/azure-communication-chat/azure.communication.chat.phonenumberidentifier)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifier` interface represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. The Teams applications must be configured with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```python
# Get the Microsoft Teams App's ID from Graph APIs
users = graph_client.get("/users").json()

# Here we assume that you have a function get_bot_from_users that gets the bot from the returned response
bot = get_bot_from_users(users);

# Create an identifier
teams_app_identifier = MicrosoftTeamsAppIdentifier(app_id=bot.get("id"))

# If you're not operating in the public cloud, you must also pass the right Cloud type.
gcch_teams_app_identifier = MicrosoftTeamsAppIdentifier(
            app_id=bot.get("id"),
            cloud=CommunicationCloudEnvironment.GCCH
        )
```

#### API reference

[MicrosoftTeamsAppIdentifier](https://learn.microsoft.com/python/api/azure-communication-identity/azure.communication.identity.microsoftteamsappidentifier)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.


#### Basic usage

```python
# get the Teams user's ID from Graph APIs if only the email is known
user_id = graph_client.get("/users/bob@contoso.com").json().get("id");

# get the tenantId from Graph API
tenant_id = graph_client.get("/organization").json()["value"][0]["id"]

# Communication Services Resource ID
resourceId = "<resource-id-guid>"

# create an identifier
teams_user = TeamsExtensionUserIdentifier(user_id, tenant_id, resource_id)

# if you're not operating in the public cloud, you must also pass the right Cloud type
gcch_teams_user = TeamsExtensionUserIdentifier(user_id, tenant_id, resource_id, cloud=CommunicationCloudEnvironment.GCCH)
```

#### API reference

[TeamsExtensionUserIdentifier](https://learn.microsoft.com/python/api/azure-communication-chat/azure.communication.chat)

### Unknown

The `UnknownIdentifier` exists for future-proofing and you might encounter it when you are on an old version of the SDK and a new identifier type is recently introduced. Any unknown identifier from the service deserializes to the `UnknownIdentifier` in the SDK.

#### Basic usage

```python
# create an identifier
unknown = UnknownIdentifier("a raw id that originated in the service")
```

#### API reference

[UnknownIdentifier](https://learn.microsoft.com/python/api/azure-communication-chat/azure.communication.chat.unknownidentifier)

### How to handle the `CommunicationIdentifier` base class

While you construct identifiers for a concrete type that you pass *into* the SDK, the SDK returns the `CommunicationIdentifier` protocol. Concrete identifier classes are the `CommunicationIdentifier` protocol together with a typed dictionary called `properties`. So you can use pattern matching on the protocol's `kind` instance variable to translate to the concrete type:

```python
match communication_identifier.kind:
    case CommunicationIdentifierKind.COMMUNICATION_USER:
        print(f"Communication user: {communication_identifier.properties['id']}")
    case CommunicationIdentifierKind.MICROSOFT_TEAMS_USER:
        print(f"Teams user: {communication_identifier.properties['user_id']}")
    case CommunicationIdentifierKind.MICROSOFT_TEAMS_APP:
        print(f"Teams app: {communication_identifier.properties['app_id']}")
    case CommunicationIdentifierKind.PHONE_NUMBER:
        print(f"Phone number: {communication_identifier.properties['value']}")
    case CommunicationIdentifierKind.UNKNOWN:
        print(f"Unknown: {communication_identifier.raw_id}")
    case _:
        # be careful here whether you want to throw because a new SDK version
        # can introduce new identifier types
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

The SDK helps with the conversion:

```python
# get an identifier's raw Id
raw_id = communication_identifier.raw_id

# create an identifier from a given raw Id
identifier = identifier_from_raw_id(raw_id)
```

An invalid raw ID converts to `UnknownIdentifier` in the SDK and any validation only happens service-side.



**Applies to: programming-language-java**


### Communication user

The `CommunicationUserIdentifier` represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.


#### Basic usage

```java
// at some point you will have created a new user identity in your trusted service
CommunicationUserIdentifier newUser = identityClient.CreateUser();

// and then send newUser.getId() down to your client application
// where you can again create an identifier for the user
var sameUser = new CommunicationUserIdentifier(newUserId);
```

#### API reference

[CommunicationUserIdentifier](https://learn.microsoft.com/java/api/com.azure.communication.common.communicationuseridentifier)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifier` represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```java
// get the Teams user's ID from Graph APIs if only the email is known
var user = graphClient.users("bob@contoso.com")
    .buildRequest()
    .get();

// create an identifier
var teamsUser = new MicrosoftTeamsUserIdentifier(user.id);

// if you're not operating in the public cloud, you must also set the right Cloud type.
var gcchTeamsUser = new MicrosoftTeamsUserIdentifier(userId).setCloudEnvironment(CommunicationCloudEnvironment.GCCH);
```

#### API reference

[MicrosoftTeamsUserIdentifier](https://learn.microsoft.com/java/api/com.azure.communication.common.microsoftteamsuseridentifier)

### Phone number

The `PhoneNumberIdentifier` represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```java
// create an identifier
var phoneNumber = new PhoneNumberIdentifier("+112345556789");
```

#### API reference

[PhoneNumberIdentifier](https://learn.microsoft.com/java/api/com.azure.communication.common.phonenumberidentifier)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifier` interface represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. The Teams applications must be configured with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```java
// Get the Microsoft Teams App's ID from Graph APIs
var user = graphClient.users()
	.buildRequest()
	.filter(filterConditions)
	.select("displayName,id")
	.get();

//Here we assume that you have a function getBotFromUsers that gets the bot from the returned response
var bot = getBotFromUsers(users);

// Create an identifier
var teamsAppIdentifier = new MicrosoftTeamsAppIdentifier(bot.id);

// If you're not operating in the public cloud, you must also pass the right Cloud type.
var gcchTeamsAppIdentifier = new MicrosoftTeamsAppIdentifier(bot.id, CommunicationCloudEnvironment.GCCH);
```

#### API reference

[MicrosoftTeamsAppIdentifier](https://learn.microsoft.com/java/api/com.azure.communication.common.microsoftteamsappidentifier)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```java
// get the Teams user's ID from Graph APIs if only the email is known
var user = graphClient.users("bob@contoso.com")
    .buildRequest()
    .get();

// get the tenantId from Graph API
OrganizationCollectionPage organizations = graphClient.organization()
    .buildRequest()
    .get();
String tenantId = organizations.getCurrentPage().get(0).id;

// Communication Services Resource ID
var resourceId = "<resource-id-guid>";

// create an identifier
var teamsExtensionUser = new TeamsExtensionUserIdentifier(user.id, tenantId, resourceId);

// if you're not operating in the public cloud, you must also set the right Cloud type.
var gcchTeamsExtensionUser = new TeamsExtensionUserIdentifier(user.id, tenantId, resourceId).setCloudEnvironment(CommunicationCloudEnvironment.GCCH);
```

#### API reference

[TeamsExtensionUserIdentifier](https://learn.microsoft.com/java/api/com.azure.communication.common.teamsextensionuseridentifier)

### Unknown

The `UnknownIdentifier` exists for future-proofing and you might encounter it when you are on an old version of the SDK and a new identifier type is recently introduced. Any unknown identifier from the service deserializes to `UnknownIdentifier` in the SDK.

#### Basic usage

```java
// create an identifier
var unknown = new UnknownIdentifier("a raw id that originated in the service");
```

#### API reference

[UnknownIdentifier](https://learn.microsoft.com/java/api/com.azure.communication.common.unknownidentifier)

### How to handle the `CommunicationIdentifier` base class

While you construct identifiers for a concrete type that you pass *into* the SDK, the SDK returns the abstract `CommunicationIdentifier`. You can down-cast back to a concrete type:

```java
if (communicationIdentifier instanceof CommunicationUserIdentifier) {
    System.out.println("Communication user: " + ((CommunicationUserIdentifier)communicationIdentifier).getId());
}
else if (communicationIdentifier instanceof MicrosoftTeamsUserIdentifier) {
    System.out.println("Teams user: " + ((MicrosoftTeamsUserIdentifier)communicationIdentifier).getUserId());
}
else if (communicationIdentifier instanceof  MicrosoftTeamsAppIdentifier) {
    Log.i(tag, "Teams app: " + (( MicrosoftTeamsAppIdentifier)communicationIdentifier).getAppId());
}
else if (communicationIdentifier instanceof PhoneNumberIdentifier) {
    System.out.println("Phone number: " + ((PhoneNumberIdentifier)communicationIdentifier).getPhoneNumber());
}
else if (communicationIdentifier instanceof UnknownIdentifier) {
    System.out.println("Unknown user: " + ((UnknownIdentifier)communicationIdentifier).getId());
}
else {
    // be careful here whether you want to throw because a new SDK version
        // can introduce new identifier types
}
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

Since `azure-communication-common 1.2.0` the SDK helps with the conversion:

```java
// get an identifier's raw Id
String rawId = communicationIdentifier.getRawId();

// create an identifier from a given raw Id
CommunicationIdentifier identifier = CommunicationIdentifier.fromRawId(rawId);
```

An invalid raw ID converts to `UnknownIdentifier` in the SDK and any validation only happens service-side.



**Applies to: programming-language-ios**


### Communication user

The `CommunicationUserIdentifier` represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.


#### Basic usage

```swift
// at some point you will have created a new user identity in your trusted service
// and send the new user id down to your client application
// where you can create an identifier for the user
let user = CommunicationUserIdentifier(newUserId)
```

#### API reference

[CommunicationUserIdentifier](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/CommunicationUserIdentifier.html)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifier` represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in an [ID token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```swift
// get the Teams user's ID if only the email is known, assuming a helper method for the Graph API
let userId = await getUserIdFromGraph("bob@contoso.com")

// create an identifier
let teamsUser = MicrosoftTeamsUserIdentifier(userId: userId)

// if you're not operating in the public cloud, you must also pass the right Cloud type.
let gcchTeamsUser = MicrosoftTeamsUserIdentifier(userId: userId, cloud: CommunicationCloudEnvironment.Gcch)
```

#### API reference

[MicrosoftTeamsUserIdentifier](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/MicrosoftTeamsUserIdentifier.html)

### Phone number

The `PhoneNumberIdentifier` represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```swift
// create an identifier
let phoneNumber = PhoneNumberIdentifier(phoneNumber: "+112345556789")
```

#### API reference

[PhoneNumberIdentifier](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/PhoneNumberIdentifier.html)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifier` interface represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. The Teams applications must be configured with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```swift
// Get the Microsoft Teams App's ID from Graph APIs, assuming a helper method for the Graph API
let botId = await getBotIdFromGraph()

// Create an identifier
let teamsAppIdentifier = MicrosoftTeamsAppIdentifier(appId: botId)

// If you're not operating in the public cloud, you must also pass the right Cloud type.
let gcchTeamsAppIdentifier = MicrosoftTeamsAppIdentifier(appId: botId, cloudEnvironment: CommunicationCloudEnvironment.Gcch)
```

#### API reference

[MicrosoftTeamsAppIdentifier](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/MicrosoftTeamsAppIdentifier.html)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```swift
// get the Teams user's ID if only the email is known, assuming a helper method for the Graph API
let userId = await getUserIdFromGraph("bob@contoso.com")

// get the tenantId from Graph API
let tenantId = await getTenantIdFromGraph()

// Communication Services Resource ID
let resourceId = "<resource-id-guid>"

// create an identifier
let teamsExtensionUser = TeamsExtensionUserIdentifier(userId: userId, tenantId: tenantId, resourceId: resourceId)

// if you're not operating in the public cloud, you must also pass the right Cloud type.
let gcchTeamsExtensionUser = TeamsExtensionUserIdentifier(userId: userId, tenantId: tenantId, resourceId: resourceId, cloudEnvironment: CommunicationCloudEnvironment.Gcch)
```

#### API reference

[TeamsExtensionUserIdentifier](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/TeamsExtensionUserIdentifier.html)

### Unknown

The `UnknownIdentifier` exists for future-proofing and you might encounter it when you are on an old version of the SDK and a new identifier type is recently introduced. Any unknown identifier from the service deserializes to `UnknownIdentifier` in the SDK.

#### Basic usage

```swift
// create an identifier
let unknown = UnknownIdentifier("a raw id that originated in the service")
```

#### API reference

[UnknownIdentifier](https://azure.github.io/azure-sdk-for-ios/AzureCommunicationCommon/Classes/UnknownIdentifier.html)

### How to handle the `CommunicationIdentifier` base protocol

While you construct identifiers for a concrete type that you pass *into* the SDK, the SDK returns the `CommunicationIdentifier` protocol. It's easy to down-cast back to a concrete type and we suggest a switch-case statement with pattern matching:

```swift
switch (communicationIdentifier)
{
    case let communicationUser as CommunicationUserIdentifier:
        print(#"Communication user: \(communicationUser.id)"#)
    case let teamsUser as MicrosoftTeamsUserIdentifier:
        print(#"Teams user: \(teamsUser.UserId)"#)
    case let teamsApp as MicrosoftTeamsAppIdentifier:
        print(#"Teams app: \(teamsApp.appId)"#)
    case let phoneNumber as PhoneNumberIdentifier:
        print(#"Phone number: \(phoneNumber.PhoneNumber)"#)
    case let unknown as UnknownIdentifier:
        print(#"Unknown: \(unknown.Id)"#)
    @unknown default:
        // be careful here whether you want to throw because a new SDK version
        // can introduce new identifier types
        break;
}
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

Since `Azure.Communication.Common 1.1.0` the SDK helps with the conversion:

*Swift*
```swift
// get an identifier's raw Id
let rawId = communicationIdentifier.rawId;

// create an identifier from a given raw Id
let identifier = createCommunicationIdentifier(fromRawId: rawId);
```

An invalid raw ID converts to an `UnknownIdentifier` in the SDK and any validation only happens service-side.



**Applies to: programming-language-android**


### Communication user

The `CommunicationUserIdentifier` represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.

#### Basic usage

```java
// at some point you will have created a new user identity in your trusted service
CommunicationUserIdentifier newUser = identityClient.CreateUser();

// and then send newUser.getId() down to your client application
// where you can again create an identifier for the user
CommunicationUserIdentifier sameUser = new CommunicationUserIdentifier(newUserId);
```

#### API reference

[CommunicationUserIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/com/azure/android/communication/common/CommunicationUserIdentifier.html)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifier` represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in an [ID token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```java
// get the Teams user's ID from Graph APIs if only the email is known
User user = graphClient.users("bob@contoso.com")
    .buildRequest()
    .get();

// create an identifier
MicrosoftTeamsUserIdentifier teamsUser = new MicrosoftTeamsUserIdentifier(user.id);

// if you're not operating in the public cloud, you must also set the right Cloud type.
MicrosoftTeamsUserIdentifier gcchTeamsUser = new MicrosoftTeamsUserIdentifier(userId).setCloudEnvironment(CommunicationCloudEnvironment.GCCH);
```

#### API reference

[MicrosoftTeamsUserIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/com/azure/android/communication/common/MicrosoftTeamsUserIdentifier.html)

### Phone number

The `PhoneNumberIdentifier` represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```java
// create an identifier
PhoneNumberIdentifier phoneNumber = new PhoneNumberIdentifier("+112345556789");
```

#### API reference

[PhoneNumberIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/com/azure/android/communication/common/PhoneNumberIdentifier.html)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifier` interface represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. Configure the Teams applications with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```java
// Get the Microsoft Teams App's ID from Graph APIs
UserCollectionPage users = graphClient.users()
	.buildRequest()
	.filter(filterConditions)
	.select("displayName,id")
	.get();

//Here we assume that you have a function getBotFromUsers that gets the bot from the returned response
User bot = getBotFromUsers(users);

// Create an identifier
MicrosoftTeamsAppIdentifier teamsAppIdentifier = new MicrosoftTeamsAppIdentifier(bot.id);

// If you're not operating in the public cloud, you must also pass the right Cloud type.
MicrosoftTeamsAppIdentifier gcchTeamsAppIdentifier = new MicrosoftTeamsAppIdentifier(bot.id, CommunicationCloudEnvironment.GCCH);
```

#### API reference

[MicrosoftTeamsAppIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/com/azure/android/communication/common/MicrosoftTeamsAppIdentifier.html)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```java
// get the Teams user's ID from Graph APIs if only the email is known
User user = graphClient.users("bob@contoso.com")
    .buildRequest()
    .get();

// get the tenantId from Graph API
OrganizationCollectionPage organizations = graphClient.organization()
    .buildRequest()
    .get();
String tenantId = organizations.getCurrentPage().get(0).id;

// Communication Services Resource ID
var resourceId = "<resource-id-guid>";

// create an identifier
var teamsExtensionUser = new TeamsExtensionUserIdentifier(user.id, tenantId, resourceId);

// if you're not operating in the public cloud, you must also set the right Cloud type.
var gcchTeamsExtensionUser = new TeamsExtensionUserIdentifier(user.id, tenantId, resourceId).setCloudEnvironment(CommunicationCloudEnvironment.GCCH);
```

#### API reference

[TeamsExtensionUserIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/com/azure/android/communication/common/TeamsExtensionUserIdentifier.html)

### Unknown

The `UnknownIdentifier` exists for future-proofing and you might encounter it when you are on an old version of the SDK and a new identifier type is recently introduced. Any unknown identifier from the service deserializes to `UnknownIdentifier` in the SDK.

#### Basic usage

```java
// create an identifier
UnknownIdentifier unknown = new UnknownIdentifier("a raw id that originated in the service");
```

#### API reference

[UnknownIdentifier](https://azure.github.io/azure-sdk-for-android/azure-communication-common/com/azure/android/communication/common/UnknownIdentifier.html)

### How to handle the `CommunicationIdentifier` base class

While you construct identifiers for a concrete type that you pass *into* the SDK, the SDK returns the abstract `CommunicationIdentifier`. You can down-cast back to a concrete type:

```java
if (communicationIdentifier instanceof CommunicationUserIdentifier) {
    Log.i(tag, "Communication user: " + ((CommunicationUserIdentifier)communicationIdentifier).getId());
}
else if (communicationIdentifier instanceof MicrosoftTeamsUserIdentifier) {
    Log.i(tag, "Teams user: " + ((MicrosoftTeamsUserIdentifier)communicationIdentifier).getUserId());
}
else if (communicationIdentifier instanceof  MicrosoftTeamsAppIdentifier) {
    Log.i(tag, "Teams app: " + (( MicrosoftTeamsAppIdentifier)communicationIdentifier).getAppId());
}
else if (communicationIdentifier instanceof PhoneNumberIdentifier) {
    Log.i(tag, "Phone number: " + ((PhoneNumberIdentifier)communicationIdentifier).getPhoneNumber());
}
else if (communicationIdentifier instanceof UnknownIdentifier) {
    Log.i(tag, "Unknown user: " + ((UnknownIdentifier)communicationIdentifier).getId());
}
else {
    // be careful here whether you want to throw because a new SDK version
    // can introduce new identifier types
}
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

Since `azure-communication-common 1.1.0` the SDK helps with the conversion:

```java
// get an identifier's raw Id
String rawId = communicationIdentifier.getRawId();

// create an identifier from a given raw Id
CommunicationIdentifier identifier = CommunicationIdentifier.fromRawId(rawId);
```

An invalid raw ID converts to `UnknownIdentifier` in the SDK and any validation only happens service-side.



**Applies to: programming-language-rest**


In REST APIs, the identifier is a polymorphic type: you construct a JSON object and a property that maps to a concrete identifier subtype. For convenience and backwards-compatibility reasons, the `kind` and `rawId` properties are optional in requests but get populated in service responses.

### Communication user

The `CommunicationUserIdentifierModel` represents a user identity created using the [Identity SDK or REST API](../quickstarts/identity/access-tokens.md). It's the only identifier used if your application doesn't use Microsoft Teams interoperability or Telephony features.


#### Basic usage

```json

// at some point you will have created a new user identity in your trusted service
// you can specify an identifier with the id of the new user in a request
{
    "communicationUser": {
        "id": "8:acs:8540c0de-899f-5cce-acb5-3ec493af3800_c94ff260-162d-46d6-94fd-e79f4d213715"
    }
}

// the corresponding serialization in a response
{
    "kind": "communicationUser",
    "rawId": "8:acs:8540c0de-899f-5cce-acb5-3ec493af3800_c94ff260-162d-46d6-94fd-e79f4d213715",
    "communicationUser": {
        "id": "8:acs:8540c0de-899f-5cce-acb5-3ec493af3800_c94ff260-162d-46d6-94fd-e79f4d213715"
    }
}
```

You can find an example for a request that includes an identifier in the Chat REST API for [adding a participant](https://learn.microsoft.com/rest/api/communication/chat/chat-thread/add-chat-participants?tabs=HTTP#chatparticipant), and an example for a response with an identifier under [get chat message](https://learn.microsoft.com/rest/api/communication/chat/chat-thread/get-chat-message?tabs=HTTP#chatmessage).

#### API reference

[CommunicationUserIdentifierModel](https://github.com/Azure/azure-rest-api-specs/blob/c1883ee5b87c41dfcb699420409bc0e31cff0786/specification/communication/data-plane/Common/stable/2022-07-13/common.json#L113)

### Microsoft Teams user

The `MicrosoftTeamsUserIdentifierModel` represents a Teams user with its Microsoft Entra user object ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). Alternatively, you can find the ID as the `oid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```json
// request
{
    "microsoftTeamsUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee"
    }
}

// response
{
    "kind": "microsoftTeamsUser",
    "rawId": "8:orgid:00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
    "microsoftTeamsUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee"
    }
}


// if you're not operating in the public cloud, you must also pass the right Cloud type in a request
{
    "microsoftTeamsUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
        "cloud": "gcch"
    }
}

// response
{
    "kind": "microsoftTeamsUser",
    "rawId": "8:gcch:00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
    "microsoftTeamsUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
        "isAnonymous": false,
        "cloud": "gcch"
    }
}
```

#### API reference

[MicrosoftTeamsUserIdentifierModel](https://github.com/Azure/azure-rest-api-specs/blob/c1883ee5b87c41dfcb699420409bc0e31cff0786/specification/communication/data-plane/Common/stable/2022-07-13/common.json#L139)

### Phone number

The `PhoneNumberIdentifierModel` represents a phone number. The service assumes that phone numbers are formatted in E.164 format.

#### Basic usage

```json
// request
{
    "phoneNumber": {
        "value": "+112345556789"
    }
}

// response
{
    "kind": "phoneNumber",
    "rawId": "4:+112345556789",
    "phoneNumber": {
        "value": "+112345556789"
    }
}
```

#### API reference

[PhoneNumberIdentifierModel](https://github.com/Azure/azure-rest-api-specs/blob/c1883ee5b87c41dfcb699420409bc0e31cff0786/specification/communication/data-plane/Common/stable/2022-07-13/common.json#L126)

### Microsoft Teams Application

The `MicrosoftTeamsAppIdentifierModel` represents a bot of the Teams Voice applications such as Call Queue and Auto Attendant with its Microsoft Entra bot object ID. The Teams applications should be configured with a resource account. You can retrieve the Microsoft Entra bot object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-list) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview).

#### Basic usage

```json
// request
{
    "microsoftTeamsApp": {
        "appId": "00001111-aaaa-2222-bbbb-3333cccc4444"
    }
}

// response
{
    "kind": "microsoftTeamsApp",
    "rawId": "28:orgid:00001111-aaaa-2222-bbbb-3333cccc4444",
    "microsoftTeamsApp": {
        "appId": "00001111-aaaa-2222-bbbb-3333cccc4444"
    }
}


// if you're not operating in the public cloud, you must also pass the right Cloud type in a request
{
    "microsoftTeamsApp": {
        "appId": "00001111-aaaa-2222-bbbb-3333cccc4444",
        "cloud": "gcch"
    }
}

// response
{
    "kind": "microsoftTeamsApp",
    "rawId": "28:gcch:00001111-aaaa-2222-bbbb-3333cccc4444",
    "microsoftTeamsApp": {
        "appId": "00001111-aaaa-2222-bbbb-3333cccc4444",
        "cloud": "gcch"
    }
}
```

#### API reference

[MicrosoftTeamsAppIdentifierModel](https://github.com/Azure/azure-rest-api-specs/blob/ea28180c6ce9027df36568307f235868d581144c/specification/communication/data-plane/Common/stable/2023-11-15/common.json#L165C6-L165C38)

### Teams Extension user

The `TeamsExtensionUserIdentifier` interface represents a Teams user enabled for Teams Phone Extensibility. A `TeamsExtensionUserIdentifier` requires the Microsoft Entra user object ID of the Teams user, the Microsoft Entra tenant ID where the user resides and the Azure Communication Services resource ID. You can retrieve the Microsoft Entra user object ID via the [Microsoft Graph REST API /users](https://learn.microsoft.com/graph/api/user-get) endpoint from the `id` property in the response and the Microsoft Entra tenant ID via the [Microsoft Graph REST API /organization](https://learn.microsoft.com/graph/api/organization-get) endpoint from the `id` property in the response. For more information about working with Microsoft Graph, see [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer?request=users%2F%7Buser-mail%7D&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and look into the [Graph SDK](https://learn.microsoft.com/graph/sdks/sdks-overview). 
Alternatively, you can find the object ID as the `oid` claim and the tenant ID as the `tid` claim in a [Microsoft Entra token](https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference#payload-claims) or [Microsoft Entra access token](https://learn.microsoft.com/entra/identity-platform/access-token-claims-reference#payload-claims) after your user signed in and acquired a token.

#### Basic usage

```json
// request
{
    "teamsExtensionUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
        "tenantId": "d4f5a8c3-2c49-4b9e-a5c6-3c85e80a7f4d",
        "resourceId": "f7e1e3c6-3a1d-4415-8b7d-9e1d4bda2d45"
    }
}

// response
{
    "kind": "teamsExtensionUser",
    "rawId": "8:acs:f7e1e3c6-3a1d-4415-8b7d-9e1d4bda2d45_d4f5a8c3-2c49-4b9e-a5c6-3c85e80a7f4d_00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
    "teamsExtensionUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
        "tenantId": "d4f5a8c3-2c49-4b9e-a5c6-3c85e80a7f4d",
        "resourceId": "f7e1e3c6-3a1d-4415-8b7d-9e1d4bda2d45"
    }
}


// if you're not operating in the public cloud, you must also pass the right Cloud type in a request
{
    "microsoftTeamsUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
        "tenantId": "d4f5a8c3-2c49-4b9e-a5c6-3c85e80a7f4d",
        "resourceId": "f7e1e3c6-3a1d-4415-8b7d-9e1d4bda2d45",
        "cloud": "gcch"
    }
}

// response
{
    "kind": "teamsExtensionUser",
    "rawId": "8:gcch-acs:f7e1e3c6-3a1d-4415-8b7d-9e1d4bda2d45_d4f5a8c3-2c49-4b9e-a5c6-3c85e80a7f4d_00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
    "teamsExtensionUser": {
        "userId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
        "tenantId": "d4f5a8c3-2c49-4b9e-a5c6-3c85e80a7f4d",
        "resourceId": "f7e1e3c6-3a1d-4415-8b7d-9e1d4bda2d45",
        "cloud": "gcch"
    }
}
```

#### API reference

[TeamsExtensionUserIdentifierModel](https://github.com/Azure/azure-rest-api-specs/blob/79436d1724498ebd679471e4fd9356ae8f8d689e/specification/communication/data-plane/Common/stable/2025-06-30/common.json#L195)


### Unknown

If a new identifier is introduced in a service, it downgrades to the `CommunicationIdentifierModel` if you are on an old API version.

#### Basic usage

```json
// request
{
    "rawId": "a raw id that originated in the service"
}

// response
{
    "kind": "unknown",
    "rawId": "a raw id that originated in the service"
}
```

#### API reference

[CommunicationIdentifierModel](https://github.com/Azure/azure-rest-api-specs/blob/c1883ee5b87c41dfcb699420409bc0e31cff0786/specification/communication/data-plane/Common/stable/2022-07-13/common.json#L87)

### How to handle the `CommunicationIdentifierModel` in responses

Recent API versions populate a `kind` property that you can use to discriminate on:

```javascript
switch (communicationIdentifier.kind)
{
    case "communicationUser":
        console.log(`Communication user: ${communicationIdentifier.communicationUser.id}`);
        break;
    case "microsoftTeamsUser":
        console.log(`Teams user: ${communicationIdentifier.microsoftTeamsUser.userId}`);
        break;
    case "microsoftTeamsApp":
        console.log(`Teams user: ${communicationIdentifier.microsoftTeamsApp.appId}`);
        break;
    case "phoneNumber":
        console.log(`Phone number: ${communicationIdentifier.phoneNumber.value}`);
        break;
    case "unknown":
        console.log(`Unknown: ${communicationIdentifier.rawId}`);
        break;
    default:
        // this case should not be hit because adding a new identifier type requires a new API version
        // if it does get hit, please file an issue on https://github.com/Azure/azure-rest-api-specs/issues 
        break;
}
```

On older API versions, the `kind` property is missing and you need to check for the correct subproperty:

```javascript
if (communicationIdentifier.communicationUser) {
    console.log(`Communication user: ${communicationIdentifier.communicationUser.id}`);
} else if (communicationIdentifier.microsoftTeamsUser) {
    console.log(`Teams user: ${communicationIdentifier.microsoftTeamsUser.userId}`);
} else if (communicationIdentifier.microsoftTeamsApp) {
    console.log(`Teams app: ${communicationIdentifier.microsoftTeamsApp.appId}`);
} else if (communicationIdentifier.phoneNumber) {
    console.log(`Phone number: ${communicationIdentifier.phoneNumber.value}`);
} else {
    console.log(`Unknown: ${communicationIdentifier.rawId}`);
}
```

## Raw ID representation

Sometimes you need to serialize an identifier to a flat string. For example, if you want to store the identifier in a database table or if you want to use it as a URL parameter.

For that purpose, identifiers have another representation called `RawId`. An identifier can always be translated to its corresponding raw ID, and a valid raw ID can always be converted to an identifier.

If you're using the Azure SDK, it helps you with the conversion. If you use the REST API directly, you need to construct the raw ID manually as follows.

### Communication user

*Identifier:*
```json
{
    "communicationUser": {
        "id": "[communicationUserId]"
    }
}
```
*Raw ID:*

`[communicationUserId]`

The raw ID is the same as `communicationUser.id`.

### Microsoft Teams user

*Identifier:*
```json
{
    "microsoftTeamsUser": {
        "userId": "[entraUserId]"
    }
}
```
*Raw ID:*

`8:orgid:[entraUserId]`

The raw ID is the Microsoft Entra user object ID prefixed with `8:orgid:`.

*Identifier:*
```json
{
    "microsoftTeamsUser": {
        "userId": "[entraUserId]",
        "cloud": "gcch"
    }
}
```
*Raw ID:*

`8:gcch:[entraUserId]`

The raw ID is the Microsoft Entra user object ID prefixed with `8:gcch:` or `8:dod:` depending on the cloud environment.

*Identifier:*
```json
{
    "microsoftTeamsUser": {
        "userId": "[visitorUserId]",
        "isAnonymous": true
    }
}
```
*Raw ID:* 

`8:teamsvisitor:[visitorUserId]`

The raw ID is the Teams visitor ID prefixed with `8:teamsvisitor:`. The Teams visitor ID is a temporary ID that Teams generates to enable meeting access.

### Phone number

*Identifier:*
```json
{
    "phoneNumber": {
        "value": "+1123455567"
    }
}
```
*Raw ID:*

`4:+1123455567`

The raw ID is the E.164 formatted phone number prefixed with `4:`.

### Microsoft Teams app

*Identifier:*
```json
{
    "microsoftTeamsApp": {
        "appId": "[entraUserId]"
    }
}
```
*Raw ID:*

`28:orgid:[entraUserId]`

The raw ID is the application's Microsoft Entra user object ID prefixed with `28:orgid:`.

*Identifier:*
```json
{
    "microsoftTeamsUser": {
        "userId": "[entraUserId]",
        "cloud": "gcch"
    }
}
```
*Raw ID:*

`28:gcch:[entraUserId]`

The raw ID is the application's Microsoft Entra user object ID prefixed with `28:gcch:` or `28:dod:` depending on the cloud environment.

### Unknown

*Identifier:*
```json
{
    "rawId": "[unknown identifier id]"
}
```
*Raw ID:*

`[unknown identifier id]`

If a raw ID is invalid, the service fails the request.




## Next steps

* For an introduction to communication identities, see [Identity model](identity-model.md).
* To learn how to quickly create identities for testing, see the [quick-create identity quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/identity/quick-create-identity.md).
* To learn how to use Communication Services together with Microsoft Teams, see [Teams interoperability](teams-interop.md).
* To learn how to use a Raw ID, see [Use cases for string identifiers in Communication SDKs](raw-id-use-cases.md).
