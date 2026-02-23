import React from 'react'

const Tag = ({ icon, name }) => {
  return (
    <>
      <style>
        {`
          .tag {
            background-color: var(--u-color-background-canvas, #eff0f0);
            padding: 4px 8px 4px 6px;
            border-radius: 4px;
            display: flex;
            gap: 4px;
            align-items: center;
          }

          .tag__icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .tag__icon img {
            width: 100%;
            height: 100%;
            display: block;
          }

          .tag__name {
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold, 700);
            font-size: 14px;
            line-height: 1.2;
            color: var(--u-color-base-foreground, #36485c);
          }
        `}
      </style>
      <div className="tag">
        {icon && (
          <div className="tag__icon">
            <img src={icon} alt="" />
          </div>
        )}
        <span className="tag__name">{name}</span>
      </div>
    </>
  )
}

export default Tag
