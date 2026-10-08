---
title: Azure Web PubSub service data plane REST API specification for MQTT
description: Clarifies the meanings of the Web PubSub data-plane REST API in the context of MQTT
author: Y-Sindo
ms.author: zityang
ms.service: azure-web-pubsub
ms.topic: reference
ms.date: 07/23/2024
---

# REST API specification for MQTT

This document clarifies the meanings of the Web PubSub data-plane REST API in the context of MQTT. The existing Web PubSub REST API documentation is focused on Web PubSub’s own protocols, which may make its application to MQTT unclear.

## Term mappings

To begin, familiarize yourself with the term mappings between Web PubSub and MQTT. If you are already familiar with these terms, you may skip this section.


| MQTT terms | Corresponding Web PubSub terms | Relationship |
| --- | --- | --- |
| Server/MQTT Broker | Web PubSub Service | Web PubSub service work as MQTT brokers to serve MQTT connections. Please note that we usually use the term *server* to refer to the upstream server instead of the MQTT brokers in the documents. |
| Session | Connection | *Connection* in Web PubSub is a logical concept that represents a stateful relationship between the client and service, and one *Connection* is corresponding to one *Session*. Usually these two words are interchangeable. |
| Subscribe To A Topic | Join A Group | These two actions have the same effect: the client will receive messages from that topic or group. Topic name is the group name. |
| Publish Message To A Topic | Send Message To A Group | These two actions have the same effect: the client who subscribes to that topic or belong to that group will receive the message |
| Client ID | Connection ID | *Connection ID* identifies a *Connection* to Web PubSub. We use the *Client ID* as the *Connection ID* of MQTT connections in Web PubSub. |

## Operation mappings

For a comprehensive list of available operations, refer to the [REST API reference](https://learn.microsoft.com/rest/api/webpubsub).

The REST API operations are categorized into the following groups:

* [Message sending operations](#message-sending-operations)
* [Subscription management operations](#subscription-management-operations)
* [Permission management operations](#permission-management-operations)
* [Existence management operations](#existence-management-operations)
* [Client token generation operations](#client-token-generation-operations)

Each of these categories is defined below.

### Message sending operations

| REST API Operation | Effect on MQTT |
| --- | --- |
| Send to Group | MQTT connections subscribed to the topic named with the group name will receive the message. |
| Send to All<br>Send to User<br>Send to Connection | The respective MQTT connections will receive a message with the topic `$webpubsub/server/messages`. |

Messages are published with a QoS of 1. The QoS of received messages may be downgraded based on the clients' subscription options, following the standard MQTT downgrading rules.

### Subscription management operations

| REST API Operation | Effect on MQTT |
| --- | --- |
| Add Connections to Groups<br>Add Connection to Group | Adds a subscription for the specified connections. |
| Add User to Group | Adds a subscription for all connections of the specified user. |
| Remove Connection from All Groups<br>Remove Connection from Group<br>Remove Connections from Groups<br>Remove User from All Groups<br>Remove User from Group | Removes one or all subscriptions for the specified connections or users. |

The group name corresponds to the MQTT topic filter. When adding connections or users to groups, default MQTT subscription options are used.

### Permission management operations

These operations are straightforward in the context of MQTT and thus the definition is ignored.
* Check Permission
* Grant Permission
* Revoke Permission

### Existence management operations

| REST API Operation | Effect on MQTT |
| --- | --- |
| Connection Exists<br>Group Exists<br>User Exists | Checks whether a session exists for the specified connection, user, or group. Note that this differs from checking if a connection is currently online. |
| Close All Connections<br>Close Group Connections<br>Close User Connections | Ends the specified sessions and terminates the corresponding physical connections. |

### Client token generation operations

| REST API Operation | Effect on MQTT |
| --- | --- |
| Generate Client Token | Generates the connection token and URL for MQTT clients to connect. |

Please note that MQTT support is available starting from REST API version `2024-01-01`. You must specify the query parameter `clientType=MQTT` for MQTT clients.
