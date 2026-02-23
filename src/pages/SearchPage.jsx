import React from 'react'

const SearchPage = () => {
  return (
    <>
      <style>
        {`
          .coming-soon-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            width: 100%;
          }

          .coming-soon-text {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 48px;
            line-height: 1.2;
            color: var(--u-color-base-foreground-subtle, #607081);
            text-align: center;
          }

          @media (max-width: 767px) {
            .coming-soon-page {
              padding-top: 136px;
            }

            .coming-soon-text {
              font-size: 34px;
            }
          }
        `}
      </style>
      <div className="content-inner">
        <div className="page-body">
          <div className="coming-soon-page">
            <h1 className="coming-soon-text">Coming Soon</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchPage
