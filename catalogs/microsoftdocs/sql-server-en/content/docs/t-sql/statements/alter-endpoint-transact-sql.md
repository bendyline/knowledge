---
title: ALTER ENDPOINT (Transact-SQL)
description: ALTER ENDPOINT (Transact-SQL)
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 04/22/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "ALTER ENDPOINT"
  - "ALTER_ENDPOINT_TSQL"
helpviewer_keywords:
  - "ALTER ENDPOINT statement"
  - "modifying endpoints"
  - "endpoints [SQL Server], modifying"
dev_langs:
  - TSQL
---
# ALTER ENDPOINT (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Enables modifying an existing endpoint in the following ways:

- By adding a new method to an existing endpoint.
- By modifying or dropping an existing method from the endpoint.
- By changing the properties of an endpoint.

> **Note:**  
> This article describes the syntax and arguments that are specific to `ALTER ENDPOINT`. For descriptions of the arguments that are common to both `CREATE ENDPOINT` and `ALTER ENDPOINT`, see [CREATE ENDPOINT](create-endpoint-transact-sql.md).

Native XML Web Services (SOAP/HTTP endpoints) is removed beginning in  SQL Server 2012 (11.x) 
.



## Syntax

```syntaxsql
ALTER ENDPOINT endPointName [ AUTHORIZATION login ]
[ STATE = { STARTED | STOPPED | DISABLED } ]
[ AS { TCP } (
    <protocol_specific_arguments>
) ]
[ FOR { TSQL | SERVICE_BROKER | DATABASE_MIRRORING } (
    <language_specific_arguments>
) ]

<AS TCP_protocol_specific_arguments> ::=
AS TCP (
    LISTENER_PORT = listenerPort
    [ [ , ] LISTENER_IP = ALL | ( four_part_ipv4_address ) | ( 'ip_address_v6' ) ]
)

<FOR TSQL_language_specific_arguments> ::=
FOR TSQL (
    [ ENCRYPTION = { NEGOTIATED | STRICT } ]
)

<FOR SERVICE_BROKER_language_specific_arguments> ::=
FOR SERVICE_BROKER (
    [ AUTHENTICATION = {
          WINDOWS [ { NTLM | KERBEROS | NEGOTIATE } ]
          | CERTIFICATE certificate_name
          | WINDOWS [ { NTLM | KERBEROS | NEGOTIATE } ] CERTIFICATE certificate_name
          | CERTIFICATE certificate_name WINDOWS [ { NTLM | KERBEROS | NEGOTIATE } ]
    } ]
    [ [ , ] ENCRYPTION = {
          DISABLED
          | { SUPPORTED | REQUIRED }
            [ ALGORITHM { AES | RC4 | AES RC4 | RC4 AES } ]
    } ]
    [ [ , ] MESSAGE_FORWARDING = { ENABLED | DISABLED } ]
    [ [ , ] MESSAGE_FORWARD_SIZE = forward_size ]
)

<FOR DATABASE_MIRRORING_language_specific_arguments> ::=
FOR DATABASE_MIRRORING (
    [ AUTHENTICATION = {
          WINDOWS [ { NTLM | KERBEROS | NEGOTIATE } ]
          | CERTIFICATE certificate_name
          | WINDOWS [ { NTLM | KERBEROS | NEGOTIATE } ] CERTIFICATE certificate_name
          | CERTIFICATE certificate_name WINDOWS [ { NTLM | KERBEROS | NEGOTIATE } ]
    } ]
    [ [ , ] ENCRYPTION = {
          DISABLED
          | { SUPPORTED | REQUIRED }
            [ ALGORITHM { AES | RC4 | AES RC4 | RC4 AES } ]
    } ]
    [ , ] ROLE = { WITNESS | PARTNER | ALL }
)
```

## Arguments

The following arguments are specific to `ALTER ENDPOINT`. For descriptions of the remaining arguments, see [CREATE ENDPOINT](create-endpoint-transact-sql.md).

#### AS { TCP }

You can't change the transport protocol with `ALTER ENDPOINT`.

#### AUTHORIZATION *login*

The `AUTHORIZATION` option isn't available in `ALTER ENDPOINT`. Ownership can only be assigned when the endpoint is created.

#### FOR { TSQL \| SERVICE_BROKER \| DATABASE_MIRRORING }

You can't change the payload type with `ALTER ENDPOINT`.

## Remarks

When you use `ALTER ENDPOINT`, specify only those parameters that you want to update. All properties of an existing endpoint remain the same unless you explicitly change them.

The `ENDPOINT DDL` statements can't be executed inside a user transaction.

For information on choosing an encryption algorithm for use with an endpoint, see [Choose an encryption algorithm](../../relational-databases/security/encryption/choose-an-encryption-algorithm.md).

### Deprecated RC4 algorithm

The RC4 algorithm is only supported for backward compatibility. New material can only be encrypted using RC4 or RC4_128 when the database is in compatibility level 90 or 100. (Not recommended.) Use a newer algorithm such as one of the AES algorithms instead. In  SQL Server 2012 (11.x) 
 and later versions, material encrypted using RC4 or RC4_128 can be decrypted in any compatibility level.  

## Permissions

Requires membership in the **sysadmin** fixed server role, the owner of the endpoint, or `ALTER ANY ENDPOINT` permission.

To change ownership of an existing endpoint, you must use the `ALTER AUTHORIZATION` statement. For more information, see [ALTER AUTHORIZATION](alter-authorization-transact-sql.md).

For more information, see [GRANT Endpoint Permissions](grant-endpoint-permissions-transact-sql.md).

## Related content

- [DROP ENDPOINT (Transact-SQL)](drop-endpoint-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
