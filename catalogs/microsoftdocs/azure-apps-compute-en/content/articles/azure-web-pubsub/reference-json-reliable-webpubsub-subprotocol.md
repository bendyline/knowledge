---
title: Reference - Azure Web PubSub JSON WebSocket subprotocol `json.reliable.webpubsub.azure.v1`
description: The reference describes Azure Web PubSub supported WebSocket subprotocol `json.reliable.webpubsub.azure.v1`
author: zackliu
ms.author: chenyl
ms.service: azure-web-pubsub
ms.topic: reference
ms.date: 01/09/2023
---

# Azure Web PubSub Reliable JSON WebSocket subprotocol

The JSON WebSocket subprotocol, `json.reliable.webpubsub.azure.v1`, enables the highly reliable exchange of publish/subscribe messages directly between clients through the service without a round trip to the upstream server.

This document describes the subprotocol `json.reliable.webpubsub.azure.v1`.

When WebSocket client connections drop due to intermittent network issues, messages can be lost. In a pub/sub system, publishers are decoupled from subscribers and may not detect a subscribers' dropped connection or message loss. 

To overcome intermittent network issues and maintain reliable message delivery, you can use the Azure WebPubSub `json.reliable.webpubsub.azure.v1` subprotocol to create a *Reliable PubSub WebSocket client*.  

A *Reliable PubSub WebSocket client* can:

