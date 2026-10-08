# Source code: docs/azure/sdk/snippets/authentication/brokered/maui-app/Platforms/Tizen/Main.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.Maui;
using Microsoft.Maui.Hosting;

namespace SecretVaultApp;

class Program : MauiApplication
{
	protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();

	static void Main(string[] args)
	{
		var app = new Program();
		app.Run(args);
	}
}

```
