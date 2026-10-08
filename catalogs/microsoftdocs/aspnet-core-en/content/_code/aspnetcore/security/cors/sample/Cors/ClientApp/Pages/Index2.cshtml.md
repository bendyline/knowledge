# Source code: aspnetcore/security/cors/sample/Cors/ClientApp/Pages/Index2.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
    <h1 class="display-4">CORS Test</h1>
</div>

<div>
    <input type="button" value="Test" 
           onclick="requestVal('https://<web app>.azurewebsites.net/api/values')" />
    <span id='result'></span>
</div>

<script>
    function requestVal(uri) {
        const resultSpan = document.getElementById('result');

        fetch(uri)
            .then(response => response.json())
            .then(data => resultSpan.innerText = data)
            .catch(error => resultSpan.innerText = 'See F12 Console for error');
    }
</script>
```
