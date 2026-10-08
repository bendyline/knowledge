<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\&highlight=7-16)](../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.
