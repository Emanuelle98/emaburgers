export interface Burger {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  bgColor: 'mustard' | 'bubblegum' | 'lavender' | 'white';
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'burger' | 'extra';
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'card' | 'cash';
}
