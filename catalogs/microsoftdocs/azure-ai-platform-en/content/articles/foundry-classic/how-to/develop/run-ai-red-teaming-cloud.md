---
title: "Run AI Red Teaming Agent in the cloud (Microsoft Foundry SDK) (classic)"
description: "This article provides instructions on how to use the AI Red Teaming Agent to run an automated scan in the cloud of a Generative AI application with the Microsoft Foundry SDK. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-observability
ms.custom:
  - classic-and-new
  - references_regions
ms.topic: how-to
ms.date: 02/25/2026
ms.reviewer: minthigpen
ms.author: lagayhar
author: lgayhardt
ai-usage: ai-assisted
# customer intent: As a developer, I want to run AI Red Teaming Agent scans in the cloud using the Microsoft Foundry SDK so I can perform comprehensive pre-deployment safety analysis at scale.
ROBOTS: NOINDEX, NOFOLLOW
---

# Run AI Red Teaming Agent in the cloud (preview) (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../../foundry/how-to/develop/run-ai-red-teaming-cloud.md)


> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Though the AI Red Teaming Agent (preview) can be run [locally](run-scans-ai-red-teaming-agent.md) during prototyping and development to help identify safety risks, running them in the cloud allows for pre-deployment AI red teaming runs on larger combinations of attack strategies and risk categories for a fuller analysis.

## Prerequisites


> **Note:**
> You must use a **Foundry project** for this feature. A **hub-based project** isn't supported. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have) and [Create a Foundry project](../create-projects.md?pivots="fdp-project"). To migrate your hub-based project to a Foundry project, see [Migrate from hub-based to Foundry projects](../migrate-project.md).


