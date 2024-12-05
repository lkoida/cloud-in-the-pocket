# Cloud in the Pocket

<details name="branch">
    <summary style="font-size: 32px;">01 - Check the prerequisites and run the CLI examples</summary>

* Show the initial code and explain it
  * Check that all prerequisites are installed
      * [Docker](https://docs.docker.com/engine/install/)
      * [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
      * [awslocal](https://docs.localstack.cloud/user-guide/integrations/aws-cli/#localstack-aws-cli-awslocal)
        ```shell
          echo "Docker: $(docker -v)" && \
          echo "AWS-CLI: $(aws --version)"&& \
          echo "AWS-LOCAL: $(awslocal --version)"
        ```
      * [aws credentials and profiles created](https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html)
        ```shell
          cat ~/.aws/config && cat ~/.aws/credentials
        ```
      * [localstack account created and activated hobby plan](https://app.localstack.cloud/workspace/members)

<details style="margin-inline-start:24px">
    <summary style="font-size: 24px">Interactive Part</summary>

* Create directory for docker
    * Add the services into docker-compose for postgres and localstack.
    * Add .env file for postgres
    * Add helper scripts into root package.json
    * Start the docker services
    * Show the `cli` examples of the bucket creation

```shell
  awslocal s3 mb s3://test-bucket
```

```shell
  awslocal s3 ls
```

```shell
  awslocal s3 cp "${PWD}/ecosystem.config.cjs" s3://test-bucket/ecosystem.config.cjs
```

```shell
  awslocal s3 cp s3://test-bucket/ecosystem.config.cjs -
```

```shell
  awslocal s3 cp s3://test-bucket/ecosystem.config.cjs ecosystem.config_downloaded.cjs 
```

```shell
  awslocal s3 rb s3://test-bucket --force
```

_Proof that such kind of work is ok to know the basics of aws cli
but completely not sufficient to deal with complex infrastructure settings_
</details>
</details>

---

<details name="branch">
    <summary style="font-size: 32px;">02 - Primitive automation example</summary>

* Describe `scripts` directory created in the root of the project

<details style="margin-inline-start:24px">
 <summary style="font-size: 24px">Interactive Part</summary>

### Interactive part

* Run all scripts related to the api gateway in `/scripts` directory in a sequence
* Describe and show with example of pre-created script for API Gateway why it is not optimal

</details>
</details>

---

<details name="branch">
    <summary style="font-size: 32px">03 - Continue automation, use localstack lifecycle stages</summary>

### Work with LocalStack lifecycle stages and hooks

```
/etc
└── localstack
    └── init
        ├── boot.d           <-- executed in the container before localstack starts
        ├── ready.d          <-- executed when localstack becomes ready
        ├── shutdown.d       <-- executed when localstack shuts down
        └── start.d          <-- executed when localstack starts up
```

<details style="margin-inline-start:24px">
 <summary style="font-size: 24px;">Interactive part</summary>

* Update `docker-compose.yaml` to have the localstack scripts directory mounted
* Move there some scripts and describe how this stuff works
  ```shell
      mkdir docker/localstack_scripts && cp -R scripts/[1-3]_*.sh docker/localstack_scripts
  ```
* Make all files in `localstack_scripts` directory executable by running 
  ```shell
    chmod -R +x docker/localstack_scripts
  ```
* Show why this already a better solution but still there is a room for improvement

</details>
</details>

---

<details name="branch">
<summary style="font-size: 32px">04 - Automation Evolution, provide IaC solution</summary>

* Introduce the __CDK__
  * Explain what is this
  * Check the prerequisites

```shell
   echo "CDK - $(cdk --version)" &&
   echo "CDK-LOCAL - $(cdklocal --version)"

```

<details style="margin-inline-start:24px">
<summary style="font-size: 24px">Interactive part</summary>

* Init the cdk application 
  ```shell
     mkdir cdk-infra && cd cdk-infra && cdk init app --language typescript --generate-only
  ```
* Jump to the source for a bit
* Install all dependencies
* export profile variable `export AWS_PROFILE=localstack`
* build the project `npm run build`
* run basic commands like `cdklocal bootstrap`, `cdklocal synth`, `cdklocal deploy`, `cdklocal destory`

</details>
</details>

---

<details name="branch" open>
    <summary style="font-size: 32px">05 - Jump Into Prepared Code</summary>

* Have all previously created code in place
* Describe what already created - just to save time
  * Add helpers into root package json for:
    * secrets
    * emails
  * Run docker containers
    * Run dump.sql file
    * Run secrets.sh (explain)
    * Run emails.sh (explain)
  * Run CDK bootstrap
  * Run synth and build for existing part
  * Show the working solution for existing code of application
  * Run the possible requests scenarios

<details style="margin-inline-start:24px">
  <summary style="font-size: 24px">Interactive part</summary>

### Let's implement the next missing functionality

1. Add possibility to users to update information about them
    1. PUT method in users lambda
    2. Add resources in ApiGateway
    3. Update integrations if needed
    4. ... check for other steps and annotate them
    5. Rebuild CDK-LOCAL
2. Protect existing routes / lambdas using Lambda Authorizer ![Secure-API-Gateway-b-Figure-1.png](presentation/img/Secure-API-Gateway-b-Figure-1.png)
    1. Create Lambda to validate the request
    2. Describe what the policies are
    3. Update ApiGateway configuration
    4. Rebuild CDK-LOCAL
3. Add possibility to store the attachments
    1. Create Attachments lambda
    2. Explain the flow of the file upload form the user and S3 perspective. Explain the constraints of the ApiGateway
       and Lambda

   ![Secure-API-Gateway-b-Figure-1.png](presentation/img/s3-2.png)
</details>
</details>
