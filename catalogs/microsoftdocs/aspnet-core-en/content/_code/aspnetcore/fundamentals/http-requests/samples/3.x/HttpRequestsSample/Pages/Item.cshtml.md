# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpRequestsSample/Pages/Item.cshtml

Complete source file; linked examples may select a region or line range.

```
@page "/Item/{id}"
@model ItemModel

@{
    ViewData["Title"] = "Item";
}

<div class="row justify-content-center">
    <div class="col-md-6">
        <form asp-page-handler="Save" method="POST">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-floating">
                <input asp-for="Input.Name" class="form-control" />
                <label asp-for="Input.Name" class="form-label"></label>
                <span asp-validation-for="Input.Name" class="text-danger"></span>
            </div>
            <div class="form-group form-check">
                <input asp-for="Input.IsComplete" class="form-check-input">
                <label asp-for="Input.IsComplete" class="form-check-label">Completed</label>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Save</button>
                <button asp-page-handler="Delete" class="btn btn-danger">Delete</button>
            </div>
        </form>

        <div>
            <a asp-page="/Index">Back to List</a>
        </div>
    </div>
</div>

```
