---
title: Migrate a Python Application to Use Passwordless Connections
description: Learn how to migrate a Python application to use passwordless connections with Azure SQL Database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy, rotabor, mathoma
ms.date: 01/29/2026
ms.service: azure-sql-database
ms.subservice: security
ms.topic: how-to
ms.devlang: python
monikerRange: "=azuresql || =azuresql-db"
ms.custom:
  - devx-track-csharp
  - passwordless-python
  - devx-track-azurecli
  - sfi-ropc-nochange
---

# Migrate a Python application to use passwordless connections with Azure SQL Database



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

Application requests to Azure SQL Database must be authenticated. Although there are multiple options for authenticating to Azure SQL Database, you should prioritize passwordless connections in your applications when possible. Traditional authentication methods that use passwords or secret keys create security risks and complications. Visit the [passwordless connections for Azure services](https://learn.microsoft.com/azure/developer/intro/passwordless-overview) hub to learn more about the advantages of moving to passwordless connections. The following tutorial explains how to migrate an existing Python application to connect to Azure SQL Database to use passwordless connections instead of a username and password solution.

The [mssql-python](https://learn.microsoft.com/sql/connect/python/mssql-python/python-sql-driver-mssql-python) driver provides built-in support for Microsoft Entra authentication, making passwordless connections straightforward with minimal code changes.

## Configure the Azure SQL Database


Passwordless connections use Microsoft Entra authentication to connect to Azure services, including Azure SQL Database. Microsoft Entra authentication, you can manage identities in a central location to simplify permission management. Learn more about configuring Microsoft Entra authentication for your Azure SQL Database:

- [Microsoft Entra authentication overview](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview)
- [Configure Microsoft Entra auth](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-configure)

For this migration guide, ensure you have a Microsoft Entra admin assigned to your Azure SQL Database.

1) Navigate to the **Microsoft Entra** page of your logical server.

1) Select **Set admin** to open the **Microsoft Entra ID** flyout menu.

1) In the **Microsoft Entra ID** flyout menu, search for the user you want to assign as admin.

1) Select the user and choose **Select**.

    A screenshot showing how to enable Microsoft Entra admin.


## Configure your local development environment

Passwordless connections can be configured to work for both local and Azure hosted environments. In this section, you apply configurations to allow individual users to authenticate to Azure SQL Database for local development.

### Sign-in to Azure


For local development, make sure you're signed in with the same Microsoft Entra account you want to use to access Azure SQL Database. You can authenticate via popular development tools, such as the Azure CLI or Azure PowerShell. The development tools with which you can authenticate vary across languages.

### [Azure CLI](#tab/sign-in-azure-cli)

Sign in to Azure through the Azure CLI using the following command. This works on Windows, macOS, and Linux.

```azurecli
az login
```

### [Visual Studio](#tab/sign-in-visual-studio)

Select the **Sign in** button in the top right of Visual Studio.

Screenshot showing the button to sign in to Azure using Visual Studio.

Sign in using the Microsoft Entra account you assigned a role to previously.

Screenshot showing the account selection.

### [Visual Studio Code](#tab/sign-in-visual-studio-code)

For Visual Studio Code, sign in using the Azure CLI in the integrated terminal:

1. Open the terminal in VS Code (**Terminal > New Terminal**).
1. Sign in to Azure with the following command:

    ```azurecli
    az login
    ```

This method works reliably across Windows, macOS, and Linux.

### [PowerShell](#tab/sign-in-powershell)

Sign in to Azure using PowerShell via the following command:

```azurepowershell
Connect-AzAccount
```

---


### Create a database user and assign roles

Create a user in Azure SQL Database. The user should correspond to the Azure account you used to sign-in locally in the [Sign-in to Azure](#sign-in-to-azure) section.


1) In the [Azure portal](https://portal.azure.com), browse to your SQL database and select **Query editor (preview)**.

2) Select **Continue as `<your-username>`** on the right side of the screen to sign into the database using your account.

