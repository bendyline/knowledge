# Source code: aspnetcore/data/ef-mvc/intro/samples/cu-final/Views/Instructors/Details.cshtml

Complete source file; linked examples may select a region or line range.

```
@model ContosoUniversity.Models.Instructor

@{
    ViewData["Title"] = "Details";
}

<h1>Details</h1>

<div>
    <h4>Instructor</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.LastName)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.LastName)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.FirstMidName)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.FirstMidName)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.HireDate)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.HireDate)
        </dd>
    </dl>
</div>
<div>
    <a asp-action="Edit" asp-route-id="@Model.ID">Edit</a> |
    <a asp-action="Index">Back to List</a>
</div>

```
