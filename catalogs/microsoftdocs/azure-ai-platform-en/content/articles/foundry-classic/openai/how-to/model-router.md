---
title: "How to use model router for Microsoft Foundry (classic)"
description: "Learn how to use the model router in Azure OpenAI to select the best model for your task. (classic)"
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.date: 03/18/2026
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: how-to
ms.custom:
  - classic-and-new
  - build-2025
  - doc-kit-assisted
# customer intent:
ai-usage: ai-assisted

ROBOTS: NOINDEX, NOFOLLOW
---

# Use model router for Microsoft Foundry (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../../foundry/openai/how-to/model-router.md)

Model router for Microsoft Foundry is a deployable AI chat model that selects the best large language model (LLM) to respond to a prompt in real time. It uses different preexisting models to deliver high performance and save on compute costs, all in one model deployment. To learn more about how model router works, its advantages, and limitations, see the [Model router concepts guide](../concepts/model-router.md).

Use model router through the Chat Completions API like you'd use a single base model such as GPT-5. Follow the same steps as in the [Chat completions guide](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/chatgpt).

> **Tip:**
> The [Microsoft Foundry (new)](../../../foundry/what-is-foundry.md) portal offers enhanced configuration options for model router. [Switch to the Microsoft Foundry (new) documentation](../../../foundry/openai/how-to/model-router.md) to see the latest features.


## Supported models

> **Note:**
> You don't need to separately deploy the supported large language models for use with model router, except for the Claude models. To use model router with your Claude models, first deploy them from the model catalog. Model router invokes the deployments if you select them for routing.

### Model router version `2025-11-18` (latest)

| Provider | Model | Version |
| :--- | :--- | :---: |
| OpenAI | `gpt-6-astra` | `2026-09-03` |
| OpenAI | `gpt-5.6-sol` | `2026-07-09` |
| OpenAI | `gpt-5.6-terra` | `2026-07-09` |
| OpenAI | `gpt-5.6-luna` | `2026-07-09` |
| OpenAI | `gpt-5.5` | `2026-04-24` |
| OpenAI | `gpt-5.4` | `2026-03-05` |
| OpenAI | `gpt-5.4-mini` | `2026-03-17` |
| OpenAI | `gpt-5.4-nano` | `2026-03-17` |
| OpenAI | `gpt-5.2` | `2025-12-11` |
| OpenAI | `gpt-5` | `2025-08-07` |
| OpenAI | `gpt-5-mini` | `2025-08-07` |
| OpenAI | `gpt-5-nano` | `2025-08-07` |
| OpenAI | `o4-mini` | `2025-04-16` |
| OpenAI | `gpt-4.1` | `2025-04-14` |
| OpenAI | `gpt-4.1-mini` | `2025-04-14` |
| OpenAI | `gpt-4.1-nano` | `2025-04-14` |
| OpenAI | `gpt-4o` | `2024-11-20` |
| OpenAI | `gpt-4o-mini` | `2024-07-18` |
| OpenAI | `gpt-oss-120b` | `1` |
| Anthropic | `claude-fable-5-1` | `1` |
| Anthropic | `claude-opus-5` | `1` |
| Anthropic | `claude-sonnet-5` | `1` |
| Anthropic | `claude-opus-4-8` | `1` |
| Anthropic | `claude-opus-4-7` | `1` |
| Anthropic | `claude-opus-4-6` | `1` |
| Anthropic | `claude-sonnet-4-5` | `20250929` |
| Anthropic | `claude-haiku-4-5` | `20251001` |
| xAI | `grok-4.6` | `1` |
| xAI | `grok-4-1-fast-reasoning` | `1` |
| xAI | `grok-4` | `1` |
| Fireworks | `FW-GLM-5.3` | `1` |
| Fireworks | `FW-GLM-5.3-Flash` | `1` |
| Fireworks | `FW-Kimi-K3` | `1` |
| DeepSeek | `DeepSeek-V3.2` | `1` |
| Meta | `Llama-4-Maverick-17B-128E-Instruct-FP8` | `1` |

<!--
### Model router version `2025-08-07`

| Format | Model | Version |
|:---|:---|:---:|
| OpenAI | `gpt-4.1` | `2025-04-14` |
| OpenAI | `gpt-4.1-mini` | `2025-04-14` |
| OpenAI | `gpt-4.1-nano` | `2025-04-14` |
| OpenAI | `o4-mini` | `2025-04-16` |
| OpenAI | `gpt-5` | `2025-08-07` |
| OpenAI | `gpt-5-mini` | `2025-08-07` |
| OpenAI | `gpt-5-nano` | `2025-08-07` |
| OpenAI | `gpt-5-chat` | `2025-08-07` |


