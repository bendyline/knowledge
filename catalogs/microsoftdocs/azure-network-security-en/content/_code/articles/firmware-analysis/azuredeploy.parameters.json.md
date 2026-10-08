# Source code: articles/firmware-analysis/azuredeploy.parameters.json

Complete source file; linked examples may select a region or line range.

```
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "workspaceName": {
      "value": "fa-workspace-demo"
    },
    "location": {
      "value": "eastus"
    },
    "tags": {
      "value": {
        "project": "firmware-analysis",
        "env": "dev"
      }
    }
  }
}
```
