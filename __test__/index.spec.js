const index = require('../index');

const productData = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
]; 

it ('Should Return True when the ID collection is valid', () => {
    index.setProductData(productData);
    expect(index.validateId('0001')).toBe(true);
});

it ('Should Return false when the ID is not valid', () => {
        index.setProductData(productData);
        expect(index.validateId('000G')).toBe(false);
});

it ('Should Return object of product with the given barcode', () => {
    index.setProductData(productData);
    expect(index.getProductDetails('0005')).toMatchObject({id:"0005", name: "Dr Pepper", price: 7});
});

it ('Should Return object of product with the given barcode', () => {
    index.setProductData(productData);
    expect(index.getProductDetails('000G')).toBe(null);
});

it ('Should Return receipt when all of the barcodes are invalid', () => {
    index.setProductData(productData);
    expect(index.printReceipt(['0001','0003','0005', '0003'])).toBe('Receipts\n'+
    '------------------------------------------------------------\n'+
    'Coca Cola\t\t\t3\t\t1\n'+
    'Pepsi-Cola\t\t\t5\t\t2\n'+
    'Dr Pepper\t\t\t7\t\t1\n'+
    '------------------------------------------------------------\n'+
    'Price: 20');
});

it ('Should Return Error when one of the barcode is invalid', () => {
    index.setProductData(productData);
    expect(index.printReceipt(['0001','000G','0003'])).toBe('[ERROR] Invalid Barcode');
});
