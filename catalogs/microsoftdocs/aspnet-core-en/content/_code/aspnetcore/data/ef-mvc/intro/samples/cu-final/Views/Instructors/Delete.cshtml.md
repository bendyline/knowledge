# Source code: aspnetcore/data/ef-mvc/intro/samples/cu-final/Views/Instructors/Delete.cshtml

Complete source file; linked examples may select a region or line range.

```
@model ContosoUniversity.Models.Instructor

@{
    ViewData["Title"] = "Delete";
}

<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
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
    
    <form asp-action="Delete">
        <input type="hidden" asp-for="ID" />
        <input type="submit" value="Delete" class="btn btn-danger" /> |
        <a asp-action="Index">Back to List</a>
    </form>
</div>

```
