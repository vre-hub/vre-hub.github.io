# Authentication

The interaction with the Data Lake requires authentication.
It is required to register to the INDIGO Identity and Access Management (IAM) service and obtain a X.509 Grid certificate. Follow the instructions in the next sections.

### ESCAPE IAM registration

Navigate [here](https://iam-escape.cloud.cnaf.infn.it/login) and register for a new account, filling in the required details.
After the account has been approved, you will need to log in and add the Escape group to your Groups. To do this, click on the green **Join a group** button in the **Group requests** panel. Enter 'escape' in the group box, adding a brief motivation for the request. You will need to wait in order for this to be manually approved by site admins. If your request is urgent, please email the admins at _escape-cern-ops@cern.ch_.

### X.509 Grid certificate    

#### *Getting the certificate*    

The following procedure is described for a UK CA/RA, but it is different depending on the country you are located in. Check this [link](https://www.eugridpma.org/members/worldmap/) to see what you need.  

An X.509 grid certificate is sought by first contacting the appropriate certificate authority (CA). This can be done [here](https://portal.ca.grid-support.ac.uk/). Make a note of both the pin and key password, as they will be required later.

After your request, you will receive an email asking for further information to be passed to the registration authority (RA). 
You will need some form of I.D. (e.g. site I.D., driver’s licence, passport) in addition to the pin that was entered in the request to the CA. You will need to pass these to one of the contacts listed in the email, as instructed, who will likely want to arrange a brief video call to confirm your identity against your provided documents.

Once your identity has been confirmed, you will be emailed a link to download your certificate in .p12 format (PKCS 12). Download the file and store it in a safe place on your computer, where it is always easily accessible. 

 -  For **CERN** members, the request can be made [here](https://ca.cern.ch/ca/), under the ‘Grid Certificates’ section with ‘New Grid User Certificate’.

#### *Uploading the certificate* 

Before linking the Grid certificate to your IAM account, you will need to add the certificate to your browser. The procedure you will need to follow varies depending on what browser you are using. 

Be aware that the browser is configured to store all your uploaded certificates. You should therefore check whether the browser is not already using an old certificate, which might be expired. If this is the case, delete old certificates and upload your new one. 

 - **Chrome**: For Chrome, this can be done by navigating to `chrome://settings/security` and following the instructions presented upon selecting `Advanced > Manage Certificates > Import`. 

Once the certificate has been imported, restart your browser. Then log into the [ESCAPE IAM](https://iam-escape.cloud.cnaf.infn.it/login). A pop-up window allowing you to select the certificate you want to identify with should appear. If the pop-up window has appeared, click on the green button `Link certificate` button in the `X.509 certificates` panel. 

#### *Changing the certificate* 

Separate out the .p12 object into a separate key (.key) and certificate (.crt). 
Place the .p12 certificate file in the .globus directory in your home area. If the directory doesn’t exist, create it:
```bash
$ cd ~
$ mkdir .globus
$ cd ~/.globus
$ mv /path/to/<your_cert>.p12 .
```
From the .globus directory, execute the following shell commands:

```bash
$ rm -f client.crt
$ rm -f client.key
$ openssl pkcs12 -in <your_cert>.p12 -clcerts -nokeys -out usercert.pem
$ openssl pkcs12 -in <your_cert>.p12 -nocerts -nodes -out userkey.pem
$ chmod 644 usercert.pem
$ chmod 400 userkey.pem
```
This completes the X.509 certificate set-up for ESCAPE.

### OpenID token 

If you find it hard to obtain a X509 certificate, you can communicate with Rucio through the OpenID [token](http://rucio.cern.ch/documentation/using_the_client/#open-id-connect-authentication-examples) authentication. The downside of this method is that many storage elements do not support this authentication, so your 'power' to upload and download data will be limited. You will find all instructions to interact with the client in this (easier) way in the following section. 



