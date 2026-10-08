---
title: Reference - Azure Web PubSub-supported protobuf WebSocket subprotocol `protobuf.webpubsub.azure.v1`
description: The reference describes the Azure Web PubSub-supported WebSocket subprotocol `protobuf.webpubsub.azure.v1`.
author: chenyl
ms.author: chenyl
ms.service: azure-web-pubsub
ms.topic: reference
ms.date: 11/08/2021
---

#  The Azure Web PubSub-supported protobuf WebSocket subprotocol
     
This document describes the subprotocol `protobuf.webpubsub.azure.v1`.

When a client is using this subprotocol, both the outgoing and incoming data frames are expected to be protocol buffers (protobuf) payloads.

## Overview

Subprotocol `protobuf.webpubsub.azure.v1` empowers the client to do a publish-subscribe (PubSub) directly instead of doing a round trip to the upstream server. The WebSocket connection with the `protobuf.webpubsub.azure.v1` subprotocol is called a PubSub WebSocket client.

For example, in JavaScript, you can create a PubSub WebSocket client with the protobuf subprotocol by using:

```js
// PubSub WebSocket client
var pubsub = new WebSocket('wss://test.webpubsub.azure.com/client/hubs/hub1', 'protobuf.webpubsub.azure.v1');
```

For a simple WebSocket client, the server has the *necessary* role of handling events from clients. A simple WebSocket connection always triggers a `message` event when it sends messages, and it always relies on the server side to process messages and do other operations. With the help of the `protobuf.webpubsub.azure.v1` subprotocol, an authorized client can join a group by using [join requests](#join-groups) and publish messages to a group by using [publish requests](#publish-messages) directly. The client can also route messages to various upstream event handlers by using [event requests](#send-custom-events) to customize the *event* that the message belongs to.

> **Note:**
> Currently, the Web PubSub service supports only [proto3](https://developers.google.com/protocol-buffers/docs/proto3).


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

All request messages adhere to the following protobuf format:

```protobuf
syntax = "proto3";

import "google/protobuf/any.proto";

message UpstreamMessage {
    oneof message {
        SendToGroupMessage send_to_group_message = 1;
        EventMessage event_message = 5;
        JoinGroupMessage join_group_message = 6;
        LeaveGroupMessage leave_group_message = 7;
        SequenceAckMessage sequence_ack_message = 8;
        PingMessage ping_message = 9;
        StreamDataMessage stream_data_message = 13;
        StreamEndMessage stream_end_message = 14;
    }

    message SendToGroupMessage {
        string group = 1;
        optional uint64 ack_id = 2;
        MessageData data = 3;
        optional bool no_echo = 4;
        StreamStartInfo stream = 7;
    }

    message StreamStartInfo {
        string stream_id = 1;
        optional uint32 idle_timeout_ms = 2;
    }

    message EventMessage {
        string event = 1;
        MessageData data = 2;
        optional uint64 ack_id = 3;
    }
    
    message JoinGroupMessage {
        string group = 1;
        optional uint64 ack_id = 2;
    }

    message LeaveGroupMessage {
        string group = 1;
        optional uint64 ack_id = 2;
    }

    message SequenceAckMessage {
        uint64 sequence_id = 1;
    }

    message PingMessage {
    }

    message StreamDataMessage {
        string stream_id = 1;
        optional uint64 stream_sequence_id = 2;
        MessageData data = 3;
    }

    message StreamEndMessage {
        string stream_id = 1;
        optional StreamEndError error = 2;

        message StreamEndError {
            optional string message = 1;
            optional string user_error_code = 2;
        }
    }
}

message MessageData {
    oneof data {
        string text_data = 1;
        bytes binary_data = 2;
        google.protobuf.Any protobuf_data = 3;
    }
}
```


### Join groups

Format:

Set `join_group_message.group` to the group name.

* `ackId` is the identity of each request and should be unique. The service sends a [ack response message](#ack-response) to notify the process result of the request. More details can be found at [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)

### Leave groups

Format:

Set `leave_group_message.group` to the group name.

* `ackId` is the identity of each request and should be unique. The service sends a [ack response message](#ack-response) to notify the process result of the request. More details can be found at [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)

### Publish messages

Format:

* `ackId`: The unique identity of each request. The service sends an [ack response message](#ack-response) to notify the process result of the request. More details can be found at [AckId and Ack Response](concept-client-protocols.md#ackid-and-ack-response)

* `dataType`:  The data format, which can be `protobuf`, `text`, or `binary` depending on the `data` in `MessageData`. The receiving clients can use `dataType` to correctly process the content.

* `protobuf`: When you set `send_to_group_message.data.protobuf_data`, the implicit `dataType` is `protobuf`. `protobuf_data` can be of the [Any](https://developers.google.com/protocol-buffers/docs/proto3#any) message type. All other clients receive a protobuf-encoded binary, which can be deserialized by the protobuf SDK. Clients that support only text-based content (for example, `json.webpubsub.azure.v1`) receive a Base64-encoded binary.

* `text`: When you set `send_to_group_message.data.text_data`, the implicit `dataType` is `text`. `text_data` should be a string. All clients with other protocols receive a UTF-8-encoded string.

* `binary`: When you set `send_to_group_message.data.binary_data`, the implicit `dataType` is `binary`. `binary_data` should be a byte array. All clients with other protocols receive a raw binary without protobuf encoding. Clients that support only text-based content (for example, `json.webpubsub.azure.v1`) receive a Base64-encoded binary.

#### Case 1: Publish text data

Set `send_to_group_message.group` to `group`, and set `send_to_group_message.data.text_data` to `"text data"`.

* The protobuf subprotocol client in group `group` receives the binary frame and can use [DownstreamMessage](#responses) to deserialize it.

* The JSON subprotocol clients in `group` receive:

    ```json
    {
        "type": "message",
        "from": "group",
        "group": "group",
        "dataType" : "text",
        "data" : "text data"
    }
    ```

* The simple WebSocket clients in `group` receive string `text data`.

#### Case 2: Publish protobuf data

Let's assume that you have a custom message:

```
message MyMessage {
    int32 value = 1;
}
```

Set `send_to_group_message.group` to `group` and `send_to_group_message.data.protobuf_data` to `Any.pack(MyMessage)` with `value = 1`.

* The protobuf subprotocol clients in `group` receive the binary frame and can use [DownstreamMessage](#responses) to deserialize it.

* The subprotocol client in `group` receives:

    ```json
    {
        "type": "message",
        "from": "group",
        "group": "G",
        "dataType" : "protobuf",
        "data" : "Ci90eXBlLmdvb2dsZWFwaXMuY29tL2F6dXJlLndlYnB1YnN1Yi5UZXN0TWVzc2FnZRICCAE=" // Base64-encoded bytes
    }
    ```

    > **Note:**
    > The data is a Base64-encoded, deserializeable protobuf binary. 

You can use the following protobuf definition and use `Any.unpack()` to deserialize it:

```protobuf
syntax = "proto3";

message MyMessage {
    int32 value = 1;
}
```

* The simple WebSocket clients in `group` receive the binary frame:

    ```
    # Show in hexadecimal
    0A 2F 74 79 70 65 2E 67 6F 6F 67 6C 65 61 70 69 73 2E 63 6F 6D 2F 61 7A 75 72 65 2E 77 65 62 70 75 62 73 75 62 2E 54 65 73 74 4D 65 73 73 61 67 65 12 02 08 01
    ```

#### Case 3: Publish binary data

Set `send_to_group_message.group` to `group`, and set `send_to_group_message.data.binary_data` to `[1, 2, 3]`.

* The protobuf subprotocol client in group `group` receives the binary frame and can use [DownstreamMessage](#responses) to deserialize it.

* The JSON subprotocol client in group `group` receives:

    ```json
    {
        "type": "message",
        "from": "group",
        "group": "group",
        "dataType" : "binary",
        "data" : "AQID", // Base64-encoded [1,2,3]
    }
    ```

    Because the JSON subprotocol client supports only text-based messaging, the binary is always Base64-encoded.

* The simple WebSocket clients in `group` receive the binary data in the binary frame:

    ```
    # Show in hexadecimal
    01 02 03
    ```

### Start streaming messages

To start a group stream, set `send_to_group_message.group` to the target group and set `send_to_group_message.stream` to a `StreamStartInfo` message. A stream start request doesn't set `send_to_group_message.data` or `send_to_group_message.ack_id`.

* `send_to_group_message.stream.stream_id` is the identifier of the logical stream. It must be a non-empty string and must be unique among active streams on the same client connection. Client libraries are recommended to generate a globally unique value, such as a GUID or UUID.
* `send_to_group_message.stream.idle_timeout_ms` is optional. If specified, it must be greater than `0`. If omitted, the service default is `300000` milliseconds. The value is an idle timeout, not a total stream lifetime. Send stream data, send a stream keepalive, or end the stream before this timeout elapses when the application needs to keep the stream open.
* `send_to_group_message.no_echo` is optional. If set to true, stream messages aren't echoed back to the same connection. If not set, the default value is false.

When the stream is accepted, the client receives a [stream ack response](#stream-ack-response) with `expected_sequence_id` set to `1`.

### Send streaming data

To send stream data, set `stream_data_message.stream_id`, `stream_data_message.stream_sequence_id`, and `stream_data_message.data`.

* `stream_data_message.stream_id` identifies an active stream on the same client connection.
* `stream_data_message.stream_sequence_id` is a positive uint64 number. The first data fragment in a stream uses `1`, and each following data fragment for the same `stream_id` increases by exactly `1`.
* `stream_data_message.data` uses the same `MessageData` encoding rules as [publish messages](#publish-messages).

To keep a stream active without delivering data to subscribers, send `stream_data_message` with only `stream_id` set.

### End streaming messages

To end a stream, set `stream_end_message.stream_id`.

To end a stream with an application-defined error, set `stream_end_message.error`.

* `stream_end_message.error.message` is an optional human-readable error message.
* `stream_end_message.error.user_error_code` is an optional application-defined error code.

When the stream is closed, the publisher receives a [stream closed response](#stream-closed-response).

### Send custom events

There's an implicit `dataType`, which can be `protobuf`, `text`, or `binary`, depending on the `dataType` you set. The receiver clients can use `dataType` to handle the content correctly.

* `protobuf`: When you set `event_message.data.protobuf_data`, the implicit `dataType` is `protobuf`. The `protobuf_data` value can be any supported protobuf type. The event handler receives the protobuf-encoded binary, which can be deserialized by any protobuf SDK.

* `text`: When you set `event_message.data.text_data`, the implicit `dataType` is `text`. The `text_data` value should be a string. The event handler receives a UTF-8-encoded string.

* `binary`: When you set `event_message.data.binary_data`, the implicit `dataType` is `binary`. The `binary_data` value should be a byte array. The event handler receives the raw binary frame.

#### Case 1: Send an event with text data

Set `event_message.data.text_data` to `"text data"`.

The upstream event handler receives a request similar to: 

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

The `Content-Type` for the CloudEvents HTTP request is `text/plain`, where `dataType`=`text`.

#### Case 2: Send an event with protobuf data

Assume that you've received the following customer message:

```
message MyMessage {
    int32 value = 1;
}
```

Set `event_message.data.protobuf_data` to `any.pack(MyMessage)` with `value = 1`

The upstream event handler receives a request that's similar to:

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

// Just show in hexadecimal; read it as binary
0A 2F 74 79 70 65 2E 67 6F 6F 67 6C 65 61 70 69 73 2E 63 6F 6D 2F 61 7A 75 72 65 2E 77 65 62 70 75 62 73 75 62 2E 54 65 73 74 4D 65 73 73 61 67 65 12 02 08 01
```

The `Content-Type` for the CloudEvents HTTP request is `application/x-protobuf`, where `dataType`=`protobuf`.

The data is a valid protobuf binary. You can use the following `proto` and `any.unpack()` to deserialize it:

```protobuf
syntax = "proto3";

message MyMessage {
    int32 value = 1;
}
```

#### Case 3: Send an event with binary data

Set `send_to_group_message.binary_data` to `[1, 2, 3]`.

The upstream event handler receives a request similar to: 

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

// Just show in hexadecimal; you need to read it as binary
01 02 03 
```
For `dataType`=`binary`, the `Content-Type` for the CloudEvents HTTP request is `application/octet-stream`.  The WebSocket frame can be in `text` format for text message frames or UTF-8-encoded binaries for `binary` message frames.

The service declines the client if the message doesn't match the prescribed format.

### Ping

The client can send a `PingMessage` to the service to enable the Web PubSub service to detect the client's liveness.



## Responses

All response messages adhere to the following protobuf format:

```protobuf
message DownstreamMessage {
    oneof message {
        AckMessage ack_message = 1;
        DataMessage data_message = 2;
        SystemMessage system_message = 3;
        PongMessage pong_message = 4;
        StreamAckMessage stream_ack_message = 6;
        StreamNackMessage stream_nack_message = 7;
        StreamClosedMessage stream_closed_message = 8;
    }
    
    message AckMessage {
        uint64 ack_id = 1;
        bool success = 2;
        optional ErrorMessage error = 3;
    
        message ErrorMessage {
            string name = 1;
            string message = 2;
        }
    }

    message DataMessage {
        string from = 1;
        optional string group = 2;
        MessageData data = 3;
        StreamInfo stream = 6;
    }

    message SystemMessage {
        oneof message {
            ConnectedMessage connected_message = 1;
            DisconnectedMessage disconnected_message = 2;
        }
    
        message ConnectedMessage {
            string connection_id = 1;
            string user_id = 2;
        }

        message DisconnectedMessage {
            string reason = 2;
        }
    }

    message PongMessage {
    }

    message StreamAckMessage {
        string stream_id = 1;
        uint64 expected_sequence_id = 2;
    }

    message StreamNackMessage {
        string stream_id = 1;
        string name = 2;
        string message = 3;
        uint64 expected_sequence_id = 4;
    }

    message StreamClosedMessage {
        string stream_id = 1;
        optional StreamClosedError error = 2;

        message StreamClosedError {
            string name = 1;
            string message = 2;
        }
    }
}

message StreamInfo {
    string stream_id = 1;
    uint64 stream_sequence_id = 2;
    optional bool end_of_stream = 3;
    optional StreamError error = 4;

    message StreamError {
        string name = 1;
        string message = 2;
        string user_error_code = 3;
    }
}
```

Messages received by the client can be `ack`, `message`, `system`, `pong`, `streamAck`, `streamNack`, or `streamClosed`.

### Ack response

If the request contains `ackId`, the service returns an ack response for this request. The client implementation should handle this ack mechanism, including:
* Waiting for the ack response for an `async` `await` operation. 
* Having a timeout check when the ack response isn't received during a certain period.

The client implementation should always check first to see whether the `success` status is `true` or `false`. When the `success` status is `false`, the client can read from the `error` property for error details.

### Message response

Clients can receive messages published from a group that the client has joined. Or they can receive messages from the server management role when the server sends messages to a specific client or a specific user.

You'll always get a `DownstreamMessage.DataMessage` message in the following scenarios:

- When the message is from a group, `from` is `group`. When the message is from the server, `from` is `server`.
- When the message is from a group, `group` is the group name.

The sender's `dataType` will cause one of the following messages to be sent: 
* If `dataType` is `text`, use `message_response_message.data.text_data`. 
* If `dataType` is `binary`, use `message_response_message.data.binary_data`. 
* If `dataType` is `protobuf`, use `message_response_message.data.protobuf_data`. 
* If `dataType` is `json`, use `message_response_message.data.text_data`, and the content is a serialized JSON string.

When a group message belongs to a stream, `DownstreamMessage.DataMessage.stream` is set.

* `stream.stream_id` is the logical stream identifier.
* `stream.stream_sequence_id` is the sequence number of the message in the stream.
* `stream.end_of_stream` is optional. When set to `true`, the message is the terminal message of the stream.
* `stream.error` is optional and is present only when the stream ends with an error. `user_error_code` is present only for `UserError`.

### Stream ack response

The service sends `DownstreamMessage.StreamAckMessage` to acknowledge accepted stream data and to report the next stream sequence ID it expects.

* `stream_id` is the logical stream identifier.
* `expected_sequence_id` is the next stream sequence ID the service expects.

### Stream nack response

The service sends `DownstreamMessage.StreamNackMessage` for a retriable stream error.

* `stream_id` is the logical stream identifier.
* `expected_sequence_id` is the next stream sequence ID the service expects.
* `name` can be `InvalidSequenceId` or `TransientError`.
* `message` contains error details.

### Stream closed response

The service sends `DownstreamMessage.StreamClosedMessage` when the publisher-side stream is closed.

* `stream_id` is the logical stream identifier.
* `error` is omitted when the stream is closed normally.
* `error.name` can be `StreamNotFound`, `Forbidden`, `BadRequest`, `InternalServerError`, or `IdleTimeout`.
* `error.message` contains error details.

### System response

The Web PubSub service can also send system-related responses to the client.

#### Connected

When the client connects to the service, you receive a `DownstreamMessage.SystemMessage.ConnectedMessage` message.

#### Disconnected

When the server closes the connection or the service declines the client, you receive a `DownstreamMessage.SystemMessage.DisconnectedMessage` message.

### Pong response

The Web PubSub service sends a `PongMessage` to the client when it receives a `PingMessage` from the client.

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
