let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let wrapper = document.getElementById('wrapper');
let loginText =document.getElementById('loginText');
let login = document.getElementById('login');
let wallet = document.getElementById('wallet');
let balance = document.getElementById('balance');
let transaction = document.getElementById('transaction');
let welcomeAvatar = document.getElementById('welcomeAvatar');
let transactionRecord = document.getElementById('transactionRecord');
let warning = document.getElementById('warning');
let appUser;
let loginBtn = document.getElementById('loginBtn');

let users=[
    {
        username: 'khaled',
        password: '1234',
        balance: 2000,
    },
    {
        username: 'admin',
        password: '123456',
        balance: 5000,
    }
];

let records= [];

function addUser(){
    let newUser ={
        username:usernameInput.value,
        password:passwordInput.value,
        balance:0
    }
    users.push(newUser);
    console.log(users);
    checkCredentials();
}

function checkCredentials(){
    users.forEach((user)=>{
        if(usernameInput.value == user.username && passwordInput.value == user.password){
            appUser = user.username;
            loginText.style.display='none';
            login.style.display='none';
            wrapper.classList.add('animate__animated', 'animate__backInRight');
            wallet.style.display='flex';
            wrapper.style.backgroundColor='#3c6397';
            welcomeAvatar.innerText=user.username;
            welcomeAvatar.style.color='#3c6397';
        }
        else{
            warning.style.display='flex';
        }
    })
}

function checkBalance(){
    users.forEach((user)=>{
        if(user.username == appUser){
            balance.innerText = user.balance;
            showData();
        }
        else{
            console.log(`user ${user.username} is not the right user`);
        }
        console.log(user);
        
        
    })
}
function withdrawl(){
    let date = new Date();
    transaction.style.display='flex';
    let newTransaction = +transaction.value;
    users.forEach((user,index)=>{
        if(user.username == appUser){
            if(user.balance < newTransaction){
                balance.innerText = `Balance insufficient!`;
                balance.classList.add('animate__animated','animate__shakeX');
            }
            else{
                user.balance -=newTransaction;
                balance.innerText = user.balance;
                let newRecord={
                        index:index,
                        transaction:'Withdrawl',
                        amount:newTransaction,
                        balance:user.balance,
                        date:`${date.toISOString().split('T')[0]}`
                };
                records.push(newRecord);
                console.log(records);
                showData();
            }
        }
        else{
            console.log(`user ${user.username} is not the right user`);
        }
        
        
    })
}
function deposit(){
    let date = new Date();
    // transactionRecord.innerHTML='';
    transaction.style.display='flex';
    let newTransaction = +transaction.value;
    users.forEach((user,index)=>{
        if(user.username == appUser){
            user.balance +=newTransaction;
            balance.innerText = user.balance;
            let newRecord={
                    index:index,
                    transaction:'Deposit',
                    amount: newTransaction,
                    balance:user.balance,
                    date:`${date.toISOString().split('T')[0]}`
            };
            records.push(newRecord);
            console.log(records);
            showData();
        }
        else{
            console.log(`user ${user.username} is not the right user`);
        }
        
    })
    
}


function showData(){
    transactionRecord.innerHTML ='';
    records.forEach((record,index)=>{
        console.log(records);
        transactionRecord.innerHTML +=
        `<tr class="table-secondary">
            <th scope="row">${index++}</th>
            <td>${record.transaction}</td>
            <td>${record.amount}</td>
            <td>${record.date}</td>            
            <td>${record.balance}</td>
        </tr>`;
    });
}