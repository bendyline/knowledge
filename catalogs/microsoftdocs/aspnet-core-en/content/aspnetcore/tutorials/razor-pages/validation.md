---
title: Part 8, add validation
ai-usage: ai-assisted
author: wadepickett
description: Part 8 of tutorial series on Razor Pages.
ms.author: wpickett
ms.date: 10/06/2026
uid: tutorials/razor-pages/validation
---
# Part 8 of tutorial series on Razor Pages

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


By [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-10.0**

In this section, you add validation logic to the `Movie` model. The app enforces the validation rules any time a user creates or edits a movie.

## Validation

A key tenet of software development is called [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself) ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where you specify functionality once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support that Razor Pages and Entity Framework provide is a good example of the DRY principle:

* You declaratively specify validation rules in one place, in the model class.
* The app enforces rules everywhere.

## Validation in .NET 10

In .NET 10, the unified validation APIs are in the `Microsoft.Extensions.Validation` NuGet package. By using this package, you can use the validation APIs outside of ASP.NET Core HTTP scenarios.

To use the `Microsoft.Extensions.Validation` APIs:

* Add the following package reference:

  ```xml
  <PackageReference Include="Microsoft.Extensions.Validation" Version="10.0.1" />
  ```

  The functionality is the same but now requires an explicit package reference.

* Register validation services by using dependency injection:

    ```csharp
    builder.Services.AddValidation();
    ```

## Add validation rules to the movie model

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides:

* A set of built-in validation attributes that you apply declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDA.cs?name=snippet1)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDA.cs.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute limits what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter must be uppercase. White spaces are allowed, while numbers and special characters aren't allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are for demonstration. They aren't optimal for a production system. For example, the preceding rules prevent entering a movie with only two characters and don't allow special characters in `Genre`.

By having ASP.NET Core automatically enforce validation rules, you can:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation error UI in Razor Pages

Run the app and go to **Pages/Movies**.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

Movie view form with multiple jQuery client-side validation errors.

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


Notice how the form automatically renders a validation error message in each field containing an invalid value. The errors are enforced both client-side, by using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes are necessary in the Create or Edit pages. Once you apply data annotations to the model, the validation UI is enabled. The Razor Pages you created in this tutorial automatically pick up the validation rules, by using validation attributes on the properties of the `Movie` model class. To test validation by using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the [Fiddler tool](https://www.telerik.com/fiddler).
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors posts the form to the server.

To test server-side validation:

1. Disable JavaScript in the browser. Use the browser's developer tools to disable JavaScript. If you can't disable JavaScript in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid.

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```
  
Alternatively, [disable client-side validation on the server](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23disable-client-side-validation).

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. The Create and Edit pages use this code to:

* Display the initial form.
* Redisplay the form in the event of an error.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Create.cshtml?range=14-20)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/Create.cshtml.md)

The [Input Tag Helper](../../mvc/views/working-with-forms.md) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client. The [Validation Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) displays validation errors. For more information, see [Validation](../../mvc/models/validation.md).

The Create and Edit pages don't contain validation rules. The validation rules and the error strings are specified only in the `Movie` class. These validation rules automatically apply to Razor Pages that edit the `Movie` model.

When you need to change validation logic, change it only in the model. By defining validation logic in one place, you ensure consistent validation throughout the app. Validation in one place helps keep the code clean and makes it easier to maintain and update.

## Use DataType attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDA.cs?highlight=2,7\&name=snippet2)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDA.cs.md)

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Attributes such as `<a>` for URLs and `<a href="mailto:EmailAddress.com">` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. Use the `[DataType]` attribute to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample app, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more. 

The `[DataType]` attributes:

* Can enable the app to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types).

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting is applied when the value is displayed for editing. That behavior might not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, and more.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code always displays a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use [Configuration](../../fundamentals/configuration/index.md) for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDAmult.cs?name=snippet1)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDAmult.cs.md)

[Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations you apply to the class change the schema. For example, the DataAnnotations you apply to the `Title` field:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDA.cs?name=snippet11)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRatingDA.cs.md)

* Limit the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` method of the `New_DataAnnotations` class.

# [Visual Studio Code](#tab/visual-studio-code)

Use the following commands to add a migration for the new DataAnnotations:

```dotnetcli
dotnet ef migrations add New_DataAnnotations
dotnet ef database update
```

`dotnet ef database update` runs the `Up` method of the `New_DataAnnotations` class.

---

Examine the `Up` method:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Migrations/20230606012811_New_DataAnnotations.cs?name=snippet_1)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Migrations/20230606012811_New_DataAnnotations.cs.md)

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations).

