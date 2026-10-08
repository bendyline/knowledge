# Source code: docs/framework/windows-services/snippets/MyNewService/csharp/Program-add-parameter.cs

Complete source file; linked examples may select a region or line range.

```
using System.ServiceProcess;

public class Class1
{
    // <Snippet1>
    static void Main(string[] args)
    {
        ServiceBase[] ServicesToRun;
        ServicesToRun = new ServiceBase[]
        {
            new MyNewService(args)
        };
        ServiceBase.Run(ServicesToRun);
    }
    // </Snippet1>
}

```
