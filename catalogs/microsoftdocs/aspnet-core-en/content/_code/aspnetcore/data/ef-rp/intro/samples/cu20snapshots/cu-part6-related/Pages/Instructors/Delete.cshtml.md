# Source code: aspnetcore/data/ef-rp/intro/samples/cu20snapshots/cu-part6-related/Pages/Instructors/Delete.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model ContosoUniversity.Pages.Instructors.DeleteModel

@{
    ViewData["Title"] = "Delete";
}

<h2>Delete</h2>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Instructor</h4>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            @Html.DisplayNameFor(model => model.Instructor.LastName)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Instructor.LastName)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Instructor.FirstMidName)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Instructor.FirstMidName)
        </dd>
        <dt>
            @Html.DisplayNameFor(model => model.Instructor.HireDate)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Instructor.HireDate)
        </dd>
    </dl>
    
    <form method="post">
        <input type="hidden" asp-for="Instructor.ID" />
        <input type="submit" value="Delete" class="btn btn-default" /> |
        <a asp-page="./Index">Back to List</a>
    </form>
</div>

```
