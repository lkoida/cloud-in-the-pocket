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


<details name="branch" open>
    <summary style="font-size: 32px;">02 - Primitive automation example</summary>

* Describe `scripts` directory created in the root of the project
* Some scripts added form the start

<details style="margin-inline-start:24px">
 <summary style="font-size: 24px">Interactive Part</summary>

### Interactive part

* Run all scripts in `/scripts` directory in a sequence
* Check that /register /login /users endpoint are working
* Describe and show with example of pre-created script for API Gateway why it is not optimal

</details>
</details>

---
