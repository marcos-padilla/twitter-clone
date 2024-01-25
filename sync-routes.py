import os
import subprocess

backend_dir = '/backend'
os.chdir(os.getcwd()+backend_dir)

output = subprocess.check_output(['php', 'artisan', 'route:list', '--except-vendor'])
lines = output.decode('utf-8').split('\n')

routes = []

for line in lines:
     if line == '':
          continue
     split_line = [
          elem for elem in line.split(' ') 
          if elem != '' 
          and not elem.startswith('..') 
          and elem != '›'
          and elem != '\r'
     ]
     if len(split_line) >= 4:
          routes.append({
               'method': split_line[0],
               'uri': split_line[1],
               'name': split_line[2],
          })


frontend_routes_file = '../frontend/lib/routes.ts'

with open(frontend_routes_file, 'w') as f:
     f.write('export const routes = {\n')
     for route in routes:
          f.write(f'     "{route["name"]}": {{\n')
          f.write(f'          method: "{route["method"]}",\n')
          f.write(f'          uri: "{route["uri"]}",\n')
          f.write(f'     }},\n')
     f.write('} as const\n')