3) On the query editor view, run the following T-SQL commands:

    ```sql
    CREATE USER [user@domain] FROM EXTERNAL PROVIDER;
    ALTER ROLE db_datareader ADD MEMBER [user@domain];
    ALTER ROLE db_datawriter ADD MEMBER [user@domain];
    ALTER ROLE db_ddladmin ADD MEMBER [user@domain];
    GO
    ```

    A screenshot showing how to use the Azure Query editor.

    Running these commands assigns the [SQL DB Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#sql-db-contributor) role to the account specified. This role allows the identity to read, write, and modify the data and schema of your database. For more information about the roles assigned, see [Fixed-database roles](https://learn.microsoft.com/sql/relational-databases/security/authentication-access/database-level-roles#fixed-database-roles).


### Update the local connection configuration

Migrating to passwordless connections with [mssql-python](https://learn.microsoft.com/sql/connect/python/mssql-python/python-sql-driver-mssql-python) requires only a connection string change. The driver has built-in support for Microsoft Entra authentication modes, eliminating the need for manual token handling.

```python
from os import getenv
from dotenv import load_dotenv
from mssql_python import connect

load_dotenv()

connection_string = getenv("AZURE_SQL_CONNECTIONSTRING")

def get_all():
    with connect(connection_string) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Persons")
        # Do something with the data
    return
```

To update the referenced connection string (`AZURE_SQL_CONNECTIONSTRING`) for local development, create a `.env` file in your project folder with the passwordless connection string format using `ActiveDirectoryDefault` authentication:

```text
AZURE_SQL_CONNECTIONSTRING=Server=tcp:<database-server-name>.database.windows.net,1433;Database=<database-name>;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;Authentication=ActiveDirectoryDefault
```

`ActiveDirectoryDefault` automatically discovers credentials from multiple sources (Azure CLI, environment variables, Visual Studio, etc.) without requiring interactive login. This approach is convenient for development but adds latency because it tries each credential source in sequence.

> **Important:**
> `ActiveDirectoryDefault` is intended for local development only. It tries multiple authentication methods in sequence, which adds latency and can cause unexpected behavior in production. For production applications, use the specific authentication method for your scenario:
> - **Azure App Service/Functions**: Use `ActiveDirectoryMSI` (managed identity)
> - **Interactive user login**: Use `ActiveDirectoryInteractive`
> - **Service principal**: Use `ActiveDirectoryServicePrincipal`

### Test the app

Run your app locally and verify that the connections to Azure SQL Database are working as expected. Keep in mind that it can take several minutes for changes to Azure users and roles to propagate through your Azure environment. Your application is now configured to run locally without developers having to manage secrets in the application itself.

## Configure the Azure hosting environment

Once your app is configured to use passwordless connections locally, the same code can authenticate to Azure SQL Database after it's deployed to Azure. The sections that follow explain how to configure a deployed application to connect to Azure SQL Database using a [managed identity](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview). Managed identities provide an automatically managed identity in Microsoft Entra ID ([formerly Azure Active Directory](https://learn.microsoft.com/entra/fundamentals/new-name)) for applications to use when connecting to resources that support Microsoft Entra authentication. Learn more about managed identities:

- [Passwordless overview](https://learn.microsoft.com/azure/developer/intro/passwordless-overview)
- [Managed identity best practices](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/managed-identity-best-practice-recommendations)

### Create the managed identity


Create a user-assigned managed identity using the Azure portal or the Azure CLI. Your application uses the identity to authenticate to other services.

# [Azure portal](#tab/azure-portal-create)

1. At the top of the Azure portal, search for *Managed identities*. Select the **Managed Identities** result.
1. Select **+ Create** at the top of the **Managed Identities** overview page.
1. On the **Basics** tab, enter the following values:
    * **Subscription**: Select your desired subscription.
    * **Resource group**: Select your desired resource group.
    * **Region**: Select a region near your location.
    * **Name**: Enter a recognizable name for your identity, such as *MigrationIdentity*.
1. Select **Review + create** at the bottom of the page.
1. When the validation checks finish, select **Create**. Azure creates a new user-assigned identity.

After the resource is created, select **Go to resource** to view the details of the managed identity.

A screenshot showing how to create a managed identity using the Azure portal.
    
# [Azure CLI](#tab/azure-cli-create)

Use the [az identity create](https://learn.microsoft.com/cli/azure/identity#az-identity-create) command to create a user-assigned managed identity:

```azurecli
az identity create --name MigrationIdentity --resource-group <resource-group>
```

---


## Associate the managed identity with your web app

Configure your web app to use the user-assigned managed identity you created.

# [Azure portal](#tab/azure-portal-assign)

Complete the following steps in the Azure portal to associate the user-assigned managed identity with your app. These same steps apply to the following Azure services:

- Azure Spring Apps
- Azure Container Apps
- Azure virtual machines
- Azure Kubernetes Service

1. Navigate to the overview page of your web app.

1. Select **Identity** from the left navigation.

1. On the **Identity** page, switch to the **User assigned** tab.

1. Select **+ Add** to open the **Add user assigned managed identity** flyout.

1. Select the subscription you used previously to create the identity.

1. Search for the **MigrationIdentity** by name and select it from the search results.

1. Select **Add** to associate the identity with your app.

    Screenshot showing how to assign a managed identity.

# [Azure CLI](#tab/azure-cli-assign)


Use the following Azure CLI commands to associate an identity with your app:

Retrieve the fully qualified resource ID of the managed identity you created by using the [az identity show](https://learn.microsoft.com/cli/azure/identity#az-identity-show) command. Copy the output value to use in the next step.

```azurecli
az identity show --name MigrationIdentity -g <your-identity-resource-group-name> --query id
```

# [Azure App Service](#tab/app-service-identity)

Assign a managed identity to an Azure App Service instance by using the [az webapp identity assign](https://learn.microsoft.com/cli/azure/webapp/identity#az-webapp-identity-assign) command. The `--identities` parameter requires the fully qualified resource ID of the managed identity you retrieved in the previous step. A fully qualified resource ID starts with `/subscriptions/{subscriptionId}` or `/providers/{resourceProviderNamespace}/`.

```azurecli
az webapp identity assign \
    --resource-group <resource-group-name> \
    --name <webapp-name> \
    --identities <managed-identity-id>
```

If you're working with Git Bash, be careful of path conversions when using fully qualified resource IDs. To disable path conversion, add `MSYS_NO_PATHCONV=1` to the beginning of your command. For more information, see [Auto translation of resource IDs](https://github.com/Azure/azure-cli/blob/dev/doc/use_cli_with_git_bash.md#auto-translation-of-resource-ids).

# [Azure Spring Apps](#tab/spring-apps-identity)

Assign a managed identity to your Azure Spring Apps instance by using the [az spring app identity assign](https://learn.microsoft.com/azure/spring-apps/basic-standard/how-to-manage-user-assigned-managed-identities?tabs=azure-cli\&pivots=sc-standard) command in the Azure CLI.

```azurecli
az spring app identity assign \
    --resource-group <resource-group-name> \
    --name <app-name> \
    --service <service-name> \
    --user-assigned <managed-identity-id>
```

# [Azure Container Apps](#tab/container-apps-identity)

Assign a managed identity to a container app by using the [az containerapp identity assign](https://learn.microsoft.com/cli/azure/containerapp/identity) command.

```azurecli
az containerapp identity assign \
    --resource-group <resource-group-name> \
    --name <app-name> \
    --user-assigned <managed-identity-id>
```

# [Azure virtual machines](#tab/virtual-machines-identity)

Assign a managed identity to a virtual machine by using the [az vm identity assign](https://learn.microsoft.com/cli/azure/vm/identity) command.

```azurecli
az vm identity assign \
    --resource-group <resource-group-name> \
    --name <virtual-machine-name> \
    --identities <managed-identity-id>
```

# [Azure Kubernetes Service](#tab/aks-identity)

Assign a managed identity to an Azure Kubernetes Service (AKS) instance by using the [az aks update](https://learn.microsoft.com/cli/azure/aks) command.

```azurecli
az aks update \
    --resource-group <resource-group-name> \
    --name <cluster-name> \
    --enable-managed-identity \
    --assign-identity <managed-identity-id> \
    --assign-kubelet-identity <managed-identity-id>
```

---


---

### Create a database user for the identity and assign roles


Create a SQL database user that maps back to the user-assigned managed identity. Assign the necessary SQL roles to the user to allow your app to read, write, and modify the data and schema of your database.

1. In the Azure portal, browse to your SQL database and select **Query editor (preview)**.

1. Select **Continue as `<username>`** on the right side of the screen to sign into the database using your account.

1. On the query editor view, run the following T-SQL commands:

    ```sql
    CREATE USER [user-assigned-identity-name] FROM EXTERNAL PROVIDER;
    ALTER ROLE db_datareader ADD MEMBER [user-assigned-identity-name];
    ALTER ROLE db_datawriter ADD MEMBER [user-assigned-identity-name];
    ALTER ROLE db_ddladmin ADD MEMBER [user-assigned-identity-name];
    GO
    ```

    A screenshot showing how to use the Azure Query editor to create a SQL user for a managed identity.

    Running these commands assigns the [SQL DB Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#sql-db-contributor) role to the user-assigned managed identity. This role allows the identity to read, write, and modify the data and schema of your database.

> **Important:**
> Use caution when assigning database user roles in enterprise production environments. In those scenarios, the app shouldn't perform all operations using a single, elevated identity. Try to implement the principle of least privilege by configuring multiple identities with specific permissions for specific tasks.
>
> You can read more about configuring database roles and security on the following resources:
>
> * [Tutorial: Secure a database in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/secure-database-tutorial)
> * [Authorize database access to SQL Database](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage)


### Update the connection string

Update your Azure app configuration to use the passwordless connection string format with `ActiveDirectoryMSI` authentication for managed identity.

Connection strings can be stored as environment variables in your app hosting environment. The following instructions focus on App Service, but other Azure hosting services provide similar configurations.

```connectionstring
Server=tcp:<database-server-name>.database.windows.net,1433;Database=<database-name>;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;Authentication=ActiveDirectoryMSI
```

`<database-server-name>` is the name of your Azure SQL Database server and `<database-name>` is the name of your Azure SQL Database.

### Create an app setting for the managed identity client ID

To use the user-assigned managed identity, create an `AZURE_CLIENT_ID` environment variable and set it equal to the client ID of the managed identity. You can set this variable in the **Configuration** section of your app in the Azure portal. You can find the client ID in the **Overview** section of the managed identity resource in the Azure portal.

Save your changes and restart the application if it doesn't do so automatically.

> **Note:**
> When using a user-assigned managed identity, include the client ID in the connection string using the `User Id` parameter:
>
> ```connectionstring
> Server=tcp:<database-server-name>.database.windows.net,1433;Database=<database-name>;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;Authentication=ActiveDirectoryMSI;User Id=<managed-identity-client-id>
> ```
>
> If you omit the `User Id` parameter, the driver uses the system-assigned managed identity if one is configured.

### Test the application

Test your app to make sure everything is still working. It can take a few minutes for all of the changes to propagate through your Azure environment.

## Related content

- [mssql-python driver documentation](https://learn.microsoft.com/sql/connect/python/mssql-python/python-sql-driver-mssql-python)
- [Passwordless overview](https://learn.microsoft.com/azure/developer/intro/passwordless-overview)
- [Managed identity best practices](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/managed-identity-best-practice-recommendations)
- [Tutorial: Secure a database in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/secure-database-tutorial)
- [Authorize database access to SQL Database](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage)
