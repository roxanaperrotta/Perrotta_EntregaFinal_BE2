import {Command} from 'commander';
const program = new Command ();



program
.option('--mode <mode>', 'modo de trabajo', 'desarrollo')
program.parse();

export default program;