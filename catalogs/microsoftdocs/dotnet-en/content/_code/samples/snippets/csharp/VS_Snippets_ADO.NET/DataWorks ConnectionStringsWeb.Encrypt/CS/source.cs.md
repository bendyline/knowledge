# Source code: samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringsWeb.Encrypt/CS/source.cs

Complete source file; linked examples may select a region or line range.

```
using System.Configuration;
using System.Web.Configuration;

static class Program
{
    static void Main()
    {
    }
    // <Snippet1>
    static void ToggleWebEncrypt()
    {
        // Open the Web.config file.
        Configuration config = WebConfigurationManager.
            OpenWebConfiguration("~");

        // Get the connectionStrings section.
        var section =
            config.GetSection("connectionStrings")
            as ConnectionStringsSection;

        // Toggle encryption.
        if (section.SectionInformation.IsProtected)
        {
            section.SectionInformation.UnprotectSection();
        }
        else
        {
            section.SectionInformation.ProtectSection(
                "DataProtectionConfigurationProvider");
        }

        // Save changes to the Web.config file.
        config.Save();
    }
    // </Snippet1>
}

```
