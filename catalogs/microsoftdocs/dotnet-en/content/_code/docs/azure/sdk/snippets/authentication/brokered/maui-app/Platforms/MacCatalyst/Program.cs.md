# Source code: docs/azure/sdk/snippets/authentication/brokered/maui-app/Platforms/MacCatalyst/Program.cs

Complete source file; linked examples may select a region or line range.

```
using ObjCRuntime;
using UIKit;

namespace SecretVaultApp;

public class Program
{
	// This is the main entry point of the application.
	static void Main(string[] args)
	{
		// if you want to use a different Application Delegate class from "AppDelegate"
		// you can specify it here.
		UIApplication.Main(args, null, typeof(AppDelegate));
	}
}

```
