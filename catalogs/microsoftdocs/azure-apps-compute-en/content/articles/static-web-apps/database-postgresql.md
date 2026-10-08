---
title: "Tutorial: Add a PostgreSQL database connection in Azure Static Web Apps"
description: Learn to add a PostgreSQL database connection to a web application in Azure Static Web Apps
author: cjk7989
ms.author: jikunchen
ms.service: azure-static-web-apps
ms.topic: tutorial
ms.date: 02/04/2026
zone_pivot_groups: static-web-apps-api-protocols
ms.custom: sfi-ropc-nochange
---

# Tutorial: Add a PostgreSQL database connection in Azure Static Web Apps (preview)

In this tutorial, you learn how to connect an Azure Database for PostgreSQL Single Server or Flexible Server database to your static web app. Once configured, you can make REST or GraphQL requests to the built-in `/data-api` endpoint to manipulate data without having to write backend code.

For the sake of simplicity, this tutorial shows you how to use an Azure database for local development purposes, but you may also use a local database server for your local development needs.

> **Note:**
> This tutorial shows how to use Azure Database for PostgreSQL Flexible Server or Single Server. If you would like to use another database, refer to the [Azure Cosmos DB](database-azure-cosmos-db.md), [Azure SQL](database-azure-sql.md), or [MySQL](database-mysql.md) tutorials.

Web browser showing results from PostgreSQL selection in the developer tools console window.

In this tutorial, you learn to:

> 
> * Link an Azure Database for PostgreSQL Flexible Server or Single Server database to your static web app
> * Create, read, update, and delete data

## Prerequisites

To complete this tutorial, you need to have an existing Azure Database for PostgreSQL Flexible Server or Single Server and static web app. Additionally, you need to install Visual Studio Code.

