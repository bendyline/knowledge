# Source code: aspnetcore/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Components/Pages/Counter.razor

Complete source file; linked examples may select a region or line range.

```
@page "/counter"
@rendermode InteractiveServer

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}

```
