---
title: Azure Web PubSub basic concepts about hubs, groups, and connections
description: Understand the basic concepts and terms used in Azure Web PubSub.
author: vicancy
ms.author: lianwei
ms.service: azure-web-pubsub
ms.topic: concept-article
ms.date: 09/08/2026
ms.custom: mode-other
---

# Azure Web PubSub basic concepts

Azure Web PubSub service helps you build real-time messaging web applications. The clients connect to the service using the [standard WebSocket protocol](https://datatracker.ietf.org/doc/html/rfc6455), and the service exposes [REST APIs](https://learn.microsoft.com/rest/api/webpubsub) and SDKs for you to manage these clients.

## Terms

Here are some important terms used by the service:


- **Connection**: A connection, also known as a client or a **client connection**, it's a logical relationship between a client and the Web PubSub service. Over a 'connection', the client and the service engage in a series of stateful interactions. **Connections** using different protocols might behave differently, for example, some **connections** are limited to the duration of a network connection, while others can extend across multiple successive network connections between a client and the service.

- **Hub**: A hub is a logical concept for a set of client connections. Usually you use one hub for one scenario, for example, a *chat* hub, or a *notification* hub. When a client connection connects, it connects to a hub, and during its lifetime it belongs to that hub. Once a client connection connects to the hub, the hub exists. Different applications can share one Azure Web PubSub service by using different hub names. While there is no strict limit on the number of hubs, a **hub** consumes more service load comparing to a **group**. It is recommended to have a predetermined set of hubs rather than generating them dynamically.

- **Group**: A group is a subset of connections to the hub. You can add a client connection to a group, or remove the client connection from the group, anytime you want. For example, when a client joins a chat room, or when a client leaves the chat room, this chat room can be considered to be a group. A client can join multiple groups, and a group can contain multiple clients. The group is like a group "session", the group session is created once someone joins the group, and the session is gone when no one is in the group. Messages sent to the group are delivered to all of the clients connected to the group.

- **User**: Connections to Web PubSub can belong to one user. A user might have multiple connections, for example when a single user is connected across multiple devices or multiple browser tabs.

- **Message**: When the client is connected, it can send messages to the upstream application, or receive messages from the upstream application, through the WebSocket connection. Messages can be in plain text, binary, or JSON format and have a maximum size of 1 MB.

- **Client Events**: Events are created during the lifecycle of a client connection. For example, a simple WebSocket client connection creates a `connect` event when it tries to connect to the service, a `connected` event when it successfully connected to the service, a `message` event when it sends messages to the service in its default mode `sendEvent` and a `disconnected` event when it disconnects from the service. Details about *client events* are illustrated in [Client protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/concept-service-internals.md#client-protocol) section.

- **Event Handler**: The event handler contains the logic to handle the client events. Register and configure event handlers in the service through the portal or Azure CLI beforehand. Details are described in [Event handler](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/concept-service-internals.md#event-handler) section.

- **Event Listener**: The event listener just listens to the client events but can't interfere the lifetime of your clients through their response. Details are described in [Event listener](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/concept-service-internals.md#event-listener) section.

- **Server**: The server can handle client events, manage client connections, or publish messages to groups. Both event handler and event listener are considered to be server-side. Details about **server** are described in the [Server protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/concept-service-internals.md#server-protocol) section.


> **Important:**
> `Hub`, `Group`, `UserId` are important roles when you manage clients and send messages. They will be required parameters in different REST API calls as plain text. So __DO NOT__ put sensitive information in these fields. For example, credentials or bearer tokens which will have high leak risk.

> **Note:**
> If your application uses REST APIs to address groups or users, avoid forward slashes (`/`) in group names and user IDs. URL-encoding `/` as `%2F` might not allow a REST operation to address the intended group or user. For details and a workaround, see [Group names and user IDs in request paths](reference-rest-api-data-plane.md#group-names-and-user-ids-in-request-paths).

## Workflow

A typical workflow using the service is shown as below:

Diagram showing the Web PubSub service workflow.

As illustrated by the above workflow graph:

1. A *client* connects to a hub in the service using WebSocket transport. The service may forward the messages to the configured upstream(server), or handle the messages on its own and allow the clients to do pub/sub directly, depending on the protocol the client uses. Details are described in [client protocols](concept-service-internals.md#client-protocol).

2. The service invokes the server using **CloudEvents protocol** on different client events. [**CloudEvents**](https://github.com/cloudevents/spec/blob/v1.0.1/spec.md) is a standardized and protocol-agnostic definition of the structure and metadata description of events hosted by the Cloud Native Computing Foundation (CNCF). Details are described in [server protocol](concept-service-internals.md#server-protocol).

3. Server can invoke the service using REST API to send messages to clients or to manage the connected clients. Details are described in [server protocol](concept-service-internals.md#server-protocol)