| Resource | Description |
| --- | --- |
| [Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/quickstart-create-server-portal) or [Azure Database for PostgreSQL Single Server Database](https://learn.microsoft.com/azure/postgresql/single-server/quickstart-create-server-database-portal) | If you don't already have one, follow the steps in the [create an Azure Database for PostgreSQL Flexible Server database](https://learn.microsoft.com/azure/postgresql/flexible-server/quickstart-create-server-portal) guide, or in the [create an Azure Database for PostgreSQL Single Server database](https://learn.microsoft.com/azure/postgresql/single-server/quickstart-create-server-database-portal) guide. If you plan to use a connection string authentication for Static Web Apps' database connections, ensure that you create your Azure Database for PostgreSQL Server with PostgreSQL authentication. You can change this value if you want to use managed identity later on. |
| [Existing static web app](getting-started.md) | If you don't already have one, follow the steps in the [getting started](getting-started.md) guide to create a *No Framework* static web app. |
| [Visual Studio Code, with the PostgreSQL extension](https://learn.microsoft.com/azure-data-studio/quickstart-postgres) | If you don't already have Visual Studio Code installed, follow the guide to install [Visual Studio Code, with the PostgreSQL extension](https://learn.microsoft.com/azure/postgresql/developer/vs-code-extension/vs-code-connect). Alternatively, you may use any other tool to query your PostgreSQL database, such as PgAdmin. |

Begin by configuring your database to work with the Azure Static Web Apps database connection feature.

## Configure database connectivity

Azure Static Web Apps must have network access to your database for database connections to work. Additionally, to use an Azure database for local development, you need to configure your database to allow requests from your own IP address.

1. Go to your Azure Database for PostgreSQL Server in the [Azure portal](https://portal.azure.com).

1. If you're using Azure Database for PostgreSQL Flexible Server, under the *Settings* section, select **Networking**. If you're using Azure Database for PostgreSQL Single Server, under the *Settings* section, select **Connection security**.

1. Under the *Firewall rules* section, select the **Add your current client IP address** button. This step ensures that you can use this database for your local development.

1. Under the *Firewall rules* section, select the **Allow public access from any Azure service within Azure to this server** checkbox. If you're using Azure Database for PostgreSQL Single Server, this toggle is labeled **Allow access to Azure services**. This step ensures that your deployed Static Web Apps resource can access your database.

1. Select **Save**.

## Get database connection string for local development

To use your Azure database for local development, you need to retrieve the connection string of your database. You may skip this step if you plan to use a local database for development purposes.

1. Go to your Azure Database for PostgreSQL Server in the [Azure portal](https://portal.azure.com).

1. Under the *Settings* section, select **Connection strings**.

1. From the *ADO.NET* box, copy the connection string and set it aside in a text editor.

1. Replace the `{your_password}` placeholder in the connection string with your password.

1. Replace the `{your_database}` placeholder with the database name `MyTestPersonDatabase`. You'll create the `MyTestPersonDatabase` in the coming steps.

1. Append `Trust Server Certificate=True;` to the connection string to use this connection string for local development.

## Create sample data

Create a sample table and seed it with sample data to match the tutorial. This tutorial uses [Visual Studio Code](https://learn.microsoft.com/azure/postgresql/developer/vs-code-extension/vs-code-connect), but you may use PgAdmin or any other tool. 

1. In Visual Studio Code, [create a connection to your Azure Database for PostgreSQL Server](https://learn.microsoft.com/azure/postgresql/developer/vs-code-extension/vs-code-connect)

1. Right-click your server, and select **New Query**. Run the following querying to create a database named `MyTestPersonDatabase`.

    ```sql
    CREATE DATABASE "MyTestPersonDatabase";
    ```

1. Right-click your server, and select **Refresh**.

1. Right-click your `MyTestPersonDatabase` and select **New Query**. Run the following query to create a new table named `MyTestPersonTable`.

    ```sql
    CREATE TABLE "MyTestPersonTable" (
        "Id" SERIAL PRIMARY KEY,
        "Name" VARCHAR(25) NULL
    );
    ```

1. Run the following queries to add data into the *MyTestPersonTable* table.

    ```sql
    INSERT INTO "MyTestPersonTable" ("Name")
    VALUES ('Sunny');

    INSERT INTO "MyTestPersonTable" ("Name")
    VALUES ('Dheeraj');
    ```

## Configure the static web app

The rest this tutorial focuses on editing your static web app's source code to make use of database connections locally.  

> **Important:**
> The following steps assume you are working with the static web app created in the [getting started guide](getting-started.md). If you are using a different project, make sure to adjust the following git commands to match your branch names.

1. Switch to the `main` branch.

    # [Bash](#tab/bash)

    ```bash
    git checkout main
    ```

    # [PowerShell](#tab/powershell)

    ```powershell
    git checkout main
    ```

    ---

1. Synchronize your local version with what's on GitHub by using `git pull`.

    # [Bash](#tab/bash)

    ```bash
    git pull origin main
    ```

    # [PowerShell](#tab/powershell)

    ```powershell
    git pull origin main
    ```

    ---

### Create the database configuration file

Next, create the configuration file that your static web app uses to interface with the database.

1. Open your terminal and create a new variable to hold your connection string. The specific syntax may vary depending on the shell type you're using.

    # [Bash](#tab/bash)

    ```bash
    export DATABASE_CONNECTION_STRING='<YOUR_CONNECTION_STRING>'
    ```

    # [PowerShell](#tab/powershell)

    ```powershell
    $env:DATABASE_CONNECTION_STRING='<YOUR_CONNECTION_STRING>'
    ```

    ---

    Make sure to replace `<YOUR_CONNECTION_STRING>` with the connections string value you set aside in a text editor.

1. Use npm to install or update the Static Web Apps CLI. Select which command is best for your situation.

    To install, use `npm install`.

    ```bash
    npm install -g @azure/static-web-apps-cli
    ```
    ```powershell
    npm install -g @azure/static-web-apps-cli
    ```

    To update, use `npm update`.

    ```bash
    npm update
    ```
    ```powershell
    npm update
    ```

1. Use the `swa db init` command to generate a database configuration file.

    # [Bash](#tab/bash)

    ```bash
    swa db init --database-type postgresql
    ```

    # [PowerShell](#tab/powershell)

    ```powershell
    swa db init --database-type postgresql
    ```

    ---

    The `init` command creates the *staticwebapp.database.config.json* file in the *swa-db-connections* folder.

1. Paste in this sample into file *staticwebapp.database.config.json* you generated.

```json
{
  "$schema": "https://github.com/Azure/data-api-builder/releases/latest/download/dab.draft.schema.json",
  "data-source": {
    "database-type": "postgresql",
    "options": {
      "set-session-context": false 
    },
    "connection-string": "@env('DATABASE_CONNECTION_STRING')"
  },
  "runtime": {
    "rest": {
      "enabled": true,
      "path": "/rest"
    },
    "graphql": {
      "allow-introspection": true,
      "enabled": true,
      "path": "/graphql"
    },
    "host": {
      "mode": "production",
      "cors": {
        "origins": ["http://localhost:4280"],
        "allow-credentials": false
      },
      "authentication": {
        "provider": "StaticWebApps"
      }
    }
  },
  "entities": {
    "Person": {
      "source": "MyTestPersonTable",
      "permissions": [
        {
          "actions": ["*"],
          "role": "anonymous"
        }
      ]
    }
  }
}
```

Before moving on to the next step, review the following table that explains different aspects of the configuration file. For full documentation on the configuration file and functionality such as relationships and policies for item-level security, refer to [Data API Builder documentation](https://learn.microsoft.com/azure/data-api-builder/configuration-file).

| Feature | Explanation |
| --- | --- |
| **Database connection** | In development, the runtime reads the connection string from the value of the connection string in the configuration file. While you can specify your connection string directly in the configuration file, a best practice is to store connection strings in a local environment variable. You can refer to environment variable values in the configuration file via the `@env('DATABASE_CONNECTION_STRING')` notation. The value of the connection string gets overwritten by Static Web Apps for the deployed site with the information collected when you connect your database. |
| **API endpoint** | The REST endpoint is available via `/data-api/rest` while the GraphQL endpoint is available through `/data-api/graphql` as configured in this configuration file. You may configure the REST and GraphQL paths, but the `/data-api` prefix isn't configurable. |
| **API Security** | The `runtime.host.cors` settings allow you to define allowed origins that can make requests to the API. In this case, the configuration reflects a development environment and allowlists the *http://localhost:4280* location. |
| **Entity model** | Defines the entities exposed via routes in the REST API, or as types in the GraphQL schema. In this case, the name *Person*, is the name exposed to the endpoint while `entities.<NAME>.source` is the database schema and table mapping. Notice how the API endpoint name doesn't need to be identical to the table name. |
| **Entity security** | Permissions rules listed in the `entity.<NAME>.permissions` array control the authorization settings for an entity. You can secure an entity with roles in the same way you [secure routes with roles](configuration.md#securing-routes-with-roles). |

> **Note:**
> The configuration file's `connection-string`, `host.mode`, and `graphql.allow-introspection` properties are overwritten when you deploy your site. Your connection string is overwritten with the authentication details collected when you connect your database to your Static Web Apps resource. The `host.mode` property is set to `production`, and the `graphql.allow-introspection` is set to `false`. These overrides provide consistency in your configuration files across your development and production workloads, while ensuring your Static Web Apps resource with database connections enabled is secure and production-ready.

With the static web app configured to connect to the database, you can now verify the connection.


### Update home page

Replace the markup between the `body` tags in the *index.html* file with the following HTML.

```html
<h1>Static Web Apps Database Connections</h1>
<blockquote>
    Open the console in the browser developer tools to see the API responses.
</blockquote>
<div>
    <button id="list" onclick="list()">List</button>
    <button id="get" onclick="get()">Get</button>
    <button id="update" onclick="update()">Update</button>
    <button id="create" onclick="create()">Create</button>
    <button id="delete" onclick="del()">Delete</button>
</div>
<script>
    // add JavaScript here
</script>
```

## Start the application locally

Now you can run your website and manipulate data in the database directly.


1. Start the static web app with the database configuration.

    ```bash
    swa start --data-api-location swa-db-connections
    ```

Now that the CLI is started, you can access your database via the endpoints as defined in the *staticwebapp.database.config.json* file.

**Applies to: static-web-apps-rest**

The `http://localhost:4280/data-api/rest/<ENTITY_NAME>` endpoint accepts `GET`, `PUT`, `POST` and `DELETE` requests to manipulate data in the database.


**Applies to: static-web-apps-graphql**

The `http://localhost:4280/data-api/graphql` endpoint accepts GraphQL queries and mutations.


## Manipulate data

The following framework-agnostic commands demonstrate how to do full CRUD operations on your database.

The output for each function appears in the browser's console window.

Open the developer tools by pressing <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd> and select the **Console** tab.

### List all items

Add the following code between the `script` tags in *index.html*.

**Applies to: static-web-apps-rest**


```javascript
async function list() {
  const endpoint = '/data-api/rest/Person';
  const response = await fetch(endpoint);
  const data = await response.json();
  console.table(data.value);
}
```

In this example:

* The default request for the `fetch` API uses the verb `GET`.
* Data in the response payload is found in the `value` property.



**Applies to: static-web-apps-graphql**


```javascript
async function list() {

  const query = `
      {
        people {
          items {
            Id
            Name
          }
        }
      }`;
      
  const endpoint = "/data-api/graphql";
  const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
  });
  const result = await response.json();
  console.table(result.data.people.items);
}
```

In this example:

* The GraphQL query selects the `Id` and `Name` fields from the database.
* The request passed to the server requires a payload where the `query` property holds the query definition.
* Data in the response payload is found in the `data.people.items` property.



Refresh the page and select the **List** button.

The browser's console window now displays a table that lists all the records in the database.

| ID | Name |
| --- | --- |
| 1 | Sunny |
| 2 | Dheeraj |

Here's a screenshot of what it should look like in your browser.

Web browser showing results from a database selection in the developer tools console window.

### Get by ID

Add the following code between the `script` tags in *index.html*.

**Applies to: static-web-apps-rest**


```javascript
async function get() {
  const id = 1;
  const endpoint = `/data-api/rest/Person/Id`;
  const response = await fetch(`${endpoint}/${id}`);
  const result = await response.json();
  console.table(result.value);
}
```

In this example:

* The endpoint is suffixed with `/person/Id`.
* The ID value is appended to the end of the endpoint location.
* Data in the response payload is found in the `value` property.



**Applies to: static-web-apps-graphql**


```javascript
async function get() {

  const id = 1;

  const gql = `
    query getById($id: Int!) {
      person_by_pk(Id: $id) {
        Id
        Name
      }
    }`;

  const query = {
    query: gql,
    variables: {
      id: id,
    },
  };

  const endpoint = "/data-api/graphql";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  const result = await response.json();
  console.table(result.data.person_by_pk);
}
```

In this example:

* The GraphQL query selects the `Id` and `Name` fields from the database.
* The request passed to the server requires a payload where the `query` property holds the query definition.
* Data in the response payload is found in the `data.person_by_pk` property.



Refresh the page and select the **Get** button.

The browser's console window now displays a table listing the single record requested from the database.

| ID | Name |
| --- | --- |
| 1 | Sunny |

### Update

Add the following code between the `script` tags in *index.html*.

**Applies to: static-web-apps-rest**


Static Web Apps support both the `PUT` and `PATCH` verbs. A `PUT` request updates the whole record, while `PATCH` does a partial update.

```javascript
async function update() {

  const id = 1;
  const data = {
    Name: "Molly"
  };

  const endpoint = '/data-api/rest/Person/Id';
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.table(result.value);
}

```

In this example:

* The endpoint is suffixed with `/person/Id/`.
* The ID value is appended to the end of the endpoint location.
* The REST verb is `PUT` to update the database record.
* Data in the response payload is found in the `value` property.



**Applies to: static-web-apps-graphql**


```javascript
async function update() {

  const id = 1;
  const data = {
    Name: "Molly"
  };

  const gql = `
    mutation update($id: Int!, $item: UpdatePersonInput!) {
      updatePerson(Id: $id, item: $item) {
        Id
        Name
      }
    }`;

  const query = {
    query: gql,
    variables: {
      id: id,
      item: data
    } 
  };

  const endpoint = "/data-api/graphql";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query)
  });

  const result = await res.json();
  console.table(result.data.updatePerson);
}
```

In this example:

* The GraphQL query selects the `Id` and `Name` fields from the database.
* The `query` object holds the GraphQL query in the `query` property.
* The argument values to the GraphQL function are passed in via the `query.variables` property.
* The request passed to the server requires a payload where the `query` property holds the query definition.
* Data in the response payload is found in the `data.updatePerson` property.



Refresh the page and select the **Update** button.

The browser's console window now displays a table showing the updated data.

| ID | Name |
| --- | --- |
| 1 | Molly |

### Create

Add the following code between the `script` tags in *index.html*.

**Applies to: static-web-apps-rest**


```javascript
async function create() {

  const data = {
    Name: "Pedro"
  };

  const endpoint = `/data-api/rest/Person/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.table(result.value);
}
```

In this example:

* The endpoint is suffixed with `/person/`.
* The REST verb is `POST` to add a database record.
* Data in the response payload is found in the `value` property.



**Applies to: static-web-apps-graphql**


```javascript
async function create() {

  const data = {
    Name: "Pedro"
  };

  const gql = `
    mutation create($item: CreatePersonInput!) {
      createPerson(item: $item) {
        Id
        Name
      }
    }`;
  
  const query = {
    query: gql,
    variables: {
      item: data
    } 
  };
  
  const endpoint = "/data-api/graphql";
  const result = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query)
  });

  const response = await result.json();
  console.table(response.data.createPerson);
}
```

In this example:

* The GraphQL query selects the `Id` and `Name` fields from the database.
* The `query` object holds the GraphQL query in the `query` property.
* The argument values to the GraphQL function are passed in via the `query.variables` property.
* The request passed to the server requires a payload where the `query` property holds the query definition.
* Data in the response payload is found in the `data.updatePerson` property.



Refresh the page and select the **Create** button.

The browser's console window now displays a table showing the new record in the database.

| ID | Name |
| --- | --- |
| 3 | Pedro |

### Delete

Add the following code between the `script` tags in *index.html*.

**Applies to: static-web-apps-rest**


```javascript
async function del() {
  const id = 3;
  const endpoint = '/data-api/rest/Person/Id';
  const response = await fetch(`${endpoint}/${id}`, {
    method: "DELETE"
  });
  if(response.ok) {
    console.log(`Record deleted: ${ id }`)
  } else {
    console.log(response);
  }
}
```

In this example:

* The endpoint is suffixed with `/person/Id/`.
* The ID value is appended to the end of the endpoint location.
* The REST verb is `DELETE` to remove the database record.
* If the delete is successful the response payload `ok` property is `true`.



**Applies to: static-web-apps-graphql**


```javascript
async function del() {

  const id = 3;

  const gql = `
    mutation del($id: Int!) {
      deletePerson(Id: $id) {
        Id
      }
    }`;

  const query = {
    query: gql,
    variables: {
      id: id
    }
  };

  const endpoint = "/data-api/graphql";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query)
  });

  const result = await response.json();
  console.log(`Record deleted: ${ result.data.deletePerson.Id }`);
}
```

In this example:

* The GraphQL query selects the `Id` field from the database.
* The `query` object holds the GraphQL query in the `query` property.
* The argument values to the GraphQL function are passed in via the `query.variables` property.
* The request passed to the server requires a payload where the `query` property holds the query definition.
* Data in the response payload is found in the `data.deletePerson` property.



Refresh the page and select the **Delete** button.

The browser's console window now displays a table showing the response from the delete request.

*Record deleted: 3*

Now that you've worked with your site locally, you can now deploy it to Azure.

## Deploy your site

To deploy this site to production, you just need to commit the configuration file and push your changes to the server.

1. Add the file changes to track.

    ```bash
    git add .
    ```

1. Commit the configuration changes.

    ```bash
    git commit -am "Add database configuration"
    ```

1. Push your changes to the server.

    ```bash
    git push origin main
    ```





## Connect the database to your static web app

Use the following steps to create a connection between the Static Web Apps instance of your site and your database.

1. Open your static web app in the Azure portal.

1. In the *Settings* section, select **Database connection**.

1. Under the *Production* section, select the **Link existing database** link.

1. In the *Link existing database* window, enter the following values:

    | Property | Value |
    | --- | --- |
    | Database Type | Select your database type from the dropdown list. |
    | Subscription | Select your Azure subscription from the dropdown list. |
    | Resource Name | Select the database server name that has your desired database. |
    | Database Name | Select the name of the database you want to link to your static web app. |
    | Authentication Type | Select **Connection string**, and enter the PostgreSQL user name and password. For PostgreSQL Single Server, don't include the `@servername` suffix. |

1. Select **OK**.

## Verify that your database is connected to your Static Web Apps resource

Once you've connected your database to your static web app and the site is finished building, use the following steps to verify the database connection.

1. Open your static web app in the Azure portal.

1. In the *Essentials* section, select the **URL** of your Static Web Apps resource to navigate to your static web app.

1. Select the **List** button to list all items.

    The output should resemble what's shown in this screenshot.

    Web browser showing results from listing records from the database in the developer tools console window.

## Clean up resources

If you want to remove the resources created during this tutorial, you need to unlink the database and remove the sample data.

1. **Unlink database**: Open your static web app in the Azure portal. Under the *Settings* section, select **Database connection**. Next to the linked database, select **View details**. In the *Database connection details* window, select the **Unlink** button.

1. **Remove sample data**: In your database, delete the table named `MyTestPersonTable`.

## Next steps

> 
> [Add an API](add-api.md)
