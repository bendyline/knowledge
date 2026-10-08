# Source code: aspnetcore/mvc/views/tag-helpers/built-in/samples/TagHelpersBuiltIn/Views/Speaker/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@model List<TagHelpersBuiltIn.Controllers.Speaker>

@{
    ViewBag.Title = "Speakers";
}

<h2>Speakers</h2>
<ul>
    @foreach (var speaker in @Model)
    {
        <li><a href="/Speaker/@speaker.SpeakerId">@speaker.SpeakerId</a></li>
    }
</ul>

```
