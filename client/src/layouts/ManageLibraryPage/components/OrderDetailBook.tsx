import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import OrderDetailsModel from '../../../models/OrderDetailsModel';
import SpinnerLoading from '../../Utils/SpinnerLoading';
import BookModel from '../../../models/BookModel';
import CartItem from '../../CartPage/components/CartItem';
import { useHistory } from 'react-router-dom';

const OrderDetailBook: React.FC<{
  orderId: number;
  statusOrder: number;
}> = (props) => {
  const { authState } = useOktaAuth();

  // Normal Loading Pieces
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [ordersDetails, setOrdersDetails] = useState<BookModel[]>([]);
  const [statusUpdate, setStatusUpdate] = useState(1);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/admin/secure/get/order/details/?orderId=${props?.orderId}`;
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
        setOrdersDetails(ordersResponseJson);
        setStatusUpdate(props?.statusOrder);
        // setTotalPages(ordersResponseJson.page.totalPages);
      }
      setIsLoadingOrders(false);
    };
    fetchUserMessages().catch((error: any) => {
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

  async function updateStatusFunction() {
    const url = `http://localhost:8080/api/admin/secure/changestatus/order/?orderId=${props?.orderId}&status=${statusUpdate}`;

    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    const statusUpdateResponse = await fetch(url, requestOptions);
    if (!statusUpdateResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setStatusUpdate(statusUpdate);
  }

  return (
    <div>
      <div
        className='col-md-3 mb-3 w-100'
        style={{
          display: 'flex',
        }}
      >
        <label
          className='form-label'
          style={{
            marginRight: '2em',
          }}
        >
          {' '}
          Category
        </label>
        <button
          className='form-control btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          aria-expanded='false'
          style={{
            width: '500px',
          }}
        >
          {statusUpdate === 1 && 'Pending'}
          {statusUpdate === 2 && 'Confirmed'}
          {statusUpdate === 3 && 'Delivering'}
          {statusUpdate === 4 && 'Complete'}
          {statusUpdate === 5 && 'Cancelled'}
        </button>
        <ul
          id='addNewBookId'
          className='dropdown-menu'
          aria-labelledby='dropdownMenuButton1'
          style={{
            width: '500px',
            textAlign: 'center',
          }}
        >
          {/* {item.status === 1 && 'Pending'}
          {item.status === 2 && 'Confirmed'}
          {item.status === 3 && 'Delivering'}
          {item.status === 4 && 'Complete'}
          {item.status === 5 && 'Cancelled'} */}
          <li>
            <a onClick={() => setStatusUpdate(1)} className='dropdown-item'>
              Pending
            </a>
          </li>
          <li>
            <a onClick={() => setStatusUpdate(2)} className='dropdown-item'>
              Confirmed
            </a>
          </li>
          <li>
            <a onClick={() => setStatusUpdate(3)} className='dropdown-item'>
              Delivering
            </a>
          </li>
          <li>
            <a onClick={() => setStatusUpdate(4)} className='dropdown-item'>
              Complete
            </a>
          </li>
          <li>
            <a onClick={() => setStatusUpdate(5)} className='dropdown-item'>
              Cancelled
            </a>
          </li>
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <button
          style={{
            padding: '6px 10px',
            background: 'orange',
            borderRadius: '3px',
            fontSize: '1.4em',
            marginBottom: '1em',
          }}
          onClick={updateStatusFunction}
        >
          Update Status
        </button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: '#ddd',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              ID
            </th>
            <th
              style={{
                backgroundColor: '#ddd',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Image
            </th>
            <th
              style={{
                backgroundColor: '#ddd',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Title
            </th>
            <th
              style={{
                backgroundColor: '#ddd',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Author
            </th>
            <th
              style={{
                backgroundColor: '#ddd',
                padding: '8px',
                textAlign: 'center',
              }}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersDetails.map((data) => (
            <tr key={data?.id}>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'center',
                }}
              >
                {data?.id}
              </td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img src={data?.img} alt='' width={'125px'} />
              </td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'center',
                }}
              >
                {data?.title}
              </td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'center',
                }}
              >
                {data?.author}
              </td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'center',
                }}
              >
                ${data?.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailBook;