### Publish to Azure

For information on deploying to Azure, see [Tutorial: Build an ASP.NET Core app in Azure with SQL Database](https://learn.microsoft.com/azure/app-service/tutorial-dotnetcore-sqldb-app).

Thanks for completing this introduction to Razor Pages. [Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) is an excellent follow up to this tutorial.

## Additional resources

* [mvc/views/working-with-forms](../../mvc/views/working-with-forms.md)
* [fundamentals/localization](../../fundamentals/localization.md)
* [mvc/views/tag-helpers/intro](../../mvc/views/tag-helpers/intro.md)
* [mvc/views/tag-helpers/authoring](../../mvc/views/tag-helpers/authoring.md)

## Next steps

> 
> [Previous: Add a new field](new-field.md)


**Applies to: \= aspnetcore-9.0**

In this section, validation logic is added to the `Movie` model. The validation rules are enforced any time a user creates or edits a movie.

## Validation

A key tenet of software development is called [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself) ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where functionality is specified once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support provided by Razor Pages and Entity Framework is a good example of the DRY principle:

* Validation rules are declaratively specified in one place, in the model class.
* Rules are enforced everywhere in the app.

## Add validation rules to the movie model

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides:

* A set of built-in validation attributes that are applied declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/MovieDateRatingDA.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute is used to limit what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter must be uppercase. White spaces are allowed, while numbers and special characters aren't allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are used for demonstration, they are not optimal for a production system. For example, the preceding prevents entering a movie with only two chars and doesn't allow special characters in `Genre`.

Having validation rules automatically enforced by ASP.NET Core helps:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation Error UI in Razor Pages

Run the app and navigate to Pages/Movies.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

Movie view form with multiple jQuery client-side validation errors

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


Notice how the form has automatically rendered a validation error message in each field containing an invalid value. The errors are enforced both client-side, using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes were necessary in the Create or Edit pages. Once data annotations were applied to the model, the validation UI was enabled. The Razor Pages created in this tutorial automatically picked up the validation rules, using validation attributes on the properties of the `Movie` model class. Test validation using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the [Fiddler tool](https://www.telerik.com/fiddler).
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors will post to the server.

Optional, test server-side validation:

1. Disable JavaScript in the browser. JavaScript can be disabled using browser's developer tools. If JavaScript cannot be disabled in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid:

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```
  
Alternatively, [Disable client-side validation on the server](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23disable-client-side-validation).

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. It's used by the Create and Edit pages to:

* Display the initial form.
* Redisplay the form in the event of an error.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/Create.cshtml?range=14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The [Input Tag Helper](../../mvc/views/working-with-forms.md) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client-side. The [Validation Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) displays validation errors. See [Validation](../../mvc/models/validation.md) for more information.

The Create and Edit pages have no validation rules in them. The validation rules and the error strings are specified only in the `Movie` class. These validation rules are automatically applied to Razor Pages that edit the `Movie` model.

When validation logic needs to change, it's done only in the model. Validation is applied consistently throughout the app, validation logic is defined in one place. Validation in one place helps keep the code clean, and makes it easier to maintain and update.

## Use DataType Attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/MovieDateRatingDA.cs?highlight=2,6\\&name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Supplies attributes such as `<a>` for URL's and `<a href="mailto:EmailAddress.com">` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. The `[DataType]` attribute is used to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample app, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more. 

The `[DataType]` attributes:

* Can enable the app to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types).

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting will be applied when the value is displayed for editing. That behavior may not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, etc.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code will always display a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use [Configuration](../../fundamentals/configuration/index.md) for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/MovieDateRatingDAmult.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

[Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations applied to the class changes the schema. For example, the DataAnnotations applied to the `Title` field:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/MovieDateRatingDA.cs?name=snippet11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

* Limits the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` method of the `New_DataAnnotations` class.

# [Visual Studio Code](#tab/visual-studio-code)

Use the following commands to add a migration for the new DataAnnotations:

```dotnetcli
dotnet ef migrations add New_DataAnnotations
dotnet ef database update
```

`dotnet ef database update` runs the `Up` method of the `New_DataAnnotations` class.

---

Examine the `Up` method:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Migrations/20230606012811_New_DataAnnotations.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations).

### Publish to Azure

For information on deploying to Azure, see [Tutorial: Build an ASP.NET Core app in Azure with SQL Database](https://learn.microsoft.com/azure/app-service/tutorial-dotnetcore-sqldb-app).

Thanks for completing this introduction to Razor Pages. [Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) is an excellent follow up to this tutorial.

## Additional resources

* [mvc/views/working-with-forms](../../mvc/views/working-with-forms.md)
* [fundamentals/localization](../../fundamentals/localization.md)
* [mvc/views/tag-helpers/intro](../../mvc/views/tag-helpers/intro.md)
* [mvc/views/tag-helpers/authoring](../../mvc/views/tag-helpers/authoring.md)

## Next steps

> 
> [Previous: Add a new field](new-field.md)




**Applies to: \= aspnetcore-8.0**

In this section, validation logic is added to the `Movie` model. The validation rules are enforced any time a user creates or edits a movie.

## Validation

A key tenet of software development is called [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself) ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where functionality is specified once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support provided by Razor Pages and Entity Framework is a good example of the DRY principle:

* Validation rules are declaratively specified in one place, in the model class.
* Rules are enforced everywhere in the app.

## Add validation rules to the movie model

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides:

* A set of built-in validation attributes that are applied declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/MovieDateRatingDA.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute is used to limit what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter must be uppercase. White spaces are allowed, while numbers and special characters aren't allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are used for demonstration, they are not optimal for a production system. For example, the preceding prevents entering a movie with only two chars and doesn't allow special characters in `Genre`.

Having validation rules automatically enforced by ASP.NET Core helps:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation Error UI in Razor Pages

Run the app and navigate to Pages/Movies.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

Movie view form with multiple jQuery client-side validation errors

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


Notice how the form has automatically rendered a validation error message in each field containing an invalid value. The errors are enforced both client-side, using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes were necessary in the Create or Edit pages. Once data annotations were applied to the model, the validation UI was enabled. The Razor Pages created in this tutorial automatically picked up the validation rules, using validation attributes on the properties of the `Movie` model class. Test validation using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the [Fiddler tool](https://www.telerik.com/fiddler).
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors will post to the server.

Optional, test server-side validation:

1. Disable JavaScript in the browser. JavaScript can be disabled using browser's developer tools. If JavaScript cannot be disabled in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid:

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```
  
Alternatively, [Disable client-side validation on the server](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23disable-client-side-validation).

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. It's used by the Create and Edit pages to:

* Display the initial form.
* Redisplay the form in the event of an error.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Pages/Movies/Create.cshtml?range=14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The [Input Tag Helper](../../mvc/views/working-with-forms.md) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client-side. The [Validation Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) displays validation errors. See [Validation](../../mvc/models/validation.md) for more information.

The Create and Edit pages have no validation rules in them. The validation rules and the error strings are specified only in the `Movie` class. These validation rules are automatically applied to Razor Pages that edit the `Movie` model.

When validation logic needs to change, it's done only in the model. Validation is applied consistently throughout the app, validation logic is defined in one place. Validation in one place helps keep the code clean, and makes it easier to maintain and update.

## Use DataType Attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/MovieDateRatingDA.cs?highlight=2,6\\&name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Supplies attributes such as `<a>` for URL's and `<a href="mailto:EmailAddress.com">` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. The `[DataType]` attribute is used to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample app, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more. 

The `[DataType]` attributes:

* Can enable the app to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types).

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting will be applied when the value is displayed for editing. That behavior may not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, etc.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code will always display a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use [Configuration](../../fundamentals/configuration/index.md) for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/MovieDateRatingDAmult.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

[Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations applied to the class changes the schema. For example, the DataAnnotations applied to the `Title` field:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/MovieDateRatingDA.cs?name=snippet11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

* Limits the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` method of the `New_DataAnnotations` class.

# [Visual Studio Code](#tab/visual-studio-code)

Use the following commands to add a migration for the new DataAnnotations:

```dotnetcli
dotnet ef migrations add New_DataAnnotations
dotnet ef database update
```

`dotnet ef database update` runs the `Up` method of the `New_DataAnnotations` class.

---

Examine the `Up` method:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Migrations/20230606012811_New_DataAnnotations.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations).

### Publish to Azure

For information on deploying to Azure, see [Tutorial: Build an ASP.NET Core app in Azure with SQL Database](https://learn.microsoft.com/azure/app-service/tutorial-dotnetcore-sqldb-app).

Thanks for completing this introduction to Razor Pages. [Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) is an excellent follow up to this tutorial.

## Additional resources

* [mvc/views/working-with-forms](../../mvc/views/working-with-forms.md)
* [fundamentals/localization](../../fundamentals/localization.md)
* [mvc/views/tag-helpers/intro](../../mvc/views/tag-helpers/intro.md)
* [mvc/views/tag-helpers/authoring](../../mvc/views/tag-helpers/authoring.md)

## Next steps

> 
> [Previous: Add a new field](new-field.md)



**Applies to: \= aspnetcore-7.0**

In this section, validation logic is added to the `Movie` model. The validation rules are enforced any time a user creates or edits a movie.

## Validation

A key tenet of software development is called [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself) ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where functionality is specified once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support provided by Razor Pages and Entity Framework is a good example of the DRY principle:

* Validation rules are declaratively specified in one place, in the model class.
* Rules are enforced everywhere in the app.

## Add validation rules to the movie model

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides:

* A set of built-in validation attributes that are applied declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/MovieDateRatingDA.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute is used to limit what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter is required to be uppercase. White spaces are allowed while numbers, and special
   characters are not allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are used for demonstration, they are not optimal for a production system. For example, the preceding prevents entering a movie with only two chars and doesn't allow special characters in `Genre`.

Having validation rules automatically enforced by ASP.NET Core helps:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation Error UI in Razor Pages

Run the app and navigate to Pages/Movies.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

Movie view form with multiple jQuery client-side validation errors

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


Notice how the form has automatically rendered a validation error message in each field containing an invalid value. The errors are enforced both client-side, using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes were necessary in the Create or Edit pages. Once data annotations were applied to the model, the validation UI was enabled. The Razor Pages created in this tutorial automatically picked up the validation rules, using validation attributes on the properties of the `Movie` model class. Test validation using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the [Fiddler tool](https://www.telerik.com/fiddler).
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors will post to the server.

Optional, test server-side validation:

1. Disable JavaScript in the browser. JavaScript can be disabled using browser's developer tools. If JavaScript cannot be disabled in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid:

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```
  
Alternatively, [Disable client-side validation on the server](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23disable-client-side-validation).

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. It's used by the Create and Edit pages to:

* Display the initial form.
* Redisplay the form in the event of an error.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Pages/Movies/Create.cshtml?range=14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The [Input Tag Helper](../../mvc/views/working-with-forms.md) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client-side. The [Validation Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) displays validation errors. See [Validation](../../mvc/models/validation.md) for more information.

The Create and Edit pages have no validation rules in them. The validation rules and the error strings are specified only in the `Movie` class. These validation rules are automatically applied to Razor Pages that edit the `Movie` model.

When validation logic needs to change, it's done only in the model. Validation is applied consistently throughout the app, validation logic is defined in one place. Validation in one place helps keep the code clean, and makes it easier to maintain and update.

## Use DataType Attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/MovieDateRatingDA.cs?highlight=2,6\\&name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Supplies attributes such as `<a>` for URL's and `<a href="mailto:EmailAddress.com">` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. The `[DataType]` attribute is used to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample app, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more. 

The `[DataType]` attributes:

* Can enable the app to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types).

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting will be applied when the value is displayed for editing. That behavior may not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, etc.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code will always display a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use [Configuration](../../fundamentals/configuration/index.md) for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/MovieDateRatingDAmult.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

[Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations applied to the class changes the schema. For example, the DataAnnotations applied to the `Title` field:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/MovieDateRatingDA.cs?name=snippet11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

* Limits the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` method of the `New_DataAnnotations` class.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Use the following commands to add a migration for the new DataAnnotations:

```dotnetcli
dotnet ef migrations add New_DataAnnotations
dotnet ef database update
```

`dotnet ef database update` runs the `Up` method of the `New_DataAnnotations` class.

---

Examine the `Up` method:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Migrations/20221031235618_New_DataAnnotations.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations).

### Publish to Azure

For information on deploying to Azure, see [Tutorial: Build an ASP.NET Core app in Azure with SQL Database](https://learn.microsoft.com/azure/app-service/tutorial-dotnetcore-sqldb-app).

Thanks for completing this introduction to Razor Pages. [Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) is an excellent follow up to this tutorial.

## Additional resources

* [mvc/views/working-with-forms](../../mvc/views/working-with-forms.md)
* [fundamentals/localization](../../fundamentals/localization.md)
* [mvc/views/tag-helpers/intro](../../mvc/views/tag-helpers/intro.md)
* [mvc/views/tag-helpers/authoring](../../mvc/views/tag-helpers/authoring.md)

## Next steps

> 
> [Previous: Add a new field](new-field.md)



**Applies to: \= aspnetcore-6.0**

In this section, validation logic is added to the `Movie` model. The validation rules are enforced any time a user creates or edits a movie.

## Validation

A key tenet of software development is called [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself) ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where functionality is specified once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support provided by Razor Pages and Entity Framework is a good example of the DRY principle:

* Validation rules are declaratively specified in one place, in the model class.
* Rules are enforced everywhere in the app.

## Add validation rules to the movie model

The [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace provides:

* A set of built-in validation attributes that are applied declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/MovieDateRatingDA.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute is used to limit what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter is required to be uppercase. White spaces are allowed while numbers, and special
   characters are not allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are used for demonstration, they are not optimal for a production system. For example, the preceding prevents entering a movie with only two chars and doesn't allow special characters in `Genre`.

Having validation rules automatically enforced by ASP.NET Core helps:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation Error UI in Razor Pages

Run the app and navigate to Pages/Movies.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

Movie view form with multiple jQuery client-side validation errors

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


Notice how the form has automatically rendered a validation error message in each field containing an invalid value. The errors are enforced both client-side, using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes were necessary in the Create or Edit pages. Once data annotations were applied to the model, the validation UI was enabled. The Razor Pages created in this tutorial automatically picked up the validation rules, using validation attributes on the properties of the `Movie` model class. Test validation using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the [Fiddler tool](https://www.telerik.com/fiddler).
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors will post to the server.

Optional, test server-side validation:

1. Disable JavaScript in the browser. JavaScript can be disabled using browser's developer tools. If you can't disable JavaScript in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid:

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```
  
Alternatively, [Disable client-side validation on the server](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23disable-client-side-validation).

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. It's used by the Create and Edit pages to:

* Display the initial form.
* Redisplay the form in the event of an error.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Pages/Movies/Create.cshtml?range=14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The [Input Tag Helper](../../mvc/views/working-with-forms.md) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client-side. The [Validation Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) displays validation errors. See [Validation](../../mvc/models/validation.md) for more information.

The Create and Edit pages have no validation rules in them. The validation rules and the error strings are specified only in the `Movie` class. These validation rules are automatically applied to Razor Pages that edit the `Movie` model.

When validation logic needs to change, it's done only in the model. Validation is applied consistently throughout the application, validation logic is defined in one place. Validation in one place helps keep the code clean, and makes it easier to maintain and update.

## Use DataType Attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/MovieDateRatingDA.cs?highlight=2,6\\&name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Supplies attributes such as `<a>` for URL's and `<a href="mailto:EmailAddress.com">` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. The `[DataType]` attribute is used to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample application, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more. 

The `[DataType]` attributes:

* Can enable the application to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types).

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting will be applied when the value is displayed for editing. That behavior may not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, etc.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code will always display a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use [Configuration](../../fundamentals/configuration/index.md) for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/MovieDateRatingDAmult.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

[Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations applied to the class changes the schema. For example, the DataAnnotations applied to the `Title` field:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/MovieDateRatingDA.cs?name=snippet11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

* Limits the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` method of the `New_DataAnnotations` class.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Use the following commands to add a migration for the new DataAnnotations:

```dotnetcli
dotnet ef migrations add New_DataAnnotations
dotnet ef database update
```

`dotnet ef database update` runs the `Up` method of the `New_DataAnnotations` class.

---

Examine the `Up` method:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Migrations/20210830233901_New_DataAnnotations.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations).

### Publish to Azure

For information on deploying to Azure, see [Tutorial: Build an ASP.NET Core app in Azure with SQL Database](https://learn.microsoft.com/azure/app-service/tutorial-dotnetcore-sqldb-app).

Thanks for completing this introduction to Razor Pages. [Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) is an excellent follow up to this tutorial.

## Additional resources

* [mvc/views/working-with-forms](../../mvc/views/working-with-forms.md)
* [fundamentals/localization](../../fundamentals/localization.md)
* [mvc/views/tag-helpers/intro](../../mvc/views/tag-helpers/intro.md)
* [mvc/views/tag-helpers/authoring](../../mvc/views/tag-helpers/authoring.md)

## Next steps

> 
> [Previous: Add a new field](new-field.md)



**Applies to: < aspnetcore-6.0**

In this section, validation logic is added to the `Movie` model. The validation rules are enforced any time a user creates or edits a movie.

## Validation

A key tenet of software development is called [DRY](https://wikipedia.org/wiki/Don%27t_repeat_yourself) ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where functionality is specified once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support provided by Razor Pages and Entity Framework is a good example of the DRY principle:

* Validation rules are declaratively specified in one place, in the model class.
* Rules are enforced everywhere in the app.

## Add validation rules to the movie model

The `DataAnnotations` namespace provides:

* A set of built-in validation attributes that are applied declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRatingDA.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute is used to limit what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter is required to be uppercase. White spaces are allowed while numbers, and special
   characters are not allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are used for demonstration, they are not optimal for a production system. For example, the preceding prevents entering a movie with only two chars and doesn't allow special characters in `Genre`.

Having validation rules automatically enforced by ASP.NET Core helps:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation Error UI in Razor Pages

Run the app and navigate to Pages/Movies.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

Movie view form with multiple jQuery client-side validation errors

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


Notice how the form has automatically rendered a validation error message in each field containing an invalid value. The errors are enforced both client-side, using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes were necessary in the Create or Edit pages. Once data annotations were applied to the model, the validation UI was enabled. The Razor Pages created in this tutorial automatically picked up the validation rules, using validation attributes on the properties of the `Movie` model class. Test validation using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the [Fiddler tool](https://www.telerik.com/fiddler).
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors will post to the server.

Optional, test server-side validation:

1. Disable JavaScript in the browser. JavaScript can be disabled using browser's developer tools. If JavaScript cannot be disabled in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid:

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```
  
Alternatively, [Disable client-side validation on the server](https://learn.microsoft.com/search/?terms=mvc%2Fmodels%2Fvalidation%23disable-client-side-validation).

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. It's used by the Create and Edit pages to:

* Display the initial form.
* Redisplay the form in the event of an error.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Pages/Movies/Create.cshtml?range=14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The [Input Tag Helper](../../mvc/views/working-with-forms.md) uses the [DataAnnotations](https://learn.microsoft.com/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6) attributes and produces HTML attributes needed for jQuery Validation on the client-side. The [Validation Tag Helper](https://learn.microsoft.com/search/?terms=mvc%2Fviews%2Fworking-with-forms%23the-validation-tag-helpers) displays validation errors. See [Validation](../../mvc/models/validation.md) for more information.

The Create and Edit pages have no validation rules in them. The validation rules and the error strings are specified only in the `Movie` class. These validation rules are automatically applied to Razor Pages that edit the `Movie` model.

When validation logic needs to change, it's done only in the model. Validation is applied consistently throughout the application, validation logic is defined in one place. Validation in one place helps keep the code clean, and makes it easier to maintain and update.

## Use DataType Attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Models/MovieDateRatingDA.cs?highlight=2,6\\&name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Supplies attributes such as `<a>` for URL's and `<a href="mailto:EmailAddress.com">` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. The `[DataType]` attribute is used to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample application, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more. 

The `[DataType]` attributes:

* Can enable the application to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types).

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting will be applied when the value is displayed for editing. That behavior may not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, etc.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code will always display a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use [Configuration](../../fundamentals/configuration/index.md) for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRatingDAmult.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

[Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations applied to the class changes the schema. For example, the DataAnnotations applied to the `Title` field:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRatingDA.cs?name=snippet11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

* Limits the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` methods of the `New_DataAnnotations` class. Examine the `Up` method:

[Code reference unavailable in this source snapshot: validation/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Migrations/20190724163003_New_DataAnnotations.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/validation.md)

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations).

### Publish to Azure

For information on deploying to Azure, see [Tutorial: Build an ASP.NET Core app in Azure with SQL Database](https://learn.microsoft.com/azure/app-service/tutorial-dotnetcore-sqldb-app).

Thanks for completing this introduction to Razor Pages. [Get started with Razor Pages and EF Core](../../data/ef-rp/intro.md) is an excellent follow up to this tutorial.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see [Enterprise web app patterns](https://learn.microsoft.com/azure/architecture/web-apps/guides/enterprise-app-patterns/overview). A complete production-quality sample web app that implements the patterns is available.


## Additional resources

* [mvc/views/working-with-forms](../../mvc/views/working-with-forms.md)
* [fundamentals/localization](../../fundamentals/localization.md)
* [mvc/views/tag-helpers/intro](../../mvc/views/tag-helpers/intro.md)
* [mvc/views/tag-helpers/authoring](../../mvc/views/tag-helpers/authoring.md)

## Next steps

> 
> [Previous: Add a new field](new-field.md)
