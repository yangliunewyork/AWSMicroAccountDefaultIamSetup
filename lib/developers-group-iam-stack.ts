import * as CDK from "aws-cdk-lib";
import * as IAM from "aws-cdk-lib/aws-iam";

export interface StackProps extends CDK.StackProps {
  readonly env: CDK.Environment;
  readonly packageName: string;
  readonly description: string;
}

export class DefaultDevelopersPermissionsStack extends CDK.Stack {
  private developersGroup: IAM.Group;

  constructor(scope: CDK.App, id: string, props: StackProps) {
    super(scope, id, props);

    const developersIAMGroup: string = `${props.packageName}-DevelopersGroup`;
    this.developersGroup = new IAM.Group(this, developersIAMGroup, {
      groupName: developersIAMGroup,
    });

    this.grantBasicPermissions();
    this.grantIAMPermissions();
    this.grantPipelinePermissions();
    this.grantCodeBuildPermissions();
    this.grantS3Permissions();
    this.grantCloudWatchPermissions();
    this.grantEc2Permissions();
    this.grantEcrPermissions();
    this.grantSecretsManagerPermissions();
    this.grantElasticLoadBalancingPermissions();
    this.grantSqsPermissions();
    this.grantRdsPermissions();
    this.grantKmsPermissions();
    this.grantAcmPermissions();
    this.grantSystemsManagerPermissions();
  }

  private grantBasicPermissions() {
    // Can't have more than 10 managed policies attached to an IAM role
    this.developersGroup.addManagedPolicy(
      IAM.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess")
    );
    this.developersGroup.addManagedPolicy(
      IAM.ManagedPolicy.fromAwsManagedPolicyName("AmazonVPCFullAccess")
    );
    this.developersGroup.addManagedPolicy(
      IAM.ManagedPolicy.fromAwsManagedPolicyName("AWSCloudFormationFullAccess")
    );
  }

  private grantIAMPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "IamAccess",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "iam:ChangePassword",
          "iam:PassRole"
        ],
      })
    );
  }

  private grantPipelinePermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "PipelineAccess",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "codepipeline:*"
        ],
      })
    );
  }

  private grantCodeBuildPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "CodeBuildAccess",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "codebuild:*",
        ],
      })
    );
  }


  private grantS3Permissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "S3Access",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "s3:Create*",
          "s3:List*",
          "s3:SetBucketEncryption",
          "s3:Put*",
          "s3:Get*",
        ],
      })
    );
  }

  private grantCloudWatchPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "CloudwatchPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "logs:Get*",
          "logs:Describe*",
          "logs:Create*",
          "logs:Put*",
          "cloudwatch:Describe*",
          "cloudwatch:PutMetricAlarm",
        ],
      })
    );
  }

  private grantEcrPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "EcrAccess",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "ecr:Create*",
          "ecr:Get*",
          "ecr:Put*",
          "ecr:Describe*",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:BatchCheckLayerAvailability",
          "ecr:SetRepositoryPolicy",
        ],
      })
    );
  }

  private grantElasticLoadBalancingPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "ElasticLoadBalancingPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: ["elasticloadbalancing:*"],
      })
    );
  }

  private grantRdsPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "RdsPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "rds:Create*",
          "rds:Describe*",
          "rds:ModifyDBCluster",
          "rds:ModifyDBClusterParameterGroup",
          "rds:ModifyDBInstance",
          "rds:ModifyDBParameterGroup",
          "rds:ModifyEventSubscription",
        ],
      })
    );
  }

  private grantSqsPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "SqsPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "sqs:Get*",
          "sqs:Change*",
          "sqs:List*",
          "sqs:AddPermission",
          "sqs:SetQueueAttributes",
          "sqs:CreateQueue",
        ],
      })
    );
  }

  private grantKmsPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "KmsPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "kms:Describe*",
          "kms:Create*",
          "kms:Enable*",
          "kms:Get*",
          "kms:Put*",
          "kms:Generate*",
          "kms:Encrypt*",
          "kms:Decrypt*",
          "kms:Update*",
        ],
      })
    );
  }

  private grantAcmPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "AcmPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "acm:Add*",
          "acm:Get*",
          "acm:List*",
          "acm:Describe*",
          "acm:Import*",
        ],
      })
    );
  }

  private grantSecretsManagerPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "SecretsManagerPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "secretsmanager:Get*",
          "secretsmanager:List*",
          "secretsmanager:Describe*",
          "secretsmanager:Create*",
        ],
      })
    );
  }

  private grantSystemsManagerPermissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "SystemsManagerPermissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: ["ssm:Get*", "ssm:Describe*", "ssm:Create*", "ssm:Put*"],
      })
    );
  }

  private grantEc2Permissions() {
    this.developersGroup.addToPolicy(
      new IAM.PolicyStatement({
        sid: "Ec2Permissions",
        resources: ["*"],
        effect: IAM.Effect.ALLOW,
        actions: [
          "ec2:Get*",
          "ec2:Describe*",
          "ec2:Create*",
          "ec2:RunInstances",
        ],
      })
    );
  }
}
