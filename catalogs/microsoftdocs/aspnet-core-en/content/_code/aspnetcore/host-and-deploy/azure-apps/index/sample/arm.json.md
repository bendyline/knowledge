# Source code: aspnetcore/host-and-deploy/azure-apps/index/sample/arm.json

Complete source file; linked examples may select a region or line range.

```
{
    ...
    "parameters": {
        "site_name": {
            "defaultValue": "{SITE NAME}",
            "type": "String"
        },
        ...
    },       
    ...
    "resources": [
        ...
        {
            "type": "Microsoft.Web/sites/siteextensions",
            "apiVersion": "2018-11-01",
            "name": "[concat(parameters('site_name'), '/AspNetCoreRuntime.5.0.x64')]",
            "location": "[resourceGroup().location]",
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('site_name'))]"
            ]
        }
    ]
}
    

```
