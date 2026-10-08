---
title: Include file
description: Include file
author: sdgilley
ms.reviewer: sgilley
ms.author: sgilley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 11/05/2025
ms.custom: include, update-code5
---

Create an agent using your deployed model.

An agent defines core behavior. Once created, it ensures consistent responses in user interactions without repeating instructions each time. You can update or delete agents anytime. 

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/create-agent/quickstart-create-agent.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-create-agent.md)

# [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/create-agent/quickstart-create-agent.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-create-agent.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/create-agent/src/quickstart-create-agent.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-create-agent.md)

# [Java](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/create-agent/src/main/java/com/azure/ai/foundry/samples/CreateAgent.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-create-agent.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-create-agent.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-create-agent.md)

# [Foundry portal](#tab/portal)

Now create an agent and interact with it.
1. Still in the **Build** section, select **Agents** in the left pane.
1. Select **Create agent** and give it a name, such as "MyAgent".

---

The output confirms the agent was created. For SDK tabs, you see the agent name and ID printed to the console.


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.
