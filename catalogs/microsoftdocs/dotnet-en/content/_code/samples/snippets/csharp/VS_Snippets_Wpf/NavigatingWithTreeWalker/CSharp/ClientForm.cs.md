# Source code: samples/snippets/csharp/VS_Snippets_Wpf/NavigatingWithTreeWalker/CSharp/ClientForm.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace NavigateWithTreeWalker
{
    public partial class NavigationWithTreeWalker : Form
    {
        myAutomationClass showAutomation = new myAutomationClass();
        private bool automationStarted = false;
        public NavigationWithTreeWalker()
        {
            InitializeComponent();
            showAutomation.mainForm = this;
        }

        private void btnStartAutomation_Click(object sender, EventArgs e)
        {
            if (automationStarted)
            {
                showAutomation.StopListening();
                btnStartAutomation.Text = "Start Automation";
                automationStarted = false;
            }
            else
            {
                automationStarted = showAutomation.StartListening();
                if (automationStarted)
                {
                    btnStartAutomation.Text = "Stop Automation";
                }
            }
        }

        private void NavigationWithTreeWalker_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (showAutomation != null)
            {
                showAutomation.StopListening();
            }
        }
    }
}
```
