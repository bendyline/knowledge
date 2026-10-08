---
title: Tutorial - .NET Web app accesses Microsoft Graph as the app| Azure
description: In this tutorial, you learn how to access data in Microsoft Graph from a .NET web app by using managed identities.
author: cephalin
ms.author: cephalin
ms.service: azure-app-service
ms.topic: tutorial
ms.date: 03/13/2026
ms.devlang: csharp
ms.custom: azureday1, devx-track-dotnet, AppServiceIdentity
#Customer intent: As an application developer, I want to learn how to access data in Microsoft Graph by using managed identities.
---

# Tutorial: Access Microsoft Graph from a secured .NET app as the app


Learn how to access Microsoft Graph from a web app running on Azure App Service.

Diagram that shows accessing Microsoft Graph.

You want to call Microsoft Graph for the web app. A safe way to give your web app access to data is to use a [system-assigned managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview). A managed identity from Microsoft Entra ID allows App Service to access resources through role-based access control (RBAC), without requiring app credentials. After you assign a managed identity to your web app, Azure takes care of the creation and distribution of a certificate. You don't have to worry about managing secrets or app credentials.

In this tutorial, you learn how to:

> 
>
> - Create a system-assigned managed identity on a web app.
> - Add Microsoft Graph API permissions to a managed identity.
> - Call Microsoft Graph from a web app by using managed identities.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scenario-secure-app-access-microsoft-graph-as-app.md)

## Prerequisites

- A web application running on Azure App Service that has the [App Service authentication/authorization module enabled](scenario-secure-app-authentication-app-service.md).

## Enable managed identity on app

If you create and publish your web app through Visual Studio, the managed identity was enabled on your app for you. 

1. In your app service, select **Identity** in the left pane and then select **System assigned**. 
1. Verify that **Status** is set to **On**.

   If not, set it to **On**, then select **Save**, and then select **Yes** to enable the system-assigned managed identity. When the managed identity is enabled, the status is set to **On** and the object ID is available.

1. Take note of the **Object ID** value, which you need in the next section.

   Screenshot that shows the system-assigned identity.

## Grant access to Microsoft Graph

When accessing the Microsoft Graph, the managed identity needs to have proper permissions for the operation it wants to perform. Currently, there's no option to assign such permissions through the Microsoft Entra admin center. 

1. Run the following script to add the requested Microsoft Graph API permissions to the managed identity service principal object.

    # [PowerShell](#tab/azure-powershell)
    
    ```powershell
    # Install the module.
    # Install-Module Microsoft.Graph -Scope CurrentUser
    
    # The tenant ID
    $TenantId = "aaaabbbb-0000-cccc-1111-dddd2222eeee"
    
    # The name of your web app, which has a managed identity.
    $webAppName = "SecureWebApp-20201106120003" 
    $resourceGroupName = "SecureWebApp-20201106120003ResourceGroup"
    
    # The name of the app role that the managed identity should be assigned to.
    $appRoleName = "User.Read.All"
    
    # Get the web app's managed identity's object ID.
    Connect-AzAccount -Tenant $TenantId
    $managedIdentityObjectId = (Get-AzWebApp -ResourceGroupName $resourceGroupName -Name $webAppName).identity.principalid
    
    Connect-MgGraph -TenantId $TenantId -Scopes 'Application.Read.All','AppRoleAssignment.ReadWrite.All'
    
    # Get Microsoft Graph app's service principal and app role.
    $serverApplicationName = "Microsoft Graph"
    $serverServicePrincipal = (Get-MgServicePrincipal -Filter "DisplayName eq '$serverApplicationName'")
    $serverServicePrincipalObjectId = $serverServicePrincipal.Id
    
    $appRoleId = ($serverServicePrincipal.AppRoles | Where-Object {$_.Value -eq $appRoleName }).Id
    
    # Assign the managed identity access to the app role.
    New-MgServicePrincipalAppRoleAssignment `
        -ServicePrincipalId $managedIdentityObjectId `
        -PrincipalId $managedIdentityObjectId `
        -ResourceId $serverServicePrincipalObjectId `
        -AppRoleId $appRoleId
    ```

    # [Azure CLI](#tab/azure-cli)
    
    ```azurecli-interactive
    az login
    
    webAppName="SecureWebApp-20201106120003"
    
    spId=$(az resource list -n $webAppName --query [*].identity.principalId --out tsv)
    
    graphResourceId=$(az ad sp list --display-name "Microsoft Graph" --query [0].id --out tsv)
    
    appRoleId=$(az ad sp list --display-name "Microsoft Graph" --query "[0].appRoles[?value=='User.Read.All' && contains(allowedMemberTypes, 'Application')].id" --output tsv)
    
    uri=https://graph.microsoft.com/v1.0/servicePrincipals/$spId/appRoleAssignments
    
    body="{'principalId':'$spId','resourceId':'$graphResourceId','appRoleId':'$appRoleId'}"
    
    az rest --method post --uri $uri --body $body --headers "Content-Type=application/json"
    ```

    ---

