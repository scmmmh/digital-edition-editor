import re
import json

from datetime import datetime
from shutil import rmtree
from subprocess import run

# Update version numbers
version = input('New Version: ')

with open('package.json') as in_f:
    data = json.load(in_f)
data['version'] = version
with open('package.json', 'w') as out_f:
    json.dump(data, out_f, indent=2)

with open('pyproject.toml') as in_f:
    lines = in_f.readlines()
with open('pyproject.toml', 'w') as out_f:
    for line in lines:
        if line.startswith('version = '):
            out_f.write(f'version = "{version}"\n')
        else:
            out_f.write(line)

with open('docs/conf.py') as in_f:
    lines = in_f.readlines()
with open('docs/conf.py', 'w') as out_f:
    for line in lines:
        if line.startswith('release = '):
            out_f.write(f"release = '{version}'\n")
        else:
            out_f.write(line)

with open('docker/base/Dockerfile') as in_f:
    lines = in_f.readlines()
with open('docker/base/Dockerfile', 'w') as out_f:
    for line in lines:
        if re.search('digi_edit-[0-9]+\.[0-9]+\.[0-9]+', line):
            out_f.write(re.sub('digi_edit-[0-9]+\.[0-9]+\.[0-9]+', f'digi_edit-{version}', line))
        else:
            out_f.write(line)

with open('docker/gutzkow/Dockerfile') as in_f:
    lines = in_f.readlines()
with open('docker/gutzkow/Dockerfile', 'w') as out_f:
    for line in lines:
        if line.startswith('FROM scmmmh/digitaleditioneditor:'):
            out_f.write(f'FROM scmmmh/digitaleditioneditor:{version}\n')
        else:
            out_f.write(line)

# Build the static changes information

history = []
changes = []
release = None

with open('CHANGES.md') as in_f:
    for line in in_f:
        line = line.strip()
        match = re.fullmatch(r'## ([0-9]+\.[0-9]+\.[0-9]+) \(([0-9]+)\.([0-9]+)\.([0-9]+)\)', line)
        if match:
            if release and changes:
                history.append(
                    {'version': release[0],
                     'date': release[1].isoformat(),
                     'changes': changes}
                )
                changes = []
            release = (match.group(1), datetime(int(match.group(4)), int(match.group(3)), int(match.group(2))))
        if release:
            match = re.fullmatch(r'\* \*\*(New|Update|Bugfix)\*\*: (.+)', line)
            if match:
                changes.append({'type': match.group(1).lower(),
                                'message': match.group(2)})

with open('src/digi_edit/static/changes.json', 'w') as out_f:
    json.dump(history, out_f)


# Build the help docs
rmtree('src/digi_edit/static/help', ignore_errors=True)
run(['sphinx-build', '-b', 'html', '.', '../src/digi_edit/static/help'], cwd='docs')
