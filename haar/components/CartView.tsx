
import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  size: number;
  quantity: number;
  image: string;
  color: string;
}

interface CartViewProps {
  items?: CartItem[];
  onContinueShopping?: () => void;
  onCheckout?: () => void;
  onRemoveItem?: (itemId: number) => void;
  onUpdateQuantity?: (itemId: number, quantity: number) => void;
}

// Sample cart data for demonstration
const sampleCartItems: CartItem[] = [
  {
    id: 1,
    name: "TEXTURED A CHAIN BRACELET",
    price: "¥99,000",
    priceValue: 99000,
    size: 2,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a60d6c81?auto=format&fit=crop&q=80&w=400",
    color: "SILVER"
  },
  {
    id: 2,
    name: "CURB CHAIN BRACELET",
    price: "¥85,000",
    priceValue: 85000,
    size: 1,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400",
    color: "SILVER"
  }
];

const CartView: React.FC<CartViewProps> = ({
  items = sampleCartItems,
  onContinueShopping,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const formattedSubtotal = `¥${subtotal.toLocaleString()}`;

  return (
    <div className="w-full min-h-screen bg-white text-black px-8 lg:px-16">
      {/* Header */}
      <div className="pt-8 pb-12 border-b border-gray-200">
        <h1 className="text-base font-black tracking-[0.2em] uppercase text-center">
          SHOPPING BAG ({items.length})
        </h1>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-sm font-bold tracking-wider uppercase mb-8 opacity-70">
            YOUR BAG IS EMPTY
          </p>
          <button
            onClick={onContinueShopping}
            className="px-12 py-4 bg-black text-white text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16 py-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex gap-6 py-8 ${idx !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {/* Product Image */}
                <div className="w-32 h-32 bg-[#f5f5f5] flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-4/5 h-4/5 object-contain grayscale"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black tracking-[0.1em] uppercase mb-2">
                      {item.name}
                    </h3>
                    <p className="text-[13px] font-bold tracking-wider mb-1">
                      {item.price}
                    </p>
                    <p className="text-xs font-semibold tracking-wider opacity-70 uppercase">
                      COLOR: {item.color} / SIZE: {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold tracking-wider uppercase">
                        QTY:
                      </span>
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 text-base font-bold hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-[13px] font-bold border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                          className="w-8 h-8 text-base font-bold hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem?.(item.id)}
                      className="text-xs font-bold tracking-wider uppercase underline hover:no-underline opacity-70 hover:opacity-100 transition-opacity"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <button
              onClick={onContinueShopping}
              className="mt-8 text-xs font-bold tracking-widest uppercase hover:opacity-50 transition-opacity"
            >
              ← CONTINUE SHOPPING
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 lg:h-fit">
            <div className="bg-[#fafafa] p-8">
              <h2 className="text-sm font-black tracking-[0.15em] uppercase mb-8 pb-4 border-b border-gray-200">
                ORDER SUMMARY
              </h2>

              <div className="flex justify-between mb-4">
                <span className="text-[13px] font-semibold tracking-wider uppercase opacity-70">
                  SUBTOTAL
                </span>
                <span className="text-[13px] font-bold tracking-wider">
                  {formattedSubtotal}
                </span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-[13px] font-semibold tracking-wider uppercase opacity-70">
                  SHIPPING
                </span>
                <span className="text-[13px] font-bold tracking-wider">
                  CALCULATED AT CHECKOUT
                </span>
              </div>

              <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                <span className="text-sm font-black tracking-wider uppercase">
                  ESTIMATED TOTAL
                </span>
                <span className="text-sm font-black tracking-wider">
                  {formattedSubtotal}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-8 py-4 bg-black text-white text-sm font-black tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>

              <p className="mt-6 text-xs leading-relaxed opacity-60 text-center">
                Taxes and shipping calculated at checkout.
                International orders may be subject to customs duties.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 text-center">
              <p className="text-xs font-bold tracking-wider uppercase opacity-50 mb-3">
                ACCEPTED PAYMENT METHODS
              </p>
              <div className="flex justify-center gap-4 opacity-50">
                <span className="text-xs font-bold">VISA</span>
                <span className="text-xs font-bold">MASTERCARD</span>
                <span className="text-xs font-bold">AMEX</span>
                <span className="text-xs font-bold">PAYPAL</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="w-full flex flex-col items-center text-center py-24 bg-white border-t border-gray-200 mt-8">
        <h3 className="text-sm font-black tracking-[0.2em] uppercase mb-12">
          SUBSCRIBE TO THE NEWSLETTER
        </h3>
        <p className="text-sm leading-relaxed mb-10 max-w-[420px] font-semibold opacity-85 uppercase tracking-widest">
          To get exclusive access to our private promotion and to stay up to date on latest drops, limited edition collabs, and special offers.
        </p>

        <div className="w-full max-w-[500px] relative mb-8 px-6">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-black p-4 text-sm focus:outline-none placeholder:opacity-50"
          />
          <button className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-black tracking-[0.1em] uppercase hover:opacity-50">
            SIGN UP
          </button>
        </div>

        <p className="text-xs leading-relaxed opacity-100 max-w-[540px] px-6 font-semibold">
          I have read the privacy policy and I consent to the processing of my personal data for marketing purposes. If you wish to unsubscribe from our newsletter, you may do so at any time by{' '}
          <button className="underline font-bold">clicking here.</button>
        </p>
      </section>
    </div>
  );
};

export default CartView;
