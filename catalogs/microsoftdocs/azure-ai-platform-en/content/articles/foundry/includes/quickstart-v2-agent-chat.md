---
title: Include file
description: Include file
author: sdgilley
ms.reviewer: sgilley
ms.author: sgilley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 11/05/2025
ms.custom: include, update-code8
---

Use the previously created agent named "MyAgent" to interact by asking a question and a related follow-up. The conversation maintains history across these interactions. 

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/chat-with-agent/quickstart-chat-with-agent.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-agent-chat.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/chat-with-agent/quickstart-chat-with-agent.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-agent-chat.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/chat-with-agent/src/quickstart-chat-with-agent.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-agent-chat.md)

# [Java](#tab/java) 

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/chat-with-agent/src/main/java/com/azure/ai/foundry/samples/ChatWithAgent.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-agent-chat.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-chat-with-agent.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-agent-chat.md)

# [Foundry portal](#tab/portal)

Interact with your agent.
1. Add instructions, such as, "You are a helpful writing assistant."
1. Start chatting with your agent, for example, "Write a poem about the sun." 
1. Follow up with "How about a haiku?"

---

You see the agent's responses to both prompts. The follow-up response demonstrates that the agent maintains conversation history across turns.


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.
