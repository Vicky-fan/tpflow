'use strict';

const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');

const getDefalutProjectType = () => {
  const project = {
    "Skin": "skin",
    "LoadingPage": "loadingPage",
    "Activity": "activity"
  };

  for (let k in project) {
    project[k] = path.resolve(__dirname, `./template/${project[k]}`);
  }
  return project;
}

exports.getDefalutProjectType = getDefalutProjectType;

const newDefaultProject = async (data) => {
  let {
    name,
    packageName,
    type,
    path: projectPath,
    version,
    isESNext,
    author,
    c_version,
    description = '',
    isESLint,
    from
  } = data;

  const types = getDefalutProjectType();
  const projectTypePath = types[type];

  fs.ensureDirSync(projectPath);

  let isNeedNpminstall = false;
  let isNeedCreateDefalutFolder = true;

  const replaceInfo = (str) => {
    return str.replace(/\[name\]/g, name)
      .replace(/\[packageName\]/g, packageName)
      .replace(/\[version\]/g, version)
      .replace(/\[description\]/g, description)
      .replace(/\[author\]/g, author)
      .replace(/\[type\]/g, type)
  };

  fs.ensureDirSync(projectPath);

  // cope type folder
  fs.copySync(projectTypePath, path.resolve(projectPath));

  const packageJsonPath = path.resolve(projectPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return '缺少 package.json';
  }

  const packageJson = replaceInfo(fs.readFileSync(packageJsonPath, 'utf8'));
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), packageJson);

  // if (shell.cd(projectPath)) {
  //     // console.log( 'installing local node_modules' );
  //
  //     shell.exec( `gulp` );
  // }

  return data;
}

exports.new = async (data) => {
  let {
    name,
    path: projectPath,
    type
  } = data;

  data.path = projectPath = path.resolve(projectPath, `./${ name }`);

  if (fs.existsSync(projectPath)) {
    return '项目已存在';
  }

  if (this.getDefalutProjectType()[type]) {
    return await newDefaultProject(data);
  } else {
    return '找不到该类型项目';
  }
}
