package main 

# Run this as ```conftest verify --policy .```

# "not deny" doesn't work because deny is a set.
# Instead we need to define "no_violations" to be true when `deny` is empty.
# See https://www.conftest.dev/#testingverifying-policies

empty(value) {
  count(value) == 0
}

no_violations {
  empty(deny)
}

test_First {
  cfg := parse_config_file("../../backend/data/tenants/First.yaml")
  no_violations with input as cfg
}

test_Second {
  cfg := parse_config_file("../../backend/data/tenants/Second.yaml")
  no_violations with input as cfg
}