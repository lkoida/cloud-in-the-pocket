# Cloud in the Pocket

<details name="branch" open>
    <summary style="font-size: 32px;">01 - Check the prerequisites and run the CLI examples</summary>

* Show the initial code and explain it
  * Check that all prerequisites are installed
      * Docker
      * aws
      * awslocal
        ```shell
          docker -v && \
          aws --version  && \
          awslocal --version
        ```
      * aws credentials and profiles created
        ```shell
          cat ~/.aws/config && cat ~/.aws/credentials
        ```
      * localstack account created and activated hobby plan
      [LocalStack Dashboard -->](https://app.localstack.cloud/workspace/members) 

<details style="margin-inline-start:24px">
    <summary style="font-size: 24px">Interactive Part</summary>

* Create directory for docker
    * Add the services into docker-compose for postgres and localstack. And each line explained
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
