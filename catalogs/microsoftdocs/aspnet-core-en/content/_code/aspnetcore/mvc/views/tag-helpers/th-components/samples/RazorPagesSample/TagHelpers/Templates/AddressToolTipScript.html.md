# Source code: aspnetcore/mvc/views/tag-helpers/th-components/samples/RazorPagesSample/TagHelpers/Templates/AddressToolTipScript.html

Complete source file; linked examples may select a region or line range.

```
<script>
$("address[printable]").hover(function() {
    $(this).attr({
        "data-toggle": "tooltip",
        "data-placement": "right",
        "title": "Home of Microsoft!"
    });
});
</script>

```
