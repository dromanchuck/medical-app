import React from 'react';

import { Bullet, IBullet } from 'atoms';

interface IProps {
  items: IBullet[];
}

export const Bullets = ({ items }: IProps) => {
  return (
    <>
      {items.map(bullet => (
        <Bullet
          key={bullet.id}
          id={bullet.id}
          title={bullet.title}
          text={bullet.text}
        />
      ))}
    </>
  );
};
