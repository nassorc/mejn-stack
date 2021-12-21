// 'https://fakestoreapi.com/products
let buttonsDOM = []
let cart = [2,5]
class Product {
  async getProduct() {
    try{
      let res = await fetch(`https://fakestoreapi.com/products`)
      let data = await res.json()
      let products = []
      products = data.map(item => {
        const {id, title, price, description, image} = item
        return {id, title, price, description, image}
      })
      return products
    } catch (err) {
      console.log(err)
    }
  }
}
class UI {
  displayProducts(products) {
    let result = ''
    let productsDOM = document.querySelector('ul.items')
    products.forEach(item => {
      result += `
      <li class="item" data-id=${item['id']}>
        <img src="${item['image']}" alt="none" class="product-image">
        <div class="item-details">
          <p class="product-title">${item['title']}</p>
          <p class="product-desc">${item['description']}</p>
          <p class="product-price">$${item['price']}</p>
        </div>
        <button class="add-to-cart-btn" data-id=${item['id']}>Add to cart</button>
      </li>
      `
    })
    productsDOM.innerHTML = result
  }
  displaySomething() {
    console.log('something')
  }
  // adds event to the buttons to add to cart
  getBagButton() {
    const buttons = [...document.querySelectorAll('.add-to-cart-btn')]
    buttonsDOM = buttons
    // temporary cart storage
    buttons.forEach(button => {
      let id = button.dataset.id
      let inCart = cart.find(item => item == id);
      if (inCart) {
        button.innerHTML = 'In cart'
        button.disabled = true
      } 
      button.addEventListener('click', (e) => {
        e.target.innerHTML = 'In cart'
        e.target.disabled = true
        //get product from local storage products
        const cartItem = {...Storage.getProduct(id), amount:1}
        // add product to the cart
        // save cart in local storage
        // set cart values
        // add cart item to display in cartDOM
        // show cart has been added with notification or overal
      })
      
    })
  }
}

class Storage {
  static saveLocally(items) {
    localStorage.setItem('products', JSON.stringify(items))
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find(item => item['id'] == id)
  }
}

async function main(){
  const product = new Product
  const ui = new UI
  product.getProduct().then(item => {
      ui.displayProducts(item)
      Storage.saveLocally(item)
  })
  .then(() => {
      ui.getBagButton()
  })
}
document.addEventListener("DOMContentLoaded", ()=> {main()})
