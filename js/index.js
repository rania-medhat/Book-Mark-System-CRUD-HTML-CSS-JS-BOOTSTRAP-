// vars
var bookmarkName=document.querySelector("#productName");
var url=document.querySelector("#productUrl");
var submit=document.querySelector("#submit");
var deleted=document.querySelector("#deleted");
var appear=document.querySelector(".appear");
var exit=document.querySelector(".exit");
// local storage
productList=[];
productData=JSON.parse(localStorage.getItem("myProduct"));
if(productData!==null){
    productList=productData;
    display();
}
submit.addEventListener("click",function(){
    
    if(isValidName()&&isValidUrl()){
        var product={
            name:bookmarkName.value,
            url:url.value,
        }
            productList.push(product);
            localStorage.setItem("myProduct",JSON.stringify(productList));
            console.log(productData)
        display()
        clear()
        bookmarkName.classList.replace("is-valid","input");
        url.classList.replace("is-valid","input")
    }
    else{
        appear.classList.remove("d-none");
    }
    }
);

function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem("myProduct",JSON.stringify(productList));
    display();
    console.log(productList)
}; 
exit.addEventListener("click",function(){
    appear.classList.add("d-none");
})
function clear(){
    bookmarkName.value="";
    bookmarkName.classList.add("input");
    url.value="";
    url.classList.add("input");
};

function display(){
    var package="";
    for(var i=0;i<productList.length;i++){
        var variableName=productList[i].name;
        package+=`
        <hr>
        <div class="col-3"><div class="item"><p>`+i+`</p></div></div><div class="col-3"><div class="item"><p>`+variableName+`</p></div>
        </div><div class="col-3"><div class="item"><button onclick="visitProduct(${i})" class="btn btn-success"><i class="fa-solid fa-eye p-1"></i><a target="_blank" href="`+productList[i].url+`" class="text-white text-decoration-none">Visit</a></button></div>
        </div><div class="col-3"><div class="item"><button id="deleted" onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa-solid fa-trash p-1"></i>Delete</button></div>
        </div>`;
}
document.getElementById("myrow").innerHTML=package;
};
function isValidName(){
    var nameValue=bookmarkName.value;
    return nameValue.length>=3;
}
function isValidUrl(){
    var urlValue=url.value;
    var urlRegex=/^(http\:\/\/|https\:\/\/|HTTP\:\/\/|HTTPS\:\/\/)[w]{3}\.[a-zA-Z0-9_\.\/\-]{2,}$/
    return urlRegex.test(urlValue);
}
function validateName(){
    if(isValidName()){
        bookmarkName.classList.replace("input","is-valid");
        bookmarkName.classList.replace("is-invalid","is-valid");
        }
else{
    // appear.classList.remove("d-none");
    bookmarkName.classList.add("is-invalid")
}
}
function validateUrl(){
    if(isValidUrl()){
        url.classList.replace("input","is-valid");
        url.classList.replace("is-invalid","is-valid");
        }
else{
    url.classList.add("is-invalid")
}
}
bookmarkName.addEventListener("input",validateName);
url.addEventListener("input",validateUrl);
