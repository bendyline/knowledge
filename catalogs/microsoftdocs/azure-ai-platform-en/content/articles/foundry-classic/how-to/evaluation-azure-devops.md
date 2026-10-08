---
title: "How to run an evaluation in Azure DevOps (classic)"
description: "How to run evaluation in Azure DevOps, which enables offline evaluation of AI models within your CI/CD pipelines in Azure DevOps. (classic)" 
ms.service: microsoft-foundry
ms.subservice: foundry-observability
ms.topic: how-to
ms.date: 01/16/2026
ms.reviewer: hanch
ms.author: lagayhar
author: lgayhardt
ai-usage: ai-assisted
ms.custom:
  - classic-and-new
ROBOTS: NOINDEX, NOFOLLOW
---

# How to run an evaluation in Azure DevOps (preview) (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/how-to/evaluation-azure-devops.md)


> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Similar to the [Azure AI evaluation in GitHub Actions](evaluation-github-action.md), an Azure DevOps extension is also available in the Azure DevOps Marketplace. By using this extension, you can evaluate AI agents offline within your CI/CD pipelines.


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



## Prerequisites

- Foundry project or Hubs based project. To learn more, see [Create a project](create-projects.md).
- Install Azure AI evaluation extension.
  - Go to [Azure DevOps Marketplace](https://marketplace.visualstudio.com/azuredevops).
  - Search for Azure AI evaluation and install the extension into your Azure DevOps organization.
  

## Set up YAML configuration file

1. Create a new YAML file in your repository.
     You can use the sample YAML provided in the README or copy from the [GitHub repo](https://github.com/microsoft/ai-agent-evals?tab=readme-ov-file).
2.  Configure the following inputs:
    - Set up [Azure CLI](https://learn.microsoft.com/azure/devops/pipelines/tasks/reference/azure-cli-v2) with [service connection](https://learn.microsoft.com/azure/devops/pipelines/library/service-endpoints?view=azure-devops\&preserve-view=true) and Azure Login.
    - Foundry project connection string
    - Dataset and evaluators
      - Specify the evaluator names you want to use for this evaluation run.
      - Queries (required).
    - Agent IDs  Retrieve agent identifiers from Foundry.

  See the following sample dataset:

  ```JSON
  { 
    "name": "MyTestData", 
    "evaluators": [ 
      "FluencyEvaluator", 
      "ViolenceEvaluator" 
    ], 
    "data": [ 
  
      { 
        "query": "Tell me about Tokyo?", 
      }, 
      { 
        "query": "Where is Italy?", 
      } 
    ] 
  } 
  ```

A sample YAML file:

# [Foundry project](#tab/foundry-project)

```yaml

trigger: 
- main 
pool: 

  vmImage: 'windows-latest'  

steps: 

- task: AzureCLI@2 
  inputs: 
    addSpnToEnvironment: true 
    azureSubscription: ${{vars.Service_Connection_Name}}
    scriptType: bash 
    scriptLocation: inlineScript     

    inlineScript: | 
      echo "##vso[task.setvariable variable=ARM_CLIENT_ID]$servicePrincipalId"  
      echo "##vso[task.setvariable variable=ARM_ID_TOEKN]$idToken" 
      echo "##vso[task.setvariable variable=ARM_TENANT_ID]$tenantId" 

- bash: | 

   az login --service-principal -u $(ARM_CLIENT_ID) --tenant $(ARM_TENANT_ID) --allow-no-subscriptions --federated-token $(ARM_ID_TOEKN) 

  displayName: 'Login Azure' 
 
- task: UsePythonVersion@0 
  inputs: 
    versionSpec: '3.11' 
- task: AIAgentEvaluation@0 
  inputs: 
    azure-ai-project-endpoint: "<your-ai-project-endpoint>"
    deployment-name: "gpt-4o-mini" 
    data-path: $(Build.SourcesDirectory)\tests\data\golden-dataset-medium.json 
agent-ids: "<your-ai-agent-ids> 

```

# [Hub-based project](#tab/hub-project)

```yaml

trigger: 
- main 
pool: 

  vmImage: 'windows-latest'  

steps: 

- task: AzureCLI@2 
  inputs: 
    addSpnToEnvironment: true 
    azureSubscription: ${{vars.Service_Connection_Name}}
    scriptType: bash 
    scriptLocation: inlineScript     

    inlineScript: | 
      echo "##vso[task.setvariable variable=ARM_CLIENT_ID]$servicePrincipalId"  
      echo "##vso[task.setvariable variable=ARM_ID_TOEKN]$idToken" 
      echo "##vso[task.setvariable variable=ARM_TENANT_ID]$tenantId" 

- bash: | 

   az login --service-principal -u $(ARM_CLIENT_ID) --tenant $(ARM_TENANT_ID) --allow-no-subscriptions --federated-token $(ARM_ID_TOEKN) 

  displayName: 'Login Azure' 
 
- task: UsePythonVersion@0 
  inputs: 
    versionSpec: '3.11' 
- task: AIAgentEvaluation@0 
  inputs: 
    azure-aiproject-connection-string: 'azure-ai-project-connection-string-sample' 
    deployment-name: "gpt-4o-mini" 
    data-path: $(Build.SourcesDirectory)\tests\data\golden-dataset-medium.json 
agent-ids: "<your-ai-agent-ids> 

```

---

## Set up a new pipeline and trigger an evaluation run

Commit and run the pipeline in Azure DevOps.

## View results

- Select the run and go to the **Azure AI Evaluation** tab.
- The results are shown in this format:
  - The top section summarizes the overview of two AI agent variants. You can select it on the agent ID link, and it directs you to the agent setting page in Microsoft Foundry portal. You can also select the link for **Evaluation Results**, and it directs you to Foundry portal to view individual result in detail.
  - The second section includes evaluation scores and comparison between different variants on statistical significance (for multiple agents) and confidence intervals (for single agent).

Evaluation results and comparisons from multiple AI agents:
Screenshot of multi agent evaluation result in Azure DevOps.

Single agent evaluation result:
Screenshot of single agent evaluation result in Azure DevOps.

## Related content

- [How to evaluate generative AI models and applications with Foundry](evaluate-generative-ai-app.md)
- [How to view evaluation results in Foundry portal](evaluate-results.md)
