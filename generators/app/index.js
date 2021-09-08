'use strict'
const Generator = require('yeoman-generator')
const mkdirp = require('mkdirp')
const path = require('path')
const chalk = require('chalk')

module.exports = class extends Generator {
  prompting() {
    this.log('')
    this.log(
      chalk.inverse.bold.white(
        '  Welcome to File Generator with Gulp and Sass  '
      )
    )
    this.log('')
    this.log(
      chalk.inverse.white(' Select your project name and a little description ')
    )
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
    this.log(chalk.inverse.white(' Copying Files '))
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
      this.destinationPath('index.html')
    )

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    )
  }

  end() {
    this.log('')
    this.log(chalk.inverse.bold.white(' Thats All Folks! '))
    this.log(
      chalk.inverse.bold.white(
        ' Run `gulp` in this project directory to run Gulp!'
      )
    )
  }
}
