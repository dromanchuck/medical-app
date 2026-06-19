import { useScreenName } from 'hooks';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { EScreens, IPublication, TScreenProps } from 'types';

import { PublicationList } from 'organisms';
import { publicationService } from 'services';

export const Publications: FC<TScreenProps<EScreens.Publications>> = ({
  navigation,
  route: {
    params: { title, id },
  },
}) => {
  useScreenName(title);

  const [publications, setPublications] = useState<IPublication[]>([]);
  const [offset, setOffset] = useState(1);
  const isAllLoadedRef = useRef(false);

  useEffect(() => {
    if (isAllLoadedRef.current === false) {
      publicationService
        .getPublications({ category: [id], offset })
        .then(({ articles, total }) => {
          setPublications(state => {
            const newPublications = [...state, ...articles];

            if (total === newPublications.length) {
              isAllLoadedRef.current = true;
            }

            return newPublications;
          });
        })
        .catch(() => {});
    }
  }, [setPublications, id, offset]);

  const onLoadMore = useCallback(() => {
    setOffset(prev => prev + 1);
  }, []);

  return (
    <>
      <PublicationList
        publications={publications}
        navigation={navigation}
        onLoadMore={onLoadMore}
      />
    </>
  );
};
