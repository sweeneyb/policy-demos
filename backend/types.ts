type TenantKey = {
    [id: string]: AccountFlow
}
export class Tenant  {
    public name: string;
    public size: number = 42
    public accountFlows = new Map<string, AccountFlow>()

    constructor(name: string, accountFlows: Map<string, AccountFlow>) {
        this.name = name
        this.accountFlows = accountFlows
    }
}

export class Account {
    public name: string;

    constructor(name: string) {
        this.name = name
    }
}

export class FlowNode {
    public name: string;
    public address: string;
    public region: string;
    public parallelism: number;

    constructor(name: string, address: string, region: string, parallelism: number){
        this.name = name;
        this.address = address;
        this.region = region;
        this.parallelism = parallelism;
    }
}

export class AccountFlow {
    public name: string;
    public inwardNode: FlowNode
    public outwardNodes: Set<FlowNode>
    public responsibleEmail: string

    constructor(name: string, responsibleEmail: string, inwardNode: FlowNode,  outwardNodes: Set<FlowNode>) {
        this.name = name
        this.inwardNode = inwardNode;
        this.outwardNodes = outwardNodes;
        this.responsibleEmail = responsibleEmail
    }
}