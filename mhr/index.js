import {parse, stringify} from 'smol-toml'
import process from 'node:process'
import fs from 'node:fs'
import {ACTIONS, parseCommand} from './actions.js'
import readline from 'readline-sync';

const cmdIns = parseCommand(process.argv)

if(cmdIns === ACTIONS.ADD){
  try { 
  const configToml = fs.readFileSync('./config.toml', 'utf-8');
  let parsedProperties = parse(configToml);
  console.log(parsedProperties);
  
  console.log("Enter the name of the based human: ");
  let name = readline.question()
  console.log(name)
  
  parsedProperties[name] = {"name":name}
  let serializedToml = stringify(parsedProperties); 

  console.log(serializedToml)
  fs.writeFileSync('./config.toml', serializedToml);
  console.log("The based person is added to the toml file");

  } catch (err) {
    if(err.errno === -2){
      console.log('creating the file config.toml');
      fs.writeFileSync('./config.toml','');
      const configToml = fs.readFileSync('./config.toml', 'utf-8');
      let parsedProperties = parse(configToml);
      console.log(parsedProperties);
  
      console.log("Enter the name of the based human: ");
      let name = readline.question()
      console.log(name)

      parsedProperties[name] = {"name":name}
      let serializedToml = stringify(parsedProperties); 

      console.log(serializedToml)
      fs.writeFileSync('./config.toml', serializedToml);
      console.log("The based person is added to the toml file");
    }else{
      console.log(err);
    } 
  }
}