* recover a connection from intermittent network issues.
* recover from message loss.
* join a group using [join requests](#join-groups).
* leave a group using [leave requests](#leave-groups).
* publish messages directly to a group using [publish requests](#publish-messages).
* stream messages directly to a group using [streaming requests](#start-streaming-messages).
* route messages directly to upstream event handlers using [event requests](#send-custom-events).

For example, you can create a *Reliable PubSub WebSocket client* with the following JavaScript code:

```js
var pubsub = new WebSocket('wss://test.webpubsub.azure.com/client/hubs/hub1', 'json.reliable.webpubsub.azure.v1');
```

See [How to create reliable clients](howto-develop-reliable-clients.md) to implement reconnection and message reliability for publisher and subscriber clients.

When the client is using this subprotocol, both outgoing and incoming data frames must contain JSON payloads.


## Permissions

A PubSub WebSocket client can only publish to other clients when it's authorized. The `roles` assigned to the client determine the permissions granted to the client:

| Role | Permission |
| --- | --- |
| Not specified | The client can send event requests. |
| `webpubsub.joinLeaveGroup` | The client can join/leave any group. |
| `webpubsub.sendToGroup` | The client can publish messages to any group. |
| `webpubsub.joinLeaveGroup.<group>` | The client can join/leave the group `<group>`. |
| `webpubsub.sendToGroup.<group>` | The client can publish messages to the group `<group>`. |
| `webpubsub.joinLeaveGroups.<pattern>` | The client can join/leave any group whose name matches `<pattern>` (see [Wildcard group role patterns](concept-wildcard-group-roles.md)). |
| `webpubsub.sendToGroups.<pattern>` | The client can publish messages to any group whose name matches `<pattern>` (see [Wildcard group role patterns](concept-wildcard-group-roles.md)). |

The server can dynamically grant or revoke client permissions through REST APIs or server SDKs.

> **Note:**
> Wildcard roles (e.g., `webpubsub.sendToGroups.<pattern>`) are not supported in REST APIs or server SDKs during runtime yet.

## Requests


### Join groups

Format:

```json
{
    "type": "joinGroup",
    "group": "<group_name>",
    "ackId" : 1
}
```

* `ackId` is the identity of each request and should be unique. The service sends a [ack response message](#ack-response) to notify the process result of the request. For details, see  [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)

### Leave groups

Format:

```json
{
    "type": "leaveGroup",
    "group": "<group_name>",
    "ackId" : 1
}
```

* `ackId` is the identity of each request and should be unique. The service sends a [ack response message](#ack-response) to notify the process result of the request. For details, see [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)

### Publish messages

Format:

```json
{
    "type": "sendToGroup",
    "group": "<group_name>",
    "ackId" : 1,
    "noEcho": true|false,
    "dataType" : "json|text|binary",
    "data": {}, // data can be string or valid json token depending on the dataType 
}
```

* `ackId` is the identity of each request and should be unique. The service sends a [ack response message](#ack-response) to notify the process result of the request. For details, see [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)
* `noEcho` is optional. If set to true, this message isn't echoed back to the same connection. If not set, the default value is false.
* `dataType` can be set to `json`, `text`, or `binary`:
     * `json`: `data` can be any type that JSON supports and will be published as what it is; If `dataType` isn't specified, it defaults to `json`.
     * `text`: `data` should be in string format, and the string data will be published;
     * `binary`: `data` should be in base64 format, and the binary data will be published;

#### Case 1: publish text data:

```json
{
    "type": "sendToGroup",
    "group": "<group_name>",
    "dataType" : "text",
    "data": "text data",
    "ackId": 1
}
```

* The subprotocol clients in `<group_name>` receive:

```json
{
    "type": "message",
    "from": "group",
    "group": "<group_name>",
    "dataType" : "text",
    "data" : "text data"
}
```

* The simple WebSocket clients in `<group_name>` receive the string `text data`.

#### Case 2: publish JSON data:

```json
{
    "type": "sendToGroup",
    "group": "<group_name>",
    "dataType" : "json",
    "data": {
        "hello": "world"
    }
}
```

* The subprotocol clients in `<group_name>` receive:

```json
{
    "type": "message",
    "from": "group",
    "group": "<group_name>",
    "dataType" : "json",
    "data" : {
        "hello": "world"
    }
}
```

* The simple WebSocket clients in `<group_name>` receive the serialized string `{"hello": "world"}`.

#### Case 3: publish binary data:

```json
{
    "type": "sendToGroup",
    "group": "<group_name>",
    "dataType" : "binary",
    "data": "<base64_binary>",
    "ackId": 1
}
```

* The subprotocol clients in `<group_name>` receive:

```json
{
    "type": "message",
    "from": "group",
    "group": "<group_name>",
    "dataType" : "binary",
    "data" : "<base64_binary>", 
}
```

* The simple WebSocket clients in `<group_name>` receive the **binary** data in the binary frame.

### Start streaming messages

To start a group stream, send a `sendToGroup` request with the `stream` property. A stream start request doesn't contain `data`, `dataType`, or `ackId`.

Format:

```json
{
    "type": "sendToGroup",
    "group": "<group_name>",
    "noEcho": true|false,
    "stream": {
        "streamId": "<stream_id>",
        "idleTimeoutMs": 300000
    }
}
```

* `stream.streamId` is the identifier of the logical stream. It must be a non-empty string and must be unique among active streams on the same client connection. Client libraries are recommended to generate a globally unique value, such as a GUID or UUID.
* `stream.idleTimeoutMs` is optional. If specified, it must be greater than `0`. If omitted, the service default is `300000` milliseconds. The value is an idle timeout, not a total stream lifetime. Send stream data, send a stream keepalive, or end the stream before this timeout elapses when the application needs to keep the stream open.
* `noEcho` is optional. If set to true, stream messages aren't echoed back to the same connection. If not set, the default value is false.

When the stream is accepted, the client receives a [stream ack response](#stream-ack-response) with `expectedSequenceId` set to `1`.

### Send streaming data

To send stream data, send a `streamData` request with `streamId`, `streamSequenceId`, `dataType`, and `data`.

Format:

```json
{
    "type": "streamData",
    "streamId": "<stream_id>",
    "streamSequenceId": 1,
    "dataType" : "json|text|binary",
    "data": {}
}
```

* `streamId` identifies an active stream on the same client connection.
* `streamSequenceId` is a positive uint64 number. The first data fragment in a stream uses `1`, and each following data fragment for the same `streamId` increases by exactly `1`.
* `dataType` can be set to `json`, `text`, or `binary`, with the same data encoding rules as [publish messages](#publish-messages).

To keep a stream active without delivering data to subscribers, send a `streamData` request with only `type` and `streamId`.

```json
{
    "type": "streamData",
    "streamId": "<stream_id>"
}
```

### End streaming messages

To end a stream, send a `streamEnd` request.

Format:

```json
{
    "type": "streamEnd",
    "streamId": "<stream_id>"
}
```

To end a stream with an application-defined error, include the optional `error` property.

```json
{
    "type": "streamEnd",
    "streamId": "<stream_id>",
    "error": {
        "message": "<error_detail>",
        "userErrorCode": "<application_error_code>"
    }
}
```

* `error.message` is an optional human-readable error message.
* `error.userErrorCode` is an optional application-defined error code.

When the stream is closed, the publisher receives a [stream closed response](#stream-closed-response).

### Send custom events

Format:

```json
{
    "type": "event",
    "event": "<event_name>",
    "ackId": 1,
    "dataType" : "json|text|binary",
    "data": {}, // data can be string or valid json token depending on the dataType 
}
```

* `ackId` is the identity of each request and should be unique. The service sends a [ack response message](#ack-response) to notify the process result of the request. For details, see [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)

`dataType` can be one of `text`, `binary`, or `json`:

* `json`: data can be any type json supports and will be published as what it is; The default is `json`.
* `text`: data is in string format, and the string data will be published;
* `binary`: data is in base64 format, and the binary data will be published;

#### Case 1: send event with text data:

```json
{
    "type": "event",
    "event": "<event_name>",
    "ackId": 1,
    "dataType" : "text",
    "data": "text data", 
}
```

The upstream event handler receives data similar to:

```HTTP
POST /upstream HTTP/1.1
Host: xxxxxx
WebHook-Request-Origin: xxx.webpubsub.azure.com
Content-Type: text/plain
Content-Length: nnnn
ce-specversion: 1.0
ce-type: azure.webpubsub.user.<event_name>
ce-source: /client/{connectionId}
ce-id: {eventId}
ce-time: 2021-01-01T00:00:00Z
ce-signature: sha256={connection-id-hash-primary},sha256={connection-id-hash-secondary}
ce-userId: {userId}
ce-connectionId: {connectionId}
ce-hub: {hub_name}
ce-eventName: <event_name>

text data

```

The `Content-Type` for the CloudEvents HTTP request is `text/plain` when `dataType` is `text`.

#### Case 2: send event with JSON data:
```json
{
    "type": "event",
    "event": "<event_name>",
    "ackId": 1,
    "dataType" : "json",
    "data": {
        "hello": "world"
    }, 
}
```

The upstream event handler receives data similar to:

```HTTP
POST /upstream HTTP/1.1
Host: xxxxxx
WebHook-Request-Origin: xxx.webpubsub.azure.com
Content-Type: application/json
Content-Length: nnnn
ce-specversion: 1.0
ce-type: azure.webpubsub.user.<event_name>
ce-source: /client/{connectionId}
ce-id: {eventId}
ce-time: 2021-01-01T00:00:00Z
ce-signature: sha256={connection-id-hash-primary},sha256={connection-id-hash-secondary}
ce-userId: {userId}
ce-connectionId: {connectionId}
ce-hub: {hub_name}
ce-eventName: <event_name>

{
    "hello": "world"
}

```

The `Content-Type` for the CloudEvents HTTP request is `application/json` when `dataType` is `json`

#### Case 3: send event with binary data:
```json
{
    "type": "event",
    "event": "<event_name>",
    "ackId": 1,
    "dataType" : "binary",
    "data": "base64_binary", 
}
```

The upstream event handler receives data similar to:

```HTTP
POST /upstream HTTP/1.1
Host: xxxxxx
WebHook-Request-Origin: xxx.webpubsub.azure.com
Content-Type: application/octet-stream
Content-Length: nnnn
ce-specversion: 1.0
ce-type: azure.webpubsub.user.<event_name>
ce-source: /client/{connectionId}
ce-id: {eventId}
ce-time: 2021-01-01T00:00:00Z
ce-signature: sha256={connection-id-hash-primary},sha256={connection-id-hash-secondary}
ce-userId: {userId}
ce-connectionId: {connectionId}
ce-hub: {hub_name}
ce-eventName: <event_name>

binary

```

The `Content-Type` for the CloudEvents HTTP request is `application/octet-stream` when `dataType` is `binary`.  The WebSocket frame can be `text` format for text message frames or UTF8 encoded binaries for `binary` message frames.

The Web PubSub service declines the client if the message doesn't match the described format.

### Ping

Format:

```json
{
    "type": "ping",
}
```

The client can send a `ping` message to the service to enable the Web PubSub service to detect the client's liveness.


### Sequence Ack

Format:

```json
{
    "type": "sequenceAck",
    "sequenceId": "<sequenceId>",
}
```

Reliable PubSub WebSocket client must send a sequence ack message once it receives a message from the service. For more information, see [How to create reliable clients](howto-develop-reliable-clients.md#subscriber)
 
* `sequenceId` is an incremental uint64 number from the message received.

## Responses

Messages received by the client can be several types: `ack`, `message`, `system`, `pong`, `streamAck`, `streamNack`, and `streamClosed`. Messages with type `message` have `sequenceId` property. Client must send a [Sequence Ack](#sequence-ack) to the service once it receives a message.

### Ack response

When the request contains `ackId`, the service will return an ack response for this request. The client implementation should handle this ack mechanism, including waiting for the ack response using an `async` `await` operation, and have a timeout handler when the ack response isn't received during a certain period.

Format:
```json
{
    "type": "ack",
    "ackId": 1, // The ack id for the request to ack
    "success": false, // true or false
    "error": {
        "name": "Forbidden|InternalServerError|Duplicate",
        "message": "<error_detail>"
    }
}
```

The client implementation SHOULD always check if the `success` is `true` or `false` first. Only when `success` is `false` the client reads from `error`.

### Message response

Clients can receive messages published from a group the client has joined or from the server, which, operating in a server management role, sends messages to specific clients or users.

1. The response message from a group:

    ```json
    {
        "sequenceId": 1,
        "type": "message",
        "from": "group",
        "group": "<group_name>",
        "dataType": "json|text|binary",
        "data" : {} // The data format is based on the dataType
        "fromUserId": "abc"
    }
    ```

1.  The response message from the server:

    ```json
    {
        "sequenceId": 1,
        "type": "message",
        "from": "server",
        "dataType": "json|text|binary",
        "data" : {} // The data format is based on the dataType
    }
    ```

#### Case 1: Sending data `Hello World` to the connection through REST API with `Content-Type`=`text/plain` 

* A simple WebSocket client receives a text WebSocket frame with data: `Hello World`;
* A PubSub WebSocket client receives the message in JSON:

    ```json
    {
        "sequenceId": 1,
        "type": "message",
        "from": "server",
        "dataType" : "text",
        "data": "Hello World", 
    }
    ```

#### Case 2: Sending data `{ "Hello" : "World"}` to the connection through REST API with `Content-Type`=`application/json`

* A simple WebSocket client receives a text WebSocket frame with stringified data: `{ "Hello" : "World"}`;
* A PubSub WebSocket client receives the message in JSON:

    ```json
    {
        "sequenceId": 1,
        "type": "message",
        "from": "server",
        "dataType" : "json",
        "data": {
            "Hello": "World"
        }
    }
    ```

If the REST API is sending a string `Hello World` using `application/json` content type, the simple WebSocket client receives the JSON string `"Hello World"` wrapped in `"`.

#### Case 3: Sending binary data to the connection through REST API with `Content-Type`=`application/octet-stream`

* A simple WebSocket client receives a binary WebSocket frame with the binary data.
* A PubSub WebSocket client receives the message in JSON:

    ```json
    {
        "sequenceId": 1,
        "type": "message",
        "from": "server",
        "dataType" : "binary",
        "data": "<base64_binary>"
    }
    ```

#### Streaming message response

When a message belongs to a stream, the group message contains a `stream` property. The reliable `sequenceId` remains connection-scoped and is different from `stream.streamSequenceId`.

```json
{
    "sequenceId": 1,
    "type": "message",
    "from": "group",
    "group": "<group_name>",
    "dataType": "json|text|binary",
    "data": {},
    "fromUserId": "abc",
    "stream": {
        "streamId": "<stream_id>",
        "streamSequenceId": 1,
        "endOfStream": true,
        "error": {
            "name": "IdleTimeout|InternalServerError|Forbidden|Cancelled|UserError",
            "message": "<error_detail>",
            "userErrorCode": "<application_error_code>"
        }
    }
}
```

* `stream.streamId` is the logical stream identifier.
* `stream.streamSequenceId` is the sequence number of the message in the stream.
* `stream.endOfStream` is optional. When set to `true`, the message is the terminal message of the stream.
* `stream.error` is optional and is present only when the stream ends with an error. `userErrorCode` is present only for `UserError`.

### Stream ack response

The service sends a `streamAck` response to acknowledge accepted stream data and to report the next stream sequence ID it expects.

Format:

```json
{
    "type": "streamAck",
    "streamId": "<stream_id>",
    "expectedSequenceId": 2
}
```

### Stream nack response

The service sends a `streamNack` response for a retriable stream error.

Format:

```json
{
    "type": "streamNack",
    "streamId": "<stream_id>",
    "expectedSequenceId": 2,
    "name": "InvalidSequenceId|TransientError",
    "message": "<error_detail>"
}
```

### Stream closed response

The service sends a `streamClosed` response when the publisher-side stream is closed.

Format:

```json
{
    "type": "streamClosed",
    "streamId": "<stream_id>",
    "error": {
        "name": "StreamNotFound|Forbidden|BadRequest|InternalServerError|IdleTimeout",
        "message": "<error_detail>"
    }
}
```

The `error` property is omitted when the stream is closed normally.

### System response

The Web PubSub service can return system-related responses to the client.

### Pong response

The Web PubSub service sends a `pong` message to the client when it receives a `ping` message from the client.

Format:

```json
{
    "type": "pong",
}
```

#### Connected

The response to the client connect request:

```json
{
    "type": "system",
    "event": "connected",
    "userId": "user1",
    "connectionId": "abcdefghijklmnop",
    "reconnectionToken": "<token>"
}
```

`connectionId` and `reconnectionToken` are used for reconnection. Make connect request with uri for reconnection:

```
wss://<service-endpoint>/client/hubs/<hub>?awps_connection_id=<connectionId>&awps_reconnection_token=<reconnectionToken>
```

Find more details in [Connection Recovery](howto-develop-reliable-clients.md#connection-recovery)

#### Disconnected

The response when the server closes the connection or when the service declines the client connection:

```json
{
    "type": "system",
    "event": "disconnected",
    "message": "reason"
}
```

## Next steps


Use these resources to start building your own application:

> 
> [Tutorial: Publish and subscribe to messages in Azure Web PubSub](tutorial-pub-sub-messages.md)

> 
> [Tutorial: Create a simple chatroom with Azure Web PubSub](tutorial-build-chat.md)

> 
> [Tutorial: Use a service-supported subprotocol for client streaming](tutorial-subprotocol.md)

> 
> [Tutorial: Build serverless chat with Azure Functions and Web PubSub](quickstart-serverless.md)

> 
> [Tutorial: Configure an event listener](howto-develop-event-listener.md)

> 
> [Play with live demos](https://aka.ms/awps/livedemos)

> 
> [Explore more Azure Web PubSub samples](https://aka.ms/awps/samples)
