# Source code: aspnetcore/data/ef-rp/intro/samples/cu20snapshots/cu-part5-complex/Pages/Students/Create.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model ContosoUniversity.Pages.Students.CreateModel

@{
    ViewData["Title"] = "Create";
}

<h2>Create</h2>

<h4>Student</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="Student.LastName" class="control-label"></label>
                <input asp-for="Student.LastName" class="form-control" />
                <span asp-validation-for="Student.LastName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Student.FirstMidName" class="control-label"></label>
                <input asp-for="Student.FirstMidName" class="form-control" />
                <span asp-validation-for="Student.FirstMidName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Student.EnrollmentDate" class="control-label"></label>
                <input asp-for="Student.EnrollmentDate" class="form-control" />
                <span asp-validation-for="Student.EnrollmentDate" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Create" class="btn btn-default" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="Index">Back to List</a>
</div>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}

```
