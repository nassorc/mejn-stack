// 'https://fakestoreapi.com/products


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
      <li class="item">
        <img src="${item['image']}" alt="none" class="product-image">
        <div class="item-details">
          <p class="product-title">${item['title']}</p>
          <p class="product-desc">${item['description']}</p>
          <p class="product-price">$${item['price']}</p>
        </div>
      </li>
      `
    })
    productsDOM.innerHTML = result
  }
  displaySomething() {
    console.log('something')
  }
}

class Storage {
  static saveLocally(items) {
    localStorage.setItem('products', JSON.stringify(items))
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
      const a = [...document.querySelectorAll('img.product-image')]
      console.log(a)
  })
}
document.addEventListener("DOMContentLoaded", ()=> {main()})
