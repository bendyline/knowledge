# Source code: aspnetcore/mvc/views/display-templates/sample/Pages/Adr2/DetailsCC.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model WebAddress.Pages.Adr2.DetailsCCModel

@{
    ViewData["Title"] = "Details Short";
}

<h1>Details Short</h1>

<div>
    <h4>Address Short</h4>
    <hr />
    <dl class="row">
        <dd class="col-sm-10">
           @Html.DisplayFor(model => model.Address,"AddressShort")
        </dd>
    </dl>
</div>

```
