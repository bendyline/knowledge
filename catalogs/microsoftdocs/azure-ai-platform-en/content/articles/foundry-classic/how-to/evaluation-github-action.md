---
title: "How to run an evaluation in GitHub Action (classic)" 
description: "How to run evaluation in GitHub Action to streamline the evaluation process, allowing you to assess model performance and make informed decisions before deploying to production. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-observability
ms.topic: how-to
ms.date: 01/12/2026
ms.reviewer: hanch
ms.author: lagayhar
author: lgayhardt
ai-usage: ai-assisted
ms.custom:
  - classic-and-new
ROBOTS: NOINDEX, NOFOLLOW
---

# How to run an evaluation in GitHub Action (preview) (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/how-to/evaluation-github-action.md)


> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


This GitHub Action enables offline evaluation of AI models and agents within your CI/CD pipelines. It streamlines the evaluation process, so you can assess model performance and make informed decisions before deploying to production.

Offline evaluation involves testing AI models and agents by using test datasets to measure their performance on various quality and safety metrics such as fluency, coherence, and appropriateness. After you select a model in the [Foundry model catalog](https://azure.microsoft.com/products/ai-model-catalog?msockid=1f44c87dd9fa6d1e257fdd6dd8406c42) or [GitHub Model marketplace](https://github.com/marketplace/models), perform offline pre-production evaluation to validate the AI application during integration testing. This process allows developers to identify potential problems and make improvements before deploying the model or application to production, such as when creating and updating agents.


## Features

- **Automated Evaluation**: Integrate offline evaluation into your CI/CD workflows to automate the pre-production assessment of AI models.

- **Built-in Evaluators**: Leverage existing evaluators provided by the [Azure AI Evaluation SDK](develop/evaluate-sdk.md).

    The following evaluators are supported:

    | Category | Evaluator class/Metrics | AI Agent evaluations | GenAI evaluations |
    | --- | --- | --- | --- |
    | General purpose (AI-assisted) | [QAEvaluator](../concepts/evaluation-evaluators/general-purpose-evaluators.md#question-answering-composite-evaluator) | Not Supported | Supported |
    | General purpose (AI-assisted) | [CoherenceEvaluator](../concepts/evaluation-evaluators/general-purpose-evaluators.md#coherence) | Supported | Supported |
    | General purpose (AI-assisted) | [FluencyEvaluator](../concepts/evaluation-evaluators/general-purpose-evaluators.md#fluency) | Supported | Supported |
    | Textual similarity | [SimilarityEvaluator](../concepts/evaluation-evaluators/textual-similarity-evaluators.md#similarity) | Not Supported | Supported |
    | Textual similarity | [F1ScoreEvaluator](../concepts/evaluation-evaluators/textual-similarity-evaluators.md#f1-score) | Not Supported | Supported |
    | Textual similarity | [RougeScoreEvaluator](../concepts/evaluation-evaluators/textual-similarity-evaluators.md) | Not Supported | Not Supported |
    | Textual similarity | [GleuScoreEvaluator](../concepts/evaluation-evaluators/textual-similarity-evaluators.md#gleu-score) | Not Supported | Supported |
    | Textual similarity | [BleuScoreEvaluator](../concepts/evaluation-evaluators/textual-similarity-evaluators.md#bleu-score) | Not Supported | Supported |
    | Textual similarity | [MeteorScoreEvaluator](../concepts/evaluation-evaluators/textual-similarity-evaluators.md#meteor-score) | Not Supported | Supported |
    | Retrieval-augmented Generation (RAG) (AI-assisted) | [GroundednessEvaluator](../concepts/evaluation-evaluators/rag-evaluators.md#groundedness) | Supported | Supported |
    | Retrieval-augmented Generation (RAG) (AI-assisted) | [GroundednessProEvaluator](../concepts/evaluation-evaluators/rag-evaluators.md#groundedness-pro) | Not Supported | Supported |
    | Retrieval-augmented Generation (RAG) (AI-assisted) | [RetrievalEvaluator](../concepts/evaluation-evaluators/rag-evaluators.md#relevance) | Not Supported | Supported |
    | Retrieval-augmented Generation (RAG) (AI-assisted) | [RelevanceEvaluator](../concepts/evaluation-evaluators/rag-evaluators.md#retrieval) | Supported | Supported |
    | Retrieval-augmented Generation (RAG) (AI-assisted) | [ResponseCompletenessEvaluator](../concepts/evaluation-evaluators/rag-evaluators.md#response-completeness) | Not Supported | Supported |
    | Retrieval-augmented Generation (RAG) (AI-assisted) | [DocumentRetrievalEvaluator](../concepts/evaluation-evaluators/rag-evaluators.md#document-retrieval) | Not Supported | Not Supported |
    | Risk and safety (AI-assisted) | [ViolenceEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#violent-content) | Supported | Supported |
    | Risk and safety (AI-assisted) | [SexualEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#sexual-content) | Supported | Supported |
    | Risk and safety (AI-assisted) | [SelfHarmEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#self-harm-related-content) | Supported | Supported |
    | Risk and safety (AI-assisted) | [HateUnfairnessEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#hateful-and-unfair-content) | Supported | Supported |
    | Risk and safety (AI-assisted) | [IndirectAttackEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#indirect-attack-jailbreak-xpia) | Supported | Supported |
    | Risk and safety (AI-assisted) | [ProtectedMaterialEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#protected-material-content) | Supported | Supported |
    | Risk and safety (AI-assisted) | [CodeVulnerabilityEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#code-vulnerability) | Supported | Supported |
    | Risk and safety (AI-assisted) | [UngroundedAttributesEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#ungrounded-attributes) | Not Supported | Supported |
    | Risk and safety (AI-assisted) | [ContentSafetyEvaluator](../concepts/evaluation-evaluators/risk-safety-evaluators.md#content-safety-composite-evaluator) | Supported | Supported |
    | Agent (AI-assisted) | [IntentResolutionEvaluator](../concepts/evaluation-evaluators/agent-evaluators.md#intent-resolution) | Supported | Supported |
    | Agent (AI-assisted) | [TaskAdherenceEvaluator](../concepts/evaluation-evaluators/agent-evaluators.md#task-adherence) | Supported | Supported |
    | Agent (AI-assisted) | [ToolCallAccuracyEvaluator](../concepts/evaluation-evaluators/agent-evaluators.md#tool-call-accuracy) | Supported | Supported |
    | Composite | `AgentOverallEvaluator` | Not Supported | Not Supported |
    | Operational metrics | Client run duration | Supported | Not Supported |
    | Operational metrics | Server run duration | Supported | Not Supported |
    | Operational metrics | Completion tokens | Supported | Not Supported |
    | Operational metrics | Prompt tokens | Supported | Not Supported |
    | [Custom evaluators](../concepts/evaluation-evaluators/custom-evaluators.md) |  | Not Supported | Not Supported |



- **Seamless Integration**: Easily integrate with existing GitHub workflows to run evaluation based on rules that you specify in your workflows (for examples, when changes are committed to agent versions, prompt templates, or feature flag configuration).
- **Statistical Analysis**: Evaluation results include confidence intervals and test for statistical significance to determine if changes are meaningful and not due to random variation.
- **Out-of-box operation metrics**: Automatically generates operational metrics for each evaluation run (client run duration, server run duration, completion tokens, and prompt tokens).

## Prerequisites

- A project. To learn more, see [Create a project](create-projects.md).
- A [Foundry agent](../agents/overview.md).

> **Tip:**
> The recommended way to authenticate is by using Microsoft Entra ID, which allows you to securely connect to your Azure resources. You can automate the authentication process by using the [Azure Login GitHub action](https://learn.microsoft.com/azure/developer/github/connect-from-azure). To learn more, see [Azure Login action with OpenID Connect](https://learn.microsoft.com/azure/developer/github/connect-from-azure-openid-connect).

Two GitHub Actions are available for evaluating AI applications: **ai-agent-evals** and **genai-evals**.

- If your application already uses Foundry agents, **ai-agent-evals** is a good choice because it offers a simplified setup process and direct integration with agent-based workflows.
- **genai-evals** is designed for evaluating generative AI models outside of the agent framework.

> **Note:**
> The **ai-agent-evals** interface is more straightforward to configure. In contrast, **genai-evals** requires you to prepare structured evaluation input data. Code samples are provided to help with setup.

## How to set up AI agent evaluations

### AI agent evaluations input

The input of ai-agent-evals includes:

**Required:**

# [Foundry project](#tab/foundry-project)

- `azure-ai-project-endpoint`: The endpoint of the Foundry project. Use this endpoint to connect to your AI project, simulate conversations with each agent, and connect to the Azure AI evaluation SDK to perform the evaluation.

# [Hub-based project](#tab/hub-project)

- `azure-aiproject-connection-string`: The connection string of the Foundry project. Use this string to connect to your AI project, simulate conversations with each agent, and connect to the Azure AI evaluation SDK to perform the evaluation.

---

- `deployment-name`: The deployed model name for evaluation judgment.
- `data-path`: Path to the input data file containing the conversation starters. Each conversation starter is sent to each agent for a pairwise comparison of evaluation results.
  - `evaluators`: Built-in evaluator names.
  - `data`: A set of conversation starters or queries.
  - Only single agent turn is supported.
- `agent-ids`: A unique identifier for the agent and a comma-separated list of agent IDs to evaluate.
  - When you specify only one `agent-id`, the evaluation results include the absolute values for each metric along with the corresponding confidence intervals.
  - When you specify multiple `agent-ids`, the results include absolute values for each agent and a statistical comparison against the designated baseline agent ID.

**Optional:**

- `api-version`: The API version of deployed model.
- `baseline-agent-id`: Agent ID of the baseline agent to compare against. By default, the first agent is used.  
- `evaluation-result-view`: Specifies the format of evaluation results. Defaults to "default" (boolean scores such as passing and defect rates) if omitted. Options are "default", "all-scores" (includes all evaluation scores), and "raw-scores-only" (non-boolean scores only).

Here's a sample of the dataset:

```JSON
{ 
  "name": "MyTestData", 
  "evaluators": [ 
    "RelevanceEvaluator", 
    "ViolenceEvaluator", 
    "HateUnfairnessEvaluator",
  ], 
  "data": [ 
    { 
      "query": "Tell me about Tokyo?", 
    }, 
    { 
      "query": "Where is Italy?", 
    } 
  ] 
} 

```

### AI agent evaluations workflow

To use the GitHub Action, add the GitHub Action to your CI/CD workflows. Specify the trigger criteria, such as on commit, and the file paths to trigger your automated workflows.

> **Tip:**
> To minimize costs, don't run evaluation on every commit.  

This example shows how you can run Azure Agent AI Evaluation when you compare different agents by using agent IDs.

# [Foundry project](#tab/foundry-project)

```YAML
name: "AI Agent Evaluation"

on:
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  id-token: write
  contents: read

jobs:
  run-action:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Azure login using Federated Credentials
        uses: azure/login@v2
        with:
          client-id: ${{ vars.AZURE_CLIENT_ID }}
          tenant-id: ${{ vars.AZURE_TENANT_ID }}
          subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}

      - name: Run Evaluation
        uses: microsoft/ai-agent-evals@v2-beta
        with:
          # Replace placeholders with values for your Azure AI Project
          azure-ai-project-endpoint: "<your-ai-project-endpoint>"
          deployment-name: "<your-deployment-name>"
          agent-ids: "<your-ai-agent-ids>"
          data-path: ${{ github.workspace }}/path/to/your/data-file

```

# [Hub-based project](#tab/hub-project)

```YAML
name: "AI Agent Evaluation"

on:
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  id-token: write
  contents: read

jobs:
  run-action:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Azure login using Federated Credentials
        uses: azure/login@v2
        with:
          client-id: ${{ vars.AZURE_CLIENT_ID }}
          tenant-id: ${{ vars.AZURE_TENANT_ID }}
          subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}

      - name: Run Evaluation
        uses: microsoft/ai-agent-evals@v1-beta
        with:
          # Replace placeholders with values for your Azure AI Project
          azure-aiproject-connection-string: "<your-ai-project-conn-str>"
          deployment-name: "<your-deployment-name>"
          agent-ids: "<your-ai-agent-ids>"
          data-path: ${{ github.workspace }}/path/to/your/data-file

```

---

### AI agent evaluations output

The evaluation process outputs results to the summary section for each AI evaluation GitHub Action run. You can view these results under **Actions** in GitHub.com.

The result includes two main parts:

- The top section summarizes the overview of your AI agent variants. You can select it on the agent ID link, and it directs you to the agent setting page in Foundry portal. You can also select the link for Evaluation Results, and it directs you to Foundry portal to view individual result in detail.

- The second section includes evaluation scores and comparison between different variants on statistical significance (for multiple agents) and confidence intervals (for single agent).

Multi agent evaluation result:

Screenshot of multi agent evaluation result in GitHub Action.

Single agent evaluation result:

Screenshot of single agent evaluation result in GitHub Action.

## How to set up genAI evaluations

### GenAI evaluations input

The input for genai-evals includes the following items. Some items are optional depending on the evaluator you use:

Evaluation configuration file:

- `data`: a set of queries and ground truth. Ground-truth is optional and only required for a subset of evaluators. (See which [evaluator requires ground-truth](develop/evaluate-sdk.md#data-requirements-for-built-in-evaluators)).

    Here's a sample of the dataset:

    ```json
    [ 
        { 
            "query": "Tell me about Tokyo?", 
            "ground-truth": "Tokyo is the capital/major city of Japan and the largest city in the country/region. It is located on the eastern coast of Honshu, the largest of Japan's four main islands. Tokyo is the political, economic, and cultural center of Japan and is one of the world's most populous cities. It is also one of the world's most important financial centers and is home to the Tokyo Stock Exchange." 
        }, 
        { 
            "query": "Where is Italy?", 
            "ground-truth": "Italy is a country/region in southern Europe, located on the Italian Peninsula and the two largest islands in the Mediterranean Sea, Sicily and Sardinia. It is a unitary parliamentary republic with its capital/major city in Rome, the largest city in Italy. Other major cities include Milan, Naples, Turin, and Palermo." 
        }, 
    
        { 
            "query": "Where is Papua New Guinea?", 
            "ground-truth": "Papua New Guinea is an island country/region that lies in the south-western Pacific. It includes the eastern half of New Guinea and many small offshore islands. Its neighbours include Indonesia to the west, Australia to the south and Solomon Islands to the south-east." 
        } 
    ] 
    
    ```

- `evaluators`: Built-in evaluator names.
- `ai_model_configuration`: includes type, `azure_endpoint`, `azure_deployment`, and `api_version`.

### GenAI evaluations workflow

This example shows how to run Azure AI Evaluation when you commit changes to specific files in your repo.

> **Note:**
> Update `GENAI_EVALS_DATA_PATH` to point to the correct directory in your repo.

```yml
name: Sample Evaluate Action 
on: 
  workflow_call: 
  workflow_dispatch: 

permissions: 
  id-token: write 
  contents: read 

jobs: 
  evaluate: 
    runs-on: ubuntu-latest 
    env: 
      GENAI_EVALS_CONFIG_PATH: ${{ github.workspace }}/evaluate-config.json 
      GENAI_EVALS_DATA_PATH: ${{ github.workspace }}/.github/.test_files/eval-input.jsonl 
    steps: 
      - uses: actions/checkout@v4 
      - uses: azure/login@v2 
        with: 
          client-id: ${{ secrets.OIDC_AZURE_CLIENT_ID }} 
          tenant-id: ${{ secrets.OIDC_AZURE_TENANT_ID }} 
          subscription-id: ${{ secrets.OIDC_AZURE_SUBSCRIPTION_ID }} 
      - name: Write evaluate config 
        run: | 
          cat > ${{ env.GENAI_EVALS_CONFIG_PATH }} <<EOF 
          { 
            "data": "${{ env.GENAI_EVALS_DATA_PATH }}", 
            "evaluators": { 
              "coherence": "CoherenceEvaluator", 
              "fluency": "FluencyEvaluator" 
            }, 
            "ai_model_configuration": { 
              "type": "azure_openai", 
              "azure_endpoint": "${{ secrets.AZURE_OPENAI_ENDPOINT }}", 
              "azure_deployment": "${{ secrets.AZURE_OPENAI_CHAT_DEPLOYMENT }}", 
              "api_key": "${{ secrets.AZURE_OPENAI_API_KEY }}", 
              "api_version": "${{ secrets.AZURE_OPENAI_API_VERSION }}" 
            } 
          } 
          EOF 
      - name: Run AI Evaluation 
        id: run-ai-evaluation 
        uses: microsoft/genai-evals@main 
        with: 
          evaluate-configuration: ${{ env.GENAI_EVALS_CONFIG_PATH }} 
```

### GenAI evaluations output

The evaluation process outputs results to the summary section for each AI evaluation GitHub Action run. You can view these results under **Actions** in GitHub.com.

The results include three parts:

- Test Variants: a summary of variant names and system prompts.
- Average scores: the average score of each evaluator for each variant.
- Individual test scores: detailed result for each individual test case.

Screenshot of result output including test variants, average score, and individual test in GitHub Action.

## Related content

- [How to evaluate generative AI models and applications with Microsoft Foundry](evaluate-generative-ai-app.md)
- [How to view evaluation results in Foundry portal](evaluate-results.md)
