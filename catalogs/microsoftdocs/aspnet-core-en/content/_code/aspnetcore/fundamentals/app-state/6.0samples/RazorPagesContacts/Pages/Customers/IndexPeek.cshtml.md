# Source code: aspnetcore/fundamentals/app-state/6.0samples/RazorPagesContacts/Pages/Customers/IndexPeek.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel

<h1>Peek Contacts</h1>

@{
    if (TempData.Peek("Message") != null)
    {
        <h3>Message: @TempData.Peek("Message")</h3>
    }
}

@*Content removed for brevity.*@

@{
    ViewData["Title"] = "Peek";
}

<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var contact in Model.Customer)
        {
            <tr>
                <td> @contact.Id  </td>
                <td>@contact.Name</td>
                <td>
                    <a asp-page="./Edit" asp-route-id="@contact.Id">Edit</a>
                </td>
            </tr>
        }
    </tbody>
</table>
<a asp-page="Create">Create New</a>

```
