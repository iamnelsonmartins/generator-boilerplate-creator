'use strict'
const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')
const path = require('path')

module.exports = class extends Generator {
  prompting() {
    this.log('')
    this.log(' ==== Welcome to File Generator with Gulp+Sass+TypeScript ==== ')
    this.log('')
    this.log(' ==== Select your project name and a little description ==== ')

    const prompts = [
      {
        name: 'name',
        message: 'Your project name',
        default: 'new-project',
      },
      {
        name: 'description',
        message: 'Your project description',
        default: 'TODO',
      },
    ]

    return this.prompt(prompts).then((props) => {
      this.props = props
    })
  }

  writing() {
    this.log(' ==== Copying Files ==== ')

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    )

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json'),
      this.props
    )

    this.fs.copy(this.templatePath('app'), this.destinationPath('app'))

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    )

    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('dist/index.html')
    )

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    )
  }

  end() {
    this.log('')
    this.log(' ==== Thats All Folks! ==== ')
    this.log(' ==== Run `gulp` in this project directory to run Gulp! ==== ')
  }
}
