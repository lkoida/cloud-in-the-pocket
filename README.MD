# Cloud In the Pocket

#### Source code for presentation about usage LocalStack in development of cloud based applications managed by __AWS__

## Diagram of the TO-DO application
![Cloud_In_the_Pocket.diagram.png](presentation/ing-bkp/img/Cloud_In_the_Pocket.diagram.png)

## Prerequisites
1. aws-cli installed -[link to installation guide](https://docs.localstack.cloud/user-guide/integrations/aws-cli/#aws-cli)
2. cdk installed - [insallation guide to cdk](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
3. docker and docker compose installed - [link to documentation](https://docs.docker.com/engine/install/)
4. awslocal installed - [awscli-local installation guide](https://docs.localstack.cloud/user-guide/integrations/aws-cli/#localstack-aws-cli-awslocal)
5. cdklocal installed - [installation guide for cdklocal](https://docs.localstack.cloud/user-guide/integrations/aws-cdk/)
6. Hobby account on [LocalStack.cloud](https://www.localstack.cloud/) created (It is needed to use the API token and full power of professional version of LocalStack docker image)

> [!IMPORTANT]
> This setup tested on UNIX based systems
> On Windows it was used under WSL2 only.

### Services and tools used
* __AWS__
    * aws-cli
    * cdk
* __LocalStack__
    * awscli-local
    * cdklocal
    * __Mocked Services__
        * API Gateway
            * Lambda Authorizers
        * Lambda
            * Secrets Manager
        * S3
        * SQS
        * SES (SDK)

### Branches to navigate
1. 01-todo (folders: lambdas, requests, possibly presentation, ready ecosystem and stuff installed)
    1. in lambdas should be removed completely attachments lambda, api-gateway-auth lambda, user lambda should be reduced to not have implemented
    2. method about update user (this method should be implemented as a part of the CDK implementation)
    3. As an interactive point present the installation of the all prerequisites (aws, awslocal, localstack)
        1. show the configurations you already have for AWS
    4. Present the simple work for localstack from command line
        1. specify why it is not optimal and move the next branch
2. 02-todo (the same folders)
    1. scripts with some stuff should be added, maybe for presentation purposes I'll add some manual updates for scripts folder
        1. to provide the scripts to create the secrets, lambdas(except the attachments) API Gateway should be already there, buckets, SQS
3. 03-todo ()

