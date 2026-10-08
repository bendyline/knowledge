# Source code: aspnetcore/signalr/security/sample/SignalR_CORS6-8/Program.cs

Complete source file; linked examples may select a region or line range.

```

// <snippet_AddCors>
using SignalRChat.Hubs;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://example.com");
                          policy.WithMethods("GET", "POST", "DELETE");
                          policy.AllowCredentials();
                      });
});

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

var app = builder.Build();

app.MapHub<ChatHub>("/chatHub");
// </snippet_AddCors>

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapRazorPages();


app.Run();

```
