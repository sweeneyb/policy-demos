package main

deny[msg] {
    input.name != "Second"
    msg = sprintf("name does not match Second: %v", [input.name])
}

deny[msg] {
    flow := input.accountFlows[_]
    # print(flow)
    some key
    flow[key].responsibleEmail != "vhhcjfjl@sharklasers.com"
    # print(flow)
    msg = sprintf("Relevant flow name: %v", [key])
}