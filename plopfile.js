/* eslint-disable @typescript-eslint/no-var-requires */
const promptDirectory = require('inquirer-directory');

const componentTypes = {
  REACT_COMPONENT: 'component',
  CUSTOM_HOOK: 'hook',
  PROVIDER: 'provider',
};

module.exports = function (plop) {
  const currentPath = process.env.INIT_CWD;

  plop.setPrompt('directory', promptDirectory);

  plop.setGenerator(componentTypes.REACT_COMPONENT, {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'Please enter component name (NOTICE: component files will be generated under: "CURRENT_DIR + /{ComponentName} folder"',
      },
    ],
    actions: [
      {
        type: 'add',
        path: currentPath + '/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component/Component.hbs',
      },
      {
        type: 'add',
        path: currentPath + '/components/{{pascalCase name}}/{{pascalCase name}}.spec.tsx',
        templateFile: 'plop-templates/component/Component.spec.hbs',
      },
      {
        type: 'add',
        path: currentPath + '/components/{{pascalCase name}}/{{pascalCase name}}.styles.ts',
        templateFile: 'plop-templates/component/Component.styles.hbs',
      },
      {
        type: 'add',
        path: currentPath + '/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/component/ComponentIndex.hbs',
      },
    ],
  });
  plop.setGenerator(componentTypes.CUSTOM_HOOK, {
    description: 'Create a custom hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter a hook name (NOTICE: hook will be generated under: "CURRENT_DIR + /hooks" folder)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: currentPath + '/hooks/{{camelCase name}}.tsx',
        templateFile: 'plop-templates/hook/hookTypes.hbs',
      },
      {
        type: 'add',
        path: currentPath + '/hooks/__tests__//{{camelCase name}}.spec.tsx',
        templateFile: 'plop-templates/hook/hook.spec.hbs',
      },
    ],
  });
  plop.setGenerator(componentTypes.PROVIDER, {
    description: 'Create a provider',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'Please enter provider name (NOTICE: provider and it\'s context will be generated under: "CURRENT_DIR + /contexts folder")',
      },
    ],
    actions: [
      {
        type: 'add',
        path: currentPath + '/contexts/{{pascalCase name}}Provider.tsx',
        templateFile: 'plop-templates/provider/provider.hbs',
      },
    ],
  });
};
