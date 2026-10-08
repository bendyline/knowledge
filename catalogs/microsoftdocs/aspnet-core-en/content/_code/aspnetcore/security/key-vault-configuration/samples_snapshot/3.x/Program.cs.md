# Source code: aspnetcore/security/key-vault-configuration/samples_snapshot/3.x/Program.cs

Complete source file; linked examples may select a region or line range.

```
config.AddAzureKeyVault(
    $"https://{builtConfig["KeyVaultName"]}.vault.azure.net/",
    builtConfig["AzureADApplicationId"],
    certs.OfType<X509Certificate2>().Single(),
    new PrefixKeyVaultSecretManager(versionPrefix));

```
