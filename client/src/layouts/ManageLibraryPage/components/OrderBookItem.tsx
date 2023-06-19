import React from 'react';
import OrderItemModel from '../../../models/OrderItemModel';

const OrderBookItem: React.FC<{
  orderItem: OrderItemModel;
}> = (props) => {
  return <div>{props.orderItem?.id}</div>;
};

export default OrderBookItem;
