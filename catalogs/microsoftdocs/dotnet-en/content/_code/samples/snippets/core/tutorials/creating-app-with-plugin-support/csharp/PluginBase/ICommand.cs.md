# Source code: samples/snippets/core/tutorials/creating-app-with-plugin-support/csharp/PluginBase/ICommand.cs

Complete source file; linked examples may select a region or line range.

```
namespace PluginBase
{
    public interface ICommand
    {
        string Name { get; }
        string Description { get; }

        int Execute();
    }
}

```
