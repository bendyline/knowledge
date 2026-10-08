---
title: Route messages to MQTT topics with data flow graphs
description: Learn how to dynamically set the output MQTT topic based on message content using data flow graphs in Azure IoT Operations.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.subservice: azure-data-flows
ms.topic: how-to
ms.date: 07/24/2026
ai-usage: ai-assisted

#customer intent: As a solution developer, I want to set the output MQTT topic dynamically based on message content so that I can route messages to different destinations from a single dataflow.
---

# Route messages to different MQTT topics in data flow graphs

Some scenarios require messages to arrive on different MQTT topics depending on their content. For example, sensor readings above a critical threshold might need to go to an `alerts` topic, while normal readings go to a `historian` topic. With data flow graphs, you can set the output topic dynamically, even though the dataflow has a single destination.

Dynamic topic routing is a technique built on the [map transform](howto-dataflow-graphs-map.md): a map rule writes the target topic to message metadata, and the destination publishes to that topic. To route messages down different processing paths *within* the graph instead, see [Filter, branch, and merge data](howto-dataflow-graphs-filter-route.md).

For an overview of data flow graphs and how transforms compose in a pipeline, see [Data flow graphs overview](concept-dataflow-graphs.md).

## Prerequisites


- An instance of Azure IoT Operations deployed in a Kubernetes cluster. For more information, see [Deploy Azure IoT Operations](../deploy-iot-ops/howto-deploy-iot-operations.md).

- A default registry endpoint named `default` that points to `mcr.microsoft.com` is automatically created during deployment. The built-in transforms use this endpoint.


The Azure CLI examples in this article use environment variables so that you can set each value once and then copy and paste the commands as-is. If you're using the Azure IoT Operations Codespaces environment from the [quickstart](../get-started-end-to-end-sample/quickstart-deploy.md), these variables are already set for you and you can skip this step. Otherwise, set the following environment variables in your shell before you run the commands.

The following scripts set the most commonly used environment variables:

| Environment variable | Description |
| --- | --- |
| `SUBSCRIPTION_ID` | The ID of the subscription that contains your Azure IoT Operations instance. |
| `RESOURCE_GROUP` | The name of the resource group that contains your Azure IoT Operations instance. |
| `AIO_INSTANCE_NAME` | The name of your Azure IoT Operations instance. To list your instances, run `az iot ops list -o table`. |
| `CLUSTER_NAME` | The name of the Azure Arc-enabled Kubernetes cluster that hosts your instance. |
| `LOCATION` | The Azure region to use for new resources, for example `eastus`. |

# [Bash](#tab/bash)

```bash
SUBSCRIPTION_ID=<subscription-id>
RESOURCE_GROUP=<resource-group-name>
AIO_INSTANCE_NAME=<instance-name>
CLUSTER_NAME=<cluster-name>
LOCATION=<region>
```

# [PowerShell](#tab/powershell)

```powershell
$SUBSCRIPTION_ID = "<subscription-id>"
$RESOURCE_GROUP = "<resource-group-name>"
$AIO_INSTANCE_NAME = "<instance-name>"
$CLUSTER_NAME = "<cluster-name>"
$LOCATION = "<region>"
```

---

You only need to set the variables that this article uses. This article might use additional environment variables for resource names that you choose. The article explains how to set them where they're introduced.


## How dynamic topic routing works

A map transform can write to message metadata, including the MQTT topic, by using the `$metadata.topic` output path. The destination then uses the `${outputTopic}` variable to publish to whatever topic the transform set.

Two pieces work together:

1. **Inside the transform**: A map rule writes a string value to `$metadata.topic`.
2. **In the destination**: The `dataDestination` field references `${outputTopic}`, which resolves to the value the transform wrote.


Transforms use an expression language to compute values, test conditions, and reference fields. Expressions refer to inputs by position, not by name: the first input in the `inputs` list is `$1`, the second is `$2`, and so on. Built-in functions such as `cToF` convert and manipulate those values.

For the complete list of operators, functions, data types, and metadata fields, see the [Expressions reference](concept-dataflow-graphs-expressions.md).


