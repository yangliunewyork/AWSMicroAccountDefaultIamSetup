# AWSDefaultMicroAccountIamSetup

This is a IAM management CDK pacakge that aims to provide __minimal IAM permissions__ for a micro AWS account.
A micro AWS account is an AWS account that will only be used for one service.

Once a new micro AWS account is created by the company, this package should be deployed so that these IAM permissions can be setup immediately. 

This setup will create these IAM groups and roles(from least to most privileges):

* Readonly group
* Developer group
* DevOps group
* Administrator group

Some reference:
* https://aws.amazon.com/blogs/architecture/field-notes-how-factset-uses-microaccounts-to-reduce-developer-friction-and-maintain-security-at-scale/

## Build and deploy

Build the whole project:  

```
cdk synth  
```

List all the generated stacks:  
```
cdk list
```

I created a `RootUser` that as the root user of the whole AWS account, and use it to update IAM groups/roles/users.
This is recommended as you don't want anybody has the permissions to update IAM.

You will need bootstrap the account first:

```
cdk bootstrap --profile RootUser 
```

To deploy a specific stack:  
```
cdk deploy AWSMicroAccountDefaultIamSetup-DefaultDevelopersPermissionsStack --profile RootUser
```

Other userful commands:  
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
