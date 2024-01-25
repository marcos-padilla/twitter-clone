import os
import subprocess
import re

backend_dir = '/backend'
os.chdir(os.getcwd()+backend_dir)

output = subprocess.check_output(['php', 'artisan', 'route:list', '--except-vendor'])
lines = output.decode('utf-8').split('\n')
param_pattern = r'{(\w+)}'

routes = []
routes_params = []

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
          if split_line[0] == 'GET|HEAD':
               split_line[0] = 'GET'
          if split_line[0] == 'POST|HEAD':
               split_line[0] = 'POST'
          if split_line[0] == 'PUT|PATCH':
               split_line[0] = 'PUT'

          routes.append({
               'method': split_line[0],
               'url': split_line[1],
               'name': split_line[2],
          })

          params = re.findall(param_pattern, split_line[1])
          routes_params.append({
               'name': split_line[2],
               'params': params
          })

          


frontend_routes_file = '../frontend/lib/routes.ts'

with open(frontend_routes_file, 'w') as f:
     f.write('export const routes = {\n')
     for route in routes:
          f.write(f'     "{route["name"]}": {{\n')
          f.write(f'          method: "{route["method"]}",\n')
          f.write(f'          url: "{route["url"]}",\n')
          f.write(f'     }},\n')
     f.write('} as const\n\n')

     f.write('export type Route = \n')
     for route in routes_params:
          f.write('| {\n')
          f.write(f'     name: "{route["name"]}"')
          if len(route['params'])>0:
               f.write('\n    params: {\n')
               for param in route['params']:
                    f.write(f'          {param}:any \n ')
               f.write('}\n')
          f.write('\n}\n')
