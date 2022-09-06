import { gql } from '@apollo/client';
import type { NextPage } from 'next';
import client from '../apollo-client';
import styles from '../styles/Home.module.css';

interface ISRProps {
  nextLaunch: {
    __typename: string;
    mission_name: string;
    launch_date_local: string;
    launch_site: {
      __typename: string;
      site_name_long: string;
    };
  };
}

export const fetchDate = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return [day, month, year];
};

const ISR: NextPage<ISRProps> = ({ nextLaunch }) => {
  const { __typename, mission_name, launch_date_local, launch_site } =
    nextLaunch;

  return (
    <div>
      <h2>{__typename}</h2>
      <p>Mission Name: {mission_name}</p>
      <p>Launch Site: {launch_site.site_name_long}</p>
      <p>Date: {fetchDate(launch_date_local).join('-')}</p>
    </div>
  );
};

export default ISR;

export async function getStaticProps() {
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
    revalidate: 10,
  };
}
