export const navigation = {
   men: {
      id: 'men',
      name: 'Men',
      featured: [], // Add featured items if needed
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirts', id: 'shirts', href: '/men/clothing/shirts' },
            { name: 'Pants', id: 'pants', href: '/men/clothing/pants' },
            { name: 'Jackets', id: 'jackets', href: '/men/clothing/jackets' },
            { name: 'Suits', id: 'suits', href: '/men/clothing/suits' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watches', href: '/men/accessories/watches' },
            { name: 'Belts', id: 'belts', href: '/men/accessories/belts' },
            { name: 'Hats', id: 'hats', href: '/men/accessories/hats' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Nike', id: 'nike', href: '/men/brands/nike' },
            { name: 'Adidas', id: 'adidas', href: '/men/brands/adidas' },
            { name: 'Gucci', id: 'gucci', href: '/men/brands/gucci' }
          ]
        }
      ]
    },
    women: {
      id: 'women',
      name: 'Women',
      featured: [], // Add featured items if needed
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: 'tops', href: '/women/clothing/tops' },
            { name: 'Dresses', id: 'dresses', href: '/women/clothing/dresses' },
            { name: 'Skirts', id: 'skirts', href: '/women/clothing/skirts' },
            { name: 'Jeans', id: 'jeans', href: '/women/clothing/jeans' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Handbags', id: 'handbags', href: '/women/accessories/handbags' },
            { name: 'Jewelry', id: 'jewelry', href: '/women/accessories/jewelry' },
            { name: 'Scarves', id: 'scarves', href: '/women/accessories/scarves' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Chanel', id: 'chanel', href: '/women/brands/chanel' },
            { name: 'Zara', id: 'zara', href: '/women/brands/zara' },
            { name: 'H&M', id: 'hm', href: '/women/brands/hm' }
          ]
        }
      ]
    }
  }
