# Source code: docs/azure/sdk/snippets/authentication/brokered/maui-app/Platforms/Android/MainApplication.cs

Complete source file; linked examples may select a region or line range.

```
using Android.App;
using Android.Runtime;

namespace SecretVaultApp;

[Application]
public class MainApplication : MauiApplication
{
	public MainApplication(IntPtr handle, JniHandleOwnership ownership)
		: base(handle, ownership)
	{
	}

	protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}

```
