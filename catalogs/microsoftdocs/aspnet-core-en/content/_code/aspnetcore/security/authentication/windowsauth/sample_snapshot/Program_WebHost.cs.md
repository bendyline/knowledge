# Source code: aspnetcore/security/authentication/windowsauth/sample_snapshot/Program_WebHost.cs

Complete source file; linked examples may select a region or line range.

```
public class Program
{
    public static void Main(string[] args) => 
        BuildWebHost(args).Run();

    public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .UseHttpSys(options =>
            {
                options.Authentication.Schemes = 
                    AuthenticationSchemes.NTLM | 
                    AuthenticationSchemes.Negotiate;
                options.Authentication.AllowAnonymous = false;
            })
            .Build();
}

```
