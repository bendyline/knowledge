---
title: Mem0
description: Add persistent Mem0 long-term memory to Agent Framework agents.
zone_pivot_groups: programming-languages
author: eavanvalkenburg
ms.topic: article
ms.author: edvan
ms.date: 08/31/2026
ms.service: agent-framework
ai-usage: ai-assisted
---

<!--
  Language parity table - keep in sync when adding/removing sections.

  | Section              | C# | Python | Go | Notes                   |
  |----------------------|:--:|:------:|:--:|-------------------------|
  | Mem0 configuration   | ❌ |   ✅   | ❌ |                         |
  | Memory scoping       | ❌ |   ✅   | ❌ |                         |
  | Cross-session recall | ❌ |   ✅   | ❌ |                         |
  | Availability         | ✅ |   ✅   | ✅ | C# and Go are status only |
-->

# Mem0

Mem0 extracts durable memories from agent conversations and retrieves relevant memories in later runs. Configure storage and retrieval scopes when memories should be available across sessions.

This integration uses the memory pattern: it extracts and recalls selected durable information rather than replaying the complete conversation transcript.

> **Important:**
> Mem0 is a third-party system. Review its data handling, retention, regional boundaries, and service terms before sending application data.

**Applies to: programming-language-csharp**


> **Note:**
> Mem0 integration isn't currently available for Agent Framework .NET.



**Applies to: programming-language-python**


## Install the package

```bash
pip install agent-framework-mem0 --pre
```

Set `MEM0_API_KEY` or pass an API key directly. Configure storage and retrieval separately:

- `user_id`, `agent_id`, and `application_id` are storage scopes. Mem0 stamps them on each stored memory.
- `search_user_id`, `search_agent_id`, and `search_application_id` are retrieval scopes. Mem0 uses them to select which memories it searches.

The application scopes require the Mem0 Platform client (`AsyncMemoryClient`). The OSS `AsyncMemory` client supports only user and agent scopes.

Retrieval scope doesn't inherit from storage scope. If you don't set any `search_*` scope, the provider stores memories but doesn't recall them.

For per-user memory, set `user_id` and `search_user_id` to the same stable identifier:

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/python/samples/02-agents/context_providers/mem0/mem0_basic.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/integrations/by-component/context-providers/mem0.md)

Mem0 processes memories asynchronously. In production, use retry or service-aware consistency handling instead of relying on a fixed delay.



**Applies to: programming-language-go**


> **Note:**
> Mem0 integration isn't currently available for Agent Framework Go. See the [Agent Framework Go repository](https://github.com/microsoft/agent-framework-go) for the latest status.



## Next steps

> 
> [Microsoft Foundry](microsoft-foundry.md#add-managed-semantic-memory)

**Go deeper:**

- [Context providers](../../../concepts/agents/conversations/context-providers.md)
- [Conversation sessions](../../../concepts/agents/conversations/session.md)
