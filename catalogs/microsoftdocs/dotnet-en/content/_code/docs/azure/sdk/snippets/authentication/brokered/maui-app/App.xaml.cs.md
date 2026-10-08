# Source code: docs/azure/sdk/snippets/authentication/brokered/maui-app/App.xaml.cs

Complete source file; linked examples may select a region or line range.

```
namespace SecretVaultApp;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();
	}

	protected override Window CreateWindow(IActivationState? activationState)
	{
		return new Window(new AppShell());
	}
}
```
