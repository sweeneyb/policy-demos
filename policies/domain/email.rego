package main

import future.keywords.in

deny[msg] {
    flow := input.accountFlows[_]
    # print(flow)
    some key
    m := is_internal_email(flow[key].responsibleEmail)
    not m
    
    print(flow)
    print(flow[key].FlowNodes)
    print(data.servers["businessGroup"]["HR"])

    some nodeSet
    flow[key].FlowNodes[nodeSet]["address"] in data.servers["businessGroup"]["HR"]
    msg = sprintf("External email addres in an HR flow  %v: %v", [key, flow[key].responsibleEmail])
}

deny[msg] {
    flow := input.accountFlows[_]
    # print(flow)
    some key
    m := is_internal_email(flow[key].responsibleEmail)
    not m
    # print(flow)
    msg = sprintf("External email addres in flow  %v: %v", [key, flow[key].responsibleEmail])
}

is_internal_email(email_address) = true {
    pattern := "@sharklasers.com$"
    matched := regex.match(pattern, email_address)
    matched == true 
} else = false { true }