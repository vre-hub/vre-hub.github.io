# REANA

![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Freana%2Freana-release.yaml&query=%24.spec.chart.spec.version&label=Reana%20release&color=%23fd3337)

Reana is a software developed at CERN that focuses on the reproducibility and reanalysis of scientific results. 

## CERN VRE Reana deployment

* The current Reana Helm chart version deployed on the VRE cluster is shown on the badge at the top of this page.
* The Reana manifests deployed on the cluster can be found on the VRE repository - [Reana deployment](https://github.com/vre-hub/vre/tree/main/infrastructure/cluster/flux/reana).


### Installation of the REANA VRE instance
(*Special thanks to Elena G. for the drafting of this documentation*)

1. Apply the Reana hel charts (the `reana-release.yaml` manifest on our repository. Please note that they are adapted to be compliant with flux" helm chart via flux), keeping the ingress
disabled as the default Reana ingress is Traefik, while at CERN Openstack already deploys nginx as the ingress controller.
<<<<<<< HEAD
2. If you are using your own DB instance, change the configuration with DB name, host and port in the Helm chart, delete the secret `<your-reana-helm-release>`-db-secrets which contains the
=======
2. If you are using your own DB instance, change the configuration with DB name, host and port in the Helm chart, delete the secret <your-reana-helm-release>-db-secrets which contains the
>>>>>>> 1c1f6c42d1a918974cccae74207e9edfebbad575
username and password and re-apply your own as in the `infrastructure/scripts/create-reana-secrets.sh`. 
:::note

Note that the secret gets updated every time you `helm update` or apply the `reana-release.yaml`.
Make sure you check that the DB secret is your own and not the default one once you update or change the charts.

:::
Initialise the DB as described in the helm chart. If you are using `k9s`, type `:helm` and press enter on the `your-reana-helm-release` name for instructions.
3. Once the helm chart is applied correctly, add the DNS name (`reana-vre.cern.ch`) as a label to the ingress nodes, like you should have done with during the jhub deployment as well:
```bash
openstack server set --property landb-alias=jhub-vre--load-1-,reana-vre--load-1- vre-xxxxxxxxxxxx-node-0 
openstack server set --property landb-alias=jhub-vre--load-2-,reana-vre--load-2- vre-xxxxxxxxxxxx-node-1
openstack server set --property landb-alias=jhub-vre--load-3-,reana-vre--load-3- vre-xxxxxxxxxxxx-node-2
```
4. Apply the `reana-ingress.yaml` manually. The `letsencrypt` annotation should create the secret `cert-manager-tls-ingress-secret-reana` automatically.
5. Configure Reana to use your identity provider. For this, follow the instructions on the [Reana official docs](https://github.com/reanahub/docs.reana.io/pull/151/files).
For the ESCAPE IAM idP the OpenID configuration is can be found [here](https://iam-escape.cloud.cnaf.infn.it/.well-known/openid-configuration).
The secrets of the IAM client acting on behalf of the application are stored in the `reana-vre-iam-client` secrets, deployed by the `create-reana-secrets.sh` ([link](https://github.com/vre-hub/vre/blob/main/infrastructure/scripts/reana_secrets.sh) to the script on the VRE repo).
You can then see that the users get created in the DB, also the charts has an option to specify email notification whenever a new user requests a token. 

Some useful Reana commands to deal with users:
```bash=
$ export REANA_ACCESS_TOKEN=$(kubectl get secret reana-admin-access-token -n reana -o json | jq -r '.data | map_values(@base64d) | .ADMIN_ACCESS_TOKEN')
$ echo $REANA_ACCESS_TOKEN

# LIST USERS
$ kubectl exec -i -t deployment/reana-server -n reana -- flask reana-admin user-list --admin-access-token $REANA_ACCESS_TOKEN

# CREATING USER
kubectl exec -i -t deployment/reana-server -n reana -- flask reana-admin user-create --email <user-email> --admin-access-token $REANA_ACCESS_TOKEN

# GRANTING TOKEN TO NEW USER 
kubectl exec -i -t deployment/reana-server -n reana -- flask reana-admin token-grant -e <user-email> --admin-access-token $REANA_ACCESS_TOKEN
```

6. Navigate to `reana-vre.cern.ch` and log in with your IAM credentials.

