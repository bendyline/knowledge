# Source code: docs/azure/sdk/snippets/authentication/additional-auth/interactive/Program.cs

Complete source file; linked examples may select a region or line range.

```
using InteractiveBrokeredAuthSample;

namespace WinFormsApp1
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            ApplicationConfiguration.Initialize();
            Application.Run(new InteractiveBrowserAuth());

            
        }
    }
}
```
