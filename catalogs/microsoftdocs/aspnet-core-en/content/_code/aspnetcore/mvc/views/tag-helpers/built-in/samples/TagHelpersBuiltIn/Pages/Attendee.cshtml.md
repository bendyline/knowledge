# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Pages/Attendee.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model TagHelpersBuiltIn.Pages.AttendeeModel
@{
    ViewData["Title"] = "Attendee - Razor Pages";
}

<h2>Attendee - Razor Pages</h2>

@if (ViewData["AttendeeId"] != null)
{
    <h4>Profile for attendee ID: @ViewData["AttendeeId"]</h4>
}
```
