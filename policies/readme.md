conftest test --policy policies\email backend/data/tenants/First.yaml
conftest test --policy policies\email backend/data/tenants/Second.yaml

curl http://localhost:8000/tenant/First|jq .| conftest test --policy policies\email -
curl http://localhost:8000/tenant/Second|jq .| conftest test --policy policies\email -