import { Header, Segment, Button, Icon, Item } from 'semantic-ui-react'
import { useRouter } from 'next/router'

function CartItemList({ products, user }) {
  const router = useRouter()

  const mapCartProductsToItems = products => {
    return products.map(prod => ({
      childKey: prod.product._id,
      header: (
        <Item.Header
          as='a'
          onClick={() => router.push(`/product?_id=${prod.product._id}`)}
        >
          {prod.product.name}
        </Item.Header>
      ),
      image: prod.product.mediaUrl,
      meta: `${prod.quantity} x $${prod.product.price}`,
      fluid: 'true',
      extra: (
        <Button
          basic
          icon='remove'
          floated='right'
          onClick={() => console.log(prod.product._id)}
        />
      )
    }))
  }

  if (products.length === 0) {
    return (
      <Segment secondary color='black' textAlign='center' placeholder>
        <Header icon>
          <Icon name='shopping basket' />
          No products in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color='black' onClick={() => router.push('/index')}>
              View Products
            </Button>
          ) : (
            <Button color='blue' onClick={() => router.push('/login')}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    )
  }

  return <Item.Group divided items={mapCartProductsToItems(products)} />
}

export default CartItemList