1. After you run the script, verify in the [Microsoft Entra admin center](https://entra.microsoft.com) that the requested API permissions are assigned to the managed identity.

1. Go to **Applications**. This pane displays all the service principals in your tenant. Select **Add filters** and then enter *Application type==Managed identities*.
1. Select the service principal for the managed identity.

    If you're following this tutorial, there are two service principals with the same display name, secureWebApp, for example. The service principal that has a **Homepage URL** represents the web app in your tenant. The service principal that appears in **Managed Identities** should *not* have a **Homepage URL** listed and the **Object ID** should match the object ID value of the managed identity in the [previous section](#enable-managed-identity-on-app).

1. Select the service principal for the managed identity.

    Screenshot that shows the All applications option.

1. In **Overview**, select **Permissions**. You see the added permissions for Microsoft Graph.

    Screenshot that shows the Permissions pane.


## Call Microsoft Graph

The [ChainedTokenCredential](https://learn.microsoft.com/dotnet/api/azure.identity.chainedtokencredential), [ManagedIdentityCredential](https://learn.microsoft.com/dotnet/api/azure.identity.managedidentitycredential), and [EnvironmentCredential](https://learn.microsoft.com/dotnet/api/azure.identity.environmentcredential) classes are used to get a token credential for your code to authorize requests to Microsoft Graph. Create an instance of the [ChainedTokenCredential](https://learn.microsoft.com/dotnet/api/azure.identity.chainedtokencredential) class, which uses the managed identity in the App Service environment or the development environment variables to fetch tokens and attach them to the service client. The following code example gets the authenticated token credential and uses it to create a service client object, which gets the users in the group.

To see this code as part of a sample application, see the:
* [Sample on GitHub](https://github.com/Azure-Samples/ms-identity-easyauth-dotnet-storage-graphapi/tree/main/3-WebApp-graphapi-managed-identity).

### Install the Microsoft.Identity.Web.MicrosoftGraph client library package

Install the [Microsoft.Identity.Web.MicrosoftGraph NuGet package](https://www.nuget.org/packages/Microsoft.Identity.Web.MicrosoftGraph) in your project by using the .NET Core command-line interface or the Package Manager Console in Visual Studio.

#### .NET Core command-line

Open a command line, and switch to the directory that contains your project file.

Run the install commands.

```dotnetcli
dotnet add package Microsoft.Identity.Web.MicrosoftGraph
dotnet add package Microsoft.Graph
```

#### Package Manager Console

Open the project/solution in Visual Studio, and open the console by using the **Tools** > **NuGet Package Manager** > **Package Manager Console** command.

Run the install commands.
```powershell
Install-Package Microsoft.Identity.Web.MicrosoftGraph
Install-Package Microsoft.Graph
```

### .NET Example

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Azure.Identity;

...

public IList<MSGraphUser> Users { get; set; }

public async Task OnGetAsync()
{
    // Create the Graph service client with a ChainedTokenCredential which gets an access
    // token using the available Managed Identity or environment variables if running
    // in development.
    var credential = new ChainedTokenCredential(
        new ManagedIdentityCredential(),
        new EnvironmentCredential());

    string[] scopes = new[] { "https://graph.microsoft.com/.default" };

    var graphServiceClient = new GraphServiceClient(
        credential, scopes);

    List<MSGraphUser> msGraphUsers = new List<MSGraphUser>();
    try
    {
        //var users = await graphServiceClient.Users.Request().GetAsync();
        var users = await graphServiceClient.Users.GetAsync();
        foreach (var u in users.Value)
        {
            MSGraphUser user = new MSGraphUser();
            user.userPrincipalName = u.UserPrincipalName;
            user.displayName = u.DisplayName;
            user.mail = u.Mail;
            user.jobTitle = u.JobTitle;

            msGraphUsers.Add(user);
        }
    }
    catch (Exception ex)
    {
        string msg = ex.Message;
    }

    Users = msGraphUsers;
}
```


## Clean up resources

If you finish this tutorial and no longer need the web app or associated resources, clean up the resources you created.

### Delete the resource group

1. In the [Azure portal](https://portal.azure.com), select **Resource groups** from the Azure portal menu and select the resource group that contains your app service and app service plan.

1. Select **Delete resource group** to delete the resource group and all the resources.

   Screenshot that shows deleting the resource group.

1. Enter the name of the resource group to confirm. 

This process might take several minutes to run.



## Related content

In this tutorial, you learned how to:

> 
>
> - Create a system-assigned managed identity on a web app.
> - Add Microsoft Graph API permissions to a managed identity.
> - Call Microsoft Graph from a web app by using managed identities.

Learn how to connect a [.NET Core app](tutorial-dotnetcore-sqldb-app.md) or [Node.js app](tutorial-nodejs-mongodb-app.md) to a database.