### Model router version `2025-05-19`

| Format | Model | Version |
|:---|:---|:---:|
| OpenAI | `gpt-4.1` | `2025-04-14` |
| OpenAI | `gpt-4.1-mini` | `2025-04-14` |
| OpenAI | `gpt-4.1-nano` | `2025-04-14` |
| OpenAI | `o4-mini` | `2025-04-16` |
-->


## Deploy a model router model

Model router is packaged as a single Foundry model that you deploy. Start by following the steps in the [resource deployment guide](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource). To deploy programmatically without the portal, use the REST API examples in the deployment sections that follow.

> **Note:**
> If your organization uses the [built-in Azure Policy for model deployment](https://learn.microsoft.com/azure/ai-foundry/how-to/model-deployment-policy), make sure the policy's allowed publishers include `Microsoft` (the publisher of model router) and the publisher of each model you deploy for routing (for example, `Anthropic` for Claude models). Otherwise, the policy blocks the deployment.

By default, model router deploys with the **Balanced** routing mode and routes across the full supported model set. You don't need to configure optional routing settings unless you want custom routing behavior.

### Default deployment

In the **Create new deployment**, find `model-router` in the **Models** list and select it.


> **Tip:**
> The REST API deployment path targets the Microsoft Foundry account resource directly and doesn't require a Foundry project. This makes it a good option for existing customers who deploy and manage Foundry models without a project association.

Before you run the REST examples, sign in with Azure CLI and save a management-plane bearer token as `AZURE_AI_AUTH_TOKEN`.

```bash
export AZURE_AI_AUTH_TOKEN=$(az account get-access-token --resource https://management.azure.com --query accessToken -o tsv)
```

Deploy model router programmatically with the Azure Management REST API. The following example creates a default deployment and relies on the built-in **Balanced** routing mode and full supported model set.

```bash
curl -X PUT "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/my-resource-group/providers/Microsoft.CognitiveServices/accounts/my-foundry-account/deployments/model-router-deployment?api-version=2025-10-01-preview" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AZURE_AI_AUTH_TOKEN" \
    -d '{
        "sku": {"name": "GlobalStandard", "capacity": 10},
        "properties": {
                "model": {"format": "OpenAI", "name": "model-router", "version": "2025-11-18"}
        }
}'
```

### Optional: customize deployment settings

If you want to override the default **Balanced** routing mode or restrict routing to a model subset, use the REST API deployment options in the next section.

> **Note:**
> Your deployment settings apply to all underlying chat models that model router uses.
> - Don't deploy the underlying chat models separately. Model router works independently of your other deployed models.
> - Select a content filter when you deploy the model router model or apply a filter later. The content filter applies to all content passed to and from the model router; don't set content filters for each underlying chat model.
> - Your tokens-per-minute rate limit setting applies to all activity to and from the model router; don't set rate limits for each underlying chat model.

#### Configure custom settings with the REST API

Use the following example when you want to set both the routing mode and a model subset in the same deployment request.


Add a `routing` block only when you want to override the default **Balanced** mode or restrict the routed model set. The following example keeps the combined custom request with both a routing mode and a model subset.

> **Note:**
> The deployment request body uses `format`, `name`, and `version` for the model router itself and for each model in the routing subset. Find the correct values for each model in the supported models table in this article.

```bash
curl -X PUT "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/my-resource-group/providers/Microsoft.CognitiveServices/accounts/my-foundry-account/deployments/model-router-deployment?api-version=2025-10-01-preview" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AZURE_AI_AUTH_TOKEN" \
  -d '{
    "sku": {"name": "GlobalStandard", "capacity": 10},
    "properties": {
        "model": {"format": "OpenAI", "name": "model-router", "version": "2025-11-18"},
        "routing": {
            "mode": "balanced",
            "models": [
                {"format": "OpenAI", "name": "gpt-4.1", "version": "2025-04-14"},
                {"format": "OpenAI", "name": "gpt-5.6-sol", "version": "2026-07-09"},
                {"format": "Meta", "name": "Llama-4-Maverick-17B-128E-Instruct-FP8", "version": "1"}
            ]
        }
    }
}'
```

> **Important:**
> If you include Anthropic Claude models in the `routing.models` array, you must first deploy them to the same Foundry account with a matching SKU. Otherwise the request fails with an `InvalidResourceProperties` error. Deploy Claude models from the Foundry model catalog before you reference them in a model router deployment. See [Deploy and use Claude models](../../../foundry/foundry-models/how-to/use-foundry-models-claude.md).


## Test model router with Foundry Responses and Chat Completions

Call model router the same way you call any OpenAI chat model. Set the `model` parameter to the name of your model router deployment. You can use the Microsoft Foundry SDK with the Responses API or the OpenAI SDK with the Chat Completions API, in either Python or JavaScript/TypeScript.

> **Note:**
> Install the required packages before you run the samples:
> - **Foundry Responses (Python)**: `pip install azure-ai-projects>=2.0.0 azure-identity`
> - **Foundry Responses (JavaScript/TypeScript)**: `npm install @azure/ai-projects @azure/identity`
> - **Chat Completions (Python)**: `pip install openai>=1.75.0`
> - **Chat Completions (JavaScript/TypeScript)**: `npm install openai @azure/identity`

# [Foundry Responses](#tab/foundry-responses)

**Python**

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/foundry-models/model-router/model-router-foundry-responses.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/model-router.md)

