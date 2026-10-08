---
title: Create a web API with ASP.NET Core and MongoDB
author: wadepickett
<!-- author: prkhandelwal -->
description: This tutorial demonstrates how to create an ASP.NET Core web API using a MongoDB NoSQL database.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.custom: sfi-ropc-nochange
ms.date: 05/06/2026
uid: tutorials/first-mongo-app
---
# Create a web API with ASP.NET Core and MongoDB

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


By [Tim Deschryver](https://timdeschryver.dev)

**Applies to: \>= aspnetcore-10.0**

This tutorial creates a web API that runs Create, Read, Update, and Delete (CRUD) operations on a [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database.

In this tutorial, you learn how to:

> 
> * Configure MongoDB
> * Create a MongoDB database
> * Define a MongoDB collection and schema
> * Perform MongoDB CRUD operations from a web API
> * Customize JSON serialization

## Prerequisites

* [MongoDB 8.0.0 or later](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/install/)

# [Visual Studio](#tab/visual-studio)

* [The latest version of Visual Studio](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS26 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)


You can follow the Visual Studio Code instructions on macOS, Linux, or Windows. Changes may be required if you use an integrated development environment (IDE) other than Visual Studio Code.


---

## Configure MongoDB


Enable MongoDB and MongoDB Shell access from anywhere on the development machine (Windows/Linux/macOS):

1. Download and Install MongoDB Shell:
   * macOS/Linux: Choose a directory to extract the MongoDB Shell to. Add the resulting path for `mongosh` to the `PATH` environment variable.
   * Windows: MongoDB Shell (mongosh.exe) is installed at *C:\\Users\\{USER NAME}\\AppData\\Local\\Programs\\mongosh*. Add the resulting path for `mongosh.exe` to the `PATH` environment variable.
1. Download and Install MongoDB:
   * macOS/Linux: Verify the directory that MongoDB was installed at, usually in */usr/local/mongodb*. Add the resulting path for `mongodb` to the `PATH` environment variable.
   * Windows: MongoDB is installed at *C:\\Program Files\\MongoDB* by default. Add *C:\\Program Files\\MongoDB\\Server\\{VERSION NUMBER}\\bin* to the `PATH` environment variable.
1. Choose a Data Storage Directory: Select a directory on your development machine for storing data. Create the directory if it doesn't exist. The MongoDB Shell doesn't create new directories:
   * macOS/Linux: For example, `/usr/local/var/mongodb`.
   * Windows: For example, `C:\\BooksData`.
1. In the OS command shell (not the MongoDB Shell), use the following command to connect to MongoDB on default port 27017. Replace `{DATA DIRECTORY PATH}` with the directory chosen in the previous step.

   ```console
   mongod --dbpath {DATA DIRECTORY PATH}
   ```

Use the previously installed MongoDB Shell in the following steps to create a database, make collections, and store documents. For more information on MongoDB Shell commands, see [`mongosh`](https://docs.mongodb.com/mongodb-shell/run-commands/).

1. Open a MongoDB command shell instance by launching `mongosh.exe`, or by running the following command in the command shell:

   ```console
   mongosh
   ```

1. In the command shell connect to the default test database by running:

   ```console
   use BookStore
   ```

   A database named *BookStore* is created if it doesn't already exist. If the database does exist, its connection is opened for transactions.

1. Create a `Books` collection using following command:

   ```console
   db.createCollection('Books')
   ```

   The following result is displayed:

   ```console
   { "ok" : 1 }
   ```

1. Define a schema for the `Books` collection and insert two documents using the following command:

   ```console
   db.Books.insertMany([{ "Name": "Design Patterns", "Price": 54.93, "Category": "Computers", "Author": "Ralph Johnson" }, { "Name": "Clean Code", "Price": 43.15, "Category": "Computers","Author": "Robert C. Martin" }])
   ```

   A result similar to the following is displayed:

   ```console
   {
       "acknowledged" : true,
       "insertedIds" : [
           ObjectId("61a6058e6c43f32854e51f51"),
           ObjectId("61a6058e6c43f32854e51f52")
        ]
    }
   ```
  
   > **Note:**
   > The `ObjectId`s shown in the preceding result won't match those shown in the command shell.

1. View the documents in the database using the following command:

   ```console
   db.Books.find().pretty()
   ```

   A result similar to the following is displayed:

   ```console
   {
        "_id" : ObjectId("61a6058e6c43f32854e51f51"),
        "Name" : "Design Patterns",
        "Price" : 54.93,
        "Category" : "Computers",
        "Author" : "Ralph Johnson"
    }
    {
        "_id" : ObjectId("61a6058e6c43f32854e51f52"),
        "Name" : "Clean Code",
        "Price" : 43.15,
        "Category" : "Computers",
        "Author" : "Robert C. Martin"
    }
   ```

   The schema adds an autogenerated `_id` property of type `ObjectId` for each document.

## Create the ASP.NET Core web API project

# [Visual Studio](#tab/visual-studio)

1. Go to **File** > **New** > **Project**.
1. Select the **ASP.NET Core Web API** project type, and select **Next**.
1. Name the project *BookStoreApi*, and select **Next**.
1. In the **Additional information** dialog:
  * Confirm the **Framework** is **.NET 10.0 (Long Term Support)**.
  * Confirm the checkbox for **Use controllers** is unchecked.
  * Confirm the checkbox for **Enable OpenAPI support** is checked.
  * Select **Create**.
1. In the **Package Manager Console** window, navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```powershell
   Install-Package MongoDB.Driver
   ```

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in a command shell:

   ```dotnetcli
   dotnet new webapi -o BookStoreApi
   code BookStoreApi
   ```

   The preceding commands generate a new ASP.NET Core web API project and then open the project in Visual Studio Code.

1. Open the **Integrated Terminal** and run the following command to install the .NET driver for MongoDB:

   ```dotnetcli
   dotnet add package MongoDB.Driver
   ```

---

## Add an entity model

1. Add a *Models* directory to the project root.
1. Add a `Book` class to the *Models* directory with the following code:

   [language="csharp" source="first-mongo-app/samples_snapshot/10.x/Book.cs"::: (complete source file; reference: first-mongo-app/samples_snapshot/10.x/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/10.x/Book.cs.md)

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="first-mongo-app/samples/10.x/BookStoreApi/appsettings.json" highlight="2-6"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/appsettings.json)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/appsettings.json.md)

1. Add a `BookStoreDatabaseSettings` class to the *Models* directory with the following code:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs.md)

   The preceding `BookStoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookStoreDatabase` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_BookStoreDatabaseSettings" highlight="4-5"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

   In the preceding code, the configuration instance to which the `appsettings.json` file's `BookStoreDatabase` section binds is registered in the Dependency Injection (DI) container. For example, the `BookStoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookStoreDatabase:ConnectionString` property in `appsettings.json`.

1. Add the following code to the top of `Program.cs` to resolve the `BookStoreDatabaseSettings` reference:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_UsingModels"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BooksService` class to the *Services* directory with the following code:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Services/BooksService.cs" id="snippet_File"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Services/BooksService.cs.md)

   In the preceding code, a `BookStoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_BooksService" highlight="7"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

   In the preceding code, the `BooksService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BooksService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.14/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Program.cs` to resolve the `BooksService` reference:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_UsingServices"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

The `BooksService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided in the MongoDB connection string:

  [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Services/BooksService.cs" id="snippet_ctor" highlight="3-5"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Services/BooksService.cs.md)

* [IMongoDatabase](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_IMongoDatabase.htm): Represents the Mongo database for running operations. This tutorial uses the generic [GetCollection\<TDocument>(collection)](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoDatabase_GetCollection__1.htm) method on the interface to gain access to data in a specific collection. Run CRUD operations against the collection after this method is called. In the `GetCollection<TDocument>(collection)` method call:

  * `collection` represents the collection name.
  * `TDocument` represents the CLR object type stored in the collection.

`GetCollection<TDocument>(collection)` returns a [MongoCollection](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoCollection.htm) object representing the collection. In this tutorial, the following methods are invoked on the collection:

* [DeleteOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_DeleteOneAsync_1.htm): Deletes a single document matching the provided search criteria.
* [Find\<TDocument>](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollectionExtensions_Find__1.htm): Returns all documents in the collection matching the provided search criteria.
* [InsertOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_InsertOneAsync_1.htm): Inserts the provided object as a new document in the collection.
* [ReplaceOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_ReplaceOneAsync.htm): Replaces the single document matching the provided search criteria with the provided object.

## Create endpoints

In the `Program.cs` file, replace the weatherforecast example with the following books endpoints:

[language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_MapEndpoints"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

The preceding code:

* Uses [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%252A) to help organize all the books related endpoints, and provides a common route prefix of `/books` for all the endpoints within the group.
* Contains endpoints to support GET, POST, PUT, and DELETE HTTP requests.
* Uses the `BooksService` class to run CRUD operations.
* Calls [Microsoft.AspNetCore.Http.Results.Created%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results.Created%252A) in the `Create` action method to return an [HTTP 201](https://www.rfc-editor.org/rfc/rfc9110#status.201) response. Status code 201 is the standard response for an HTTP POST method that creates a new resource on the server. `Created` also adds a `Location` header to the response. The `Location` header specifies the URI of the newly created book.

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the [Test the web API](#test-the-web-api) section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. In `Program.cs`, add the following highlighted code:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_JsonOptions" highlight="9-13"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the [`[JsonPropertyName]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Models/Book.cs" id="snippet_BookName" highlight="2"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Models/Book.cs.md)

   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonPropertyName]` attribute reference:

   [language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Models/Book.cs" id="snippet_UsingSystemTextJsonSerialization"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Models/Book.cs.md)

1. Repeat the steps defined in the [Test the web API](#test-the-web-api) section. Notice the difference in JSON property names.

## Test the web API

# [Visual Studio](#tab/visual-studio)

This tutorial uses [Endpoints Explorer and .http files](https://learn.microsoft.com/search/?terms=test%2Fhttp-files%23use-endpoints-explorer) to test the API.

1. Build and run the app.

1. In **Endpoints Explorer**, right-click the first **GET** endpoint `/books`, and select **Generate request**.

   The following content is added to the `BookStoreApi.http` file.
   If this is the first time that a request is generated, the file is created in the project root.

   ```
   @BookStoreApi_HostAddress = https://localhost:{PORT}
    
   GET {{BookStoreApi_HostAddress}}/books
    
   ###
   ```

   The port number should already be set to the port used by the app, for example, `https://localhost:56874`.
   If that's not the case you can find your port number in the output window when you launch the app.

1. Select the **Send request** link above the new `GET` request line.

   The GET request is sent to the app and the response is displayed in the **Response** pane.

1. The response body shows the JSON result containing the book entries similar to the following:

   ```json
   [
     {
       "Id": "61a6058e6c43f32854e51f51",
       "Name": "Design Patterns",
       "Price": 54.93,
       "Category": "Computers",
       "Author": "Ralph Johnson"
     },
     {
       "Id": "61a6058e6c43f32854e51f52",
       "Name": "Clean Code",
       "Price": 43.15,
       "Category": "Computers",
       "Author": "Robert C. Martin"
     }
   ]
   ```

1. To retrieve a single book, right-click the `/books/{id}, params (string id)` **GET** endpoint in the **Endpoints Explorer**, and select **Generate request**.

   The following content is appended to the `BookStoreApi.http` file:

   ```
   @id=string
   GET {{BookStoreApi_HostAddress}}/books/{{id}}

   ###
   ```

1. Replace `id` variable with one of the IDs returned from the earlier request, for example:

   ```
   @id="61a6058e6c43f32854e51f52"
   GET {{BookStoreApi_HostAddress}}/books/{{id}}

   ###
   ```

1. Select the **Send request** link above the new `GET` request line.

   The GET request is sent to the app and the response is displayed in the **Response** pane.

1. The response body shows JSON similar to the following:

   ```json
   {
     "Id": "61a6058e6c43f32854e51f52",
     "Name": "Clean Code",
     "Price": 43.15,
     "Category": "Computers",
     "Author": "Robert C. Martin"
   }
   ```

1. To test the POST endpoint, right-click the `/books` **POST** endpoint and select **Generate request**.

   The following content is added to the `BookStoreApi.http` file:

   ```
   POST {{BookStoreApi_HostAddress}}/books
   Content-Type: application/json

   {
     //Book
   }
   
   ###
   ```

1. Replace the Book comment with a book object as the JSON request body:

   ```
   POST {{BookStoreApi_HostAddress}}/books
   Content-Type: application/json

    {
      "Name": "The Pragmatic Programmer",
      "Price": 49.99,
      "Category": "Computers",
      "Author": "Andy Hunt"
    }
   
   ###
   ```

1. Select the **Send request** link above the `POST` request line.

   The POST request is sent to the app, and the response is displayed in the **Response** pane. The response should include the newly created book with its assigned ID.

1. Lastly, to delete a book, right-click the `/books/{id}, params (string id)` **DELETE** endpoint and select **Generate request**.

   The following content is appended to the `BookStoreApi.http` file:

   ```
   DELETE {{BookStoreApi_HostAddress}}/books/{{id}}
    
   ###
   ```

1. Replace the `id` variable with one of the IDs returned from the earlier request, and click **Send request**. For example:

   ```
   DELETE {{BookStoreApi_HostAddress}}/books/67f417517ce1b36aeab71236

   ###
   ```

# [Visual Studio Code](#tab/visual-studio-code)

This tutorial uses the [OpenAPI specification (openapi.json) and Swagger UI](web-api-help-pages-using-swagger.md) to test the API.

1. Install Swagger UI by running the following command:

  ```dotnetcli
  dotnet add package NSwag.AspNetCore
  ```

The previous command adds the [NSwag.AspNetCore](https://www.nuget.org/packages/NSwag.AspNetCore/) package, which contains tools to generate Swagger documents and UI.
Because our project is using OpenAPI, we only use the NSwag package to generate the Swagger UI.

1. Configure Swagger middleware

In `Program.cs`, add the following highlighted code:

[language="csharp" source="first-mongo-app/samples/10.x/BookStoreApi/Program.cs" id="snippet_UseSwagger" highlight="6-9"::: (complete source file; reference: first-mongo-app/samples/10.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi/Program.cs.md)

The previous code enables the Swagger middleware for serving the generated JSON document using the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

The app uses the OpenAPI document generated by OpenApi, located at `/openapi/v1.json`, to generate the UI.
View the generated OpenAPI specification for the `BookStoreApi` API while the project is running by navigating to `https://localhost:{PORT}/openapi/v1.json` in your browser.

The OpenAPI specification is a document in JSON format that describes the structure and capabilities of your API, including endpoints, request/response formats, parameters, and more. It's essentially a blueprint of your API that can be used by various tools to understand and interact with your API.

1. Build and run the app.

1. Navigate to `https://localhost:{PORT}/swagger` in your browser. Swagger provides a UI to test all the API endpoints based on the OpenAPI document.

1. Expand the **GET /books** endpoint and click the **Try it out** button.

1. Click the **Execute** button to send the request to the API.

1. The **Response body** section displays a JSON array with books similar to the following:

   ```json
   [
     {
       "Id": "61a6058e6c43f32854e51f51",
       "Name": "Design Patterns",
       "Price": 54.93,
       "Category": "Computers",
       "Author": "Ralph Johnson"
     },
     {
       "Id": "61a6058e6c43f32854e51f52",
       "Name": "Clean Code",
       "Price": 43.15,
       "Category": "Computers",
       "Author": "Robert C. Martin"
     }
   ]
   ```

1. Next, expand the **GET /books/{id}** endpoint and click **Try it out**.

1. Enter one of the book IDs from the previous response in the **id** field, then click **Execute**.

1. The **Response body** section displays the JSON object for the specified book. For example, the result for the ID `61a6058e6c43f32854e51f52` is similar to the following:

   ```json
   {
     "Id": "61a6058e6c43f32854e51f52",
     "Name": "Clean Code",
     "Price": 43.15,
     "Category": "Computers",
     "Author": "Robert C. Martin"
   }
   ```

1. To test creating a new book, expand the **POST /books** endpoint and click **Try it out**.

1. Replace the default request body with a new book object:

   ```json
   {
     "Name": "The Pragmatic Programmer",
     "Price": 49.99,
     "Category": "Computers",
     "Author": "Andy Hunt"
   }
   ```

1. Click **Execute** to send the request.

1. The response should have a status code of 201 (Created) and include the newly created book with its assigned ID in the response body.

1. Lastly, to delete a book record, expand the **DELETE /books/{id}** endpoint, click **Try it out**, and enter one of the book IDs from the previous response in the **id** field. Click **Execute** to send the request.
 
1. The response should have a status code of 204 (No Content), indicating that the book was successfully deleted. 
---

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server.

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples/10.x/BookStoreApi) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [web-api/index](../web-api/index.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [Create a minimal web API with ASP.NET Core](https://learn.microsoft.com/training/modules/interact-api/)



**Applies to: \= aspnetcore-9.0**

This tutorial creates a web API that runs Create, Read, Update, and Delete (CRUD) operations on a [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database.

In this tutorial, you learn how to:

> 
> * Configure MongoDB
> * Create a MongoDB database
> * Define a MongoDB collection and schema
> * Perform MongoDB CRUD operations from a web API
> * Customize JSON serialization

## Prerequisites

* [MongoDB 6.0.5 or later](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/install/)

# [Visual Studio](#tab/visual-studio)

<!-- use the include for articles that are not updated every release, like the data/ef articles -->
* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)


You can follow the Visual Studio Code instructions on macOS, Linux, or Windows. Changes may be required if you use an integrated development environment (IDE) other than Visual Studio Code.


---

## Configure MongoDB


Enable MongoDB and MongoDB Shell access from anywhere on the development machine (Windows/Linux/macOS):

1. Download and Install MongoDB Shell:
   * macOS/Linux: Choose a directory to extract the MongoDB Shell to. Add the resulting path for `mongosh` to the `PATH` environment variable.
   * Windows: MongoDB Shell (mongosh.exe) is installed at *C:\\Users\\\<user>\\AppData\\Local\\Programs\\mongosh*. Add the resulting path for `mongosh.exe` to the `PATH` environment variable.
1. Download and Install MongoDB:
   * macOS/Linux: Verify the directory that MongoDB was installed at, usually in */usr/local/mongodb*. Add the resulting path for `mongodb` to the `PATH` environment variable.
   * Windows: MongoDB is installed at *C:\\Program Files\\MongoDB* by default. Add *C:\\Program Files\\MongoDB\\Server\\\<version_number>\\bin* to the `PATH` environment variable.
1. Choose a Data Storage Directory: Select a directory on your development machine for storing data. Create the directory if it doesn't exist. The MongoDB Shell doesn't create new directories:
   * macOS/Linux: For example, `/usr/local/var/mongodb`.
   * Windows: For example, `C:\\BooksData`.
1. In the OS command shell (not the MongoDB Shell), use the following command to connect to MongoDB on default port 27017. Replace `<data_directory_path>` with the directory chosen in the previous step.

   ```console
   mongod --dbpath <data_directory_path>
   ```

Use the previously installed MongoDB Shell in the following steps to create a database, make collections, and store documents. For more information on MongoDB Shell commands, see [`mongosh`](https://docs.mongodb.com/mongodb-shell/run-commands/).

1. Open a MongoDB command shell instance by launching `mongosh.exe`, or by running the following command in the command shell:

   ```console
   mongosh
   ```

1. In the command shell connect to the default test database by running:

   ```console
   use BookStore
   ```

   A database named *BookStore* is created if it doesn't already exist. If the database does exist, its connection is opened for transactions.

1. Create a `Books` collection using following command:

   ```console
   db.createCollection('Books')
   ```

   The following result is displayed:

   ```console
   { "ok" : 1 }
   ```

1. Define a schema for the `Books` collection and insert two documents using the following command:

   ```console
   db.Books.insertMany([{ "Name": "Design Patterns", "Price": 54.93, "Category": "Computers", "Author": "Ralph Johnson" }, { "Name": "Clean Code", "Price": 43.15, "Category": "Computers","Author": "Robert C. Martin" }])
   ```

   A result similar to the following is displayed:

   ```console
   {
       "acknowledged" : true,
       "insertedIds" : [
           ObjectId("61a6058e6c43f32854e51f51"),
           ObjectId("61a6058e6c43f32854e51f52")
        ]
    }
   ```
  
   > **Note:**
   > The `ObjectId`s shown in the preceding result won't match those shown in the command shell.

1. View the documents in the database using the following command:

   ```console
   db.Books.find().pretty()
   ```

   A result similar to the following is displayed:

   ```console
   {
        "_id" : ObjectId("61a6058e6c43f32854e51f51"),
        "Name" : "Design Patterns",
        "Price" : 54.93,
        "Category" : "Computers",
        "Author" : "Ralph Johnson"
    }
    {
        "_id" : ObjectId("61a6058e6c43f32854e51f52"),
        "Name" : "Clean Code",
        "Price" : 43.15,
        "Category" : "Computers",
        "Author" : "Robert C. Martin"
    }
   ```

   The schema adds an autogenerated `_id` property of type `ObjectId` for each document.

## Create the ASP.NET Core web API project

# [Visual Studio](#tab/visual-studio)

1. Go to **File** > **New** > **Project**.
1. Select the **ASP.NET Core Web API** project type, and select **Next**.
1. Name the project *BookStoreApi*, and select **Next**.
1. In the **Additional information** dialog:
  * Confirm the **Framework** is **.NET 9.0 (Standard Term Support)**.
  * Confirm the checkbox for **Use controllers** is checked.
  * Confirm the checkbox for **Enable OpenAPI support** is checked.
  * Select **Create**.
1. In the **Package Manager Console** window, navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```powershell
   Install-Package MongoDB.Driver
   ```

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in a command shell:

   ```dotnetcli
   dotnet new webapi -o BookStoreApi --use-controllers
   code BookStoreApi
   ```

   The preceding commands generate a new ASP.NET Core web API project and then open the project in Visual Studio Code.

1. Once the OmniSharp server starts up, a dialog asks **Required assets to build and debug are missing from 'BookStoreApi'. Add them?**. Select **Yes**.
1. Open the **Integrated Terminal** and run the following command to install the .NET driver for MongoDB:

   ```dotnetcli
   dotnet add package MongoDB.Driver
   ```

---

## Add an entity model

1. Add a *Models* directory to the project root.
1. Add a `Book` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/9.x/Book.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/9.x/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/9.x/Book.cs.md)

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/appsettings.json" highlight="2-6"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/appsettings.json)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/appsettings.json.md)

1. Add a `BookStoreDatabaseSettings` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs.md)

   The preceding `BookStoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookStoreDatabase` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs" id="snippet_BookStoreDatabaseSettings" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs.md)

   In the preceding code, the configuration instance to which the `appsettings.json` file's `BookStoreDatabase` section binds is registered in the Dependency Injection (DI) container. For example, the `BookStoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookStoreDatabase:ConnectionString` property in `appsettings.json`.

1. Add the following code to the top of `Program.cs` to resolve the `BookStoreDatabaseSettings` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs" id="snippet_UsingModels"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BooksService` class to the *Services* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Services/BooksService.cs" id="snippet_File"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Services/BooksService.cs.md)

   In the preceding code, a `BookStoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs" id="snippet_BooksService" highlight="7"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs.md)

   In the preceding code, the `BooksService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BooksService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.14/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Program.cs` to resolve the `BooksService` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs" id="snippet_UsingServices"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs.md)

The `BooksService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided in the MongoDB connection string:

  [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Services/BooksService.cs" id="snippet_ctor" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Services/BooksService.cs.md)

* [IMongoDatabase](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_IMongoDatabase.htm): Represents the Mongo database for running operations. This tutorial uses the generic [GetCollection\<TDocument>(collection)](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoDatabase_GetCollection__1.htm) method on the interface to gain access to data in a specific collection. Run CRUD operations against the collection after this method is called. In the `GetCollection<TDocument>(collection)` method call:

  * `collection` represents the collection name.
  * `TDocument` represents the CLR object type stored in the collection.

`GetCollection<TDocument>(collection)` returns a [MongoCollection](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoCollection.htm) object representing the collection. In this tutorial, the following methods are invoked on the collection:

* [DeleteOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_DeleteOneAsync_1.htm): Deletes a single document matching the provided search criteria.
* [Find\<TDocument>](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollectionExtensions_Find__1.htm): Returns all documents in the collection matching the provided search criteria.
* [InsertOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_InsertOneAsync_1.htm): Inserts the provided object as a new document in the collection.
* [ReplaceOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_ReplaceOneAsync.htm): Replaces the single document matching the provided search criteria with the provided object.

## Add a controller

Add a `BooksController` class to the *Controllers* directory with the following code:

[language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Controllers/BooksController.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Controllers/BooksController.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Controllers/BooksController.cs.md)

The preceding web API controller:

* Uses the `BooksService` class to run CRUD operations.
* Contains action methods to support GET, POST, PUT, and DELETE HTTP requests.
* Calls [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) in the `Create` action method to return an [HTTP 201](https://www.rfc-editor.org/rfc/rfc9110#status.201) response. Status code 201 is the standard response for an HTTP POST method that creates a new resource on the server. `CreatedAtAction` also adds a `Location` header to the response. The `Location` header specifies the URI of the newly created book.

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the [Test the web API](#test-the-web-api) section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. In `Program.cs`, chain the following highlighted code on to the `AddControllers` method call:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs" id="snippet_AddControllers" highlight="10-11"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the [`[JsonPropertyName]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/Book.cs" id="snippet_BookName" highlight="2"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/Book.cs.md)

   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonPropertyName]` attribute reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/Book.cs" id="snippet_UsingSystemTextJsonSerialization"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Models/Book.cs.md)

1. Repeat the steps defined in the [Test the web API](#test-the-web-api) section. Notice the difference in JSON property names.

## Test the web API

# [Visual Studio](#tab/visual-studio)

This tutorial uses [Endpoints Explorer and .http files](https://learn.microsoft.com/search/?terms=test%2Fhttp-files%23use-endpoints-explorer) to test the API.

1. Build and run the app.

1. In **Endpoints Explorer**, right-click the first **GET** endpoint `/api/books`, and select **Generate request**.

   The following content is added to the `BookStoreApi.http` file.
   If this is the first time that a request is generated, the file is created in the project root.

   ```
   @BookStoreApi_HostAddress = https://localhost:<port>
    
   GET {{BookStoreApi_HostAddress}}/api/books
    
   ###
   ```

   The port number should already be set to the port used by the app, for example, `https://localhost:56874`.
   If that's not the case you can find your port number in the output window when you launch the app.

1. Select the **Send request** link above the new `GET` request line.

   The GET request is sent to the app and the response is displayed in the **Response** pane.

1. The response body shows the JSON result containing the book entries similar to the following:

   ```json
   [
     {
       "Id": "61a6058e6c43f32854e51f51",
       "Name": "Design Patterns",
       "Price": 54.93,
       "Category": "Computers",
       "Author": "Ralph Johnson"
     },
     {
       "Id": "61a6058e6c43f32854e51f52",
       "Name": "Clean Code",
       "Price": 43.15,
       "Category": "Computers",
       "Author": "Robert C. Martin"
     }
   ]
   ```

1. To retrieve a single book, right-click the `/api/books/{id}, params (string id)` **GET** endpoint in the **Endpoints Explorer**, and select **Generate request**.

   The following content is appended to the `BookStoreApi.http` file:

   ```
   @id=string
   GET {{BookStoreApi_HostAddress}}/api/books/{{id}}

   ###
   ```

1. Replace `id` variable with one of the IDs returned from the earlier request, for example:

   ```
   @id="61a6058e6c43f32854e51f52"
   GET {{BookStoreApi_HostAddress}}/api/books/{{id}}

   ###
   ```

1. Select the **Send request** link above the new `GET` request line.

   The GET request is sent to the app and the response is displayed in the **Response** pane.

1. The response body shows JSON similar to the following:

   ```json
   {
     "Id": "61a6058e6c43f32854e51f52",
     "Name": "Clean Code",
     "Price": 43.15,
     "Category": "Computers",
     "Author": "Robert C. Martin"
   }
   ```

1. To test the POST endpoint, right-click the `/api/books` **POST** endpoint and select **Generate request**.

   The following content is added to the `BookStoreApi.http` file:

   ```
   POST {{BookStoreApi_HostAddress}}/api/books
   Content-Type: application/json

   {
     //Book
   }
   
   ###
   ```

1. Replace the Book comment with a book object as the JSON request body:

   ```
   POST {{BookStoreApi_HostAddress}}/api/books
   Content-Type: application/json

    {
      "Name": "The Pragmatic Programmer",
      "Price": 49.99,
      "Category": "Computers",
      "Author": "Andy Hunt"
    }
   
   ###
   ```

1. Select the **Send request** link above the `POST` request line.

   The POST request is sent to the app, and the response is displayed in the **Response** pane. The response should include the newly created book with its assigned ID.

1. Lastly, to delete a book, right-click the `/api/books/{id}, params (string id)` **DELETE** endpoint and select **Generate request**.

   The following content is appended to the `BookStoreApi.http` file:

   ```
   DELETE {{BookStoreApi_HostAddress}}/api/Books/{{id}}
    
   ###
   ```

1. Replace the `id` variable with one of the IDs returned from the earlier request, and click **Send request**. For example:

   ```
   DELETE {{BookStoreApi_HostAddress}}/api/Books/67f417517ce1b36aeab71236

   ###
   ```

# [Visual Studio Code](#tab/visual-studio-code)

This tutorial uses the [OpenAPI specification (openapi.json) and Swagger UI](web-api-help-pages-using-swagger.md) to test the API.

1. Install Swagger UI by running the following command:

  ```dotnetcli
  dotnet add package NSwag.AspNetCore
  ```

The previous command adds the [NSwag.AspNetCore](https://www.nuget.org/packages/NSwag.AspNetCore/) package, which contains tools to generate Swagger documents and UI.
Because our project is using OpenAPI, we only use the NSwag package to generate the Swagger UI.

1. Configure Swagger middleware

In `Program.cs`, add the following highlighted code:

[language="csharp" source="\~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs" id="snippet_UseSwagger" highlight="6-9"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi/Program.cs.md)

The previous code enables the Swagger middleware for serving the generated JSON document using the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

The app uses the OpenAPI document generated by OpenApi, located at `/openapi/v1.json`, to generate the UI.
View the generated OpenAPI specification for the `BookStoreApi` API while the project is running by navigating to `https://localhost:<port>/openapi/v1.json` in your browser.

The OpenAPI specification is a document in JSON format that describes the structure and capabilities of your API, including endpoints, request/response formats, parameters, and more. It's essentially a blueprint of your API that can be used by various tools to understand and interact with your API.

1. Build and run the app.

1. Navigate to `https://localhost:<port>/swagger` in your browser. Swagger provides a UI to test all the API endpoints based on the OpenAPI document.

1. Expand the **GET /api/books** endpoint and click the **Try it out** button.

1. Click the **Execute** button to send the request to the API.

1. The **Response body** section displays a JSON array with books similar to the following:

   ```json
   [
     {
       "Id": "61a6058e6c43f32854e51f51",
       "Name": "Design Patterns",
       "Price": 54.93,
       "Category": "Computers",
       "Author": "Ralph Johnson"
     },
     {
       "Id": "61a6058e6c43f32854e51f52",
       "Name": "Clean Code",
       "Price": 43.15,
       "Category": "Computers",
       "Author": "Robert C. Martin"
     }
   ]
   ```

1. Next, expand the **GET /api/books/{id}** endpoint and click **Try it out**.

1. Enter one of the book IDs from the previous response in the **id** field, then click **Execute**.

1. The **Response body** section displays the JSON object for the specified book. For example, the result for the ID `61a6058e6c43f32854e51f52` is similar to the following:

   ```json
   {
     "Id": "61a6058e6c43f32854e51f52",
     "Name": "Clean Code",
     "Price": 43.15,
     "Category": "Computers",
     "Author": "Robert C. Martin"
   }
   ```

1. To test creating a new book, expand the **POST /api/books** endpoint and click **Try it out**.

1. Replace the default request body with a new book object:

   ```json
   {
     "Name": "The Pragmatic Programmer",
     "Price": 49.99,
     "Category": "Computers",
     "Author": "Andy Hunt"
   }
   ```

1. Click **Execute** to send the request.

1. The response should have a status code of 201 (Created) and include the newly created book with its assigned ID in the response body.

1. Lastly, to delete a book record, expand the **DELETE /api/books/{id}** endpoint, click **Try it out**, and enter one of the book IDs from the previous response in the **id** field. Click **Execute** to send the request.
 
1. The response should have a status code of 204 (No Content), indicating that the book was successfully deleted. 
---

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples/9.x/BookStoreApi) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [web-api/index](../web-api/index.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)




**Applies to: \= aspnetcore-8.0**

This tutorial creates a web API that runs Create, Read, Update, and Delete (CRUD) operations on a [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database.

In this tutorial, you learn how to:

> 
> * Configure MongoDB
> * Create a MongoDB database
> * Define a MongoDB collection and schema
> * Perform MongoDB CRUD operations from a web API
> * Customize JSON serialization

## Prerequisites

* [MongoDB 6.0.5 or later](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/install/)

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Configure MongoDB


Enable MongoDB and MongoDB Shell access from anywhere on the development machine (Windows/Linux/macOS):

1. Download and Install MongoDB Shell:
   * macOS/Linux: Choose a directory to extract the MongoDB Shell to. Add the resulting path for `mongosh` to the `PATH` environment variable.
   * Windows: MongoDB Shell (mongosh.exe) is installed at *C:\\Users\\\<user>\\AppData\\Local\\Programs\\mongosh*. Add the resulting path for `mongosh.exe` to the `PATH` environment variable.
1. Download and Install MongoDB:
   * macOS/Linux: Verify the directory that MongoDB was installed at, usually in */usr/local/mongodb*. Add the resulting path for `mongodb` to the `PATH` environment variable.
   * Windows: MongoDB is installed at *C:\\Program Files\\MongoDB* by default. Add *C:\\Program Files\\MongoDB\\Server\\\<version_number>\\bin* to the `PATH` environment variable.
1. Choose a Data Storage Directory: Select a directory on your development machine for storing data. Create the directory if it doesn't exist. The MongoDB Shell doesn't create new directories:
   * macOS/Linux: For example, `/usr/local/var/mongodb`.
   * Windows: For example, `C:\\BooksData`.
1. In the OS command shell (not the MongoDB Shell), use the following command to connect to MongoDB on default port 27017. Replace `<data_directory_path>` with the directory chosen in the previous step.

   ```console
   mongod --dbpath <data_directory_path>
   ```

Use the previously installed MongoDB Shell in the following steps to create a database, make collections, and store documents. For more information on MongoDB Shell commands, see [`mongosh`](https://docs.mongodb.com/mongodb-shell/run-commands/).

1. Open a MongoDB command shell instance by launching `mongosh.exe`, or by running the following command in the command shell:

   ```console
   mongosh
   ```

1. In the command shell connect to the default test database by running:
   ```console
   use BookStore
   ```

   A database named *BookStore* is created if it doesn't already exist. If the database does exist, its connection is opened for transactions.

1. Create a `Books` collection using following command:

   ```console
   db.createCollection('Books')
   ```

   The following result is displayed:

   ```console
   { "ok" : 1 }
   ```

1. Define a schema for the `Books` collection and insert two documents using the following command:

   ```console
   db.Books.insertMany([{ "Name": "Design Patterns", "Price": 54.93, "Category": "Computers", "Author": "Ralph Johnson" }, { "Name": "Clean Code", "Price": 43.15, "Category": "Computers","Author": "Robert C. Martin" }])
   ```

   A result similar to the following is displayed:

   ```console
   {
       "acknowledged" : true,
       "insertedIds" : [
           ObjectId("61a6058e6c43f32854e51f51"),
           ObjectId("61a6058e6c43f32854e51f52")
        ]
    }
   ```
  
   > **Note:**
   > The `ObjectId`s shown in the preceding result won't match those shown in the command shell.

1. View the documents in the database using the following command:

   ```console
   db.Books.find().pretty()
   ```

   A result similar to the following is displayed:

   ```console
   {
        "_id" : ObjectId("61a6058e6c43f32854e51f51"),
        "Name" : "Design Patterns",
        "Price" : 54.93,
        "Category" : "Computers",
        "Author" : "Ralph Johnson"
    }
    {
        "_id" : ObjectId("61a6058e6c43f32854e51f52"),
        "Name" : "Clean Code",
        "Price" : 43.15,
        "Category" : "Computers",
        "Author" : "Robert C. Martin"
    }
   ```

   The schema adds an autogenerated `_id` property of type `ObjectId` for each document.

## Create the ASP.NET Core web API project

# [Visual Studio](#tab/visual-studio)

1. Go to **File** > **New** > **Project**.
1. Select the **ASP.NET Core Web API** project type, and select **Next**.
1. Name the project *BookStoreApi*, and select **Next**.
1. Select the **.NET 8.0 (Long Term support)** framework and select **Create**.
1. In the **Package Manager Console** window, navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```powershell
   Install-Package MongoDB.Driver
   ```

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in a command shell:

   ```dotnetcli
   dotnet new webapi -o BookStoreApi
   code BookStoreApi
   ```

   The preceding commands generate a new ASP.NET Core web API project and then open the project in Visual Studio Code.

1. Once the OmniSharp server starts up, a dialog asks **Required assets to build and debug are missing from 'BookStoreApi'. Add them?**. Select **Yes**.
1. Open the **Integrated Terminal** and run the following command to install the .NET driver for MongoDB:

   ```dotnetcli
   dotnet add package MongoDB.Driver
   ```

---

## Add an entity model

1. Add a *Models* directory to the project root.
1. Add a `Book` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/8.x/Book.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/8.x/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/8.x/Book.cs.md)

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/appsettings.json" highlight="2-6"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/appsettings.json)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/appsettings.json.md)

1. Add a `BookStoreDatabaseSettings` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs.md)

   The preceding `BookStoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookStoreDatabase` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs" id="snippet_BookStoreDatabaseSettings" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs.md)

   In the preceding code, the configuration instance to which the `appsettings.json` file's `BookStoreDatabase` section binds is registered in the Dependency Injection (DI) container. For example, the `BookStoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookStoreDatabase:ConnectionString` property in `appsettings.json`.

1. Add the following code to the top of `Program.cs` to resolve the `BookStoreDatabaseSettings` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs" id="snippet_UsingModels"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BooksService` class to the *Services* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Services/BooksService.cs" id="snippet_File"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Services/BooksService.cs.md)

   In the preceding code, a `BookStoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs" id="snippet_BooksService" highlight="7"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs.md)

   In the preceding code, the `BooksService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BooksService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.14/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Program.cs` to resolve the `BooksService` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs" id="snippet_UsingServices"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs.md)

The `BooksService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided in the MongoDB connection string:

  [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Services/BooksService.cs" id="snippet_ctor" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Services/BooksService.cs.md)

* [IMongoDatabase](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_IMongoDatabase.htm): Represents the Mongo database for running operations. This tutorial uses the generic [GetCollection\<TDocument>(collection)](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoDatabase_GetCollection__1.htm) method on the interface to gain access to data in a specific collection. Run CRUD operations against the collection after this method is called. In the `GetCollection<TDocument>(collection)` method call:

  * `collection` represents the collection name.
  * `TDocument` represents the CLR object type stored in the collection.

`GetCollection<TDocument>(collection)` returns a [MongoCollection](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoCollection.htm) object representing the collection. In this tutorial, the following methods are invoked on the collection:

* [DeleteOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_DeleteOneAsync_1.htm): Deletes a single document matching the provided search criteria.
* [Find\<TDocument>](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollectionExtensions_Find__1.htm): Returns all documents in the collection matching the provided search criteria.
* [InsertOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_InsertOneAsync_1.htm): Inserts the provided object as a new document in the collection.
* [ReplaceOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_ReplaceOneAsync.htm): Replaces the single document matching the provided search criteria with the provided object.

## Add a controller

Add a `BooksController` class to the *Controllers* directory with the following code:

[language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Controllers/BooksController.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Controllers/BooksController.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Controllers/BooksController.cs.md)

The preceding web API controller:

* Uses the `BooksService` class to run CRUD operations.
* Contains action methods to support GET, POST, PUT, and DELETE HTTP requests.
* Calls [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) in the `Create` action method to return an [HTTP 201](https://www.rfc-editor.org/rfc/rfc9110#status.201) response. Status code 201 is the standard response for an HTTP POST method that creates a new resource on the server. `CreatedAtAction` also adds a `Location` header to the response. The `Location` header specifies the URI of the newly created book.

## Test the web API

1. Build and run the app.

1. Navigate to `https://localhost:<port>/api/books`, where `<port>` is the automatically assigned port number for the app, to test the controller's parameterless `Get` action method. A JSON response similar to the following is displayed:

   ```json
   [
     {
       "id": "61a6058e6c43f32854e51f51",
       "bookName": "Design Patterns",
       "price": 54.93,
       "category": "Computers",
       "author": "Ralph Johnson"
     },
     {
       "id": "61a6058e6c43f32854e51f52",
       "bookName": "Clean Code",
       "price": 43.15,
       "category": "Computers",
       "author": "Robert C. Martin"
     }
   ]
   ```

1. Navigate to `https://localhost:<port>/api/books/{id here}` to test the controller's overloaded `Get` action method. A JSON response similar to the following is displayed:

   ```json
   {
     "id": "61a6058e6c43f32854e51f52",
     "bookName": "Clean Code",
     "price": 43.15,
     "category": "Computers",
     "author": "Robert C. Martin"
   }
   ```

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the [Test the web API](#test-the-web-api) section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. In `Program.cs`, chain the following highlighted code on to the `AddControllers` method call:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs" id="snippet_AddControllers" highlight="10-11"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Program.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the [`[JsonPropertyName]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/Book.cs" id="snippet_BookName" highlight="2"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/Book.cs.md)

   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonProperty]` attribute reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/Book.cs" id="snippet_UsingSystemTextJsonSerialization"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi/Models/Book.cs.md)

1. Repeat the steps defined in the [Test the web API](#test-the-web-api) section. Notice the difference in JSON property names.

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples/8.x/BookStoreApi) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [web-api/index](../web-api/index.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)




**Applies to: \= aspnetcore-7.0**

This tutorial creates a web API that runs Create, Read, Update, and Delete (CRUD) operations on a [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database.

In this tutorial, you learn how to:

> 
> * Configure MongoDB
> * Create a MongoDB database
> * Define a MongoDB collection and schema
> * Perform MongoDB CRUD operations from a web API
> * Customize JSON serialization

## Prerequisites

* [MongoDB 6.0.5 or later](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/install/)

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio 2022 for Mac (latest version)](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
  
  > **Important:**
> Microsoft has announced the retirement of Visual Studio for Mac. Visual Studio for Mac will no longer be supported starting August 31, 2024. Alternatives include:
>
> * Visual Studio Code with the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) and related extensions, such as [.NET MAUI](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui) and [Unity](https://marketplace.visualstudio.com/items?itemName=visualstudiotoolsforunity.vstuc).
> * Visual Studio IDE running on Windows in a VM on Mac.
> * Visual Studio IDE running on Windows in a [VM in the Cloud](https://aka.ms/devbox).
>
> For more information, see [Visual Studio for Mac retirement announcement](https://devblogs.microsoft.com/visualstudio/visual-studio-for-mac-retirement-announcement).


---

## Configure MongoDB

Enable MongoDB and Mongo DB Shell access from anywhere on the development machine:

1. On Windows, MongoDB is installed at *C:\\Program Files\\MongoDB* by default. Add *C:\\Program Files\\MongoDB\\Server\\\<version_number>\\bin* to the `PATH` environment variable.
1. Download the MongoDB Shell and choose a directory to extract it to. Add the resulting path for `mongosh.exe` to the `PATH` environment variable.
1. Choose a directory on the development machine for storing the data. For example, *C:\\BooksData* on Windows. Create the directory if it doesn't exist. The mongo Shell doesn't create new directories.
1. In the OS command shell (not the MongoDB Shell), use the following command to connect to MongoDB on default port 27017. Replace `<data_directory_path>` with the directory chosen in the previous step.

   ```console
   mongod --dbpath <data_directory_path>
   ```

Use the previously installed MongoDB Shell in the following steps to create a database, make collections, and store documents. For more information on MongoDB Shell commands, see [`mongosh`](https://docs.mongodb.com/mongodb-shell/run-commands/).

1. Open a MongoDB command shell instance by launching `mongosh.exe`, or by running the following command in the command shell:

   ```console
   mongosh
   ```

1. In the command shell connect to the default test database by running:

   ```console
   use BookStore
   ```

   A database named *BookStore* is created if it doesn't already exist. If the database does exist, its connection is opened for transactions.

1. Create a `Books` collection using following command:

   ```console
   db.createCollection('Books')
   ```

   The following result is displayed:

   ```console
   { "ok" : 1 }
   ```

1. Define a schema for the `Books` collection and insert two documents using the following command:

   ```console
   db.Books.insertMany([{ "Name": "Design Patterns", "Price": 54.93, "Category": "Computers", "Author": "Ralph Johnson" }, { "Name": "Clean Code", "Price": 43.15, "Category": "Computers","Author": "Robert C. Martin" }])
   ```

   A result similar to the following is displayed:

   ```console
   {
       "acknowledged" : true,
       "insertedIds" : [
           ObjectId("61a6058e6c43f32854e51f51"),
           ObjectId("61a6058e6c43f32854e51f52")
        ]
    }
   ```
  
   > **Note:**
   > The `ObjectId`s shown in the preceding result won't match those shown in the command shell.

1. View the documents in the database using the following command:

   ```console
   db.Books.find().pretty()
   ```

   A result similar to the following is displayed:

   ```console
   {
        "_id" : ObjectId("61a6058e6c43f32854e51f51"),
        "Name" : "Design Patterns",
        "Price" : 54.93,
        "Category" : "Computers",
        "Author" : "Ralph Johnson"
    }
    {
        "_id" : ObjectId("61a6058e6c43f32854e51f52"),
        "Name" : "Clean Code",
        "Price" : 43.15,
        "Category" : "Computers",
        "Author" : "Robert C. Martin"
    }
   ```

   The schema adds an autogenerated `_id` property of type `ObjectId` for each document.

## Create the ASP.NET Core web API project

# [Visual Studio](#tab/visual-studio)

1. Go to **File** > **New** > **Project**.
1. Select the **ASP.NET Core Web API** project type, and select **Next**.
1. Name the project *BookStoreApi*, and select **Next**.
1. Select the **.NET 7.0 (Standard Term Support)** framework and select **Create**.
1. From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.
1. In the **Package Manager Console** window, navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```powershell
   Install-Package MongoDB.Driver
   ```

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in a command shell:

   ```dotnetcli
   dotnet new webapi -o BookStoreApi
   code BookStoreApi
   ```

   The preceding commands generate a new ASP.NET Core web API project and then open the project in Visual Studio Code.

1. Once the OmniSharp server starts up , a dialog asks **Required assets to build and debug are missing from 'BookStoreApi'. Add them?**. Select **Yes**.
1. Open the **Integrated Terminal** and run the following command to install the .NET driver for MongoDB:

   ```dotnetcli
   dotnet add package MongoDB.Driver
   ```

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. Select **File** > **New Solution** > **Web and Console** > **App** from the sidebar.
1. Select the **ASP.NET Core** > **API** C# project template, and select **Next**.
1. Select **.NET 7.0** from the **Target Framework** drop-down list, and select **Next**.
1. Enter *BookStoreApi* for the **Project Name**, and select **Create**.
1. In the **Solution** pad, right-click the project's **Dependencies** node and select **Add Packages**.
1. Enter *MongoDB.Driver* in the search box, select the *MongoDB.Driver* package, and select **Add Package**.
1. Select the **Accept** button in the **License Acceptance** dialog.

---

## Add an entity model

1. Add a *Models* directory to the project root.
1. Add a `Book` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/7.x/Book.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/7.x/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/7.x/Book.cs.md)

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/appsettings.json" highlight="2-6"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/appsettings.json)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/appsettings.json.md)

1. Add a `BookStoreDatabaseSettings` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs.md)

   The preceding `BookStoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookStoreDatabase` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs" id="snippet_BookStoreDatabaseSettings" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs.md)

   In the preceding code, the configuration instance to which the `appsettings.json` file's `BookStoreDatabase` section binds is registered in the Dependency Injection (DI) container. For example, the `BookStoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookStoreDatabase:ConnectionString` property in `appsettings.json`.

1. Add the following code to the top of `Program.cs` to resolve the `BookStoreDatabaseSettings` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs" id="snippet_UsingModels"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BooksService` class to the *Services* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Services/BooksService.cs" id="snippet_File"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Services/BooksService.cs.md)

   In the preceding code, a `BookStoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs" id="snippet_BooksService" highlight="7"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs.md)

   In the preceding code, the `BooksService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BooksService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.14/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Program.cs` to resolve the `BooksService` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs" id="snippet_UsingServices"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs.md)

The `BooksService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided the MongoDB connection string:

  [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Services/BooksService.cs" id="snippet_ctor" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Services/BooksService.cs.md)

* [IMongoDatabase](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_IMongoDatabase.htm): Represents the Mongo database for running operations. This tutorial uses the generic [GetCollection\<TDocument>(collection)](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoDatabase_GetCollection__1.htm) method on the interface to gain access to data in a specific collection. Run CRUD operations against the collection after this method is called. In the `GetCollection<TDocument>(collection)` method call:

  * `collection` represents the collection name.
  * `TDocument` represents the CLR object type stored in the collection.

`GetCollection<TDocument>(collection)` returns a [MongoCollection](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoCollection.htm) object representing the collection. In this tutorial, the following methods are invoked on the collection:

* [DeleteOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_DeleteOneAsync_1.htm): Deletes a single document matching the provided search criteria.
* [Find\<TDocument>](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollectionExtensions_Find__1.htm): Returns all documents in the collection matching the provided search criteria.
* [InsertOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_InsertOneAsync_1.htm): Inserts the provided object as a new document in the collection.
* [ReplaceOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_ReplaceOneAsync.htm): Replaces the single document matching the provided search criteria with the provided object.

## Add a controller

Add a `BooksController` class to the *Controllers* directory with the following code:

[language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Controllers/BooksController.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Controllers/BooksController.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Controllers/BooksController.cs.md)

The preceding web API controller:

* Uses the `BooksService` class to run CRUD operations.
* Contains action methods to support GET, POST, PUT, and DELETE HTTP requests.
* Calls [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) in the `Create` action method to return an [HTTP 201](https://www.rfc-editor.org/rfc/rfc9110#status.201) response. Status code 201 is the standard response for an HTTP POST method that creates a new resource on the server. `CreatedAtAction` also adds a `Location` header to the response. The `Location` header specifies the URI of the newly created book.

## Test the web API

1. Build and run the app.

1. Navigate to `https://localhost:<port>/api/books`, where `<port>` is the automatically assigned port number for the app, to test the controller's parameterless `Get` action method. A JSON response similar to the following is displayed:

   ```json
   [
     {
       "id": "61a6058e6c43f32854e51f51",
       "bookName": "Design Patterns",
       "price": 54.93,
       "category": "Computers",
       "author": "Ralph Johnson"
     },
     {
       "id": "61a6058e6c43f32854e51f52",
       "bookName": "Clean Code",
       "price": 43.15,
       "category": "Computers",
       "author": "Robert C. Martin"
     }
   ]
   ```

1. Navigate to `https://localhost:<port>/api/books/{id here}` to test the controller's overloaded `Get` action method. A JSON response similar to the following is displayed:

   ```json
   {
     "id": "61a6058e6c43f32854e51f52",
     "bookName": "Clean Code",
     "price": 43.15,
     "category": "Computers",
     "author": "Robert C. Martin"
   }
   ```

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the [Test the web API](#test-the-web-api) section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. In `Program.cs`, chain the following highlighted code on to the `AddControllers` method call:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs" id="snippet_AddControllers" highlight="10-11"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Program.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the [`[JsonPropertyName]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/Book.cs" id="snippet_BookName" highlight="2"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/Book.cs.md)

   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonProperty]` attribute reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/Book.cs" id="snippet_UsingSystemTextJsonSerialization"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi/Models/Book.cs.md)

1. Repeat the steps defined in the [Test the web API](#test-the-web-api) section. Notice the difference in JSON property names.

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples/7.x/BookStoreApi) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [web-api/index](../web-api/index.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)




**Applies to: \= aspnetcore-6.0**

This tutorial creates a web API that runs Create, Read, Update, and Delete (CRUD) operations on a [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database.

In this tutorial, you learn how to:

> 
> * Configure MongoDB
> * Create a MongoDB database
> * Define a MongoDB collection and schema
> * Perform MongoDB CRUD operations from a web API
> * Customize JSON serialization

## Prerequisites

* [MongoDB 6.0.5 or later](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/install/)

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio 2022 for Mac (latest version)](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
  
  > **Important:**
> Microsoft has announced the retirement of Visual Studio for Mac. Visual Studio for Mac will no longer be supported starting August 31, 2024. Alternatives include:
>
> * Visual Studio Code with the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) and related extensions, such as [.NET MAUI](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui) and [Unity](https://marketplace.visualstudio.com/items?itemName=visualstudiotoolsforunity.vstuc).
> * Visual Studio IDE running on Windows in a VM on Mac.
> * Visual Studio IDE running on Windows in a [VM in the Cloud](https://aka.ms/devbox).
>
> For more information, see [Visual Studio for Mac retirement announcement](https://devblogs.microsoft.com/visualstudio/visual-studio-for-mac-retirement-announcement).


---

## Configure MongoDB

Enable MongoDB and Mongo DB Shell access from anywhere on the development machine:

1. On Windows, MongoDB is installed at *C:\\Program Files\\MongoDB* by default. Add *C:\\Program Files\\MongoDB\\Server\\\<version_number>\\bin* to the `PATH` environment variable.
1. Download the MongoDB Shell and choose a directory to extract it to. Add the resulting path for `mongosh.exe` to the `PATH` environment variable.
1. Choose a directory on the development machine for storing the data. For example, *C:\\BooksData* on Windows. Create the directory if it doesn't exist. The mongo Shell doesn't create new directories.
1. In the OS command shell (not the MongoDB Shell), use the following command to connect to MongoDB on default port 27017. Replace `<data_directory_path>` with the directory chosen in the previous step.

   ```console
   mongod --dbpath <data_directory_path>
   ```

Use the previously installed MongoDB Shell in the following steps to create a database, make collections, and store documents. For more information on MongoDB Shell commands, see [`mongosh`](https://docs.mongodb.com/mongodb-shell/run-commands/).

1. Open a MongoDB command shell instance by launching `mongosh.exe`, or by running the following command in the command shell:

   ```console
   mongosh
   ```

1. In the command shell connect to the default test database by running:

   ```console
   use BookStore
   ```

   A database named *BookStore* is created if it doesn't already exist. If the database does exist, its connection is opened for transactions.

1. Create a `Books` collection using following command:

   ```console
   db.createCollection('Books')
   ```

   The following result is displayed:

   ```console
   { "ok" : 1 }
   ```

1. Define a schema for the `Books` collection and insert two documents using the following command:

   ```console
   db.Books.insertMany([{ "Name": "Design Patterns", "Price": 54.93, "Category": "Computers", "Author": "Ralph Johnson" }, { "Name": "Clean Code", "Price": 43.15, "Category": "Computers","Author": "Robert C. Martin" }])
   ```

   A result similar to the following is displayed:

   ```console
   {
       "acknowledged" : true,
       "insertedIds" : [
           ObjectId("61a6058e6c43f32854e51f51"),
           ObjectId("61a6058e6c43f32854e51f52")
        ]
    }
   ```
  
   > **Note:**
   > The `ObjectId`s shown in the preceding result won't match those shown in the command shell.

1. View the documents in the database using the following command:

   ```console
   db.Books.find().pretty()
   ```

   A result similar to the following is displayed:

   ```console
   {
        "_id" : ObjectId("61a6058e6c43f32854e51f51"),
        "Name" : "Design Patterns",
        "Price" : 54.93,
        "Category" : "Computers",
        "Author" : "Ralph Johnson"
    }
    {
        "_id" : ObjectId("61a6058e6c43f32854e51f52"),
        "Name" : "Clean Code",
        "Price" : 43.15,
        "Category" : "Computers",
        "Author" : "Robert C. Martin"
    }
   ```

   The schema adds an autogenerated `_id` property of type `ObjectId` for each document.

## Create the ASP.NET Core web API project

# [Visual Studio](#tab/visual-studio)

1. Go to **File** > **New** > **Project**.
1. Select the **ASP.NET Core Web API** project type, and select **Next**.
1. Name the project *BookStoreApi*, and select **Next**.
1. Select the **.NET 6.0 (Long-term support)** framework and select **Create**.
1. In the **Package Manager Console** window, navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```powershell
   Install-Package MongoDB.Driver
   ```

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in a command shell:

   ```dotnetcli
   dotnet new webapi -o BookStoreApi
   code BookStoreApi
   ```

   The preceding commands generate a new ASP.NET Core web API project and then open the project in Visual Studio Code.

1. Once the OmniSharp server starts up , a dialog asks **Required assets to build and debug are missing from 'BookStoreApi'. Add them?**. Select **Yes**.
1. Open the **Integrated Terminal** and run the following command to install the .NET driver for MongoDB:

   ```dotnetcli
   dotnet add package MongoDB.Driver
   ```

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. Select **File** > **New Solution** > **Web and Console** > **App** from the sidebar.
1. Select the **ASP.NET Core** > **API** C# project template, and select **Next**.
1. Select **.NET 6.0** from the **Target Framework** drop-down list, and select **Next**.
1. Enter *BookStoreApi* for the **Project Name**, and select **Create**.
1. In the **Solution** pad, right-click the project's **Dependencies** node and select **Add Packages**.
1. Enter *MongoDB.Driver* in the search box, select the *MongoDB.Driver* package, and select **Add Package**.
1. Select the **Accept** button in the **License Acceptance** dialog.

---

## Add an entity model

1. Add a *Models* directory to the project root.
1. Add a `Book` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/6.x/Book.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/6.x/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/6.x/Book.cs.md)

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/appsettings.json" highlight="2-6"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/appsettings.json)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/appsettings.json.md)

1. Add a `BookStoreDatabaseSettings` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs.md)

   The preceding `BookStoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookStoreDatabase` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_BookStoreDatabaseSettings" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

   In the preceding code, the configuration instance to which the `appsettings.json` file's `BookStoreDatabase` section binds is registered in the Dependency Injection (DI) container. For example, the `BookStoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookStoreDatabase:ConnectionString` property in `appsettings.json`.

1. Add the following code to the top of `Program.cs` to resolve the `BookStoreDatabaseSettings` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_UsingModels"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BooksService` class to the *Services* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs" id="snippet_File"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs.md)

   In the preceding code, a `BookStoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_BooksService" highlight="7"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

   In the preceding code, the `BooksService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BooksService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.14/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Program.cs` to resolve the `BooksService` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_UsingServices"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

The `BooksService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided the MongoDB connection string:

  [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs" id="snippet_ctor" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs.md)

* [IMongoDatabase](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_IMongoDatabase.htm): Represents the Mongo database for running operations. This tutorial uses the generic [GetCollection\<TDocument>(collection)](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoDatabase_GetCollection__1.htm) method on the interface to gain access to data in a specific collection. Run CRUD operations against the collection after this method is called. In the `GetCollection<TDocument>(collection)` method call:

  * `collection` represents the collection name.
  * `TDocument` represents the CLR object type stored in the collection.

`GetCollection<TDocument>(collection)` returns a [MongoCollection](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoCollection.htm) object representing the collection. In this tutorial, the following methods are invoked on the collection:

* [DeleteOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_DeleteOneAsync_1.htm): Deletes a single document matching the provided search criteria.
* [Find\<TDocument>](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollectionExtensions_Find__1.htm): Returns all documents in the collection matching the provided search criteria.
* [InsertOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_InsertOneAsync_1.htm): Inserts the provided object as a new document in the collection.
* [ReplaceOneAsync](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_ReplaceOneAsync.htm): Replaces the single document matching the provided search criteria with the provided object.

## Add a controller

Add a `BooksController` class to the *Controllers* directory with the following code:

[language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Controllers/BooksController.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Controllers/BooksController.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Controllers/BooksController.cs.md)

The preceding web API controller:

* Uses the `BooksService` class to run CRUD operations.
* Contains action methods to support GET, POST, PUT, and DELETE HTTP requests.
* Calls [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) in the `Create` action method to return an [HTTP 201](https://www.rfc-editor.org/rfc/rfc9110#status.201) response. Status code 201 is the standard response for an HTTP POST method that creates a new resource on the server. `CreatedAtAction` also adds a `Location` header to the response. The `Location` header specifies the URI of the newly created book.

## Test the web API

1. Build and run the app.

1. Navigate to `https://localhost:<port>/api/books`, where `<port>` is the automatically assigned port number for the app, to test the controller's parameterless `Get` action method. A JSON response similar to the following is displayed:

   ```json
   [
     {
       "id": "61a6058e6c43f32854e51f51",
       "bookName": "Design Patterns",
       "price": 54.93,
       "category": "Computers",
       "author": "Ralph Johnson"
     },
     {
       "id": "61a6058e6c43f32854e51f52",
       "bookName": "Clean Code",
       "price": 43.15,
       "category": "Computers",
       "author": "Robert C. Martin"
     }
   ]
   ```

1. Navigate to `https://localhost:<port>/api/books/{id here}` to test the controller's overloaded `Get` action method. A JSON response similar to the following is displayed:

   ```json
   {
     "id": "61a6058e6c43f32854e51f52",
     "bookName": "Clean Code",
     "price": 43.15,
     "category": "Computers",
     "author": "Robert C. Martin"
   }
   ```

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the [Test the web API](#test-the-web-api) section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. In `Program.cs`, chain the following highlighted code on to the `AddControllers` method call:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_AddControllers" highlight="10-11"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the [`[JsonPropertyName]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs" id="snippet_BookName" highlight="2"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs.md)

   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonProperty]` attribute reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs" id="snippet_UsingSystemTextJsonSerialization"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs.md)

1. Repeat the steps defined in the [Test the web API](#test-the-web-api) section. Notice the difference in JSON property names.

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [web-api/index](../web-api/index.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)




**Applies to: < aspnetcore-6.0**

This tutorial creates a web API that runs Create, Read, Update, and Delete (CRUD) operations on a [MongoDB](https://www.mongodb.com/what-is-mongodb) NoSQL database.

In this tutorial, you learn how to:

> 
> * Configure MongoDB
> * Create a MongoDB database
> * Define a MongoDB collection and schema
> * Perform MongoDB CRUD operations from a web API
> * Customize JSON serialization

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [.NET Core SDK 3.0 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

# [Visual Studio Code](#tab/visual-studio-code)

* [.NET Core SDK 3.0 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

# [Visual Studio for Mac](#tab/visual-studio-mac)

* [.NET Core SDK 3.0 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [Visual Studio for Mac version 7.7 or later](https://visualstudio.microsoft.com/downloads/)
* [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

---

## Configure MongoDB

If using Windows, MongoDB is installed at *C:\\Program Files\\MongoDB* by default. Add *C:\\Program Files\\MongoDB\\Server\\\<version_number>\\bin* to the `Path` environment variable. This change enables MongoDB access from anywhere on your development machine.

Use the mongo Shell in the following steps to create a database, make collections, and store documents. For more information on mongo Shell commands, see [Working with the mongo Shell](https://www.mongodb.com/docs/mongodb-shell).

1. Choose a directory on your development machine for storing the data. For example, *C:\\BooksData* on Windows. Create the directory if it doesn't exist. The mongo Shell doesn't create new directories.
1. Open a command shell. Run the following command to connect to MongoDB on default port 27017. Remember to replace `<data_directory_path>` with the directory you chose in the previous step.

   ```console
   mongod --dbpath <data_directory_path>
   ```

1. Open another command shell instance. Connect to the default test database by running the following command:

   ```console
   mongo
   ```

1. Run the following command in a command shell:

   ```console
   use BookstoreDb
   ```

   A database named *BookstoreDb* is created if it doesn't already exist. If the database does exist, its connection is opened for transactions.

1. Create a `Books` collection using following command:

   ```console
   db.createCollection('Books')
   ```

   The following result is displayed:

   ```console
   { "ok" : 1 }
   ```

1. Define a schema for the `Books` collection and insert two documents using the following command:

   ```console
   db.Books.insertMany([{'Name':'Design Patterns','Price':54.93,'Category':'Computers','Author':'Ralph Johnson'}, {'Name':'Clean Code','Price':43.15,'Category':'Computers','Author':'Robert C. Martin'}])
   ```

   The following result is displayed:

   ```console
   {
     "acknowledged" : true,
     "insertedIds" : [
       ObjectId("5bfd996f7b8e48dc15ff215d"),
       ObjectId("5bfd996f7b8e48dc15ff215e")
     ]
   }
   ```
  
   > **Note:**
   > The ID's shown in this article will not match the IDs when you run this sample.

1. View the documents in the database using the following command:

   ```console
   db.Books.find({}).pretty()
   ```

   The following result is displayed:

   ```console
   {
     "_id" : ObjectId("5bfd996f7b8e48dc15ff215d"),
     "Name" : "Design Patterns",
     "Price" : 54.93,
     "Category" : "Computers",
     "Author" : "Ralph Johnson"
   }
   {
     "_id" : ObjectId("5bfd996f7b8e48dc15ff215e"),
     "Name" : "Clean Code",
     "Price" : 43.15,
     "Category" : "Computers",
     "Author" : "Robert C. Martin"
   }
   ```

   The schema adds an autogenerated `_id` property of type `ObjectId` for each document.

The database is ready. You can start creating the ASP.NET Core web API.

## Create the ASP.NET Core web API project

# [Visual Studio](#tab/visual-studio)

1. Go to **File** > **New** > **Project**.
1. Select the **ASP.NET Core Web Application** project type, and select **Next**.
1. Name the project *BooksApi*, and select **Create**.
1. Select the **.NET Core** target framework and **ASP.NET Core 3.0**. Select the **API** project template, and select **Create**.
1. Visit the [NuGet Gallery: MongoDB.Driver](https://www.nuget.org/packages/MongoDB.Driver/) to determine the latest stable version of the .NET driver for MongoDB. In the **Package Manager Console** window, navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```powershell
   Install-Package MongoDB.Driver -Version {VERSION}
   ```

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in a command shell:

   ```dotnetcli
   dotnet new webapi -o BooksApi
   code BooksApi
   ```

   A new ASP.NET Core web API project targeting .NET Core is generated and opened in Visual Studio Code.

1. After the status bar's OmniSharp flame icon turns green, a dialog asks **Required assets to build and debug are missing from 'BooksApi'. Add them?**. Select **Yes**.
1. Visit the [NuGet Gallery: MongoDB.Driver](https://www.nuget.org/packages/MongoDB.Driver/) to determine the latest stable version of the .NET driver for MongoDB. Open **Integrated Terminal** and navigate to the project root. Run the following command to install the .NET driver for MongoDB:

   ```dotnetcli
   dotnet add BooksApi.csproj package MongoDB.Driver -v {VERSION}
   ```

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. In Visual Studio for Mac earlier than version 8.6, select **File** > **New Solution** > **.NET Core** > **App** from the sidebar. In version 8.6 or later, select **File** > **New Solution** > **Web and Console** > **App** from the sidebar.
1. Select the **ASP.NET Core** > **API** C# project template, and select **Next**.
1. Select **.NET Core 3.1** from the **Target Framework** drop-down list, and select **Next**.
1. Enter *BooksApi* for the **Project Name**, and select **Create**.
1. In the **Solution** pad, right-click the project's **Dependencies** node and select **Add Packages**.
1. Enter *MongoDB.Driver* in the search box, select the *MongoDB.Driver* package, and select **Add Package**.
1. Select the **Accept** button in the **License Acceptance** dialog.

---

## Add an entity model

1. Add a *Models* directory to the project root.
1. Add a `Book` class to the *Models* directory with the following code:

   ```csharp
   using MongoDB.Bson;
   using MongoDB.Bson.Serialization.Attributes;

   namespace BooksApi.Models
   {
       public class Book
       {
           [BsonId]
           [BsonRepresentation(BsonType.ObjectId)]
           public string Id { get; set; }

           [BsonElement("Name")]
           public string BookName { get; set; }

           public decimal Price { get; set; }

           public string Category { get; set; }

           public string Author { get; set; }
       }
   }
   ```

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/appsettings.json" highlight="2-6"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/appsettings.json)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/appsettings.json.md)

1. Add a `BookstoreDatabaseSettings.cs` file to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/BookstoreDatabaseSettings.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/BookstoreDatabaseSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/BookstoreDatabaseSettings.cs.md)

   The preceding `BookstoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookstoreDatabaseSettings` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Startup.ConfigureServices`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddDbSettings.cs" highlight="3-8"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddDbSettings.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddDbSettings.cs.md)

   In the preceding code:

   * The configuration instance to which the `appsettings.json` file's `BookstoreDatabaseSettings` section binds is registered in the Dependency Injection (DI) container. For example, a `BookstoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookstoreDatabaseSettings:ConnectionString` property in `appsettings.json`.
   * The `IBookstoreDatabaseSettings` interface is registered in DI with a singleton [service lifetime](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes). When injected, the interface instance resolves to a `BookstoreDatabaseSettings` object.

1. Add the following code to the top of `Startup.cs` to resolve the `BookstoreDatabaseSettings` and `IBookstoreDatabaseSettings` references:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs" id="snippet_UsingBooksApiModels"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BookService` class to the *Services* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Services/BookService.cs" id="snippet_BookServiceClass"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Services/BookService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Services/BookService.cs.md)

   In the preceding code, an `IBookstoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Startup.ConfigureServices`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddSingletonService.cs" highlight="9"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddSingletonService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/3.x/SampleApp/Startup.ConfigureServices.AddSingletonService.cs.md)

   In the preceding code, the `BookService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BookService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.8/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Startup.cs` to resolve the `BookService` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs" id="snippet_UsingBooksApiServices"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs.md)

The `BookService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided the MongoDB connection string:

  [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Services/BookService.cs" id="snippet_BookServiceConstructor" highlight="3"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Services/BookService.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Services/BookService.cs.md)

* [IMongoDatabase](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Driver_IMongoDatabase.htm): Represents the Mongo database for running operations. This tutorial uses the generic [GetCollection\<TDocument>(collection)](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/M_MongoDB_Driver_IMongoDatabase_GetCollection__1.htm) method on the interface to gain access to data in a specific collection. Run CRUD operations against the collection after this method is called. In the `GetCollection<TDocument>(collection)` method call:

  * `collection` represents the collection name.
  * `TDocument` represents the CLR object type stored in the collection.

`GetCollection<TDocument>(collection)` returns a [MongoCollection](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/T_MongoDB_Driver_MongoCollection.htm) object representing the collection. In this tutorial, the following methods are invoked on the collection:

* [DeleteOne](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_DeleteOne.htm): Deletes a single document matching the provided search criteria.
* [Find\<TDocument>](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/M_MongoDB_Driver_IMongoCollectionExtensions_Find__1_1.htm): Returns all documents in the collection matching the provided search criteria.
* [InsertOne](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_InsertOne.htm): Inserts the provided object as a new document in the collection.
* [ReplaceOne](https://mongodb.github.io/mongo-csharp-driver/2.11/apidocs/html/M_MongoDB_Driver_IMongoCollection_1_ReplaceOne.htm): Replaces the single document matching the provided search criteria with the provided object.

## Add a controller

Add a `BooksController` class to the *Controllers* directory with the following code:

[language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Controllers/BooksController.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Controllers/BooksController.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Controllers/BooksController.cs.md)

The preceding web API controller:

* Uses the `BookService` class to run CRUD operations.
* Contains action methods to support GET, POST, PUT, and DELETE HTTP requests.
* Calls [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtRoute%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtRoute%252A) in the `Create` action method to return an [HTTP 201](https://www.rfc-editor.org/rfc/rfc9110#status.201) response. Status code 201 is the standard response for an HTTP POST method that creates a new resource on the server. `CreatedAtRoute` also adds a `Location` header to the response. The `Location` header specifies the URI of the newly created book.

## Test the web API

1. Build and run the app.

1. Navigate to `https://localhost:<port>/api/books` to test the controller's parameterless `Get` action method. The following JSON response is displayed:

   ```json
   [
     {
       "id":"5bfd996f7b8e48dc15ff215d",
       "bookName":"Design Patterns",
       "price":54.93,
       "category":"Computers",
       "author":"Ralph Johnson"
     },
     {
       "id":"5bfd996f7b8e48dc15ff215e",
       "bookName":"Clean Code",
       "price":43.15,
       "category":"Computers",
       "author":"Robert C. Martin"
     }
   ]
   ```

1. Navigate to `https://localhost:<port>/api/books/{id here}` to test the controller's overloaded `Get` action method. The following JSON response is displayed:

   ```json
   {
     "id":"{ID}",
     "bookName":"Clean Code",
     "price":43.15,
     "category":"Computers",
     "author":"Robert C. Martin"
   }
   ```

## Configure JSON serialization options

There are two details to change about the JSON responses returned in the [Test the web API](#test-the-web-api) section:

* The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
* The `bookName` property should be returned as `Name`.

To satisfy the preceding requirements, make the following changes:

1. Json.NET has been removed from ASP.NET shared framework. Add a package reference to [`Microsoft.AspNetCore.Mvc.NewtonsoftJson`](https://nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson).

1. In `Startup.ConfigureServices`, chain the following highlighted code on to the `AddControllers` method call:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs" id="snippet_ConfigureServices" highlight="12"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Startup.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the following [`[JsonProperty]`](https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_JsonPropertyAttribute.htm) attribute:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/Book.cs" id="snippet_BookNameProperty" highlight="2"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/Book.cs.md)

   The `[JsonProperty]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonProperty]` attribute reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/Book.cs" id="snippet_NewtonsoftJsonImport"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/Book.cs)](../../_code/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp/Models/Book.cs.md)

1. Repeat the steps defined in the [Test the web API](#test-the-web-api) section. Notice the difference in JSON property names.

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende IdentityServer](https://docs.duendesoftware.com). Duende IdentityServer is 3rd party product.

Duende IdentityServer is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende IdentityServer enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

For more information, see [Overview of Duende IdentityServer](https://docs.duendesoftware.com).

For more information on other authentication providers, see [Community OSS authentication options for ASP.NET Core](../security/authentication/community.md)


## Next steps

For more information on building ASP.NET Core web APIs, see the following resources:

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mongo-app/samples/3.x/SampleApp) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [YouTube version of this article](https://www.youtube.com/watch?v=7uJt_sOenyo&feature=youtu.be)
* [web-api/index](../web-api/index.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)
