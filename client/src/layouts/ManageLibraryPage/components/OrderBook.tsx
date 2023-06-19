import React, { useState, useEffect } from 'react';
import AddOrderModel from '../../../models/AddOrderModel';
import { useOktaAuth } from '@okta/okta-react';
import Pagination from '../../Utils/Pagination';
import SpinnerLoading from '../../Utils/SpinnerLoading';
import OrderBookItem from './OrderBookItem';
import OrderItemModel from '../../../models/OrderItemModel';

const OrderBook = () => {
  const { authState } = useOktaAuth();

  // Normal Loading Pieces
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [orders, setOrders] = useState<OrderItemModel[]>([]);
  //   const [ordersPerPage] = useState(5);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  //   const [totalPages, setTotalPages] = useState(0);

  // Recall useEffect
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState.isAuthenticated) {
        // const url = `http://localhost:8080/api/admin/secure/get/listorder/search/findByClosed/?closed=false&page=${
        //   currentPage - 1
        // }&size=${ordersPerPage}`;
        const url = `http://localhost:8080/api/admin/secure/get/listorder`;
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
        // setTotalPages(ordersResponseJson.page.totalPages);
      }
      setIsLoadingOrders(false);
    };
    fetchUserMessages().catch((error: any) => {
      setIsLoadingOrders(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage, btnSubmit]);

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

  //   console.log('orders', orders);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-3'>
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
                {item.total}
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )} */}
    </div>
  );
};

export default OrderBook;
