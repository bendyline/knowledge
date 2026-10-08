---
title: Troubleshoot playwright workspaces reporting
titleSuffix: Playwright Workspaces
description: Troubleshoot errors or issues when running Playwright reporting on Playwright Workspaces.
ms.topic: troubleshooting-general
ms.date: 01/08/2026
ms.service: azure-app-testing
ms.subservice: playwright-workspaces
author: Abhinav-Premsekhar
ms.author: apremsekhar
---

# Troubleshoot issues with Playwright Workspaces reporting

This article provides mitigation steps for errors that might arise when you view the test reports in the test runs page in Playwright Workspaces.

## User doesn't have permissions to view the test artifacts present in the storage account

  Screenshot to show the no authorization error.

You may not have access to fetch the reporting artifacts from the storage account. Check if you have "Contributor" role to the linked storage account.
Learn how to [add role assignments to the storage account](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/quickstart-advanced-diagnostic-with-playwright-workspaces-reporting?tabs=newworkspace%2Cplaywrightcli#add-role-based-access-control-rbac-roles-for-the-linked-storage-account-1).

## Storage account missing or deleted

  Screenshot to show error when storage account deleted.

The storage account may not exist or deleted. Check if the storage account exists before trying again.

## Playwright Workspaces reporter not configured

  Screenshot to show error when reporting not added.

Reporting artifacts not collected for this test run. You haven't configured the Playwright Workspaces reporter correctly. Learn how to [configure the Playwright Workspace reporter](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/quickstart-advanced-diagnostic-with-playwright-workspaces-reporting?tabs=newworkspace%2Cplaywrightcli#enable-html-and-playwright-workspaces-reporter).

## Reporting disabled in the Playwright Workspace
  Screenshot to show error when reporting disabled.

Reporting isn't enabled for this Playwright Workspace. Learn how to [enable reporting in your Playwright Workspace](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/quickstart-advanced-diagnostic-with-playwright-workspaces-reporting?tabs=newworkspace%2Cplaywrightcli#enable-reporting-and-link-a-storage-account-to-a-workspace).

## Trace URL not accessible from the storage account due to CORS error

  Screenshot for cors error inside iframe.

The trace viewer url isn't accessible from the storage account. Learn how to [allow-list the url in the storage account](https://learn.microsoft.com/azure/app-testing/playwright-workspaces/quickstart-advanced-diagnostic-with-playwright-workspaces-reporting?tabs=newworkspace%2Cplaywrightcli#only-if-trace-is-enabled-allow-list-public-trace-viewer-in-the-linked-storage-account).
