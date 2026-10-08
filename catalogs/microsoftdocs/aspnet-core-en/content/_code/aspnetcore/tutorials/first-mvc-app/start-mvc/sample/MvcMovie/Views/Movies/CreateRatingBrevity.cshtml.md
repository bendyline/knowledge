# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Views/Movies/CreateRatingBrevity.cshtml

Complete source file; linked examples may select a region or line range.

```
<form asp-action="Create">
    <div class="form-horizontal">
        <h4>Movie</h4>
        <hr />

        <div asp-validation-summary="ModelOnly" class="text-danger"></div>
        <div class="form-group">
            <label asp-for="Title" class="col-md-2 control-label"></label>
            <div class="col-md-10">
                <input asp-for="Title" class="form-control" />
                <span asp-validation-for="Title" class="text-danger"></span>
            </div>
        </div>

        @*Markup removed for brevity.*@
    </div>
</form>

```
