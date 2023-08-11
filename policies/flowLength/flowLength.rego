package main

deny[msg] {
    input.name != "Second"
    msg = sprintf("name does not match Second: %v", [input.name])
}

deny[msg] {
    count(input.accountFlows) > 2
    # print(count(input.accountFlows))
    # print(flow)
    msg = sprintf("Relevant account name: %v", [input.name])
}