**JavaScript/TypeScript**

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";

const project = new AIProjectClient(
  process.env["FOUNDRY_PROJECT_ENDPOINT"]!,
  new DefaultAzureCredential(),
);

// Get an OpenAI-compatible client that works with all Foundry models
const client = project.getOpenAIClient();

const response = await client.responses.create({
  model: process.env["MODEL_ROUTER_DEPLOYMENT_NAME"] || "model-router",
  input: "Explain retrieval-augmented generation in one sentence.",
});

// The "model" field reveals which underlying model was selected
console.log(`Responded model: ${response.model}`);
console.log(response.output_text);
```

# [Chat Completions](#tab/chat-completions)
**Python**

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/foundry-models/model-router/model-router-chat-completions.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/model-router.md)

**JavaScript/TypeScript**

```typescript
import { AzureOpenAI } from "openai";
import {
  DefaultAzureCredential,
  getBearerTokenProvider,
} from "@azure/identity";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"]!;
const deploymentName =
  process.env["MODEL_ROUTER_DEPLOYMENT_NAME"] || "model-router";
const apiVersion = "2025-11-18";

const credential = new DefaultAzureCredential();
const azureADTokenProvider = getBearerTokenProvider(
  credential,
  "https://cognitiveservices.azure.com/.default",
);

const client = new AzureOpenAI({
  endpoint,
  azureADTokenProvider,
  apiVersion,
  deployment: deploymentName,
});

const completion = await client.chat.completions.create({
  model: deploymentName,
  messages: [
    {
      role: "user",
      content: "Explain retrieval-augmented generation in one sentence.",
    },
  ],
});

// The "model" field reveals which underlying model was selected
console.log(`Responded model: ${completion.model}`);
console.log(completion.choices[0].message.content);
```

---

> **Tip:**
> For the full runnable samples, see [Model Router samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/foundry-models/model-router) in the foundry-samples repository.

- Reference: [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) (`responses.create`, both languages)
- Reference: [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/chat) (`chat.completions.create`, both languages)
- Reference: [`AIProjectClient`](https://learn.microsoft.com/python/api/azure-ai-projects/azure.ai.projects.aiprojectclient) (Python)
- Reference: [`AIProjectClient`](https://learn.microsoft.com/javascript/api/@azure/ai-projects/aiprojectclient) (JavaScript/TypeScript)
- Reference: [`AzureOpenAI` (OpenAI Python SDK)](https://pypi.org/project/openai/)
- Reference: [`AzureOpenAI` (OpenAI JavaScript/TypeScript SDK)](https://www.npmjs.com/package/openai)

## Keep Chat Completions requests on the same model (preview)

The Chat Completions API is stateless, so your application sends the conversation history with each request. By default, model router evaluates each request independently and might select a different underlying model for a later turn. Session affinity lets your application identify related requests and asks model router to try the same eligible model first.

Session affinity can improve the opportunity for prompt-cache reuse when consecutive requests have overlapping prompt prefixes. It doesn't inspect cache state or guarantee a cache hit.

### Configure session affinity

After your application reads the endpoint, API key, and deployment name, create the client with the preview feature header. Then create an opaque, application-owned session ID that doesn't contain secrets or personal information:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/foundry-models/model-router/model-router-chat-completions-session-affinity.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/model-router.md)

Use the same session ID for every turn in one conversation. Use a different session ID for an unrelated conversation.

You can alternatively provide the application-owned identifier in the `x-ms-session-id` request header. When a request contains valid identifiers in both locations, `routing_config.session_affinity.session_id` takes precedence. A session ID must contain 1 through 256 Unicode code points, including at least one non-whitespace character. Model router ignores an invalid body identifier and tries a valid header identifier. If neither identifier is valid, Chat Completions uses normal routing.

### Send related conversation turns

Send the first request, append its response and the next user message to the conversation history, and send the next request with the same session affinity configuration:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/foundry-models/model-router/model-router-chat-completions-session-affinity.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/model-router.md)

Model router creates or updates a model association only after a successful request. The association expires after 30 minutes without a successful create or update.

### Verify the affinity decision

Inspect `model_selection_details.model_router_details.session_affinity` to determine how model router applied affinity:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/foundry-models/model-router/model-router-chat-completions-session-affinity.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/model-router.md)

A typical run produces output similar to the following example:

```output
--- First turn ---
Serving model: <model-name>
Affinity mode: sticky
Affinity source: session_id_payload
Affinity decision: initialize
Response:
<first-response>

