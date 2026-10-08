---
title: ASP.NET Core built-in Razor components
author: guardrex
description: Find information on Razor components provided by the Blazor framework.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 08/14/2026
uid: blazor/components/built-in-components
---
# ASP.NET Core built-in Razor components

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


The following built-in Razor components are provided by the Blazor framework. For information on non-security-related project template components, see [blazor/project-structure](../project-structure.md). For information on security-related project template components, see the [Security node articles](../security/index.md).

**Applies to: \>= aspnetcore-11.0**

* [`AntiforgeryToken`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Findex%23antiforgery-support)
* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CacheView`](../state-management/cacheview-component.md)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`DynamicComponent`](dynamiccomponent.md)
* [`Editor<T>`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23nest-and-bind-forms)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`ErrorBoundary`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries)
* [`FocusOnNavigate`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23focus-an-element-on-navigation)
* [`HeadContent`](control-head-content.md)
* [`HeadOutlet`](control-head-content.md)
* [`ImportMap`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23importmap-component)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputFile`](../file-uploads.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavigationLock`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23handleprevent-location-changes)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`PageTitle`](control-head-content.md)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`Paginator`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fquickgrid%23page-items-with-a-paginator-component)
* [`QuickGrid`](quickgrid.md)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`SectionContent`](sections.md)
* [`SectionOutlet`](sections.md)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`Virtualize`](virtualization.md)



**Applies to: \>= aspnetcore-9.0 < aspnetcore-11.0**

* [`AntiforgeryToken`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Findex%23antiforgery-support)
* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`DynamicComponent`](dynamiccomponent.md)
* [`Editor<T>`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23nest-and-bind-forms)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`ErrorBoundary`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries)
* [`FocusOnNavigate`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23focus-an-element-on-navigation)
* [`HeadContent`](control-head-content.md)
* [`HeadOutlet`](control-head-content.md)
* [`ImportMap`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fstatic-files%23importmap-component)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputFile`](../file-uploads.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavigationLock`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23handleprevent-location-changes)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`PageTitle`](control-head-content.md)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`Paginator`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fquickgrid%23page-items-with-a-paginator-component)
* [`QuickGrid`](quickgrid.md)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`SectionContent`](sections.md)
* [`SectionOutlet`](sections.md)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`Virtualize`](virtualization.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

* [`AntiforgeryToken`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Findex%23antiforgery-support)
* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`DynamicComponent`](dynamiccomponent.md)
* [`Editor<T>`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23nest-and-bind-forms)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`ErrorBoundary`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries)
* [`FocusOnNavigate`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23focus-an-element-on-navigation)
* [`HeadContent`](control-head-content.md)
* [`HeadOutlet`](control-head-content.md)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputFile`](../file-uploads.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavigationLock`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23handleprevent-location-changes)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`PageTitle`](control-head-content.md)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`Paginator`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fquickgrid%23page-items-with-a-paginator-component)
* [`QuickGrid`](quickgrid.md)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`SectionContent`](sections.md)
* [`SectionOutlet`](sections.md)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`Virtualize`](virtualization.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`DynamicComponent`](dynamiccomponent.md)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`ErrorBoundary`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries)
* [`FocusOnNavigate`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23focus-an-element-on-navigation)
* [`HeadContent`](control-head-content.md)
* [`HeadOutlet`](control-head-content.md)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputFile`](../file-uploads.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavigationLock`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23handleprevent-location-changes)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`PageTitle`](control-head-content.md)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`Virtualize`](virtualization.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`DynamicComponent`](dynamiccomponent.md)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`ErrorBoundary`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fhandle-errors%23error-boundaries)
* [`FocusOnNavigate`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23focus-an-element-on-navigation)
* [`HeadContent`](control-head-content.md)
* [`HeadOutlet`](control-head-content.md)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputFile`](../file-uploads.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`PageTitle`](control-head-content.md)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`Virtualize`](virtualization.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputFile`](../file-uploads.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`Virtualize`](virtualization.md)



**Applies to: < aspnetcore-5.0**

* [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)
* [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component)
* [`DataAnnotationsValidator`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23data-annotations-validator-component-and-custom-validation)
* [`EditForm`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fbinding%23editformeditcontext-model)
* [`InputCheckbox`](../forms/input-components.md)
* [`InputDate`](../forms/input-components.md)
* [`InputNumber`](../forms/input-components.md)
* [`InputRadio`](../forms/input-components.md)
* [`InputRadioGroup`](../forms/input-components.md)
* [`InputSelect`](../forms/input-components.md)
* [`InputText`](../forms/input-components.md)
* [`InputTextArea`](../forms/input-components.md)
* [`LayoutComponentBase`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23create-a-layout-component)
* [`LayoutView`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Flayouts%23apply-a-layout-to-arbitrary-content-layoutview-component)
* [`NavLink`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Fnavigation%23navlink-component)
* [`OwningComponentBase`](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23utility-base-component-classes-to-manage-a-di-scope)
* [`Router`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`RouteView`](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Frouting%23route-templates)
* [`ValidationMessage`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
* [`ValidationSummary`](https://learn.microsoft.com/search/?terms=blazor%2Fforms%2Fvalidation%23validation-summary-and-validation-message-components)