Optionally you can [use your own storage account](../../concepts/evaluation-regions-limits-virtual-network.md#bring-your-own-storage) to run evaluations.

## Getting started

First, install Microsoft Foundry SDK's project client, which runs the AI Red Teaming Agent in the cloud.

```bash
pip install azure-ai-projects==1.1.0b3 azure-identity
```

Then, set your environment variables for your Microsoft Foundry resources

```python
import os

endpoint = os.environ["PROJECT_ENDPOINT"] # Sample : https://<account_name>.services.ai.azure.com/api/projects/<project_name>

```

## Supported targets

Running the AI Red Teaming Agent in the cloud currently only supports Azure OpenAI model deployments in your Foundry project as a target.

## Configure your target model

You can configure your target model deployment in two ways:

### Option 1: Foundry project deployments

If you're using model deployments that are part of your Foundry project, set up the following environment variables:

```python
import os

model_endpoint = os.environ["MODEL_ENDPOINT"] # Sample : https://<account_name>.openai.azure.com
model_api_key = os.environ["MODEL_API_KEY"]
model_deployment_name = os.environ["MODEL_DEPLOYMENT_NAME"] # Sample : gpt-4o-mini
```

### Option 2: Azure OpenAI/Foundry Tools deployments

If you want to use deployments from your Azure OpenAI or Foundry Tools accounts, you first need to connect these resources to your Foundry project through connections.

1. **Create a connection**: Follow the instructions in [Configure project connections](../../foundry-models/how-to/configure-project-connection.md?pivots=ai-foundry-portal#add-a-connection) to connect your Azure OpenAI or AI Services resource to your Foundry project.

2. **Get the connection name**: After connecting the account, you'll see the connection created with a generated name in your Foundry project.

3. **Configure the target**: Use the format `"connectionName/deploymentName"` for your model deployment configuration:

```python
# Format: "connectionName/deploymentName"
model_deployment_name = "my-openai-connection/gpt-4o-mini"
```
## Create an AI red teaming run

# [Python](#tab/python)

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import (
    RedTeam,
    AzureOpenAIModelConfiguration,
    AttackStrategy,
    RiskCategory,
)

with AIProjectClient(
  endpoint=endpoint,
  credential=DefaultAzureCredential(exclude_interactive_browser_credential=False),
) as project_client:

  # Create target configuration for testing an Azure OpenAI model
  target_config = AzureOpenAIModelConfiguration(model_deployment_name=model_deployment_name)

  # Instantiate the AI Red Teaming Agent
  red_team_agent = RedTeam(
      attack_strategies=[AttackStrategy.BASE64],
      risk_categories=[RiskCategory.VIOLENCE],
      display_name="red-team-cloud-run", 
      target=target_config,
  )

  # Create and run the red teaming scan
  # If you configured target using Option 1, use:
  # headers = {"model-endpoint": model_endpoint, "api-key": model_api_key}
  # If you configured target using Option 2, use:
  # headers = {}

  # Choose one of the following based on your configuration option:
  headers = {"model-endpoint": model_endpoint, "api-key": model_api_key}  # For Option 1
  # headers = {}  # For Option 2

  red_team_response = project_client.red_teams.create(red_team=red_team_agent, headers=headers)
```

# [cURL](#tab/curl)

```bash
curl --request POST \  --url https://{{account}}.services.ai.azure.com/api/projects/{{project}}/redteams/runs:run \  --header 'content-type: application/json' \  --header 'authorization: Bearer {{ai_token}}'  --data '{  "displayName": "Red Team Scan #1",  "riskCategories": [ "Violence" ],  "attackStrategy": [ "Flip" ],  "numTurns": 1,  "target": {    "type": "AzureOpenAIModel",    "modelDeploymentName": "{{connectionName}}/{{deploymentName}}"  }}'
```

- Replace `{{account}}`, `{{project}}` with Foundry Project account name and project name.
- Replace `{{ai_token}}` with Bearer token with audience "<https://ai.azure.com>"
- For Option 1 (Foundry project deployments): Replace `"{{connectionName}}/{{deploymentName}}"` with just `"{{deploymentName}}"` (your model deployment name).
- For Option 2 (Azure OpenAI/Foundry Tools deployments): Replace `"{{connectionName}}"` with the Azure OpenAI model connection name connected to the Foundry project account, and replace `"{{deploymentName}}"` with the Azure OpenAI deployment name of the Azure OpenAI connection account.

---

## Get an AI red teaming run

# [Python](#tab/python)

```python
# Use the name returned by the create operation for the get call
get_red_team_response = project_client.red_teams.get(name=red_team_response.name)
print(f"Red Team scan status: {get_red_team_response.status}")
```

# [cURL](#tab/curl)

```bash
curl --request GET \  --header 'authorization: Bearer {{ai_token}}'  --url https://{{account}}.services.ai.azure.com/api/projects/{{project}}/redteams/runs/{{scan_id}}
```

- Replace `"{{scan_id}}"` with the ID returned by the POST API.

---

## List all AI red teaming runs

# [Python](#tab/python)

```python
for scan in project_client.red_teams.list():
  print(f"Found scan: {scan.name}, Status: {scan.status}")
```

# [cURL](#tab/curl)

```bash
curl --request GET \  --header 'authorization: Bearer {{ai_token}}'  --url https://{{account}}.services.ai.azure.com/api/projects/{{project}}/redteams/runs
```

---


## Viewing AI red teaming results in Microsoft Foundry project (preview)

After your automated scan finishes, the results also get logged to your Foundry project, which you specified in the creation of your AI red teaming agent.

### View report of each scan

In your Foundry project or hub-based project, navigate to the **Evaluation** page. Select **AI red teaming** to view the report with detailed drill-down results of each scan.

Screenshot of AI Red Teaming tab in Foundry project page.

When you select into the scan, you can view the report by risk categories, which shows the overall number of successful attacks and a breakdown of successful attacks per risk categories:

Screenshot of AI Red Teaming report view by risk category in Foundry.

Or by attack complexity classification:

Screenshot of AI Red Teaming report view by attack complexity category in Foundry.

Drilling down further into the data tab provides a row-level view of each attack-response pair. This information offers deeper insights into system issues and behaviors. For each attack-response pair, you can see more information, such as whether or not the attack was successful, what attack strategy was used, and its attack complexity. A human in the loop reviewer can provide human feedback by selecting the thumbs up or thumbs down icon.

Screenshot of AI Red Teaming data page in Foundry.

To view each conversation, select **View more** to see the full conversation for more detailed analysis of the AI system's response.

Screenshot of AI Red Teaming data page with a conversation history opened in Foundry.



## Related content

- [Example workflow for agent red teaming in the cloud](https://aka.ms/airedteamingagent-sample)
- [REST API Reference Documentation](https://learn.microsoft.com/rest/api/microsoft-foundry/)
