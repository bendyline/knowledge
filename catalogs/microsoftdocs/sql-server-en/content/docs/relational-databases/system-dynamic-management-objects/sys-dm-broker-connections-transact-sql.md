---
title: "sys.dm_broker_connections (Transact-SQL)"
description: sys.dm_broker_connections returns a row for each Service Broker network connection.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/12/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
f1_keywords:
  - "sys.dm_broker_connections"
  - "dm_broker_connections"
  - "sys.dm_broker_connections_TSQL"
  - "dm_broker_connections_TSQL"
helpviewer_keywords:
  - "sys.dm_broker_connections dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || =azuresqldb-mi-current"
---
# sys.dm_broker_connections (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns a row for each  Service Broker 
 network connection. The following table provides more information:

| Column name | Data type | Nullable | Description |
| --- | --- | --- | --- |
| `connection_id` | **uniqueidentifier** | Yes | Identifier of the connection. |
| `transport_stream_id` | **uniqueidentifier** | Yes | Identifier of the  SQL Server |
 | Network Interface (SNI) connection used by this connection for TCP/IP communications. |
| `state` | **smallint** | Yes | Current state of the connection. Possible values:<br /><br />`1` = New<br />`2` = Connecting<br />`3` = Connected<br />`4` = Logged in<br />`5` = Closed |
| `state_desc` | **nvarchar(60)** | Yes | Current state of the connection. Possible values:<br /><br />`NEW`<br />`CONNECTING`<br />`CONNECTED`<br />`LOGGED_IN`<br />`CLOSED` |
| `connect_time` | **datetime** | Yes | Date and time at which the connection was opened. |
| `login_time` | **datetime** | Yes | Date and time at which login for the connection succeeded. |
| `authentication_method` | **nvarchar(128)** | Yes | Name of the Windows Authentication method, such as `NTLM` or `KERBEROS`. The value comes from Windows. |
| `principal_name` | **nvarchar(128)** | Yes | Name of the login that was validated for connection permissions. For Windows Authentication, this value is the remote user name. For certificate authentication, this value is the certificate owner. |
| `remote_user_name` | **nvarchar(128)** | Yes | Name of the peer user from the other database that is used by Windows Authentication. |
| `last_activity_time` | **datetime** | Yes | Date and time at which the connection was last used to send or receive information. |
| `is_accept` | **bit** | Yes | Indicates whether the connection originated on the remote side.<br /><br />`1` = The connection is a request accepted from the remote instance.<br /><br />`0` = The connection was started by the local instance. |
| `login_state` | **smallint** | Yes | State of the login process for this connection. For possible values, see [Login state values](#login-state-values). |
| `login_state_desc` | **nvarchar(60)** | Yes | Current state of login from the remote computer. For possible values, see [Login state values](#login-state-values). |
| `peer_certificate_id` | **int** | Yes | The local object ID of the certificate that is used by the remote instance for authentication. The owner of this certificate must have `CONNECT` permissions to the  Service Broker |
 | endpoint. |
| `encryption_algorithm` | **smallint** | Yes | Encryption algorithm that is used for this connection. For possible values, see [Encryption algorithm values](#encryption-algorithm-values). |
| `encryption_algorithm_desc` | **nvarchar(60)** | Yes | Textual representation of the encryption algorithm. For possible values, see the **encryption_algorithm_desc** column in [Encryption algorithm values](#encryption-algorithm-values). |
| `receives_posted` | **smallint** | Yes | Number of asynchronous network receives that aren't yet completed for this connection. |
| `is_receive_flow_controlled` | **bit** | Yes | Whether network receives are postponed due to flow control because the network is busy.<br /><br />`1` = True |
| `sends_posted` | **smallint** | Yes | The number of asynchronous network sends that aren't yet completed for this connection. |
| `is_send_flow_controlled` | **bit** | Yes | Whether network sends are postponed due to network flow control because the network is busy.<br /><br />`1` = True |
| `total_bytes_sent` | **bigint** | Yes | Total number of bytes sent by this connection. |
| `total_bytes_received` | **bigint** | Yes | Total number of bytes received by this connection. |
| `total_fragments_sent` | **bigint** | Yes | Total number of  Service Broker |
 | message fragments sent by this connection. |
| `total_fragments_received` | **bigint** | Yes | Total number of  Service Broker |
 | message fragments received by this connection. |
| `total_sends` | **bigint** | Yes | Total number of network send requests issued by this connection. |
| `total_receives` | **bigint** | Yes | Total number of network receive requests issued by this connection. |
| `peer_arbitration_id` | **uniqueidentifier** | Yes | Internal identifier for the endpoint. |
| `address` | **nvarchar(512)** | Yes | Peer address in the form of `TCP://peer_host:peer_port`. |
| `encryption_key_bit_length` | **int** | Yes | Length of the session encryption keys, in bits. Possible values are 128 or 256. |
| `encryption_protocol_version` | **nvarchar(32)** | Yes | When `encryption_algorithm_desc` is either "RC4" (deprecated) or "AES", the value is the negotiated UCS encryption protocol version number, from 1 to 4:<br /><br />`1` = SQL Server 2005/2008<br />`2` = SQL Server 2012<br />`3` = SQL Server 2012 with UCS Redirection Support<br />`4` = SQL Server 2016<br /><br />When `encryption_algorithm_desc` is "TLS" - the version of TLS (e.g. "1.2" or "1.3") |


## Login state values

The following table describes `login_state` and `login_state_desc`.

| `login_state` | `login_state_desc` | Details |
| --- | --- | --- |
| `0` | `INITIAL` | Connection handshake is initializing. |
| `1` | `WAIT LOGIN NEGOTIATE` | Connection handshake is waiting for Login Negotiate message. |
| `2` | `ONE ISC` | Connection handshake initialized and sent security context for authentication. |
| `3` | `ONE ASC` | Connection handshake received and accepted security context for authentication. |
| `4` | `TWO ISC` | Connection handshake initialized and sent security context for authentication. There's an optional mechanism available for authenticating the peers. |
| `5` | `TWO ASC` | Connection handshake received and sent accepted security context for authentication. There's an optional mechanism available for authenticating the peers. |
| `6` | `WAIT ISC Confirm` | Connection handshake is waiting for Initialize Security Context Confirmation message. |
| `7` | `WAIT ASC Confirm` | Connection handshake is waiting for Accept Security Context Confirmation message. |
| `8` | `WAIT REJECT` | Connection handshake is waiting for SSPI rejection message for failed authentication. |
| `9` | `WAIT PRE-MASTER SECRET` | Connection handshake is waiting for Pre-Master Secret message. |
| `10` | `WAIT VALIDATION` | Connection handshake is waiting for Validation message. |
| `11` | `WAIT ARBITRATION` | Connection handshake is waiting for Arbitration message. |
| `12` | `ONLINE` | Connection handshake is complete and is online (ready) for message exchange. |
| `13` | `ERROR` | Connection is in error. |



## Encryption algorithm values

The following table describes the possible values for the encryption algorithm.

| `encryption_algorithm` | `encryption_algorithm_desc` | Corresponding DDL option |
| --- | --- | --- |
| `0` | None | Disabled |
| `1` | `RC4` | Required algorithm RC4 |
| `2` | `AES` | Required algorithm AES |
| `3` | None, `RC4` | Supported algorithm RC4 |
| `4` | None, `AES` | Supported algorithm AES |
| `5` | `RC4`, `AES` | Required algorithm RC4 AES |
| `6` | `AES`, `RC4` | Required algorithm AES RC4 |
| `7` | None, `RC4`, `AES` | Supported algorithm RC4 AES |
| `8` | None, `AES`, `RC4` | Supported algorithm AES RC4 |

The RC4 algorithm is only supported for backward compatibility. New material can only be encrypted using `RC4` or `RC4_128` when the database is in compatibility level `90` or `100` (not recommended). Use one of the AES algorithms instead. In  SQL Server 2012 (11.x) 
 and later versions, material encrypted using `RC4` or `RC4_128` can be decrypted in any compatibility level.


## Permissions

 SQL Server 2019 (15.x) 
 and previous versions require `VIEW SERVER STATE` permission on the server.

 SQL Server 2022 (16.x) 
 and later versions require `VIEW SERVER PERFORMANCE STATE` permission on the server.

## Physical joins

Diagram of physical joins for sys.dm_broker_connections.

## Relationship cardinalities

| From | To | Relationship |
| --- | --- | --- |
| `dm_broker_connections.connection_id` | `dm_exec_connections.connection_id` | One-to-one |

## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Service Broker related dynamic management views (Transact-SQL)](service-broker-related-dynamic-management-views-transact-sql.md)
