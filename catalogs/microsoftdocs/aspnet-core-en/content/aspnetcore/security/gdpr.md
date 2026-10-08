---
title: General Data Protection Regulation (GDPR) support in ASP.NET Core
author: tdykstra
description: Learn how to access the GDPR extension points in an ASP.NET Core web app.
ms.author: tdykstra
ms.date: 07/11/2019
uid: security/gdpr
---
# EU General Data Protection Regulation (GDPR) support in ASP.NET Core

By [Rick Anderson](https://twitter.com/RickAndMSFT)

ASP.NET Core provides APIs and templates to help meet some of the [EU General Data Protection Regulation (GDPR)](https://ec.europa.eu/info/law/law-topic/data-protection/reform/what-does-general-data-protection-regulation-gdpr-govern_en) requirements:

**Applies to: \>= aspnetcore-7.0**

* The project templates include extension points and stubbed markup that you can replace with your privacy and cookie use policy.
* The `Pages/Privacy.cshtml` page or `Views/Home/Privacy.cshtml` view provides a page to detail your site's privacy policy.

For GDPR guidance that applies to Blazor apps, see [blazor/security/gdpr](../blazor/security/gdpr.md).

To enable the default cookie consent feature like that found in the ASP.NET Core 2.2 templates in a current ASP.NET Core template generated app, add the following highlighted code to `Program.cs`:

  [Main (complete source file; reference: \~/security/gdpr/sample/RP6.0/WebGDPR/Program.cs?name=snippet_1\&highlight=4-11,23)](../../_code/aspnetcore/security/gdpr/sample/RP6.0/WebGDPR/Program.cs.md)

In the preceding code, [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) and [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) are used.

* Add the cookie consent partial to the `_Layout.cshtml` file:

  [Main (complete source file; reference: \~/security/gdpr/sample/RP6.0/WebGDPR/Pages/Shared/\_Layout.cshtml?name=snippet\&highlight=4)](../../_code/aspnetcore/security/gdpr/sample/RP6.0/WebGDPR/Pages/Shared/_Layout.cshtml.md)

* Add the `_CookieConsentPartial.cshtml` file to the project:

  [Main (complete source file; reference: \~/security/gdpr/sample/RP6.0/WebGDPR/Pages/Shared/\_CookieConsentPartial.cshtml)](../../_code/aspnetcore/security/gdpr/sample/RP6.0/WebGDPR/Pages/Shared/_CookieConsentPartial.cshtml.md)

* Select the ASP.NET Core [2.2 version](gdpr.md) of this article to read about the cookie consent feature.

## Customize the cookie consent value

Specify the value used to track if the user consented to the cookie use policy using the [`CookiePolicyOptions.ConsentCookieValue`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.cookiepolicyoptions.consentcookievalue) property:

[Main (complete source file; reference: \~/security/gdpr/sample/RP6.0/WebGDPR/Program.cs?name=snippet_2\&highlight=8)](../../_code/aspnetcore/security/gdpr/sample/RP6.0/WebGDPR/Program.cs.md)

## Encryption at rest

Some databases and storage mechanisms allow for encryption at rest. Encryption at rest:

* Encrypts stored data automatically.
* Encrypts without configuration, programming, or other work for the software that accesses the data.
* Is the easiest and safest option.
* Allows the database to manage keys and encryption.

For example:

* Microsoft SQL and Azure SQL provide [Transparent Data Encryption](https://learn.microsoft.com/sql/relational-databases/security/encryption/transparent-data-encryption) (TDE).
* [SQL Azure encrypts the database by default](https://azure.microsoft.com/updates/newly-created-azure-sql-databases-encrypted-by-default/)
* [Azure Blobs, Files, Table, and Queue Storage are encrypted by default](https://azure.microsoft.com/blog/announcing-default-encryption-for-azure-blobs-files-table-and-queue-storage/).

For databases that don't provide built-in encryption at rest, you may be able to use disk encryption to provide the same protection. For example:

* [BitLocker for Windows Server](https://learn.microsoft.com/windows/security/information-protection/bitlocker/bitlocker-how-to-deploy-on-windows-server)
* Linux:
  * [eCryptfs](https://launchpad.net/ecryptfs)
  * [EncFS](https://github.com/vgough/encfs).

## Additional resources

* [Microsoft Trust Center: Safeguard individual privacy with cloud services from Microsoft: GDPR](https://www.microsoft.com/trust-center/privacy/gdpr-overview)
* [European Commission: Data protection explained](https://ec.europa.eu/info/law/law-topic/data-protection/reform/what-does-general-data-protection-regulation-gdpr-govern_en)



**Applies to: \= aspnetcore-2.2**

* The project templates include extension points and stubbed markup that you can replace with your privacy and cookie use policy.
* A cookie consent feature allows you to ask for (and track) consent from your users for storing personal information. If a user hasn't consented to data collection and the app has [Microsoft.AspNetCore.Builder.CookiePolicyOptions.CheckConsentNeeded%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions.CheckConsentNeeded%252A) set to `true`, non-essential cookies aren't sent to the browser.
* Cookies can be marked as essential. Essential cookies are sent to the browser even when the user hasn't consented and tracking is disabled.
* [TempData and Session cookies](#tempdata) aren't functional when tracking is disabled.
* The [Identity manage](#pd) page provides a link to download and delete user data.

The [sample app](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/gdpr/sample) allows you to test most of the GDPR extension points and APIs added to the ASP.NET Core 2.1 templates. See the [ReadMe](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/gdpr/sample) file for testing instructions.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/live/aspnetcore/security/gdpr/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## ASP.NET Core GDPR support in template-generated code

Razor Pages and MVC projects created with the project templates include the following GDPR support:

* [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) and [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) are set in the `Startup` class.
* The *\_CookieConsentPartial.cshtml* [partial view](../mvc/views/tag-helpers/built-in/partial-tag-helper.md). An **Accept** button is included in this file. When the user clicks the **Accept** button, consent to store cookies is provided.
* The `Pages/Privacy.cshtml` page or `Views/Home/Privacy.cshtml` view provides a page to detail your site's privacy policy. The *\_CookieConsentPartial.cshtml* file generates a link to the Privacy page.
* For apps created with individual user accounts, the Manage page provides links to download and delete [personal user data](#pd).

### CookiePolicyOptions and UseCookiePolicy

[Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) are initialized in `Startup.ConfigureServices`:

[Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/Startup.cs?name=snippet1\\&highlight=14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

[Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) is called in `Startup.Configure`:

[Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/Startup.cs?name=snippet1\\&highlight=51](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

### \_CookieConsentPartial.cshtml partial view

The *\_CookieConsentPartial.cshtml* partial view:

[Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP2.2/Pages/Shared/_CookieConsentPartial.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

This partial:

* Obtains the state of tracking for the user. If the app is configured to require consent, the user must consent before cookies can be tracked. If consent is required, the cookie consent panel is fixed at top of the navigation bar created by the *\_Layout.cshtml* file.
* Provides an HTML `<p>` element to summarize your privacy and cookie use policy.
* Provides a link to Privacy page or view where you can detail your site's privacy policy.

## Essential cookies

If consent to store cookies hasn't been provided, only cookies marked essential are sent to the browser. The following code makes a cookie essential:

[Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP2.2/Pages/Cookie.cshtml.cs?name=snippet1\\&highlight=5](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

<a name="tempdata"></a>

### TempData provider and session state cookies aren't essential

The [TempData provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata) cookie isn't essential. If tracking is disabled, the TempData provider isn't functional. To enable the TempData provider when tracking is disabled, mark the TempData cookie as essential in `Startup.ConfigureServices`:

[Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP2.2/Startup.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

[Session state](../fundamentals/app-state.md) cookies are not essential. Session state isn't functional when tracking is disabled. The following code makes session cookies essential:

[Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP2.2/Startup.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

<a name="pd"></a>

## Personal data

ASP.NET Core apps created with individual user accounts include code to download and delete personal data.

Select the user name and then select **Personal data**:

Manage personal data page

Notes:

* To generate the `Account/Manage` code, see [Scaffold Identity](authentication/scaffold-identity.md).
* The **Delete** and **Download** links only act on the default identity data. Apps that create custom user data must be extended to delete/download the custom user data. For more information, see [Add, download, and delete custom user data to Identity](authentication/add-user-data.md).
* Saved tokens for the user that are stored in the Identity database table `AspNetUserTokens` are deleted when the user is deleted via the cascading delete behavior due to the [foreign key](https://github.com/aspnet/Identity/blob/release/2.1/src/EF/IdentityUserContext.cs#L152).
* [External provider authentication](authentication/social/index.md), such as Facebook and Google, isn't available before the cookie policy is accepted.

## Encryption at rest

Some databases and storage mechanisms allow for encryption at rest. Encryption at rest:

* Encrypts stored data automatically.
* Encrypts without configuration, programming, or other work for the software that accesses the data.
* Is the easiest and safest option.
* Allows the database to manage keys and encryption.

For example:

* Microsoft SQL and Azure SQL provide [Transparent Data Encryption](https://learn.microsoft.com/sql/relational-databases/security/encryption/transparent-data-encryption) (TDE).
* [SQL Azure encrypts the database by default](https://azure.microsoft.com/updates/newly-created-azure-sql-databases-encrypted-by-default/)
* [Azure Blobs, Files, Table, and Queue Storage are encrypted by default](https://azure.microsoft.com/blog/announcing-default-encryption-for-azure-blobs-files-table-and-queue-storage/).

For databases that don't provide built-in encryption at rest, you may be able to use disk encryption to provide the same protection. For example:

* [BitLocker for Windows Server](https://learn.microsoft.com/windows/security/information-protection/bitlocker/bitlocker-how-to-deploy-on-windows-server)
* Linux:
  * [eCryptfs](https://launchpad.net/ecryptfs)
  * [EncFS](https://github.com/vgough/encfs).

## Additional resources

* [Microsoft.com/GDPR](https://www.microsoft.com/trustcenter/Privacy/GDPR)


**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

* The project templates include extension points and stubbed markup that you can replace with your privacy and cookie use policy.
* The `Pages/Privacy.cshtml` page or `Views/Home/Privacy.cshtml` view provides a page to detail your site's privacy policy.

To enable the default cookie consent feature like that found in the ASP.NET Core 2.2 templates in a current ASP.NET Core template generated app:

* Add `using Microsoft.AspNetCore.Http` to the list of using directives.
* Add [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) to `Startup.ConfigureServices` and [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) to `Startup.Configure`:

  [Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP3.0/Startup.cs?name=snippet1\\&highlight=12-19,38](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

* Add the cookie consent partial to the `_Layout.cshtml` file:

  [Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP3.0/Pages/Shared/_Layout.cshtml?name=snippet\\&highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

* Add the *\_CookieConsentPartial.cshtml* file to the project:

  [Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP3.0/Pages/Shared/_CookieConsentPartial.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

* Select the ASP.NET Core 2.2 version of this article to read about the cookie consent feature.



**Applies to: \= aspnetcore-6.0**

* The project templates include extension points and stubbed markup that you can replace with your privacy and cookie use policy.
* The `Pages/Privacy.cshtml` page or `Views/Home/Privacy.cshtml` view provides a page to detail your site's privacy policy.

To enable the default cookie consent feature like that found in the ASP.NET Core 2.2 templates in a current ASP.NET Core template generated app, add the following highlighted code to `Program.cs`:

  [Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP6.0/WebGDPR/Program.cs?name=snippet_1\\&highlight=4-11,23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

In the preceding code, [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) and [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) are used.

* Add the cookie consent partial to the `_Layout.cshtml` file:

  [Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP6.0/WebGDPR/Pages/Shared/_Layout.cshtml?name=snippet\\&highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

* Add the `_CookieConsentPartial.cshtml` file to the project:

  [Code reference unavailable in this source snapshot: gdpr/includes/~/security/gdpr/sample/RP6.0/WebGDPR/Pages/Shared/_CookieConsentPartial.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/gdpr.md)

* Select the ASP.NET Core [2.2 version](gdpr.md) of this article to read about the cookie consent feature.

## Encryption at rest

Some databases and storage mechanisms allow for encryption at rest. Encryption at rest:

* Encrypts stored data automatically.
* Encrypts without configuration, programming, or other work for the software that accesses the data.
* Is the easiest and safest option.
* Allows the database to manage keys and encryption.

For example:

* Microsoft SQL and Azure SQL provide [Transparent Data Encryption](https://learn.microsoft.com/sql/relational-databases/security/encryption/transparent-data-encryption) (TDE).
* [SQL Azure encrypts the database by default](https://azure.microsoft.com/updates/newly-created-azure-sql-databases-encrypted-by-default/)
* [Azure Blobs, Files, Table, and Queue Storage are encrypted by default](https://azure.microsoft.com/blog/announcing-default-encryption-for-azure-blobs-files-table-and-queue-storage/).

For databases that don't provide built-in encryption at rest, you may be able to use disk encryption to provide the same protection. For example:

* [BitLocker for Windows Server](https://learn.microsoft.com/windows/security/information-protection/bitlocker/bitlocker-how-to-deploy-on-windows-server)
* Linux:
  * [eCryptfs](https://launchpad.net/ecryptfs)
  * [EncFS](https://github.com/vgough/encfs).

## Additional resources

* [Microsoft.com/GDPR](https://www.microsoft.com/trustcenter/Privacy/GDPR)
