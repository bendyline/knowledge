# Source code: articles/healthcare-apis/azure-api-for-fhir/samples/azuredeploy.parameters.json

Complete source file; linked examples may select a region or line range.

```
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "accountName": {
            "value": "nameOfFhirAccount"
        },
        "accessPolicies": {
            "value": [
                {
                    "objectId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                },
                {
                    "objectId": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"
                }
            ]
        }
    }
}
```
