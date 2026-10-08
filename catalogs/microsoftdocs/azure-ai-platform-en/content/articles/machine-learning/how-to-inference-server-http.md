---
title: Debug with the Azure Machine Learning inference server
titleSuffix: Azure Machine Learning
description: See how to use the Azure Machine Learning inference HTTP server to debug scoring scripts or endpoints locally, before you deploy them to the cloud.
author: s-polly
ms.author: scottpolly
ms.reviewer: jturuk
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: inferencing
ms.topic: how-to
ms.custom: inference server, local development, local debugging, devplatv2, dev-focus
ms.date: 03/12/2026
ai-usage: ai-assisted

#customer intent: As a developer, I want to work with the Azure Machine Learning inference HTTP server so I can debug scoring scripts or endpoints before deployment.
---

# Debug scoring scripts by using the Azure Machine Learning inference HTTP server

The Azure Machine Learning inference HTTP server is a Python package that exposes your scoring function as an HTTP endpoint. It wraps the Flask server code and dependencies into a singular package. The inference server is included in the [prebuilt Docker images for inference](concept-prebuilt-docker-images-inference.md) that are used when you deploy a model in Azure Machine Learning. When you use the package alone, you can deploy the model locally for production. You can also easily validate your scoring (entry) script in a local development environment. If there's a problem with the scoring script, the inference server returns an error and the location of the error.

You can also use the inference server to create validation gates in a continuous integration and deployment pipeline. For example, you can start the inference server with the candidate script and run the test suite against the local endpoint.

This article supports developers who want to use the inference server to debug locally. In this article, you see how to use the inference server with online endpoints.

## Prerequisites

- Python 3.10 or later
- Anaconda

The inference server runs on Windows and Linux-based operating systems.

## Explore local debugging options for online endpoints

By debugging endpoints locally before you deploy to the cloud, you can catch errors in your code and configuration early on. To debug endpoints locally, you have several options, including:

- The Azure Machine Learning inference HTTP server.
- A [local endpoint](how-to-debug-managed-online-endpoints-visual-studio-code.md).

The following table provides an overview of the support that each option offers for various debugging scenarios:

| Scenario | Inference server | Local endpoint |
| --- | :---: | :---: |
| Update local Python environment **without** Docker image rebuild | Yes | No |
| Update scoring script | Yes | Yes |
| Update deployment configurations (deployment, environment, code, model) | No | Yes |
| Integrate Microsoft Visual Studio Code (VS Code) debugger | Yes | Yes |

This article describes how to use the inference server.

When you run the inference server locally, you can focus on debugging your scoring script without concern for deployment container configurations.

## Debug your scoring script locally

To debug your scoring script locally, you have several options for testing the inference server behavior:

