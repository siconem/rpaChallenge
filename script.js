const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // true caso queira que fique invisivel 
    const page = await browser.newPage();

    // Navegar para a página e clicar no botão 'Start'
    await page.goto('https://rpachallenge.com/?lang=EN');
    await page.click('button.waves-effect.col.s12.m12.l12.btn-large.uiColorButton');

    //await new Promise(resolve => setTimeout(resolve, 'tempo'));  // possivel gargalo


    // Ler o arquivo Excel
    const workbook = xlsx.readFile('challenge.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const fields = [{
        campoWeb: 'First Name',
        campoPlan: 'First Name',
    },
    {
        campoWeb: 'Last Name',
        campoPlan: 'Last Name ',
    },
    {
        campoWeb: 'Company Name',
        campoPlan: 'Company Name',
    },
    {
        campoWeb: 'Role in Company',
        campoPlan: 'Role in Company',
    },
    {
        campoWeb: 'Address',
        campoPlan: 'Address',
    },
    {
        campoWeb: 'Email',
        campoPlan: 'Email',
    },
    {
        campoWeb: 'Phone Number',
        campoPlan: 'Phone Number',
    }];

    for (let i = 0; i < data.length; i++) {
        const entry = data[i];

        for (const field of fields) {
            console.log(entry[field.campoPlan])
            const selector = `[ng-reflect-dictionary-value="${field.campoWeb}"] input`;
            await page.waitForSelector(selector);
            await page.type(selector, entry[field.campoPlan].toString());


        }

        // Submit do formulário
        await page.click('input[type="submit"]');

        //await new Promise(resolve => setTimeout(resolve, 'tempo em milisegundos')); //caso queira usar um gargalo
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
    console.log('Automação concluída');

})();
