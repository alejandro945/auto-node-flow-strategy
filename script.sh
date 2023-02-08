#!/bin/bash

# VARIABLES LOCALES A UTILIZAR

template_repository_url="https://github.com/kelvin-ca91/arquetipo-nodejs-ts"
new_repository_name=$1
access_token="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"
git_username="alejandro945"
branches=(main stage development)
protection_requirements_generic='{
  "required_status_checks": null,
  "enforce_admins": true,
  "restrictions": null,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false
  }
}'


# VERIFICAR PARAMETROS EN COMANDO DE EJECUCIÓN DEL SCRIPT

if [ -z "$1" ]
then
  echo "Debe pasar el nombre del repositorio como parámetro."
  exit 1
fi

# CLONAMOS EL REPOSITORIO EXISTENTE PUBLICO

echo "Clonando el repositorio existente..."
git clone $template_repository_url

# OBTENEMOS EL NOMBRE DEL DIRECTORIO DEL REPOSITORIO CLONADO

dir_name=`basename $template_repository_url`
echo $dir_name 

# NOS MOVEMOS AL DIRECTORIO

cd $dir_name

# BORRAMOS CONFIGURACIÓN DE GIT DE LA PLANTILLA

rm -rf .git

# CREACIÓN DEL NUEVO REPOSITORIO

response=$(curl -u $git_username:$access_token https://api.github.com/user/repos -d '{"name":"'$new_repository_name'","description":"Automatization of repository and version strategies creation!","homepage":"https://github.com","private":false}')

# INICIALIZAMOS NUEVO REPOSITORIO

echo "Inicializando el nuevo repositorio..."
git init

# AGREGAMOS EL REPOSITORIO REMOTO

echo "Agregando el repositorio remoto..."
git remote add origin https://github.com/alejandro945/$new_repository_name.git

# NOMBRE DE LA RAMA PRINCIPAL POR CONVENCIÓN

echo "Estableciendo el nombre de la rama principal..."
git branch -M $branches

# PRIMER COMMIT

echo "Realizando el primer commit..."
git add .
git commit -m "Initial of template creation	"

# CREACION DE RAMAS O ESTRATEGIAS DE BRANCHING

for branch in ${branches[@]}
do
if [[ "$branch" != 'main' ]]; then
    git branch $branch
fi
done

#SUBIR RAMAS AL REPOSITORIO REMOTO

git push --all origin


# PROTECCIÓN DE RAMAS (PROXIMA VERSION ARREGLO DE REQUERIMIENTOS PARA CADA RAMA EN ESPECIFICO)

for branch in ${branches[@]}
do
curl -X PUT -H "Authorization: Token $access_token" -d "$protection_requirements_generic" https://api.github.com/repos/$git_username/$new_repository_name/branches/$branch/protection
done

# ENVIANDO CAMBIOS AL REMOTO RAMA MAIN POR DEFECTO

echo "Empujando la nueva plantilla al repositorio..."
git push -u origin main

echo "Melo caramelo"