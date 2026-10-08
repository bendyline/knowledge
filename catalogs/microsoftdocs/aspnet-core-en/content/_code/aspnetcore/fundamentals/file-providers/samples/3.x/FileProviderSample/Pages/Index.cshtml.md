# Source code: aspnetcore/fundamentals/file-providers/samples/3.x/FileProviderSample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "File Provider Sample";
}

<h1>@ViewData["Title"]</h1>

<div class="row">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h2 class="panel-title">Folder Contents</h2>
        </div>
        <div class="panel-body">
            <ul>
                @foreach (var item in Model.DirectoryContents)
                {
                    if (item.IsDirectory)
                    {
                        <li><strong>@item.Name</strong> folder</li>
                    }
                    else
                    {
                        <li>@item.Name - @item.Length bytes</li>
                    }
                }
            </ul>
        </div>
    </div>
</div>

```
