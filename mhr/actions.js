export const ACTIONS = {
  ADD: 0,
  BUILD: 1
}

export function parseCommand(argv){
  if(argv[2] === 'add'){
    return ACTIONS.ADD;
  }else if(argv[2] === 'build'){
    return ACTIONS.BUILD
  }
}
