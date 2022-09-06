import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { useId } from 'react';
import { fetchDate } from './isr';

interface LaunchSite {
  __typename: string;
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    __typename: string;
    site_name_long: string;
  };
}

const QUERY = gql`
  query PastLaunches {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
    }
  }
`;

const CSR: NextPage = () => {
  const { data = [], loading, error } = useQuery(QUERY);
  const { launchesPast } = data;

  return (
    <div>
      {loading && <p>loading</p>}
      {data && (
        <div>
          {launchesPast?.map(
            (
              {
                __typename,
                mission_name,
                launch_site,
                launch_date_local,
              }: LaunchSite,
              i: number
            ) => (
              <div key={i}>
                <h2>{__typename}</h2>
                <p>Mission Name: {mission_name}</p>
                <p>Launch Site: {launch_site.site_name_long}</p>
                <p>Date: {fetchDate(launch_date_local).join('-')}</p>
              </div>
            )
          )}
        </div>
      )}
      {error && <p>{JSON.stringify(error)}</p>}
    </div>
  );
};

export default CSR;
