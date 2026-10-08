---
title: Custom storage providers for ASP.NET Core Identity
author: ardalis
description: Learn how to configure custom storage providers for ASP.NET Core Identity.
ms.author: wpickett
ms.date: 01/29/2026
uid: security/authentication/identity-custom-storage-providers
---
<!-- ms.sfi.ropc: t -->
# Custom storage providers for ASP.NET Core Identity

By [Steve Smith](https://ardalis.com/)

ASP.NET Core Identity is an extensible system which enables you to create a custom storage provider and connect it to your app. This topic describes how to create a customized storage provider for ASP.NET Core Identity. It covers the important concepts for creating your own storage provider, but isn't a step-by-step walk through. See [Identity model customization](customize-identity-model.md) to customize an Identity model.

## Introduction

By default, the ASP.NET Core Identity system stores user information in a SQL Server database using Entity Framework Core. For many apps, this approach works well. However, you may prefer to use a different persistence mechanism or data schema. For example:

* You use [Azure Table Storage](https://learn.microsoft.com/azure/storage/) or another data store.
* Your database tables have a different structure.
* You may wish to use a different data access approach, such as [Dapper](https://github.com/DapperLib/Dapper).

In each of these cases, you can write a customized provider for your storage mechanism and plug that provider into your app.

ASP.NET Core Identity is included in project templates in Visual Studio with the "Individual Accounts" option.

When using the .NET CLI, add `-au Individual`:

```dotnetcli
dotnet new mvc -au Individual
```

## The ASP.NET Core Identity architecture

ASP.NET Core Identity consists of classes called managers and stores. *Managers* are high-level classes which an app developer uses to perform operations, such as creating an Identity user. *Stores* are lower-level classes that specify how entities, such as users and roles, are persisted. Stores follow the repository pattern and are closely coupled with the persistence mechanism. Managers are decoupled from stores, which means you can replace the persistence mechanism without changing your application code (except for configuration).

The following diagram shows how a web app interacts with the managers, while stores interact with the data access layer.

ASP.NET Core Apps work with Managers (for example, UserManager, RoleManager). Managers work with Stores (for example, UserStore) which communicate with a Data Source using a library like Entity Framework Core.

To create a custom storage provider, create the data source, the data access layer, and the store classes that interact with this data access layer (the green and grey boxes in the diagram above). You don't need to customize the managers or your app code that interacts with them (the blue boxes above).

When creating a new instance of `UserManager` or `RoleManager` you provide the type of the user class and pass an instance of the store class as an argument. This approach enables you to plug your customized classes into ASP.NET Core.

[Reconfigure app to use new storage provider](#reconfigure-app-to-use-a-new-storage-provider) shows how to instantiate `UserManager` and `RoleManager` with a customized store.

## ASP.NET Core Identity stores data types

[ASP.NET Core Identity](https://github.com/aspnet/identity) data types are detailed in the following sections:

### Users

Registered users of your web site. The [Microsoft.AspNet.Identity.CoreCompat.IdentityUser](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.IdentityUser) type may be extended or used as an example for your own custom type. You don't need to inherit from a particular type to implement your own custom identity storage solution.

### User Claims

A set of statements (or [Claims](https://learn.microsoft.com/search/?terms=System.Security.Claims.Claim)) about the user that represent the user's identity. Can enable greater expression of the user's identity than can be achieved through roles.

### User Logins

Information about the external authentication provider (like Facebook or a Microsoft account) to use when logging in a user. [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.IdentityUserLogin)

### Roles

Authorization groups for your site. Includes the role Id and role name (like "Admin" or "Employee"). [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.IdentityRole)

## The data access layer

This topic assumes you are familiar with the persistence mechanism that you are going to use and how to create entities for that mechanism. This topic doesn't provide details about how to create the repositories or data access classes; it provides some suggestions about design decisions when working with ASP.NET Core Identity.

You have a lot of freedom when designing the data access layer for a customized store provider. You only need to create persistence mechanisms for features that you intend to use in your app. For example, if you are not using roles in your app, you don't need to create storage for roles or user role associations. Your technology and existing infrastructure may require a structure that's very different from the default implementation of ASP.NET Core Identity. In your data access layer, you provide the logic to work with the structure of your storage implementation.

The data access layer provides the logic to save the data from ASP.NET Core Identity to a data source. The data access layer for your customized storage provider might include the following classes to store user and role information.

### Context class

Encapsulates the information to connect to your persistence mechanism and execute queries. Several data classes require an instance of this class, typically provided through dependency injection. [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.IdentityDbContext%25601).

### User Storage

Stores and retrieves user information (such as user name and password hash). [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.UserStore%25601)

### Role Storage

Stores and retrieves role information (such as the role name). [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.RoleStore%25601)

### UserClaims Storage

Stores and retrieves user claim information (such as the claim type and value). [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.UserStore%25601)

### UserLogins Storage

Stores and retrieves user login information (such as an external authentication provider). [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.UserStore%25601)

### UserRole Storage

Stores and retrieves which roles are assigned to which users. [Example](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.UserStore%25601)

**TIP:** Only implement the classes you intend to use in your app.

In the data access classes, provide code to perform data operations for your persistence mechanism. For example, within a custom provider, you might have the following code to create a new user in the *store* class:

[Code example (complete source file; reference: identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/CustomUserStore.cs?name=createuser\&highlight=7)](../../../_code/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/CustomUserStore.cs.md)

The implementation logic for creating the user is in the `_usersTable.CreateAsync` method, shown below.

## Customize the user class

When implementing a storage provider, create a user class which is equivalent to the [IdentityUser class](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fcustomize_identity_model%23model-generic-types).

At a minimum, your user class must include an `Id` and a `UserName` property.

The `IdentityUser` class defines the properties that the `UserManager` calls when performing requested operations. The default type of the `Id` property is a string, but you can inherit from `IdentityUser<TKey, TUserClaim, TUserRole, TUserLogin, TUserToken>` and specify a different type. The framework expects the storage implementation to handle data type conversions.

## Customize the user store

Create a `UserStore` class that provides the methods for all data operations on the user. This class is equivalent to the [Microsoft.AspNetCore.Identity.EntityFrameworkCore.UserStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.UserStore%25601) class. In your `UserStore` class, implement `IUserStore<TUser>` and the optional interfaces required. You select which optional interfaces to implement based on the functionality provided in your app.

### Optional interfaces

* [IUserRoleStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserRoleStore%25601)
* [IUserClaimStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserClaimStore%25601)
* [IUserPasswordStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserPasswordStore%25601)
* [IUserSecurityStampStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserSecurityStampStore%25601)
* [IUserEmailStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserEmailStore%25601)
* [IUserPhoneNumberStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserPhoneNumberStore%25601)
* [IQueryableUserStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IQueryableUserStore%25601)
* [IUserLoginStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserLoginStore%25601)
* [IUserTwoFactorStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserTwoFactorStore%25601)
* [IUserLockoutStore](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserLockoutStore%25601)

The optional interfaces inherit from `IUserStore<TUser>`. You can see a partially implemented sample user store in the [sample app](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/CustomUserStore.cs).

Within the `UserStore` class, you use the data access classes that you created to perform operations. These are passed in using dependency injection. For example, in the SQL Server with Dapper implementation, the `UserStore` class has the `CreateAsync` method which uses an instance of `DapperUsersTable` to insert a new record:

[Code example (complete source file; reference: identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/DapperUsersTable.cs?name=createuser\&highlight=7)](../../../_code/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/DapperUsersTable.cs.md)

### Interfaces to implement when customizing user store

* **IUserStore**  
 The [Microsoft.AspNetCore.Identity.IUserStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserStore%25601) interface is the only interface you must implement in the user store. It defines methods for creating, updating, deleting, and retrieving users.
* **IUserClaimStore**  
 The [Microsoft.AspNetCore.Identity.IUserClaimStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserClaimStore%25601) interface defines the methods you implement to enable user claims. It contains methods for adding, removing and retrieving user claims.
* **IUserLoginStore**  
 The [Microsoft.AspNetCore.Identity.IUserLoginStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserLoginStore%25601) defines the methods you implement to enable external authentication providers. It contains methods for adding, removing and retrieving user logins, and a method for retrieving a user based on the login information.
* **IUserRoleStore**  
 The [Microsoft.AspNetCore.Identity.IUserRoleStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserRoleStore%25601) interface defines the methods you implement to map a user to a role. It contains methods to add, remove, and retrieve a user's roles, and a method to check if a user is assigned to a role.
* **IUserPasswordStore**  
 The [Microsoft.AspNetCore.Identity.IUserPasswordStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserPasswordStore%25601) interface defines the methods you implement to persist hashed passwords. It contains methods for getting and setting the hashed password, and a method that indicates whether the user has set a password.
* **IUserSecurityStampStore**  
 The [Microsoft.AspNetCore.Identity.IUserSecurityStampStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserSecurityStampStore%25601) interface defines the methods you implement to use a security stamp for indicating whether the user's account information has changed. This stamp is updated when a user changes the password, or adds or removes logins. It contains methods for getting and setting the security stamp.
* **IUserTwoFactorStore**  
 The [Microsoft.AspNetCore.Identity.IUserTwoFactorStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserTwoFactorStore%25601) interface defines the methods you implement to support two factor authentication. It contains methods for getting and setting whether two factor authentication is enabled for a user.
* **IUserPhoneNumberStore**  
 The [Microsoft.AspNetCore.Identity.IUserPhoneNumberStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserPhoneNumberStore%25601) interface defines the methods you implement to store user phone numbers. It contains methods for getting and setting the phone number and whether the phone number is confirmed.
* **IUserEmailStore**  
 The [Microsoft.AspNetCore.Identity.IUserEmailStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserEmailStore%25601) interface defines the methods you implement to store user email addresses. It contains methods for getting and setting the email address and whether the email is confirmed.
* **IUserLockoutStore**  
 The [Microsoft.AspNetCore.Identity.IUserLockoutStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserLockoutStore%25601) interface defines the methods you implement to store information about locking an account. It contains methods for tracking failed access attempts and lockouts.
* **IQueryableUserStore**  
 The [Microsoft.AspNetCore.Identity.IQueryableUserStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IQueryableUserStore%25601) interface defines the members you implement to provide a queryable user store.

You implement only the interfaces that are needed in your app. For example:

```csharp
public class UserStore : IUserStore<IdentityUser>,
                         IUserClaimStore<IdentityUser>,
                         IUserLoginStore<IdentityUser>,
                         IUserRoleStore<IdentityUser>,
                         IUserPasswordStore<IdentityUser>,
                         IUserSecurityStampStore<IdentityUser>
{
    // interface implementations not shown
}
```

### IdentityUserClaim, IdentityUserLogin, and IdentityUserRole

The `Microsoft.AspNet.Identity.EntityFramework` namespace contains implementations of the [IdentityUserClaim](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim%25601), [Microsoft.AspNet.Identity.CoreCompat.IdentityUserLogin](https://learn.microsoft.com/search/?terms=Microsoft.AspNet.Identity.CoreCompat.IdentityUserLogin), and [IdentityUserRole](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole%25601) classes. If you are using these features, you may want to create your own versions of these classes and define the properties for your app. However, sometimes it's more efficient to not load these entities into memory when performing basic operations (such as adding or removing a user's claim). Instead, the backend store classes can execute these operations directly on the data source. For example, the `UserStore.GetClaimsAsync` method can call the `userClaimTable.FindByUserId(user.Id)` method to execute a query on that table directly and return a list of claims.

## Customize the role class

When implementing a role storage provider, you can create a custom role type. It need not implement a particular interface, but it must have an `Id` and typically it will have a `Name` property.

The following is an example role class:

[Code example (complete source file; reference: identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/ApplicationRole.cs)](../../../_code/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample/CustomProvider/ApplicationRole.cs.md)

## Customize the role store

You can create a `RoleStore` class that provides the methods for all data operations on roles. This class is equivalent to the [RoleStore\<TRole>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.RoleStore%25601) class. In the `RoleStore` class, you implement the `IRoleStore<TRole>` and optionally the `IQueryableRoleStore<TRole>` interface.

* **IRoleStore&lt;TRole&gt;**  
 The [Microsoft.AspNetCore.Identity.IRoleStore%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IRoleStore%25601) interface defines the methods to implement in the role store class. It contains methods for creating, updating, deleting, and retrieving roles.
* **RoleStore&lt;TRole&gt;**  
 To customize `RoleStore`, create a class that implements the `IRoleStore<TRole>` interface. 

## Reconfigure app to use a new storage provider

Once you have implemented a storage provider, you configure your app to use it. If your app used the default provider, replace it with your custom provider.

1. Remove the `Microsoft.AspNetCore.Identity.EntityFrameworkCore` NuGet package.
1. If the storage provider resides in a separate project or package, add a reference to it.
1. Replace all references to `Microsoft.AspNetCore.Identity.EntityFrameworkCore` with a using statement for the namespace of your storage provider.
1. Change the `AddIdentity` method to use the custom types. You can create your own extension methods for this purpose. See [IdentityServiceCollectionExtensions](https://github.com/aspnet/Identity/blob/rel/1.1.0/src/Microsoft.AspNetCore.Identity/IdentityServiceCollectionExtensions.cs) for an example.
1. If you are using Roles, update the `RoleManager` to use your `RoleStore` class.
1. Update the connection string and credentials to your app's configuration.

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password credential (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see [security/index#secure-authentication-flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


Example:

**Applies to: < aspnetcore-6.0**

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Add identity types
    services.AddIdentity<ApplicationUser, ApplicationRole>()
        .AddDefaultTokenProviders();

    // Identity Services
    services.AddTransient<IUserStore<ApplicationUser>, CustomUserStore>();
    services.AddTransient<IRoleStore<ApplicationRole>, CustomRoleStore>();
    string connectionString = Configuration.GetConnectionString("DefaultConnection");
    services.AddTransient<SqlConnection>(e => new SqlConnection(connectionString));
    services.AddTransient<DapperUsersTable>();

    // additional configuration
}
```



**Applies to: \>= aspnetcore-6.0**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add identity types
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddDefaultTokenProviders();

// Identity Services
builder.Services.AddTransient<IUserStore<ApplicationUser>, CustomUserStore>();
builder.Services.AddTransient<IRoleStore<ApplicationRole>, CustomRoleStore>();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddTransient<SqlConnection>(e => new SqlConnection(connectionString));
builder.Services.AddTransient<DapperUsersTable>();

// additional configuration

builder.Services.AddRazorPages();

var app = builder.Build();
```



## References

* [Identity model customization](customize-identity-model.md)
* [Custom Storage Providers for ASP.NET 4.x Identity](https://learn.microsoft.com/aspnet/identity/overview/extensibility/overview-of-custom-storage-providers-for-aspnet-identity)
* [ASP.NET Core Identity](https://github.com/dotnet/AspNetCore/tree/main/src/Identity): This repository includes links to community maintained store providers.
* [View or download sample from GitHub](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample).
