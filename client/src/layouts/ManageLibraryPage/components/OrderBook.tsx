import React, { useState, useEffect } from 'react';
import AddOrderModel from '../../../models/AddOrderModel';
import { useOktaAuth } from '@okta/okta-react';
import Pagination from '../../Utils/Pagination';
import SpinnerLoading from '../../Utils/SpinnerLoading';

const OrderBook = () => {
  const { authState } = useOktaAuth();

  // Normal Loading Pieces
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [orders, setOrders] = useState<AddOrderModel[]>([]);
  const [ordersPerPage] = useState(5);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Recall useEffect
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/admin/secure/get/listorder/search/findByClosed/?closed=false&page=${
          currentPage - 1
        }&size=${ordersPerPage}`;
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

        setOrders(ordersResponseJson._embedded?.orders);
        setTotalPages(ordersResponseJson.page.totalPages);
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='mt-3'>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default OrderBook;
