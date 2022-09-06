import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { fetchDate } from '../utils/fetchDate';

interface LaunchSite {
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
        <div className="launches">
          {launchesPast?.map(
            (
              { mission_name, launch_site, launch_date_local }: LaunchSite,
              i: number
            ) => (
              <div key={i} className="launch">
                <h4 className="mission-name">Mission Name: {mission_name}</h4>
                <p>Launch Site: {launch_site.site_name_long}</p>
                <p>Date: {fetchDate(launch_date_local).join('-')}</p>
              </div>
            )
          )}
        </div>
      )}
      {error && <p>{error.message.toLowerCase()}</p>}
    </div>
  );
};

export default CSR;
