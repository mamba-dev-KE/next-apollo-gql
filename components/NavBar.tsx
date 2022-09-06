import Link from 'next/link';

const NavBar = () => {
  return (
    <div>
      <ul style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/ssg">SSG</Link>
        <Link href="/csr">CSR</Link>
        <Link href="/ssr">SSR</Link>
        <Link href="/isr">ISR</Link>
      </ul>
    </div>
  );
};

export default NavBar;
