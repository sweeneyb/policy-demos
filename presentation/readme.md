# How I got this working
* installed https://miktex.org/docs
* Had a working python distribution running

```cmd
python -m venv venv
venv\Scripts\activate
pip install pygments
```

For each run (I don't know why VSCode isn't inheriting my path):
```
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\MiKTeX\miktex\bin\x64\
venv\Scripts\activate
pdflatex -shell-escape test.tex
```


todo: pull in data from other sources

curl http://localhost:8000/tenant/foo -H "Content-Type: application/json" -d @..\backend\data\tenants\Second.json