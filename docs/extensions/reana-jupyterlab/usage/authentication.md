# Authentication

## Token Reuse

The REANA JupyterLab extension automatically reuses the existing JWT access token issued by the Identity Provider (IdP) that authenticated the current JupyterLab session, ESCAPE INDIGO IAM in the VRE, so no additional login or authentication steps are required.

## Verifying Access

You can verify that authentication is working properly:

1. Open Reana JupyterLab by clicking on the REANA icon in the JupyterLab sidebar
2. Check if you can see your workflows listed
3. Open a workflow detail panel to see its contents

If these actions succeed, your authentication is working correctly. If you see "unauthorized" errors or empty lists where you expect content, there may be an authentication issue.

## Authentication Flow

![Authentication Flow](../../../../static/img/reana-extension-auth-flow.png)

*Authentication flow: Your VRE login generates a token that is automatically injected into your container environment and configuration, allowing the extension to access REANA resources on your behalf.*

## Troubleshooting

If you encounter authentication problems:

- **Token expired?** Restart your JupyterLab container to get a fresh token
- **Still not working?** Re-login to the VRE web interface, then launch a new JupyterLab session
- **Need different credentials?** Use the connection configuration panel (see below)

## Optional Connection Configuration

You can still manually configure the connection to a different REANA instance:

1. Open Reana JupyterLab by clicking on the REANA icon in the JupyterLab sidebar
2. Click on the connection settings icon
3. Enter a REANA server URL and the REANA access token.

After connecting to the REANA server, a notification will appear in the bottom right corner of the screen indicating that the connection was successful. You can now interact with the REANA server from within JupyterLab.
