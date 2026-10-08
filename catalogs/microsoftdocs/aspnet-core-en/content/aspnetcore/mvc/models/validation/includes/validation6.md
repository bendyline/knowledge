**Applies to: \= aspnetcore-6.0**

This article explains how to validate user input in an ASP.NET Core MVC or Razor Pages app.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Model state

Model state represents errors that come from two subsystems: model binding and model validation. Errors that originate from [model binding](../../model-binding.md) are generally data conversion errors. For example, an "x" is entered in an integer field. Model validation occurs after model binding and reports errors where data doesn't conform to business rules. For example, a 0 is entered in a field that expects a rating between 1 and 5.

Both model binding and model validation occur before the execution of a controller action or a Razor Pages handler method. For web apps, it's the app's responsibility to inspect `ModelState.IsValid` and react appropriately. Web apps typically redisplay the page with an error message, as shown in the following Razor Pages example:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.cs" id="snippet_OnPostAsync" highlight="3-6"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.cs.md)

For ASP.NET Core MVC with controllers and views, the following example shows how to check `ModelState.IsValid` inside of a controller action:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Controllers/MoviesController.cs" id="snippet_Create" highlight="3-6"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Controllers/MoviesController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Controllers/MoviesController.cs.md)

Web API controllers don't have to check `ModelState.IsValid` if they have the [\[ApiController\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute. In that case, an automatic HTTP 400 response containing error details is returned when model state is invalid. For more information, see [Automatic HTTP 400 responses](https://learn.microsoft.com/search/?terms=web-api%2Findex%23automatic-http-400-responses).

## Rerun validation

Validation is automatic, but you might want to repeat it manually. For example, you might compute a value for a property and want to rerun validation after setting the property to the computed value. To rerun validation, call [Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.ClearValidationState%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.ClearValidationState%252A) to clear validation specific to the model being validated followed by `TryValidateModel`:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.cs" id="snippet_TryValidate" highlight="6-10"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.cs.md)

## Validation attributes

Validation attributes let you specify validation rules for model properties. The following example from the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples) shows a model class that is annotated with validation attributes. The `[ClassicMovie]` attribute is a custom validation attribute and the others are built in. Not shown is `[ClassicMovieWithClientValidator]`, which shows an alternative way to implement a custom attribute.

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Models/Movie.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Models/Movie.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Models/Movie.cs.md)

## Built-in attributes

Here are some of the built-in validation attributes:

