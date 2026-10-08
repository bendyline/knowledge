# Source code: aspnetcore/migration/fx-to-core/areas/session/samples/remote/Global.asax.cs

Complete source file; linked examples may select a region or line range.

```
public class Global : HttpApplication
{
        protected void Application_Start()
        {
            HttpApplicationHost.RegisterHost(builder =>
            {
                builder.AddSystemWebAdapters()
                    .AddJsonSessionSerializer(options =>
                    {
                        // Serialization/deserialization requires each session key to be registered to a type
                        options.RegisterKey<int>("test-value");
                        options.RegisterKey<SessionDemoModel>("SampleSessionItem");
                    })
                    // Provide a strong API key that will be used to authenticate the request on the remote app for querying the session
                    // ApiKey is a string representing a GUID
                    .AddRemoteAppServer(options => options.ApiKey = ConfigurationManager.AppSettings["RemoteAppApiKey"])
                    .AddSessionServer();
            });
        }
}

```
