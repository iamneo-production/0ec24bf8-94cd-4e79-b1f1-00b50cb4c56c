const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-fbbebbfbdcddabbcdedaeadabdedbf.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.click('#signupLink');
      await page.waitForNavigation();
      await page.type('#email', 'test@gmail.com');
      await page.type('#username', 'testuser');
      await page.type('#mobileNumber', '9876543210');
      await page.type('#password', 'Test@123');
      await page.type('#confirmPassword', 'Test@123');
      await page.click('#submitButton');
      await page.waitForNavigation();
      await page.waitForSelector('#loginButton',{timeout:3000});
      console.log('TESTCASE:FE_signup:success');
    }
     catch(e){
      console.log('TESTCASE:FE_signup:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-fbbebbfbdcddabbcdedaeadabdedbf.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.type('#email', 'test@gmail.com');
      await page.type('#password', 'Test@123');
      await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#logout',{timeout:3000});
      console.log('TESTCASE:FE_login:success');
    }
     catch(e){
      console.log('TESTCASE:FE_login:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-fbbebbfbdcddabbcdedaeadabdedbf.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
    await page.type('#email', 'test@gmail.com');
    await page.type('#password', 'Test@123');
    await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#logout',{timeout:3000});
      await page.click('#newCardForm');
      await page.waitForSelector('#firstName',{timeout:3000});
      await page.click('#correctionCardForm');
      await page.waitForSelector('#firstName',{timeout:3000});
      console.log('TESTCASE:FE_userNewCardOperation:success');
    }
     catch(e){
      console.log('TESTCASE:FE_userNewCardOperation:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-fbbebbfbdcddabbcdedaeadabdedbf.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
  await page.type('#email', 'test@gmail.com');
  await page.type('#password', 'Test@123');
  await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#logout',{timeout:3000});
    await page.click('#tractStatus');
    await page.waitForSelector('#trackButton',{timeout:3000});
    await page.click('#tractButton');
    await page.waitForSelector('#statusGrid1',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_userTrackStatusOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_userTrackStatusOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-fbbebbfbdcddabbcdedaeadabdedbf.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#logout',{timeout:3000});
    await page.click('#adminDocuments');
    await page.waitForSelector('#appliedDocumentGrid1',{timeout:3000});
    await page.click('#adminVerification');
    await page.waitForSelector('#adminApprove',{timeout:3000});
    console.log('TESTCASE:FE_adminDocumentVerificationOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_adminDocumentVerificationOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-fbbebbfbdcddabbcdedaeadabdedbf.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#logout',{timeout:3000});
    await page.click('#correctionDocuments');
    await page.waitForSelector('#correctionDocumentGrid1',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_adminDocumentCorrectionOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_adminDocumentCorrectionOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();