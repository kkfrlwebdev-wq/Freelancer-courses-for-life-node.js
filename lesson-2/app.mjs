import {argv} from "process";
import readline from "readline";
const URLSearchString = argv.slice(2).join('&')
const args = new URLSearchParams(URLSearchString)



 const rl = readline.createInterface({
        input:process.stdin,
        output: process.stdout
    })

if(args.get('--pension')) {

    console.log(argv)   ;
    console.log(args.get('--pension'));

   
    rl.question(
        'чи є тобі 65 і більше років? натисни "y" якщо ні натисни "n" ',
        (answer)=>{ 
            if (answer === 'y')  console.log(`нажаль тобі працювати не можно, кайфуй від життя на песії`)
            else console.log('вітаю працівнику, ось католог доступних професій') 
         })
}


rl.on('SIGINT', () => {
    rl.question('Ви дійсно хочете вийти? (y/n) ', (inp) => {

        if (/^(y(es)?)$/i.test(inp)) {
            rl.close();
        } else {
            console.log('Продовжуємо роботу.');
            rl.prompt();
        }
         rl.close();
    });
});