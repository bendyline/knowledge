---
title: Connect to and query using Node.js and mssql npm package
description: Learn how to connect to a database in Azure SQL Database and query data using Node.js and mssql npm package.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: diberry, mathoma
ms.date: 03/04/2025
ms.service: azure-sql-database
ms.subservice: security
ms.topic: quickstart
monikerRange: "= azuresql || = azuresql-db"
ms.custom:
  - passwordless-js
  - sfi-ropc-nochange
---

# Connect to and query Azure SQL Database using Node.js and mssql npm package


  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This quickstart describes how to connect an application to a database in Azure SQL Database and perform queries using Node.js and mssql. This quickstart follows the recommended passwordless approach to connect to the database. 

## Passwordless connections for developers

Passwordless connections offer a more secure mechanism for accessing Azure resources. The following high-level steps are used to connect to Azure SQL Database using passwordless connections in this article:

* Prepare your environment for password-free authentication.
    * For a local environment: Your personal identity is used. This identity can be pulled from an IDE, CLI, or other local development tools.
    * For a cloud environment: A [managed identity](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity) is used.
* Authenticate in the environment using the `DefaultAzureCredential` from the Azure Identity library to obtain a verified credential.
* Use the verified credential to create Azure SDK client objects for resource access.

You can learn more about passwordless connections on the [passwordless hub](https://learn.microsoft.com/azure/developer/intro/passwordless-overview).

## Prerequisites

* An [Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* A database in Azure SQL Database configured for authentication with Microsoft Entra ID ([formerly Azure Active Directory](https://learn.microsoft.com/entra/fundamentals/new-name)). You can create one using the [Create database quickstart](single-database-create-quickstart.md).
* Bash-enabled shell
* [Node.js LTS](https://nodejs.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Visual Studio Code App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)
* The latest version of the [Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli)

## Configure the database server


Secure, passwordless connections to Azure SQL Database require certain database configurations. Verify the following settings on your [logical server in Azure](logical-servers.md) to properly connect to Azure SQL Database in both local and hosted environments:

1. For local development connections, make sure your Azure SQL logical server is configured to allow your local machine IP address and other Azure services to connect:

    1. In the Azure portal, in the resource menu, under **Security**, select **Networking**.
    1. Select the **Selected networks** button to show additional configuration options.
    1. Select **Add your client IPv4 address(xx.xx.xx.xx)** to add a firewall rule that will enable connections from your local machine IPv4 address. Alternatively, you can also select **+ Add a firewall rule** to enter a specific IP address of your choice.
    1. Make sure the **Allow Azure services and resources to access this server** checkbox is selected.

        Screenshot from the Azure portal showing how to configure the Azure SQL logical server firewall rules.

        > **Warning:**
        > Enabling the **Allow Azure services and resources to access this server** setting is not a recommended security practice for production scenarios. Real applications should implement more secure approaches, such as stronger firewall restrictions or virtual network configurations.
        >
        > You can read more about database security configurations on the following resources:
        >
        > - [Configure Azure SQL Database firewall rules](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure).
        > - [Configure a virtual network with private endpoints](https://learn.microsoft.com/azure/private-link/tutorial-private-endpoint-sql-portal).

1. The server must also have Microsoft Entra authentication enabled and have a Microsoft Entra admin account assigned. For local development connections, the Microsoft Entra admin account should be an account you can also log into Visual Studio or the Azure CLI with locally. You can verify whether your server has Microsoft Entra authentication enabled on the **Microsoft Entra ID** page of your logical server.

    A screenshot showing how to enable Microsoft Entra authentication.

1. If you're using a personal Azure account, make sure you have [Microsoft Entra setup and configured for Azure SQL Database](authentication-aad-configure.md) in order to assign your account as a server admin. If you're using a corporate account, Microsoft Entra ID will most likely already be configured for you.

## Create the project

The steps in this section create a Node.js REST API.

1. Create a new directory for the project and navigate into it. 
1. Initialize the project by running the following command in the terminal:

    ```bash
    npm init -y
    ```

1. Install the required packages used in the sample code in this article:

    ```bash
    npm install mssql express swagger-ui-express yamljs dotenv
    ```

1. Open the project in Visual Studio Code.

    ```bash
    code .
    ```

1. Open the `package.json` file and add the following property and value after the _name_ property to configure the project for ESM modules. 

    ```json
    "type": "module",
    ```

## Create Express.js application code

To create the Express.js OpenAPI application, you'll create several files:

| File | Description |
| --- | --- |
| `.env.development` | Local development-only environment file. |
| `index.js` | Main application file, which starts the Express.js app on port 3000. |
| `person.js` | Express.js **/person** route API file to handle CRUD operations. |
| `openapi.js` | Express.js **/api-docs** route for OpenAPI explorer UI. Root redirects to this route. |
| `openApiSchema.yml` | OpenAPI 3.0 schema file defining Person API. |
| `config.js` | Configuration file to read environment variables and construct appropriate mssql connection object. |
| `database.js` | Database class to handle Azure SQL CRUD operations using the **mssql** npm package. |
| `./vscode/settings.json` | Ignore files by glob pattern during deployment. |

1. Create an `index.js` file and add the following code:

    [Code reference unavailable in this source snapshot: ~/../azure-typescript-e2e-apps/quickstarts/azure-sql/connect-and-query/js/index.js](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/azure-sql-javascript-mssql-quickstart.md)

1. Create a `person.js` route file and add the following code:

    [Code reference unavailable in this source snapshot: ~/../azure-typescript-e2e-apps/quickstarts/azure-sql/connect-and-query/js/person.js](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/azure-sql-javascript-mssql-quickstart.md)

    For passwordless authentication, change the param passed into `createDatabaseConnection`  from `SQLAuthentication` to `PasswordlessConfig`.

    ```javascript
    const database = await createDatabaseConnection(PasswordlessConfig);
    ```
    

1. Create an `openapi.js` route file and add the following code for the OpenAPI UI explorer:

    [Code reference unavailable in this source snapshot: ~/../azure-typescript-e2e-apps/quickstarts/azure-sql/connect-and-query/js/openapi.js](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/azure-sql-javascript-mssql-quickstart.md)

1. Create an `openApiSchema.yml` file and add the following code so the OpenAPI UI explorer knows what APIs and models to display:

    [Code reference unavailable in this source snapshot: ~/../azure-typescript-e2e-apps/quickstarts/azure-sql/connect-and-query/ts/src/openApiSchema.yml](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/azure-sql-javascript-mssql-quickstart.md)


## Configure the mssql connection object

The **mssql** package implements the connection to Azure SQL Database by providing a configuration setting for an authentication type. 

1. In Visual Studio Code, create a `config.js` file and add the following mssql configuration code to authenticate to Azure SQL Database.

    [Code reference unavailable in this source snapshot: ~/../azure-typescript-e2e-apps/quickstarts/azure-sql/connect-and-query/js/config.js](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/azure-sql-javascript-mssql-quickstart.md)

## Create a local environment variable file

Create a `.env.development` file for your local environment variables

## [Passwordless (recommended)](#tab/passwordless)

  Add the following text and update with your values for `<YOURSERVERNAME>` and `<YOURDATABASENAME>`.

  ```text
  AZURE_SQL_SERVER=<YOURSERVERNAME>.database.windows.net
  AZURE_SQL_DATABASE=<YOURDATABASENAME>
  AZURE_SQL_PORT=1433
  AZURE_SQL_AUTHENTICATIONTYPE=azure-active-directory-default
  ```

> **Note:**
> Passwordless configuration objects are safe to commit to source control, since they do not contain any secrets such as usernames, passwords, or access keys.

## [SQL authentication](#tab/sql-auth)

  Add the following text and update with your values for `<YOURSERVERNAME>`, `<YOURDATABASENAME>`, `<YOURUSERNAME>`, and `<YOURPASSWORD>`.

  ```text
  AZURE_SQL_SERVER=<YOURSERVERNAME>.database.windows.net
  AZURE_SQL_DATABASE=<YOURDATABASENAME>
  AZURE_SQL_PORT=1433
  AZURE_SQL_USER=<YOURUSERNAME>
  AZURE_SQL_PASSWORD=<YOURPASSWORD>
  ```

> **Warning:**
> Use caution when managing connection objects that contain secrets such as usernames, passwords, or access keys. These secrets shouldn't be committed to source control or placed in unsecure locations where they might be accessed by unintended users.

---

## Add the code to connect to Azure SQL Database

1. Create a `database.js` file and add the following code:

    [Code reference unavailable in this source snapshot: ~/../azure-typescript-e2e-apps/quickstarts/azure-sql/connect-and-query/js/database.js](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/azure-sql-javascript-mssql-quickstart.md)

## Test the app locally

The app is ready to be tested locally. Make sure you're signed in to the Azure Cloud in Visual Studio Code with the same account you set as the admin for your database.

1. Run the application with the following command. The app starts on port 3000. 

    ```bash
    NODE_ENV=development node index.js
    ```

   The **Person** table is created in the database when you run this application.

1. In a browser, navigate to the OpenAPI explorer at **http://localhost:3000**.
1. On the Swagger UI page, expand the POST method and select **Try it**.
1. Modify the sample JSON to include values for the properties. The ID property is ignored. 

    A screenshot showing how to test the API.

1. Select **Execute** to add a new record to the database. The API returns a successful response.
1. Expand the **GET** method on the Swagger UI page and select **Try it**. Select **Execute**, and the person you just created is returned.

## Configure project for zip deployment

1. Create a `.vscode` folder and create a `settings.json` file in the folder.
2. Add the following to ignore environment variables and dependencies during the zip deployment.

    ```json
    {
        "appService.zipIgnorePattern": ["./.env*","node_modules{,/**}"]
    }
    ```

## Deploy to Azure App Service

The app is ready to be deployed to Azure. Visual Studio Code can create an Azure App Service and deploy your application in a single workflow.

1. Make sure the app is stopped.
1. Sign in to Azure, if you haven't already, by selecting the **Azure: Sign In to Azure Cloud** command in the Command Palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>)
1. In Visual Studio Code's **Azure Explorer** window, right-click on the **App Services** node and select **Create New Web App (Advanced)**.
1. Use the following table to create the App Service:

    | Prompt | Value |
    | --- | --- |
    | Enter a globally unique name for the new web app. | Enter a prompt such as `azure-sql-passwordless`. Post-pend a unique string such as `123`. |
    | Select a resource group for new resources. | Select **+Create a new resource group** then select the default name. |
    | Select a runtime stack. | Select an LTS version of the Node.js stack. |
    | Select an OS. | Select **Linux**. |
    | Select a location for new resources. | Select a location close to you. |
    | Select a Linux App Service plan. | Select **Create new App Service plan.** then select the default name. |
    | Select a pricing tier. | Select **Free (F1)**. |
    | Select an Application Insights resource for your app. | Select **Skip for now**. |

1. Wait until the notification that your app was created before continuing.
1. In the **Azure Explorer**, expand the **App Services** node and right-click your new app. 
1. Select **Deploy to Web App**.

    Screenshot of Visual Studio Code in the Azure explorer with the Deploy to Web App highlighted.

1. Select the root folder of the JavaScript project.
1. When the Visual Studio Code pop-up appears, select **Deploy**.

When the deployment finishes, the app doesn't work correctly on Azure. You still need to configure the secure connection between the App Service and the SQL database to retrieve your data.

## Connect the App Service to Azure SQL Database

## [Passwordless (recommended)](#tab/passwordless)


The following steps are required to connect the App Service instance to Azure SQL Database:

1. Create a managed identity for the App Service.
1. Create a SQL database user and associate it with the App Service managed identity.
1. Assign SQL roles to the database user that allow for read, write, and potentially other permissions.

There are multiple tools available to implement these steps:

## [Service Connector (Recommended)](#tab/service-connector)

Service Connector is a tool that streamlines authenticated connections between different services in Azure. Service Connector currently supports connecting an App Service to an Azure SQL database via the Azure CLI using the `az webapp connection create sql` command. This single command completes the three steps mentioned above for you.

### Create the managed identity with Service Connector

Run the following command in the Azure portal's Cloud Shell. The Cloud Shell has the latest version of the Azure CLI. Replace the variables in `<>` with your own values. 

```azurecli
az webapp connection create sql \
    -g <app-service-resource-group> \
    -n <app-service-name> \
    --tg <database-server-resource-group> \
    --server <database-server-name> \
    --database <database-name> \
    --system-identity
```

### Verify the App Service app settings

You can verify the changes made by Service Connector on the App Service settings.

1. In Visual Studio Code, in the Azure explorer, right-click your App Service and select **Open in portal**.
1. Navigate to the **Identity** page for your App Service. Under the **System assigned** tab, the **Status** should be set to **On**. This value means that a system-assigned managed identity was enabled for your app.
1. Navigate to the **Configuration** page for your App Service. Under the **Application Settings** tab, you should see several environment variables, which were already in the **mssql** configuration object. 

    * `AZURE_SQL_SERVER`
    * `AZURE_SQL_DATABASE`
    * `AZURE_SQL_PORT`
    * `AZURE_SQL_AUTHENTICATIONTYPE`

    Don't delete or change the property names or values.



## [Azure portal](#tab/azure-portal)

The Azure portal allows you to work with managed identities and run queries against Azure SQL Database. Complete the following steps to create a passwordless connection from your App Service instance to Azure SQL Database:

### Create the managed identity

1. In the Azure portal, navigate to your App Service and select **Identity** on the left navigation.

1. On the identity page, change the **System-assigned** status to **on** and select **Save**. 
1. When asked to enable the identity, select **Yes**.

    When this setting is enabled, a system-assigned managed identity is created with the same name as your App Service. System-assigned identities are tied to the service instance and are destroyed with the app when it's deleted.

### Create the database user and assign roles

1. In the Azure portal, browse to your SQL database and select **Query editor (preview)**.

1. Select **Continue as `<your-username>`** on the right side of the screen to sign into the database using your account.

1. On the query editor view, run the following T-SQL commands. Replace `<your-app-service-name>` with your App Service resource's name.

    ```sql
    CREATE USER "<your-app-service-name>" FROM EXTERNAL PROVIDER;
    ALTER ROLE db_datareader ADD MEMBER "<your-app-service-name>";
    ALTER ROLE db_datawriter ADD MEMBER "<your-app-service-name>";
    ALTER ROLE db_ddladmin ADD MEMBER "<your-app-service-name>";
    GO
    ```

    A screenshot showing how to use the Azure Query editor.

    This SQL script creates a SQL database user that maps back to the managed identity of your App Service instance. It also assigns the necessary SQL roles to the user to allow your app to read, write, and modify the data and schema of your database. After this step is completed, your services are connected.

> **Important:**
> Although this solution provides a simple approach for getting started, it's not a best practice for production-grade environments. In those scenarios, the app shouldn't perform all operations using a single, elevated identity. You should try to implement the principle of least privilege by configuring multiple identities with specific permissions for specific tasks.
>
> You can read more about configuring database roles and security on the following resources:
>
> - [Tutorial: Secure a database in Azure SQL Database](secure-database-tutorial.md)
> - [Authorize database access to SQL Database](logins-create-manage.md)

### Create the App Service app settings

1. In the Azure portal, navigate to your App Service and select **Configuration** on the left navigation.
1. Select **+ New application setting** for each environment variable below. Add your own appropriate value to create the required environment variables for your App Service instance to connect to your database.

    ```text
    AZURE_SQL_SERVER=<YOURSERVERNAME>.database.windows.net
    AZURE_SQL_DATABASE=<YOURDATABASENAME>
    AZURE_SQL_PORT=1433
    AZURE_SQL_AUTHENTICATIONTYPE=azure-active-directory-default
    ```

1. When you're done adding settings, select **Save**.
---


## [SQL Authentication](#tab/sql-auth)


1. In Visual Studio Code, in the Azure explorer, right-click your App Service and select **Open in portal**.
1. Navigate to the **Configuration** page for your App Service. Under the **Application Settings** tab, create environment variables for each property in the following table, with your own values. 

    ```text
    AZURE_SQL_SERVER=<YOURSERVERNAME>.database.windows.net
    AZURE_SQL_DATABASE=<YOURDATABASENAME>
    AZURE_SQL_PORT=1433
    AZURE_SQL_USER=<YOURUSERNAME>
    AZURE_SQL_PASSWORD=<PASSWORD>
    NODE_ENV=development
    ```

> **Warning:**
> Use caution when managing connection objects that contain secrets such as usernames, passwords, or access keys. These secrets shouldn't be committed to source control or placed in unsecure locations where they might be accessed by unintended users. For a real application in a production-grade Azure environment, you can store connection information in a secure location such as App Service configuration settings or Azure Key Vault. During local development, you'll generally connect to a local database that doesn't require storing secrets or connecting directly to Azure.

---

## Test the deployed application

Browse to the URL of the app to test that the connection to Azure SQL Database is working. You can locate the URL of your app on the App Service overview page. 

The person you created locally should display in the browser. Congratulations! Your application is now connected to Azure SQL Database in both local and hosted environments.

> **Tip:**
> If you receive a 500 Internal Server error while testing, it may be due to your database networking configurations. Verify that your logical server is configured with the settings outlined in the [Configure the database](https://learn.microsoft.com/azure/azure-sql/database/azure-sql-dotnet-quickstart#configure-the-database) section.


## Clean up the resources

When you are finished working with the Azure SQL Database, delete the resource to avoid unintended costs.

## [Azure portal](#tab/portal)

1) In the Azure portal search bar, search for *Azure SQL* and select the matching result.

1) Locate and select your database in the list of databases.

1) On the **Overview** page of your Azure SQL Database, select **Delete**.

1) On the **Azure you sure you want to delete...** page that opens, type the name of your database to confirm, and then select **Delete**.

## [Azure CLI](#tab/azure-cli)

Delete your database by using the `az sql db delete` command. Replace the placeholder parameters with your own values.

```azurecli
az sql db delete --name <database-name> --resource-group <resource-group-name> --server <logical-server-name>
```

---


## Sample code

The sample code for this application is available:
* [JavaScript](https://github.com/Azure-Samples/azure-typescript-e2e-apps/tree/main/quickstarts/azure-sql/connect-and-query/js)
* [TypeScript](https://github.com/Azure-Samples/azure-typescript-e2e-apps/tree/main/quickstarts/azure-sql/connect-and-query/ts)

## Next steps

- [Tutorial: Secure a database in Azure SQL Database](secure-database-tutorial.md)
- [Authorize database access to SQL Database](logins-create-manage.md)
- [An overview of Azure SQL Database security capabilities](security-overview.md)
- [Azure SQL Database security best practices](security-best-practice.md)
