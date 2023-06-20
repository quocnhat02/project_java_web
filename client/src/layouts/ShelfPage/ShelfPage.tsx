import React, { useState } from 'react';
import Loans from './components/Loans';
import HistoryPage from './components/HistoryPage';
import { useOktaAuth } from '@okta/okta-react';
import HistoryOrder from './components/HistoryOrder';

const ShelfPage = () => {
  const { authState } = useOktaAuth();

  const [historyClick, setHistoryClick] = useState(false);
  const [historyOrderClick, setHistoryOrderClick] = useState(false);

  return (
    <div className='container'>
      <div className='mt-3'>
        <nav>
          <div className='nav nav-tabs' id='nav-tab' role='tablist'>
            <button
              onClick={() => {
                setHistoryOrderClick(false);
                setHistoryClick(false);
              }}
              className='nav-link active'
              id='nav-loans-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-loans'
              type='button'
              role='tab'
              aria-controls='nav-loans'
              aria-selected='true'
            >
              Loans
            </button>
            <button
              onClick={() => {
                setHistoryOrderClick(false);
                setHistoryClick(true);
              }}
              className='nav-link'
              id='nav-history-tab'
              data-bs-toggle='tab'
              data-bs-target='#nav-history'
              type='button'
              role='tab'
              aria-controls='nav-history'
              aria-selected='false'
            >
              Your History
            </button>
            {authState?.isAuthenticated &&
              authState?.accessToken?.claims?.userType === undefined && (
                <button
                  onClick={() => setHistoryOrderClick(true)}
                  className='nav-link'
                  id='nav-history-order-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#nav-history-order'
                  type='button'
                  role='tab'
                  aria-controls='nav-history-order'
                  aria-selected='false'
                >
                  Your History Order
                </button>
              )}
          </div>
        </nav>
        <div className='tab-content' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='nav-loans'
            role='tabpanel'
            aria-labelledby='nav-loans-tab'
          >
            {!historyOrderClick && <Loans />}
          </div>
          <div
            className='tab-pane fade'
            id='nav-history'
            role='tabpanel'
            aria-labelledby='nav-history-tab'
          >
            {!historyOrderClick && historyClick ? <HistoryPage /> : <></>}
          </div>
          <div
            className='tab-pane fade'
            id='nav-history-order'
            role='tabpanel'
            aria-labelledby='nav-history-order-tab'
          >
            {historyOrderClick ? <HistoryOrder /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelfPage;
