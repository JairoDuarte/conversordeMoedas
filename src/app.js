#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer');
const ora = require('ora');
const figlet = require('figlet');
const currencies = require('./services/outils');
const converter = require('./services/converter');
const {menuPrompt, initialLanguage, initialQuestion, questionValue} = require('./services/interface');

let init = async () => {
  const spinner = ora();
	console.log(figlet.textSync('MONEY - CONVERSION'));
	inquirer.registerPrompt('autocomplete',require('inquirer-autocomplete-prompt'));
  
	const language = await initialLanguage();
    
	let  choose,from,value,to,result;
	do {
		choose = (await menuPrompt([{content:language.content.choice1,value:1},{content:language.content.choice2,value:2},{content:language.content.choice3,value:3}],language.content.form1)).choose;
		switch (choose.value) {
		case 1:
			from = (await initialQuestion(currencies,language.content.form2)).converter;
			to = (await initialQuestion(currencies,language.content.form3)).converter;
			value = (await questionValue(language.content.form4)).value;
			spinner.start('Coverting...');
			result = await converter.converter(from.code, to.code , value);
			spinner.succeed(result + ' '+to.code);
			break;
		case 2:
			break;
		case 3:
			return false;
		}
	} while (true);
};
  
init();