---
title: "Lesson 2: Create an Internal Activation Procedure"
description: "In this lesson, you learn to create a stored procedure to process messages from a Service Broker queue."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: maghan
ms.date: 09/03/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
---

# Lesson 2: Create an internal activation procedure


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





In this lesson, you learn to create a stored procedure to process messages from a Service Broker queue. You also learn how to specify that the procedure is activated anytime there are messages in the queue.

## Procedures

> **Note:**  
> The code samples in this article were tested using the  `AdventureWorks2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.


### Switch to the AdventureWorks database

Copy and paste the following code into a Query Editor window, then run it to switch context to the  `AdventureWorks2025`  database.

```sql
USE AdventureWorks2022;
GO
```

### Create an internal activation stored procedure

Copy and paste the following code into a Query Editor window, then run it to create a stored procedure. When it runs, the stored procedure keeps receiving messages as long as there are messages in the queue. If the receive times out without returning a message, the stored procedure ends. If the received message was a request message, the stored procedure returns a reply message. If the received message is an `EndDialog` message, the stored procedure ends the target side of the conversation. If the received message is and `Error` message, it rolls back the transaction.

```sql
CREATE PROCEDURE TargetActiveProc
AS
DECLARE @RecvReqDlgHandle AS UNIQUEIDENTIFIER;
DECLARE @RecvReqMsg AS NVARCHAR (100);
DECLARE @RecvReqMsgName AS sysname;
WHILE (1 = 1)
    BEGIN
        BEGIN TRANSACTION;
        WAITFOR (RECEIVE TOP (1) @RecvReqDlgHandle = conversation_handle,
            @RecvReqMsg = message_body,
            @RecvReqMsgName = message_type_name
            FROM TargetQueueIntAct),
        TIMEOUT 5000;
        IF (@@ROWCOUNT = 0)
            BEGIN
                ROLLBACK;
                BREAK;
            END
        IF @RecvReqMsgName = N'//AWDB/InternalAct/RequestMessage'
            BEGIN
                DECLARE @ReplyMsg AS NVARCHAR (100);
                SELECT @ReplyMsg = N'<ReplyMsg>Message for Initiator service.</ReplyMsg>';
                SEND ON CONVERSATION (@RecvReqDlgHandle)
                    MESSAGE TYPE [//AWDB/InternalAct/ReplyMessage] (@ReplyMsg);
            END
        ELSE
        IF @RecvReqMsgName = N'https://schemas.microsoft.com/SQL/ServiceBroker/EndDialog'
            BEGIN
                END CONVERSATION @RecvReqDlgHandle;
            END
        ELSE
        IF @RecvReqMsgName = N'https://schemas.microsoft.com/SQL/ServiceBroker/Error'
            BEGIN
                END CONVERSATION @RecvReqDlgHandle;
            END
        COMMIT TRANSACTION;
    END
GO
```

### Alter the target queue to specify internal activation

Copy and paste the following code into a Query Editor window, then run it to specify that Service Broker activate the **TargetActiveProc** stored procedure to process messages from **TargetQueueIntAct**. Service Broker runs a copy of **TargetActiveProc** anytime a message is received in **TargetQueueIntAct** and no copy of the procedure is already running. Service Broker runs extra copies of **TargetActiveProc** whenever the existing copies don't keep up with the number of incoming messages.

```sql
ALTER QUEUE TargetQueueIntAct
    WITH ACTIVATION (STATUS = ON, PROCEDURE_NAME = TargetActiveProc, MAX_QUEUE_READERS = 10, EXECUTE AS SELF);
GO
```

## Next step

You successfully configured  `AdventureWorks2025`  to support a conversation between the **//AWDB/InternalAct/InitiatorService** and the **//AWDB/InternalAct/TargetService**.

> 
> [Lesson 3: Begin a conversation and transmit messages](lesson-3-beginning-a-conversation-and-transmitting-messages.md)
