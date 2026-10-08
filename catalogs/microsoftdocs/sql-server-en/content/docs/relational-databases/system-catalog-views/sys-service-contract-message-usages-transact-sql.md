---
title: "sys.service_contract_message_usages (Transact-SQL)"
description: sys.service_contract_message_usages (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "service_contract_message_usages_TSQL"
  - "sys.service_contract_message_usages"
  - "sys.service_contract_message_usages_TSQL"
  - "service_contract_message_usages"
helpviewer_keywords:
  - "sys.service_contract_message_usages catalog view"
dev_langs:
  - "TSQL"
---
# sys.service_contract_message_usages (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This catalog view contains a row per (contract, message type) pair.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **service_contract_id** | **int** | Identifier of the contract using the message type. Not NULLABLE. |
| **message_type_id** | **int** | Identifier of the message type used by the contract. Not NULLABLE. |
| **is_sent_by_initiator** | **bit** | Message type can be sent by the conversation initiator. Not NULLABLE. |
| **is_sent_by_target** | **bit** | Message type can be sent by the conversation target. Not NULLABLE. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).