* [\[ValidateNever\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidateNeverAttribute): Indicates that a property or parameter should be excluded from validation.
* [\[CreditCard\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.CreditCardAttribute): Validates that the property has a credit card format. Requires [jQuery Validation Additional Methods](https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/additional-methods.js).
* [\[Compare\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.CompareAttribute): Validates that two properties in a model match.
* [\[EmailAddress\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EmailAddressAttribute): Validates that the property has an email format.
* [\[Phone\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.PhoneAttribute): Validates that the property has a telephone number format.
* [\[Range\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RangeAttribute): Validates that the property value falls within a specified range.
* [\[RegularExpression\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RegularExpressionAttribute): Validates that the property value matches a specified regular expression.
* [\[Required\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute): Validates that the field isn't null. See [`[Required]` attribute](#non-nullable-reference-types-and-the-required-attribute) for details about this attribute's behavior.
* [\[StringLength\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.StringLengthAttribute): Validates that a string property value doesn't exceed a specified length limit.
* [\[Url\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.UrlAttribute): Validates that the property has a URL format.
* [\[Remote\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RemoteAttribute): Validates input on the client by calling an action method on the server. See [`[Remote]` attribute](#remote-attribute) for details about this attribute's behavior.

A complete list of validation attributes can be found in the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace.

### Error messages

Validation attributes let you specify the error message to be displayed for invalid input. For example:

```csharp
[StringLength(8, ErrorMessage = "Name length can't be more than 8.")]
```

Internally, the attributes call [System.String.Format%2A](https://learn.microsoft.com/search/?terms=System.String.Format%252A) with a placeholder for the field name and sometimes additional placeholders. For example:

```csharp
[StringLength(8, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 6)]
```

When applied to a `Name` property, the error message created by the preceding code would be "Name length must be between 6 and 8.".

To find out which parameters are passed to `String.Format` for a particular attribute's error message, see the [DataAnnotations source code](https://github.com/dotnet/runtime/tree/main/src/libraries/System.ComponentModel.Annotations/src/System/ComponentModel/DataAnnotations).

## Non-nullable reference types and the [Required] attribute

The validation system treats non-nullable parameters or bound properties as if they had a `[Required(AllowEmptyStrings = true)]` attribute. By [enabling `Nullable` contexts](https://learn.microsoft.com/dotnet/csharp/nullable-references#nullable-contexts), MVC implicitly starts validating non-nullable properties [on non-generic types](#ngen) or parameters as if they had been attributed with the `[Required(AllowEmptyStrings = true)]` attribute. Consider the following code:

```csharp
public class Person
{
    public string Name { get; set; }
}
```

If the app was built with `<Nullable>enable</Nullable>`, a missing value for `Name` in a JSON or form post results in a validation error. Use a nullable reference type to allow null or missing values to be specified for the `Name` property:

```csharp
public class Person
{
    public string? Name { get; set; }
}
```

This behavior can be disabled by configuring [Microsoft.AspNetCore.Mvc.MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes) in `Program.cs`:

```csharp
builder.Services.AddControllers(
    options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
```

<a name="ngen"></a>

## Non-nullable properties on generic types and [Required] attribute

Non-nullable properties on generic types must include the `[Required]` attribute when the type is required. In the following code, `TestRequired` is not required:

[Code example (complete source file; reference: \~/mvc/models/validation/samples/6.x/WeatherForecastG.cs?name=snippet\&highlight=3)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/WeatherForecastG.cs.md)

In the following code, `TestRequired` is explicitly marked as required:

[Code example (complete source file; reference: \~/mvc/models/validation/samples/6.x/WeatherForecastG.cs?name=snippet2\&highlight=5-6)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/WeatherForecastG.cs.md)

### [Required] validation on the server

On the server, a required value is considered missing if the property is null. A non-nullable field is always valid, and the `[Required]` attribute's error message is never displayed.

However, model binding for a non-nullable property may fail, resulting in an error message such as `The value '' is invalid`. To specify a custom error message for server-side validation of non-nullable types, you have the following options:

* Make the field nullable (for example, `decimal?` instead of `decimal`). [Nullable\<T>](https://learn.microsoft.com/dotnet/csharp/programming-guide/nullable-types/) value types are treated like standard nullable types.
* Specify the default error message to be used by model binding, as shown in the following example:

  [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Program.cs" id="snippet_Configuration" highlight="5-6"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Program.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Program.cs.md)

  For more information about model binding errors that you can set default messages for, see [Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.DefaultModelBindingMessageProvider#methods](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.DefaultModelBindingMessageProvider%23methods).

### [Required] validation on the client

Non-nullable types and strings are handled differently on the client compared to the server. On the client:

* A value is considered present only if input is entered for it. Therefore, client-side validation handles non-nullable types the same as nullable types.
* Whitespace in a string field is considered valid input by the jQuery Validation [required](https://jqueryvalidation.org/required-method/) method. Server-side validation considers a required string field invalid if only whitespace is entered.

As noted earlier, non-nullable types are treated as though they had a `[Required(AllowEmptyStrings = true)]` attribute. That means you get client-side validation even if you don't apply the `[Required(AllowEmptyStrings = true)]` attribute. But if you don't use the attribute, you get a default error message. To specify a custom error message, use the attribute.

## [Remote] attribute

The [\[Remote\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RemoteAttribute) attribute implements client-side validation that requires calling a method on the server to determine whether field input is valid. For example, the app may need to verify whether a user name is already in use.

To implement remote validation:

1. Create an action method for JavaScript to call.  The jQuery Validation [remote](https://jqueryvalidation.org/remote-method/) method expects a JSON response:

   * `true` means the input data is valid.
   * `false`, `undefined`, or `null` means the input is invalid. Display the default error message.
   * Any other string means the input is invalid. Display the string as a custom error message.

   Here's an example of an action method that returns a custom error message:

   [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs" id="snippet_VerifyEmail"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs.md)

1. In the model class, annotate the property with a `[Remote]` attribute that points to the validation action method, as shown in the following example:

   [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Models/User.cs" id="snippet_Email"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Models/User.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Models/User.cs.md)
   
### Additional fields

The [Microsoft.AspNetCore.Mvc.RemoteAttribute.AdditionalFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RemoteAttribute.AdditionalFields%252A) property of the `[Remote]` attribute lets you validate combinations of fields against data on the server. For example, if the `User` model had `FirstName` and `LastName` properties, you might want to verify that no existing users already have that pair of names. The following example shows how to use `AdditionalFields`:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Models/User.cs" id="snippet_Name" highlight="1,5"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Models/User.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Models/User.cs.md)

`AdditionalFields` could be set explicitly to the strings "FirstName" and "LastName", but using the [nameof](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/nameof) operator simplifies later refactoring. The action method for this validation must accept both `firstName` and `lastName` arguments:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs" id="snippet_VerifyName"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs.md)

When the user enters a first or last name, JavaScript makes a remote call to see if that pair of names has been taken.

To validate two or more additional fields, provide them as a comma-delimited list. For example, to add a `MiddleName` property to the model, set the `[Remote]` attribute as shown in the following example:

```csharp
[Remote(action: "VerifyName", controller: "Users",
    AdditionalFields = nameof(FirstName) + "," + nameof(LastName))]
public string MiddleName { get; set; }
```

`AdditionalFields`, like all attribute arguments, must be a constant expression. Therefore, don't use an [interpolated string](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/interpolated-strings) or call [System.String.Join%2A](https://learn.microsoft.com/search/?terms=System.String.Join%252A) to initialize `AdditionalFields`.

## Alternatives to built-in attributes

If you need validation not provided by built-in attributes, you can:

* [Create custom attributes](#custom-attributes).
* [Implement IValidatableObject](#ivalidatableobject).

## Custom attributes

For scenarios that the built-in validation attributes don't handle, you can create custom validation attributes. Create a class that inherits from [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute), and override the [System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid%252A) method.

The `IsValid` method accepts an object named *value*, which is the input to be validated. An overload also accepts a [System.ComponentModel.DataAnnotations.ValidationContext](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext) object, which provides additional information, such as the model instance created by model binding.

The following example validates that the release date for a movie in the *Classic* genre isn't later than a specified year. The `[ClassicMovie]` attribute:

* Is only run on the server.
* For Classic movies, validates the release date:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieAttribute.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieAttribute.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieAttribute.cs.md)

The `movie` variable in the preceding example represents a `Movie` object that contains the data from the form submission. When validation fails, a [System.ComponentModel.DataAnnotations.ValidationResult](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationResult) with an error message is returned.

## IValidatableObject

The preceding example works only with `Movie` types. Another option for class-level validation is to implement [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject) in the model class, as shown in the following example:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Models/ValidatableMovie.cs" id="snippet_Class" highlight="1,26-34"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Models/ValidatableMovie.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Models/ValidatableMovie.cs.md)

## Top-level node validation

Top-level nodes include:

* Action parameters
* Controller properties
* Page handler parameters
* Page model properties

Model-bound top-level nodes are validated in addition to validating model properties. In the following example from the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples), the `VerifyPhone` method uses the [System.ComponentModel.DataAnnotations.RegularExpressionAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RegularExpressionAttribute) to validate the `phone` action parameter:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs" id="snippet_VerifyPhone"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs.md)

Top-level nodes can use [Microsoft.AspNetCore.Mvc.ModelBinding.BindRequiredAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindRequiredAttribute) with validation attributes. In the following example from the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples), the `CheckAge` method specifies that the `age` parameter must be bound from the query string when the form is submitted:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs" id="snippet_CheckAgeSignature"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Controllers/UsersController.cs.md)

In the Check Age page (`CheckAge.cshtml`), there are two forms. The first form submits an `Age` value of `99` as a query string parameter: `https://localhost:5001/Users/CheckAge?Age=99`.

When a properly formatted `age` parameter from the query string is submitted, the form validates.

The second form on the Check Age page submits the `Age` value in the body of the request, and validation fails. Binding fails because the `age` parameter must come from a query string.

## Maximum errors

Validation stops when the maximum number of errors is reached (200 by default). You can configure this number with the following code in `Program.cs`:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Program.cs" id="snippet_Configuration" highlight="4"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Program.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Program.cs.md)

## Maximum recursion

[Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor) traverses the object graph of the model being validated. For models that are deep or are infinitely recursive, validation may result in stack overflow. [Microsoft.AspNetCore.Mvc.MvcOptions.MaxValidationDepth%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.MaxValidationDepth%252A) provides a way to stop validation early if the visitor recursion exceeds a configured depth. The default value of `MvcOptions.MaxValidationDepth` is 32.

## Automatic short-circuit

Validation is automatically short-circuited (skipped) if the model graph doesn't require validation. Objects that the runtime skips validation for include collections of primitives (such as `byte[]`, `string[]`, `Dictionary<string, string>`) and complex object graphs that don't have any validators.

## Client-side validation

Client-side validation prevents submission until the form is valid. The Submit button runs JavaScript that either submits the form or displays error messages.

Client-side validation avoids an unnecessary round trip to the server when there are input errors on a form. The following script references in `_Layout.cshtml` and `_ValidationScriptsPartial.cshtml` support client-side validation:

[language="cshtml" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Views/Shared/\_Layout.cshtml" id="snippet_Scripts"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Views/Shared/\_Layout.cshtml)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Views/Shared/_Layout.cshtml.md)

[language="cshtml" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Views/Shared/\_ValidationScriptsPartial.cshtml" id="snippet_Scripts"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Views/Shared/\_ValidationScriptsPartial.cshtml)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Views/Shared/_ValidationScriptsPartial.cshtml.md)

The [jQuery Unobtrusive Validation](https://github.com/aspnet/jquery-validation-unobtrusive) script is a custom Microsoft front-end library that builds on the popular [jQuery Validation](https://jqueryvalidation.org/) plugin. Without jQuery Unobtrusive Validation, you would have to code the same validation logic in two places: once in the server-side validation attributes on model properties, and then again in client-side scripts. Instead, [Tag Helpers](../../../views/tag-helpers/intro.md) and [HTML helpers](../../../views/overview.md) use the validation attributes and type metadata from model properties to render HTML 5 `data-` attributes for the form elements that need validation. jQuery Unobtrusive Validation parses the `data-` attributes and passes the logic to jQuery Validation, effectively "copying" the server-side validation logic to the client. You can display validation errors on the client using tag helpers as shown here:

[language="cshtml" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml" id="snippet_ReleaseDate" highlight="3-4"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Pages/Movies/Create.cshtml.md)

The preceding tag helpers render the following HTML:

```html
<div class="form-group">
    <label class="control-label" for="Movie_ReleaseDate">Release Date</label>
    <input class="form-control" type="date" data-val="true"
        data-val-required="The Release Date field is required."
        id="Movie_ReleaseDate" name="Movie.ReleaseDate" value="">
    <span class="text-danger field-validation-valid"
        data-valmsg-for="Movie.ReleaseDate" data-valmsg-replace="true"></span>
</div>
```

Notice that the `data-` attributes in the HTML output correspond to the validation attributes for the `Movie.ReleaseDate` property. The `data-val-required` attribute contains an error message to display if the user doesn't fill in the release date field. jQuery Unobtrusive Validation passes this value to the jQuery Validation [required()](https://jqueryvalidation.org/required-method/) method, which then displays that message in the accompanying **\<span>** element.

Data type validation is based on the .NET type of a property, unless that is overridden by a [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataType) attribute. Browsers have their own default error messages, but the jQuery Validation Unobtrusive Validation package can override those messages. `[DataType]` attributes and subclasses such as [\[EmailAddress\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EmailAddressAttribute) let you specify the error message.

## Unobtrusive validation

For information on unobtrusive validation, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/1111).

### Add Validation to Dynamic Forms

jQuery Unobtrusive Validation passes validation logic and parameters to jQuery Validation when the page first loads. Therefore, validation doesn't work automatically on dynamically generated forms. To enable validation, tell jQuery Unobtrusive Validation to parse the dynamic form immediately after you create it. For example, the following code sets up client-side validation on a form added via AJAX.

```javascript
$.get({
    url: "https://url/that/returns/a/form",
    dataType: "html",
    error: function(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ": Couldn't add form. " + errorThrown);
    },
    success: function(newFormHTML) {
        var container = document.getElementById("form-container");
        container.insertAdjacentHTML("beforeend", newFormHTML);
        var forms = container.getElementsByTagName("form");
        var newForm = forms[forms.length - 1];
        $.validator.unobtrusive.parse(newForm);
    }
})
```

The `$.validator.unobtrusive.parse()` method accepts a jQuery selector for its one argument. This method tells jQuery Unobtrusive Validation to parse the `data-` attributes of forms within that selector. The values of those attributes are then passed to the jQuery Validation plugin.

### Add Validation to Dynamic Controls

The `$.validator.unobtrusive.parse()` method works on an entire form, not on individual dynamically generated controls, such as `<input>` and `<select/>`. To reparse the form, remove the validation data that was added when the form was parsed earlier, as shown in the following example:

```javascript
$.get({
    url: "https://url/that/returns/a/control",
    dataType: "html",
    error: function(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ": Couldn't add control. " + errorThrown);
    },
    success: function(newInputHTML) {
        var form = document.getElementById("my-form");
        form.insertAdjacentHTML("beforeend", newInputHTML);
        $(form).removeData("validator")    // Added by jQuery Validation
               .removeData("unobtrusiveValidation");   // Added by jQuery Unobtrusive Validation
        $.validator.unobtrusive.parse(form);
    }
})
```

## Custom client-side validation

Custom client-side validation is done by generating `data-` HTML attributes that work with a custom jQuery Validation adapter. The following sample adapter code was written for the `[ClassicMovie]` and `[ClassicMovieWithClientValidator]` attributes that were introduced earlier in this article:

[language="javascript" source="\~/mvc/models/validation/samples/6.x/ValidationSample/wwwroot/classicMovieValidator.js"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/wwwroot/classicMovieValidator.js)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/wwwroot/classicMovieValidator.js.md)

For information about how to write adapters, see the [jQuery Validation documentation](https://jqueryvalidation.org/documentation/).

The use of an adapter for a given field is triggered by `data-` attributes that:

* Flag the field as being subject to validation (`data-val="true"`).
* Identify a validation rule name and error message text (for example, `data-val-rulename="Error message."`).
* Provide any additional parameters the validator needs (for example, `data-val-rulename-param1="value"`).

The following example shows the `data-` attributes for the [sample app's](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples) `ClassicMovie` attribute:

```html
<input class="form-control" type="date"
    data-val="true"
    data-val-classicmovie="Classic movies must have a release year no later than 1960."
    data-val-classicmovie-year="1960"
    data-val-required="The Release Date field is required."
    id="Movie_ReleaseDate" name="Movie.ReleaseDate" value="">
```

As noted earlier, [Tag Helpers](../../../views/tag-helpers/intro.md) and [HTML helpers](../../../views/overview.md) use information from validation attributes to render `data-` attributes. There are two options for writing code that results in the creation of custom `data-` HTML attributes:

* Create a class that derives from [Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%25601) and a class that implements [Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider), and register your attribute and its adapter in DI. This method follows the [single responsibility principle](https://wikipedia.org/wiki/Single_responsibility_principle) in that server-related and client-related validation code is in separate classes. The adapter also has the advantage that since it's registered in DI, other services in DI are available to it if needed.
* Implement [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator) in your [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) class. This method might be appropriate if the attribute doesn't do any server-side validation and doesn't need any services from DI.

### AttributeAdapter for client-side validation

This method of rendering `data-` attributes in HTML is used by the `ClassicMovie` attribute in the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples). To add client validation by using this method:

1. Create an attribute adapter class for the custom validation attribute. Derive the class from [Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%25601). Create an `AddValidation` method that adds `data-` attributes to the rendered output, as shown in this example:

   [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieAttributeAdapter.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieAttributeAdapter.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieAttributeAdapter.cs.md)

1. Create an adapter provider class that implements [Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider). In the [Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider.GetAttributeAdapter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider.GetAttributeAdapter%252A) method pass in the custom attribute to the adapter's constructor, as shown in this example:

   [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Validation/CustomValidationAttributeAdapterProvider.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Validation/CustomValidationAttributeAdapterProvider.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Validation/CustomValidationAttributeAdapterProvider.cs.md)

1. Register the adapter provider for DI in `Program.cs`:

   [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Program.cs" id="snippet_Configuration" highlight="9-10"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Program.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Program.cs.md)

### IClientModelValidator for client-side validation

This method of rendering `data-` attributes in HTML is used by the `ClassicMovieWithClientValidator` attribute in the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples). To add client validation by using this method:

* In the custom validation attribute, implement the [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator) interface and create an [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator.AddValidation%252A) method. In the `AddValidation` method, add `data-` attributes for validation, as shown in the following example:

  [language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieWithClientValidatorAttribute.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieWithClientValidatorAttribute.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Validation/ClassicMovieWithClientValidatorAttribute.cs.md)

## Disable client-side validation

The following code disables client validation in Razor Pages:

[language="csharp" source="\~/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Program.cs" id="snippet_DisableClientValidation" highlight="2-5"::: (complete source file; reference: \~/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Program.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Program.cs.md)

Other options to disable client-side validation:

* Comment out the reference to `_ValidationScriptsPartial` in all the `.cshtml` files.
* Remove the contents of the *Pages\Shared\_ValidationScriptsPartial.cshtml* file.

The preceding approach won't prevent client-side validation of ASP.NET Core Identity Razor class library. For more information, see [security/authentication/scaffold-identity](../../../../security/authentication/scaffold-identity.md).

## Additional resources

* [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations)
* [Model Binding](../../model-binding.md)



**Applies to: < aspnetcore-6.0**

This article explains how to validate user input in an ASP.NET Core MVC or Razor Pages app.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Model state

Model state represents errors that come from two subsystems: model binding and model validation. Errors that originate from [model binding](../../model-binding.md) are generally data conversion errors. For example, an "x" is entered in an integer field. Model validation occurs after model binding and reports errors where data doesn't conform to business rules. For example, a 0 is entered in a field that expects a rating between 1 and 5.

Both model binding and model validation occur before the execution of a controller action or a Razor Pages handler method. For web apps, it's the app's responsibility to inspect `ModelState.IsValid` and react appropriately. Web apps typically redisplay the page with an error message:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.cs" id="snippet_OnPostAsync" highlight="3-6"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.cs.md)

Web API controllers don't have to check `ModelState.IsValid` if they have the [\[ApiController\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute. In that case, an automatic HTTP 400 response containing error details is returned when model state is invalid. For more information, see [Automatic HTTP 400 responses](https://learn.microsoft.com/search/?terms=web-api%2Findex%23automatic-http-400-responses).

## Rerun validation

Validation is automatic, but you might want to repeat it manually. For example, you might compute a value for a property and want to rerun validation after setting the property to the computed value. To rerun validation, call [Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.ClearValidationState%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.ClearValidationState%252A) to clear validation specific to the model being validated followed by `TryValidateModel`:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.cs" id="snippet_TryValidate" highlight="6-10"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.cs.md)

## Validation attributes

Validation attributes let you specify validation rules for model properties. The following example from the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples) shows a model class that is annotated with validation attributes. The `[ClassicMovie]` attribute is a custom validation attribute and the others are built in. Not shown is `[ClassicMovieWithClientValidator]`, which shows an alternative way to implement a custom attribute.

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Models/Movie.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Models/Movie.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Models/Movie.cs.md)

## Built-in attributes

Here are some of the built-in validation attributes:

* [\[ValidateNever\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidateNeverAttribute): Indicates that a property or parameter should be excluded from validation.
* [\[CreditCard\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.CreditCardAttribute): Validates that the property has a credit card format. Requires [jQuery Validation Additional Methods](https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/additional-methods.js).
* [\[Compare\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.CompareAttribute): Validates that two properties in a model match.
* [\[EmailAddress\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EmailAddressAttribute): Validates that the property has an email format.
* [\[Phone\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.PhoneAttribute): Validates that the property has a telephone number format.
* [\[Range\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RangeAttribute): Validates that the property value falls within a specified range.
* [\[RegularExpression\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RegularExpressionAttribute): Validates that the property value matches a specified regular expression.
* [\[Required\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute): Validates that the field isn't null. See [`[Required]` attribute](#non-nullable-reference-types-and-the-required-attribute) for details about this attribute's behavior.
* [\[StringLength\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.StringLengthAttribute): Validates that a string property value doesn't exceed a specified length limit.
* [\[Url\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.UrlAttribute): Validates that the property has a URL format.
* [\[Remote\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RemoteAttribute): Validates input on the client by calling an action method on the server. See [`[Remote]` attribute](#remote-attribute) for details about this attribute's behavior.

A complete list of validation attributes can be found in the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace.

### Error messages

Validation attributes let you specify the error message to be displayed for invalid input. For example:

```csharp
[StringLength(8, ErrorMessage = "Name length can't be more than 8.")]
```

Internally, the attributes call [System.String.Format%2A](https://learn.microsoft.com/search/?terms=System.String.Format%252A) with a placeholder for the field name and sometimes additional placeholders. For example:

```csharp
[StringLength(8, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 6)]
```

When applied to a `Name` property, the error message created by the preceding code would be "Name length must be between 6 and 8.".

To find out which parameters are passed to `String.Format` for a particular attribute's error message, see the [DataAnnotations source code](https://github.com/dotnet/runtime/tree/main/src/libraries/System.ComponentModel.Annotations/src/System/ComponentModel/DataAnnotations).

## Non-nullable reference types and [Required] attribute

The validation system treats non-nullable parameters or bound properties as if they had a `[Required(AllowEmptyStrings = true)]` attribute. By [enabling `Nullable` contexts](https://learn.microsoft.com/dotnet/csharp/nullable-references#nullable-contexts), MVC implicitly starts validating non-nullable properties or parameters as if they had been attributed with the `[Required(AllowEmptyStrings = true)]` attribute. Consider the following code:

```csharp
public class Person
{
    public string Name { get; set; }
}
```

If the app was built with `<Nullable>enable</Nullable>`, a missing value for `Name` in a JSON or form post results in a validation error. Use a nullable reference type to allow null or missing values to be specified for the `Name` property:

```csharp
public class Person
{
    public string? Name { get; set; }
}
```

This behavior can be disabled by configuring [Microsoft.AspNetCore.Mvc.MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes) in `Startup.ConfigureServices`:

```csharp
services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
```

### [Required] validation on the server

On the server, a required value is considered missing if the property is null. A non-nullable field is always valid, and the `[Required]` attribute's error message is never displayed.

However, model binding for a non-nullable property may fail, resulting in an error message such as `The value '' is invalid`. To specify a custom error message for server-side validation of non-nullable types, you have the following options:

* Make the field nullable (for example, `decimal?` instead of `decimal`). [Nullable\<T>](https://learn.microsoft.com/dotnet/csharp/programming-guide/nullable-types/) value types are treated like standard nullable types.
* Specify the default error message to be used by model binding, as shown in the following example:

  [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs" id="snippet_Configuration" highlight="5-6"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs.md)

  For more information about model binding errors that you can set default messages for, see [Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.DefaultModelBindingMessageProvider#methods](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.DefaultModelBindingMessageProvider%23methods).

### [Required] validation on the client

Non-nullable types and strings are handled differently on the client compared to the server. On the client:

* A value is considered present only if input is entered for it. Therefore, client-side validation handles non-nullable types the same as nullable types.
* Whitespace in a string field is considered valid input by the jQuery Validation [required](https://jqueryvalidation.org/required-method/) method. Server-side validation considers a required string field invalid if only whitespace is entered.

As noted earlier, non-nullable types are treated as though they had a `[Required(AllowEmptyStrings = true)]` attribute. That means you get client-side validation even if you don't apply the `[Required(AllowEmptyStrings = true)]` attribute. But if you don't use the attribute, you get a default error message. To specify a custom error message, use the attribute.

## [Remote] attribute

The [\[Remote\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RemoteAttribute) attribute implements client-side validation that requires calling a method on the server to determine whether field input is valid. For example, the app may need to verify whether a user name is already in use.

To implement remote validation:

1. Create an action method for JavaScript to call.  The jQuery Validation [remote](https://jqueryvalidation.org/remote-method/) method expects a JSON response:

   * `true` means the input data is valid.
   * `false`, `undefined`, or `null` means the input is invalid. Display the default error message.
   * Any other string means the input is invalid. Display the string as a custom error message.

   Here's an example of an action method that returns a custom error message:

   [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs" id="snippet_VerifyEmail"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs.md)

1. In the model class, annotate the property with a `[Remote]` attribute that points to the validation action method, as shown in the following example:

   [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Models/User.cs" id="snippet_Email"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Models/User.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Models/User.cs.md)
   
### Additional fields

The [Microsoft.AspNetCore.Mvc.RemoteAttribute.AdditionalFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RemoteAttribute.AdditionalFields%252A) property of the `[Remote]` attribute lets you validate combinations of fields against data on the server. For example, if the `User` model had `FirstName` and `LastName` properties, you might want to verify that no existing users already have that pair of names. The following example shows how to use `AdditionalFields`:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Models/User.cs" id="snippet_Name" highlight="1,5"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Models/User.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Models/User.cs.md)

`AdditionalFields` could be set explicitly to the strings "FirstName" and "LastName", but using the [nameof](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/nameof) operator simplifies later refactoring. The action method for this validation must accept both `firstName` and `lastName` arguments:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs" id="snippet_VerifyName"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs.md)

When the user enters a first or last name, JavaScript makes a remote call to see if that pair of names has been taken.

To validate two or more additional fields, provide them as a comma-delimited list. For example, to add a `MiddleName` property to the model, set the `[Remote]` attribute as shown in the following example:

```csharp
[Remote(action: "VerifyName", controller: "Users", AdditionalFields = nameof(FirstName) + "," + nameof(LastName))]
public string MiddleName { get; set; }
```

`AdditionalFields`, like all attribute arguments, must be a constant expression. Therefore, don't use an [interpolated string](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/interpolated-strings) or call [System.String.Join%2A](https://learn.microsoft.com/search/?terms=System.String.Join%252A) to initialize `AdditionalFields`.

## Alternatives to built-in attributes

If you need validation not provided by built-in attributes, you can:

* [Create custom attributes](#custom-attributes).
* [Implement IValidatableObject](#ivalidatableobject).

## Custom attributes

For scenarios that the built-in validation attributes don't handle, you can create custom validation attributes. Create a class that inherits from [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute), and override the [System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid%2A](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute.IsValid%252A) method.

The `IsValid` method accepts an object named *value*, which is the input to be validated. An overload also accepts a [System.ComponentModel.DataAnnotations.ValidationContext](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext) object, which provides additional information, such as the model instance created by model binding.

The following example validates that the release date for a movie in the *Classic* genre isn't later than a specified year. The `[ClassicMovie]` attribute:

* Is only run on the server.
* For Classic movies, validates the release date:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieAttribute.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieAttribute.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieAttribute.cs.md)

The `movie` variable in the preceding example represents a `Movie` object that contains the data from the form submission. When validation fails, a [System.ComponentModel.DataAnnotations.ValidationResult](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationResult) with an error message is returned.

## IValidatableObject

The preceding example works only with `Movie` types. Another option for class-level validation is to implement [System.ComponentModel.DataAnnotations.IValidatableObject](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.IValidatableObject) in the model class, as shown in the following example:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Models/ValidatableMovie.cs" id="snippet_Class" highlight="1,26-34"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Models/ValidatableMovie.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Models/ValidatableMovie.cs.md)

## Top-level node validation

Top-level nodes include:

* Action parameters
* Controller properties
* Page handler parameters
* Page model properties

Model-bound top-level nodes are validated in addition to validating model properties. In the following example from the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples), the `VerifyPhone` method uses the [System.ComponentModel.DataAnnotations.RegularExpressionAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RegularExpressionAttribute) to validate the `phone` action parameter:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs" id="snippet_VerifyPhone"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs.md)

Top-level nodes can use [Microsoft.AspNetCore.Mvc.ModelBinding.BindRequiredAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.BindRequiredAttribute) with validation attributes. In the following example from the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples), the `CheckAge` method specifies that the `age` parameter must be bound from the query string when the form is submitted:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs" id="snippet_CheckAgeSignature"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Controllers/UsersController.cs.md)

In the Check Age page (`CheckAge.cshtml`), there are two forms. The first form submits an `Age` value of `99` as a query string parameter: `https://localhost:5001/Users/CheckAge?Age=99`.

When a properly formatted `age` parameter from the query string is submitted, the form validates.

The second form on the Check Age page submits the `Age` value in the body of the request, and validation fails. Binding fails because the `age` parameter must come from a query string.

## Maximum errors

Validation stops when the maximum number of errors is reached (200 by default). You can configure this number with the following code in `Startup.ConfigureServices`:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs" id="snippet_Configuration" highlight="4"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs.md)

## Maximum recursion

[Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor) traverses the object graph of the model being validated. For models that are deep or are infinitely recursive, validation may result in stack overflow. [Microsoft.AspNetCore.Mvc.MvcOptions.MaxValidationDepth%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.MvcOptions.MaxValidationDepth%252A) provides a way to stop validation early if the visitor recursion exceeds a configured depth. The default value of `MvcOptions.MaxValidationDepth` is 32.

## Automatic short-circuit

Validation is automatically short-circuited (skipped) if the model graph doesn't require validation. Objects that the runtime skips validation for include collections of primitives (such as `byte[]`, `string[]`, `Dictionary<string, string>`) and complex object graphs that don't have any validators.

## Client-side validation

Client-side validation prevents submission until the form is valid. The Submit button runs JavaScript that either submits the form or displays error messages.

Client-side validation avoids an unnecessary round trip to the server when there are input errors on a form. The following script references in `_Layout.cshtml` and `_ValidationScriptsPartial.cshtml` support client-side validation:

[language="cshtml" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Views/Shared/\_Layout.cshtml" id="snippet_Scripts"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Views/Shared/\_Layout.cshtml)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Views/Shared/_Layout.cshtml.md)

[language="cshtml" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Views/Shared/\_ValidationScriptsPartial.cshtml" id="snippet_Scripts"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Views/Shared/\_ValidationScriptsPartial.cshtml)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Views/Shared/_ValidationScriptsPartial.cshtml.md)

The [jQuery Unobtrusive Validation](https://github.com/aspnet/jquery-validation-unobtrusive) script is a custom Microsoft front-end library that builds on the popular [jQuery Validation](https://jqueryvalidation.org/) plugin. Without jQuery Unobtrusive Validation, you would have to code the same validation logic in two places: once in the server-side validation attributes on model properties, and then again in client-side scripts. Instead, [Tag Helpers](../../../views/tag-helpers/intro.md) and [HTML helpers](../../../views/overview.md) use the validation attributes and type metadata from model properties to render HTML 5 `data-` attributes for the form elements that need validation. jQuery Unobtrusive Validation parses the `data-` attributes and passes the logic to jQuery Validation, effectively "copying" the server-side validation logic to the client. You can display validation errors on the client using tag helpers as shown here:

[language="cshtml" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml" id="snippet_ReleaseDate" highlight="3-4"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Pages/Movies/Create.cshtml.md)

The preceding tag helpers render the following HTML:

```html
<div class="form-group">
    <label class="control-label" for="Movie_ReleaseDate">Release Date</label>
    <input class="form-control" type="date" data-val="true"
        data-val-required="The Release Date field is required."
        id="Movie_ReleaseDate" name="Movie.ReleaseDate" value="">
    <span class="text-danger field-validation-valid"
        data-valmsg-for="Movie.ReleaseDate" data-valmsg-replace="true"></span>
</div>
```

Notice that the `data-` attributes in the HTML output correspond to the validation attributes for the `Movie.ReleaseDate` property. The `data-val-required` attribute contains an error message to display if the user doesn't fill in the release date field. jQuery Unobtrusive Validation passes this value to the jQuery Validation [required()](https://jqueryvalidation.org/required-method/) method, which then displays that message in the accompanying **\<span>** element.

Data type validation is based on the .NET type of a property, unless that is overridden by a [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataType) attribute. Browsers have their own default error messages, but the jQuery Validation Unobtrusive Validation package can override those messages. `[DataType]` attributes and subclasses such as [\[EmailAddress\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EmailAddressAttribute) let you specify the error message.

## Unobtrusive validation

For information on unobtrusive validation, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/1111).

### Add Validation to Dynamic Forms

jQuery Unobtrusive Validation passes validation logic and parameters to jQuery Validation when the page first loads. Therefore, validation doesn't work automatically on dynamically generated forms. To enable validation, tell jQuery Unobtrusive Validation to parse the dynamic form immediately after you create it. For example, the following code sets up client-side validation on a form added via AJAX.

```javascript
$.get({
    url: "https://url/that/returns/a/form",
    dataType: "html",
    error: function(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ": Couldn't add form. " + errorThrown);
    },
    success: function(newFormHTML) {
        var container = document.getElementById("form-container");
        container.insertAdjacentHTML("beforeend", newFormHTML);
        var forms = container.getElementsByTagName("form");
        var newForm = forms[forms.length - 1];
        $.validator.unobtrusive.parse(newForm);
    }
})
```

The `$.validator.unobtrusive.parse()` method accepts a jQuery selector for its one argument. This method tells jQuery Unobtrusive Validation to parse the `data-` attributes of forms within that selector. The values of those attributes are then passed to the jQuery Validation plugin.

### Add Validation to Dynamic Controls

The `$.validator.unobtrusive.parse()` method works on an entire form, not on individual dynamically generated controls, such as `<input>` and `<select/>`. To reparse the form, remove the validation data that was added when the form was parsed earlier, as shown in the following example:

```javascript
$.get({
    url: "https://url/that/returns/a/control",
    dataType: "html",
    error: function(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ": Couldn't add control. " + errorThrown);
    },
    success: function(newInputHTML) {
        var form = document.getElementById("my-form");
        form.insertAdjacentHTML("beforeend", newInputHTML);
        $(form).removeData("validator")    // Added by jQuery Validation
               .removeData("unobtrusiveValidation");   // Added by jQuery Unobtrusive Validation
        $.validator.unobtrusive.parse(form);
    }
})
```

## Custom client-side validation

Custom client-side validation is done by generating `data-` HTML attributes that work with a custom jQuery Validation adapter. The following sample adapter code was written for the `[ClassicMovie]` and `[ClassicMovieWithClientValidator]` attributes that were introduced earlier in this article:

[language="javascript" source="\~/mvc/models/validation/samples/3.x/ValidationSample/wwwroot/js/classicMovieValidator.js"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/wwwroot/js/classicMovieValidator.js)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/wwwroot/js/classicMovieValidator.js.md)

For information about how to write adapters, see the [jQuery Validation documentation](https://jqueryvalidation.org/documentation/).

The use of an adapter for a given field is triggered by `data-` attributes that:

* Flag the field as being subject to validation (`data-val="true"`).
* Identify a validation rule name and error message text (for example, `data-val-rulename="Error message."`).
* Provide any additional parameters the validator needs (for example, `data-val-rulename-param1="value"`).

The following example shows the `data-` attributes for the [sample app's](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples) `ClassicMovie` attribute:

```html
<input class="form-control" type="date"
    data-val="true"
    data-val-classicmovie="Classic movies must have a release year no later than 1960."
    data-val-classicmovie-year="1960"
    data-val-required="The Release Date field is required."
    id="Movie_ReleaseDate" name="Movie.ReleaseDate" value="">
```

As noted earlier, [Tag Helpers](../../../views/tag-helpers/intro.md) and [HTML helpers](../../../views/overview.md) use information from validation attributes to render `data-` attributes. There are two options for writing code that results in the creation of custom `data-` HTML attributes:

* Create a class that derives from [Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%25601) and a class that implements [Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider), and register your attribute and its adapter in DI. This method follows the [single responsibility principle](https://wikipedia.org/wiki/Single_responsibility_principle) in that server-related and client-related validation code is in separate classes. The adapter also has the advantage that since it's registered in DI, other services in DI are available to it if needed.
* Implement [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator) in your [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute) class. This method might be appropriate if the attribute doesn't do any server-side validation and doesn't need any services from DI.

### AttributeAdapter for client-side validation

This method of rendering `data-` attributes in HTML is used by the `ClassicMovie` attribute in the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples). To add client validation by using this method:

1. Create an attribute adapter class for the custom validation attribute. Derive the class from [Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase%25601). Create an `AddValidation` method that adds `data-` attributes to the rendered output, as shown in this example:

   [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieAttributeAdapter.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieAttributeAdapter.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieAttributeAdapter.cs.md)

1. Create an adapter provider class that implements [Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider). In the [Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider.GetAttributeAdapter%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider.GetAttributeAdapter%252A) method pass in the custom attribute to the adapter's constructor, as shown in this example:

   [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Validation/CustomValidationAttributeAdapterProvider.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Validation/CustomValidationAttributeAdapterProvider.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Validation/CustomValidationAttributeAdapterProvider.cs.md)

1. Register the adapter provider for DI in `Startup.ConfigureServices`:

   [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs" id="snippet_Configuration" highlight="9-10"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs.md)

### IClientModelValidator for client-side validation

This method of rendering `data-` attributes in HTML is used by the `ClassicMovieWithClientValidator` attribute in the [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/models/validation/samples). To add client validation by using this method:

* In the custom validation attribute, implement the [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator) interface and create an [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator.AddValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator.AddValidation%252A) method. In the `AddValidation` method, add `data-` attributes for validation, as shown in the following example:

  [language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieWithClientValidatorAttribute.cs" id="snippet_Class"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieWithClientValidatorAttribute.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Validation/ClassicMovieWithClientValidatorAttribute.cs.md)

## Disable client-side validation

The following code disables client validation in Razor Pages:

[language="csharp" source="\~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs" id="snippet_DisableClientValidation" highlight="2-5"::: (complete source file; reference: \~/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs)](../../../../../_code/aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Startup.cs.md)

Other options to disable client-side validation:

* Comment out the reference to `_ValidationScriptsPartial` in all the `.cshtml` files.
* Remove the contents of the *Pages\Shared\_ValidationScriptsPartial.cshtml* file.

The preceding approach won't prevent client-side validation of ASP.NET Core Identity Razor class library. For more information, see [security/authentication/scaffold-identity](../../../../security/authentication/scaffold-identity.md).

## Additional resources

* [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations)
* [Model Binding](../../model-binding.md)