--- Second turn ---
Serving model: <model-name>
Affinity mode: sticky
Affinity source: session_id_payload
Affinity decision: retain
Response:
<second-response>
```

The first successful request typically returns `initialize`. A later request returns `retain` when the associated model serves the response. It returns `switch` when eligibility or fallback causes another model to serve the response. Policy, safety, capability, quota, availability, and fallback requirements take precedence over affinity.

To disable affinity for one request, set `routing_config.session_affinity.mode` to `none`. Model router uses normal routing for that request and doesn't read or update the model association. The response reports `mode` as `none` and omits `source` and `decision`.

Session affinity is best-effort. An affinity lookup or persistence failure doesn't fail inference. In that case, model router uses normal routing and omits the complete `session_affinity` response object. Session affinity doesn't store conversation content, prevent fallback, or provide adaptive cache-aware switching.

For the response fields and fallback diagnostics, see [Monitor model router](../../../foundry/openai/how-to/monitor-model-router.md#interpret-session-affinity-metadata).


## Test model router in the playground

In the [Foundry portal](https://ai.azure.com/?cid=learnDocs), go to your model router deployment on the **Models + endpoints** page and select it to open the model playground. In the playground, enter messages and see the model's responses. Each response shows which underlying model the router selected.

> **Important:**
> You can set the `Temperature` and `Top_P` parameters to the values you prefer (see the [concepts guide](https://learn.microsoft.com/azure/ai-foundry/openai/concepts/prompt-engineering?tabs=chat#temperature-and-top_p-parameters)), but note that reasoning models (o-series) don't support these parameters. If model router selects a reasoning model for your prompt, it ignores the `Temperature` and `Top_P` input parameters.
>
> The parameters `stop`, `presence_penalty`, `frequency_penalty`, `logit_bias`, and `logprobs` are similarly dropped for o-series models but used otherwise.

> **Important:**
> Starting with the `2025-11-18` version, the `reasoning_effort` parameter (see the [Reasoning models guide](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/reasoning?tabs=python-secure#reasoning-effort)) is now **supported** in model router. If the model router selects a reasoning model for your prompt, it will use your `reasoning_effort` input value with the underlying model.

### Output format 

The JSON response you receive from a model router model is identical to the standard chat completions API response. Note that the `"model"` field reveals which underlying model was selected to respond to the prompt.

The following example response was generated using API version `2025-11-18`:

```json

{
    "success": true,
    "data": {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "protected_material_code": {
                        "filtered": false,
                        "detected": false
                    },
                    "protected_material_text": {
                        "filtered": false,
                        "detected": false
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "finish_reason": "stop",
                "index": 0,
                "logprobs": null,
                "message": {
                    "annotations": [],
                    "content": "Charismatic and bold—combining brash showmanship and poetic wit with fierce competitiveness, moral conviction, and unwavering activism.",
                    "refusal": null,
                    "role": "assistant"
                }
            }
        ],
        "created": 1774543376,
        "id": "xxxx-yyyy-zzzz",
        "model": "gpt-5-mini-2025-08-07",
        "object": "chat.completion",
        "prompt_filter_results": [
            {
                "prompt_index": 0,
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "jailbreak": {
                        "filtered": false,
                        "detected": false
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                }
            }
        ],
        "system_fingerprint": null,
        "usage": {
            "completion_tokens": 163,
            "completion_tokens_details": {
                "accepted_prediction_tokens": 0,
                "audio_tokens": 0,
                "reasoning_tokens": 128,
                "rejected_prediction_tokens": 0
            },
            "prompt_tokens": 3254,
            "prompt_tokens_details": {
                "audio_tokens": 0,
                "cached_tokens": 3200
            },
            "total_tokens": 3417
        }
    }
}

