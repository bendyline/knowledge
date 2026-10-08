# Source code: docs/azure/sdk/snippets/authentication/brokered/maui-app/Platforms/Android/MainActivity.cs

Complete source file; linked examples may select a region or line range.

```
using Android.App;
using Android.Content.PM;
using Android.OS;

namespace SecretVaultApp;

[Activity(Theme = "@style/Maui.SplashTheme", MainLauncher = true, LaunchMode = LaunchMode.SingleTop, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]
public class MainActivity : MauiAppCompatActivity
{
}

```
