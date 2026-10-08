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

   [language="csharp" source="\~/tutorials/first-mongo-app/samples_snapshot/6.x/Book.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples_snapshot/6.x/Book.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples_snapshot/6.x/Book.cs.md)

   In the preceding class, the `Id` property is:

   * Required for mapping the Common Language Runtime (CLR) object to the MongoDB collection.
   * Annotated with [`[BsonId]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonIdAttribute.htm) to make this property the document's primary key.
   * Annotated with [`[BsonRepresentation(BsonType.ObjectId)]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonRepresentationAttribute.htm) to allow passing the parameter as type `string` instead of an [ObjectId](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_ObjectId.htm) structure. Mongo handles the conversion from `string` to `ObjectId`.

   The `BookName` property is annotated with the [`[BsonElement]`](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Bson_Serialization_Attributes_BsonElementAttribute.htm) attribute. The attribute's value of `Name` represents the property name in the MongoDB collection.

## Add a configuration model

1. Add the following database configuration values to `appsettings.json`:

   [language="json" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/appsettings.json" highlight="2-6"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/appsettings.json)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/appsettings.json.md)

1. Add a `BookStoreDatabaseSettings` class to the *Models* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/BookStoreDatabaseSettings.cs.md)

   The preceding `BookStoreDatabaseSettings` class is used to store the `appsettings.json` file's `BookStoreDatabase` property values. The JSON and C# property names are named identically to ease the mapping process.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_BookStoreDatabaseSettings" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

   In the preceding code, the configuration instance to which the `appsettings.json` file's `BookStoreDatabase` section binds is registered in the Dependency Injection (DI) container. For example, the `BookStoreDatabaseSettings` object's `ConnectionString` property is populated with the `BookStoreDatabase:ConnectionString` property in `appsettings.json`.

1. Add the following code to the top of `Program.cs` to resolve the `BookStoreDatabaseSettings` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_UsingModels"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

## Add a CRUD operations service

1. Add a *Services* directory to the project root.
1. Add a `BooksService` class to the *Services* directory with the following code:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs" id="snippet_File"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs.md)

   In the preceding code, a `BookStoreDatabaseSettings` instance is retrieved from DI via constructor injection. This technique provides access to the `appsettings.json` configuration values that were added in the [Add a configuration model](#add-a-configuration-model) section.

1. Add the following highlighted code to `Program.cs`:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_BooksService" highlight="7"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

   In the preceding code, the `BooksService` class is registered with DI to support constructor injection in consuming classes. The singleton service lifetime is most appropriate because `BooksService` takes a direct dependency on `MongoClient`. Per the official [Mongo Client reuse guidelines](https://mongodb.github.io/mongo-csharp-driver/2.14/reference/driver/connecting/#re-use), `MongoClient` should be registered in DI with a singleton service lifetime.

1. Add the following code to the top of `Program.cs` to resolve the `BooksService` reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_UsingServices"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

The `BooksService` class uses the following `MongoDB.Driver` members to run CRUD operations against the database:

* [MongoClient](https://mongodb.github.io/mongo-csharp-driver/2.14/apidocs/html/T_MongoDB_Driver_MongoClient.htm): Reads the server instance for running database operations. The constructor of this class is provided the MongoDB connection string:

  [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs" id="snippet_ctor" highlight="4-5"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Services/BooksService.cs.md)

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

[language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Controllers/BooksController.cs"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Controllers/BooksController.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Controllers/BooksController.cs.md)

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

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs" id="snippet_AddControllers" highlight="10-11"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Program.cs.md)

   With the preceding change, property names in the web API's serialized JSON response match their corresponding property names in the CLR object type. For example, the `Book` class's `Author` property serializes as `Author` instead of `author`.

1. In `Models/Book.cs`, annotate the `BookName` property with the [`[JsonPropertyName]`](https://learn.microsoft.com/search/?terms=System.Text.Json.Serialization.JsonPropertyNameAttribute) attribute:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs" id="snippet_BookName" highlight="2"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs.md)

   The `[JsonPropertyName]` attribute's value of `Name` represents the property name in the web API's serialized JSON response.

1. Add the following code to the top of `Models/Book.cs` to resolve the `[JsonProperty]` attribute reference:

   [language="csharp" source="\~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs" id="snippet_UsingSystemTextJsonSerialization"::: (complete source file; reference: \~/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs)](../../../../_code/aspnetcore/tutorials/first-mongo-app/samples/6.x/BookStoreApi/Models/Book.cs.md)

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
* [web-api/index](../../../web-api/index.md)
* [web-api/action-return-types](../../../web-api/action-return-types.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)
