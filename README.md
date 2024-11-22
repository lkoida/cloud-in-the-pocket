# Cloud in the Pocket

<details name="branch" open>
    <summary style="font-size: 32px;">01 - Check the prerequisites and run the CLI examples</summary>

* Show the initial code and explain it
* Check that all prerequisites are installed
    * Docker
    * aws
    * aws credentials and profiles created
    * awslocal
    * localstack account created and activated hobby plan (show in browser)

```shell

# Check the versions of the tools installed
docker -v && \
aws --version  && \
awslocal --version
```

<details style="margin-inline-start:24px">
    <summary style="font-size: 24px">Interactive Part</summary>

* Create directory for docker
    * Add the services into docker-compose for postgres and localstack. And each line explained
    * Add .env file for postgres
    * Add helper scripts into root package.json
    * Start the docker services
    * Show the `cli` examples of the bucket creation

```shell
# let's create a test bucket in the localstack
awslocal s3 mb s3://test-bucket
```

```shell
#check if bucket is created
awslocal s3 ls
```

```shell
# upload file to the bucket
awslocal s3 cp "${PWD}/ecosystem.config.cjs" s3://test-bucket/ecosystem.config.cjs
```

```shell
# stream file into stdout in terminal
awslocal s3 cp s3://test-bucket/ecosystem.config.cjs -
```

```shell
# download file from s3 to local directory 
awslocal s3 cp awslocal s3 cp s3://test-bucket/ecosystem.config.cjs ecosystem.config_downloaded.cjs 
```

```shell
#destroy the bucket (force to remove bucket with any images in it)
awslocal s3 rb s3://test-bucket --force
```

_Proof that such kind of work is ok to know the basics of aws cli
but completely not sufficient to deal with complex infrastructure settings_
</details>
</details>
