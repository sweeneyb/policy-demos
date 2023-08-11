package main

deny[msg] {
    count(input.accountFlows) > 2
    msg = sprintf("Relevant account name: %v", [input.name])
}