```

## Monitor model router metrics

To inspect the serving model, routing attempts, status, and reported latency for an individual Chat Completions request, see [Monitor model router](../../../foundry/openai/how-to/monitor-model-router.md).

### Monitor performance

Monitor the performance of your model router deployment in Azure Monitor (AzMon) in the Azure portal.

1. Go to the **Monitoring** > **Metrics** page for your Azure OpenAI resource in the Azure portal.
1. Filter by the deployment name of your model router model.
1. Split the metrics by underlying models if needed.

### Monitor costs

You can monitor the costs of model router, which is the sum of the costs incurred by the underlying models.
1. Visit the **Resource Management** -> **Cost analysis** page in the Azure portal.
1. If needed, filter by Azure resource.
1. Then, filter by deployment name: Filter by "Tag", select **Deployment** as the type of the tag, and then select your model router deployment name as the value.

## Troubleshoot model router

### Common issues

| Issue | Cause | Resolution |
| --- | --- | --- |
| Rate limit exceeded | Too many requests to model router deployment | Increase tokens-per-minute quota or implement retry with exponential backoff |
| Unexpected model selection | Routing logic selected different model than expected | Review routing mode settings; consider using model subset to constrain options |
| High latency | Router overhead plus underlying model processing | Use Cost mode for latency-sensitive workloads; smaller models respond faster |
| Claude model not routing | Claude models require separate deployment | Deploy Claude models from model catalog before enabling in subset |

### Error codes

For API error codes and troubleshooting, see the [Azure OpenAI REST API reference](../reference.md).

## Resources

The following open-source repositories demonstrate model router in different scenarios. Each repo is on GitHub — learn, fork, and extend to accelerate your learning. Most samples require an existing model router deployment; see [Deploy a model router model](#deploy-a-model-router-model) to get started.

| **Resource** | **Learn** | **Extend** |
| --- | --- | --- |
| [Model Router Capabilities Interactive Demo](https://github.com/leestott/router-demo-app/) (Python) | Compare Balanced, Cost, and Quality routing modes with custom prompts. View live benchmark data for cost savings, latency, and routing distribution. | Add your own prompt sets, integrate with your CI pipeline, or connect to your deployment for A/B testing. |
| [Routed Models Distribution Analysis](https://github.com/guygregory/ModelRouter-Distribution) (Python) | Run batches of prompts across routing profiles and model subsets. See which models the router selects and in what proportions. | Plug in representative prompt logs to evaluate tradeoffs before adopting a routing policy at scale. |
| [Multi-team scenarios with Quality & Cost benchmarking](https://github.com/microsoft/aitour26-LTG153-automate-model-selection-with-microsoft-foundry-model-router) (Python, workshop) | Deploy model router, run benchmarks against fixed-model deployments, and analyze cost and latency optimization in a multi-team enterprise scenario. | Swap in your own models, prompts, and routing profiles to benchmark against your workload patterns. |
| [On-Call Copilot Multi-Agent Demo](https://github.com/leestott/On-Call-Copilot-Multi-Agent) (Python) | See how model router dynamically selects the right model per agent step — a fast, low-cost model for classification and a reasoning model for root-cause analysis. | Adapt the multi-agent architecture, agent roles, and escalation paths for your own operations or support scenarios. |

> **Important:**
> These samples are intended for learning and experimentation only and are not production-ready. Before deploying any code derived from these repositories, review it against your organization's security, compliance, and responsible AI policies. See the [Microsoft Responsible AI principles](https://www.microsoft.com/ai/responsible-ai) for guidance.

## Next steps

- [Model router concepts](../../../foundry/openai/concepts/model-router.md) - Learn how routing modes work
- [Quotas and limits](../../../foundry/openai/quotas-limits.md) - Rate limits for model router
- [Create an agent](../../agents/quickstart.md) - Use model router with Foundry agents
