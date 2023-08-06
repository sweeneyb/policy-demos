package main

deny[msg] {
    input.name != "Second"
    msg = sprintf("name does not match Second: %v", [input.name])
}