# Authentication

The interaction with the VRE platform requires authentication.
It is required to register to the ESCAPE INDIGO Identity and Access Management (IAM) service to be able to access the VRE. Follow the instructions in the next sections.

### ESCAPE IAM registration

Navigate to the [ESCAPE IAM instance](https://iam-escape.cloud.cnaf.infn.it/login) and register for a new account, filling in the required details.

After the account has been approved, you will need to log in and add the `escape` group to your Groups. To do this, click on the **Home** button of the lateral bar and then click on the green **+ Add to group** button in the **Groups** panel. Enter 'escape' in the group box, and click `Add group(s)`. You can request access to various groups at the same time. You will need to wait in order for this to be manually approved by site administrators. If your request is urgent, please email the admins at _escape-cern-ops'at'cern.ch_.

Once your account is approved, and you have confirmed your email address, you will be able to get identified towards the ESCAPE IAM service via username and password and access the VRE platform.

:::note

All the underlaying VRE services and resources are connected through the ESCAPE IAM service. 
Once you have an account, you will be able to interact seamlessly with any of them.

:::

### OpenID token 

The ESCAPE INDIGO IAM support OpenID tokens. 

:::info

Most of the token interactions between the different component of the VRE are and should stay hidden to standard users of the platorm. 

Fur further details about these exchange, visit the [IAM documentation](https://indigo-iam.github.io/v/v1.10.0/docs/reference/configuration/external-authentication/oidc/) or navigate through the different sections of the [VRE Tecnical Documentation](./tech-docs/home.md).

:::


### X.509 Grid certificate    

#### *Getting the certificate*    

Requesting a X.509 certificate is heavily dependent on your institution's certification authority.

:::tip

Please contact your institute system administrator to understand how to request one.

::: 

A X.509 certificate exists in the form of a `.p12` format (PKCS 12) file. Download the file and store it in a safe place on your computer, where it is always easily accessible. 

 -  For **CERN** members, the request can be made [here](https://ca.cern.ch/ca/), under the ‘Grid Certificates’ section with ‘New Grid User Certificate’.

#### *Uploading the certificate* 

Before linking the Grid certificate to your IAM account, you will need to add the certificate to your browser. The procedure you will need to follow varies depending on what browser you are using. 

Be aware that the browser is configured to store all your uploaded certificates. You should therefore check whether the browser is not already using an old certificate, which might be expired. If this is the case, delete old certificates and upload your new one. 

 - **Chrome**: Navigate to `chrome://settings/security` and following the instructions presented upon selecting `Advanced > Manage Certificates > Import`. 
 - **Firefox**: Navigate to `Settings`, search for `Certificates` and clicl on the `View Certificates...` button. Import the X.509 certificate under the `Your Certificates` tab by finding its location on your local computer.

Once the certificate has been imported, restart your browser and log into the [ESCAPE IAM](https://iam-escape.cloud.cnaf.infn.it/login). A pop-up window allowing you to select the certificate you want to identify with should appear. If the pop-up window has appeared, go to your IAM user home page and click on the green `Link certificate` button in the `X.509 certificates` panel. 

#### Extract the `usercert.pem` and `userkey.pem` from a `.p12` file

In specific situations, for example when performing a `voms-proxy-init` command, you would need to have the X.509 certificate separated into the user-key and the user-certificate.

Place the `.p12` file in the `.globus` directory in your home area. If the directory doesn’t exist, create it:
```bash
$ cd ~
$ mkdir -p .globus
$ cd ~/.globus
$ mv /path/to/<your_cert>.p12 .
```
From the `.globus` directory, execute the following shell commands:

```bash
$ rm -f usercert.pem
$ rm -f userkey.pem
$ openssl pkcs12 -in <your_cert>.p12 -clcerts -nokeys -out usercert.pem
$ openssl pkcs12 -in <your_cert>.p12 -nocerts -nodes -out userkey.pem
$ chmod 644 usercert.pem
$ chmod 400 userkey.pem
```
This completes the X.509 certificate set-up for ESCAPE.

