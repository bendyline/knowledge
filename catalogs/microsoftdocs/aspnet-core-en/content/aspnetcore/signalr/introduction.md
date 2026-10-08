---
title: Overview of ASP.NET Core SignalR
ai-usage: ai-assisted
author: wadepickett
description: Explore ASP.NET Core SignalR, where you can add real-time capabilities to your apps with automatic connection management and scalable messaging solutions.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.reviewer: wpickett
ms.date: 05/20/2026
uid: signalr/introduction

# customer intent: As an ASP.NET developer, I want to use SignalR with ASP.NET Core, so I can add real-time capabilities to my apps.
---
# Overview of ASP.NET Core SignalR

**Applies to: \>= aspnetcore-10.0**

ASP.NET Core SignalR is an open-source library that simplifies adding real-time web functionality to apps. Real-time web functionality enables server-side code to push content to clients instantly. There are many scenarios where an ASP.NET Core application can benefit from SignalR:

| Scenario | Examples |
| --- | --- |
| Applications that require high frequency updates from the server | Gaming, Social networks, Voting sites, Auctions, Maps, GPS |
| Dashboards and apps for monitoring | Company dashboards, Instant sales updates, Travel alerts |
| Apps that support collaboration | Whiteboard apps, Team meeting software |
| Apps that require notifications | Social networks, Email, Chat, Games, Travel alerts |

This article provides an introduction to working with SignalR in your ASP.NET Core apps.

## Features and source code

