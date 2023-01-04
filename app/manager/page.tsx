'use client';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function manager() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useRecoilState(userState);
  const [areInfoValid, setAreInfoValid] = useState(true);

  useEffect(() => {
    setAreInfoValid(true);
    if (session) {
      setUser(session.user);
      if (user?.role) {
        if (user.role.toLocaleLowerCase() == 'manager') {
          router.push('/' + user.role.toLowerCase() + '/room');
        } else router.push('/' + user.role.toLowerCase());
      } else router.push('/admin/hotels');
    }
  }, [session]);

  return (
    <Fragment>
      <h1>Welcome again </h1>
    </Fragment>
  );
}