This article writes to message metadata. For the metadata paths you can read and write, see [Metadata fields](concept-dataflow-graphs-expressions.md#metadata-fields).

## Option 1: Route with a single map transform and a conditional expression

The simplest approach uses one map transform with an `if` expression that picks the topic.

# [Operations experience](#tab/portal)

In the Operations experience, create a data flow graph:

1. Add a **source** that reads from `sensors/temperature`.
1. Add a **map** transform with two rules:
    - A wildcard passthrough rule (input `*`, output `*`).
    - A compute rule with input `temperature`, output `$metadata.topic`, and expression `if($1 > 1000, "alerts", "historian")`.
1. Add a **destination** with topic `factory/${outputTopic}`.

When the map transform writes `"alerts"` to `$metadata.topic`, the destination resolves `factory/${outputTopic}` to `factory/alerts`.

# [Azure CLI](#tab/cli)

The Azure CLI uses a data flow graph from a single JSON config file. Create a `graph.json` file with the graph properties. In the `graph.json` file, each transform stores its rules in the `value` field as an escaped JSON string. For the readable form of each transform's rules, see the how-to article for that transform type.

```json
{
  "mode": "Enabled",
  "nodes": [
    {
      "nodeType": "Source",
      "name": "sensors",
      "sourceSettings": {
        "endpointRef": "default",
        "dataSources": [
          "sensors/temperature"
        ]
      }
    },
    {
      "nodeType": "Graph",
      "name": "route-by-temperature",
      "graphSettings": {
        "registryEndpointRef": "default",
        "artifact": "azureiotoperations/graph-dataflow-map:1.0.0",
        "configuration": [
          {
            "key": "rules",
            "value": "{\"map\":[{\"inputs\":[\"*\"],\"output\":\"*\"},{\"description\":\"Set topic based on temperature threshold\",\"inputs\":[\"temperature\"],\"output\":\"$metadata.topic\",\"expression\":\"if($1 > 1000, \\\"alerts\\\", \\\"historian\\\")\"}]}"
          }
        ]
      }
    },
    {
      "nodeType": "Destination",
      "name": "output",
      "destinationSettings": {
        "endpointRef": "default",
        "dataDestination": "factory/${outputTopic}"
      }
    }
  ],
  "nodeConnections": [
    {
      "from": {
        "name": "sensors"
      },
      "to": {
        "name": "route-by-temperature"
      }
    },
    {
      "from": {
        "name": "route-by-temperature"
      },
      "to": {
        "name": "output"
      }
    }
  ]
}
```


> **Tip:**
> To generate the escaped string, save the rules to a file like `rules.json`, run `jq -c . rules.json`, and paste the single-line output into the `value` field.


Apply the config file.

```azurecli
az iot ops dataflowgraph apply \
  --name dynamic-topic-routing \
  --instance $AIO_INSTANCE_NAME \
  --resource-group $RESOURCE_GROUP \
  --config-file graph.json
```

# [Bicep](#tab/bicep)

```bicep
resource dataflowGraph 'Microsoft.IoTOperations/instances/dataflowProfiles/dataflowGraphs@2026-07-01' = {
  name: 'dynamic-topic-routing'
  parent: dataflowProfile
  properties: {
    profileRef: dataflowProfileName
    mode: 'Enabled'
    nodes: [
      {
        nodeType: 'Source'
        name: 'sensors'
        sourceSettings: {
          endpointRef: 'default'
          dataSources: [ 'sensors/temperature' ]
        }
      }
      {
        nodeType: 'Graph'
        name: 'route-by-temperature'
        graphSettings: {
          registryEndpointRef: 'default'
          artifact: 'azureiotoperations/graph-dataflow-map:1.0.0'
          configuration: [
            {
              key: 'rules'
              value: '{"map":[{"inputs":["*"],"output":"*"},{"description":"Set topic based on temperature threshold","inputs":["temperature"],"output":"$metadata.topic","expression":"if($1 > 1000, \\"alerts\\", \\"historian\\")"}]}'
            }
          ]
        }
      }
      {
        nodeType: 'Destination'
        name: 'output'
        destinationSettings: {
          endpointRef: 'default'
          dataDestination: 'factory/${outputTopic}'
        }
      }
    ]
    nodeConnections: [
      { from: { name: 'sensors' }, to: { name: 'route-by-temperature' } }
      { from: { name: 'route-by-temperature' }, to: { name: 'output' } }
    ]
  }
}
```

# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


```yaml
apiVersion: connectivity.iotoperations.azure.com/v1
kind: DataflowGraph
metadata:
  name: dynamic-topic-routing
  namespace: azure-iot-operations
spec:
  profileRef: default
  nodes:
    - nodeType: Source
      name: sensors
      sourceSettings:
        endpointRef: default
        dataSources:
          - sensors/temperature

    - nodeType: Graph
      name: route-by-temperature
      graphSettings:
        registryEndpointRef: default
        artifact: azureiotoperations/graph-dataflow-map:1.0.0
        configuration:
          - key: rules
            value: |
              {
                "map": [
                  {
                    "inputs": ["*"],
                    "output": "*"
                  },
                  {
                    "description": "Set topic based on temperature threshold",
                    "inputs": ["temperature"],
                    "output": "$metadata.topic",
                    "expression": "if($1 > 1000, \"alerts\", \"historian\")"
                  }
                ]
              }

    - nodeType: Destination
      name: output
      destinationSettings:
        endpointRef: default
        dataDestination: "factory/${outputTopic}"

  nodeConnections:
    - from: { name: sensors }
      to: { name: route-by-temperature }
    - from: { name: route-by-temperature }
      to: { name: output }
```

---

## Option 2: Route with a branch, per-path maps, and a merge

If you need different transformations on each path (not just a different topic), use a branch transform to split the flow, a map transform on each arm to set the topic and apply path-specific rules, and a concatenate transform to merge the paths.

# [Operations experience](#tab/portal)

In the Operations experience:

1. Add a **source** that reads from `sensors/temperature`.
1. Add a **branch** transform with condition `$1 > 1000` on the `temperature` field.
1. On the **true** path, add a **map** transform with a wildcard passthrough and a rule that sets `$metadata.topic` to `"alerts"`.
1. On the **false** path, add a **map** transform with a wildcard passthrough and a rule that sets `$metadata.topic` to `"historian"`.
1. Add a **concatenate** transform to merge both paths.
1. Add a **destination** with topic `factory/${outputTopic}`.

# [Azure CLI](#tab/cli)

The Azure CLI uses a data flow graph from a single JSON config file. Create a `graph.json` file with the graph properties. In the `graph.json` file, each transform stores its rules in the `value` field as an escaped JSON string. For the readable form of each transform's rules, see the how-to article for that transform type.

```json
{
  "mode": "Enabled",
  "nodes": [
    {
      "nodeType": "Source",
      "name": "sensors",
      "sourceSettings": {
        "endpointRef": "default",
        "dataSources": [
          "sensors/temperature"
        ]
      }
    },
    {
      "nodeType": "Graph",
      "name": "check-temperature",
      "graphSettings": {
        "registryEndpointRef": "default",
        "artifact": "azureiotoperations/graph-dataflow-branch:1.0.0",
        "configuration": [
          {
            "key": "rules",
            "value": "{\"branch\":{\"inputs\":[\"temperature\"],\"expression\":\"$1 > 1000\",\"description\":\"Route critical temperatures to alerts\"}}"
          }
        ]
      }
    },
    {
      "nodeType": "Graph",
      "name": "set-alerts-topic",
      "graphSettings": {
        "registryEndpointRef": "default",
        "artifact": "azureiotoperations/graph-dataflow-map:1.0.0",
        "configuration": [
          {
            "key": "rules",
            "value": "{\"map\":[{\"inputs\":[\"*\"],\"output\":\"*\"},{\"inputs\":[],\"output\":\"$metadata.topic\",\"expression\":\"\\\"alerts\\\"\"}]}"
          }
        ]
      }
    },
    {
      "nodeType": "Graph",
      "name": "set-historian-topic",
      "graphSettings": {
        "registryEndpointRef": "default",
        "artifact": "azureiotoperations/graph-dataflow-map:1.0.0",
        "configuration": [
          {
            "key": "rules",
            "value": "{\"map\":[{\"inputs\":[\"*\"],\"output\":\"*\"},{\"inputs\":[],\"output\":\"$metadata.topic\",\"expression\":\"\\\"historian\\\"\"}]}"
          }
        ]
      }
    },
    {
      "nodeType": "Graph",
      "name": "merge",
      "graphSettings": {
        "registryEndpointRef": "default",
        "artifact": "azureiotoperations/graph-dataflow-concatenate:1.0.0"
      }
    },
    {
      "nodeType": "Destination",
      "name": "output",
      "destinationSettings": {
        "endpointRef": "default",
        "dataDestination": "factory/${outputTopic}"
      }
    }
  ],
  "nodeConnections": [
    {
      "from": {
        "name": "sensors"
      },
      "to": {
        "name": "check-temperature"
      }
    },
    {
      "from": {
        "name": "check-temperature.output.true"
      },
      "to": {
        "name": "set-alerts-topic"
      }
    },
    {
      "from": {
        "name": "check-temperature.output.false"
      },
      "to": {
        "name": "set-historian-topic"
      }
    },
    {
      "from": {
        "name": "set-alerts-topic"
      },
      "to": {
        "name": "merge"
      }
    },
    {
      "from": {
        "name": "set-historian-topic"
      },
      "to": {
        "name": "merge"
      }
    },
    {
      "from": {
        "name": "merge"
      },
      "to": {
        "name": "output"
      }
    }
  ]
}
```

Apply the config file.

```azurecli
az iot ops dataflowgraph apply \
  --name dynamic-topic-routing-branched \
  --instance $AIO_INSTANCE_NAME \
  --resource-group $RESOURCE_GROUP \
  --config-file graph.json
```

# [Bicep](#tab/bicep)

```bicep
resource dataflowGraph 'Microsoft.IoTOperations/instances/dataflowProfiles/dataflowGraphs@2026-07-01' = {
  name: 'dynamic-topic-routing-branched'
  parent: dataflowProfile
  properties: {
    profileRef: dataflowProfileName
    mode: 'Enabled'
    nodes: [
      {
        nodeType: 'Source'
        name: 'sensors'
        sourceSettings: {
          endpointRef: 'default'
          dataSources: [ 'sensors/temperature' ]
        }
      }
      {
        nodeType: 'Graph'
        name: 'check-temperature'
        graphSettings: {
          registryEndpointRef: 'default'
          artifact: 'azureiotoperations/graph-dataflow-branch:1.0.0'
          configuration: [
            {
              key: 'rules'
              value: '{"branch":{"inputs":["temperature"],"expression":"$1 > 1000","description":"Route critical temperatures to alerts"}}'
            }
          ]
        }
      }
      {
        nodeType: 'Graph'
        name: 'set-alerts-topic'
        graphSettings: {
          registryEndpointRef: 'default'
          artifact: 'azureiotoperations/graph-dataflow-map:1.0.0'
          configuration: [
            {
              key: 'rules'
              value: '{"map":[{"inputs":["*"],"output":"*"},{"inputs":[],"output":"$metadata.topic","expression":"\\"alerts\\""}]}'
            }
          ]
        }
      }
      {
        nodeType: 'Graph'
        name: 'set-historian-topic'
        graphSettings: {
          registryEndpointRef: 'default'
          artifact: 'azureiotoperations/graph-dataflow-map:1.0.0'
          configuration: [
            {
              key: 'rules'
              value: '{"map":[{"inputs":["*"],"output":"*"},{"inputs":[],"output":"$metadata.topic","expression":"\\"historian\\""}]}'
            }
          ]
        }
      }
      {
        nodeType: 'Graph'
        name: 'merge'
        graphSettings: {
          registryEndpointRef: 'default'
          artifact: 'azureiotoperations/graph-dataflow-concatenate:1.0.0'
        }
      }
      {
        nodeType: 'Destination'
        name: 'output'
        destinationSettings: {
          endpointRef: 'default'
          dataDestination: 'factory/${outputTopic}'
        }
      }
    ]
    nodeConnections: [
      { from: { name: 'sensors' }, to: { name: 'check-temperature' } }
      { from: { name: 'check-temperature.output.true' }, to: { name: 'set-alerts-topic' } }
      { from: { name: 'check-temperature.output.false' }, to: { name: 'set-historian-topic' } }
      { from: { name: 'set-alerts-topic' }, to: { name: 'merge' } }
      { from: { name: 'set-historian-topic' }, to: { name: 'merge' } }
      { from: { name: 'merge' }, to: { name: 'output' } }
    ]
  }
}
```

# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


```yaml
apiVersion: connectivity.iotoperations.azure.com/v1
kind: DataflowGraph
metadata:
  name: dynamic-topic-routing-branched
  namespace: azure-iot-operations
spec:
  profileRef: default
  nodes:
    - nodeType: Source
      name: sensors
      sourceSettings:
        endpointRef: default
        dataSources:
          - sensors/temperature

    - nodeType: Graph
      name: check-temperature
      graphSettings:
        registryEndpointRef: default
        artifact: azureiotoperations/graph-dataflow-branch:1.0.0
        configuration:
          - key: rules
            value: |
              {
                "branch": {
                  "inputs": ["temperature"],
                  "expression": "$1 > 1000",
                  "description": "Route critical temperatures to alerts"
                }
              }

    - nodeType: Graph
      name: set-alerts-topic
      graphSettings:
        registryEndpointRef: default
        artifact: azureiotoperations/graph-dataflow-map:1.0.0
        configuration:
          - key: rules
            value: |
              {
                "map": [
                  { "inputs": ["*"], "output": "*" },
                  { "inputs": [], "output": "$metadata.topic", "expression": "\"alerts\"" }
                ]
              }

    - nodeType: Graph
      name: set-historian-topic
      graphSettings:
        registryEndpointRef: default
        artifact: azureiotoperations/graph-dataflow-map:1.0.0
        configuration:
          - key: rules
            value: |
              {
                "map": [
                  { "inputs": ["*"], "output": "*" },
                  { "inputs": [], "output": "$metadata.topic", "expression": "\"historian\"" }
                ]
              }

    - nodeType: Graph
      name: merge
      graphSettings:
        registryEndpointRef: default
        artifact: azureiotoperations/graph-dataflow-concatenate:1.0.0

    - nodeType: Destination
      name: output
      destinationSettings:
        endpointRef: default
        dataDestination: "factory/${outputTopic}"

  nodeConnections:
    - from: { name: sensors }
      to: { name: check-temperature }
    - from: { name: check-temperature.output.true }
      to: { name: set-alerts-topic }
    - from: { name: check-temperature.output.false }
      to: { name: set-historian-topic }
    - from: { name: set-alerts-topic }
      to: { name: merge }
    - from: { name: set-historian-topic }
      to: { name: merge }
    - from: { name: merge }
      to: { name: output }
```

---

## Choose between a single map transform and a branch

| Consideration | Option 1 (single map) | Option 2 (branch + maps) |
| --- | --- | --- |
| Simplicity | Fewer nodes, simpler to read | More nodes, more explicit |
| Topic-only routing | Ideal | Works, but more setup than needed |
| Different transforms per path | Possible with nested `if()`, gets complex | Natural: each branch has its own map rules |
| Adding more paths | Chain `if()` calls | Requires nested branches |

For straightforward topic routing based on a single condition, option 1 is simpler. Use option 2 when each path needs different processing beyond the topic name.

## How the outputTopic variable resolves the destination topic

The `${outputTopic}` variable in `dataDestination` resolves to the full value of `$metadata.topic` as set by the last transform in the pipeline. You can also use segments with `${outputTopic.N}` (1-indexed). For example, if the transform sets `$metadata.topic` to `"region/west"`:

| `dataDestination` | Resolved topic |
| --- | --- |
| `factory/${outputTopic}` | `factory/region/west` |
| `factory/${outputTopic.1}` | `factory/region` |
| `factory/${outputTopic.2}` | `factory/west` |

If the data flow can't resolve the topic variable (for example, `$metadata.topic` was never set), it drops the message and logs an error.

## Related content

- [Throttle data](howto-dataflow-graphs-throttle.md)

<!-- - [Transform data with map](howto-dataflow-graphs-map.md)
- [Filter and route data](howto-dataflow-graphs-filter-route.md)
- [Expressions reference](concept-dataflow-graphs-expressions.md)
- [Data flow graphs overview](concept-dataflow-graphs.md) -->