- Use a dummy scoring script.
- Use VS Code to debug with the [azureml-inference-server-http](https://pypi.org/project/azureml-inference-server-http/) package.
- Run an actual scoring script, model file, and environment file from the [examples repo](https://github.com/Azure/azureml-examples).

The following sections provide information about each option.

### Use a dummy scoring script to test inference server behavior

1. Create a directory named `server_quickstart` to hold your files:

   ```bash
   mkdir server_quickstart
   cd server_quickstart
   ```

1. To avoid package conflicts, create a virtual environment, such as `myenv`, and activate it:

   ```bash
   python -m venv myenv
   ```

   > **Note:**
   > On Linux, run the `source myenv/bin/activate` command to activate the virtual environment.

   After you test the inference server, run the `deactivate` command to deactivate the Python virtual environment.

1. Install the `azureml-inference-server-http` package from the [Python Package Index (PyPI)](https://pypi.org/project/azureml-inference-server-http/) feed:

   ```bash
   python -m pip install azureml-inference-server-http
   ```

1. Create your entry script. The following example creates a basic entry script and saves it to a file named `score.py`:

   ```bash
   echo -e 'import time\ndef init(): \n\ttime.sleep(1) \n\ndef run(input_data): \n\treturn {"message":"Hello, World!"}' > score.py
   ```

1. Use the `azmlinfsrv` command to start the inference server and set the `score.py` file as the entry script:

   ```bash
   azmlinfsrv --entry_script score.py
   ```

   > **Note:**
   > The inference server is hosted on `0.0.0.0`, which means it listens to all IP addresses of the hosting machine.

1. Use the `curl` utility to send a scoring request to the inference server:

   ```bash
   curl -p 127.0.0.1:5001/score
   ```

   The inference server posts the following response:

   ```bash
   {"message": "Hello, World!"}
   ```

1. When you finish testing, select **Ctrl**+**C** to stop the inference server.

You can modify the `score.py` scoring script file. Then you can test your changes by using the `azmlinfsrv --entry_script score.py` command to run the inference server again.

### Integrate with VS Code

In VS Code, you can use the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for debugging with the [azureml-inference-server-http](https://pypi.org/project/azureml-inference-server-http/) package. VS Code offers two modes for debugging: [launch and attach](https://code.visualstudio.com/docs/editor/debugging#_launch-versus-attach-configurations).

Before you use either mode, install the `azureml-inference-server-http` package by running the following command:

```bash
python -m pip install azureml-inference-server-http
```

> **Note:**
> To avoid package conflicts, install the inference server in a virtual environment. You can use the built-in `python -m venv` command to create a virtual environment.

#### Launch mode

For launch mode, set up the VS Code `launch.json` configuration file and start the inference server within VS Code:

1. Start VS Code and open the folder that contains the `score.py` script.

1. For that workspace in VS Code, add the following configuration to the `launch.json` file:

   ```json
   {
       "version": "0.2.0",
       "configurations": [
           {
               "name": "Debug score.py",
               "type": "debugpy",
               "request": "launch",
               "module": "azureml_inference_server_http.amlserver",
               "args": [
                   "--entry_script",
                   "score.py"
               ]
           }
       ]
     }
   ```

1. Start the debugging session in VS Code by selecting **Run** > **Start Debugging** or by selecting **F5**.

#### Attach mode

For attach mode, use VS Code with the Python extension to attach to the inference server process:

> **Note:**
> For Linux, first install the `gdb` package by running the `sudo apt-get install -y gdb` command.

1. Start VS Code and open the folder that contains the `score.py` script.

1. For that workspace in VS Code, add the following configuration to the `launch.json` file:

   ```json
   {
       "version": "0.2.0",
       "configurations": [
           {
               "name": "Python: Attach using Process ID",
               "type": "debugpy",
               "request": "attach",
               "processId": "${command:pickProcess}",
               "justMyCode": true
           }
       ]
     }
   ```

1. In a command window, start the inference server by running the `azmlinfsrv --entry_script score.py` command.

1. Take the following steps to start the debugging session in VS Code:

   1. Select **Run** > **Start Debugging**, or select **F5**.

   1. In the command window, search the logs from the inference server to locate the process ID of the `azmlinfsrv` process:

      Screenshot of a command window that shows inference server logs. In one log statement, the process ID of the azmlinfsrv command is highlighted.

      Be sure to locate the ID of the `azmlinfsrv` process, not the `gunicorn` process.

   1. In the VS Code debugger, enter the ID of the `azmlinfsrv` process.
      
      If you don't see the VS Code process picker, manually enter the process ID in the `processId` field of the `launch.json` file for the workspace.

For launch and attach modes, you can set [breakpoints](https://code.visualstudio.com/docs/editor/debugging#_breakpoints) and debug the script step by step.

### Use an end-to-end example

The following procedure runs the inference server locally with [sample files](https://github.com/Azure/azureml-examples/tree/main/cli/endpoints/online/model-1) from the Azure Machine Learning example repository. The sample files include a scoring script, a model file, and an environment file. For more examples of how to use these sample files, see [Deploy and score a machine learning model by using an online endpoint](how-to-deploy-online-endpoints.md).

1. Clone the sample repository and go to the folder that contains the relevant sample files:

   ```bash
   git clone --depth 1 https://github.com/Azure/azureml-examples
   cd azureml-examples/cli/endpoints/online/model-1/
   ```

1. Use [conda](https://conda.io/projects/conda/en/latest/user-guide/getting-started.html) to create and activate a virtual environment:

   In this example, the `azureml-inference-server-http` package is automatically installed. The package is included as a dependent library of the `azureml-defaults` package, which is listed in the conda.yaml file.

   > **Important:**
   > The `azureml-defaults` package is part of the Azure Machine Learning SDK v1, which is deprecated. For new projects, install the `azureml-inference-server-http` package directly instead of using `azureml-defaults`.

   ```bash
   # Create the environment from the YAML file.
   conda env create --name model-env -f ./environment/conda.yaml
   # Activate the new environment.
   conda activate model-env
   ```

1. Review the scoring script, onlinescoring/score.py:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/online/model-1/onlinescoring/score.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-inference-server-http.md)

1. Run the inference server by specifying the scoring script and the path to the model folder.

   During deployment, the `AZUREML_MODEL_DIR` variable is defined to store the path to the model folder. You specify that value in the `model_dir` parameter. When the scoring script runs, it retrieves the value from the `AZUREML_MODEL_DIR` variable.

   In this case, use the current directory, `./`, as the `model_dir` value, because the scoring script specifies the subdirectory as `model/sklearn_regression_model.pkl`.

   ```bash
   azmlinfsrv --entry_script ./onlinescoring/score.py --model_dir ./
   ```

   When the inference server starts and successfully invokes the scoring script, the example [startup log](#view-startup-logs) opens. Otherwise, the log shows error messages.

1. Test the scoring script with sample data by taking the following steps:
   1. Open another command window and go to the same working directory that you ran the `azmlinfsrv` command in.
   1. Use the following `curl` utility to send an example request to the inference server and receive a scoring result:

      ```bash
      curl --request POST "127.0.0.1:5001/score" --header "Content-Type:application/json" --data @sample-request.json
      ```

      When there are no problems in your scoring script, the script returns the scoring result. If problems occur, you can update the scoring script and then start the inference server again to test the updated script.

## Review inference server routes

The inference server listens on port 5001 by default at the following routes:

| Name | Route |
| --- | --- |
| **Liveness probe** | `127.0.0.1:5001/` |
| **Score** | `127.0.0.1:5001/score` |
| **OpenAPI (swagger)** | `127.0.0.1:5001/swagger.json` |

## Review inference server parameters

The inference server accepts the following parameters:

| Parameter | Required | Default | Description |
| --- | --- | :---: | --- |
| `entry_script` | True | N/A | Identifies the relative or absolute path to the scoring script |
| `model_dir` | False | N/A | Identifies the relative or absolute path to the directory that holds the model used for inferencing |
| `port` | False | 5001 | Specifies the serving port of the inference server |
| `worker_count` | False | 1 | Provides the number of worker threads to process concurrent requests |
| `appinsights_instrumentation_key` | False | N/A | Provides the instrumentation key for the instance of Application Insights where the logs are published |
| `access_control_allow_origins` | False | N/A | Turns on cross-origin resource sharing (CORS) for the specified origins, where multiple origins are separated by a comma (,), such as `microsoft.com, bing.com` |

## Explore inference server request processing

The following steps demonstrate how the inference server, `azmlinfsrv`, handles incoming requests:

1. A Python CLI wrapper sits around the inference server's network stack and is used to start the inference server.

1. A client sends a request to the inference server.

1. The inference server sends the request through the [Web Server Gateway Interface (WSGI)](https://www.fullstackpython.com/wsgi-servers.html) server, which dispatches the request to one of the following Flask worker applications:

   - **On Windows**: [waitress](https://docs.pylonsproject.org/projects/waitress/)
   - **On Linux**: [gunicorn](https://docs.gunicorn.org/) 

1. The [Flask](https://flask.palletsprojects.com/) worker app handles the request, which includes loading the entry script and any dependencies.

1. Your entry script receives the request. The entry script makes an inference call to the loaded model and returns a response.

Diagram that shows how the inference server starts and how a request flows to a Flask worker app and then to user code.

## Explore inference server logs

There are two ways to obtain log data for the inference server test:

- Run the `azureml-inference-server-http` package locally and view the log output.
- Use online endpoints and view the [container logs](how-to-troubleshoot-online-endpoints.md#get-container-logs). The log for the inference server is named **Azure Machine Learning Inferencing HTTP server \<version>**.

> **Note:**
> The logging format has changed since version 0.8.0. If your log uses a different style than expected, update the `azureml-inference-server-http` package to the latest version.

### View startup logs

When the inference server starts, the logs show the following initial server settings:

```console
Azure ML Inferencing HTTP server <version>


Server Settings
---------------
Entry Script Name: <entry-script>
Model Directory: <model-directory>
Config File: <configuration-file>
Worker Count: <worker-count>
Worker Timeout (seconds): None
Server Port: <port>
Health Port: <port>
Application Insights Enabled: false
Application Insights Key: <Application-Insights-instrumentation-key>
Inferencing HTTP server version: azmlinfsrv/<version>
CORS for the specified origins: <access-control-allow-origins>
Create dedicated endpoint for health: <health-check-endpoint>


Server Routes
---------------
Liveness Probe: GET   127.0.0.1:<port>/
Score:          POST  127.0.0.1:<port>/score

<logs>
```

For example, when you run the inference server by taking the [end-to-end example](#use-an-end-to-end-example) steps, the logs contain the following information:

```console
Azure ML Inferencing HTTP server v1.2.2


Server Settings
---------------
Entry Script Name: /home/user-name/azureml-examples/cli/endpoints/online/model-1/onlinescoring/score.py
Model Directory: ./
Config File: None
Worker Count: 1
Worker Timeout (seconds): None
Server Port: 5001
Health Port: 5001
Application Insights Enabled: false
Application Insights Key: None
Inferencing HTTP server version: azmlinfsrv/1.2.2
CORS for the specified origins: None
Create dedicated endpoint for health: None

Server Routes
---------------
Liveness Probe: GET   127.0.0.1:5001/
Score:          POST  127.0.0.1:5001/score

2022-12-24 07:37:53,318 I [32726] gunicorn.error - Starting gunicorn 20.1.0
2022-12-24 07:37:53,319 I [32726] gunicorn.error - Listening at: http://0.0.0.0:5001 (32726)
2022-12-24 07:37:53,319 I [32726] gunicorn.error - Using worker: sync
2022-12-24 07:37:53,322 I [32756] gunicorn.error - Booting worker with pid: 32756
Initializing logger
2022-12-24 07:37:53,779 I [32756] azmlinfsrv - Starting up app insights client
2022-12-24 07:37:54,518 I [32756] azmlinfsrv.user_script - Found user script at /home/user-name/azureml-examples/cli/endpoints/online/model-1/onlinescoring/score.py
2022-12-24 07:37:54,518 I [32756] azmlinfsrv.user_script - run() is not decorated. Server will invoke it with the input in JSON string.
2022-12-24 07:37:54,518 I [32756] azmlinfsrv.user_script - Invoking user's init function
2022-12-24 07:37:55,974 I [32756] azmlinfsrv.user_script - Users's init has completed successfully
2022-12-24 07:37:55,976 I [32756] azmlinfsrv.swagger - Swaggers are prepared for the following versions: [2, 3, 3.1].
2022-12-24 07:37:55,976 I [32756] azmlinfsrv - Scoring timeout is set to 3600000
2022-12-24 07:37:55,976 I [32756] azmlinfsrv - Worker with pid 32756 ready for serving traffic
```

### Understand log data format

All logs from the inference server, except the launcher script, present data in the following format:

`<UTC-time> <level> [<process-ID>] <logger-name> - <message>`

Each entry consists of the following components:

- `<UTC-time>`: The time when the entry is entered into the log
- `<level>`: The first character of the [logging level](https://docs.python.org/3/library/logging.html#logging-levels) for the entry, such as `E` for ERROR, `I` for INFO, and so on
- `<process-ID>`: The ID of the process associated with the entry
- `<logger-name>`: The name of the resource associated with the log entry
- `<message>`: The contents of the log message

There are six levels of logging in Python. Each level has an assigned numeric value according to its severity:

| Logging level | Numeric value |
| --- | :---: |
| **CRITICAL** | 50 |
| **ERROR** | 40 |
| **WARNING** | 30 |
| **INFO** | 20 |
| **DEBUG** | 10 |
| **NOTSET** | 0 |

## Troubleshoot inference server issues

The following sections provide basic troubleshooting tips for the inference server. To troubleshoot online endpoints, see [Troubleshoot online endpoint deployment and scoring](how-to-troubleshoot-online-endpoints.md).


<a name="frequently-asked-questions"></a>
### Check installed packages

Follow these steps to address issues with installed packages:

1. Gather information about installed packages and versions for your Python environment.

1. In your environment file, check the version of the `azureml-inference-server-http` Python package that's specified. In the Azure Machine Learning inference HTTP server [startup logs](how-to-inference-server-http.md#view-startup-logs), check the version of the inference server that's displayed. Confirm that the two versions match.

   In some cases, the pip dependency resolver installs unexpected package versions. You might need to run `pip` to correct installed packages and versions.

1. If you specify Flask or its dependencies in your environment, remove these items.

   - Dependent packages include `flask`, `jinja2`, `itsdangerous`, `werkzeug`, `markupsafe`, and `click`.
   - The `flask` package is listed as a dependency in the inference server package. The best approach is to allow the inference server to install the `flask` package.
   - When the inference server is configured to support new versions of Flask, the inference server automatically receives the package updates as they become available.

### Check the inference server version

The `azureml-inference-server-http` server package is published to PyPI. The [PyPI page](https://pypi.org/project/azureml-inference-server-http/) lists the changelog and all versions of the package.

If you use an early package version, update your configuration to the latest version. The following table summarizes stable versions, common issues, and recommended adjustments:

| Package version | Description | Issue | Resolution |
| --- | --- | --- | --- |
| 0.4.x | Bundled in training images dated `20220601` or earlier and `azureml-defaults` package versions 0.1.34 through 1.43. Latest stable version is 0.4.13. | For server versions earlier than 0.4.11, you might encounter Flask dependency issues, such as `can't import name Markup from jinja2`. | Upgrade to version 0.4.13 or 1.4.x, the latest version, if possible. |
| 0.6.x | Preinstalled in inferencing images dated `20220516` and earlier. Latest stable version is 0.6.1. | N/A | N/A |
| 0.7.x | Supports Flask 2. Latest stable version is 0.7.7. | N/A | N/A |
| 0.8.x | Uses an updated log format. Ends support for Python 3.6. | N/A | N/A |
| 1.0.x | Ends support for Python 3.7. | N/A | N/A |
| 1.1.x | Migrates to `pydantic` 2.0. | N/A | N/A |
| 1.2.x | Adds support for Python 3.11. Updates `gunicorn` to version 22.0.0. Updates `werkzeug` to version 3.0.3 and later versions. | N/A | N/A |
| 1.3.x | Adds support for Python 3.12. Upgrades `certifi` to version 2024.7.4. Upgrades `flask-cors` to version 5.0.0. Upgrades the `gunicorn` and `pydantic` packages. | N/A | N/A |
| 1.4.x | Upgrades `waitress` to version 3.0.1. Ends support for Python 3.8. Removes the compatibility layer that prevents the Flask 2.0 upgrade from breaking request object code. | If you depend on the compatibility layer, your request object code might not work. | Migrate your score script to Flask 2. |

### Check package dependencies

The most relevant dependent packages for the `azureml-inference-server-http` server package include:

- `flask`
- `opencensus-ext-azure`
- `inference-schema`
  
If you specify the `azureml-defaults` package in your Python environment, the `azureml-inference-server-http` package is a dependent package. The dependency is installed automatically.

> **Tip:**
> If you use the Azure Machine Learning SDK for Python v1 and don't explicitly specify the `azureml-defaults` package in your Python environment, the SDK might automatically add the package. However, the package version is locked relative to the SDK version. For example, if the SDK version is 1.38.0, the `azureml-defaults==1.38.0` entry is added to the environment's pip requirements.

### TypeError during inference server startup

You might encounter the following `TypeError` during inference server startup:

```bash
TypeError: register() takes 3 positional arguments but 4 were given

  File "/var/azureml-server/aml_blueprint.py", line 251, in register

    super(AMLBlueprint, self).register(app, options, first_registration)

TypeError: register() takes 3 positional arguments but 4 were given
```

This error occurs when you have Flask 2 installed in your Python environment, but your `azureml-inference-server-http` package version doesn't support Flask 2. Support for Flask 2 is available in the `azureml-inference-server-http` 0.7.0 package and later versions, and the `azureml-defaults` 1.44 package and later versions.

- If you don't use the Flask 2 package in an Azure Machine Learning Docker image, use the latest version of the `azureml-inference-server-http` or `azureml-defaults` package.
- If you use the Flask 2 package in an Azure Machine Learning Docker image, confirm that the image build version is `July 2022` or later.

  You can find the image version in the container logs. For example, see the following log statements:

  ```console
  2022-08-22T17:05:02,147738763+00:00 | gunicorn/run | AzureML Container Runtime Information
  2022-08-22T17:05:02,161963207+00:00 | gunicorn/run | ###############################################
  2022-08-22T17:05:02,168970479+00:00 | gunicorn/run | 
  2022-08-22T17:05:02,174364834+00:00 | gunicorn/run | 
  2022-08-22T17:05:02,187280665+00:00 | gunicorn/run | AzureML image information: openmpi4.1.0-ubuntu20.04, Materialization Build:20220708.v2
  2022-08-22T17:05:02,188930082+00:00 | gunicorn/run | 
  2022-08-22T17:05:02,190557998+00:00 | gunicorn/run | 
  ```

  The build date of the image appears after the `Materialization Build` notation. In the preceding example, the image version is `20220708`, or July 8, 2022. The image in this example is compatible with Flask 2.

  If you don't see a similar message in your container log, your image is out-of-date and should be updated. If you use a Compute Unified Device Architecture (CUDA) image and you can't find a newer image, check the [AzureML-Containers](https://github.com/Azure/AzureML-Containers) repo to see whether your image is deprecated. You can find designated replacements for deprecated images.

  If you use the inference server with an online endpoint, you can also find the logs in Azure Machine Learning studio. On the page for your endpoint, select the **Logs** tab.

If you deploy with the SDK v1 and don't explicitly specify an image in your deployment configuration, the inference server applies the `openmpi4.1.0-ubuntu20.04` package with a version that matches your local SDK toolset. However, the installed version might not be the latest available version of the image.

For SDK version 1.43, the inference server installs the `openmpi4.1.0-ubuntu20.04:20220616` package version by default, but this package version isn't compatible with SDK 1.43. Make sure you use the latest SDK for your deployment.

If you can't update the image, you can temporarily avoid the issue by pinning the `azureml-defaults==1.43` or `azureml-inference-server-http~=0.4.13` entries in your environment file. These entries direct the inference server to install the older version with `flask 1.0.x`.

### ImportError or ModuleNotFoundError during inference server startup

You might encounter an `ImportError` or `ModuleNotFoundError` on specific modules, such as  `opencensus`, `jinja2`, `markupsafe`, or `click`, during inference server startup. The following example shows the error message:

```bash
ImportError: cannot import name 'Markup' from 'jinja2'
```

The import and module errors occur when you use version 0.4.10 or earlier versions of the inference server that don't pin the Flask dependency to a compatible version. To prevent the issue, install a later version of the inference server.


## Related content

- [Deploy and score a machine learning model by using an online endpoint](how-to-deploy-online-endpoints.md)
- [Prebuilt Docker images for inference](concept-prebuilt-docker-images-inference.md)
