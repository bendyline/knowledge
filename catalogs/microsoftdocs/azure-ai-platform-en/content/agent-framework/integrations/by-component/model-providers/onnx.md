---
title: ONNX
description: Run a local ONNX Runtime GenAI model behind an Agent Framework .NET agent.
author: eavanvalkenburg
ms.topic: article
ms.author: edvan
ms.date: 07/28/2026
ms.service: agent-framework
---

# ONNX

ONNX Runtime GenAI lets a .NET Agent Framework application run a compatible model locally. Use it for offline development, on-device inference, or deployments where model execution must stay on the host.

> **Note:**
> The current ONNX client doesn't support function calling. Function tools passed to the agent are ignored.

## Prerequisites

- .NET 8 or later.
- A model exported for ONNX Runtime GenAI.
- Sufficient local memory and a compatible execution provider for the selected model.

## Install the packages

```bash
dotnet add package Microsoft.ML.OnnxRuntimeGenAI
dotnet add package Microsoft.Agents.AI --prerelease
```

## Configuration

```bash
ONNX_MODEL_PATH="<path-to-onnx-runtime-genai-model-directory>"
```

## Create an ONNX-backed agent

Download a model exported for ONNX Runtime GenAI and point `ONNX_MODEL_PATH` to the model directory.

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/dotnet/samples/02-agents/AgentProviders/onnx/Agent_With_ONNX/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/integrations/by-component/model-providers/onnx.md)

The model files, execution provider, quantization, and available memory determine hardware compatibility and performance. Review the model license before redistributing it.

## Tools

The current ONNX client doesn't support function calling or provider-hosted tools.

## Next steps

> 
> [Dapr](dapr.md)
