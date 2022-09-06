import { gql } from '@apollo/client';
import type { NextPage } from 'next';
import client from '../apollo-client';
import { fetchDate } from '../utils/fetchDate';

interface SSRProps {
  nextLaunch: {
    mission_name: string;
    launch_date_local: string;
    launch_site: {
      __typename: string;
      site_name_long: string;
    };
  };
}

const SSR: NextPage<SSRProps> = ({ nextLaunch }) => {
  const { mission_name, launch_date_local, launch_site } = nextLaunch;

  return (
    <div className="launch">
      <p className="mission-name">Mission Name: {mission_name}</p>
      <p>Launch Site: {launch_site.site_name_long}</p>
      <p>Date: {fetchDate(launch_date_local).join('-')}</p>
    </div>
  );
};

export default SSR;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query NextLaunch {
        launchNext {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
        }
      }
    `,
  });
  return {
    props: {
      nextLaunch: data.launchNext,
    },
  };
}
