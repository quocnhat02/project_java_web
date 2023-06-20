import { useOktaAuth } from '@okta/okta-react';
import { useState, useEffect } from 'react';
import OrderItemModel from '../../../models/OrderItemModel';
import SpinnerLoading from '../../Utils/SpinnerLoading';

const HistoryOrder = () => {
  const { authState } = useOktaAuth();

  // Normal Loading Pieces
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [orders, setOrders] = useState<OrderItemModel[]>([]);

  useEffect(() => {
    const fetchListOrder = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/orders/secure/get/listorder`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json',
          },
        };
        const ordersResponse = await fetch(url, requestOptions);

        if (!ordersResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const ordersResponseJson = await ordersResponse.json();
        // console.log(ordersResponseJson);
        setOrders(ordersResponseJson);
      }
      setIsLoadingOrders(false);
    };
    fetchListOrder().catch((error: any) => {
      setIsLoadingOrders(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState]);

  if (isLoadingOrders) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              ID
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Name
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
                width: '200px',
              }}
            >
              Address
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Order Date
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Phone
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Total
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Email
            </th>
            <th
              style={{
                backgroundColor: '#f2f2f2',
                color: '#333',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: '12px',
                borderBottom: '1px solid #ddd',
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, i) => (
            <tr key={item.id}>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.id}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.address}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.orderDate}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.phoneNumber}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                ${item.total}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.userEmail}
              </td>
              <td
                style={{
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {item.status === 1 && 'Pending'}
                {item.status === 2 && 'Confirmed'}
                {item.status === 3 && 'Delivering'}
                {item.status === 4 && 'Complete'}
                {item.status === 5 && 'Cancelled'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryOrder;
