
var productName = document.getElementById("productName") ;
var productPrice = document.getElementById("productPrice") ;
var productCategory = document.getElementById("productCategory") ;
var productDesc = document.getElementById("productDesc") ;
var submit = document.getElementById("submit") ;
var mood = "create" ;
var tmb ;



var productList = []

if (localStorage.getItem("prodct") !=null )
{
    productList = JSON.parse(localStorage.getItem("prodct"))
}

submit.onclick = function ()
{
if (validName()==true && validPrice ())
{
    var product = {
        name : productName.value.toLowerCase() ,
        price : productPrice.value ,
        category : productCategory.value.toLowerCase() ,
        desc : productDesc.value ,
    }
    if (mood === "create")
    {
        productList.push(product)


    } else {
        productList [tmb] = product 
        submit.innerHTML = "create"
        submit.style.background = "#470053"
        mood = "create"

    }





    localStorage.setItem("prodct" ,JSON.stringify(productList) )
    clearForm ()

    showProduct ()
}
}

function clearForm () {
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDesc.value  = ""

}


function showProduct (){
var cartona = ""
for (var i = 0; i<productList.length ;i++ )
{
    cartona+= ` <tr>
    <td> ${i} </td>
    <td> ${productList[i].name} </td>
    <td> ${productList[i].price} </td>
    <td> ${productList[i].category} </td>
    <td> ${productList[i].desc} </td>
    <td><button onclick = " updateProduct ( ${i} )" >Update</button></td>
    <td><button onclick = "deleteProduct ( ${i} )" >Delete</button></td>
</tr>`

}
document.getElementById("tableBody").innerHTML = cartona ;
var btnDelete = document.getElementById("deleteAll") ;
if (productList.length > 0)
{
    btnDelete.innerHTML = `<button onclick = " deleteAll ()" >delete All ${productList.length} </button>`

} else {
    btnDelete.innerHTML = ""
}
}
showProduct ()



function deleteProduct (i)
{
productList.splice( i ,1)
localStorage.setItem("prodct" ,JSON.stringify(productList) )
showProduct ()
}


function deleteAll ()
{
productList.splice(0);
localStorage.setItem("prodct" ,JSON.stringify(productList) )
showProduct ()

}

function updateProduct (i)
{

productName.value = productList[i].name ;
productPrice.value = productList[i].price ;
productCategory.value = productList[i].category ;
productDesc.value = productList[i].desc ;
mood = "update"
submit.innerHTML = "update"
submit.style.background = "yellowgreen"
tmb = i
scroll({
    top : 0 ,
    behavior : "smooth"
})
localStorage.setItem("prodct" ,JSON.stringify(productList) )

}


var searchMood = "name" ;




function getSearchMood (id)
{
    var search = document.getElementById("Search");
if (id == "searchName")
{
    searchMood = "name" ;
    search.placeholder = "search By Name ..."
}else {
    searchMood = "category"
    search.placeholder = "search By Category ..."

}
search.focus()
search.value = ""
showProduct()

}


function searchProduct (value)
{
    if (searchMood == "name")
    {
        var cartona = ""
        for (var i = 0; i<productList.length ; i++)
        {
            if (productList[i].name.includes(value.toLowerCase()))
            {
                cartona+= ` <tr>
                <td> ${i} </td>
                <td> ${productList[i].name} </td>
                <td> ${productList[i].price} </td>
                <td> ${productList[i].category} </td>
                <td> ${productList[i].desc} </td>
                <td><button onclick = " updateProduct ( ${i} )" >Update</button></td>
                <td><button onclick = "deleteProduct ( ${i} )" >Delete</button></td>
            </tr>`
            
            }

        }




    } else {
        for (var i = 0; i<productList.length ; i++)
        {
            if (productList[i].category.includes(value.toLowerCase()))
            {
                cartona+= ` <tr>
                <td> ${i} </td>
                <td> ${productList[i].name} </td>
                <td> ${productList[i].price} </td>
                <td> ${productList[i].category} </td>
                <td> ${productList[i].desc} </td>
                <td><button onclick = " updateProduct ( ${i} )" >Update</button></td>
                <td><button onclick = "deleteProduct ( ${i} )" >Delete</button></td>
            </tr>`
            
            }

        }

    }
    document.getElementById("tableBody").innerHTML = cartona ;
}





function validName () {
    var messageName = document.getElementById("messageName")
    var regexName = /^[A-Za-z]{3,8}$/;
    var text = productName.value ;

    if (regexName.test(text) ==true)
    {
        productName.classList.add("is-valid")
        productName.classList.remove("is-invalid")
        messageName.classList.add("d-none")
        return true ;
        

    }else {
        productName.classList.add("is-invalid")
        productName.classList.remove("is-valid")
        messageName.classList.remove("d-none")
        return false ;
        
    }


}


function validPrice () {
    var messagePrice = document.getElementById("messagePrice")
    var regexPrice = /^([1-9]|[0]){1,6}$/;
    var text = productPrice.value ;

    if (regexPrice.test(text) ==true)
    {
        productPrice.classList.add("is-valid")
        productPrice.classList.remove("is-invalid")
        messagePrice.classList.add("d-none")
        return true ;
        

    }else {
        productPrice.classList.add("is-invalid")
        productPrice.classList.remove("is-valid")
        messagePrice.classList.remove("d-none")
        return false ;
        
    }


}