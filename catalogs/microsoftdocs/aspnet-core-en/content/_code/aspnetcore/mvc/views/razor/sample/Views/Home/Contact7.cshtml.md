# Source code: aspnetcore/mvc/views/razor/sample/Views/Home/Contact7.cshtml

Complete source file; linked examples may select a region or line range.

```
@try
{
    throw new InvalidOperationException("You did something invalid.");
}
catch (Exception ex)
{
    <p>The exception message: @ex.Message</p>
}
finally
{
    <p>The finally statement.</p>
}

```
