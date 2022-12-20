#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
async function welcome() {
    const title = chalkAnimation.rainbow(`Let's start the Genius!!`);
    setTimeout(() => title.stop(), 2000);
}
console.log(chalk.blue("Let's start the Genius!!"));
let userLife = 4;
async function setQuestion() {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    let question;
    do {
        userLife--;
        console.log(`Your life left ${userLife}`);
        question = await inquirer.prompt([
            {
                type: "number",
                name: "usr_num",
                message: "Select any number between 1-10: ",
                // validate(answers:number) {
                //     if(isNaN(answers)){
                //         return chalk.red("Invalid Number!")
                //     }
                //     return true
                // },
            },
        ]);
        if (question.usr_num === randomNumber) {
            console.log(chalk.green("Your are Genius! You guess the right number "));
        }
        else if (question.usr_num < randomNumber) {
            console.log(chalk.red(`Your number is less then guess number`));
        }
        else if (question.usr_num > randomNumber) {
            console.log(chalk.red(`Your number is greater then guess number`));
        }
    } while (userLife > 1 && randomNumber !== question.usr_num);
    if (userLife === 1) {
        console.log(chalk.blueBright(`Game over`));
    }
}
async function startAgain() {
    let restart;
    do {
        userLife = 4;
        await setQuestion();
        restart = await inquirer.prompt([
            {
                type: "input",
                name: "start_again",
                message: "Do you want to restart the game? Press Y Or N: ",
            },
        ]);
    } while (restart?.start_again === "y" ||
        restart?.start_again === "Y" ||
        restart?.start_again === "yes");
}
await welcome();
startAgain();
