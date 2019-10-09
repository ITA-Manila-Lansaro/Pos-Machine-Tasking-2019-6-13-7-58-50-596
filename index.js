var productList;

function setProductData (productData){
    productList = productData;
}

function printReceipt (barcodes) {
let receipt = 'Receipts\n'+
'------------------------------------------------------------\n';
let isValid = true;
let matchedProduct = [];  

barcodes.forEach(barcode => {
    if(!validateId(barcode)) isValid = false;
    matchedProduct.push(getProductDetails(barcode));
});

  if(!isValid){
      return "[ERROR] Invalid Barcode";
  }

  receipt += generateReceipt(matchedProduct); 

  return receipt;
    
}

function validateId (barcode){
    let isValid = false;

    productList.map((product) => {
        if(product.id === barcode) isValid = true; 
    });

    return isValid;
}

function getProductDetails (barcode){
    let matchedProduct = null; 
    
    productList.map((product, index)=>{
        if (product.id === barcode)
        matchedProduct = {  id: product.id, 
                            name: product.name, 
                            price: product.price}; 
    });

    return matchedProduct;
}

function generateReceipt (matchedProduct){
    let arr = matchedProduct;
    let receiptBody = '';
    let distinctBarcode = [... new Set(matchedProduct.map(product => product.id))];
    let total = 0;

    distinctBarcode.forEach((barcode , index) => {
       let productsOfBarcode = matchedProduct.filter(product => {
           if (product.id === barcode) return product});
       let quantity = 0;
       
       quantity = productsOfBarcode.length;
       receiptBody += productsOfBarcode[0].name +  '\t\t\t' + productsOfBarcode[0].price  + '\t\t' + quantity + '\n';
       total += productsOfBarcode[0].price * quantity;

    });

    receiptBody += '------------------------------------------------------------\n'+
        'Price: ' + total; 

    return receiptBody;
}

module.exports = {
    printReceipt: printReceipt,
    setProductData: setProductData,
    validateId: validateId,
    getProductDetails: getProductDetails, 
    generateReceipt: generateReceipt,
};           