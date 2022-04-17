#!/usr/bin/env node
import 'source-map-support/register';
import * as CDK from 'aws-cdk-lib';
import { DefaultDevelopersPermissionsStack } from '../lib/developers-iam-stack';

const packageName = "AWSMicroAccountDefaultIamSetup";
const prodEnv : CDK.Environment = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION};
const app = new CDK.App();

new DefaultDevelopersPermissionsStack(app, `${packageName}-DefaultDevelopersPermissionsStack`, {
  packageName: packageName,
  env: prodEnv,
  description: `The default developers IAM permissions setup by ${packageName}.`
});

app.synth();