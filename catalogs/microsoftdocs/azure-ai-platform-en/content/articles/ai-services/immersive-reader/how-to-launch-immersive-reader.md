---
title: "How to launch the Immersive Reader"
titleSuffix: Azure AI services
description: Learn how to launch the Immersive reader using JavaScript, Python, C#, Android, or iOS.
author: sharmas
manager: mcleans
ms.service: azure-ai-immersive-reader
ms.topic: how-to
ms.date: 02/21/2024
ms.author: michtho
ms.custom: devx-track-js, devx-track-extended-java, devx-track-python, devx-track-csharp
zone_pivot_groups: immersive-reader-how-to-guides
ai-usage: ai-assisted
---

# How to launch the Immersive Reader

In the [overview](overview.md), you learned about the Immersive Reader and how it implements proven techniques to improve reading comprehension for language learners, emerging readers, and students with learning differences. This article demonstrates how to launch the Immersive Reader using JavaScript, Python, C#, Android, or iOS.

**Applies to: programming-language-javascript**



## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Immersive Reader resource configured for Microsoft Entra authentication. Follow [these instructions](how-to-create-immersive-reader.md) to get set up. Save the output of your session into a text file so you can configure the environment properties.
* [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).
* An IDE such as [Visual Studio Code](https://code.visualstudio.com).

## Create a Node.js web app with Express

Create a Node.js web app with the `express-generator` tool.

```bash
npm install express-generator -g
express --view=pug myapp
cd myapp
```

Install yarn dependencies, and add dependencies `request` and `dotenv`, which are used later in the tutorial.

```bash
yarn
yarn add request
yarn add dotenv
```

Install the axios and qs libraries with the following command:

```bash
npm install axios qs
```

<a name='acquire-an-azure-ad-authentication-token'></a>

## Set up authentication

Next, write a backend API to retrieve a Microsoft Entra authentication token.

You need some values from the Microsoft Entra auth configuration prerequisite step for this part. Refer back to the text file you saved from that session.

````text
TenantId     => Azure subscription TenantId
ClientId     => Microsoft Entra ApplicationId
ClientSecret => Microsoft Entra Application Service Principal password
Subdomain    => Immersive Reader resource subdomain (resource 'Name' if the resource was created in the Azure portal, or 'CustomSubDomain' option if the resource was created with Azure CLI PowerShell. Check the Azure portal for the subdomain on the Endpoint in the resource Overview page, for example, 'https://[SUBDOMAIN].cognitiveservices.azure.com/')
````

Create a new file called *.env* in the root of your project. Paste the following code into it, supplying the values given when you created your Immersive Reader resource. Don't include quotation marks or the `{` and `}` characters.

```text
TENANT_ID={YOUR_TENANT_ID}
CLIENT_ID={YOUR_CLIENT_ID}
CLIENT_SECRET={YOUR_CLIENT_SECRET}
SUBDOMAIN={YOUR_SUBDOMAIN}
```

Be sure not to commit this file into source control, as it contains secrets that shouldn't be made public.

Next, open *app.js* and add the following to the top of the file. This loads the properties defined in the *.env* file as environment variables into Node.

```javascript
require('dotenv').config();
```

Open the *routes\index.js* file and replace its content with the following code.

This code creates an API endpoint that acquires a Microsoft Entra authentication token using your service principal password. It also retrieves the subdomain. It then returns an object containing the token and subdomain.

```javascript
var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/getimmersivereaderlaunchparams', function(req, res) {
    request.post ({
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                url: `https://login.windows.net/${process.env.TENANT_ID}/oauth2/token`,
                form: {
                    grant_type: 'client_credentials',
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    resource: 'https://cognitiveservices.azure.com/'
                }
        },
        function(err, resp, tokenResponse) {
                if (err) {
                    return res.status(500).send('CogSvcs IssueToken error');
                }

                const token = JSON.parse(tokenResponse).access_token;
                const subdomain = process.env.SUBDOMAIN;
                return res.send({token: token, subdomain: subdomain});
        }
  );
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