SignalR provides an API for creating server-to-client [remote procedure calls (RPC)](https://wikipedia.org/wiki/Remote_procedure_call). The RPCs invoke functions on clients from server-side .NET code. There are several [supported platforms](supported-platforms.md), each with their respective client SDK. The programming language invoked by the RPC call varies based on the platform.

SignalR for ASP.NET Core provides developers with many features:

* Handle connection management automatically
* Send messages to all connected clients simultaneously (for example, a chat room)
* Send messages to specific clients or groups of clients
* Scale to handle increasing traffic with options like the [Azure SignalR Service](scale.md) and [Redis backplane](redis-backplane.md)
* Support trimming and native ahead-of-time (AOT) compilation for supported scenarios
* Support polymorphic type handling in hub methods
* Support distributed tracing with `ActivitySource` for SignalR hub server and .NET client
* Work with the [SignalR Hub Protocol](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/docs/specs/HubProtocol.md)

The source is hosted in the [ASP.NET Core SignalR repository on GitHub](https://github.com/dotnet/AspNetCore/tree/main/src/SignalR).

## Transports

SignalR supports the following techniques for handling real-time communication (in order of graceful fallback):

* [WebSockets](../fundamentals/websockets.md)
* Server-sent events
* Long polling

SignalR automatically chooses the best transport method within the capabilities of the server and client. WebSockets is the preferred transport because it generally provides the best performance.

## Hubs

SignalR uses *hubs* to communicate between clients and servers.

A hub is a high-level pipeline that a client and server use to call methods on each other. SignalR automatically handles the dispatching across machine boundaries, so clients can call methods on the server and vice versa. You can pass strongly typed parameters to methods and enable model binding.

SignalR supports two built-in hub protocols:

- A text protocol based on JSON (default)
- A binary protocol based on MessagePack. MessagePack generally creates smaller messages compared to JSON. For more information, see [signalr/messagepackhubprotocol](messagepackhubprotocol.md).

Hubs call client-side code by sending messages that contain the name and parameters of the client-side method. The configured protocol deserializes objects sent as method parameters. The client tries to match the name to a method in the client-side code. When the client finds a match, it calls the method and passes the deserialized parameter data.

## Related content

* [tutorials/signalr](../tutorials/signalr.md)
* [signalr/supported-platforms](supported-platforms.md)
* [signalr/hubs](hubs.md)
* [signalr/diagnostics](diagnostics.md)
* [signalr/scale](scale.md)
* [signalr/javascript-client](javascript-client.md)
* [blazor/fundamentals/signalr](../blazor/fundamentals/signalr.md)



**Applies to: \= aspnetcore-9.0**

## What is SignalR?

ASP.NET Core SignalR is an open-source library that simplifies adding real-time web functionality to apps. Real-time web functionality enables server-side code to push content to clients instantly.

Good candidates for SignalR:

* Apps that require high frequency updates from the server. Examples are gaming, social networks, voting, auction, maps, and GPS apps.
* Dashboards and monitoring apps. Examples include company dashboards, instant sales updates, or travel alerts.
* Collaborative apps. Whiteboard apps and team meeting software are examples of collaborative apps.
* Apps that require notifications. Social networks, email, chat, games, travel alerts, and many other apps use notifications.

SignalR provides an API for creating server-to-client [remote procedure calls (RPC)](https://wikipedia.org/wiki/Remote_procedure_call). The RPCs invoke functions on clients from server-side .NET code. There are several [supported platforms](supported-platforms.md), each with their respective client SDK. Because of this, the programming language being invoked by the RPC call varies.

Here are some features of SignalR for ASP.NET Core:

* Handles connection management automatically.
* Sends messages to all connected clients simultaneously. For example, a chat room.
* Sends messages to specific clients or groups of clients.
* Scales to handle increasing traffic with options such as the [Azure SignalR Service](scale.md) and [Redis backplane](redis-backplane.md).
* Supports trimming and native ahead-of-time (AOT) compilation for supported scenarios.
* Supports polymorphic type handling in hub methods.
* Supports distributed tracing with `ActivitySource` for SignalR hub server and .NET client.
* [SignalR Hub Protocol](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/docs/specs/HubProtocol.md)

The source is hosted in a [SignalR repository on GitHub](https://github.com/dotnet/AspNetCore/tree/main/src/SignalR).

## Transports

SignalR supports the following techniques for handling real-time communication (in order of graceful fallback):

* [WebSockets](../fundamentals/websockets.md)
* Server-Sent Events
* Long Polling

SignalR automatically chooses the best transport method that is within the capabilities of the server and client. WebSockets is the preferred transport because it generally provides the best performance.

## Hubs

SignalR uses *hubs* to communicate between clients and servers.

A hub is a high-level pipeline that allows a client and server to call methods on each other. SignalR handles the dispatching across machine boundaries automatically, allowing clients to call methods on the server and vice versa. You can pass strongly-typed parameters to methods, which enables model binding. SignalR supports two built-in hub protocols: a text protocol based on JSON (default) and a binary protocol based on MessagePack. MessagePack generally creates smaller messages compared to JSON. For more information, see [signalr/messagepackhubprotocol](messagepackhubprotocol.md).

Hubs call client-side code by sending messages that contain the name and parameters of the client-side method. Objects sent as method parameters are deserialized using the configured protocol. The client tries to match the name to a method in the client-side code. When the client finds a match, it calls the method and passes to it the deserialized parameter data.

## Additional resources

* [Get started with SignalR for ASP.NET Core](../tutorials/signalr.md)
* [Supported Platforms](supported-platforms.md)
* [Hubs](hubs.md)
* [Logging and diagnostics in ASP.NET Core SignalR](diagnostics.md)
* [Hosting and scaling ASP.NET Core SignalR](scale.md)
* [JavaScript client](javascript-client.md)
* [blazor/fundamentals/signalr](../blazor/fundamentals/signalr.md)




**Applies to: \>= aspnetcore-2.1 <= aspnetcore-8.0**

## What is SignalR?

ASP.NET Core SignalR is an open-source library that simplifies adding real-time web functionality to apps. Real-time web functionality enables server-side code to push content to clients instantly.

Good candidates for SignalR:

* Apps that require high frequency updates from the server. Examples are gaming, social networks, voting, auction, maps, and GPS apps.
* Dashboards and monitoring apps. Examples include company dashboards, instant sales updates, or travel alerts.
* Collaborative apps. Whiteboard apps and team meeting software are examples of collaborative apps.
* Apps that require notifications. Social networks, email, chat, games, travel alerts, and many other apps use notifications.

SignalR provides an API for creating server-to-client [remote procedure calls (RPC)](https://wikipedia.org/wiki/Remote_procedure_call). The RPCs invoke functions on clients from server-side .NET code. There are several [supported platforms](supported-platforms.md), each with their respective client SDK. Because of this, the programming language being invoked by the RPC call varies.

Here are some features of SignalR for ASP.NET Core:

* Handles connection management automatically.
* Sends messages to all connected clients simultaneously. For example, a chat room.
* Sends messages to specific clients or groups of clients.
* Scales to handle increasing traffic.
* [SignalR Hub Protocol](https://github.com/dotnet/aspnetcore/blob/main/src/SignalR/docs/specs/HubProtocol.md)

The source is hosted in a [SignalR repository on GitHub](https://github.com/dotnet/AspNetCore/tree/main/src/SignalR).

## Transports

SignalR supports the following techniques for handling real-time communication (in order of graceful fallback):

* [WebSockets](../fundamentals/websockets.md)
* Server-Sent Events
* Long Polling

SignalR automatically chooses the best transport method that is within the capabilities of the server and client.

## Hubs

SignalR uses *hubs* to communicate between clients and servers.

A hub is a high-level pipeline that allows a client and server to call methods on each other. SignalR handles the dispatching across machine boundaries automatically, allowing clients to call methods on the server and vice versa. You can pass strongly-typed parameters to methods, which enables model binding. SignalR provides two built-in hub protocols: a text protocol based on JSON and a binary protocol based on [MessagePack](https://msgpack.org/). MessagePack generally creates smaller messages compared to JSON. Older browsers must support [XHR level 2](https://caniuse.com/#feat=xhr2) to provide MessagePack protocol support.

Hubs call client-side code by sending messages that contain the name and parameters of the client-side method. Objects sent as method parameters are deserialized using the configured protocol. The client tries to match the name to a method in the client-side code. When the client finds a match, it calls the method and passes to it the deserialized parameter data.

<a name="es6"></a>

## Browsers that don't support ECMAScript 6 (ES6)

SignalR targets ES6. For browsers that don't support ES6, transpile the library to ES5. For more information, see [Getting Started with ES6 – Transpiling ES6 to ES5 with Traceur and Babel](https://blog.codewithdan.com/getting-started-with-es6-transpiling-es6-to-es5-with-traceur-and-babel/).


## Additional resources

* [Introduction to ASP.NET Core SignalR](https://learn.microsoft.com/training/modules/aspnet-core-signalr)
* [Get started with SignalR for ASP.NET Core](../tutorials/signalr.md)
* [Supported Platforms](supported-platforms.md)
* [Hubs](hubs.md)
* [JavaScript client](javascript-client.md)
* [Browsers that don't support ECMAScript 6 (ES6)](https://learn.microsoft.com/search/?terms=signalr%2Fsupported-platforms%23es6)
* [blazor/fundamentals/signalr](../blazor/fundamentals/signalr.md)
