# Presentation checklist

<details>
<summary>01-todo</summary>

## Step One

* [ ] Show the initial code and explain it
* [ ] Check that all prerequisites are installed
  * [ ] Docker
  * [ ] aws
  * [ ] aws credentials and profiles created
  * [ ] awslocal


__Check the versions of the tools installed__
```shell
aws --version
```

```shell
awslocal --version
```

### Interactive part
 * [ ] Directory for docker created
 * [ ] docker-compose added for postgres and localstack. And each line explained
 * [ ] added helper scripts into main package.json
 * [ ] start the docker services
 * [ ] show the cli examples of the bucket and lambda creation

```shell
# let's create a test bucket in the localstack
awslocal s3 mb s3://test-bucket
```
```shell
#check if bucket is created
awslocal s3 ls --recursive
```

```shell
#upload file to the bucket
awslocal s3 cp ./ecosystem.config.js s3://test-bucket/ecosystem.config.js

#access image form the browser using the localstack api
```

```shell
#destroy the bucket (force to remove bucket with any images in it)
awslocal rb s3://test-bucket --force
```

_Proof that such kind of work is ok to know the basics of aws cli 
but completely not sufficient to deal with complex infrastructure settings_ 
</details>

<details>
<summary>02-todo</summary>

## Step two

* [ ] Scripts directory created
* [ ] Some scripts added form the start

### Interactive part

* [ ] Add script for sqs, bucket and run it from the terminal
* [ ] Describe and show with example of pre-created script for API Gateway why it is not optimal 
</details>
