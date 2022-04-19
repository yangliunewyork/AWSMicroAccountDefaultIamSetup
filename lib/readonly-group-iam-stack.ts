import * as CDK from "aws-cdk-lib";
import * as IAM from "aws-cdk-lib/aws-iam";

export interface StackProps extends CDK.StackProps {
  readonly env: CDK.Environment;
  readonly packageName: string;
  readonly description: string;
}

/**
 * Here we defines a ReadOnlyGroup. You can begin with the IAM managed policy 'ReadOnlyAccess'.
 * However, sometimes you may not want team members being able to view everything.
 */
export class ReadOnlyGroupStack extends CDK.Stack {

    private readOnlyGroup: IAM.Group;

    constructor(scope: CDK.App, id: string, props: StackProps) {
      super(scope, id, props);

      const readOnlyGroup: string = `${props.packageName}-ReadOnlyGroup`;
      this.readOnlyGroup = new IAM.Group(this, readOnlyGroup, {
        groupName: readOnlyGroup,
      });

      this.readOnlyGroup.addManagedPolicy(
        IAM.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess")
      );
      
    }


}