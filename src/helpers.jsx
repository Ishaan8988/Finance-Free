export const wait = ()=> new Promise(res=>setTimeout(res, Math.random() * 700))

//local storage functions
export const fetchData=(key)=>{
    return JSON.parse(localStorage.getItem(key));
}

const generateRandomColor =()=>{
    const existingBudgetsLength = fetchData("budgets") ?.length ?? 0; 
    return `${existingBudgetsLength * 34} 65% 50%  `
}

//get all items from local storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item)=>item[key] === value)
}

//create expense
export const createExpense = ({
    name, amount,  budgetId
})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
     }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

export const createBudget = ({
    name, amount
})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

//delete item from local storage
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData =  existingData.filter((item)=>item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
};


//formatting currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

//amount spent
export const calculteSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        //check if the expense.id === budetID
        if(expense.budgetId !== budgetId) return acc

        //add the current amount to the total
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}

//formatting date to local string
export const formatDateToLocalString = (epoch) =>
new Date(epoch).toLocaleDateString();

//formatting percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}