---
title: "How to use structured outputs for chat models (classic)"
description: "Learn how to use structure outputs with chat completions with Microsoft Foundry Models (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: how-to
ms.date: 08/28/2025
ms.author: mopeakande
author: msakande
ms.reviewer: achand
reviewer: achandmsft
ms.custom: references_regions
zone_pivot_groups: azure-ai-inference-samples
---

# How to use structured outputs for chat models (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
> Azure AI Inference beta SDK retired on August 26, 2026. Switch to the generally available [OpenAI/v1 API](https://aka.ms/openai/v1) with a stable OpenAI SDK. Follow the [migration guide](../../../foundry/how-to/model-inference-to-openai-migration.md) to switch to OpenAI/v1, using the SDK for your preferred programming language.


**Applies to: programming-language-python**




[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-studio/includes/feature-preview.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/how-to/use-structured-outputs.md)

Free-form outputs of language models can be difficult to parse by software applications. Structured outputs, like JSON, provide a clear format that software applications can read and process. This article explains how to use structured outputs to generate specific JSON schemas with the chat completions API for models deployed in Microsoft Foundry Models.

The following list describes typical scenarios where structured outputs are useful:

* You need to extract specific information from a prompt and such information can be described as a schema with specific keys and types.
* You need to parse information contained in the prompts.
* You're using the model to control a workflow in your application where you can benefit from more rigid structures.
* You're using the model as a zero-shot or few-shot learner.

## Prerequisites

To use structured outputs with chat completions models in your application, you need:


- An Azure subscription.

- A Foundry project. This kind of project is managed under a Foundry resource. If you don't have a Foundry project, see [Create a project for Foundry (Foundry projects)](../../how-to/create-projects.md).

- The endpoint's URL.

- The endpoint's key (if you choose to use API key for authentication).



* A chat completions model deployment with JSON and structured outputs support. If you don't have one, read [Add and configure Foundry Models](create-model-deployments.md).

    * You can check which models support structured outputs by checking the column **Response format** in the [Models](../concepts/models-sold-directly-by-azure.md) article.

    * This article uses `gpt-4o`.


* Install the [Azure AI inference package for Python](https://aka.ms/azsdk/azure-ai-inference/python/reference) with the following command:

  ```bash
  pip install -U azure-ai-inference
  ```


* Initialize a client to consume the model:

    ```python
    import os
    import json
    from azure.ai.inference import ChatCompletionsClient
    from azure.ai.inference.models import SystemMessage, UserMessage, JsonSchemaFormat
    from azure.core.credentials import AzureKeyCredential
    
    client = ChatCompletionsClient(
        endpoint="https://<resource>.services.ai.azure.com/models",
        credential=AzureKeyCredential(os.environ["AZURE_INFERENCE_CREDENTIAL"]),
        model="gpt-4o"
    )
    ```

## How to use structured outputs

Structured outputs use JSON schemas to enforce output structure. JSON schemas describe the shape of the JSON object, including expected values, types, and which ones are required. Those JSON objects are encoded as a string within the response of the model.

### Example

To illustrate, let's try to parse the attributes of a GitHub Issue from its description.

```python
import requests

url = "https://api.github.com/repos/Azure-Samples/azure-search-openai-demo/issues/2231"
response = requests.get(url)
issue_body = response.json()["body"]
```

The output of `issue_body` is:

```output
<!--
IF SUFFICIENT INFORMATION IS NOT PROVIDED VIA THE FOLLOWING TEMPLATE THE ISSUE MIGHT BE CLOSED WITHOUT FURTHER CONSIDERATION OR INVESTIGATION
-->
> Please provide us with the following information:
> ---------------------------------------------------------------

### This issue is for a: (mark with an `x`)

- [x] bug report -> please search issues before submitting
- [ ] feature request
- [ ] documentation issue or request
- [ ] regression (a behavior that used to work and stopped in a new release)

### Minimal steps to reproduce
> Deploy the app with auth and acl´s turned on, configure the acls file, run all the scripts needed.

### Any log messages given by the failure
> None

### Expected/desired behavior
> groups field to be filled with the groups id's that have permissions to "view the file"

### OS and Version?
> win 10
...

> ---------------------------------------------------------------
> Thanks! We'll be in touch soon.
```

### Define the schema

The following JSON schema defines the schema of a GitHub issue:

__github_issue_schema.json__

```json
{
    "title": "github_issue",
    "type": "object",
    "properties": {
        "title": {
            "title": "Title",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "type": "string"
        },
        "type": {
            "enum": ["Bug", "Feature", "Documentation", "Regression"],
            "title": "Type",
            "type": "string"
        },
        "operating_system": {
            "title": "Operating System",
            "type": "string"
        }
    },
    "required": ["title", "description", "type", "operating_system"],
    "additionalProperties": false
}
```

When defining schemas, follow these recommendations:

* Use clear and expressive keys.
* Use `_` if you need to separate words to convey meaning.
* Create clear titles and descriptions for important keys in your structure.
* Evaluate multiple structures until you find the one that works best for your use case.
* Take into account limitations when indicating schemas—limitations might vary per model.

Let's load this schema:

```python
with open("github_issue_schema.json", "r") as f:
    github_issue_schema = json.load(f)
```

### Use structured outputs

We can use structured outputs with the defined schema as follows:

```python
response = client.complete(
    response_format=JsonSchemaFormat(
        name="github_issue",
        schema=github_issue_schema,
        description="Describes a GitHub issue",
        strict=True,
    ),
    messages=[
        SystemMessage("""
            Extract structured information from GitHub issues opened in our project.

                Provide
                - The title of the issue
                - A 1-2 sentence description of the project
                - The type of issue (Bug, Feature, Documentation, Regression)
                - The operating system the issue was reported on
                - Whether the issue is a duplicate of another issue
            """),
        UserMessage(issue_body),
    ],
)
```

Let's see how this works:

```python
json_response_message = json.loads(response.choices[0].message.content)
print(json.dumps(json_response_message, indent=4))
```

```output
{
    "title": "Metadata tags issue on access control lists - ADLSgen2 setup",
    "description": "Our project seems to have an issue with the metadata tag for groups when deploying the application with access control lists and necessary settings.",
    "type": "Bug",
    "operating_system": "Windows 10"
}
```

## Use Pydantic objects

Maintaining JSON schemas by hand is difficult and prone to errors. AI developers usually use [Pydantic](https://docs.pydantic.dev/) objects to describe the shapes of a given object. Pydantic is an open-source data validation library where you can flexibly define data structures for your applications.

### Define the schema

The following example shows how you can use Pydantic to define a schema for a GitHub issue.

```python
from pydantic import BaseModel
from typing import Literal

class Issue(BaseModel, extra="forbid"):
    title: str
    description: str
    type: Literal["Bug", "Feature", "Documentation", "Regression"]
    operating_system: str
```

Some things to notice:

* We represent schemas using a class that inherits from `BaseModel`.
* We set `extra="forbid"` to instruct Pydantic to _not_ accept additional properties from what we've specified.
* We use type annotations to indicate the expected types.
* `Literal` indicates we expect specific fixed values.

```python
github_issue_schema = Issue.model_json_schema()
```

### Use structured outputs

Let's see how we can use the schema in the same way:

```python
response = client.complete(
    response_format=JsonSchemaFormat(
        name="github_issue",
        schema=github_issue_schema,
        description="Describes a GitHub issue",
        strict=True,
    ),
    messages=[
        SystemMessage("""
            Extract structured information from GitHub issues opened in our project.

                Provide
                - The title of the issue
                - A 1-2 sentence description of the project
                - The type of issue (Bug, Feature, Documentation, Regression)
                - The operating system the issue was reported on
                - Whether the issue is a duplicate of another issue
            """),
        UserMessage(issue_body),
    ],
)
```

Let's see how this works:

```python
json_response_message = json.loads(response.choices[0].message.content)
print(json.dumps(json_response_message, indent=4))
```

```output
{
    "title": "Metadata tags issue on access control lists - ADLSgen2 setup",
    "description": "Our project seems to have an issue with the metadata tag for groups when deploying the application with access control lists and necessary settings.",
    "type": "Bug",
    "operating_system": "Windows 10"
}
```

### Validate

Structured outputs can still contain mistakes. If you see mistakes, try adjusting your instructions, providing examples in the system instructions, or splitting tasks into simpler subtasks.

It's a best practice to use validators to ensure you get valid structures. In Pydantic, you can verify the schema of a given object as follows:

```python
from pydantic import ValidationError

try:
    Issue.model_validate(json_response_message, strict=True)
except ValidationError as e:
    print(f"Validation error: {e}")
```

### Specifying a schema

There are some limitations that models might place in schemas definitions. Such limitations might vary per-model. **We recommend reviewing the documentation from the model provider** to verify that your schemas are valid.

The following guidelines apply to most of the models:

#### Optional fields

Some models might require all the fields to be in the `required` section of the schema. If you need to use optional fields, use unions with null types to express that a given field can be optional.

```python
from pydantic import BaseModel
from typing import Literal, Union

class Issue(BaseModel, extra="forbid"):
    title: str
    description: str
    type: Literal["Bug", "Feature", "Documentation", "Regression"]
    operating_system: Union[str, None]
```

#### Nested types

Models might support indicating nesting types. You can compose complex structures as needed:

```python
from pydantic import BaseModel
from typing import Literal

class Project(BaseModel, extra="forbid"):
    name: str
    owner: str

class Issue(BaseModel, extra="forbid"):
    title: str
    description: str
    type: Literal["Bug", "Feature", "Documentation", "Regression"]
    operating_system: str
    project: Project
```

Nested types also include recursive definition of types:

```python
from pydantic import BaseModel
from typing import Literal, List

class Issue(BaseModel, extra="forbid"):
    title: str
    description: str
    type: Literal["Bug", "Feature", "Documentation", "Regression"]
    operating_system: str
    related_issues: List[Issue]
```

Verify the level of nesting supported by the model you're working with.

## Structured outputs in images

You can use structured outputs with multi-modal models to extract information from data such as image data. 

Let's consider the following chart:

An example image showing a chart with the annual loss in thousand square kilometers of global tree cover across different climate zones.

We can define a generic schema that can be used to encode the information contained in the chart and then use it for further analysis. We use [Pydantic objects as described before](#use-pydantic-objects).

```python
from pydantic import BaseModel

class DataPoint(BaseModel):
    x: float
    y: float
    serie: str

class Graph(BaseModel):
    title: str
    description: str
    x_axis: str
    y_axis: str
    legend: list[str]
    data: list[DataPoint]
```

We can load the image as follows to pass it to the model:

```python
from azure.ai.inference.models import ImageContentItem, ImageUrl

image_graph = ImageUrl.load(
    image_file="example-graph-treecover.png",
    image_format="png"
)
```

Use structured outputs to extract the information:

```python
response = client.complete(
    response_format=JsonSchemaFormat(
        name="graph_schema",
        schema=Graph.model_json_schema(),
        description="Describes the data in the graph",
        strict=False,
    ),
    messages=[
        SystemMessage("""
                      Extract the information from the graph. Extrapolate the values of the x axe to ensure you have the correct number
                      of data points for each of the years from 2001 to 2023. Scale the values of the y axes to account for the values
                      being stacked.
                      """
        ),
        UserMessage(content=[ImageContentItem(image_url=image_graph)]),
    ],
)
```

It's always a good practice to validate the outputs and schemas:

```python
import json

json_response_message = json.loads(response.choices[0].message.content)
data = Graph.model_validate(json_response_message)
print(json.dumps(json_response_message, indent=4))
```

```output
{
    "title": "Global tree cover: annual loss",
    "description": "Annual loss in thousand square kilometers of global tree cover across different climate zones.",
    "x_axis": "Year",
    "y_axis": "Thousand square kilometers",
    "legend": [
        "Boreal",
        "Temperate",
        "Subtropical",
        "Tropical"
    ],
    "data": [
        {
            "x": 2001,
            "y": -35,
            "serie": "Boreal"
        },
        {
            "x": 2001,
            "y": -10,
            "serie": "Temperate"
        },
        {
            "x": 2001,
            "y": -55,
...
            "serie": "Tropical"
        }
    ]
}
```

We can see how much information the model was able to capture by plotting the data using `matplotlib`:

```python
import matplotlib.pyplot as plt
import pandas as pd

# Convert data to a DataFrame for easier manipulation
df = pd.DataFrame(data.model_dump()["data"])

# Pivot the data to prepare for stacked bar chart
pivot_df = df.pivot(index="x", columns="serie", values="y").fillna(0)

# Plotting
fig, ax = plt.subplots(figsize=(10, 6))

# Stacked bar chart
pivot_df.plot(kind="bar", stacked=True, ax=ax, color=["#114488", "#3CB371", "#1188AA", "#006400"])

# Chart customization
ax.set_title(data.title, fontsize=16)
ax.set_xlabel(data.x_axis, fontsize=12)
ax.set_ylabel(data.y_axis, fontsize=12)
ax.legend(title=data.legend, fontsize=10)
ax.grid(axis="y", linestyle="--", alpha=0.7)

# Show the plot
plt.tight_layout()
plt.show()
```

The resulting plot of the data contained in the structured output generated by the model.

While the information isn't perfect, we can see the model was able to capture a good amount of information from the original chart.


**Applies to: programming-language-javascript**




[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-studio/includes/feature-preview.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/how-to/use-structured-outputs.md)

Free-form outputs of language models can be difficult to parse by software applications. Structured outputs, like JSON, provide a clear format that software applications can read and process. This article explains how to use structured outputs to generate specific JSON schemas with the chat completions API for models deployed in Microsoft Foundry Models.

The following list describes typical scenarios where structured outputs are useful:

* You need to extract specific information from a prompt and such information can be described as a schema with specific keys and types.
* You need to parse information contained in the prompts.
* You're using the model to control a workflow in your application where you can benefit from more rigid structures.
* You're using the model as a zero-shot or few-shot learner.

## Prerequisites

To use structured outputs with chat completions models in your application, you need:


- An Azure subscription.

- A Foundry project. This kind of project is managed under a Foundry resource. If you don't have a Foundry project, see [Create a project for Foundry (Foundry projects)](../../how-to/create-projects.md).

- The endpoint's URL.

- The endpoint's key (if you choose to use API key for authentication).



* A chat completions model deployment with JSON and structured outputs support. If you don't have one, read [Add and configure Foundry Models](create-model-deployments.md).

    * You can check which models support structured outputs by checking the column **Response format** in the [Models](../concepts/models-sold-directly-by-azure.md) article.

    * This article uses `gpt-4o`.


* Install the [Azure Inference library for JavaScript](https://aka.ms/azsdk/azure-ai-inference/javascript/reference) with the following command:

  ```bash
  npm install @azure-rest/ai-inference
  npm install @azure/core-auth
  npm install @azure/identity
  ```

  If you are using Node.js, you can configure the dependencies in **package.json**:

  __package.json__

  ```json
  {
    "name": "main_app",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "type": "module",
    "dependencies": {
      "@azure-rest/ai-inference": "1.0.0-beta.6",
      "@azure/core-auth": "1.9.0",
      "@azure/core-sse": "2.2.0",
      "@azure/identity": "4.8.0"
    }
  }
  ```

* Import the following:

  ```javascript
  import ModelClient from "@azure-rest/ai-inference";
  import { isUnexpected } from "@azure-rest/ai-inference";
  import { createSseStream } from "@azure/core-sse";
  import { AzureKeyCredential } from "@azure/core-auth";
  import { DefaultAzureCredential } from "@azure/identity";
  ```


* Initialize a client to consume the model:

    ```javascript
    const client = ModelClient(
        "https://<resource>.services.ai.azure.com/models", 
        new AzureKeyCredential(process.env.AZURE_INFERENCE_CREDENTIAL)
    );
    ```

## How to use structured outputs

Structured outputs use JSON schemas to enforce output structure. JSON schemas describe the shape of the JSON object, including expected values, types, and which ones are required. Those JSON objects are encoded as a string within the response of the model.

### Example

To illustrate, let's try to parse the attributes of a GitHub Issue from its description.

```javascript
const url = 'https://api.github.com/repos/Azure-Samples/azure-search-openai-demo/issues/2231';

async function getIssueBody() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const issueBody = data.body;
        return issueBody;
    } catch (error) {
        console.error('Error fetching issue:', error);
    }
}

issueBody = await getIssueBody();
```

The output of `issueBody` is:

```output
<!--
IF SUFFICIENT INFORMATION IS NOT PROVIDED VIA THE FOLLOWING TEMPLATE THE ISSUE MIGHT BE CLOSED WITHOUT FURTHER CONSIDERATION OR INVESTIGATION
-->
> Please provide us with the following information:
> ---------------------------------------------------------------

### This issue is for a: (mark with an `x`)

- [x] bug report -> please search issues before submitting
- [ ] feature request
- [ ] documentation issue or request
- [ ] regression (a behavior that used to work and stopped in a new release)

### Minimal steps to reproduce
> Deploy the app with auth and acl´s turned on, configure the acls file, run all the scripts needed.

### Any log messages given by the failure
> None

### Expected/desired behavior
> groups field to be filled with the groups id's that have permissions to "view the file"

### OS and Version?
> win 10
...

> ---------------------------------------------------------------
> Thanks! We'll be in touch soon.
```

### Define the schema

The following JSON schema defines the schema of a GitHub issue:

__github_issue_schema.json__

```json
{
    "title": "github_issue",
    "type": "object",
    "properties": {
        "title": {
            "title": "Title",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "type": "string"
        },
        "type": {
            "enum": ["Bug", "Feature", "Documentation", "Regression"],
            "title": "Type",
            "type": "string"
        },
        "operating_system": {
            "title": "Operating System",
            "type": "string"
        }
    },
    "required": ["title", "description", "type", "operating_system"],
    "additionalProperties": false
}
```

When defining schemas, follow these recommendations:

* Use clear and expressive keys.
* Use `_` if you need to separate words to convey meaning.
* Create clear titles and descriptions for important keys in your structure.
* Evaluate multiple structures until you find the one that works best for your use case.
* Take into account limitations when indicating schemas—limitations might vary per model.

Let's load this schema:

```javascript
import fs from "fs";

const data = fs.readFileSync('./github_issue_schema.json', 'utf-8');
const gitHubIssueSchema = JSON.parse(data);
```

### Use structured outputs

We can use structured outputs with the defined schema as follows:

```javascript
var messages = [
    { role: "system", content: `
        Extract structured information from GitHub issues opened in our project.

            Provide
            - The title of the issue
            - A 1-2 sentence description of the project
            - The type of issue (Bug, Feature, Documentation, Regression)
            - The operating system the issue was reported on
            - Whether the issue is a duplicate of another issue`
    },
    { role: "user", content: issueBody },
];

var response = await client.path("/chat/completions").post({
    body: {
        model: "gpt-4o",
        messages: messages,
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "github_issue",
                schema: gitHubIssueSchema,
                description: "Describes a GitHub issue",
                strict: true,
            },
        }
    }
});
```

Let's see how this works:

```javascript
const rawContent = response.body.choices[0].message.content;
const jsonResponseMessage = JSON.parse(rawContent);

console.log(JSON.stringify(jsonResponseMessage, null, 4));
```

```output
{
    "title": "Metadata tags issue on access control lists - ADLSgen2 setup",
    "description": "Our project seems to have an issue with the metadata tag for groups when deploying the application with access control lists and necessary settings.",
    "type": "Bug",
    "operating_system": "Windows 10"
}
```

## Structured outputs in images

You can use structured outputs with multi-modal models to extract information from data such as image data. 

Let's consider the following chart:

An example image showing a chart with the annual loss in thousand square kilometers of global tree cover across different climate zones.

We can define a generic schema that can be used to encode the information contained in the chart and then use it for further analysis.

__graph_schema.json__

```json
{
    "$defs": {
        "DataPoint": {
            "properties": {
                "x": {
                    "title": "X",
                    "type": "number"
                },
                "y": {
                    "title": "Y",
                    "type": "number"
                },
                "serie": {
                    "title": "Serie",
                    "type": "string"
                }
            },
            "required": [
                "x",
                "y",
                "serie"
            ],
            "title": "DataPoint",
            "type": "object",
            "additionalProperties": false
        }
    },
    "title": "Graph",
    "type": "object",
    "properties": {
        "title": {
            "title": "Title",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "type": "string"
        },
        "x_axis": {
            "title": "X Axis",
            "type": "string"
        },
        "y_axis": {
            "title": "Y Axis",
            "type": "string"
        },
        "legend": {
            "items": {
                "type": "string"
            },
            "title": "Legend",
            "type": "array"
        },
        "data": {
            "items": {
                "$ref": "#/$defs/DataPoint"
            },
            "title": "Data",
            "type": "array"
        }
    },
    "required": [
        "title",
        "description",
        "x_axis",
        "y_axis",
        "legend",
        "data"
    ],
    "additionalProperties": false
}
```

Let's load this schema:

```javascript
import fs from "fs";

const data = fs.readFileSync('./graph_schema.json', 'utf-8');
const graphSchema = JSON.parse(data);
```

We can load the image as follows to pass it to the model:

```javascript
/**
 * Get the data URL of an image file.
 * @param {string} imageFile - The path to the image file.
 * @param {string} imageFormatType - The format of the image file. For example: "jpeg", "png".
 * @returns {string} The data URL of the image.
 */
function getImageDataUrl(imageFile, imageFormatType) {
    try {
        const imageBuffer = fs.readFileSync(imageFile);
        const imageBase64 = imageBuffer.toString("base64");
        return `data:image/${imageFormatType};base64,${imageBase64}`;
    } catch (error) {
        console.error(`Could not read '${imageFile}'.`);
        console.error("Set the correct path to the image file before running this sample.");
        process.exit(1);
    }
}

var imageContent = getImageDataUrl("example-graph-treecover.png", "png");
```

Use structured outputs to extract the information:

```javascript
var messages = [
    {
        role: "system",
        content: `
            Extract the information from the graph. Extrapolate the values of the x axe to ensure you have the correct number
            of data points for each of the years from 2001 to 2023. Scale the values of the y axes to account for the values
            being stacked.`
    },
    {
        role: "user",
        content: [
            {
                type: "image_url",
                image_url: {
                    url: imageContent,
                }
            }
        ]
    }
];

const response = await client.path("/chat/completions").post({
    body: {
        messages: messages,
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "graph_schema",
                schema: graphSchema,
                description: "Describes the data in the graph",
                strict: true,
            },
        },
        model: "gpt-4o",
    },
});
```

Let's inspect the output:

```javascript
var rawContent = response.body.choices[0].message.content;
var jsonResponseMessage = JSON.parse(rawContent);

console.log(JSON.stringify(jsonResponseMessage, null, 4));
```

```output
{
    "title": "Global tree cover: annual loss",
    "description": "Annual loss in thousand square kilometers of global tree cover across different climate zones.",
    "x_axis": "Year",
    "y_axis": "Thousand square kilometers",
    "legend": [
        "Boreal",
        "Temperate",
        "Subtropical",
        "Tropical"
    ],
    "data": [
        {
            "x": 2001,
            "y": -35,
            "serie": "Boreal"
        },
        {
            "x": 2001,
            "y": -10,
            "serie": "Temperate"
        },
        {
            "x": 2001,
            "y": -55,
...
            "serie": "Tropical"
        }
    ]
}
```

To see how much information the model was able to capture, we can try to plot the data:

The resulting plot of the data contained in the structured output generated by the model.

While the information isn't perfect, we can see the model was able to capture a good amount of information from the original chart.


**Applies to: programming-language-java**



> **Note:**
> This example is not available in the selected language.



**Applies to: programming-language-csharp**



> **Note:**
> This example is not available in the selected language.


**Applies to: programming-language-rest**




[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-studio/includes/feature-preview.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/how-to/use-structured-outputs.md)

Free-form outputs of language models can be difficult to parse by software applications. Structured outputs, like JSON, provide a clear format that software applications can read and process. This article explains how to use structured outputs to generate specific JSON schemas with the chat completions API for models deployed in Microsoft Foundry Models.

The following list describes typical scenarios where structured outputs are useful:

* You need to extract specific information from a prompt and such information can be described as a schema with specific keys and types.
* You need to parse information contained in the prompts.
* You're using the model to control a workflow in your application where you can benefit from more rigid structures.
* You're using the model as a zero-shot or few-shot learner.

## Prerequisites

To use structured outputs with chat completions models in your application, you need:


- An Azure subscription.

- A Foundry project. This kind of project is managed under a Foundry resource. If you don't have a Foundry project, see [Create a project for Foundry (Foundry projects)](../../how-to/create-projects.md).

- The endpoint's URL.

- The endpoint's key (if you choose to use API key for authentication).



* A chat completions model deployment with JSON and structured outputs support. If you don't have one, read [Add and configure Foundry Models](create-model-deployments.md).

    * You can check which models support structured outputs by checking the column **Response format** in the [Models](../concepts/models-sold-directly-by-azure.md) article.

    * This article uses `gpt-4o`.

## How to use structured outputs

Structured outputs use JSON schemas to enforce output structure. JSON schemas describe the shape of the JSON object, including expected values, types, and which ones are required. Those JSON objects are encoded as a string within the response of the model.

### Example

To illustrate, let's try to parse the attributes of a GitHub Issue from its description. The following [example is extracted from a GitHub issue in Azure-Samples repository](https://api.github.com/repos/Azure-Samples/azure-search-openai-demo/issues/2231).

```output
<!--
IF SUFFICIENT INFORMATION IS NOT PROVIDED VIA THE FOLLOWING TEMPLATE THE ISSUE MIGHT BE CLOSED WITHOUT FURTHER CONSIDERATION OR INVESTIGATION
-->
> Please provide us with the following information:
> ---------------------------------------------------------------

### This issue is for a: (mark with an `x`)

- [x] bug report -> please search issues before submitting
- [ ] feature request
- [ ] documentation issue or request
- [ ] regression (a behavior that used to work and stopped in a new release)

### Minimal steps to reproduce
> Deploy the app with auth and acl´s turned on, configure the acls file, run all the scripts needed.

### Any log messages given by the failure
> None

### Expected/desired behavior
> groups field to be filled with the groups id's that have permissions to "view the file"

### OS and Version?
> win 10
...

> ---------------------------------------------------------------
> Thanks! We'll be in touch soon.
```

### Define the schema

The following JSON schema defines the schema of a GitHub issue:

__github_issue_schema.json__

```json
{
    "title": "Issue",
    "type": "object",
    "properties": {
        "title": {
            "title": "Title",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "type": "string"
        },
        "type": {
            "enum": ["Bug", "Feature", "Documentation", "Regression"],
            "title": "Type",
            "type": "string"
        },
        "operating_system": {
            "title": "Operating System",
            "type": "string"
        }
    },
    "required": ["title", "description", "type", "operating_system"],
    "additionalProperties": false
}
```

### Use structured outputs

We can use structured outputs with the defined schema as follows:

__Request__

```http
POST https://<resource>.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview
Content-Type: application/json
api-key: <key>
```

__Body__

```json
{
    "messages": [
        {
            "role": "system",
            "content": "Extract structured information from GitHub issues opened in our project.\n\n                Provide\n                - The title of the issue.\n                - A 1-2 sentence description of the project.\n                - The type of issue (Bug, Feature, Documentation, Regression).\n                - The operating system the issue was reported on.\n                - Whether the issue is a duplicate of another issue."
        },
        {
            "role": "user",
            "content": "'<!--\r\nIF SUFFICIENT INFORMATION IS NOT PROVIDED VIA THE FOLLOWING TEMPLATE THE ISSUE MIGHT BE CLOSED WITHOUT FURTHER CONSIDERATION OR INVESTIGATION\r\n-->\r\n> Please provide us with the following information:\r\n> ---------------------------------------------------------------\r\n\r\n### This issue is for a: (mark with an `x`)\r\n```\r\n- [x] bug report -> please search issues before submitting\r\n- [ ] feature request\r\n- [ ] documentation issue or request\r\n- [ ] regression (a behavior that used to work and stopped in a new release)\r\n```\r\n\r\n### Minimal steps to reproduce\r\n> Deploy the app with auth and acl´s turned on, configure the acls file, run all the scripts needed.\r\n\r\n### Any log messages given by the failure\r\n> None\r\n\r\n### Expected/desired behavior\r\n> groups field to be filled the the groups id's that have permissions to \"view the file\"\r\n\r\n### OS and Version?\r\n> win 10\r\n### azd version?\r\n> azd version 1.11.0\r\n\r\n### Versions\r\n>\r\n\r\n### Mention any other details that might be useful\r\n\r\nAfter configuring the json with the perms all the scripts (`adlsgen2setup.py` and `prepdocs.ps1`) everything goes well but the groups metadata tag never gets to have any groups.\r\n\r\n![image](https://github.com/user-attachments/assets/40f1eb09-2c21-4244-98b5-adfb3fa16955)\r\n\r\n\r\n> ---------------------------------------------------------------\r\n> Thanks! We'll be in touch soon.\r\n'"
        }
    ],
    "response_format": {
        "type": "json_schema",
        "json_schema": {
            "name": "github_issue",
            "schema": {
                "type": "object",
                "properties": {
                    "title": {
                        "title": "Title",
                        "type": "string"
                    },
                    "description": {
                        "title": "Description",
                        "type": "string"
                    },
                    "type": {
                        "enum": ["Bug", "Feature", "Documentation", "Regression"],
                        "title": "Type",
                        "type": "string"
                    },
                    "operating_system": {
                        "title": "Operating System",
                        "type": "string"
                    }
                },
                "required": ["title", "description", "type", "operating_system"],
                "additionalProperties": false
            },
            "strict": true
        }
    },
    "model": "gpt-4o"
}
```

Let's see how this works:

__Response__

```json
{
    "id": "0a1234b5de6789f01gh2i345j6789klm",
    "object": "chat.completion",
    "created": 1718726686,
    "model": "gpt-4o",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "{
                    \"title\": \"Metadata tags issue on access control lists - ADLSgen2 setup\",
                    \"description\": \"Our project seems to have an issue with the metadata tag for groups when deploying the application with access control lists and necessary settings.\",
                    \"type\": \"Bug\",
                    \"operating_system\": \"Windows 10\"
                }",
                "tool_calls": null
            },
            "finish_reason": "stop",
            "logprobs": null
        }
    ],
    "usage": {
        "prompt_tokens": 150,
        "total_tokens": 246,
        "completion_tokens": 96
    }
}
```

## Structured outputs in images

You can use structured outputs with multi-modal models to extract information from data such as image data. 

Let's consider the following chart:

An example image showing a chart with the annual loss in thousand square kilometers of global tree cover across different climate zones.

We can define a generic schema that can be used to encode the information contained in the chart and then use it for further analysis.

### Define the schema

The following schema captures generic information contained in a chart:

__graph_schema.json__

```json
{
    "$defs": {
        "DataPoint": {
            "properties": {
                "x": {
                    "title": "X",
                    "type": "number"
                },
                "y": {
                    "title": "Y",
                    "type": "number"
                },
                "serie": {
                    "title": "Serie",
                    "type": "string"
                }
            },
            "required": [
                "x",
                "y",
                "serie"
            ],
            "title": "DataPoint",
            "type": "object",
            "additionalProperties": false
        }
    },
    "title": "Graph",
    "type": "object",
    "properties": {
        "title": {
            "title": "Title",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "type": "string"
        },
        "x_axis": {
            "title": "X Axis",
            "type": "string"
        },
        "y_axis": {
            "title": "Y Axis",
            "type": "string"
        },
        "legend": {
            "items": {
                "type": "string"
            },
            "title": "Legend",
            "type": "array"
        },
        "data": {
            "items": {
                "$ref": "#/$defs/DataPoint"
            },
            "title": "Data",
            "type": "array"
        }
    },
    "required": [
        "title",
        "description",
        "x_axis",
        "y_axis",
        "legend",
        "data"
    ],
    "additionalProperties": false
}
```

## Use structured outputs

We can use structured outputs with the defined schema as follows:

__Request__

```http
POST https://<resource>.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview
Content-Type: application/json
api-key: <key>
```

__Body__

```json
{
    "messages": [
        {
            "role": "system",
            "content": "Extract the information from the graph. Extrapolate the values of the x axe to ensure you have the correct number of data points for each of the years from 2001 to 2023. Scale the values of the y axes to account for the values being stacked."
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "data:image/jpg;base64,0xABCDFGHIJKLMNOPQRSTUVWXYZ..."
                    }
                }
            ]
        }
    ],
    "response_format": {
        "type": "json_schema",
        "json_schema": {
            "name": "graph_schema",
            "schema": {
                "$defs": {
                    "DataPoint": {
                        "properties": {
                            "x": {
                                "title": "X",
                                "type": "number"
                            },
                            "y": {
                                "title": "Y",
                                "type": "number"
                            },
                            "serie": {
                                "title": "Serie",
                                "type": "string"
                            }
                        },
                        "required": [
                            "x",
                            "y",
                            "serie"
                        ],
                        "title": "DataPoint",
                        "type": "object",
                        "additionalProperties": false
                    }
                },
                "title": "Graph",
                "type": "object",
                "properties": {
                    "title": {
                        "title": "Title",
                        "type": "string"
                    },
                    "description": {
                        "title": "Description",
                        "type": "string"
                    },
                    "x_axis": {
                        "title": "X Axis",
                        "type": "string"
                    },
                    "y_axis": {
                        "title": "Y Axis",
                        "type": "string"
                    },
                    "legend": {
                        "items": {
                            "type": "string"
                        },
                        "title": "Legend",
                        "type": "array"
                    },
                    "data": {
                        "items": {
                            "$ref": "#/$defs/DataPoint"
                        },
                        "title": "Data",
                        "type": "array"
                    }
                },
                "required": [
                    "title",
                    "description",
                    "x_axis",
                    "y_axis",
                    "legend",
                    "data"
                ],
                "additionalProperties": false
            },
            "strict": true
        }
    },
    "model": "gpt-4o"
}
```

Let's see how this works:

__Response__

```json
{
    "id": "0a1234b5de6789f01gh2i345j6789klm",
    "object": "chat.completion",
    "created": 1718726686,
    "model": "gpt-4o",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "{
                    \"title\": \"Global tree cover: annual loss\",
                    \"description\": \"Annual loss in thousand square kilometers of global tree cover across different climate zones.\",
                    \"x_axis\": \"Year\",
                    \"y_axis\": \"Thousand square kilometers\",
                    \"legend\": [
                        \"Boreal\",
                        \"Temperate\",
                        \"Subtropical\",
                        \"Tropical\"
                    ],
                    \"data\": [
                        {
                            \"x\": 2001,
                            \"y\": -35,
                            \"serie\": \"Boreal\"
                        },
                        {
                            \"x\": 2001,
                            \"y\": -10,
                            \"serie\": \"Temperate\"
                        },
...
                        {
                            \"x\": 2023,
                            \"y\": -195,
                            \"serie\": \"Tropical\"
                        }
                    ]
                }",
                "tool_calls": null
            },
            "finish_reason": "stop",
            "logprobs": null
        }
    ],
    "usage": {
        "prompt_tokens": 1250,
        "total_tokens": 3246,
        "completion_tokens": 1996
    }
}
```

While the information isn't perfect, we can see the model was able to capture a good amount of information from the original chart.



## Related content

* [Use embeddings models](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/how-to/use-embeddings.md)
* [Use image embeddings models](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/how-to/use-image-embeddings.md)
* [Use reasoning models](../../../foundry/foundry-models/how-to/use-chat-reasoning.md)
* [Azure AI Model Inference API](https://learn.microsoft.com/rest/api/microsoft-foundry/modelinference)
