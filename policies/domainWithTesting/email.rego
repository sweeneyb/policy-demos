package main

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
} else = false 