```

The **getimmersivereaderlaunchparams** API endpoint should be secured behind some form of authentication (for example, [OAuth](https://oauth.net/2/)) to prevent unauthorized users from obtaining tokens to use against your Immersive Reader service and billing; that work is beyond the scope of this tutorial.

## Launch the Immersive Reader with sample content

1. Open *views\layout.pug*, and add the following code under the `head` tag, before the `body` tag. These `script` tags load the [Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk) and jQuery.

    ```pug
    script(src='https://ircdname.azureedge.net/immersivereadersdk/immersive-reader-sdk.1.2.0.js')
    script(src='https://code.jquery.com/jquery-3.3.1.min.js')
    ```

2. Open *views\index.pug*, and replace its content with the following code. This code populates the page with some sample content, and adds a button that launches the Immersive Reader.

    ```pug
    extends layout

    block content
          h2(id='title') Geography
          p(id='content') The study of Earth's landforms is called physical geography. Landforms can be mountains and valleys. They can also be glaciers, lakes or rivers.
          div(class='immersive-reader-button' data-button-style='iconAndText' data-locale='en-US' onclick='launchImmersiveReader()')
          script.

            function getImmersiveReaderLaunchParamsAsync() {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                                url: '/getimmersivereaderlaunchparams',
                                type: 'GET',
                                success: data => {
                                        resolve(data);
                                },
                                error: err => {
                                        console.log('Error in getting token and subdomain!', err);
                                        reject(err);
                                }
                        });
                    });
            }

            async function launchImmersiveReader() {
                    const content = {
                            title: document.getElementById('title').innerText,
                            chunks: [{
                                    content: document.getElementById('content').innerText + '\n\n',
                                    lang: 'en'
                            }]
                    };

                    const launchParams = await getImmersiveReaderLaunchParamsAsync();
                    const token = launchParams.token;
                    const subdomain = launchParams.subdomain;

                    ImmersiveReader.launchAsync(token, subdomain, content);
            }
    ```

3. Our web app is now ready. Start the app by running:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`. You should see the above content on the page. Select the **Immersive Reader** button to launch the Immersive Reader with your content.

## Specify the language of your content

The Immersive Reader has support for many different languages. You can specify the language of your content by following these steps.

1. Open *views\index.pug* and add the following code below the `p(id=content)` tag that you added in the previous step. This code adds some content Spanish content to your page.

    ```pug
    p(id='content-spanish') El estudio de las formas terrestres de la Tierra se llama geografía física. Los accidentes geográficos pueden ser montañas y valles. También pueden ser glaciares, lagos o ríos.
    ```

2. In *views\index.pug*, add the following code above the call to `ImmersiveReader.launchAsync`. This code passes the Spanish content into the Immersive Reader.

    ```pug
    content.chunks.push({
      content: document.getElementById('content-spanish').innerText + '\n\n',
      lang: 'es'
    });
    ```

3. Navigate to `http://localhost:3000` again. You should see the Spanish text on the page, and when you select **Immersive Reader**, it shows up in the Immersive Reader as well.

## Specify the language of the Immersive Reader interface

By default, the language of the Immersive Reader interface matches the browser's language settings. You can also specify the language of the Immersive Reader interface with the following code.

1. In *views\index.pug*, replace the call to `ImmersiveReader.launchAsync(token, subdomain, content)` with the following code.

    ```javascript
    const options = {
        uiLang: 'fr',
    }
    ImmersiveReader.launchAsync(token, subdomain, content, options);
    ```

2. Navigate to `http://localhost:3000`. When you launch the Immersive Reader, the interface is shown in French.

## Launch the Immersive Reader with math content

You can include math content in the Immersive Reader by using [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML).

1. Modify *views\index.pug* to include the following code above the call to `ImmersiveReader.launchAsync`:

    ```javascript
    const mathML = '<math xmlns="https://www.w3.org/1998/Math/MathML" display="block"> \
      <munderover> \
        <mo>∫</mo> \
        <mn>0</mn> \
        <mn>1</mn> \
      </munderover> \
      <mrow> \
        <msup> \
          <mi>x</mi> \
          <mn>2</mn> \
        </msup> \
        <mo>ⅆ</mo> \
        <mi>x</mi> \
      </mrow> \
    </math>';

    content.chunks.push({
      content: mathML,
      mimeType: 'application/mathml+xml'
    });
    ```

2. Navigate to `http://localhost:3000`. When you launch the Immersive Reader and scroll to the bottom, you'll see the math formula.

## Next step

> 
> [Explore the Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk)



**Applies to: programming-language-python**



## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Immersive Reader resource configured for Microsoft Entra authentication. Follow [these instructions](how-to-create-immersive-reader.md) to get set up. Save the output of your session into a text file so you can configure the environment properties.
* An IDE such as [Visual Studio Code](https://code.visualstudio.com).
* [Git](https://git-scm.com).
* Clone the [Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk) from GitHub.

You can install the following tools as part of the instructions in this guide:
* [Python](https://www.python.org/downloads/) and [pip](https://docs.python.org/3/installing/index.html). Starting with Python 3.4, pip is included by default with the Python binary installers.
* [Flask](https://flask.palletsprojects.com/en/2.3.x/)
* [Jinja](http://jinja.pocoo.org/docs/2.10/)
* [virtualenv](https://virtualenv.pypa.io/en/latest/) and [virtualenvwrapper-win for Windows](https://pypi.org/project/virtualenvwrapper-win/) or [virtualenvwrapper for OSX](https://virtualenvwrapper.readthedocs.io/en/latest/)
* The [requests module](https://pypi.org/project/requests/2.7.0/)

## Configure authentication credentials

Create a new file called *.env* in the root directory of your project. Paste the following names and values into it. Supply the values given when you created your Immersive Reader resource.

```text
TENANT_ID={YOUR_TENANT_ID}
CLIENT_ID={YOUR_CLIENT_ID}
CLIENT_SECRET={YOUR_CLIENT_SECRET}
SUBDOMAIN={YOUR_SUBDOMAIN}
```

Don't commit this file into source control because it contains secrets that shouldn't be made public.

Secure the **getimmersivereadertoken** API endpoint behind some form of authentication, such as [OAuth](https://oauth.net/2/). Authentication prevents unauthorized users from obtaining tokens to use against your Immersive Reader service and billing. That work is beyond the scope of this tutorial.

## Create a Python web app on Windows

Install [Python](https://www.python.org/downloads/).

Select the **Add Python to PATH** check box, and select **Custom installation**.

Screenshot of Install Python step 1 with Add Python to Path checkbox.

Add **Optional Features** by selecting check boxes, and then select **Next**.

Screenshot of Install Python step 2 with optional features.

Under **Advanced Options**, set the installation path as your root folder, for example, `C:\Python312`. Then select **Install**.

> **Tip:**
> When you set a custom installation path, the PATH variable might still point to the default installation path. Verify that the PATH points to the custom folder.

Screenshot of Install Python step 3 with custom location.

After the Python installation is finished, open a command prompt and use `cd` to go to the Python Scripts folder.

```cmd
cd C:\Python312\Scripts
```

Install Flask.

```cmd
pip install flask
```

Install Jinja2. It's a full-featured template engine for Python.

```cmd
pip install jinja2
```

Install virtualenv. This tool creates isolated Python environments.

```cmd
pip install virtualenv
```

Install virtualenvwrapper-win. The idea behind virtualenvwrapper is to ease usage of virtualenv.

```cmd
pip install virtualenvwrapper-win
```

Install the requests module. Requests is an Apache2 Licensed HTTP library, written in Python.

```cmd
pip install requests
```

Install the python-dotenv module. This module reads the key-value pair from the *.env* file and adds them to the environment variable.

```cmd
pip install python-dotenv
```

Make a virtual environment.

```cmd
mkvirtualenv.bat quickstart-python
```

Use `cd` to go to the sample project root folder.

```cmd
cd C:\immersive-reader-sdk\js\samples\quickstart-python
```

Connect the sample project with the environment. This action maps the newly created virtual environment to the sample project root folder.

```cmd
setprojectdir .
```

Activate the virtual environment.

```cmd
activate
```

The project should now be active, and you'll see something like `(quickstart-python) C:\immersive-reader-sdk\js\samples\quickstart-python>` in the command prompt.

Deactivate the environment.

```cmd
deactivate
```

The `(quickstart-python)` prefix should be gone because the environment is deactivated.

To reactivate the environment, run `workon quickstart-python` from the sample project root folder.

```cmd
workon quickstart-python
```

### Start the Immersive Reader with sample content

When the environment is active, run the sample project by entering `flask run` from the sample project root folder.

```cmd
flask run
```

Open your browser, and go to `http://localhost:5000`.

## Create a Python web app on OSX

Install [Python](https://www.python.org/downloads/).

The Python root folder, for example, `Python312`, should now be in the Applications folder. Open Terminal and use `cd` to go into the Python folder.

```bash
cd Python312
```

Install pip.

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

Run the following code to install pip for the currently signed-in user to avoid permissions issues.

```bash
python get-pip.py --user
```

```bash
sudo nano /etc/paths
```

- Enter your password, when prompted.
- Add the path of your pip installation to your PATH variable.
- Go to the bottom of the file, and enter the path you want to add as the last item of the list, for example, `PATH=$PATH:/usr/local/bin`.
- Select **CTRL+X** to quit.
- Enter **Y** to save the modified buffer.

That's it! To test it, in a new Terminal window, enter `echo $PATH`.

Install Flask.

```bash
pip install flask --user
```

Install Jinja2. It's a full-featured template engine for Python.

```bash
pip install Jinja2 --user
```

Install virtualenv. This tool creates isolated Python environments.

```bash
pip install virtualenv --user
```

Install virtualenvwrapper. The idea behind virtualenvwrapper is to ease usage of virtualenv.

```bash
pip install virtualenvwrapper --user
```

Install the requests module. Requests is an Apache2 Licensed HTTP library, written in Python.

```bash
pip install requests --user
```

Install the python-dotenv module. This module reads the key-value pair from the *.env* file and adds them to the environment variable.

```bash
pip install python-dotenv --user
```

Choose a folder where you want to keep your virtual environments, and run this command:

```bash
mkdir ~/.virtualenvs
```

Use `cd` to go to the Immersive Reader SDK Python sample application folder.

```bash
cd immersive-reader-sdk/js/samples/quickstart-python
```

Make a virtual environment.

```bash
mkvirtualenv -p /usr/local/bin/python3 quickstart-python
```

Connect the sample project with the environment. This action maps the newly created virtual environment to the sample project root folder.

```bash
setprojectdir .
```

Activate the virtual environment.

```bash
activate
```

The project should now be active, and you'll see something like `(quickstart-python) /immersive-reader-sdk/js/samples/quickstart-python>` in the command prompt.

Deactivate the environment.

```bash
deactivate
```

The `(quickstart-python)` prefix should be gone because the environment is deactivated.

To reactivate the environment, run `workon quickstart-python` from the sample project root folder.

```bash
workon quickstart-python
```

### Start the Immersive Reader with sample content

When the environment is active, run the sample project by entering `flask run` from the sample project root folder.

```bash
flask run
```

Open your browser, and go to `http://localhost:5000`.

## Next step

> 
> [Explore the Immersive Reader SDK reference](reference.md)




**Applies to: programming-language-csharp**



## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Immersive Reader resource configured for Microsoft Entra authentication. Follow [these instructions](how-to-create-immersive-reader.md) to get setup. Save the output of your session into a text file so you can configure the environment properties.
* [.NET SDK](https://dotnet.microsoft.com/download) installed.
* [Visual Studio Code](https://code.visualstudio.com) or [Visual Studio](https://visualstudio.microsoft.com) with the **ASP.NET and web development** workload installed.

## Configure authentication

This guide uses [`DefaultAzureCredential`](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) from the `Azure.Identity` library to authenticate with the Immersive Reader service. No client secret is required in your code. Locally, `DefaultAzureCredential` uses your signed-in Azure CLI or Visual Studio credentials. When deployed to Azure, it automatically uses the managed identity assigned to your app.

You need only your Immersive Reader resource **subdomain**. Save the subdomain value from when you created your Immersive Reader resource.

Sign in to Azure so that `DefaultAzureCredential` can discover your credentials during local development:

# [Azure CLI](#tab/cli)

```azurecli
az login
```

# [Visual Studio](#tab/visual-studio)

Select **Tools** > **Options** > **Azure Service Authentication** and sign in with the account that has access to your Immersive Reader resource.

---

Secure the **GetTokenAndSubdomain** API endpoint behind some form of authentication, such as [OAuth](https://oauth.net/2/). Authentication prevents unauthorized users from obtaining tokens to use against your Immersive Reader service and billing. That work is beyond the scope of this tutorial.

## Create an ASP.NET Core MVC web app

Create a new ASP.NET Core MVC web application.

# [.NET CLI](#tab/cli)

```dotnetcli
dotnet new mvc -n QuickstartSampleWebApp
cd QuickstartSampleWebApp
```

Install the `Azure.Identity` package to acquire Microsoft Entra tokens without any client secrets:

```dotnetcli
dotnet add package Azure.Identity
```

# [Visual Studio](#tab/visual-studio)

1. Select **File** > **New** > **Project**.
2. Select **ASP.NET Core Web App (Model-View-Controller)** and select **Next**.
3. Name the project **QuickstartSampleWebApp** and select **Create**.

Install the `Azure.Identity` NuGet package. In the **NuGet Package Manager Console** (**Tools** > **NuGet Package Manager** > **Package Manager Console**), run:

```console
Install-Package Azure.Identity
```

---

## Set up the controller

Open *Controllers\HomeController.cs* and replace its contents with the following code. Replace `{YOUR_SUBDOMAIN}` with the subdomain of your Immersive Reader resource. This controller uses `DefaultAzureCredential` to acquire a Microsoft Entra authentication token and passes the token and subdomain to the view.

```csharp
using System.Threading;
using System.Threading.Tasks;
using Azure.Core;
using Azure.Identity;
using Microsoft.AspNetCore.Mvc;

namespace QuickstartSampleWebApp.Controllers
{
    public class HomeController : Controller
    {
        // Replace with your Immersive Reader resource subdomain.
        private const string Subdomain = "{YOUR_SUBDOMAIN}";

        private static readonly TokenCredential Credential = new DefaultAzureCredential();
        private static readonly string[] Scopes =
            new[] { "https://cognitiveservices.azure.com/.default" };

        private async Task<string> GetTokenAsync()
        {
            var tokenRequestContext = new TokenRequestContext(Scopes);
            var accessToken = await Credential
                .GetTokenAsync(tokenRequestContext, CancellationToken.None)
                .ConfigureAwait(false);
            return accessToken.Token;
        }

        public async Task<IActionResult> Index()
        {
            ViewData["Token"]     = await GetTokenAsync();
            ViewData["Subdomain"] = Subdomain;
            return View();
        }
    }
}
```

## Launch the Immersive Reader with sample content

1. Open *Views\Home\Index.cshtml* and replace its contents with the following code. This code populates the page with sample content and adds a button that launches the Immersive Reader.

   ```cshtml
   @{
       ViewData["Title"] = "Immersive Reader C# Quickstart";
       var token     = ViewData["Token"]     as string;
       var subdomain = ViewData["Subdomain"] as string;
   }

   <div class="container">
       <button class="immersive-reader-button"
               data-button-style="iconAndText"
               data-locale="en">
       </button>

       <h1 id="ir-title">Geography</h1>
       <div id="ir-content" lang="en-us">
           <p>
               The study of Earth's landforms is called physical geography.
               Landforms can be mountains and valleys.
               They can also be glaciers, lakes, or rivers.
           </p>
       </div>
   </div>

   @section Scripts {
       <script src="https://ircdname.azureedge.net/immersivereadersdk/immersive-reader-sdk.1.4.0.js">
       </script>
       <script>
           function handleLaunchImmersiveReader() {
               const token     = "@token";
               const subdomain = "@subdomain";

               const data = {
                   title: document.getElementById('ir-title').innerText,
                   chunks: [{
                       content: document.getElementById('ir-content').innerHTML,
                       mimeType: 'text/html'
                   }]
               };

               const options = {
                   onExit: exitCallback
               };

               ImmersiveReader.launchAsync(token, subdomain, data, options)
                   .catch(function (error) {
                       console.log(error);
                       alert('Error in launching the Immersive Reader. Check the console.');
                   });
           }

           function exitCallback() {
               console.log('This is the callback function. It is executed when the Immersive Reader closes.');
           }

           document.querySelector('.immersive-reader-button')
               .addEventListener('click', handleLaunchImmersiveReader);
       </script>
   }
   ```

2. Start the app.

# [.NET CLI](#tab/cli)

```dotnetcli
dotnet run
```

# [Visual Studio](#tab/visual-studio)

Select **Debug** > **Start Debugging**.

---

3. Open your browser and go to `https://localhost:5001`. You should see the sample content on the page. Select the **Immersive Reader** button to launch the Immersive Reader with your content.

## Specify the language of your content

The Immersive Reader supports many different languages. You can specify the language of your content by following these steps.

1. In *Views\Home\Index.cshtml*, add the following paragraph inside `#ir-content`, after the existing English paragraph:

   ```html
   <p lang="es">
       El estudio de las formas terrestres de la Tierra se llama geografía física.
       Los accidentes geográficos pueden ser montañas y valles.
       También pueden ser glaciares, lagos o ríos.
   </p>
   ```

2. In the `data` object in the script block, update the `chunks` array to include the Spanish paragraph:

   ```javascript
   const data = {
       title: document.getElementById('ir-title').innerText,
       chunks: [
           {
               content: document.getElementById('ir-content').innerHTML,
               mimeType: 'text/html'
           }
       ]
   };
   ```

   The Immersive Reader automatically detects languages within the HTML content, so no additional changes to the chunks array are required.

3. Navigate to `https://localhost:5001` again. You should see the Spanish text on the page, and when you select **Immersive Reader**, it shows up in the Immersive Reader as well.

## Specify the language of the Immersive Reader interface

By default, the language of the Immersive Reader interface matches your browser language settings. You can also specify it explicitly.

1. In *Views\Home\Index.cshtml*, update the `options` object in the script block:

   ```javascript
   const options = {
       uiLang: 'fr',
       onExit: exitCallback
   };
   ```

2. Navigate to `https://localhost:5001`. When you launch the Immersive Reader, the interface is shown in French.

## Launch the Immersive Reader with math content

You can include math content in the Immersive Reader by using [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML).

1. In *Views\Home\Index.cshtml*, add the following code inside `handleLaunchImmersiveReader`, just before the `ImmersiveReader.launchAsync` call:

   ```javascript
   const mathML = '<math xmlns="https://www.w3.org/1998/Math/MathML" display="block">'
       + '<munderover><mo>∫</mo><mn>0</mn><mn>1</mn></munderover>'
       + '<mrow><msup><mi>x</mi><mn>2</mn></msup><mo>ⅆ</mo><mi>x</mi></mrow>'
       + '</math>';

   data.chunks.push({
       content: mathML,
       mimeType: 'application/mathml+xml'
   });
   ```

2. Navigate to `https://localhost:5001`. When you launch the Immersive Reader and scroll to the bottom, you'll see the math formula.

## Next step

> 
> [Explore the Immersive Reader SDK reference](reference.md)




**Applies to: programming-language-android**



## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Immersive Reader resource configured for Microsoft Entra authentication. Follow [these instructions](how-to-create-immersive-reader.md) to get set up. Save the output of your session into a text file so you can configure the environment properties.
* [Git](https://git-scm.com).
* Clone the [Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk) from GitHub.
* [Android Studio](https://developer.android.com/studio).

## Configure authentication credentials

1. Start Android Studio, and open the Immersive Reader SDK project from the *immersive-reader-sdk/js/samples/quickstart-java-android* directory (Java) or the *immersive-reader-sdk/js/samples/quickstart-kotlin* directory (Kotlin).

    > **Tip:**
    > You might need to let the system update the Gradle plugins to at least version 8.

1. To create a new assets folder, right-click on **app** and select **Folder** -> **Assets Folder** from the dropdown.

    Screenshot of the Assets folder option.

1. Right-click on **assets** and select **New** -> **File**. Name the file **env**.

    Screenshot of name input field to create the env file.

1. Add the following names and values, and supply values as appropriate. Don't commit this file into source control because it contains secrets that shouldn't be made public.
    
    ```text
    TENANT_ID=<YOUR_TENANT_ID>
    CLIENT_ID=<YOUR_CLIENT_ID>
    CLIENT_SECRET=<YOUR_CLIENT_SECRET>
    SUBDOMAIN=<YOUR_SUBDOMAIN>
    ```

## Start the Immersive Reader with sample content

Choose a device emulator from the AVD Manager, and run the project.

## Next steps

> 
> [Explore the Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk)




**Applies to: programming-language-ios**



## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Immersive Reader resource configured for Microsoft Entra authentication. Follow [these instructions](how-to-create-immersive-reader.md) to get set up. Save the output of your session into a text file so you can configure the environment properties.
* [macOS](https://www.apple.com/macos) and [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12).
* [Git](https://git-scm.com).
* Clone the [Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk) from GitHub.

## Configure authentication credentials

1. In Xcode, select **Open Existing Project**. Open the file *immersive-reader-sdk/js/samples/ios/quickstart-swift.xcodeproj*.
1. On the top menu, select **Product** > **Scheme** > **Edit Scheme**.
1. In the **Run** view, select the **Arguments** tab.
1. In the **Environment Variables** section, add the following names and values. Supply the values given when you created your Immersive Reader resource.

    ```text
    TENANT_ID=<YOUR_TENANT_ID>
    CLIENT_ID=<YOUR_CLIENT_ID>
    CLIENT_SECRET<YOUR_CLIENT_SECRET>
    SUBDOMAIN=<YOUR_SUBDOMAIN>
    ```

Don't commit this change into source control because it contains secrets that shouldn't be made public.

## Start the Immersive Reader with sample content

In Xcode, select a device simulator, then run the project from the controls or enter **Ctrl+R**.

## Next step

> 
> [Explore the Immersive Reader SDK](https://github.com/microsoft/immersive-reader-sdk)
