# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Products.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model TagHelpersBuiltIn.Pages.ProductsModel
@{
    ViewData["Title"] = "Products";
}

<h2>Products</h2>

<!-- <snippet_HtmlHelper> -->
@foreach (var product in Model.Products)
{
    @await Html.PartialAsync("_ProductPartial", product)
}
<!-- </snippet_HtmlHelper> -->

<!-- <snippet_TagHelper> -->
@foreach (var product in Model.Products)
{
    <partial name="_ProductPartial" model="@product" />
}
<!-- </snippet_TagHelper> -->

```
