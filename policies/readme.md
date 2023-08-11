pressing Ctrl + and Ctrl - to adjust font size

conftest test --policy policies\email backend/data/tenants/First.yaml
conftest test --policy policies\email backend/data/tenants/Second.yaml

conftest test --policy policies\flowLength backend/data/tenants/Second.yaml 
conftest test --policy policies\flowLength backend/data/tenants/Third.yaml 

conftest verify --policy domainWithTesting

curl http://localhost:8000/tenant/First|jq .| conftest test --policy policies\email -
curl http://localhost:8000/tenant/Second|jq .| conftest test --policy policies\email -

curl http://localhost:8000/tenant/foo -H "Content-Type: application/json" -d @dummy.json
curl http://localhost:8000/tenantWithCheck/foo -H "Content-Type: application/json" -d @dummy.json


opa.exe run -s --bundle domain
opa.exe run -s servers:host-mapping.json domain
http://localhost:8181/v1/policies
curl "http://localhost:8181/v1/data/main" -H "Content-Type: application/json" --data @tenants\Second.json

curl http://localhost:8000/tenant/Second  |jq {"input":.} | curl "http://localhost:8181/v1/data/main" -H "Content-Type: application/json" --data @-
curl http://localhost:8000/tenant/Second  |jq {"input":.} | curl "http://localhost:8181/v1/data/main" -H "Content-Type: application/json" --data @-|jq .